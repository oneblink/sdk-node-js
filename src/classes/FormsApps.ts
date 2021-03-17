import { FormsAppsTypes } from '@oneblink/types'
import OneBlinkAPI from '../lib/one-blink-api'
import { ConstructorOptions, Tenant } from '../lib/types'
import verifyJWT from '../lib/verify-jwt'

const basePath = `/forms-apps`

export default (tenant: Tenant) =>
  class FormsApps extends OneBlinkAPI {
    constructor(options: ConstructorOptions) {
      options = options || {}
      super(options.accessKey, options.secretKey, tenant)
    }

    static async verifyJWT<T extends Record<string, unknown>>(
      token: string,
    ): Promise<T> {
      return verifyJWT<T>(token, tenant)
    }

    async getFormsApp(formsAppId?: unknown): Promise<FormsAppsTypes.FormsApp> {
      if (typeof formsAppId !== 'number') {
        return Promise.reject(
          new TypeError('Must supply "formsAppId" as a number'),
        )
      }

      return super.getRequest(`${basePath}/${formsAppId}`)
    }

    async getMyFormsApp(
      formsAppUserToken?: unknown,
    ): Promise<FormsAppsTypes.FormsApp> {
      if (typeof formsAppUserToken !== 'string') {
        return Promise.reject(
          new TypeError('Must supply "formsAppUserToken" as a string'),
        )
      }

      const response = await super.request({
        method: 'GET',
        path: '/my-forms-app',
        headers: {
          Authorization: `Bearer ${formsAppUserToken}`,
        },
      })
      return await response.json()
    }

    async createFormsApp(data?: unknown): Promise<FormsAppsTypes.FormsApp> {
      return super.postRequest(basePath, data)
    }

    async updateFormsApp(
      data?: Record<string, unknown>,
    ): Promise<FormsAppsTypes.FormsApp> {
      if (!data || typeof data.id !== 'number') {
        return Promise.reject(
          new TypeError('Must supply "formsApp.id" as a number'),
        )
      }

      return super.putRequest(`${basePath}/${data.id}`, data)
    }

    async deleteFormsApp(formsAppId?: unknown): Promise<void> {
      if (typeof formsAppId !== 'number') {
        return Promise.reject(
          new TypeError('Must supply "formsAppId" as a number'),
        )
      }

      return super.deleteRequest(`${basePath}/${formsAppId}`)
    }

    async updateStyles(
      formsAppId?: unknown,
      data?: unknown,
    ): Promise<FormsAppsTypes.FormsListStyles> {
      if (typeof formsAppId !== 'number') {
        return Promise.reject(
          new TypeError('Must supply "formsAppId" as a number'),
        )
      }

      return super.putRequest(`${basePath}/${formsAppId}/styles`, data)
    }

    async createUser(data?: unknown): Promise<FormsAppsTypes.FormsAppUser> {
      return super.postRequest('/appUsers', data)
    }

    async deleteUser(formsAppUserId?: unknown): Promise<void> {
      if (typeof formsAppUserId !== 'number') {
        return Promise.reject(
          new TypeError('Must supply "formsAppUserId" as a number'),
        )
      }

      return super.deleteRequest(`/appUsers/${formsAppUserId}`)
    }

    async setSendingAddress(
      formsAppId?: unknown,
      sendingAddressConfig?: Record<string, unknown>,
    ): Promise<FormsAppsTypes.FormsAppSendingAddress> {
      if (typeof formsAppId !== 'number') {
        return Promise.reject(
          new TypeError('Must supply "formsAppId" as a number'),
        )
      }

      if (!sendingAddressConfig) {
        return Promise.reject(
          new TypeError(
            'Must supply an object containing "emailAddress" & "emailName" properties',
          ),
        )
      }

      if (typeof sendingAddressConfig.emailAddress !== 'string') {
        return Promise.reject(
          new TypeError('Must supply "emailAddress" as a string'),
        )
      }

      if (
        sendingAddressConfig.emailName &&
        typeof sendingAddressConfig.emailName !== 'string'
      ) {
        return Promise.reject(
          new TypeError('Must supply "emailName" as a string or not at all'),
        )
      }

      return super.postRequest(`/forms-apps/${formsAppId}/sending-address`, {
        emailAddress: sendingAddressConfig.emailAddress,
        emailName: sendingAddressConfig.emailName,
      })
    }

    async deleteSendingAddress(formsAppId?: unknown): Promise<void> {
      if (typeof formsAppId !== 'number') {
        return Promise.reject(
          new TypeError('Must supply "formsAppId" as a number'),
        )
      }

      return super.deleteRequest(`/forms-apps/${formsAppId}/sending-address`)
    }
  }
