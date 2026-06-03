import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import {
  AWS_REGION,
  AWS_ENDPOINT,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_S3_BUCKET_NAME,
} from "./env"

/**
 * Initialize S3 Client
 */
export const s3 = new S3Client({
  region: AWS_REGION || "auto",
  endpoint: AWS_ENDPOINT,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
})

/**
 * Sanitizes an S3 key to prevent path traversal and ensure safe bucket access.
 */
function sanitizeKey(key: string): string {
  // Prevent directory traversal by checking for '..' and ensuring path is safe
  if (key.includes("..")) {
    throw new Error("Invalid S3 key: Path traversal detected")
  }

  // Remove leading slashes
  const sanitized = key.replace(/^\/+/, "").trim()

  if (!sanitized) {
    throw new Error("Invalid S3 key: Key cannot be empty or root")
  }

  return sanitized
}

/**
 * Generates a presigned URL for uploading a file to S3.
 * @param key - The destination path/filename in the bucket
 * @param contentType - The MIME type of the file
 * @param expiresIn - Expiration time in seconds (default 3600)
 */
export async function getPresignedPostUrl(
  key: string,
  contentType: string,
  expiresIn: number = 3600
) {
  const command = new PutObjectCommand({
    Bucket: AWS_S3_BUCKET_NAME,
    Key: sanitizeKey(key),
    ContentType: contentType,
  })

  const url = await getSignedUrl(s3, command, { expiresIn })
  return url
}

/**
 * Generates a signed URL for reading/downloading a file from S3.
 * @param key - The path/filename in the bucket
 * @param expiresIn - Expiration time in seconds (default 3600)
 */
export async function getSignedDownloadUrl(
  key: string,
  expiresIn: number = 3600
) {
  const command = new GetObjectCommand({
    Bucket: AWS_S3_BUCKET_NAME,
    Key: sanitizeKey(key),
  })

  const url = await getSignedUrl(s3, command, { expiresIn })
  return url
}

/**
 * Uploads a buffer directly to S3.
 * @param key - The destination path/filename in the bucket
 * @param buffer - The file content as a Buffer
 * @param contentType - The MIME type of the file
 */
export async function uploadToS3(
  key: string,
  buffer: Buffer,
  contentType: string
) {
  const sanitizedKey = sanitizeKey(key)
  const command = new PutObjectCommand({
    Bucket: AWS_S3_BUCKET_NAME,
    Key: sanitizedKey,
    Body: buffer,
    ContentType: contentType,
  })

  await s3.send(command)
  return sanitizedKey
}

/**
 * Deletes an object from S3.
 * @param key - The path/filename in the bucket
 */
export async function deleteFromS3(key: string) {
  const command = new DeleteObjectCommand({
    Bucket: AWS_S3_BUCKET_NAME,
    Key: sanitizeKey(key),
  })

  await s3.send(command)
}

/**
 * Deletes multiple objects from S3.
 * @param keys - Array of paths/filenames in the bucket
 */
export async function deleteMultipleFromS3(keys: string[]) {
  if (keys.length === 0) return

  const command = new DeleteObjectsCommand({
    Bucket: AWS_S3_BUCKET_NAME,
    Delete: {
      Objects: keys.map((key) => ({ Key: sanitizeKey(key) })),
    },
  })

  await s3.send(command)
}
