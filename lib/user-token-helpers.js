// @flow
'use strict'

const crypto = require('crypto')

const ALGORITHM = 'aes-256-cbc'
const IV_LENGTH = 16 // For AES, this is always 16

// Encryption key for this algorithm must be 256 bits (32 characters)
const generateEncryptionKey = (secret) =>
  crypto.createHash('md5').update(secret).digest('hex')

function encryptUserToken(
  { username, secret } /* : { username: string, secret: string } */,
) /* : string */ {
  const encryptionKey = generateEncryptionKey(secret)
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv(
    ALGORITHM,
    Buffer.from(encryptionKey),
    iv,
  )
  let encrypted = cipher.update(username, 'utf8')

  encrypted = Buffer.concat([encrypted, cipher.final()])

  return iv.toString('hex') + ':' + encrypted.toString('hex')
}

function decryptUserToken(
  { userToken, secret } /* : { userToken: string, secret: string } */,
) {
  const encryptionKey = generateEncryptionKey(secret)
  const textParts = userToken.split(':')
  const iv = Buffer.from(textParts.shift(), 'hex')
  const encryptedText = Buffer.from(textParts.join(':'), 'hex')
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    Buffer.from(encryptionKey),
    iv,
  )
  let decrypted = decipher.update(encryptedText)

  decrypted = Buffer.concat([decrypted, decipher.final()])

  return decrypted.toString()
}

module.exports = {
  encryptUserToken,
  decryptUserToken,
}
