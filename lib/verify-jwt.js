// @flow

const util = require('util')

const jwt = require('jsonwebtoken')

const jwtVerifyAsync = util.promisify(jwt.verify)

module.exports = async (token /* : string */, tenant /* : Tenant */) => {
  if (token.includes('Bearer ')) {
    token = token.split(' ')[1]
  }

  const getSigningKey = (header, callback) => {
    tenant.jwksInstance.getSigningKey(header.kid, (error, key) => {
      if (error) {
        callback(error)
      } else {
        callback(null, key.publicKey || key.rsaPublicKey)
      }
    })
  }

  return jwtVerifyAsync(token, getSigningKey, {
    algorithms: ['RS256'],
    issuer: tenant.jwtIssuer,
  })
}
