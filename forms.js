// @flow
'use strict'

/* ::
import type {
  options
} from './types.js'
*/
const generateFormUrl = require('./lib/generateFormUrl')
const generateJwt = require('./lib/generateJWT')

module.exports = class Forms {
  /* ::
  token: string
  accessKey: string
  secret: string
  url: string
  */
  constructor (
    options /* : options */
  ) {
    options = options || {}
    if (!options.accessKey) {
      throw new TypeError('must supply an Access Key')
    }
    if (typeof options.accessKey !== 'string') {
      throw new TypeError('Access Key must be a string')
    }
    if (!options.secret) {
      throw new TypeError('must supply an Secret Key')
    }
    if (typeof options.secret !== 'string') {
      throw new TypeError('Secret Key must be a string')
    }
    this.accessKey = options.accessKey
    this.secret = options.secret
  }

  generateFormUrl (
    formId /* : string */,
    externalId /* : string */
  ) {
    const jwtExpiry = 28000

    this.token = generateJwt.createJWT(this.accessKey, this.secret, jwtExpiry)

    this.url = generateFormUrl.generateUrl(formId, externalId, this.token)

    let exp = new Date(Date.now() + jwtExpiry)

    return {
      formUrl: this.url,
      JWT: this.token,
      expiry: exp
    }
  }
}
