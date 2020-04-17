// @flow
'use strict'

const AWS = require('aws-sdk')

function setPreFillData(
  preFillMeta /* : PreFillMeta */,
  data /* : mixed */,
) /* : Promise<mixed> */ {
  const s3 = new AWS.S3({
    region: preFillMeta.s3.region,
    accessKeyId: preFillMeta.credentials.AccessKeyId,
    secretAccessKey: preFillMeta.credentials.SecretAccessKey,
    sessionToken: preFillMeta.credentials.SessionToken,
  })

  const objectMeta = {
    Bucket: preFillMeta.s3.bucket,
    Key: preFillMeta.s3.key,
    Body: Buffer.from(JSON.stringify(data) || '{}', 'UTF-8'),
    Expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // Max 1 year
    CacheControl: 'max-age=31536000', // Max 1 year(365 days)
  }
  const uploadOptions = {
    partSize: 5 * 1024 * 1024,
    queueSize: 1,
  }
  return s3
    .upload(objectMeta, uploadOptions)
    .promise()
    .then(() => ({}))
}

module.exports = setPreFillData
