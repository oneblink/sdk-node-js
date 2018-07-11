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
  formsRendererOrigin: string
  */
  constructor (
    options /* : ConstructorOptions */
  ) {
    options = options || {}
    super(
      options.oneBlinkAPIOrigin,
      options.accessKey,
      options.secretKey
    )
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

    const formUrl = generateFormUrl(this.formsRendererOrigin, formId, token, externalId)

    const expiry = new Date(Date.now() + (jwtExpiry * 1000)).toISOString()

    return {
      formUrl,
      expiry
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

  search (options /* : ?FormsSearchOptions */) /* : Promise<FormsSearchResult> */ {
    options = options || {}

    let searchParams = {}

    if (typeof options.isAuthenticated === 'boolean') {
      searchParams = Object.assign({}, searchParams, {
        isAuthenticated: options.isAuthenticated
      })
    }

    if (typeof options.isPublished === 'boolean') {
      searchParams = Object.assign({}, searchParams, {
        isPublished: options.isPublished
      })
    }

    if (typeof options.name === 'string') {
      searchParams = Object.assign({}, searchParams, {
        name: options.name
      })
    }

    return super.searchRequest(`/forms`, searchParams)
  }
}
