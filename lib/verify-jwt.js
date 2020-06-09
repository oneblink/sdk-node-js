// @flow
const jwt = require('jsonwebtoken')
module.exports = async (token /* : string */, jwks /* : JwksClient */) => {
  try {
    if (token.includes('Bearer ')) {
      token = token.split(' ')[1]
    }
    const { header } = jwt.decode(token, { complete: true })
    const publicKey = await getPublicKey(jwks, header.kid)

    const decoded = jwt.verify(token, publicKey, {
      algorithms: ['RS256'],
      issuer: jwks.options.jwksUri.split('/.well-known')[0], // ISS
    })
    return decoded
  } catch (err) {
    throw new Error('The supplied JWT was invalid.')
  }
}

const getPublicKey = (
  jwks /* : JwksClient */,
  kid /* : string */,
) /* : Promise<string> */ => {
  return new Promise((resolve, reject) => {
    jwks.getSigningKey(kid, (err, key) => {
      if (err) return reject(err)
      return resolve(key.publicKey || key.rsaPublicKey)
    })
  })
}
