import jwt from 'jsonwebtoken'

export default function generateJWT(
  accessKey: string,
  secretKey: string,
  expiresInSeconds: number,
): string {
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
