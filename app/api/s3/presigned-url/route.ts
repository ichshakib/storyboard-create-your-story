import { NextResponse } from "next/server"
import { getPresignedPostUrl } from "@/lib/s3"
import { auth } from "@/lib/auth"

/**
 * POST: Generates a presigned URL for client-side uploads to S3/R2.
 */
export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { filename, contentType } = await req.json()

    if (!filename || !contentType) {
      return NextResponse.json(
        { error: "Missing filename or contentType" },
        { status: 400 }
      )
    }

    // Generate a unique key for the file
    // Sanitize filename to prevent directory traversal
    const sanitizedFilename = filename.replace(/^(\.\.\/)+/, '').replace(/[\/\\?%*:|"<>]/g, '-')
    // Validate contentType (allow common image/document formats)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
    if (!allowedTypes.includes(contentType)) {
      return NextResponse.json({ error: 'Invalid content type' }, { status: 400 })
    }

    const timestamp = Date.now()
    const key = `uploads/${session.user.id}/${timestamp}-${sanitizedFilename}`

    const url = await getPresignedPostUrl(key, contentType)

    return NextResponse.json({ url, key })
  } catch (error) {
    console.error("Error generating presigned URL:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
