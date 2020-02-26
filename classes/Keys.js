// @flow
'use strict'

const OneBlinkAPI = require('../lib/one-blink-api.js')
const getTenantUrl = require('../lib/tenant')
module.exports = class Keys extends OneBlinkAPI {
  constructor(options /* : ConstructorOptions */) {
    options = options || {}
    super(
      getTenantUrl(options.tenantName, options.oneBlinkAPIOrigin),
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
