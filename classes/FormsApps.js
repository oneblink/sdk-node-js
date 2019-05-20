// @flow
'use strict'

const OneBlinkAPI = require('../lib/one-blink-api.js')

const basePath = `/forms-apps`

module.exports = class FormsApps extends OneBlinkAPI {
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

  async getFormsApp (
    formsAppId /* : ?mixed */
  ) /* : Promise<FormsApp> */ {
    if (typeof formsAppId !== 'number') {
      return Promise.reject(new TypeError('Must supply "formsAppId" as a number'))
    }

    return super.getRequest(`${basePath}/${formsAppId}`)
  }

  async createFormsApp (
    data /* : ?mixed */
  ) /* : Promise<FormsApp> */ {
    return super.postRequest(basePath, data)
  }

  async updateFormsApp (
    data /* : ?mixed */
  ) /* : Promise<FormsApp> */ {
    if (!data || typeof data.id !== 'number') {
      return Promise.reject(new TypeError('Must supply "formsApp.id" as a number'))
    }

    return super.putRequest(`${basePath}/${data.id}`, data)
  }

  async deleteFormsApp (
    formsAppId /* : ?mixed */
  ) /* : Promise<void> */ {
    if (typeof formsAppId !== 'number') {
      return Promise.reject(new TypeError('Must supply "formsAppId" as a number'))
    }

    return super.deleteRequest(`${basePath}/${formsAppId}`)
  }

  async updateStyles (
    formsAppId /* : ?mixed */,
    data /* : ?mixed */
  ) /* : Promise<FormsAppStyles> */ {
    if (typeof formsAppId !== 'number') {
      return Promise.reject(new TypeError('Must supply "formsAppId" as a number'))
    }

    return super.putRequest(`${basePath}/${formsAppId}/styles`, data)
  }
}
