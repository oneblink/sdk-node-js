import { S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { PreFillMeta } from '../types'

export default async function setPreFillData(
  preFillMeta: PreFillMeta,
  data: unknown,
): Promise<void> {
  const s3Client = new S3Client({
    region: preFillMeta.s3.region,
    credentials: {
      accessKeyId: preFillMeta.credentials.AccessKeyId,
      secretAccessKey: preFillMeta.credentials.SecretAccessKey,
      sessionToken: preFillMeta.credentials.SessionToken,
    },
  })

  const objectMeta = {
    Bucket: preFillMeta.s3.bucket,
    Key: preFillMeta.s3.key,
    Body: JSON.stringify(data),
    Expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // Max 1 year
    CacheControl: 'max-age=31536000', // Max 1 year(365 days)
    ContentType: 'application/json',
  }
  const managedUpload = new Upload({
    client: s3Client,
    params: objectMeta,
    partSize: 5 * 1024 * 1024,
    queueSize: 1,
    //Related github issue: https://github.com/aws/aws-sdk-js-v3/issues/2311
    //This is a variable that is set to false by default, setting it to true
    //means that it will force the upload to fail when one part fails on
    //an upload. The S3 client has built in retry logic to retry uploads by default
    leavePartsOnError: true,
  })

  await managedUpload.done()
}
