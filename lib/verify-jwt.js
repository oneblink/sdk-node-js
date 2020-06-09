// @flow

const jwt = require('jsonwebtoken')

module.exports = async (token /* : string */, jwks /* : JwksClient */) => {
  if (token.includes('Bearer ')) {
    token = token.split(' ')[1]
  }

  const decoded = await new Promise((resolve, reject) => {
    jwt.verify(
      token,
      (header, callback) => {
        jwks.getSigningKey(header.kid, (error, key) => {
          if (error) {
            callback(error)
          } else {
            callback(null, key.publicKey || key.rsaPublicKey)
          }
        })
      },
      {
        algorithms: ['RS256'],
        issuer: jwks.options.jwksUri.split('/.well-known')[0], // ISS
      },
      (error, decoded) => {
        if (error) {
          reject(error)
        } else {
          resolve(decoded)
        }
      },
    )
  })

  return decoded
}
