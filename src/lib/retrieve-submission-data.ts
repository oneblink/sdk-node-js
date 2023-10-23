import { AWSTypes, SubmissionTypes } from '@oneblink/types'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'

export default async function getSubmissionData(
  retrievalData: AWSTypes.FormS3Credentials,
): Promise<SubmissionTypes.S3SubmissionData> {
  const s3Client = new S3Client({
    region: retrievalData.s3.region,
    credentials: {
      accessKeyId: retrievalData.credentials.AccessKeyId,
      secretAccessKey: retrievalData.credentials.SecretAccessKey,
      sessionToken: retrievalData.credentials.SessionToken,
    },
  })

  const params = {
    Bucket: retrievalData.s3.bucket,
    Key: retrievalData.s3.key,
  }
  const s3Data = await s3Client.send(new GetObjectCommand(params))
  if (!s3Data.Body) {
    throw new Error('Could not find object in S3')
  }
  const formData = await s3Data.Body?.transformToString('utf-8')
  return JSON.parse(formData)
}
