// @flow
'use strict'

const jwt = require('jsonwebtoken')

function generateJWT(
  accessKey /* : string */,
  secretKey /* : string */,
  expiresInSeconds /* : number */,
) {
  return jwt.sign(
    {
      iss: accessKey,
    },
    secretKey,
    {
      expiresIn: expiresInSeconds,
    },
  )
}

module.exports = generateJWT
