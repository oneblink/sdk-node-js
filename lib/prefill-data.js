// @flow
'use strict'

/* ::
import type {
  PrefillMeta,
  S3SubmissionData
} from '../types.js'
*/

const AWS = require('aws-sdk')

function setPrefillData (
  prefillMeta /* : PrefillMeta */,
  data /* : mixed */
)/* : Promise<mixed> */ {
  const s3 = new AWS.S3({
    region: prefillMeta.s3.region,
    accessKeyId: prefillMeta.credentials.AccessKeyId,
    secretAccessKey: prefillMeta.credentials.SecretAccessKey,
    sessionToken: prefillMeta.credentials.SessionToken
  })

  const objectMeta = {
    Bucket: prefillMeta.s3.bucket,
    Key: prefillMeta.s3.key,
    Body: Buffer.from(JSON.stringify(data), 'UTF-8')
  }
  const uploadOptions = {
    partSize: 5 * 1024 * 1024,
    queueSize: 1
  }
  return s3.upload(objectMeta, uploadOptions)
    .promise()
    .then(() => ({}))
}

module.exports = setPrefillData
