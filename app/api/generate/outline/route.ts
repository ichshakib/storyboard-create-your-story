import { generateObject } from "@/llm/generate-object"

export const dynamic = "force-dynamic"
import { OUTLINE_AND_HTML_SYSTEM_PROMPT } from "@/llm/prompts"
import { getInspirationsMetadata } from "@/inspirations/registry"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { deductCredits, getOrResetCredits } from "@/lib/credits"

// Allow long-running AI generation (up to 60s)
export const maxDuration = 60

/**
 * POST: Orchestrates the AI generation of a storyboard outline.
 * Process:
 * 1. Checks user credits (requires a 5,000 credit reserve).
 * 2. Uses an LLM to generate a structured JSON object (title, slides).
 * 3. Calculates the dynamic credit cost based on the generated text length.
 * 4. Deducts credits and persists the project structure to the database.
 */
export async function POST(req: Request) {
  try {
    const { prompt, projectId } = await req.json()
    if (!prompt) return new Response("Prompt is required", { status: 400 })

    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) return new Response("Unauthorized", { status: 401 })

    // 1. Credit Check
    const userCredits = await getOrResetCredits(session.user.id)
    if (userCredits < 1) {
      return new Response(JSON.stringify({ error: "INSUFFICIENT_CREDITS" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      })
    }

    // 2. Generate Outline Schema (Plain JSON Object as per documentation)
    const jsonSchema = {
      type: "object",
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        visualTheme: {
          type: "string",
          description:
            "A technical description of the project's visual DNA (colors, typography, vibe).",
        },
        slides: {
          type: "array",
          items: {
            type: "object",
            properties: {
              title: { type: "string" },
              prompt: { type: "string" },
              description: { type: "string" },
              html: {
                type: "string",
                description:
                  "Complete self-contained HTML for the slide, starting with <div id='preview-root' class='w-[960px] h-[540px] ...'>",
              },
            },
            required: ["title", "prompt", "description", "html"],
          },
        },
      },
      required: ["title", "description", "slides"],
    }

    const { object } = await generateObject({
      jsonSchema,
      messages: [
        {
          role: "system",
          content:
            OUTLINE_AND_HTML_SYSTEM_PROMPT +
            `\n\nDesign Styles Available:\n${getInspirationsMetadata()}`,
        },
        {
          role: "user",
          content: `Create a comprehensive storyboard outline for: "${prompt}"`,
        },
      ],
      temperature: 1.0,
    })

    // 3. Deduct Credit
    await deductCredits(session.user.id, 1)

    // 4. Persistence
    const reindexedSlides = (
      (object.slides as {
        title: string
        prompt: string
        description: string
      }[]) || []
    ).map((s, idx: number) => ({
      index: idx,
      title: s.title || `Section ${idx + 1}`,
      prompt: s.prompt || "Visual direction pending...",
      description: s.description || "Narrative content pending...",
      html: (s as { html?: string }).html || "",
      assets: [],
    }))

    if (!projectId) {
      return Response.json({ ...object, slides: reindexedSlides })
    }

    // 5. Cleanup & Regeneration
    // First, fetch existing slides to purge their S3 assets
    const existingSlides = await prisma.slide.findMany({
      where: { projectId },
      select: { assets: true },
    })

    const assetKeysToPurge: string[] = []
    existingSlides.forEach((slide) => {
      const assets = (slide.assets as Array<{ key?: string }>) || []
      assets.forEach((asset) => {
        if (asset.key) assetKeysToPurge.push(asset.key)
      })
    })

    if (assetKeysToPurge.length > 0) {
      const { deleteMultipleFromS3 } = await import("@/lib/s3")
      await deleteMultipleFromS3(assetKeysToPurge).catch((err) =>
        console.error("Failed to purge assets during regeneration:", err)
      )
    }

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        title: object.title,
        description: object.description,
        slides: {
          deleteMany: {},
          create: reindexedSlides,
        },
      },
      include: {
        slides: { orderBy: { index: "asc" } },
      },
    })

    return Response.json(updatedProject)
  } catch (error) {
    console.error("Outline Generation Error:", error)
    return new Response("Outline Generation Failed", { status: 500 })
  }
}
