import { NextResponse } from "next/server"
import { getSignedDownloadUrl } from "@/lib/s3"
import { auth } from "@/lib/auth"

/**
 * GET: Redirects to a signed S3/R2 URL for a given key.
 * This allows images in AI-generated HTML to load correctly.
 */
export async function GET(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const key = searchParams.get("key")

  if (!key) {
    return NextResponse.json({ error: "Missing key" }, { status: 400 })
  }

  try {
    if (!key.startsWith(`uploads/${session.user.id}/`)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }
    // Generate a signed URL that lasts for 1 hour
    const url = await getSignedDownloadUrl(key, 3600)

    // Redirect to the signed URL
    return NextResponse.redirect(url)
  } catch (error) {
    console.error("Error in S3 view redirect:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
