import jwt, { JwtHeader, SigningKeyCallback } from 'jsonwebtoken'
import { Tenant } from '../types'

export default async function verifyJwt<T extends Record<string, unknown>>(
  token: string,
  tenant: Tenant,
): Promise<T> {
  if (token.includes('Bearer ')) {
    token = token.split(' ')[1]
  }

  const getSigningKey = (header: JwtHeader, callback: SigningKeyCallback) => {
    if (!header.kid) {
      callback(new Error('jwt does not container a "kid" claim'))
      return
    }
    tenant.jwksInstance.getSigningKey(header.kid, (error, key) => {
      if (error) {
        callback(error)
      } else {
        callback(null, key.getPublicKey())
      }
    })
  }

  return await new Promise((resolve, reject) => {
    jwt.verify(
      token,
      getSigningKey,
      {
        algorithms: ['RS256'],
        issuer: tenant.jwtIssuer,
      },
      (error, decoded) => {
        if (error) {
          reject(error)
        } else if (!decoded) {
          reject(new Error('Could not decode token payload'))
        } else {
          resolve(decoded as T)
        }
      },
    )
  })
}
