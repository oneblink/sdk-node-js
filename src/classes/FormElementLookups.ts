import { FormTypes } from '@oneblink/types'
import OneBlinkAPI from '../lib/one-blink-api.js'
import { ConstructorOptions, FormElementLookupSearchResult } from '../types.js'

export default class FormElementLookups extends OneBlinkAPI {
  /**
   * @example
   *   import { FormElementLookups } from '@oneblink/sdk'
   *   const options = {
   *     accessKey: '123455678901ABCDEFGHIJKL',
   *     secretKey: '123455678901ABCDEFGHIJKL123455678901ABCDEFGHIJKL',
   *   }
   *   const formElementLookups = new FormElementLookups(options)
   */
  constructor(options: ConstructorOptions) {
    options = options || {}
    super(options.accessKey, options.secretKey)
  }

  /**
   * **Minimum Role Permission**
   *
   * Lookups: _Read Only_
   *
   * @example
   *   const lookupId = 1
   *   const lookup = await formElementLookups.getFormElementLookup(lookupId)
   *   // Use lookup here
   *
   * @param id The exact id of the lookup you wish to get
   * @returns
   */
  async getFormElementLookup(id: number): Promise<FormTypes.FormElementLookup> {
    if (typeof id !== 'number' || Number.isNaN(id)) {
      throw new TypeError('Must supply "id" as a number')
    }

    return super.getRequest(`/form-element-lookups/${id}`)
  }

  /**
   * **Minimum Role Permission**
   *
   * Lookups: _Read Only_
   *
   * @example
   *   const organisationId = '2i4321a7n2389a2700065425'
   *   const lookups = await formElementLookups.searchFormElementLookups({
   *     organisationId,
   *     limit: 50,
   *     offset: 0,
   *   })
   *   // Use lookups here
   *
   * @param options
   * @returns
   */
  async searchFormElementLookups(options: {
    /**
     * The exact id of organisation associated with the lookups you wish to
     * search
     */
    organisationId: string
    limit?: number
    offset?: number
    /**
     * Search on the `workspaceId` property of a form element lookup. Must be
     * the exact match of a `workspaceId`.
     */
    workspaceId?: number
  }): Promise<FormElementLookupSearchResult> {
    if (
      !options ||
      typeof options !== 'object' ||
      typeof options.organisationId !== 'string'
    ) {
      throw new TypeError('Must supply "options.organisationId" as a string')
    }

    return super.searchRequest(`/form-element-lookups`, {
      limit: options.limit,
      offset: options.offset,
      organisationId: options.organisationId,
      workspaceId: options.workspaceId,
    })
  }

  /**
   * **Minimum Role Permission**
   *
   * Lookups: _Manager_
   *
   * @example
   *   const newLookup = {
   *     name: 'My New Lookup',
   *     environments: [
   *       {
   *         formsAppEnvironmentId: 1,
   *         urL: 'https://my-url.com/lookup',
   *       },
   *     ],
   *     type: 'DATA',
   *     organisationId: '',
   *   }
   *   const createdLookup = await lookups.createFormElementLookup(newLookup)
   *   // Use lookup here
   *
   * @param newFormElementLookup
   * @returns
   */
  async createFormElementLookup(
    newFormElementLookup: FormTypes.NewFormElementLookup,
  ): Promise<FormTypes.FormElementLookup> {
    if (!newFormElementLookup || typeof newFormElementLookup !== 'object') {
      throw new TypeError('Must supply "newLookup" as an object')
    }
    return super.postRequest(`/form-element-lookups`, newFormElementLookup)
  }

  /**
   * **Minimum Role Permission**
   *
   * Lookups: _Manager_
   *
   * @example
   *   const lookup = {
   *     id: 1,
   *     createdAt: '2023-06-28T02:00:03.000Z',
   *     updatedAt: '2023-06-28T02:00:03.000Z',
   *     name: 'My New Lookup',
   *     environments: [
   *       {
   *         formsAppEnvironmentId: 1,
   *         url: 'https://my-url.com/lookup',
   *       },
   *     ],
   *     type: 'DATA',
   *     organisationId: '',
   *   }
   *   const updatedLookup =
   *     await formElementLookups.updateFormElementLookup(lookup)
   *   // Use lookup here
   *
   * @param formElementLookup
   * @returns
   */
  async updateFormElementLookup(
    formElementLookup: FormTypes.FormElementLookup,
  ): Promise<FormTypes.FormElementLookup> {
    if (!formElementLookup || typeof formElementLookup !== 'object') {
      throw new TypeError('Must supply "updatedLookup" as an object')
    }
    return super.putRequest(
      `/form-element-lookups/${formElementLookup.id}`,
      formElementLookup,
    )
  }

  /**
   * **Minimum Role Permission**
   *
   * Lookups: _Manager_
   *
   * @example
   *   const lookupId = 7
   *   await formElementLookups.deleteFormElementLookup(lookupId)
   *
   * @param id The id of the lookup to delete
   * @returns
   */
  async deleteFormElementLookup(id: number): Promise<void> {
    if (typeof id !== 'number' || Number.isNaN(id)) {
      throw new TypeError('Must supply "id" as a number')
    }
    return super.deleteRequest(`/form-element-lookups/${id}`)
  }
}
