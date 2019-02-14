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

function errorHandler (
  error /* : $AxiosError<{
    error: string,
    message: string,
    statusCode: number
  }> */
) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    error.response.data = error.response.data || {
      message: 'OneBlink API Internal Server Error'
    }
    const err = new Error(error.response.data.message)
    err.name = 'OneBlinkAPIError'
    throw err
  }

  throw error
}

module.exports = class OneBlinkAPI {
  /* ::
  oneBlinkAPI: Axios
  accessKey: string
  secretKey: string
  jwtExpiry: number
  */
  constructor (
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
      baseURL: typeof apiOrigin === 'string' ? apiOrigin : 'https://auth-api.blinkm.io'
    })

    this.oneBlinkAPI.defaults.headers.common.referrer = `${pkg.name}@${pkg.version}`
  }

  getRequest (
    path /* : string */
  ) /* Promise<Object> */ {
    // 5 minute expiry
    return this.oneBlinkAPI.get(path, {
      headers: {
        'Authorization': `Bearer ${generateJWT(this.accessKey, this.secretKey, this.jwtExpiry)}`
      }
    })
      .then((response) => response.data)
      .catch(errorHandler)
  }

  searchRequest (
    path /* : string */,
    searchParams /* : ?{ [key: string]: mixed } */
  ) /* Promise<Object> */ {
    const search = querystring.stringify(searchParams || {})
    return this.getRequest(`${path}?${search}`)
  }

  postRequest (
    path /* : string */,
    body /* : ?mixed */
  ) /* Promise<Object> */ {
    // 5 minute expiry
    return this.oneBlinkAPI.post(path, body, {
      headers: {
        'Authorization': `Bearer ${generateJWT(this.accessKey, this.secretKey, this.jwtExpiry)}`
      }
    })
      .then((response) => response.data)
      .catch(errorHandler)
  }

  async deleteRequest (
    path /* : string */
  ) /* : Promise<void> */ {
    // 5 minute expiry
    try {
      await this.oneBlinkAPI.delete(path, {
        headers: {
          'Authorization': `Bearer ${generateJWT(this.accessKey, this.secretKey, this.jwtExpiry)}`
        }
      })
    } catch (error) {
      errorHandler(error)
    }
  }
}
