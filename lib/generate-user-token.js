// @flow
'use strict'

const crypto = require('crypto')

module.exports = function generateUserToken(
  { username, secret } /* : {
  username: string,
  secret: string,
} */,
) /* : string */ {
  return crypto
    .createHash('sha256')
    .update(username)
    .update(secret)
    .digest('hex')
}
