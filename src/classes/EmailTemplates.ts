import OneBlinkAPI from '../lib/one-blink-api'
import {
  EmailTemplateTypes,
} from '@oneblink/types'
import {
  BaseSearchResult,
  Tenant,
  ConstructorOptions,
} from '../lib/types'

type EmailTemplatesSearchResult = {
  formsAppEnvironments: EmailTemplateTypes.EmailTemplate[]
} & BaseSearchResult

type EmailTemplatesSearchOptions = {
  formsAppEnvironmentId: number;
  limit?: number
  offset?: number
}

const basePath = `/email-templates`
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (tenant: Tenant) =>
  class EmailTemplates extends OneBlinkAPI {
    constructor(options: ConstructorOptions) {
      options = options || {}
      super(options.accessKey, options.secretKey, tenant)
    }

    searchEmailTemplates(searchParams?: EmailTemplatesSearchOptions): Promise<EmailTemplatesSearchResult> {
      return super.searchRequest(basePath, searchParams)
    }

    async getEmailTemplate(id?: number): Promise<EmailTemplateTypes.EmailTemplate> {
      if (typeof id !== 'number') {
        throw new TypeError('Must supply "id" as a number')
      }

      return super.searchRequest(`${basePath}/${id}`)
    }

    async createEmailTemplate(data?: unknown): Promise<EmailTemplateTypes.EmailTemplate> {
      return super.postRequest(basePath, data)
    }

    async updateEmailTemplate(
      data?: Record<string, unknown>,
    ): Promise<EmailTemplateTypes.EmailTemplate> {
      if (!data || typeof data.id !== 'number') {
        throw new TypeError('Must supply "EmailTemplate.id" as a number')
      }

      return super.putRequest(`${basePath}/${data.id}`, data)
    }

    async deleteEmailTemplate(id?: unknown): Promise<void> {
      if (typeof id !== 'number') {
        throw new TypeError('Must supply "id" as a number')
      }

      return super.deleteRequest(`${basePath}/${id}`)
    }
  }
