import OneBlinkAPI from '../lib/one-blink-api.js'
import { EnvironmentTypes } from '@oneblink/types'
import {
  ConstructorOptions,
  FormsAppEnvironmentsSearchOptions,
  FormsAppEnvironmentsSearchResult,
} from '../types.js'

const basePath = `/forms-app-environments`
export default class FormsAppEnvironments extends OneBlinkAPI {
  /**
   * @example
   *   const OneBlink = require('@oneblink/sdk')
   *   const options = {
   *     accessKey: '123455678901ABCDEFGHIJKL',
   *     secretKey: '123455678901ABCDEFGHIJKL123455678901ABCDEFGHIJKL',
   *   }
   *   const formsAppEnvironments = new OneBlink.FormsAppEnvironments(options)
   */
  constructor(options: ConstructorOptions) {
    options = options || {}
    super(options.accessKey, options.secretKey)
  }

  /**
   * **Minimum Role Permission**
   *
   * Environments: _Read Only_
   *
   * @example
   *   const searchParams = {
   *     limit: 1,
   *     offset: 0,
   *   }
   *   const { formsAppEnvironments, meta } =
   *     await formsAppEnvironments.searchFormsAppEnvironments(searchParams)
   *
   * @param searchParams Search options
   * @returns
   */
  searchFormsAppEnvironments(
    searchParams?: FormsAppEnvironmentsSearchOptions,
  ): Promise<FormsAppEnvironmentsSearchResult> {
    return super.searchRequest(basePath, searchParams)
  }

  /**
   * **Minimum Role Permission**
   *
   * Environments: _Read Only_
   *
   * @example
   *   const formsAppEnvironment =
   *     await formsAppEnvironments.getFormsAppEnvironment(1)
   *   // Use data here...
   *
   * @param formsAppEnvironmentId The id of the forms app environment
   * @returns
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
   * **Minimum Role Permission**
   *
   * Environments: _Manager_
   *
   * @example
   *   const data = {
   *     name: 'my first environment',
   *     description: 'Used for development',
   *     organisationId: 'abc123',
   *     slug: 'my-env-slug',
   *     cloneOptions: {
   *       sourceFormsAppEnvironmentId: 1,
   *       isCloningFormElementOptionsSets: true,
   *       isCloningFormElementLookups: true,
   *       isCloningFormSubmissionEvents: true,
   *       isCloningFormPostSubmissionActions: true,
   *       isCloningFormServerValidation: true,
   *       isCloningFormExternalIdGenerationOnSubmit: true,
   *       isCloningFormPersonalisation: true,
   *     },
   *   }
   *   const formsAppEnvironment =
   *     await formsAppEnvironments.createFormsAppEnvironment(data)
   *   // Use formsAppEnvironment here...
   *
   * @param newFormsAppEnvironment The data for the new forms app environment
   * @returns
   */
  async createFormsAppEnvironment(
    newFormsAppEnvironment: EnvironmentTypes.NewFormsAppEnvironment,
  ): Promise<EnvironmentTypes.FormsAppEnvironment> {
    return super.postRequest(basePath, newFormsAppEnvironment)
  }

  /**
   * **Minimum Role Permission**
   *
   * Environments: _Manager_
   *
   * @example
   *   const data = {
   *     name: 'my first environment',
   *     description: 'Used for development ONLY',
   *     organisationId: 'abc123',
   *     slug: 'my-env-slug',
   *   }
   *   const formsAppEnvironment =
   *     await formsAppEnvironments.updateFormsAppEnvironment(data)
   *   // Use formsAppEnvironment here...
   *
   * @param formsAppEnvironment The data for the forms app environment template
   *   to update
   * @returns
   */
  async updateFormsAppEnvironment(
    formsAppEnvironment?: EnvironmentTypes.FormsAppEnvironment,
  ): Promise<EnvironmentTypes.FormsAppEnvironment> {
    if (!formsAppEnvironment || typeof formsAppEnvironment.id !== 'number') {
      throw new TypeError('Must supply "formsAppEnvironment.id" as a number')
    }

    return super.putRequest(
      `${basePath}/${formsAppEnvironment.id}`,
      formsAppEnvironment,
    )
  }

  /**
   * **Minimum Role Permission**
   *
   * Environments: _Manager_
   *
   * @example
   *   await formsAppEnvironments.deleteFormsAppEnvironment(1)
   *
   * @param formsAppEnvironmentId The id of the forms app environment to delete
   * @returns
   */
  async deleteFormsAppEnvironment(
    formsAppEnvironmentId: number,
  ): Promise<void> {
    if (typeof formsAppEnvironmentId !== 'number') {
      throw new TypeError('Must supply "formsAppEnvironmentId" as a number')
    }

    return super.deleteRequest(`${basePath}/${formsAppEnvironmentId}`)
  }
}
