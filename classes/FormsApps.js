// @flow
'use strict'

const OneBlinkAPI = require('../lib/one-blink-api.js')
const oneBlinkAPIErrorHandler = require('../lib/one-blink-api-error-handler.js')
const basePath = `/forms-apps`
const verifyJWT = require('../lib/verify-jwt')

module.exports = (tenant /* : Tenant */) =>
  class FormsApps extends OneBlinkAPI {
    constructor(options /* : ConstructorOptions */) {
      options = options || {}
      super(options.accessKey, options.secretKey, tenant)
    }

    static async verifyJWT(token /* : string */) /* : Promise<mixed> */ {
      return verifyJWT(token, tenant)
    }

    async getFormsApp(formsAppId /* : ?mixed */) /* : Promise<FormsApp> */ {
      if (typeof formsAppId !== 'number') {
        return Promise.reject(
          new TypeError('Must supply "formsAppId" as a number'),
        )
      }

      return super.getRequest(`${basePath}/${formsAppId}`)
    }

    async getMyFormsApp(
      formsAppUserToken /* : ?mixed */,
    ) /* : Promise<FormsApp | null> */ {
      if (typeof formsAppUserToken !== 'string') {
        return Promise.reject(
          new TypeError('Must supply "formsAppUserToken" as a string'),
        )
      }

      return this.oneBlinkAPI
        .get('/my-forms-app', {
          headers: {
            Authorization: `Bearer ${formsAppUserToken}`,
          },
        })
        .then((response) => response.data)
        .catch(oneBlinkAPIErrorHandler)
    }

    async createFormsApp(data /* : ?mixed */) /* : Promise<FormsApp> */ {
      return super.postRequest(basePath, data)
    }

    async updateFormsApp(data /* : ?mixed */) /* : Promise<FormsApp> */ {
      if (!data || typeof data.id !== 'number') {
        return Promise.reject(
          new TypeError('Must supply "formsApp.id" as a number'),
        )
      }

      return super.putRequest(`${basePath}/${data.id}`, data)
    }

    async deleteFormsApp(formsAppId /* : ?mixed */) /* : Promise<void> */ {
      if (typeof formsAppId !== 'number') {
        return Promise.reject(
          new TypeError('Must supply "formsAppId" as a number'),
        )
      }

      return super.deleteRequest(`${basePath}/${formsAppId}`)
    }

    async updateStyles(
      formsAppId /* : ?mixed */,
      data /* : ?mixed */,
    ) /* : Promise<FormsListStyles> */ {
      if (typeof formsAppId !== 'number') {
        return Promise.reject(
          new TypeError('Must supply "formsAppId" as a number'),
        )
      }

      return super.putRequest(`${basePath}/${formsAppId}/styles`, data)
    }

    async createUser(data /* : ?mixed */) /* : Promise<FormsAppUser> */ {
      return super.postRequest('/appUsers', data)
    }

    async deleteUser(formsAppUserId /* : ?mixed */) /* : Promise<void> */ {
      if (typeof formsAppUserId !== 'number') {
        return Promise.reject(
          new TypeError('Must supply "formsAppUserId" as a number'),
        )
      }

      return super.deleteRequest(`/appUsers/${formsAppUserId}`)
    }

    async setSendingAddress(
      formsAppId /* : ?mixed */,
      emailAddress /* : ?mixed */,
      emailName /* : ?mixed */,
    ) /* : Promise<FormsAppSendingAddress> */ {
      if (typeof formsAppId !== 'number') {
        return Promise.reject(
          new TypeError('Must supply "formsAppId" as a number'),
        )
      }

      if (typeof emailAddress !== 'string') {
        return Promise.reject(
          new TypeError('Must supply "emailAddress" as a string'),
        )
      }

      if (typeof emailName !== 'string') {
        return Promise.reject(
          new TypeError('Must supply "emailName" as a string'),
        )
      }

      return super.postRequest(`/forms-apps/${formsAppId}/sending-address`, {
        emailAddress,
        emailName,
      })
    }

    async deleteSendingAddress(
      formsAppId /* : ?mixed */,
    ) /* : Promise<void> */ {
      if (typeof formsAppId !== 'number') {
        return Promise.reject(
          new TypeError('Must supply "formsAppId" as a number'),
        )
      }

      return super.deleteRequest(`/forms-apps/${formsAppId}/sending-address`)
    }
  }
