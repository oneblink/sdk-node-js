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
      asset /* : {
      assetData :mixed,
      assetFileName :string,
      assetContentType :?string
      } */,
    ) /* :Promise<{location :string}> */ {
      if (typeof asset.assetFileName !== 'string') {
        return Promise.reject(
          new TypeError('Must supply "assetFileName" as a string'),
        )
      }
      if (
        asset.assetContentType &&
        typeof asset.assetContentType !== 'string'
      ) {
        return Promise.reject(
          new TypeError('If supplied, "assetContentType" must be a string'),
        )
      }
      return super
        .getRequest('/organisations')
        .then((searchResponse) => {
          if (
            !searchResponse.organisations ||
            !searchResponse.organisations[0]
          ) {
            return Promise.reject(
              new TypeError('You do not have access to any organisations'),
            )
          }
          return searchResponse.organisations[0].id
        })
        .then((organisationId) => {
          return super.postRequest('/asset-upload-credentials', {
            assetPath: `assets/${asset.assetFileName}`,
            organisationId,
          })
        })

        .then((credentials) =>
          uploadAsset(credentials, asset.assetData, asset.assetContentType),
        )
        .then((uploadDetails) => {
          return { location: uploadDetails.Location }
        })
    }
  }
