import { z } from "zod"

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required"),
  GOOGLE_API_KEY: z.string().min(1, "GOOGLE_API_KEY is required"),

  // AWS S3 configurations
  AWS_REGION: z.string().default("auto"),
  AWS_ENDPOINT: z.string().min(1, "AWS_ENDPOINT is required"),
  AWS_ACCESS_KEY_ID: z.string().min(1, "AWS_ACCESS_KEY_ID is required"),
  AWS_SECRET_ACCESS_KEY: z.string().min(1, "AWS_SECRET_ACCESS_KEY is required"),
  AWS_S3_BUCKET_NAME: z.string().min(1, "AWS_S3_BUCKET_NAME is required"),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error(
    "❌ Invalid environment variables:",
    JSON.stringify(parsedEnv.error.format(), null, 2)
  )
  throw new Error(
    `Missing or invalid environment variables: ${Object.keys(
      parsedEnv.error.flatten().fieldErrors
    ).join(", ")}`
  )
}

export const {
  RESEND_API_KEY,
  GOOGLE_API_KEY,
  AWS_REGION,
  AWS_ENDPOINT,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_S3_BUCKET_NAME,
} = parsedEnv.data
