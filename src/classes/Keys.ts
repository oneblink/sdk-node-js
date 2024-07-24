import { KeyTypes } from '@oneblink/types'
import OneBlinkAPI from '../lib/one-blink-api'
import { ConstructorOptions } from '../types'

export default class Keys extends OneBlinkAPI {
  /**
   * @example
   *   const OneBlink = require('@oneblink/sdk')
   *   const options = {
   *     accessKey: '123455678901ABCDEFGHIJKL',
   *     secretKey: '123455678901ABCDEFGHIJKL123455678901ABCDEFGHIJKL',
   *   }
   *   const keys = new OneBlink.Keys(options)
   */
  constructor(options: ConstructorOptions) {
    options = options || {}
    super(options.accessKey, options.secretKey)
  }

  /**
   * **Minimum Role Permission**
   *
   * Calendar Bookings, Integrations & Development Keys: _Read Only_
   *
   * @example
   *   const keyId = '123455678901ABCDEFGHIJKL'
   *   keys.getKey(keyId).then((key) => {
   *     // Use key here...
   *   })
   *
   * @param keyId The exact id of the key you wish to get
   * @returns
   */
  getKey(keyId: string): Promise<KeyTypes.Key> {
    if (typeof keyId !== 'string') {
      return Promise.reject(new TypeError('Must supply "keyId" as a string'))
    }

    return super.getRequest(`/keys/${keyId}`)
  }
}
