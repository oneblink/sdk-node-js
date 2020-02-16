// @flow
'use strict'

const OneBlinkAPI = require('../lib/one-blink-api.js')
const getRegionUrl = require('../lib/region')
module.exports = class Organisations extends OneBlinkAPI {
  constructor(options /* : ConstructorOptions */) {
    options = options || {}
    super(
      getRegionUrl(options.regionCode, options.oneBlinkAPIOrigin),
      options.accessKey,
      options.secretKey
    )
  }

  getOrganisation(organisationId /* : ?mixed */) /* : Promise<Organisation> */ {
    if (typeof organisationId !== 'string') {
      return Promise.reject(
        new TypeError('Must supply "organisationId" as a string')
      )
    }

    return super.getRequest(`/organisations/${organisationId}`)
  }
}
