'use strict'

/* ::
import type {
  options
} from './types.js'
*/
const generateFormUrl = require('./lib/generateFormUrl')
const generateJwt = require('./lib/generateJWT')

module.exports = class OneblinkSDK {
  constructor (
    options /* options */
  ) {
    options = options || {}
    if (!options.formsAccessKey) {
      throw new TypeError('must supply an Access Key')
    }
    if (typeof options.formsAccessKey !== 'string') {
      throw new TypeError('Access Key must be a string')
    }
    if (!options.formsSecret) {
      throw new TypeError('must supply an Secret Key')
    }
    if (typeof options.formsSecret !== 'string') {
      throw new TypeError('Secret Key must be a string')
    }
    this.formsAccessKey = options.formsAccessKey
    this.formsSecret = options.formsSecret
  }

  generateFormUrl (
    formId /* : number */,
    externalId /* : string */
  ) {
    const jwtExpiry = 28000

    this.token = generateJwt.createJWT(this.formsAccessKey, this.formsSecret, jwtExpiry)

    this.url = generateFormUrl.generateUrl(formId, externalId)

    let exp = new Date(Date.now() + jwtExpiry)

    return {
      formUrl: this.url,
      JWT: this.token,
      expiry: exp
    }
  }
}
