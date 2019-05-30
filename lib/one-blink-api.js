// @flow
'use strict'

/* ::
import type {
  Axios,
  $AxiosError
} from 'axios'
*/

const querystring = require('querystring')

const axios = require('axios')

const pkg = require('../package.json')
const generateJWT = require('./generate-jwt.js')
const errorHandler = require('./one-blink-api-error-handler.js')

module.exports = class OneBlinkAPI {
  /* ::
  oneBlinkAPI: Axios
  accessKey: string
  secretKey: string
  jwtExpiry: number
  */
  constructor(
    apiOrigin /* : mixed */,
    accessKey /* : mixed */,
    secretKey /* : mixed */
  ) {
    if (!accessKey || typeof accessKey !== 'string') {
      throw new TypeError('Must supply Access Key as a string')
    }
    if (!secretKey || typeof secretKey !== 'string') {
      throw new TypeError('Must supply Secret Key as a string')
    }

    this.jwtExpiry = 300
    this.accessKey = accessKey
    this.secretKey = secretKey
    this.oneBlinkAPI = axios.create({
      baseURL:
        typeof apiOrigin === 'string' ? apiOrigin : 'https://auth-api.blinkm.io'
    })

    this.oneBlinkAPI.defaults.headers.common['User-Agent'] = `${pkg.name}@${
      pkg.version
    }`
  }

  get defaultRequestConfig() {
    return {
      headers: {
        Authorization: `Bearer ${generateJWT(
          this.accessKey,
          this.secretKey,
          this.jwtExpiry
        )}`
      }
    }
  }

  getRequest(path /* : string */) /* Promise<Object> */ {
    // 5 minute expiry
    return this.oneBlinkAPI
      .get(path, this.defaultRequestConfig)
      .then(response => response.data)
      .catch(errorHandler)
  }

  searchRequest(
    path /* : string */,
    searchParams /* : ?{ [key: string]: mixed } */
  ) /* Promise<Object> */ {
    const search = querystring.stringify(searchParams || {})
    return this.getRequest(`${path}?${search}`)
  }

  putRequest(path /* : string */, body /* : ?mixed */) /* Promise<Object> */ {
    // 5 minute expiry
    return this.oneBlinkAPI
      .put(path, body, this.defaultRequestConfig)
      .then(response => response.data)
      .catch(errorHandler)
  }

  postRequest(path /* : string */, body /* : ?mixed */) /* Promise<Object> */ {
    // 5 minute expiry
    return this.oneBlinkAPI
      .post(path, body, this.defaultRequestConfig)
      .then(response => response.data)
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
