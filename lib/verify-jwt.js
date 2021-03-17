// @flow

const util = require('util')

const jwt = require('jsonwebtoken')

const jwtVerifyAsync = util.promisify(jwt.verify)

module.exports = async (token /* : string */, tenant /* : Tenant */) => {
  if (token.includes('Bearer ')) {
    token = token.split(' ')[1]
  }

  const getSigningKey = (header, callback) => {
    tenant.jwksInstance
      .getSigningKey(header.kid)
      .then((key) => {
        callback(null, key.publicKey || key.rsaPublicKey)
      })
      .catch((error) => callback(error))
  }

  return jwtVerifyAsync(token, getSigningKey, {
    algorithms: ['RS256'],
    issuer: tenant.jwtIssuer,
  })
}
