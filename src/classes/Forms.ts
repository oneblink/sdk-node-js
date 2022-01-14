import AWS from 'aws-sdk'
import { Stream } from 'stream'
import contentDisposition from 'content-disposition'
import generateFormUrl from '../lib/generate-form-url'
import generateJWT from '../lib/generate-jwt'
import getSubmissionData from '../lib/retrieve-submission-data'
import OneBlinkAPI from '../lib/one-blink-api'
import setPreFillData from '../lib/pre-fill-data'
import { validateWithFormSchema } from '../lib/forms-validation'
import generateFormElement from '../lib/generate-form-element'
import generatePageElement from '../lib/generate-page-element'
import { encryptUserToken, decryptUserToken } from '../lib/user-token-helpers'
import {
  AWSTypes,
  FormsAppsTypes,
  FormTypes,
  SubmissionTypes,
} from '@oneblink/types'
import {
  validateConditionalPredicates,
  validateApiRequest,
} from '../lib/forms-validation'
import {
  ConstructorOptions,
  PreFillMeta,
  FormsSearchOptions,
  FormsSearchResult,
  FormSubmissionHistorySearchParameters,
  FormSubmissionHistorySearchResults,
  FormMigrationOptions,
  FormSubmissionMetaResult,
} from '../types'

export default class Forms extends OneBlinkAPI {
  /**
   * #### Example
   *
   * ```javascript
   * const OneBlink = require('@oneblink/sdk')
   *
   * const options = {
   *   accessKey: '123455678901ABCDEFGHIJKL',
   *   secretKey: '123455678901ABCDEFGHIJKL123455678901ABCDEFGHIJKL',
   * }
   * const forms = new OneBlink.Forms(options)
   * ```
   */
  constructor(options: ConstructorOptions) {
    options = options || {}
    super(options.accessKey, options.secretKey)
  }
  /**
   * #### Example
   *
   * ```javascript
   * const parameters = {
   *   formId: 1,
   *   formsAppId: 2,
   *   externalId: 'My Custom Identifier',
   *   preFillData: {
   *     FieldName1: 'A Machine',
   *     FieldName2: 'Room B',
   *   },
   *   expiryInSeconds: 36800,
   *   username: 'username',
   *   secret: 'sshh',
   *   previousFormSubmissionApprovalId: 1,
   * }
   *
   * forms.generateFormUrl(parameters).then((result) => {
   *   const formUrl = result.formUrl
   *   // Use form URL here...
   * })
   * ```
   *
   * @param parameters An object containing all parameters to be passed to the function
   */
  async generateFormUrl(parameters: {
    /** The exact id of the form you wish to generate a URL for */
    formId: number
    /**
     * The time in seconds until the generated form URL is no longer valid. This
     * is set to `28800` seconds (8 hours) by default.
     */
    expiryInSeconds?: number
    /**
     * The external identifier of the form submission you wish to use, this
     * identifier will be returned to you with the submissionId after a
     * successful submission to allow you to retrieve the data later
     */
    externalId?: string
    /**
     * The exact id of the previous form submission approval this submission
     * will be associated to
     */
    previousFormSubmissionApprovalId?: string
    /**
     * The exact id of the forms app you wish to generate a URL for. This is set
     * to the first forms app the form was added to by default.
     */
    formsAppId?: number
    /** An object with the form field names as keys and the prefill data as the values */
    preFillData?: Record<string, unknown>
    /**
     * An identifier for the user completing the form. Use this if you would
     * like to securely know the user that submitted the form in a webhook.
     */
    username?: string
    /**
     * A secret used to encrypt the `username` property which can be validated
     * in a webhook.
     */
    secret?: string
  }): Promise<{ expiry: string; formUrl: string }> {
    if (!parameters || typeof parameters !== 'object') {
      throw new TypeError('Parameters not provided.')
    }

    const expiryInSeconds = parameters.expiryInSeconds
    if (expiryInSeconds !== undefined && typeof expiryInSeconds !== 'number') {
      throw new TypeError(
        'Must supply "expiryInSeconds" as a number or not at all',
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

    const previousFormSubmissionApprovalId =
      parameters.previousFormSubmissionApprovalId
    if (
      typeof previousFormSubmissionApprovalId !== 'string' &&
      previousFormSubmissionApprovalId !== undefined
    ) {
      throw new TypeError(
        'Must supply "previousFormSubmissionApprovalId" as a string or not at all',
      )
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
      const form = await super.getRequest<FormTypes.Form>(`/forms/${formId}`)
      formsAppId = form.formsAppIds[0]
    }

    if (typeof formsAppId !== 'number') {
      throw new Error('This form has not been added to a forms app yet.')
    }

    const formsApp = await super.getRequest<FormsAppsTypes.FormsApp>(
      `/forms-apps/${formsAppId}`,
    )

    let preFillFormDataId
    if (parameters.preFillData) {
      const preFillMeta = await super.postEmptyRequest<PreFillMeta>(
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
      previousFormSubmissionApprovalId,
    })

    const expiry = new Date(Date.now() + jwtExpiry * 1000).toISOString()

    return {
      formUrl,
      expiry,
    }
  }
  /**
   * #### Example
   *
   * ```javascript
   * const formId = 1
   * const submissionId = 'c1f0f27b-4289-4ce5-9807-bf84971991aa'
   * const expiryInSeconds = 900
   * forms
   *   .generateSubmissionDataUrl(formId, submissionId, expiryInSeconds)
   *   .then((result) => {
   *     const submissionDataUrl = result.url
   *     // Use URL here...
   *   })
   * ```
   *
   * @param formId The exact id of the form you wish to generate a URL for
   * @param submissionId The submission identifier generated after a successful
   *   form submission, this will be return to you after a successful forms
   *   submission via a callback URL
   * @param expiryInSeconds The number of seconds the signed URL should be valid
   *   for, must be greater than or equal to `900`
   */
  async generateSubmissionDataUrl(
    formId: number,
    submissionId: string,
    expiryInSeconds: number,
  ): Promise<{ url: string }> {
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
        new TypeError('"expiryInSeconds" must be greater than or equal to 900'),
      )
    }

    return super.postEmptyRequest(
      `/forms/${formId}/retrieval-url/${submissionId}?expirySeconds=${expiryInSeconds}`,
    )
  }
  /**
   * #### Example
   *
   * ```javascript
   * const formId = 1
   * const submissionId = 'c1f0f27b-4289-4ce5-9807-bf84971991aa'
   * const isDraft = false
   * forms
   *   .getSubmissionData(formId, submissionId, isDraft)
   *   .then((result) => {
   *     const definition = result.definition
   *     const submission = result.submission
   *   })
   *   .catch((error) => {
   *     // Handle error here
   *   })
   * ```
   *
   * @param formId The exact id of the form you wish to get submission data for
   * @param submissionId The submission identifier generated after a successful
   *   form submission, this will be return to you after a successful forms
   *   submission via a callback URL
   * @param isDraft `true` if the submission is a draft submission, otherwise `false`
   */
  async getSubmissionData(
    formId: number,
    submissionId: string,
    isDraft: boolean,
  ): Promise<SubmissionTypes.S3SubmissionData> {
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

    const credentials =
      await super.postEmptyRequest<AWSTypes.FormS3Credentials>(url)
    return await getSubmissionData(credentials)
  }

