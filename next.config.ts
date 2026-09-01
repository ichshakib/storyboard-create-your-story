import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  env: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    AWS_REGION: process.env.AWS_REGION,
    AWS_ENDPOINT: process.env.AWS_ENDPOINT,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
  },
}

export default nextConfig
