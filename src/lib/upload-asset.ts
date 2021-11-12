import AWS from 'aws-sdk'
import { PreFillMeta } from '../types'

export default async function uploadAsset<T>(
  assetCredentials: PreFillMeta,
  data: T,
  assetContentType?: string,
): Promise<{ Location: string }> {
  const s3 = new AWS.S3({
    region: assetCredentials.s3.region,
    accessKeyId: assetCredentials.credentials.AccessKeyId,
    secretAccessKey: assetCredentials.credentials.SecretAccessKey,
    sessionToken: assetCredentials.credentials.SessionToken,
  })

  const objectMeta = {
    Bucket: assetCredentials.s3.bucket,
    Key: assetCredentials.s3.key,
    Body: data,
    Expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // Max 1 year
    CacheControl: 'max-age=31536000', // Max 1 year(365 days),
    ContentType: assetContentType,
    ACL: 'public-read',
  }
  const uploadOptions = {
    partSize: 5 * 1024 * 1024,
    queueSize: 1,
  }
  return await s3.upload(objectMeta, uploadOptions).promise()
}
