// @flow
'use strict'

const OneBlinkAPI = require('../lib/one-blink-api.js')
const getRegionUrl = require('../lib/region')
module.exports = class Keys extends OneBlinkAPI {
  constructor(options /* : ConstructorOptions */) {
    options = options || {}
    super(
      getRegionUrl(options.regionCode, options.oneBlinkAPIOrigin),
      options.accessKey,
      options.secretKey
    )
  }

  getKey(keyId /* : ?mixed */) /* : Promise<Key> */ {
    if (typeof keyId !== 'string') {
      return Promise.reject(new TypeError('Must supply "keyId" as a string'))
    }

    return super.getRequest(`/keys/${keyId}`)
  }
}
