import { KeyTypes } from '@oneblink/types'
import jwt from 'jsonwebtoken'

export default function generateJWT(
  accessKey: string,
  secretKey: string,
  expiresInSeconds: number,
  developerKeyAccess?: KeyTypes.DeveloperKeyAccess,
): string {
  const developerKeyJWTPayload: KeyTypes.DeveloperKeyJWTPayload = {
    'oneblink:access': developerKeyAccess,
  }
  return jwt.sign(
    {
      ...developerKeyJWTPayload,
      iss: accessKey,
    },
    secretKey,
    {
      expiresIn: expiresInSeconds,
    },
  )
}
