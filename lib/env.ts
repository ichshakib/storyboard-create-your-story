import { z } from "zod"

const envSchema = z.object({
  RESEND_API_KEY: z
    .string()
    .min(1, "Missing required environment variable: RESEND_API_KEY"),
  GOOGLE_API_KEY: z
    .string()
    .min(1, "Missing required environment variable: GOOGLE_API_KEY"),
  AWS_REGION: z
    .string()
    .min(1, "Missing required environment variable: AWS_REGION"),
  AWS_ENDPOINT: z
    .string()
    .min(1, "Missing required environment variable: AWS_ENDPOINT"),
  AWS_ACCESS_KEY_ID: z
    .string()
    .min(1, "Missing required environment variable: AWS_ACCESS_KEY_ID"),
  AWS_SECRET_ACCESS_KEY: z
    .string()
    .min(1, "Missing required environment variable: AWS_SECRET_ACCESS_KEY"),
  AWS_S3_BUCKET_NAME: z
    .string()
    .min(1, "Missing required environment variable: AWS_S3_BUCKET_NAME"),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error("❌ Invalid environment variables:", _env.error.format())
  throw new Error("Invalid environment variables")
}

export const {
  RESEND_API_KEY,
  GOOGLE_API_KEY,
  AWS_REGION,
  AWS_ENDPOINT,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_S3_BUCKET_NAME,
} = _env.data
