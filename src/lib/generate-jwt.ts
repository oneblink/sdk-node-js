import { KeyTypes } from '@oneblink/types'
import jwt from 'jsonwebtoken'

export default function generateJWT({
  accessKey,
  secretKey,
  expiresInSeconds,
  developerKeyAccess,
  username,
}: {
  accessKey: string
  secretKey: string
  expiresInSeconds: number
  developerKeyAccess?: KeyTypes.DeveloperKeyAccess
  username?: string
}): string {
  const developerKeyJWTPayload: KeyTypes.DeveloperKeyJWTPayload = {
    'oneblink:access': developerKeyAccess,
  }
  return jwt.sign(
    {
      ...developerKeyJWTPayload,
      iss: accessKey,
      sub: username,
    },
    secretKey,
    {
      expiresIn: expiresInSeconds,
    },
  )
}
