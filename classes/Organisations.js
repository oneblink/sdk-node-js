// @flow
'use strict'

const OneBlinkAPI = require('../lib/one-blink-api.js')
const uploadAsset = require('../lib/upload-asset.js')

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

    uploadAsset(
      assetData /* :string */,
      assetFileName /*:string */,
    ) /* :Promise<{location :string}> */ {
      if (typeof assetData !== 'string') {
        return Promise.reject(
          new TypeError('Must supply "assetData" as a string'),
        )
      }
      if (typeof assetFileName !== 'string') {
        return Promise.reject(
          new TypeError('Must supply "assetFileName" as a string'),
        )
      }

      return super
        .getRequest('/organisations')
        .then((searchResponse) => {
          if (!searchResponse.organisations) {
            return Promise.reject(
              new TypeError('You do not have access to any organisations'),
            )
          }
          return searchResponse.organisations[0].id
        })
        .then((organisationId) => {
          return super.postRequest('/asset-upload-credentials', {
            assetPath: `assets/${assetFileName}`,
            organisationId,
          })
        })

        .then((credentials) => uploadAsset(credentials, assetData))
        .then((uploadDetails) => {
          return { location: uploadDetails.Location }
        })
    }
  }
