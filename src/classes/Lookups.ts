import { FormTypes, KeyTypes } from '@oneblink/types'
import OneBlinkAPI from '../lib/one-blink-api'
import { ConstructorOptions } from '../types'

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
   * ```javascript
   * const keyId = '123455678901ABCDEFGHIJKL'
   * keys.getKey(keyId).then((key) => {
   *   // Use key here...
   * })
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
}
