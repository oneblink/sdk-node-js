import crypto from 'crypto'

const ALGORITHM = 'aes-256-cbc'
const IV_LENGTH = 16 // For AES, this is always 16

// Encryption key for this algorithm must be 256 bits (32 characters)
const generateEncryptionKey = (secret: string) =>
  crypto.createHash('md5').update(secret).digest('hex')

function encryptUserToken({
  username,
  secret,
}: {
  username: string
  secret: string
}): string {
  const encryptionKey = generateEncryptionKey(secret)
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv(
    ALGORITHM,
    Buffer.from(encryptionKey),
    iv,
  )
  let encrypted = cipher.update(Buffer.from(username, 'utf8'))

  encrypted = Buffer.concat([encrypted, cipher.final()])
  return Buffer.concat([iv, encrypted]).toString('base64')
}

function decryptUserToken({
  userToken,
  secret,
}: {
  userToken: string
  secret: string
}): string {
  const encryptionKey = generateEncryptionKey(secret)
  const data = Buffer.from(userToken, 'base64')
  const iv = Buffer.alloc(IV_LENGTH)
  const encryptedText = Buffer.alloc(data.length - iv.length)
  data.copy(iv, 0, 0, iv.length)
  data.copy(encryptedText, 0, iv.length)
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    Buffer.from(encryptionKey),
    iv,
  )
  let decrypted = decipher.update(encryptedText)

  decrypted = Buffer.concat([decrypted, decipher.final()])

  return decrypted.toString()
}

export { encryptUserToken, decryptUserToken }
