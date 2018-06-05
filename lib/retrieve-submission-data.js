// @flow
'use strict'

/* ::
import type {
  RetrievalData
} from '../types.js'
*/

const axios = require('axios')
const AWS = require('aws-sdk')

function getCredentials (
  formId /* : string */,
  submissionId /* : string */,
  jwt /* : string */,
  apiOrigin /* : string */
) {
  let api = axios.create({
    baseURL: apiOrigin,
    headers: {'Authorization': `Bearer ${jwt}`}
  })

  return api.get(`/forms/${formId}/retrieval-credentials/${submissionId}`)
    .then(function (response) {
      return response.data
    })
}

function getDataFromS3 (
  retrievalData /* : RetrievalData */
) {
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
}

module.exports = {
  getCredentials,
  getDataFromS3
}
