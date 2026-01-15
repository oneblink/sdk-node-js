import { FormsAppsTypes } from '@oneblink/types'
import OneBlinkAPI from '../lib/one-blink-api.js'
import { ConstructorOptions } from '../types.js'
import verifyJWT from '../lib/verify-jwt.js'

const basePath = `/forms-apps`

export default class FormsApps extends OneBlinkAPI {
  /**
   * @example
   *   const OneBlink = require('@oneblink/sdk')
   *   const options = {
   *     accessKey: '123455678901ABCDEFGHIJKL',
   *     secretKey: '123455678901ABCDEFGHIJKL123455678901ABCDEFGHIJKL',
   *   }
   *   const formsAppsSDK = new OneBlink.FormsApps(options)
   */
  constructor(options: ConstructorOptions) {
    options = options || {}
    super(options.accessKey, options.secretKey)
  }

  /**
   * A Static function to verify a JWT and return its result
   *
   * @example
   *   const token =
   *     'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
   *   // or
   *   const token =
   *     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
   *   OneBlink.FormsApps.verifyJWT(token)
   *     .then((result) => {
   *       // Result is Decoded Token
   *     })
   *     .catch((e) => {
   *       // Token was invalid
   *     })
   *
   * @param token The JWT you wish to verify
   * @returns
   */
  static async verifyJWT<T extends Record<string, unknown>>(
    token: string,
  ): Promise<T> {
    return verifyJWT<T>(token, OneBlinkAPI.tenant)
  }

  /**
   * Get a single Forms App by its identifier
   *
   * **Minimum Role Permission**
   *
   * Apps: _Read Only_
   *
   * @example
   *   const formsAppId = 1
   *   formsAppsSDK.getFormsApp(formsAppId).then((formsApp) => {
   *     // Use Forms App here...
   *   })
   *
   * @param formsAppId The exact identifier of the Forms App you wish to get
   * @returns
   */
  async getFormsApp(formsAppId: number): Promise<FormsAppsTypes.FormsApp> {
    if (typeof formsAppId !== 'number') {
      return Promise.reject(
        new TypeError('Must supply "formsAppId" as a number'),
      )
    }

    return super.getRequest(`${basePath}/${formsAppId}`)
  }

  /**
   * Get a single Forms App for the Bearer token of a Forms App User
   *
   * @example
   *   const bearerToken = ''
   *   formsAppsSDK.getMyFormsApp(bearerToken).then((formsApp) => {
   *     // Use Forms App here...
   *   })
   *
   * @param formsAppUserToken The Bearer token in the `Authorization` header
   *   from a request from an App User
   * @returns
   */
  async getMyFormsApp(
    formsAppUserToken?: unknown,
  ): Promise<FormsAppsTypes.FormsApp> {
    if (typeof formsAppUserToken !== 'string') {
      return Promise.reject(
        new TypeError('Must supply "formsAppUserToken" as a string'),
      )
    }

    const response = await super.request({
      origin: OneBlinkAPI.tenant.apiOrigin,
      method: 'GET',
      path: '/my-forms-app',
      headers: {
        Authorization: `Bearer ${formsAppUserToken}`,
      },
    })
    return (await response.json()) as FormsAppsTypes.FormsApp
  }

  /**
   * Create a Forms App
   *
   * **Minimum Role Permission**
   *
   * Apps: _Manager_
   *
   * @example
   *   formsAppsSDK.createFormsApp(formsApp).then((savedFormsApp) => {
   *     // Use Forms App here...
   *   })
   *
   * @param formsApp Forms App properties
   * @returns
   */
  async createFormsApp(
    formsApp: FormsAppsTypes.NewFormsApp,
  ): Promise<FormsAppsTypes.FormsApp> {
    return super.postRequest(basePath, formsApp)
  }

  /**
   * Update a Forms App
   *
   * **Minimum Role Permission**
   *
   * Apps: _Manager_
   *
   * @example
   *   formsAppsSDK.updateFormsApp(formsApp).then((savedFormsApp) => {
   *     // Use Forms App here...
   *   })
   *
   * @param formsApp Forms App properties
   * @returns
   */
  async updateFormsApp(
    formsApp: FormsAppsTypes.FormsApp,
  ): Promise<FormsAppsTypes.FormsApp> {
    if (!formsApp || typeof formsApp.id !== 'number') {
      return Promise.reject(
        new TypeError('Must supply "formsApp.id" as a number'),
      )
    }

    return super.putRequest(`${basePath}/${formsApp.id}`, formsApp)
  }

