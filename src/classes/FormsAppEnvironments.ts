import OneBlinkAPI from '../lib/one-blink-api'
import { EnvironmentTypes } from '@oneblink/types'
import {
  ConstructorOptions,
  FormsAppEnvironmentsSearchOptions,
  FormsAppEnvironmentsSearchResult,
} from '../types'

const basePath = `/forms-app-environments`
export default class FormsAppEnvironments extends OneBlinkAPI {
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
   * const formsAppEnvironments = new OneBlink.FormsAppEnvironments(options)
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
   *   limit: 1,
   *   offset: 0,
   * }
   * const { formsAppEnvironments, meta } =
   *   await formsAppEnvironments.searchFormsAppEnvironments(searchParams)
   * ```
   *
   * @param searchParams Search options
   */
  searchFormsAppEnvironments(
    searchParams?: FormsAppEnvironmentsSearchOptions,
  ): Promise<FormsAppEnvironmentsSearchResult> {
    return super.searchRequest(basePath, searchParams)
  }

  search(
    searchParams?: FormsAppEnvironmentsSearchOptions,
  ): Promise<FormsAppEnvironmentsSearchResult> {
    return super.searchRequest(basePath, searchParams)
  }

  /**
   * #### Example
   *
   * ```javascript
   * const formsAppEnvironment =
   *   await formsAppEnvironments.getFormsAppEnvironment(1)
   * // Use data here...
   * ```
   *
   * @param id The id of the forms app environment
   */
  async getFormsAppEnvironment(
    formsAppEnvironmentId: number,
  ): Promise<EnvironmentTypes.FormsAppEnvironment> {
    if (typeof formsAppEnvironmentId !== 'number') {
      throw new TypeError('Must supply "formsAppEnvironmentId" as a number')
    }

    return super.searchRequest(`${basePath}/${formsAppEnvironmentId}`)
  }

  /**
   * #### Example
   *
   * ```javascript
   * const data = {
   *   name: 'my first environment'
   *   description: 'Used for development'
   *   organisationId: 'abc123'
   *   slug: 'my-env-slug'
   *   cloneOptions: {
   *     sourceFormsAppEnvironmentId: 1
   *     isCloningFormElementOptionsSets: true
   *     isCloningFormElementLookups: true
   *     isCloningFormSubmissionEvents: true
   *     isCloningFormPostSubmissionActions: true
   *     isCloningFormServerValidation: true
   *     isCloningFormExternalIdGeneration: true
   *   }
   * }
   * const formsAppEnvironment = await formsAppEnvironments.createFormsAppEnvironment(
   *   data,
   * )
   * // Use formsAppEnvironment here...
   * ```
   *
   * @param data The data for the new forms app environment
   */
  async createFormsAppEnvironment(
    data: EnvironmentTypes.FormsAppEnvironment,
  ): Promise<EnvironmentTypes.FormsAppEnvironment> {
    return super.postRequest(basePath, data)
  }

  /**
   * #### Example
   *
   * ```javascript
   * const data = {
   *   name: 'my first environment'
   *   description: 'Used for development ONLY'
   *   organisationId: 'abc123'
   *   slug: 'my-env-slug'
   * }
   * const formsAppEnvironment = await formsAppEnvironments.updateFormsAppEnvironment(
   *   data,
   * )
   * // Use formsAppEnvironment here...
   * ```
   *
   * @param data The data for the forms app environment template to update
   */
  async updateFormsAppEnvironment(
    data?: Record<string, unknown>,
  ): Promise<EnvironmentTypes.FormsAppEnvironment> {
    if (!data || typeof data.id !== 'number') {
      throw new TypeError('Must supply "formsAppEnvironment.id" as a number')
    }

    return super.putRequest(`${basePath}/${data.id}`, data)
  }

  /**
   * #### Example
   *
   * ```javascript
   * await formsAppEnvironments.deleteEmailTemplate(1)
   * ```
   *
   * @param id The id of the forms app environment to delete
   */
  async deleteFormsAppEnvironment(
    formsAppEnvironmentId?: unknown,
  ): Promise<void> {
    if (typeof formsAppEnvironmentId !== 'number') {
      throw new TypeError('Must supply "formsAppEnvironmentId" as a number')
    }

    return super.deleteRequest(`${basePath}/${formsAppEnvironmentId}`)
  }
}
