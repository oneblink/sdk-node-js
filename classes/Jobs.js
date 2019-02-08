// @flow
'use strict'

const OneBlinkAPI = require('../lib/one-blink-api.js')

module.exports = class Forms extends OneBlinkAPI {
  constructor (
    options /* : ConstructorOptions */
  ) {
    options = options || {}
    super(
      options.oneBlinkAPIOrigin,
      options.accessKey,
      options.secretKey
    )
  }

  deleteJob (
    jobId /* : ?mixed */
  ) /* : Promise<void> */ {
    if (!jobId || typeof jobId !== 'string') {
      return Promise.reject(new TypeError('Must supply "jobId" as a string'))
    }

    return super.deleteRequest(`/jobs/${jobId}`)
  }
}
