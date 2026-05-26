import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

/**
 * GET: Performs a deep search across the user's projects.
 * Logic:
 * - Searches top-level fields (Title, Description).
 * - Drills into the 'slides' JSONB column to find matches within specific slide content.
 * - Uses Case-Insensitive partial matching (ILIKE).
 */
export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const query = searchParams.get("q")

    if (!query || query.trim().length < 2) {
      return NextResponse.json([])
    }

    // Removed unused searchTerm

    // COMPLEX RAW QUERY:
    // We use $queryRaw because standard Prisma filtering on nested JSON arrays (slides)
    // is limited. This query checks if the search term exists in:
    // 1. The project title
    // 2. The project description
    // 3. ANY 'title', 'content', or 'description' key inside the 'slides' JSON array.
    const projects = await prisma.project.findMany({
      where: {
        userId: session.user.id,
        isDeleted: false,
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          {
            slides: {
              some: {
                OR: [
                  { title: { contains: query, mode: "insensitive" } },
                  { description: { contains: query, mode: "insensitive" } },
                ],
              },
            },
          },
        ],
      },
      orderBy: { updatedAt: "desc" },
      take: 10,
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error("[SEARCH_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
