// @flow
'use strict'

const generateFormUrl = require('../lib/generate-form-url.js')
const generateJWT = require('../lib/generate-jwt.js')
const submissionData = require('../lib/retrieve-submission-data.js')
const OneBlinkAPI = require('../lib/one-blink-api.js')
const setPreFillData = require('../lib/pre-fill-data')
const { validateWithFormSchema } = require('../lib/forms-validation.js')
const generateFormElement = require('../lib/generate-form-element.js')
const generatePageElement = require('../lib/generate-page-element.js')
const {
  encryptUserToken,
  decryptUserToken,
} = require('../lib/user-token-helpers')

module.exports = (tenant /* : Tenant */) =>
  class Forms extends OneBlinkAPI {
    constructor(options /* : ConstructorOptions */) {
      options = options || {}
      super(options.accessKey, options.secretKey, tenant)
    }

    async generateFormUrl(
      parameters /* : ?mixed */,
    ) /* : Promise<{ expiry: string, formUrl: string }> */ {
      if (!parameters || typeof parameters !== 'object') {
        throw new TypeError('Parameters not provided.')
      }

      const expiryInSeconds = parameters.expiryInSeconds
      if (
        expiryInSeconds !== undefined &&
        typeof expiryInSeconds !== 'number'
      ) {
        throw new TypeError(
          'Must supply "expiryInSeconds" as a number or not at all',
        )
      }

      const externalId = parameters.externalId
      if (externalId && typeof externalId !== 'string') {
        throw new TypeError(
          'Must supply "externalId" as a string or not at all',
        )
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
        throw new TypeError(
          'Must supply "formsAppId" as a number or not at all',
        )
      }

      if (typeof formsAppId !== 'number') {
        const form = await super.getRequest(`/forms/${formId}`)
        formsAppId = form.formsAppIds[0]
      }

      if (typeof formsAppId !== 'number') {
        throw new Error('This form has not been added to a forms app yet.')
      }

      const formsApp = await super.getRequest(`/forms-apps/${formsAppId}`)

      let preFillFormDataId
      if (parameters.preFillData) {
        const preFillMeta = await super.postRequest(
          `/forms/${formId}/pre-fill-credentials`,
        )
        await setPreFillData(preFillMeta, parameters.preFillData)
        preFillFormDataId = preFillMeta.preFillFormDataId
      }

      // Default expiry for token is 8 hours
      const jwtExpiry = expiryInSeconds || 28800

      const token = generateJWT(this.accessKey, this.secretKey, jwtExpiry)

      let userToken = undefined
      const username = parameters.username
      if (
        username !== undefined &&
        username !== null &&
        typeof username !== 'string'
      ) {
        throw new TypeError('Must supply "username" as a string or not at all')
      }

      if (username) {
        const secret = parameters.secret
        if (typeof secret !== 'string') {
          throw new TypeError(
            'Must supply "secret" as a string if "username" is used',
          )
        }

        userToken = encryptUserToken({ secret, username })
      }

      const formUrl = generateFormUrl({
        formId,
        token,
        externalId,
        preFillFormDataId,
        endpoint: `https://${formsApp.hostname}/forms`,
        userToken,
      })

      const expiry = new Date(Date.now() + jwtExpiry * 1000).toISOString()

      return {
        formUrl,
        expiry,
      }
    }

    async generateSubmissionDataUrl(
      formId /* : ?mixed */,
      submissionId /* : ?mixed */,
      expiryInSeconds /* : ?mixed */,
    ) /* : Promise<{ url: string }> */ {
      if (typeof formId !== 'number') {
        return Promise.reject(new TypeError('Must supply "formId" as a number'))
      }
      if (typeof submissionId !== 'string') {
        return Promise.reject(
          new TypeError('Must supply "submissionId" as a string'),
        )
      }
      if (typeof expiryInSeconds !== 'number') {
        return Promise.reject(
          new TypeError('Must supply "expiryInSeconds" as a number'),
        )
      }
      if (expiryInSeconds < 900) {
        return Promise.reject(
          new TypeError(
            '"expiryInSeconds" must be greater than or equal to 900',
          ),
        )
      }

      return super.postRequest(
        `/forms/${formId}/retrieval-url/${submissionId}?expirySeconds=${expiryInSeconds}`,
      )
    }

    getSubmissionData(
      formId /* : ?mixed */,
      submissionId /* : ?mixed */,
      isDraft /* : ?boolean */,
    ) /* : Promise<S3SubmissionData> */ {
      if (typeof formId !== 'number') {
        return Promise.reject(new TypeError('Must supply "formId" as a number'))
      }
      if (typeof submissionId !== 'string') {
        return Promise.reject(
          new TypeError('Must supply "submissionId" as a string'),
        )
      }

      let url = `/forms/${formId}/retrieval-credentials/${submissionId}`
      if (isDraft) {
        url = `/forms/${formId}/download-draft-data-credentials/${submissionId}`
      }

      return super
        .postRequest(url)
        .then((credentials) => submissionData.getSubmissionData(credentials))
    }

    search(
      searchParams /* : ?FormsSearchOptions */,
    ) /* : Promise<FormsSearchResult> */ {
      return super.searchRequest(`/forms`, searchParams)
    }

    searchSubmissions(
      options /* : FormSubmissionHistorySearchParameters */,
    ) /* : Promise<FormSubmissionHistorySearchResults> */ {
      let searchParams = {}

      if (typeof options.formId === 'number') {
        searchParams = Object.assign(searchParams, {
          formId: options.formId,
        })
      } else {
        throw new Error('formId must be a number and is required')
      }

      if (typeof options.submissionDateFrom === 'string') {
        searchParams = Object.assign(searchParams, {
          submissionDateFrom: options.submissionDateFrom,
        })
      }

      if (typeof options.submissionDateTo === 'string') {
        searchParams = Object.assign(searchParams, {
          submissionDateTo: options.submissionDateTo,
        })
      }

      searchParams = Object.assign(searchParams, {
        offset:
          typeof options.offset === 'number' ? Math.max(0, options.offset) : 0,
        limit:
          typeof options.limit === 'number'
            ? Math.max(1, options.limit)
            : undefined,
      })

      return super.searchRequest(`/form-submission-meta`, searchParams)
    }

    getForm(
      formId /* : ?mixed */,
      injectForms /* : ?boolean */,
    ) /* : Promise<Form> */ {
      if (typeof formId !== 'number') {
        return Promise.reject(new TypeError('Must supply "formId" as a number'))
      }

      return super.searchRequest(`/forms/${formId}`, {
        injectForms: injectForms || false,
      })
    }

    async createForm(data /* : ?mixed */) /* : Promise<Form> */ {
      const form = validateWithFormSchema(data)
      const savedForm = await super.postRequest('/forms', form)
      return savedForm
    }

    async updateForm(
      data /* : ?mixed */,
      overrideLock /* : boolean */ = false,
    ) /* : Promise<Form> */ {
      const form = validateWithFormSchema(data)
      const savedForm = await super.putRequest(
        `/forms/${form.id}${overrideLock === true ? '?overrideLock=true' : ''}`,
        form,
      )
      return savedForm
    }

    async deleteForm(
      formId /* : ?mixed */,
      overrideLock /* : boolean */ = false,
    ) /* : Promise<void> */ {
      if (typeof formId !== 'number') {
        throw new TypeError('Must supply "formId" as a number')
      }

      await super.deleteRequest(
        `/forms/${formId}${overrideLock === true ? '?overrideLock=true' : ''}`,
      )
    }

    async decryptUserToken(userToken /* : string */) {
      return super.postRequest('/decrypt-user-token', {
        userToken
      })
    }

    static validateForm(form /* : mixed */) /* : Form */ {
      const validatedForm = validateWithFormSchema(form)
      return validatedForm
    }

    static generateFormElement /* :: <T: _FormElementBase> */(
      formElementGenerationData /* : mixed */,
    ) /* : T */ {
      const formElement = generateFormElement(formElementGenerationData)
      return formElement
    }
    static generatePageElement(
      formElementGenerationData /*: mixed */,
    ) /* :PageElement */ {
      const pageElement = generatePageElement(formElementGenerationData)
      return pageElement
    }

    static encryptFaaSUserToken(
      details /* : { username: string, secret: string } */,
    ) {
      return encryptUserToken(details)
    }

    static decryptFaaSUserToken(
      details /* : { userToken: string, secret: string } */,
    ) {
      return decryptUserToken(details)
    }
  }