  /**
   * Delete a Forms App by its identifier
   *
   * **Minimum Role Permission**
   *
   * Apps: _Manager_
   *
   * @example
   *   const formsAppId = 1
   *   formsAppsSDK.deleteFormsApp(formsAppId).then(() => {
   *     // Forms App has been deleted...
   *   })
   *
   * @param formsAppId The exact identifier of the Forms App you wish to delete
   * @returns
   */
  async deleteFormsApp(formsAppId: number): Promise<void> {
    if (typeof formsAppId !== 'number') {
      return Promise.reject(
        new TypeError('Must supply "formsAppId" as a number'),
      )
    }

    return super.deleteRequest(`${basePath}/${formsAppId}`)
  }

  /**
   * Create a Forms App User
   *
   * **Minimum Role Permission**
   *
   * App Users: _Manager_
   *
   * @example
   *   formsAppsSDK.createUser(formsAppUser).then((savedFormsAppUser) => {
   *     // Use Forms App User here...
   *   })
   *
   * @param formsAppUser Forms App User
   * @returns
   */
  async createUser(
    formsAppUser: FormsAppsTypes.NewFormsAppUser,
  ): Promise<FormsAppsTypes.FormsAppUser> {
    return super.postRequest('/appUsers', formsAppUser)
  }

  /**
   * Delete a Forms App User by its identifier
   *
   * **Minimum Role Permission**
   *
   * App Users: _Manager_
   *
   * @example
   *   const formsAppUserId = 1
   *   formsAppsSDK.deleteUser(formsAppUserId).then(() => {
   *     // Forms App User has been deleted...
   *   })
   *
   * @param formsAppUserId The exact Forms App User identifier you wish to
   *   delete
   * @returns
   */
  async deleteUser(formsAppUserId: number): Promise<void> {
    if (typeof formsAppUserId !== 'number') {
      return Promise.reject(
        new TypeError('Must supply "formsAppUserId" as a number'),
      )
    }

    return super.deleteRequest(`/appUsers/${formsAppUserId}`)
  }

  /**
   * Get the email address forms app emails will be sent from
   *
   * **Minimum Role Permission**
   *
   * Apps: _Read Only_
   *
   * @example
   *   const res = await formsAppsSDK.getSendingAddress(formsAppId)
   *
   * @param formsAppId The ID of the forms app you wish to get the sending
   *   address for
   * @returns
   */
  async getSendingAddress(
    formsAppId: number,
  ): Promise<FormsAppsTypes.FormsAppSendingAddressResponse> {
    if (typeof formsAppId !== 'number') {
      return Promise.reject(
        new TypeError('Must supply "formsAppId" as a number'),
      )
    }

    return super.getRequest(`/v2/forms-apps/${formsAppId}/sending-address`)
  }
  /**
   * Set the email address forms app emails will be sent from
   *
   * **Minimum Role Permission**
   *
   * App Users: _Manager_
   *
   * @example
   *   const res = await formsAppsSDK.setSendingAddress(
   *     formsAppId,
   *     sendingAddressConfig,
   *   )
   *
   * @param formsAppId The ID of the forms app you wish to set the sending
   *   address for
   * @param sendingAddressConfig The object containing the `emailAddress` &
   *   `emailName` properties
   * @returns
   */
  async setSendingAddress(
    formsAppId: number,
    sendingAddressConfig: {
      emailAddress?: string
      emailName?: string
    },
  ): Promise<FormsAppsTypes.FormsAppSendingAddressResponse> {
    if (typeof formsAppId !== 'number') {
      return Promise.reject(
        new TypeError('Must supply "formsAppId" as a number'),
      )
    }

    if (!sendingAddressConfig) {
      return Promise.reject(
        new TypeError(
          'Must supply an object containing "emailAddress" or "emailName" properties',
        ),
      )
    }

    if (
      sendingAddressConfig.emailName &&
      typeof sendingAddressConfig.emailAddress !== 'string'
    ) {
      return Promise.reject(
        new TypeError('Must supply "emailName" as a string or not at all'),
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

    if (!sendingAddressConfig.emailAddress && !sendingAddressConfig.emailName) {
      return Promise.reject(
        new TypeError(
          'Must supply at least one of "emailAddress" or "emailName"',
        ),
      )
    }

    return super.postRequest(`/v2/forms-apps/${formsAppId}/sending-address`, {
      emailAddress: sendingAddressConfig.emailAddress,
      emailName: sendingAddressConfig.emailName,
    })
  }

  /**
   * Remove a custom sending address for a forms app
   *
   * **Minimum Role Permission**
   *
   * App Users: _Manager_
   *
   * @example
   *   const formsAppId = 1
   *   await formsAppsSDK.deleteSendingAddress(formsAppId)
   *
   * @param formsAppId The ID of the forms app you wish to remove the sending
   *   address from
   * @returns
   */
  async deleteSendingAddress(formsAppId: number): Promise<void> {
    if (typeof formsAppId !== 'number') {
      return Promise.reject(
        new TypeError('Must supply "formsAppId" as a number'),
      )
    }

    return super.deleteRequest(`/forms-apps/${formsAppId}/sending-address`)
  }
}
