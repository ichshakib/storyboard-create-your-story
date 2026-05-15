import { NextResponse } from "next/server"
import { getSignedDownloadUrl } from "@/lib/s3"
import { auth } from "@/lib/auth"

/**
 * GET: Generates a signed URL for reading a file from S3/R2.
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
    const url = await getSignedDownloadUrl(key)
    return NextResponse.json({ url })
  } catch (error) {
    console.error("Error generating signed URL:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
