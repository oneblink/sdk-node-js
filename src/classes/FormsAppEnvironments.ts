import OneBlinkAPI from '../lib/one-blink-api'
import {
  EnvironmentTypes,
} from '@oneblink/types'
import {
  BaseSearchResult,
  Tenant,
  ConstructorOptions,
} from '../lib/types'

type FormsAppEnvironmentsSearchResult = {
  formsAppEnvironments: EnvironmentTypes.FormsAppEnvironment[]
} & BaseSearchResult

type FormsAppEnvironmentsSearchOptions = {
  limit?: number
  offset?: number
}

const basePath = `/forms-app-environment`
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (tenant: Tenant) =>
  class FormsAppEnvironments extends OneBlinkAPI {
    constructor(options: ConstructorOptions) {
      options = options || {}
      super(options.accessKey, options.secretKey, tenant)
    }

    search(searchParams?: FormsAppEnvironmentsSearchOptions): Promise<FormsAppEnvironmentsSearchResult> {
      return super.searchRequest(basePath, searchParams)
    }

    async getFormsAppEnvironment(formsAppEnvironmentId?: number): Promise<EnvironmentTypes.FormsAppEnvironment> {
      if (typeof formsAppEnvironmentId !== 'number') {
        throw new TypeError('Must supply "formsAppEnvironmentId" as a number')
      }

      return super.searchRequest(`${basePath}/${formsAppEnvironmentId}`)
    }

    async createFormsAppEnvironment(data?: unknown): Promise<EnvironmentTypes.FormsAppEnvironment> {
      return super.postRequest(basePath, data)
    }

    async updateFormsAppEnvironment(
      data?: Record<string, unknown>,
    ): Promise<EnvironmentTypes.FormsAppEnvironment> {
      if (!data || typeof data.id !== 'number') {
        throw new TypeError('Must supply "formsAppEnvironment.id" as a number')
      }

      return super.putRequest(`${basePath}/${data.id}`, data)
    }

    async deleteFormsAppEnvironment(formsAppEnvironmentId?: unknown): Promise<void> {
      if (typeof formsAppEnvironmentId !== 'number') {
        throw new TypeError('Must supply "formsAppEnvironmentId" as a number')
      }

      return super.deleteRequest(`${basePath}/${formsAppEnvironmentId}`)
    }
  }
