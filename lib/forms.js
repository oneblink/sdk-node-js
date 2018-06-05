// @flow
'use strict'

/* ::
import type {
  ConstructorOptions
} from '../types.js'
*/

const generateFormUrl = require('./generate-form-url.js')
const generateJWT = require('./generate-jwt.js')
const submissionData = require('./retrieve-submission-data.js')

module.exports = class Forms {
  /* ::
  accessKey: string
  secretKey: string
  formsRendererHostname: string
  oneBlinkAPIOrigin: string
  */
  constructor (
    options /* : ConstructorOptions */
  ) {
    options = options || {}
    if (!options.accessKey) {
      throw new TypeError('must supply an Access Key')
    }
    if (typeof options.accessKey !== 'string') {
      throw new TypeError('Access Key must be a string')
    }
    if (!options.secretKey) {
      throw new TypeError('must supply an Secret Key')
    }
    if (typeof options.secretKey !== 'string') {
      throw new TypeError('Secret Key must be a string')
    }
    this.accessKey = options.accessKey
    this.secretKey = options.secretKey
    this.formsRendererHostname = options.formsRendererHostname || 'https://forms.oneblink.io'
    this.oneBlinkAPIOrigin = options.oneBlinkAPIOrigin || 'https://auth-api.blinkm.io'
  }

  generateFormUrl (
    formId /* : number */,
    externalId /* : ?string */
  ) {
    // Default expiry for token is 8 hours
    const jwtExpiry = 28800

    const token = generateJWT(this.accessKey, this.secretKey, jwtExpiry)

    const url = generateFormUrl(this.formsRendererHostname, formId, token, externalId)

    let exp = new Date(Date.now() + (jwtExpiry * 1000)).toISOString()

    return {
      formUrl: url,
      expiry: exp
    }
  }

  getSubmissionData (
    formId /* : string */,
    submissionId /* : string */
  ) {
    // 5 minute expiry
    const jwtExpiry = 300

    const token = generateJWT(this.accessKey, this.secretKey, jwtExpiry)

    return submissionData.getCredentials(formId, submissionId, token, this.oneBlinkAPIOrigin)
      .then((credentials) => {
        return submissionData.getDataFromS3(credentials)
      })
  }
}
