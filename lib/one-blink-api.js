// @flow
'use strict'

/* ::
import type {
  Response
} from 'node-fetch'
*/

const querystring = require('querystring')

const fetch = require('node-fetch').default

const pkg = require('../package.json')
const generateJWT = require('./generate-jwt.js')

module.exports = class OneBlinkAPI {
  /* ::
  tenant: Tenant
  accessKey: string
  secretKey: string
  jwtExpiry: number
  */
  constructor(
    accessKey /* : mixed */,
    secretKey /* : mixed */,
    tenant /* : Tenant */,
  ) {
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

  get defaultRequestHeaders() /* : { [key: string]: string, ... } */ {
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

  async request /* :: <TIn, TOut> */(
    {
      method,
      path,
      payload,
      headers,
    } /* : {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    payload?: TIn,
    headers?: { [key: string]: string, ... },
  } */,
  ) /* : Promise<Response> */ {
    let body = undefined
    if (typeof payload === 'string') {
      body = payload
    } else if (payload !== undefined) {
      body = JSON.stringify(payload)
    }

    const response = await fetch(`${this.tenant.apiOrigin}${path}`, {
      method,
      headers: {
        ...this.defaultRequestHeaders,
        ...headers,
      },
      body,
    })

    if (!response.ok) {
      const body = await response.json()
      console.log('body', body)
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

  async getRequest /* :: <TOut> */(path /* : string */) /* : Promise<TOut> */ {
    const response = await this.request({
      method: 'GET',
      path,
    })
    return await response.json()
  }

  async searchRequest /*:: <T, TOut> */(
    path /* : string */,
    searchParams /* : ?T */,
  ) /* : Promise<TOut> */ {
    const search = querystring.stringify(searchParams || {})

    return await this.getRequest(`${path}?${search}`)
  }

  async putRequest /*:: <T, TOut> */(
    path /* : string */,
    body /* : T | void */,
  ) /* : Promise<TOut> */ {
    const response = await this.request({
      method: 'PUT',
      path,
      body,
    })
    return await response.json()
  }

  async postRequest /*:: <T, TOut> */(
    path /* : string */,
    body /* : T | void */,
  ) /* : Promise<TOut> */ {
    const response = await this.request({
      method: 'POST',
      path,
      body,
    })
    return await response.json()
  }

  async deleteRequest(path /* : string */) /* : Promise<void> */ {
    await this.request({
      method: 'DELETE',
      path,
    })
  }
}
