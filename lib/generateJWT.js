// @flow
'use strict'

const jwt = require('jsonwebtoken')

function createJWT (
  accessKey /* : string */,
  secret /* : string */,
  expiry /* : number */
) {
  return jwt.sign({
    iss: accessKey,
    exp: Date.now() + expiry
  }, secret)
}

module.exports = {
  createJWT
}
