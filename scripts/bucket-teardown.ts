import {
  S3Client,
  ListObjectsV2Command,
  DeleteObjectsCommand,
  DeleteBucketCommand,
} from "@aws-sdk/client-s3"
import "dotenv/config"

const {
  AWS_REGION,
  AWS_ENDPOINT,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_S3_BUCKET_NAME,
} = process.env

const s3 = new S3Client({
  region: AWS_REGION || "auto",
  endpoint: AWS_ENDPOINT,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID!,
    secretAccessKey: AWS_SECRET_ACCESS_KEY!,
  },
})

interface AWSError {
  name: string
  $metadata?: {
    httpStatusCode?: number
  }
}

async function teardownBucket() {
  console.log(`[TEARDOWN] Starting teardown for bucket: ${AWS_S3_BUCKET_NAME}`)

  // 1. List and Delete all objects
  console.log(`[TEARDOWN] Purging all objects from "${AWS_S3_BUCKET_NAME}"...`)
  const listResponse = await s3.send(
    new ListObjectsV2Command({
      Bucket: AWS_S3_BUCKET_NAME,
    })
  )

  if (listResponse.Contents && listResponse.Contents.length > 0) {
    const keys = listResponse.Contents.map((obj) => ({ Key: obj.Key! }))
    await s3.send(
      new DeleteObjectsCommand({
        Bucket: AWS_S3_BUCKET_NAME,
        Delete: { Objects: keys },
      })
    )
    console.log(`[TEARDOWN] Deleted ${keys.length} objects.`)
  } else {
    console.log(`[TEARDOWN] Bucket is already empty.`)
  }

  // 2. Delete the bucket
  console.log(`[TEARDOWN] Deleting bucket "${AWS_S3_BUCKET_NAME}"...`)
  try {
    await s3.send(new DeleteBucketCommand({ Bucket: AWS_S3_BUCKET_NAME }))
    console.log(`[TEARDOWN] Bucket deleted successfully.`)
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      (error.name === "NotFound" ||
        (error as AWSError).$metadata?.httpStatusCode === 404)
    ) {
      console.log(`[TEARDOWN] Bucket "${AWS_S3_BUCKET_NAME}" does not exist.`)
    } else {
      throw error
    }
  }

  console.log(`[TEARDOWN] Bucket teardown complete.`)
}

teardownBucket().catch((err) => {
  console.error(`[TEARDOWN] Failed to teardown bucket:`, err)
  process.exit(1)
})
