import { ai, Content } from "@/llm/client"

export const dynamic = "force-dynamic"
import { CHAT_MODEL } from "@/llm/constants"
import { CHAT_REFINEMENT_SYSTEM_PROMPT } from "@/llm/prompts"
import { STORYBOARD_TOOLS } from "@/llm/tools"
import { Message } from "@/llm/types"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { getOrResetCredits, deductCredits } from "@/lib/credits"
import { createAIStream } from "@/llm/stream-text"

export const maxDuration = 120

interface ProjectSlide {
  id: string
  title: string
  description: string
  prompt: string
  index: number
}

interface ProjectData {
  title: string
  description: string
  slides: ProjectSlide[]
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

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) return new Response("Unauthorized", { status: 401 })

    const {
      projectId,
      message,
      history: chatHistory,
      projectData,
    }: {
      projectId: string
      message: string
      history: Message[]
      projectData: ProjectData
    } = await req.json()

    // 1. Credit Check
    const userCredits = await getOrResetCredits(session.user.id)
    if (userCredits < 10) {
      return new Response(JSON.stringify({ error: "INSUFFICIENT_CREDITS" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      })
    }

    const userContent = `PROJECT CONTEXT:
Title: ${projectData.title}
Description: ${projectData.description}
Slides: ${JSON.stringify(
      projectData.slides.map((s, i: number) => ({
        index: i,
        title: s.title,
        description: s.description,
        prompt: s.prompt,
        id: s.id,
      })),
      null,
      2
    )}

USER FEEDBACK: "${message}"`

    const contents: Content[] = [
      ...chatHistory.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      { role: "user", parts: [{ text: userContent }] },
    ]

    const stream = createAIStream(async (send) => {
      let callExecutionCount = 0
      const MAX_CALLS = 5
      let hasChanges = false

      while (callExecutionCount < MAX_CALLS) {
        const response = await ai.models.generateContent({
          model: CHAT_MODEL,
          contents,
          config: {
            systemInstruction: CHAT_REFINEMENT_SYSTEM_PROMPT,
            tools: STORYBOARD_TOOLS,
          },
        })

        // CRITICAL FIX: Push the entire model response content to history
        // to preserve 'thought' parts and signatures.
        const candidate = response.candidates?.[0]
        if (!candidate || !candidate.content) {
          throw new Error("AI Architect failed to generate a valid response.")
        }

        const modelContent: Content = candidate.content
        contents.push(modelContent)

        if (response.functionCalls && response.functionCalls.length > 0) {
          const calls = response.functionCalls
          const toolResults = []

          for (const call of calls) {
            const { name, args, id } = call
            if (!name) continue

            // Notify client about tool call
            send({
              type: "tool_call",
              name,
              args: (args as Record<string, unknown>) || {},
            })

            let toolOutput: { success: boolean; error?: string } = {
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

          // Add the tool results to history for the next turn
          contents.push({
            role: "user",
            parts: toolResults,
          })

          callExecutionCount++
        } else {
          // Final text response turn - use streaming for the last part
          const streamResponse = await ai.models.generateContentStream({
            model: CHAT_MODEL,
            contents,
            config: {
              systemInstruction: CHAT_REFINEMENT_SYSTEM_PROMPT,
              tools: STORYBOARD_TOOLS,
            },
          })

          for await (const chunk of streamResponse) {
            const parts = chunk.candidates?.[0]?.content?.parts || []
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
          await deductCredits(session.user.id, 5).catch(() => {})

          break
        }
      }
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  } catch (error) {
    console.error("Chat fatal error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
