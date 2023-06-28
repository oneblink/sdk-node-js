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
   * const { lists, meta } = await lists.searchLists(searchParams)
   * ```
   *
   * @param searchParams Search options
   */
  async searchLists(
    searchParams: ListSearchOptions,
  ): Promise<
    Omit<ListSearchResult, 'formElementDynamicOptionSets'> & {
      lists: FormTypes.FormElementOptionSet[]
    }
  > {
    const result = await super.searchRequest<ListSearchResult>(
      basePath,
      searchParams,
    )
    return {
      meta: result.meta,
      lists: result.formElementDynamicOptionSets,
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
   * @param data The data for the new list
   */
  async createList(
    data: FormTypes.NewFormElementOptionSet,
  ): Promise<FormTypes.NewFormElementOptionSet> {
    return super.postRequest(basePath, data)
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
   * @param data The data for the list to update
   */
  async updateList(
    data: FormTypes.FormElementOptionSet,
  ): Promise<FormTypes.FormElementOptionSet> {
    if (!data || typeof data.id !== 'number') {
      throw new TypeError('Must supply "List.id" as a number')
    }

    return super.putRequest(`${basePath}/${data.id}`, data)
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
