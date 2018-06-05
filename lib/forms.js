// @flow
'use strict'

/* ::
import type {
  ConstructorOptions
} from '../types.js'
*/

const generateFormUrl = require('./generate-form-url.js')
const generateJWT = require('./generate-jwt.js')

module.exports = class Forms {
  /* ::
  accessKey: string
  secretKey: string
  formsRendererOrigin: string
  */
  constructor (
    options /* : ConstructorOptions */
  ) {
    options = options || {}
    if (!options.accessKey) {
      throw new TypeError('must supply an Access Key')
    }
    if (typeof options.accessKey !== 'string') {
      throw new TypeError('Access Key must be a string')
    }
    if (!options.secretKey) {
      throw new TypeError('must supply an Secret Key')
    }
    if (typeof options.secretKey !== 'string') {
      throw new TypeError('Secret Key must be a string')
    }
    this.accessKey = options.accessKey
    this.secretKey = options.secretKey
    this.formsRendererOrigin = options.formsRendererOrigin || 'https://forms.oneblink.io'
  }

  generateFormUrl (
    formId /* : number */,
    externalId /* : ?string */
  ) {
    // Default expiry for token is 8 hours
    const jwtExpiry = 28800

    const token = generateJWT(this.accessKey, this.secretKey, jwtExpiry)

    const url = generateFormUrl(this.formsRendererOrigin, formId, token, externalId)

    let exp = new Date(Date.now() + (jwtExpiry * 1000)).toISOString()

    return {
      formUrl: url,

      expiry: exp
    }
  }
}
