'use strict'

// @flow

const jwt = require('jsonwebtoken')

function createJWT (accessKey, secret, expiry) {
  return jwt.sign({
    iss: accessKey,
    exp: Date.now() + expiry // expires in 8 hours -- 28800
  }, secret)
}

module.exports = {
  createJWT
}
