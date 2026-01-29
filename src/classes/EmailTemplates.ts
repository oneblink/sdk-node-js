import OneBlinkAPI from '../lib/one-blink-api.js'
import { EmailTemplateTypes } from '@oneblink/types'
import {
  ConstructorOptions,
  EmailTemplatesSearchOptions,
  EmailTemplatesSearchResult,
} from '../types.js'

const basePath = `/email-templates`
export default class EmailTemplates extends OneBlinkAPI {
  /**
   * @example
   *   import * as OneBlink from '@oneblink/sdk'
   *   const options = {
   *     accessKey: '123455678901ABCDEFGHIJKL',
   *     secretKey: '123455678901ABCDEFGHIJKL123455678901ABCDEFGHIJKL',
   *   }
   *   const emailTemplates = new OneBlink.EmailTemplates(options)
   */
  constructor(options: ConstructorOptions) {
    options = options || {}
    super(options.accessKey, options.secretKey)
  }

  /**
   * **Minimum Role Permission**
   *
   * Email Templates: _Read Only_
   *
   * @example
   *   const searchParams = {
   *     limit: 1,
   *     offset: 0,
   *   }
   *   const { emailTemplates, meta } =
   *     await emailTemplates.searchEmailTemplates(searchParams)
   *
   * @param searchParams Search options
   * @returns
   */
  searchEmailTemplates(
    searchParams: EmailTemplatesSearchOptions,
  ): Promise<EmailTemplatesSearchResult> {
    return super.searchRequest(basePath, searchParams)
  }

  /**
   * **Minimum Role Permission**
   *
   * Email Templates: _Read Only_
   *
   * @example
   *   const emailTemplate = await emailTemplates.getEmailTemplate(1)
   *   // Use data here...
   *
   * @param id The id of the email template
   * @returns
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
   * **Minimum Role Permission**
   *
   * Email Templates: _Manager_
   *
   * @example
   *   const data = {
   *     name: 'my template',
   *     organisationId: 'abc123',
   *     environments: [
   *       {
   *         template: 'My email template {{custom:my-custom-tag}}',
   *         formsAppEnvironmentId: 1,
   *       },
   *     ],
   *     type: 'FORM_SUBMISSION_EVENT_PDF',
   *   }
   *   const emailTemplate = await emailTemplates.createEmailTemplate(data)
   *   // Use emailTemplate here...
   *
   * @param data The data for the new email template
   * @returns
   */
  async createEmailTemplate(
    data: EmailTemplateTypes.NewEmailTemplate,
  ): Promise<EmailTemplateTypes.EmailTemplate> {
    return super.postRequest(basePath, data)
  }

  /**
   * **Minimum Role Permission**
   *
   * Email Templates: _Manager_
   *
   * @example
   *   const data = {
   *     id: 1,
   *     name: 'my updated template',
   *     organisationId: 'abc123',
   *     environments: [
   *       {
   *         template: 'My email template {{custom:my-custom-tag}}',
   *         formsAppEnvironmentId: 1,
   *       },
   *     ],
   *     type: 'FORM_SUBMISSION_EVENT_PDF',
   *   }
   *   const emailTemplate = await emailTemplates.updateEmailTemplate(data)
   *   // Use emailTemplate here...
   *
   * @param data The data for the email template to update
   * @returns
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
   * **Minimum Role Permission**
   *
   * Email Templates: _Manager_
   *
   * @example
   *   await emailTemplates.deleteEmailTemplate(1)
   *
   * @param id The id of the email template to delete
   * @returns
   */
  async deleteEmailTemplate(id: number): Promise<void> {
    if (typeof id !== 'number') {
      throw new TypeError('Must supply "id" as a number')
    }

    return super.deleteRequest(`${basePath}/${id}`)
  }
}
