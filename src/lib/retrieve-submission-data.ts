import { SubmissionTypes } from '@oneblink/types'
import AWS from 'aws-sdk'
import { FormRetrievalData } from '../types'

export default async function getSubmissionData(
  retrievalData: FormRetrievalData,
): Promise<SubmissionTypes.S3SubmissionData> {
  const s3 = new AWS.S3({
    region: retrievalData.s3.region,
    accessKeyId: retrievalData.credentials.AccessKeyId,
    secretAccessKey: retrievalData.credentials.SecretAccessKey,
    sessionToken: retrievalData.credentials.SessionToken,
  })

  const params = {
    Bucket: retrievalData.s3.bucket,
    Key: retrievalData.s3.key,
  }
  const s3Data = await s3.getObject(params).promise()
  if (!s3Data.Body) {
    throw new Error('Could not find object in S3')
  }
  const formData = s3Data.Body.toString()
  return JSON.parse(formData)
}
