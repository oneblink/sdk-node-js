import { FormStoreDefinition } from '@oneblink/types/typescript/submissions'
import OneBlinkAPI from '../lib/one-blink-api'
import {
  ConstructorOptions,
  SearchDataManagerRecordsOptions,
  SearchDataManagerRecordsResponse,
} from '../types'

export default class DataManager extends OneBlinkAPI {
  /**
   * @example
   *   const OneBlink = require('@oneblink/sdk')
   *   const options = {
   *     accessKey: '123455678901ABCDEFGHIJKL',
   *     secretKey: '123455678901ABCDEFGHIJKL123455678901ABCDEFGHIJKL',
   *   }
   *   const dataManager = new OneBlink.DataManager(options)
   */
  constructor(options: ConstructorOptions) {
    options = options || {}
    super(options.accessKey, options.secretKey)
  }

  /**
   * **Submission Data Key Supported**
   *
   * Key must be assigned to the form that is being requested.
   *
   * **Minimum Role Permission**
   *
   * Submission Data: _Read Only_
   *
   * @example
   *   const { formId, formElements } = await dataManager.getFormDefinition(2)
   *
   * @param id The form ID to get the definition for.
   * @returns
   */
  async getFormDefinition(id: number): Promise<FormStoreDefinition> {
    if (typeof id !== 'number') {
      throw new Error('"id" must be a number and is required')
    }
    return await super.searchRequest(`/form-store/elements`, {
      formId: id,
    })
  }

  /**
   * **Submission Data Key Supported**
   *
   * Key must be assigned to the form that is being requested.
   *
   * **Minimum Role Permission**
   *
   * Submission Data: _Read Only_
   *
   * @example
   *   const { submissions, meta } = await dataManager.searchRecords({
   *     formId: 1,
   *   })
   *   // Use data here...
   *
   * @param options The options for the Search Request
   * @returns
   */
  async searchRecords(
    options: SearchDataManagerRecordsOptions,
  ): Promise<SearchDataManagerRecordsResponse> {
    if (!options) {
      throw new Error('"options" object must be provided.')
    }
    if (typeof options.formId !== 'number') {
      throw new Error('"formId" must be a number and is required')
    }
    return await super.postRequest(`/form-store`, options)
  }
}
