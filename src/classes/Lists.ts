import { FormTypes } from '@oneblink/types'
import OneBlinkAPI from '../lib/one-blink-api'
import {
  ConstructorOptions,
  ListSearchOptions,
  ListSearchResult,
} from '../types'

const basePath = `/form-element-options/dynamic`

export default class Lists extends OneBlinkAPI {
  /**
   * #### Example
   *
   * ```typescript
   * import { Lists } from '@oneblink/sdk'
   *
   * const options = {
   *   accessKey: '123455678901ABCDEFGHIJKL',
   *   secretKey: '123455678901ABCDEFGHIJKL123455678901ABCDEFGHIJKL',
   * }
   * const lists = new Lists(options)
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
   * const { formElementLists, meta } = await lists.searchLists(
   *   searchParams,
   * )
   * ```
   *
   * @param searchParams Search options
   */
  async searchLists(
    searchParams: ListSearchOptions,
  ): Promise<ListSearchResult> {
    if (
      !searchParams ||
      typeof searchParams !== 'object' ||
      typeof searchParams.organisationId !== 'string'
    ) {
      return Promise.reject(
        new TypeError('Must supply "options.organisationId" as a string'),
      )
    }
    const result = await super.searchRequest<
      Omit<ListSearchResult, 'formElementLists'> & {
        formElementDynamicOptionSets: FormTypes.FormElementOptionSet[]
      }
    >(basePath, searchParams)
    return {
      meta: result.meta,
      formElementLists: result.formElementDynamicOptionSets,
    }
  }

  /**
   * #### Example
   *
   * ```javascript
   * const data = {
   *   name: 'my list',
   *   organisationId: 'abc123',
   *   environments: [
   *     {
   *       options: [
   *          {
   *            label: 'One'
   *            value: '1'
   *          },
   *          {
   *            label: 'Two'
   *            value: '2'
   *          }
   *       ]
   *       formsAppEnvironmentId: 1,
   *     },
   *   ],
   *   type: 'STATIC',
   * }
   * const list = await lists.createList(data)
   * // Use list here...
   * ```
   *
   * @param newList The data for the new list
   */
  async createList(
    newList: FormTypes.NewFormElementOptionSet,
  ): Promise<FormTypes.FormElementOptionSet> {
    if (!newList || typeof newList !== 'object') {
      return Promise.reject(new TypeError('Must supply "newList" as an object'))
    }
    return super.postRequest<
      FormTypes.NewFormElementOptionSet,
      FormTypes.FormElementOptionSet
    >(basePath, newList)
  }

  /**
   * #### Example
   *
   * ```javascript
   * const data = {
   *   id: 1,
   *   name: 'my list',
   *   organisationId: 'abc123',
   *   environments: [
   *     {
   *       options: [
   *          {
   *            label: 'One'
   *            value: '1'
   *          },
   *          {
   *            label: 'Two'
   *            value: '2'
   *          },
   *          {
   *            label: 'Three'
   *            value: '2'
   *          },
   *       ]
   *       formsAppEnvironmentId: 1,
   *     },
   *   ],
   *   type: 'STATIC',
   * }
   * const list = await list.updateList(data)
   * // Use list here...
   * ```
   *
   * @param list The data for the list to update
   */
  async updateList(
    list: FormTypes.FormElementOptionSet,
  ): Promise<FormTypes.FormElementOptionSet> {
    if (!list || typeof list !== 'object') {
      throw new TypeError('Must supply "list" as an object')
    }

    if (typeof list.id !== 'number') {
      throw new TypeError('Must supply "list.id" as a number')
    }

    return super.putRequest<
      FormTypes.FormElementOptionSet,
      FormTypes.FormElementOptionSet
    >(`${basePath}/${list.id}`, list)
  }

  /**
   * #### Example
   *
   * ```javascript
   * await lists.deleteList(1)
   * ```
   *
   * @param id The id of the list to delete
   */
  async deleteList(id: number): Promise<void> {
    if (typeof id !== 'number') {
      throw new TypeError('Must supply "id" as a number')
    }

    return super.deleteRequest(`${basePath}/${id}`)
  }
}
