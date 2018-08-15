// @flow
'use strict'

/* ::
import type {
  ConstructorOptions,
  FormsSearchOptions,
  FormsSearchResult,
  S3SubmissionData
} from '../types.js'
*/

const generateFormUrl = require('./generate-form-url.js')
const generateJWT = require('./generate-jwt.js')
const submissionData = require('./retrieve-submission-data.js')
const OneBlinkAPI = require('./one-blink-api.js')
const prefillData = require('./prefill-data')

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

  generateFormUrl (
    formId /* : ?mixed */,
    externalId /* : ?mixed */
  ) /* : Promise<{ expiry: string, formUrl: string }> */ {
    return super.searchRequest(`/organisations`)
      .then((results) => {
        if (typeof formId !== 'number') {
          throw new TypeError('Must supply "formId" as a number')
        }
        if (externalId && typeof externalId !== 'string') {
          throw new TypeError('Must supply "externalId" as a string or not at all')
        }
        if (!results.organisations || !results.organisations.length) {
          throw new Error('Access Denied. The "accessKey" and "secretKey" provided may have been revoked.')
        }

        // Default expiry for token is 8 hours
        const jwtExpiry = 28800

        const token = generateJWT(this.accessKey, this.secretKey, jwtExpiry)

        const formUrl = generateFormUrl(`https://${results.organisations[0].formsHostname}/forms`, formId, token, externalId)

        const expiry = new Date(Date.now() + (jwtExpiry * 1000)).toISOString()

        return {
          formUrl,
          expiry
        }
      })
  }

  getSubmissionData (
    formId /* : ?mixed */,
    submissionId /* : ?mixed */
  ) /* : Promise<S3SubmissionData> */ {
    if (typeof formId !== 'number') {
      return Promise.reject(new TypeError('Must supply "formId" as a number'))
    }
    if (typeof submissionId !== 'string') {
      return Promise.reject(new TypeError('Must supply "submissionId" as a string'))
    }

    return super.getRequest(`/forms/${formId}/retrieval-credentials/${submissionId}`)
      .then((credentials) => submissionData.getSubmissionData(credentials))
  }

  prefillData (formId /* : ?mixed */, data /* : mixed */) /* : Promise<mixed> */ {
    if (typeof formId !== 'number') {
      return Promise.reject(new TypeError('Must supply "formId" as a number'))
    }

    if (data === undefined || data === null) {
      return Promise.reject(new TypeError('"data" cannot be null or undefined'))
    }

    return super.getRequest(`/forms/${formId}/pre-fill-credentials`)
      .then((prefillMeta) => prefillData(prefillMeta, data))
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
