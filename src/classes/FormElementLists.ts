import { FormTypes } from '@oneblink/types'
import OneBlinkAPI from '../lib/one-blink-api.js'
import {
  ConstructorOptions,
  FormElementListSearchOptions,
  FormElementListSearchResult,
} from '../types.js'

const basePath = `/form-element-options/dynamic`

export default class FormElementLists extends OneBlinkAPI {
  /**
   * @example
   *   import { FormElementLists } from '@oneblink/sdk'
   *   const options = {
   *     accessKey: '123455678901ABCDEFGHIJKL',
   *     secretKey: '123455678901ABCDEFGHIJKL123455678901ABCDEFGHIJKL',
   *   }
   *   const formElementListsClient = new FormElementLists(options)
   */
  constructor(options: ConstructorOptions) {
    options = options || {}
    super(options.accessKey, options.secretKey)
  }

  /**
   * **Minimum Role Permission**
   *
   * Lists: _Read Only_
   *
   * @example
   *   const searchParams = {
   *     limit: 1,
   *     offset: 0,
   *   }
   *   const { formElementLists, meta } =
   *     await formElementListsClient.searchFormElementLists(searchParams)
   *
   * @param searchParams Search options
   * @returns
   */
  async searchFormElementLists(
    searchParams: FormElementListSearchOptions,
  ): Promise<FormElementListSearchResult> {
    if (
      !searchParams ||
      typeof searchParams !== 'object' ||
      typeof searchParams.organisationId !== 'string'
    ) {
      throw new TypeError('Must supply "options.organisationId" as a string')
    }
    const result = await super.searchRequest<
      Omit<FormElementListSearchResult, 'formElementLists'> & {
        formElementDynamicOptionSets: FormTypes.FormElementOptionSet[]
      }
    >(basePath, searchParams)
    return {
      meta: result.meta,
      formElementLists: result.formElementDynamicOptionSets,
    }
  }

  /**
   * **Minimum Role Permission**
   *
   * Lists: _Manager_
   *
   * @example
   *   const data = {
   *     name: 'my list',
   *     organisationId: 'abc123',
   *     environments: [
   *       {
   *         options: [
   *           {
   *             label: 'One',
   *             value: '1',
   *           },
   *           {
   *             label: 'Two',
   *             value: '2',
   *           },
   *         ],
   *         formsAppEnvironmentId: 1,
   *       },
   *     ],
   *     type: 'STATIC',
   *   }
   *   const list = await formElementListsClient.createFormElementList(data)
   *   // Use list here...
   *
   * @param newFormElementList The data for the new list
   * @returns
   */
  async createFormElementList(
    newFormElementList: FormTypes.NewFormElementOptionSet,
  ): Promise<FormTypes.FormElementOptionSet> {
    if (!newFormElementList || typeof newFormElementList !== 'object') {
      throw new TypeError('Must supply "newList" as an object')
    }
    return super.postRequest<
      FormTypes.NewFormElementOptionSet,
      FormTypes.FormElementOptionSet
    >(basePath, newFormElementList)
  }

  /**
   * **Minimum Role Permission**
   *
   * Lists: _Manager_
   *
   * @example
   *   const data = {
   *     id: 1,
   *     name: 'my list',
   *     organisationId: 'abc123',
   *     environments: [
   *       {
   *         options: [
   *           {
   *             label: 'One',
   *             value: '1',
   *           },
   *           {
   *             label: 'Two',
   *             value: '2',
   *           },
   *           {
   *             label: 'Three',
   *             value: '2',
   *           },
   *         ],
   *         formsAppEnvironmentId: 1,
   *       },
   *     ],
   *     type: 'STATIC',
   *   }
   *   const list = await formElementListsClient.updateFormElementList(data)
   *   // Use list here...
   *
   * @param list The data for the list to update
   * @returns
   */
  async updateFormElementList(
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
   * **Minimum Role Permission**
   *
   * Lists: _Manager_
   *
   * @example
   *   await formElementListsClient.deleteFormElementList(1)
   *
   * @param id The id of the list to delete
   * @returns
   */
  async deleteFormElementList(id: number): Promise<void> {
    if (typeof id !== 'number' || Number.isNaN(id)) {
      throw new TypeError('Must supply "id" as a number')
    }

    return super.deleteRequest(`${basePath}/${id}`)
  }
}
