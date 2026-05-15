import {
  S3Client,
  CreateBucketCommand,
  PutBucketCorsCommand,
  HeadBucketCommand,
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

async function setupBucket() {
  console.log(`[SETUP] Checking bucket: ${AWS_S3_BUCKET_NAME}`)

  try {
    await s3.send(new HeadBucketCommand({ Bucket: AWS_S3_BUCKET_NAME }))
    console.log(`[SETUP] Bucket "${AWS_S3_BUCKET_NAME}" already exists.`)
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      (error.name === "NotFound" ||
        (error as AWSError).$metadata?.httpStatusCode === 404)
    ) {
      console.log(
        `[SETUP] Bucket not found. Creating "${AWS_S3_BUCKET_NAME}"...`
      )
      await s3.send(new CreateBucketCommand({ Bucket: AWS_S3_BUCKET_NAME }))
      console.log(`[SETUP] Bucket created successfully.`)
    } else {
      throw error
    }
  }

  console.log(`[SETUP] Configuring CORS for "${AWS_S3_BUCKET_NAME}"...`)
  await s3.send(
    new PutBucketCorsCommand({
      Bucket: AWS_S3_BUCKET_NAME,
      CORSConfiguration: {
        CORSRules: [
          {
            AllowedHeaders: ["*"],
            AllowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
            AllowedOrigins: ["*"],
            ExposeHeaders: ["ETag"],
            MaxAgeSeconds: 3600,
          },
        ],
      },
    })
  )
  console.log(`[SETUP] CORS configured successfully (AllowedOrigins: *).`)
  console.log(`[SETUP] Bucket setup complete.`)
}

setupBucket().catch((err) => {
  console.error(`[SETUP] Failed to setup bucket:`, err)
  process.exit(1)
})
