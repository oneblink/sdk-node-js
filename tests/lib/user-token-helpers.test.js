// @flow
'use strict'

describe('User Token Helpers', () => {
  const {
    encryptUserToken,
    decryptUserToken,
  } = require('../../lib/user-token-helpers')

  test('should encrypt a secret with less then 32 characters', () => {
    const secret = 'abc123'
    const username = 'username'

    const userToken = encryptUserToken({
      secret,
      username,
    })
    expect(typeof userToken).toBe('string')

    const decrypted = decryptUserToken({
      secret,
      userToken,
    })
    expect(decrypted).toBe(username)
  })

  test('should encrypt a secret with exactly 32 characters', () => {
    const secret = 'abcdefghijklmnopqrstuvqxyz123456'
    const username = 'username'

    const userToken = encryptUserToken({
      secret,
      username,
    })
    expect(typeof userToken).toBe('string')

    const decrypted = decryptUserToken({
      secret,
      userToken,
    })
    expect(decrypted).toBe(username)
  })

  test('should encrypt a secret with exactly 32 characters', () => {
    const secret =
      'abcdefghijklmnopqrstuvqxyz123456abcdefghijklmnopqrstuvqxyz123456'
    const username = 'username'

    const userToken = encryptUserToken({
      secret,
      username,
    })
    expect(typeof userToken).toBe('string')

    const decrypted = decryptUserToken({
      secret,
      userToken,
    })
    expect(decrypted).toBe(username)
  })
})