  /** @internal */
  async _getSubmissionAttachmentResponse(
    formId?: unknown,
    attachmentId?: unknown,
  ) {
    if (typeof formId !== 'number') {
      throw new TypeError('Must supply "formId" as a number')
    }
    if (typeof attachmentId !== 'string') {
      throw new TypeError('Must supply "attachmentId" as a string')
    }

    const response = await this.request({
      origin: OneBlinkAPI.tenant.apiOrigin,
      method: 'GET',
      path: `/submissions/${formId}/attachments/${attachmentId}`,
    })
    return response
  }
  /**
   * #### Example
   *
   * ```javascript
   * const fs = require('fs')
   * const util = require('util')
   * const stream = require('stream')
   *
   * const finishedAsync = util.promisify(stream.finished)
   *
   * async function run() {
   *   const formId = 1
   *   const attachmentId = 'c1f0f27b-4289-4ce5-9807-bf84971991aa'
   *   const readableStream = await forms.getSubmissionAttachmentStream(
   *     formId,
   *     attachmentId,
   *   )
   *
   *   const writableStream = fs.createWriteStream('file.png')
   *   readableStream.pipe(writableStream)
   *   await finishedAsync(readableStream)
   *   writableStream.end()
   * }
   * ```
   *
   * @param formId The exact id of the form the attachment was uploaded on
   * @param attachmentId The attachment identifier from the form submission data
   */
  async getSubmissionAttachmentStream(
    formId: number,
    attachmentId: string,
  ): Promise<Stream> {
    const response = await this._getSubmissionAttachmentResponse(
      formId,
      attachmentId,
    )
    return response.body
  }
  /**
   * #### Example
   *
   * ```javascript
   * const fs = require('fs')
   * const util = require('util')
   *
   * const writeFileAsync = util.promisify(fs.writeFile)
   *
   * async function run() {
   *   const formId = 1
   *   const attachmentId = 'c1f0f27b-4289-4ce5-9807-bf84971991aa'
   *   const buffer = await forms.getSubmissionAttachmentBuffer(
   *     formId,
   *     attachmentId,
   *   )
   *
   *   await writeFileAsync('file.png', buffer)
   * }
   * ```
   *
   * @param formId The exact id of the form the attachment was uploaded on
   * @param attachmentId The attachment identifier from the form submission data
   */
  async getSubmissionAttachmentBuffer(
    formId: number,
    attachmentId: string,
  ): Promise<Buffer> {
    const response = await this._getSubmissionAttachmentResponse(
      formId,
      attachmentId,
    )
    return await response.buffer()
  }
  /**
   * #### Example
   *
   * ```javascript
   * const fs = require('fs')
   * const util = require('util')
   *
   * const readFileAsync = util.promisify(fs.readFile)
   *
   * async function run() {
   *   const formId = 1
   *
   *   const imageFileName = 'profile-picture.png'
   *   const imageBuffer = await readFileAsync(imageFileName)
   *   const imageResult = await forms.createSubmissionAttachment({
   *     formId,
   *     body: imageBuffer,
   *     isPrivate: false,
   *     contentType: 'image/png',
   *     fileName: imageFileName,
   *   })
   *
   *   const documentFileName = 'secrets.text'
   *   const readableStream = fs.createReadStream(documentFileName)
   *   const documentResult = await forms.createSubmissionAttachment({
   *     formId,
   *     isPrivate: true,
   *     contentType: 'text/plain',
   *     fileName: documentFileName,
   *     body: readableStream,
   *     username: 'user@example.com',
   *   })
   * }
   * ```
   */
  async createSubmissionAttachment({
    formId,
    body,
    fileName,
    contentType,
    isPrivate,
    username,
  }: {
    /** The exact id of the form the attachment will be uploaded for */
    formId: number
    /** The attachment's file content to upload */
    body: Stream | Buffer | string
    /** The attachment's file name */
    fileName: string
    /** The attachment's content type */
    contentType: string
    /**
     * Determine if this attachment can be downloaded anonymously (`false`) or
     * not (`true`)
     */
    isPrivate: boolean
    /** An optional username to allow a single user to download he attachment file */
    username?: string
  }): Promise<SubmissionTypes.FormSubmissionAttachment> {
    const result = await super.postRequest<
      { username?: string },
      AWSTypes.FormAttachmentS3Credentials
    >(`/forms/${formId}/upload-attachment-credentials`, {
      username,
    })

    const s3 = new AWS.S3({
      region: result.s3.region,
      accessKeyId: result.credentials.AccessKeyId,
      secretAccessKey: result.credentials.SecretAccessKey,
      sessionToken: result.credentials.SessionToken,
    })

    await s3
      .upload(
        {
          ServerSideEncryption: 'AES256',
          Expires: new Date(
            new Date().setFullYear(new Date().getFullYear() + 1),
          ), // Max 1 year
          CacheControl: 'max-age=31536000', // Max 1 year(365 days),
          Bucket: result.s3.bucket,
          Key: result.s3.key,
          ContentDisposition: contentDisposition(fileName),
          ContentType: contentType,
          ACL: isPrivate ? 'private' : 'public-read',
          Body: body,
        },
        {
          partSize: 5 * 1024 * 1024,
          queueSize: 5,
        },
      )
      .promise()

    return {
      id: result.attachmentDataId,
      contentType,
      fileName,
      isPrivate,
      url: `${OneBlinkAPI.tenant.apiOrigin}/${result.s3.key}`,
      s3: result.s3,
    }
  }
  /**
   * #### Example
   *
   * ```javascript
   * const formId = 1
   * const attachmentId = 'c1f0f27b-4289-4ce5-9807-bf84971991aa'
   * const expiryInSeconds = 900
   * forms
   *   .generateSubmissionAttachmentUrl(
   *     formId,
   *     attachmentId,
   *     expiryInSeconds,
   *   )
   *   .then((result) => {
   *     const attachmentUrl = result.url
   *     // Use URL here...
   *   })
   * ```
   *
   * @param formId The exact id of the form you wish to generate a URL for
   * @param attachmentId The attachment identifier from the form submission data
   * @param expiryInSeconds The number of seconds the signed URL should be valid
   *   for, must be greater than or equal to `900`
   */
  async generateSubmissionAttachmentUrl(
    formId: number,
    attachmentId: string,
    expiryInSeconds: number,
  ): Promise<{ url: string }> {
    if (typeof formId !== 'number') {
      throw new TypeError('Must supply "formId" as a number')
    }
    if (typeof attachmentId !== 'string') {
      throw new TypeError('Must supply "attachmentId" as a string')
    }
    if (typeof expiryInSeconds !== 'number') {
      throw new TypeError('Must supply "expiryInSeconds" as a number')
    }
    if (expiryInSeconds < 900) {
      throw new TypeError(
        '"expiryInSeconds" must be greater than or equal to 900',
      )
    }

    return super.postRequest(
      `/forms/${formId}/attachments/${attachmentId}/download-url`,
      {
        expiryInSeconds,
      },
    )
  }
  /**
   * #### Example
   *
   * ```javascript
   * const options = {
   *   isAuthenticated: true,
   *   name: 'Form Name',
   * }
   * forms
   *   .searchForms(options)
   *   .then((result) => {
   *     const forms = result.forms
   *   })
   *   .catch((error) => {
   *     // Handle error here
   *   })
   * ```
   *
   * @param searchParams Search options.
   */
  searchForms(searchParams?: FormsSearchOptions): Promise<FormsSearchResult> {
    return super.searchRequest(`/forms`, searchParams)
  }
  /**
   * Search for details on submissions that match the search parameters. Then
   * use the information to fetch the actual submission data, if it is still available
   *
   * #### Example
   *
   * ```javascript
   * const options = {
   *   formId: 1,
   *   submissionDateFrom: '2018-08-16T05:28:26.448Z',
   *   submissionDateTo: '2019-08-16T05:28:26.448Z',
   * }
   * forms
   *   .searchSubmissions(options)
   *   .then((result) => {
   *     const submissionDetails = result.formSubmissionMeta
   *     return Promise.all(
   *       submissionDetails.map((metaData) =>
   *         forms.getSubmissionData(
   *           metaData.formId,
   *           metaData.submissionId,
   *         ),
   *       ),
   *     )
   *   })
   *   .then((submissions) => {
   *     // something...
   *   })
   *   .catch((error) => {
   *     // Handle error here
   *   })
   * ```
   *
   * @param options Search options.
   */
  searchSubmissions(
    options: FormSubmissionHistorySearchParameters,
  ): Promise<FormSubmissionHistorySearchResults> {
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
  /**
   * #### Example
   *
   * ```javascript
   * const formId = 1
   * const injectForms = false
   * forms.getForm(formId, injectForms).then((form) => {
   *   // Use form here...
   * })
   * ```
   *
   * @param formId The exact id of the form you wish to get
   * @param injectForms Set to `true` to inject form elements from nested Form
   *   elements and Info Page elements.
   */
  getForm(formId: number, injectForms?: boolean): Promise<FormTypes.Form> {
    if (typeof formId !== 'number') {
      return Promise.reject(new TypeError('Must supply "formId" as a number'))
    }

    return super.searchRequest(`/forms/${formId}`, {
      injectForms: injectForms || false,
    })
  }
  /**
   * #### Example
   *
   * ```javascript
   * forms
   *   .createForm({
   *     name: 'testsform',
   *     formsAppEnvironmentId: 1,
   *     description: 'a form',
   *     organisationId: '0101010101010',
   *     formsAppEnvironmentId: 1,
   *     elements: [],
   *     isAuthenticated: false,
   *     submissionEvents: [],
   *     postSubmissionAction: 'FORMS_LIBRARY',
   *     formsAppIds: [1, 2, 3],
   *   })
   *   .then((form) => {
   *     // use form here
   *   })
   *   .catch((error) => {
   *     // Handle error here
   *   })
   * ```
   *
   * @param newForm The form object to create.
   */
  async createForm(
    newForm: Omit<FormTypes.Form, 'id'>,
  ): Promise<FormTypes.Form> {
    const form = validateWithFormSchema(newForm)
    const savedForm = await super.postRequest<FormTypes.Form, FormTypes.Form>(
      '/forms',
      form,
    )
    return savedForm
  }
  /**
   * #### Example
   *
   * ```javascript
   * forms
   *   .updateForm(
   *     {
   *       id: 1,
   *       name: 'testsform',
   *       formsAppEnvironmentId: 1,
   *       description: 'a form',
   *       organisationId: '0101010101010',
   *       formsAppEnvironmentId: 1,
   *       elements: [],
   *       isAuthenticated: false,
   *       submissionEvents: [],
   *       postSubmissionAction: 'FORMS_LIBRARY',
   *       formsAppIds: [1, 2, 3],
   *     },
   *     true,
   *   )
   *   .then((form) => {
   *     // use form here
   *   })
   *   .catch((error) => {
   *     // Handle error here
   *   })
   * ```
   *
   * @param form The form object to update
   * @param overrideLock Defaults to `false`. Set to true to force updating of
   *   the form if the form is locked via the form builder
   */
  async updateForm(
    form: FormTypes.Form,
    overrideLock?: boolean,
  ): Promise<FormTypes.Form> {
    const validatedForm = validateWithFormSchema(form)
    const savedForm = await super.putRequest<FormTypes.Form, FormTypes.Form>(
      `/forms/${validatedForm.id}${overrideLock ? '?overrideLock=true' : ''}`,
      validatedForm,
    )
    return savedForm
  }
  /**
   * #### Example
   *
   * ```javascript
   * const formId = 1
   * forms
   *   .deleteForm(formId, true)
   *   .then(() => {
   *     // Form is not deleted
   *   })
   *   .catch((error) => {
   *     // Handle error here
   *   })
   * ```
   *
   * @param formId Id of the form.
   * @param overrideLock Defaults to `false`. Set to true to force deleting of
   *   the form if the form is locked via the form builder
   */
  async deleteForm(formId: number, overrideLock?: boolean): Promise<void> {
    if (typeof formId !== 'number') {
      throw new TypeError('Must supply "formId" as a number')
    }

    await super.deleteRequest(
      `/forms/${formId}${overrideLock ? '?overrideLock=true' : ''}`,
    )
  }
  /**
   * #### Example
   *
   * ```javascript
   * forms
   *   .migrateForm({
   *     formsAppEnvironmentId: 2,
   *     sourceFormId: 123,
   *     targetFormId: 234,
   *     elements: true,
   *     submissionEvents: false,
   *     approvalSteps: false,
   *     serverValidation: false,
   *     externalIdGeneration: false,
   *     postSubmissionAction: false,
   *   })
   *   .then((migratedForm) => {
   *     // do something with form
   *   })
   *   .catch((error) => {
   *     // Handle error here
   *   })
   * ```
   *
   * @param migrationOptions Migration options
   */
  async migrateForm(migrationOptions: FormMigrationOptions): Promise<void> {
    await super.postRequest<FormMigrationOptions, FormTypes.Form>(
      `/forms/${migrationOptions.sourceFormId}/migrate`,
      migrationOptions,
    )
  }

  /**
   * #### Example
   *
   * ```javascript
   * const submissionId = 'f1eadc2b-79c8-4f97-8d92-cde64b34911f'
   * forms
   *   .getFormSubmissionMeta(submissionId)
   *   .then(
   *     ({
   *       formSubmissionmeta,
   *       formApprovalFlowInstance,
   *       formSubmissionApprovals,
   *     }) => {
   *       // Use results here...
   *     },
   *   )
   * ```
   *
   * @param submissionId The exact id of the submission you wish to get the meta
   *   result for
   */
  getFormSubmissionMeta(
    submissionId: string,
  ): Promise<FormSubmissionMetaResult> {
    if (!submissionId || typeof submissionId !== 'string') {
      return Promise.reject(
        new TypeError('Must supply "submissionId" as a number'),
      )
    }
    return super.getRequest(`/form-submission-meta/${submissionId}`)
  }
  /**
   * A static method available on the forms class, used for validating a
   * OneBlink compatible Forms Definition.
   *
   * #### Example
   *
   * ```javascript
   * const form = {
   *   id: 1,
   *   name: 'testsform',
   *   formsAppEnvironmentId: 1,
   *   description: 'a form',
   *   organisationId: '0101010101010',
   *   elements: [],
   *   isAuthenticated: false,
   *   submissionEvents: [],
   *   postSubmissionAction: 'FORMS_LIBRARY',
   *   formsAppIds: [1, 2, 3],
   * }
   *
   * const validatedForm = OneBlink.Forms.validateForm(form)
   *
   * return validatedForm
   * ```
   *
   * @param form The form object to validate.
   */
  static validateForm(form: unknown): FormTypes.Form {
    const validatedForm = validateWithFormSchema(form)
    return validatedForm
  }
  /**
   * A static method available on the forms class, used for both creating and
   * validating a OneBlink Form Element.
   *
   * The method will set reasonable defaults for any values not passed to it,
   * and validate ones that are against our Element Schema.
   *
   * #### Example
   *
   * ```javascript
   * const element = {
   *   name: 'my test element',
   * }
   *
   * const generatedElement = OneBlink.Forms.generateFormElement(element)
   *
   * return generatedElement
   * ```
   */
  static generateFormElement<T extends FormTypes._FormElementBase>(
    formElementGenerationData?: Record<string, unknown>,
  ): T {
    const formElement = generateFormElement<T>(formElementGenerationData)
    return formElement
  }
  /**
   * A static method available on the forms class, used for both creating and
   * validating a OneBlink Page Element.
   *
   * The method will set reasonable defaults for any values not passed to it,
   * and validate ones that are against our Element Schema.
   *
   * #### Example
   *
   * ```javascript
   * const childElement = Forms.generateFormElement({
   *   label: 'my first element',
   * })
   *
   * const element = {
   *   name: 'my test element',
   *   elements: [childElement],
   * }
   *
   * const generatedElement = OneBlink.Forms.generatePageElement(element)
   *
   * return generatedElement
   * ```
   */
  static generatePageElement(
    formElementGenerationData?: Record<string, unknown>,
  ): FormTypes.PageElement {
    const pageElement = generatePageElement(formElementGenerationData)
    return pageElement
  }
  /**
   * A static method available on the forms class for securely encrypting a user
   * identifier (e.g. email address) when the OneBlink API is being called with
   * a FaaS key and not a user JWT. This is automatically done for the user in
   * [`generateFormUrl()`](#generateFormUrl) by passing the `username` and
   * `secret` options.
   *
   * @returns The encrypted representation of the username
   */
  static encryptUserToken(details: {
    /** The username to encrypt */
    username: string
    /** A string used to encrypt the username */
    secret: string
  }) {
    return encryptUserToken(details)
  }

  /**
   * A static method available on the forms class for decrypting a user token.
   * This token is passed to OneBlink webhooks in the `userToken` property.
   *
   * @returns The decrypted username
   */
  static decryptUserToken(details: {
    /** The user token to decrypt */
    userToken: string
    /** The secret used to encrypt the username */
    secret: string
  }) {
    return decryptUserToken(details)
  }

  /**
   * A static method available on the forms class, used for validating an array
   * of Conditional Predicates found on form elements or submission events.
   *
   * #### Example
   *
   * ```javascript
   * const predicates = [
   *   {
   *     elementId: 'f1eadc2b-79c8-4f97-8d92-cde64b34911f',
   *     type: 'NUMERIC',
   *     operator: '===',
   *     value: 5,
   *   },
   *   {
   *     elementId: '32g6dc5j-79c8-gf4z-8d92-cde64b34911f',
   *     type: 'VALUE',
   *     hasValue: true,
   *   },
   * ]
   *
   * const validatedPredicates =
   *   OneBlink.Forms.validateConditionalPredicates(predicates)
   *
   * return validatedPredicates
   * ```
   */
  static validateConditionalPredicates = validateConditionalPredicates

  /**
   * A static method available on the forms class, used for validating a api
   * request configuration.
   *
   * #### Example
   *
   * ```javascript
   * const apiRequest = {
   *   type: 'CALLBACK',
   *   configuration: {
   *     url: 'https://a-website.com/endpoint',
   *   },
   * }
   *
   * const validatedApiRequest =
   *   OneBlink.Forms.validateApiRequest(apiRequest)
   *
   * return validatedApiRequest
   * ```
   */
  static validateApiRequest = validateApiRequest
}
