import { PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { PreFillMeta } from '../types'

export default async function uploadAsset<T>(
  assetCredentials: PreFillMeta,
  data: T,
  assetContentType?: string,
): Promise<{ Location: string }> {
  const s3Client = new S3Client({
    region: assetCredentials.s3.region,
    credentials: {
      accessKeyId: assetCredentials.credentials.AccessKeyId,
      secretAccessKey: assetCredentials.credentials.SecretAccessKey,
      sessionToken: assetCredentials.credentials.SessionToken,
    },
  })

  const objectMeta: PutObjectCommandInput = {
    Bucket: assetCredentials.s3.bucket,
    Key: assetCredentials.s3.key,
    Body: data as PutObjectCommandInput['Body'],
    Expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // Max 1 year
    CacheControl: 'max-age=31536000', // Max 1 year(365 days),
    ContentType: assetContentType,
    ACL: 'public-read',
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
  return {
    Location: `https://s3.${assetCredentials.s3.region}.amazonaws.com/${
      assetCredentials.s3.bucket
    }/${encodeURI(assetCredentials.s3.key)}`,
  }
}
