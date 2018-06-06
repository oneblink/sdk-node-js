// @flow
'use strict'

/* ::
import type {
  Axios
} from 'axios'
*/

const querystring = require('querystring')

const axios = require('axios')

const generateJWT = require('./generate-jwt.js')

module.exports = class OneBlinkAPI {
  /* ::
  oneBlinkAPI: Axios
  accessKey: string
  secretKey: string
  */
  constructor (
    apiOrigin /* : string */,
    accessKey /* : string */,
    secretKey /* : string */
  ) {
    this.accessKey = accessKey
    this.secretKey = secretKey
    this.oneBlinkAPI = axios.create({
      baseURL: apiOrigin
    })
  }

  getRequest (
    path /* : string */
  ) /* Promise<Object> */ {
    // 5 minute expiry
    const jwtExpiry = 300

    return this.oneBlinkAPI.get(path, {
      headers: {'Authorization': `Bearer ${generateJWT(this.accessKey, this.secretKey, jwtExpiry)}`}
    })
      .then((response) => response.data)
      .catch((error) => {
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
      })
  }

  searchRequest (
    path /* : string */,
    searchParams /* : { [key: string]: mixed } */
  ) /* Promise<Object> */ {
    const search = querystring.stringify(searchParams)
    return this.getRequest(`${path}?${search}`)
  }
}
