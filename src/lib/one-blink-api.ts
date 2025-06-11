import querystring from 'querystring'

import fetch, { Response, BodyInit } from 'node-fetch'
import { KeyTypes } from '@oneblink/types'
import {
  OneBlinkDownloader,
  OneBlinkUploader,
  StorageConstructorOptions,
} from '@oneblink/storage'

import pkg from './package'
import generateJWT from './generate-jwt'
import { Tenant } from '../types'
import generateTenant from './generate-tenant'
import { ONEBLINK } from './tenant-configuration'

async function getResponseErrorMessage(response: Response): Promise<string> {
  // The request was made and the server responded with
  // a status code that falls out of the range of 2xx
  const contentType = response.headers.get('content-type')
  if (!contentType || !contentType.toLowerCase().includes('application/json')) {
    return await response.text()
  }

  const body = await response.json()
  if (body && body.message) {
    return body.message
  }

  return 'OneBlink API Internal Server Error'
}

export default class OneBlinkAPI {
  /** @internal */
  static tenant: Tenant = generateTenant(ONEBLINK)
  /** @internal */
  accessKey: string
  /** @internal */
  secretKey: string
  /** @internal */
  jwtExpiry: number
  /** @internal */
  oneBlinkUploader: OneBlinkUploader
  /** @internal */
  oneBlinkDownloader: OneBlinkDownloader

  constructor(accessKey: unknown, secretKey: unknown) {
    if (!accessKey || typeof accessKey !== 'string') {
      throw new TypeError('Must supply Access Key as a string')
    }
    if (!secretKey || typeof secretKey !== 'string') {
      throw new TypeError('Must supply Secret Key as a string')
    }

    // 5 minute expiry
    this.jwtExpiry = 300
    this.accessKey = accessKey
    this.secretKey = secretKey

    const storageConstructorOptions: StorageConstructorOptions = {
      apiOrigin: OneBlinkAPI.tenant.apiOrigin,
      region: OneBlinkAPI.tenant.awsRegion,
      getBearerToken: async () => this.generateBearerToken(),
    }
    this.oneBlinkUploader = new OneBlinkUploader(storageConstructorOptions)
    this.oneBlinkDownloader = new OneBlinkDownloader(storageConstructorOptions)
  }

  /** @internal */
  generateBearerToken(options?: {
    expiresInSeconds?: number
    developerKeyAccess?: KeyTypes.DeveloperKeyAccess
    username?: string
  }): string {
    return generateJWT({
      accessKey: this.accessKey,
      secretKey: this.secretKey,
      expiresInSeconds: options?.expiresInSeconds || this.jwtExpiry,
      username: options?.username,
      developerKeyAccess: options?.developerKeyAccess,
    })
  }

  /** @internal */
  get defaultRequestHeaders(): Record<string, string> {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': `Node.js ${pkg.name} / ${pkg.version}`,
      Authorization: `Bearer ${this.generateBearerToken()}`,
    }
  }

  /** @internal */
  async request({
    origin,
    method,
    path,
    body,
    headers,
  }: {
    origin: string
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    path: string
    body?: BodyInit
    headers?: Record<string, string>
  }): Promise<Response> {
    const response = await fetch(`${origin}${path}`, {
      method,
      headers: {
        ...this.defaultRequestHeaders,
        ...headers,
      },
      body,
    })

    if (!response.ok) {
      // The request was made and the server responded with
      // a status code that falls out of the range of 2xx
      const errorMessage = await getResponseErrorMessage(response)
      const error = new Error(errorMessage)
      error.name = 'OneBlinkAPIError'
      throw error
    }

    return response
  }

  /** @internal */
  async getRequest<TOut>(path: string): Promise<TOut> {
    const response = await this.request({
      origin: OneBlinkAPI.tenant.apiOrigin,
      method: 'GET',
      path,
    })
    return await response.json()
  }

  /** @internal */
  async searchRequest<TOut>(
    path: string,
    searchParams?: querystring.ParsedUrlQueryInput,
  ): Promise<TOut> {
    const search = querystring.stringify(searchParams || {})

    return await this.getRequest<TOut>(`${path}?${search}`)
  }

  /** @internal */
  async putRequest<T, TOut>(path: string, payload: T): Promise<TOut> {
    const response = await this.request({
      origin: OneBlinkAPI.tenant.apiOrigin,
      method: 'PUT',
      path,
      body: JSON.stringify(payload),
    })
    return await response.json()
  }

  /** @internal */
  async postRequest<T, TOut>(path: string, payload: T): Promise<TOut> {
    const response = await this.request({
      origin: OneBlinkAPI.tenant.apiOrigin,
      method: 'POST',
      path,
      body: JSON.stringify(payload),
    })
    return await response.json()
  }

  /** @internal */
  async postEmptyRequest<T>(path: string): Promise<T> {
    const response = await this.request({
      origin: OneBlinkAPI.tenant.apiOrigin,
      method: 'POST',
      path,
    })
    return await response.json()
  }

  /** @internal */
  async deleteRequest(path: string): Promise<void> {
    await this.request({
      origin: OneBlinkAPI.tenant.apiOrigin,
      method: 'DELETE',
      path,
    })
  }
}
