// @flow
'use strict'

/* ::
import type {
  $AxiosError
} from 'axios'
*/

function oneBlinkAPIErrorHandler(
  error /* : $AxiosError<{
    error: string,
    message: string,
    statusCode: number
  }> */,
) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    error.response.data = error.response.data || {
      message: 'OneBlink API Internal Server Error',
    }
    const err = new Error(error.response.data.message)
    err.name = 'OneBlinkAPIError'
    throw err
  }

  throw error
}

module.exports = oneBlinkAPIErrorHandler
