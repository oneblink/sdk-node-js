import OneBlinkAPI from '../lib/one-blink-api'
import {
  EmailTemplateTypes,
  FormsAppsTypes,
  FormTypes,
  SubmissionTypes,
} from '@oneblink/types'
import {
  Attachment,
  ConstructorOptions,
  EmailTemplatesSearchOptions,
  EmailTemplatesSearchResult,
  FormSubmissionMetaResult,
  TemplateBaseParams,
} from '../types'
import { findFormElement } from '@oneblink/sdk-core/dist/formElementsService'
import { getElementSubmissionValue } from '@oneblink/sdk-core/dist/submissionService'
import moment from 'moment'
import Mustache from 'mustache'
import juice from 'juice'

const basePath = `/email-templates`
export default class EmailTemplates extends OneBlinkAPI {
  /**
   * #### Example
   *
   * ```typescript
   * const OneBlink = require('@oneblink/sdk')
   *
   * const options = {
   *   accessKey: '123455678901ABCDEFGHIJKL',
   *   secretKey: '123455678901ABCDEFGHIJKL123455678901ABCDEFGHIJKL',
   * }
   * const emailTemplates = new OneBlink.EmailTemplates(options)
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
   * const searchParams = {
   *   formsAppEnvironmentId: 1,
   *   limit: 1,
   *   offset: 0,
   * }
   * const { emailTemplates, meta } =
   *   await emailTemplates.searchEmailTemplates(searchParams)
   * ```
   *
   * @param searchParams Search options
   */
  searchEmailTemplates(
    searchParams: EmailTemplatesSearchOptions,
  ): Promise<EmailTemplatesSearchResult> {
    return super.searchRequest(basePath, searchParams)
  }

  /**
   * #### Example
   *
   * ```javascript
   * const emailTemplate = await emailTemplates.getEmailTemplate(1)
   * // Use data here...
   * ```
   *
   * @param id The id of the email template
   */
  async getEmailTemplate(
    id: number,
  ): Promise<EmailTemplateTypes.EmailTemplate> {
    if (typeof id !== 'number') {
      throw new TypeError('Must supply "id" as a number')
    }

    return super.searchRequest(`${basePath}/${id}`)
  }

  /**
   * #### Example
   *
   * ```javascript
   * const data = {
   *   name: 'my template',
   *   template: 'My email template {{custom:my-custom-tag}}',
   *   formsAppEnvironmentId: 1,
   *   type: 'FORM_SUBMISSION_EVENT_PDF',
   * }
   * const emailTemplate = await emailTemplates.createEmailTemplate(data)
   * // Use emailTemplate here...
   * ```
   *
   * @param data The data for the new email template
   */
  async createEmailTemplate(
    data: EmailTemplateTypes.NewEmailTemplate,
  ): Promise<EmailTemplateTypes.EmailTemplate> {
    return super.postRequest(basePath, data)
  }

  /**
   * #### Example
   *
   * ```javascript
   * const data = {
   *   id: 1,
   *   name: 'my updated template',
   *   template: 'My email template {{custom:my-custom-tag}}',
   *   formsAppEnvironmentId: 1,
   *   type: 'FORM_SUBMISSION_EVENT_PDF',
   * }
   * const emailTemplate = await emailTemplates.updateEmailTemplate(data)
   * // Use emailTemplate here...
   * ```
   *
   * @param data The data for the email template to update
   */
  async updateEmailTemplate(
    data: EmailTemplateTypes.EmailTemplate,
  ): Promise<EmailTemplateTypes.EmailTemplate> {
    if (!data || typeof data.id !== 'number') {
      throw new TypeError('Must supply "EmailTemplate.id" as a number')
    }

    return super.putRequest(`${basePath}/${data.id}`, data)
  }

  /**
   * #### Example
   *
   * ```javascript
   * await emailTemplates.deleteEmailTemplate(1)
   * ```
   *
   * @param id The id of the email template to delete
   */
  async deleteEmailTemplate(id: number): Promise<void> {
    if (typeof id !== 'number') {
      throw new TypeError('Must supply "id" as a number')
    }

    return super.deleteRequest(`${basePath}/${id}`)
  }

