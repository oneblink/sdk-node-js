// @flow
'use strict'

const OneBlinkAPI = require('../lib/one-blink-api.js')

module.exports = (tenant /* : Tenant */) =>
  class Organisations extends OneBlinkAPI {
    constructor(options /* : ConstructorOptions */) {
      options = options || {}
      super(options.accessKey, options.secretKey, tenant)
    }

    getOrganisation(
      organisationId /* : ?mixed */,
    ) /* : Promise<Organisation> */ {
      if (typeof organisationId !== 'string') {
        return Promise.reject(
          new TypeError('Must supply "organisationId" as a string'),
        )
      }

      return super.getRequest(`/organisations/${organisationId}`)
    }
  }
