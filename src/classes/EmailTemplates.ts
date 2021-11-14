import OneBlinkAPI from '../lib/one-blink-api'
import { EmailTemplateTypes } from '@oneblink/types'
import {
  ConstructorOptions,
  EmailTemplatesSearchOptions,
  EmailTemplatesSearchResult,
} from '../types'

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
   *   name: 'my template'
   *   template: 'My email template {{custom:my-custom-tag}}'
   *   formsAppEnvironmentId: 1
   *   type: 'FORM_SUBMISSION_EVENT_PDF'
   * }
   * const emailTemplate = await emailTemplates.createEmailTemplate(
   *   data,
   * )
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
   *   name: 'my updated template'
   *   template: 'My email template {{custom:my-custom-tag}}'
   *   formsAppEnvironmentId: 1
   *   type: 'FORM_SUBMISSION_EVENT_PDF'
   * }
   * const emailTemplate = await emailTemplates.updateEmailTemplate(
   *   data,
   * )
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
}
