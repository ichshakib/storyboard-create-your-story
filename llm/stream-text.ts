import { ai, Content, Tool } from "./client"
import { CHAT_MODEL } from "./constants"
import prisma from "@/lib/prisma"
import { deductCredits } from "@/lib/credits"

export type StreamEvent =
  | { type: "text"; content: string; isThought?: boolean }
  | { type: "tool_call"; name: string; args: Record<string, unknown> }
  | { type: "project_update"; project: Record<string, unknown> }
  | { type: "error"; message: string }
  | { type: "done" }

export interface StreamTextOptions {
  contents: Content[]
  projectId: string
  userId: string
  systemInstruction?: string
  tools?: Tool[]
}

interface ProjectSlide {
  id: string
  title: string
  description: string
  prompt: string
  index: number
}

interface UpdateProjectMetadataArgs {
  title?: string
  description?: string
}

interface UpdateSlideArgs {
  slideId: string
  updates: Partial<ProjectSlide>
}

interface DeleteSlideArgs {
  slideId: string
}

interface AddSlideArgs {
  index: number
  slide: Omit<ProjectSlide, "id" | "index">
}

/**
 * Creates a ReadableStream that encodes StreamEvents as simple JSON chunks for the client to parse.
 */
export function createAIStream(
  execute: (send: (event: StreamEvent) => void) => Promise<void>
) {
  const encoder = new TextEncoder()

  return new ReadableStream({
    start(controller) {
      const send = (event: StreamEvent) => {
        const chunk = encoder.encode(JSON.stringify(event) + "\n")
        controller.enqueue(chunk)
      }

      execute(send)
        .then(() => {
          send({ type: "done" })
        })
        .catch((error) => {
          console.error("Stream execution error:", error)
          send({ type: "error", message: String(error) })
        })
        .finally(() => {
          controller.close()
        })
    },
  })
}

/**
 * Perform tool-calling loop execution and stream generated parts back to client.
 */
export function streamText(options: StreamTextOptions) {
  const { contents, projectId, userId, systemInstruction, tools } = options

  const lastMessage = contents[contents.length - 1]
  const input = lastMessage?.parts?.[0]?.text || ""
  const history = contents.slice(0, -1)

  const chat = ai.chats.create({
    model: CHAT_MODEL,
    history: history as Content[],
    config: {
      systemInstruction,
      tools,
    },
  })

  return createAIStream(async (send) => {
    let callExecutionCount = 0
    const MAX_CALLS = 5
    let hasChanges = false
    let currentInput: Parameters<typeof chat.sendMessageStream>[0] = {
      message: input,
    }

    while (callExecutionCount < MAX_CALLS) {
      const responseStream = await chat.sendMessageStream(currentInput)

      const functionCalls: NonNullable<
        Awaited<ReturnType<typeof chat.sendMessage>>["functionCalls"]
      > = []
      let lastResponse: Awaited<ReturnType<typeof chat.sendMessage>> | null =
        null

      for await (const chunk of responseStream) {
        lastResponse = chunk
        if (chunk.functionCalls && chunk.functionCalls.length > 0) {
          functionCalls.push(...chunk.functionCalls)
        }

        const candidate = chunk.candidates?.[0]
        if (candidate && candidate.content) {
          const parts = candidate.content.parts || []
          for (const part of parts) {
            if ((part as { thought?: unknown }).thought) {
              send({
                type: "text",
                content: part.text || "",
                isThought: true,
              })
            } else if (part.text) {
              send({ type: "text", content: part.text })
            }
          }
        }
      }

      if (!lastResponse) {
        throw new Error("AI Architect failed to generate a valid response.")
      }

      if (functionCalls.length > 0) {
        const toolResults = []

        for (const call of functionCalls) {
          const { name, args, id } = call
          if (!name) continue

          // Notify client about tool call
          send({
            type: "tool_call",
            name,
            args: (args as Record<string, unknown>) || {},
          })

          let toolOutput: Record<string, unknown> = {
            success: true,
          }

          try {
            if (name === "update_project_metadata") {
              const { title, description } =
                args as unknown as UpdateProjectMetadataArgs
              await prisma.project.update({
                where: { id: projectId },
                data: { title, description },
              })
              hasChanges = true
            } else if (name === "get_project_details") {
              const proj = await prisma.project.findUnique({
                where: { id: projectId },
                include: { slides: { orderBy: { index: "asc" } } },
              })
              if (proj) {
                toolOutput = {
                  success: true,
                  title: proj.title,
                  description: proj.description,
                  slides: proj.slides.map((s) => ({
                    id: s.id,
                    index: s.index,
                    title: s.title,
                    description: s.description,
                    prompt: s.prompt,
                    hasHtml: !!(s.html && s.html.trim().length > 0),
                  })),
                }
              } else {
                toolOutput = { success: false, error: "Project not found" }
              }
            } else if (name === "update_slide") {
              const { slideId, updates } = args as unknown as UpdateSlideArgs
              await prisma.slide.update({
                where: { id: slideId },
                data: updates,
              })
              hasChanges = true
            } else if (name === "delete_slide") {
              const { slideId } = args as unknown as DeleteSlideArgs
              const deletedSlide = await prisma.slide.delete({
                where: { id: slideId },
              })

              // Shift remaining slides down
              await prisma.slide.updateMany({
                where: {
                  projectId,
                  index: { gt: deletedSlide.index },
                },
                data: {
                  index: { decrement: 1 },
                },
              })
              hasChanges = true
            } else if (name === "add_slide") {
              const { index, slide } = args as unknown as AddSlideArgs

              // Shift existing slides up
              await prisma.slide.updateMany({
                where: {
                  projectId,
                  index: { gte: index },
                },
                data: {
                  index: { increment: 1 },
                },
              })

              await prisma.slide.create({
                data: {
                  ...slide,
                  projectId,
                  index,
                },
              })
              hasChanges = true
            }
          } catch (err) {
            console.error(`Tool execution error [${name}]:`, err)
            toolOutput = { success: false, error: String(err) }
          }

          toolResults.push({
            functionResponse: {
              name,
              response: { result: toolOutput },
              id,
            },
          })
        }

        // Set the tool results for the next turn
        currentInput = { message: toolResults }

        callExecutionCount++
      } else {
        // Update project data if changes occurred
        if (hasChanges) {
          const updatedProject = await prisma.project.findUnique({
            where: { id: projectId },
            include: { slides: { orderBy: { index: "asc" } } },
          })
          if (updatedProject) {
            send({
              type: "project_update",
              project: updatedProject as unknown as Record<string, unknown>,
            })
          }
        }

        // Deduct credits for the interaction
        await deductCredits(userId, 5).catch(() => {})

        break
      }
    }
  })
}
