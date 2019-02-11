// @flow
'use strict'

const AWS = require('aws-sdk')

function getSubmissionData (
  retrievalData /* : FormRetrievalData */
) /* : Promise<S3SubmissionData> */ {
  const s3 = new AWS.S3({
    region: retrievalData.s3.region,
    accessKeyId: retrievalData.credentials.AccessKeyId,
    secretAccessKey: retrievalData.credentials.SecretAccessKey,
    sessionToken: retrievalData.credentials.SessionToken
  })

  const params = {
    Bucket: retrievalData.s3.bucket,
    Key: retrievalData.s3.key
  }
  return s3.getObject(params).promise()
    .then(s3Data => {
      const formData = s3Data.Body.toString()
      return JSON.parse(formData)
    })
}

module.exports = {
  getSubmissionData
}
