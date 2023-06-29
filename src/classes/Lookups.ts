import { FormTypes } from '@oneblink/types'
import OneBlinkAPI from '../lib/one-blink-api'
import { ConstructorOptions, LookupsSearchResult } from '../types'

export default class Lookups extends OneBlinkAPI {
  /**
   * #### Example
   *
   * ```typescript
   * import { Lookups } from '@oneblink/sdk'
   *
   * const options = {
   *   accessKey: '123455678901ABCDEFGHIJKL',
   *   secretKey: '123455678901ABCDEFGHIJKL123455678901ABCDEFGHIJKL',
   * }
   * const lookups = new Lookups(options)
   * ```
   */
  constructor(options: ConstructorOptions) {
    options = options || {}
    super(options.accessKey, options.secretKey)
  }

  /**
   * #### Example
   *
   * ```typescript
   * const lookupId = 1
   * const lookup = await lookups.getLookup(lookupId)
   * // Use lookup here
   * ```
   *
   * @param id The exact id of the lookup you wish to get
   * @returns
   */
  getLookup(id: number): Promise<FormTypes.FormElementLookup> {
    if (typeof id !== 'number') {
      return Promise.reject(new TypeError('Must supply "id" as a number'))
    }

    return super.getRequest(`/form-element-lookups/${id}`)
  }

  /**
   * #### Example
   *
   * ```typescript
   * const organisationId = '2i4321a7n2389a2700065425'
   * const lookups = await lookups.searchLookups({
   *   organisationId,
   *   limit: 50,
   *   offset: 0,
   * })
   * // Use lookups here
   * ```
   *
   * @param options
   * @returns
   */
  searchLookups(options: {
    /** The exact id of the lookup you wish to get */
    organisationId: string
    limit?: number
    offset?: number
  }): Promise<LookupsSearchResult> {
    if (
      !options ||
      typeof options !== 'object' ||
      typeof options.organisationId !== 'string'
    ) {
      return Promise.reject(
        new TypeError('Must supply "options.organisationId" as a string'),
      )
    }

    return super.searchRequest(`/form-element-lookups`, {
      limit: options.limit,
      offset: options.offset,
      organisationId: options.organisationId,
    })
  }

  /**
   * #### Example
   *
   * ```typescript
   * const newLookup = {
   *   name: 'My New Lookup',
   *   environments: [
   *     {
   *       formsAppEnvironmentId: 1,
   *       urL: 'https://my-url.com/lookup',
   *     },
   *   ],
   *   type: 'DATA',
   *   organisationId: '',
   * }
   * const createdLookup = await lookups.createLookup(newLookup)
   * // Use lookup here
   * ```
   *
   * @param newLookup
   * @returns
   */
  createLookup(
    newLookup: FormTypes.NewFormElementLookup,
  ): Promise<FormTypes.FormElementLookup> {
    if (!newLookup || typeof newLookup !== 'object') {
      return Promise.reject(
        new TypeError('Must supply "newLookup" as an object'),
      )
    }
    return super.postRequest(`/form-element-lookups`, newLookup)
  }

  /**
   * #### Example
   *
   * ```typescript
   * const newLookup = {
   *   id: 1,
   *   createdAt: '2023-06-28T02:00:03.000Z',
   *   updatedAt: '2023-06-28T02:00:03.000Z',
   *   name: 'My New Lookup',
   *   environments: [
   *     {
   *       formsAppEnvironmentId: 1,
   *       url: 'https://my-url.com/lookup',
   *     },
   *   ],
   *   type: 'DATA',
   *   organisationId: '',
   * }
   * const createdLookup = await lookups.createLookup(newLookup)
   * // Use lookup here
   * ```
   *
   * @param newLookup
   * @returns
   */
  updateLookup(
    updatedLookup: FormTypes.FormElementLookup,
  ): Promise<FormTypes.FormElementLookup> {
    if (!updatedLookup || typeof updatedLookup !== 'object') {
      return Promise.reject(
        new TypeError('Must supply "updatedLookup" as an object'),
      )
    }
    return super.putRequest(
      `/form-element-lookups/${updatedLookup.id}`,
      updatedLookup,
    )
  }

  /**
   * #### Example
   *
   * ```typescript
   * const lookupId = 7
   * await lookups.deleteLookup(lookupId)
   * ```
   *
   * @param id The id of the lookup to delete
   * @returns
   */
  deleteLookup(id: number): Promise<void> {
    if (typeof id !== 'number') {
      return Promise.reject(new TypeError('Must supply "id" as a number'))
    }
    return super.deleteRequest(`/form-element-lookups/${id}`)
  }
}
