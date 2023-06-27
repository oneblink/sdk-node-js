import OneBlinkAPI from '../lib/one-blink-api'
import { ConstructorOptions } from '../types'

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
}
