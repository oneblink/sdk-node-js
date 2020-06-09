// @flow
'use strict'

describe('Keys SDK Class', () => {
  const { Keys } = require('../..')
  const keys = new Keys({
    accessKey: '123',
    secretKey: 'abc',
  })

  test('should reject with correct validation errors for "keyId"', () => {
    return expect(keys.getKey()).rejects.toThrow(
      'Must supply "keyId" as a string',
    )
  })
})
