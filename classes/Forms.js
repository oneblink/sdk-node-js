// @flow
'use strict'

const generateFormUrl = require('../lib/generate-form-url.js')
const generateJWT = require('../lib/generate-jwt.js')
const submissionData = require('../lib/retrieve-submission-data.js')
const OneBlinkAPI = require('../lib/one-blink-api.js')
const setPreFillData = require('../lib/pre-fill-data')

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

  async generateFormUrl (
    formId /* : ?mixed */,
    externalId /* : ?mixed */,
    preFillData /* : ?mixed */
  ) /* : Promise<{ expiry: string, formUrl: string }> */ {
    if (typeof formId !== 'number') {
      throw new TypeError('Must supply "formId" as a number')
    }

    if (externalId && typeof externalId !== 'string') {
      throw new TypeError('Must supply "externalId" as a string or not at all')
    }

    const hostname = await this.getHostname(formId)

    let preFillFormDataId
    if (preFillData) {
      const preFillMeta = await super.postRequest(`/forms/${formId}/pre-fill-credentials`)
      await setPreFillData(preFillMeta, preFillData)
      preFillFormDataId = preFillMeta.preFillFormDataId
    }
    // Default expiry for token is 8 hours
    const jwtExpiry = 28800

    const token = generateJWT(this.accessKey, this.secretKey, jwtExpiry)

    const formUrl = generateFormUrl(`https://${hostname}/forms`, formId, token, externalId, preFillFormDataId)

    const expiry = new Date(Date.now() + (jwtExpiry * 1000)).toISOString()

    return {
      formUrl,
      expiry
    }
  }

  async getHostname (
    formId /* : number */
  ) {
    try {
      const formResults = await super.getRequest(`/forms/${formId}`)

      if (!formResults || !formResults.formsAppIds.length) {
        throw new Error('Access Denied. The "accessKey" and "secretKey" provided may have been revoked.')
      }

      const appResults = await super.getRequest(`/forms-apps/${formResults.formsAppIds[0]}`)

      if (!appResults || !appResults.hostname) {
        throw new Error('Access Denied. The "accessKey" and "secretKey" provided may have been revoked.')
      }

      return appResults.hostname
    } catch (e) {
      const organisationsResults = await super.searchRequest(`/organisations`)
      if (!organisationsResults.organisations || !organisationsResults.organisations.length) {
        throw new Error('Access Denied. The "accessKey" and "secretKey" provided may have been revoked.')
      }
      return organisationsResults.organisations[0].formsHostname
    }
  }

  async generateSubmissionDataUrl (
    formId /* : ?mixed */,
    submissionId /* : ?mixed */,
    expiryInSeconds /* : ?mixed */
  ) /* : Promise<{ url: string }> */ {
    if (typeof formId !== 'number') {
      return Promise.reject(new TypeError('Must supply "formId" as a number'))
    }
    if (typeof submissionId !== 'string') {
      return Promise.reject(new TypeError('Must supply "submissionId" as a string'))
    }
    if (typeof expiryInSeconds !== 'number') {
      return Promise.reject(new TypeError('Must supply "expiryInSeconds" as a number'))
    }
    if (expiryInSeconds < 900) {
      return Promise.reject(new TypeError('"expiryInSeconds" must be greater than or equal to 900'))
    }

    return super.postRequest(`/forms/${formId}/retrieval-url/${submissionId}?expirySeconds=${expiryInSeconds}`)
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

    return super.postRequest(`/forms/${formId}/retrieval-credentials/${submissionId}`)
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

  getForm (formId /* : ?mixed */) /* : Promise<Form> */ {
    if (typeof formId !== 'number') {
      return Promise.reject(new TypeError('Must supply "formId" as a number'))
    }

    return super.getRequest(`/forms/${formId}`)
  }
}
