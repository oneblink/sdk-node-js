// @flow
'use strict'

/* ::
import type {
  Axios,
  $AxiosError,
  $AxiosXHRConfigBase
} from 'axios'
*/

const querystring = require('querystring')

const axios = require('axios')

const pkg = require('../package.json')
const generateJWT = require('./generate-jwt.js')
const errorHandler = require('./one-blink-api-error-handler.js')
const getTenantValues = require('./tenant')
module.exports = class OneBlinkAPI {
  /* ::
  oneBlinkAPI: Axios
  accessKey: string
  secretKey: string
  jwtExpiry: number
  jwksInstance: Object
  */
  constructor(
    accessKey /* : mixed */,
    secretKey /* : mixed */,
    tenant /* : string | void*/,
  ) {
    if (!accessKey || typeof accessKey !== 'string') {
      throw new TypeError('Must supply Access Key as a string')
    }
    if (!secretKey || typeof secretKey !== 'string') {
      throw new TypeError('Must supply Secret Key as a string')
    }

    const { apiOrigin, jwksInstance } = getTenantValues(tenant)
    this.jwtExpiry = 300
    this.accessKey = accessKey
    this.secretKey = secretKey
    this.oneBlinkAPI = axios.create({
      baseURL:
        typeof apiOrigin === 'string'
          ? apiOrigin
          : 'https://auth-api.blinkm.io',
    })
    this.jwksInstance = jwksInstance

    const userAgentHeader = `Node.js ${pkg.name} / ${pkg.version}`

    this.oneBlinkAPI.defaults.headers['User-Agent'] = userAgentHeader
  }

  get defaultRequestConfig() /* : $AxiosXHRConfigBase<any> */ {
    return {
      headers: {
        Authorization: `Bearer ${generateJWT(
          this.accessKey,
          this.secretKey,
          this.jwtExpiry,
        )}`,
      },
    }
  }

  getRequest /* :: <TOut> */(path /* : string */) /* : Promise<TOut> */ {
    // 5 minute expiry
    return this.oneBlinkAPI
      .get(path, this.defaultRequestConfig)
      .then((response) => response.data)
      .catch(errorHandler)
  }

  searchRequest /*:: <T, TOut> */(
    path /* : string */,
    searchParams /* : ?T */,
  ) /* : Promise<TOut> */ {
    const search = querystring.stringify(searchParams || {})

    return this.getRequest(`${path}?${search}`)
  }

  putRequest /*:: <T, TOut> */(
    path /* : string */,
    body /* : ?T */,
  ) /* : Promise<TOut> */ {
    // 5 minute expiry
    return this.oneBlinkAPI
      .put(path, body, this.defaultRequestConfig)
      .then((response) => response.data)
      .catch(errorHandler)
  }

  postRequest /*:: <T, TOut> */(
    path /* : string */,
    body /* : ?T */,
  ) /* : Promise<TOut> */ {
    // 5 minute expiry
    return this.oneBlinkAPI
      .post(path, body, this.defaultRequestConfig)
      .then((response) => response.data)
      .catch(errorHandler)
  }

  async deleteRequest(path /* : string */) /* : Promise<void> */ {
    // 5 minute expiry
    try {
      await this.oneBlinkAPI.delete(path, this.defaultRequestConfig)
    } catch (error) {
      errorHandler(error)
    }
  }
}
