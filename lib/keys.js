// @flow
'use strict'

/* ::
import type {
  ConstructorOptions,
  Key
} from '../types.js'
*/

const OneBlinkAPI = require('./one-blink-api.js')

module.exports = class Keys extends OneBlinkAPI {
  constructor (
    options /* : ConstructorOptions */
  ) {
    options = options || {}
    super(
      options.oneBlinkAPIOrigin,
      options.accessKey,
      options.secretKey
    )
  }

  getKey (keyId /* : ?mixed */) /* : Promise<Key> */ {
    if (typeof keyId !== 'string') {
      return Promise.reject(new TypeError('Must supply "keyId" as a string'))
    }

    return super.getRequest(`/keys/${keyId}`)
  }
}
