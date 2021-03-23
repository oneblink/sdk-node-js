import querystring from 'querystring'

import fetch, { Response, BodyInit } from 'node-fetch'

import pkg from './package'
import generateJWT from './generate-jwt'
import { Tenant } from './types'

export default class OneBlinkAPI {
  tenant: Tenant
  accessKey: string
  secretKey: string
  jwtExpiry: number

  constructor(accessKey: unknown, secretKey: unknown, tenant: Tenant) {
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
    this.tenant = tenant
  }

  get defaultRequestHeaders(): Record<string, string> {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': `Node.js ${pkg.name} / ${pkg.version}`,
      Authorization: `Bearer ${generateJWT(
        this.accessKey,
        this.secretKey,
        this.jwtExpiry,
      )}`,
    }
  }

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
      const body = await response.json()
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const error = new Error(
        body && body.message
          ? body.message
          : 'OneBlink API Internal Server Error',
      )
      error.name = 'OneBlinkAPIError'
      throw error
    }

    return response
  }

  async getRequest<TOut>(path: string): Promise<TOut> {
    const response = await this.request({
      origin: this.tenant.apiOrigin,
      method: 'GET',
      path,
    })
    return await response.json()
  }

  async searchRequest<T, TOut>(path: string, searchParams?: T): Promise<TOut> {
    const search = querystring.stringify(searchParams || {})

    return await this.getRequest(`${path}?${search}`)
  }

  async putRequest<T, TOut>(path: string, payload: T): Promise<TOut> {
    const response = await this.request({
      origin: this.tenant.apiOrigin,
      method: 'PUT',
      path,
      body: JSON.stringify(payload),
    })
    return await response.json()
  }

  async postRequest<T, TOut>(path: string, payload: T): Promise<TOut> {
    const response = await this.request({
      origin: this.tenant.apiOrigin,
      method: 'POST',
      path,
      body: JSON.stringify(payload),
    })
    return await response.json()
  }

  async postEmptyRequest<T>(path: string): Promise<T> {
    const response = await this.request({
      origin: this.tenant.apiOrigin,
      method: 'POST',
      path,
    })
    return await response.json()
  }

  async deleteRequest(path: string): Promise<void> {
    await this.request({
      origin: this.tenant.apiOrigin,
      method: 'DELETE',
      path,
    })
  }
}
