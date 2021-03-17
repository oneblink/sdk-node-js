import AWS from 'aws-sdk'
import { PreFillMeta } from './types'

export default async function setPreFillData(
  preFillMeta: PreFillMeta,
  data: unknown,
): Promise<void> {
  const s3 = new AWS.S3({
    region: preFillMeta.s3.region,
    accessKeyId: preFillMeta.credentials.AccessKeyId,
    secretAccessKey: preFillMeta.credentials.SecretAccessKey,
    sessionToken: preFillMeta.credentials.SessionToken,
  })

  const objectMeta = {
    Bucket: preFillMeta.s3.bucket,
    Key: preFillMeta.s3.key,
    Body: JSON.stringify(data),
    Expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // Max 1 year
    CacheControl: 'max-age=31536000', // Max 1 year(365 days)
    ContentType: 'application/json',
  }
  const uploadOptions = {
    partSize: 5 * 1024 * 1024,
    queueSize: 1,
  }
  await s3.upload(objectMeta, uploadOptions).promise()
}
