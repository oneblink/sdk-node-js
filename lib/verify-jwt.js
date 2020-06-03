// @flow
const jwt = require('jsonwebtoken')
const JwksClient = require('jwks-rsa')
module.exports = async (token /* : string */, iss /* : string */) => {
  try {
    const { header } = jwt.decode(token, { complete: true })
    const publicKey = await getPublicKey(iss, header.kid)
    const decoded = jwt.verify(token, publicKey, {
      algorithms: ['RS256'],
      issuer: iss,
    })
    return decoded
  } catch (err) {
    throw new Error('The supplied JWT was invalid.')
  }
}

const getPublicKey = (
  iss /* : string */,
  kid /* : string */,
) /* : Promise<string> */ => {
  const jwksClient = new JwksClient({
    cache: true,
    jwksUri: `${iss}/.well-known/jwks.json`,
  })
  return new Promise((resolve, reject) => {
    jwksClient.getSigningKey(kid, (err, key) => {
      if (err) return reject('Error retreiving public key.')
      return resolve(key.publicKey || key.rsaPublicKey)
    })
  })
}
