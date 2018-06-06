// @flow
'use strict'

/* ::
import type {
  ConstructorOptions,
  FormsSearchOptions,
  FormsSearchResult
} from '../types.js'
*/

const generateFormUrl = require('./generate-form-url.js')
const generateJWT = require('./generate-jwt.js')
const submissionData = require('./retrieve-submission-data.js')
const OneBlinkAPI = require('./one-blink-api.js')

module.exports = class Forms extends OneBlinkAPI {
  /* ::
  accessKey: string
  secretKey: string
  formsRendererOrigin: string
  */
  constructor (
    options /* : ConstructorOptions */
  ) {
    options = options || {}
    if (!options.accessKey || typeof options.accessKey !== 'string') {
      throw new TypeError('Must supply Access Key as a string')
    }
    if (!options.secretKey || typeof options.secretKey !== 'string') {
      throw new TypeError('Must supply Secret Key as a string')
    }

    super(
      typeof options.oneBlinkAPIOrigin === 'string' ? options.oneBlinkAPIOrigin : 'https://auth-api.blinkm.io',
      options.accessKey,
      options.secretKey
    )

    this.accessKey = options.accessKey
    this.secretKey = options.secretKey
    this.formsRendererOrigin = typeof options.formsRendererOrigin === 'string' ? options.formsRendererOrigin : 'https://forms.oneblink.io'
  }

  generateFormUrl (
    formId /* : ?mixed */,
    externalId /* : ?mixed */
  ) {
    if (typeof formId !== 'number') {
      throw new TypeError('Must supply "formId" as a number')
    }
    if (externalId && typeof externalId !== 'string') {
      throw new TypeError('Must supply "externalId" as a string or not at all')
    }

    // Default expiry for token is 8 hours
    const jwtExpiry = 28800

    const token = generateJWT(this.accessKey, this.secretKey, jwtExpiry)

    const url = generateFormUrl(this.formsRendererOrigin, formId, token, externalId)

    let exp = new Date(Date.now() + (jwtExpiry * 1000)).toISOString()

    return {
      formUrl: url,
      expiry: exp
    }
  }

  getSubmissionData (
    formId /* : ?mixed */,
    submissionId /* : ?mixed */
  ) {
    if (typeof formId !== 'number') {
      return Promise.reject(new TypeError('Must supply "formId" as a number'))
    }
    if (typeof submissionId !== 'string') {
      return Promise.reject(new TypeError('Must supply "submissionId" as a string'))
    }

    return super.getRequest(`/forms/${formId}/retrieval-credentials/${submissionId}`)
      .then((credentials) => submissionData.getSubmissionData(credentials))
  }

  search (options /* : FormsSearchOptions */) /* : Promise<FormsSearchResult> */ {
    options = options || {}

    if (!options.organisationId || typeof options.organisationId !== 'string') {
      return Promise.reject(new TypeError('Must supply "organisationId" as a string'))
    }

    let searchParams = {
      organisationId: options.organisationId
    }

    if (typeof options.isPublished === 'boolean') {
      searchParams = Object.assign({}, searchParams, {
        isPublished: options.isPublished
      })
    }

    return super.searchRequest(`/forms`, searchParams)
  }
}
