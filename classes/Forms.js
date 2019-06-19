// @flow
'use strict'

const generateFormUrl = require('../lib/generate-form-url.js')
const generateJWT = require('../lib/generate-jwt.js')
const submissionData = require('../lib/retrieve-submission-data.js')
const OneBlinkAPI = require('../lib/one-blink-api.js')
const setPreFillData = require('../lib/pre-fill-data')
const { validateWithFormSchema } = require('../lib/forms-validation.js')
const generateFormElement = require('../lib/generate-form-element.js')

module.exports = class Forms extends OneBlinkAPI {
  constructor(options /* : ConstructorOptions */) {
    options = options || {}
    super(options.oneBlinkAPIOrigin, options.accessKey, options.secretKey)
  }

  async generateFormUrl(
    parameters /* : {
      formId: ?mixed,
      formsAppId?: ?mixed,
      externalId?: ?mixed,
      preFillData? : ?mixed,
      expiryInSeconds?: ?mixed
    } */
  ) /* : Promise<{ expiry: string, formUrl: string }> */ {
    if (typeof parameters !== 'object') {
      throw new TypeError('Parameters not provided.')
    }

    const expiryInSeconds = parameters.expiryInSeconds
    if (expiryInSeconds !== undefined && typeof expiryInSeconds !== 'number') {
      throw new TypeError(
        'Must supply "expiryInSeconds" as a number or not at all'
      )
    }

    const externalId = parameters.externalId
    if (externalId && typeof externalId !== 'string') {
      throw new TypeError('Must supply "externalId" as a string or not at all')
    }

    const formId = parameters.formId
    if (typeof formId !== 'number') {
      throw new TypeError('Must supply "formId" as a number')
    }

    let formsAppId = parameters.formsAppId
    if (
      typeof formsAppId !== 'number' &&
      formsAppId !== undefined &&
      formsAppId !== null
    ) {
      throw new TypeError('Must supply "formsAppId" as a number or not at all')
    }

    if (typeof formsAppId !== 'number') {
      const form = await super.getRequest(`/forms/${formId}`)
      formsAppId = form.formsAppIds[0]
    }

    if (typeof formsAppId !== 'number') {
      throw new Error('This form has been added to a forms app yet.')
    }

    const formsApp = await super.getRequest(`/forms-apps/${formsAppId}`)

    let preFillFormDataId
    if (parameters.preFillData) {
      const preFillMeta = await super.postRequest(
        `/forms/${formId}/pre-fill-credentials`
      )
      await setPreFillData(preFillMeta, parameters.preFillData)
      preFillFormDataId = preFillMeta.preFillFormDataId
    }

    // Default expiry for token is 8 hours
    const jwtExpiry = expiryInSeconds || 28800

    const token = generateJWT(this.accessKey, this.secretKey, jwtExpiry)

    const formUrl = generateFormUrl(
      `https://${formsApp.hostname}/forms`,
      formId,
      token,
      externalId,
      preFillFormDataId
    )

    const expiry = new Date(Date.now() + jwtExpiry * 1000).toISOString()

    return {
      formUrl,
      expiry
    }
  }

  async generateSubmissionDataUrl(
    formId /* : ?mixed */,
    submissionId /* : ?mixed */,
    expiryInSeconds /* : ?mixed */
  ) /* : Promise<{ url: string }> */ {
    if (typeof formId !== 'number') {
      return Promise.reject(new TypeError('Must supply "formId" as a number'))
    }
    if (typeof submissionId !== 'string') {
      return Promise.reject(
        new TypeError('Must supply "submissionId" as a string')
      )
    }
    if (typeof expiryInSeconds !== 'number') {
      return Promise.reject(
        new TypeError('Must supply "expiryInSeconds" as a number')
      )
    }
    if (expiryInSeconds < 900) {
      return Promise.reject(
        new TypeError('"expiryInSeconds" must be greater than or equal to 900')
      )
    }

    return super.postRequest(
      `/forms/${formId}/retrieval-url/${submissionId}?expirySeconds=${expiryInSeconds}`
    )
  }

  async getDraftData(
    formId /* : ?mixed */,
    draftDataId /* : ?mixed */
  ) /* : Promise<S3SubmissionData> */ {
    if (typeof formId !== 'number') {
      return Promise.reject(new TypeError('Must supply "formId" as a number'))
    }
    if (typeof draftDataId !== 'string') {
      return Promise.reject(
        new TypeError('Must supply "draftDataId" as a string')
      )
    }

    const credentials = await super.postRequest(
      `/forms/${formId}/download-draft-data-credentials/${draftDataId}`
    )
    return submissionData.getSubmissionData(credentials)
  }

  getSubmissionData(
    formId /* : ?mixed */,
    submissionId /* : ?mixed */
  ) /* : Promise<S3SubmissionData> */ {
    if (typeof formId !== 'number') {
      return Promise.reject(new TypeError('Must supply "formId" as a number'))
    }
    if (typeof submissionId !== 'string') {
      return Promise.reject(
        new TypeError('Must supply "submissionId" as a string')
      )
    }

    return super
      .postRequest(`/forms/${formId}/retrieval-credentials/${submissionId}`)
      .then(credentials => submissionData.getSubmissionData(credentials))
  }

  search(
    options /* : ?FormsSearchOptions */
  ) /* : Promise<FormsSearchResult> */ {
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

  getForm(
    formId /* : ?mixed */,
    injectForms /* : ?boolean */
  ) /* : Promise<Form> */ {
    if (typeof formId !== 'number') {
      return Promise.reject(new TypeError('Must supply "formId" as a number'))
    }

    return super.searchRequest(`/forms/${formId}`, {
      injectForms: injectForms || false
    })
  }

  static validateForm(form /* : mixed */) /* : Form */ {
    const validatedForm = validateWithFormSchema(form)
    return validatedForm
  }

  static generateFormElement(
    formElementGenerationData /* : mixed */
  ) /* : FormElement */ {
    const formElement = generateFormElement(formElementGenerationData)
    return formElement
  }
}
