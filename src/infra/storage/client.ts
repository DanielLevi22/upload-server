import { env } from '@/env'
import { S3Client } from '@aws-sdk/client-s3'

export const r2 = new S3Client({
  endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  region: 'auto',
  credentials: {
    accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID,
    secretAccessKey: env.CLOUDFLARE_ACCESS_KEY_ID,
  },
})
