import * as OneBlinkSDK from '../src/oneblink'

describe('Keys SDK Class', () => {
  const keys = new OneBlinkSDK.Keys({
    accessKey: '123',
    secretKey: 'abc',
  })

  test('should reject with correct validation errors for "keyId"', () => {
    // @ts-expect-error Counting on error being thrown
    return expect(keys.getKey()).rejects.toThrow(
      'Must supply "keyId" as a string',
    )
  })
})
