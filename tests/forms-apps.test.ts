import * as OneBlinkSDK from '../src/oneblink'

describe('FormsApps SDK Class', () => {
  const formsAppsSDK = new OneBlinkSDK.FormsApps({
    accessKey: '123',
    secretKey: 'abc',
  })

  describe('setSendingAddress()', () => {
    test('should reject with correct validation errors for "formsAppId"', () => {
      // @ts-expect-error Expecting throw
      return expect(formsAppsSDK.setSendingAddress()).rejects.toThrow(
        'Must supply "formsAppId" as a number',
      )
    })

    test('should reject with correct validation errors for "sendingAddressConfig"', () => {
      // @ts-expect-error Expecting throw
      return expect(formsAppsSDK.setSendingAddress(1)).rejects.toThrow(
        'Must supply an object containing "emailAddress" or "emailName" properties',
      )
    })

    test('should reject with correct validation errors for "emailAddress"', () => {
      return expect(formsAppsSDK.setSendingAddress(1, {})).rejects.toThrow(
        'Must supply at least one of "emailAddress" or "emailName"',
      )
    })

    test('should reject with correct validation errors for "emailName"', () => {
      return expect(
        formsAppsSDK.setSendingAddress(1, {
          emailAddress: 'developers@oneblink.io',
          // @ts-expect-error Expecting throw
          emailName: 123,
        }),
      ).rejects.toThrow('Must supply "emailName" as a string or not at all')
    })
  })

  describe('deleteSendingAddress()', () => {
    test('should reject with correct validation errors for "formsAppId"', () => {
      // @ts-expect-error Expecting throw
      return expect(formsAppsSDK.deleteSendingAddress()).rejects.toThrow(
        'Must supply "formsAppId" as a number',
      )
    })
  })
})