  /**
   * #### Example
   *
   * ```javascript
   * const html = getEmailTemplateHTML({
   *   templateId,
   *   submissionData,
   *   submissionMeta,
   *   mapping,
   *   attachments,
   *   isDraft,
   *   formsApp,
   * })
   *
   * // Use emailTemplate html here...
   * ```
   *
   * @param templateId The template id
   * @param submissionData Submission data from form related to template
   * @param submissionMeta Submission meta from form related to template
   * @param formsApp Forms app the template belongs to
   * @param mapping The data mapping for elements populated in template
   * @param attachments Email attachments
   * @param isDraft Boolean draft state
   */
  async getEmailTemplateHTML({
    templateId,
    submissionData,
    submissionMeta,
    formsApp,
    mapping,
    attachments,
    isDraft,
  }: {
    templateId: number
    submissionData: SubmissionTypes.S3SubmissionData
    submissionMeta: FormSubmissionMetaResult
    mapping: Record<string, any>
    attachments: Attachment[]
    isDraft: boolean
    formsApp: FormsAppsTypes.FormsApp
  }): Promise<string> {
    if (typeof templateId !== 'number') {
      throw new TypeError('Must supply "templateId" as a number')
    }

    let templateParams = await this.generateTemplateBaseParams({
      submissionMeta,
      formsApp,
      attachments,
      submissionData,
      isDraft,
    })
    // map custom values to submission values
    for (const k in mapping) {
      const map = mapping[k]
      switch (map.type) {
        case 'FORM_ELEMENT': {
          templateParams[map.mustacheTag] = getFormElementSubmissionValue(
            submissionData.definition.elements,
            submissionData.submission,
            map.formElementId,
          )
          break
        }
        case 'TEXT': {
          templateParams[map.mustacheTag] = map.text
          break
        }
      }
    }

    const template = await this.getEmailTemplate(templateId)

    return juice(Mustache.render(template.toString(), templateParams))
  }

  /**
   * #### Example
   *
   * ```javascript
   * const html = generateTemplateBaseParams({
   *   submissionData,
   *   submissionMeta,
   *   formsApp,
   *   attachments,
   *   isDraft,
   * })
   *
   * // Use template base params here...
   * ```
   *
   * @param submissionData Submission data from form related to template
   * @param submissionMeta Submission meta from form related to template
   * @param formsApp Forms app template belongs to
   * @param attachments Email attachments
   * @param isDraft Boolean draft state
   */
  async generateTemplateBaseParams({
    submissionData,
    submissionMeta,
    formsApp,
    attachments,
    isDraft,
  }: {
    submissionMeta: FormSubmissionMetaResult
    formsApp: FormsAppsTypes.FormsApp
    attachments: Array<{ attachmentUrl: string; fileName: string }>
    submissionData: SubmissionTypes.S3SubmissionData
    isDraft: Boolean
  }): Promise<TemplateBaseParams> {
    const submissionDateTime = formatTimestamp(
      submissionData.submissionTimestamp,
    )

    return {
      // Available parameters for use in template
      formsAppName: formsApp.name,
      formName: submissionData.definition.name,
      attachments,
      hasAttachments: !!attachments.length,
      submissionDateTime,
      submissionHistoryUrl: `${OneBlinkAPI.tenant.consoleOrigin}/accounts/${formsApp.organisationId}/forms/${submissionMeta.formSubmissionmeta.formId}/submission-history?submissionId=${submissionMeta.formSubmissionmeta.submissionId}`,
      externalId: submissionMeta.formSubmissionmeta.externalId,
      submissionId: submissionMeta.formSubmissionmeta.submissionId,
      isDraft,
      // Internal parameters
      hideTitle: false,
      hideSignature: false,
      title: 'Form Submission Successful',
      consoleSubmissionLabel: `${submissionData.definition.name} Submission`,
    }
  }
}

function getFormElementSubmissionValue(
  formElements: FormTypes.FormElement[],
  submission: SubmissionTypes.S3SubmissionData['submission'],
  formElementId: string,
) {
  const formElement = findFormElement(
    formElements,
    (e) => e.id === formElementId,
  )
  if (!formElement) {
    console.warn(
      'Form element does not exist:',
      JSON.stringify({ formElementId }),
    )
    return
  }
  if (formElement.type === 'page' || formElement.type === 'section') {
    console.warn(
      'Form element does not have a "name":',
      JSON.stringify(formElement),
    )
    return
  }
  return getElementSubmissionValue({
    formElements,
    propertyName: formElement.name,
    submission,
    formatDate: (value) => moment(value).format('L'),
    formatTime: (value) =>
      `${moment(value).format('LT')} (${moment(value).format('z')})`,
    formatCurrency: OneBlinkAPI.tenant.formatCurrency,
    formatNumber: OneBlinkAPI.tenant.formatNumber,
  })
}

function formatTimestamp(date: string): string {
  const momentDate = moment(date)
  return `${momentDate.format('L')} ${momentDate.format(
    'LT',
  )} (${momentDate.format('z')})`
}
