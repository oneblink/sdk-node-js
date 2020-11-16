// @flow
'use strict'

describe('FormsApps SDK Class', () => {
  const OneBlinkSDK = require('../..')
  const formsAppsSDK = new OneBlinkSDK.FormsApps({
    accessKey: '123',
    secretKey: 'abc',
  })

  describe('setSendingAddress()', () => {
    test('should reject with correct validation errors for "formsAppId"', () => {
      return expect(formsAppsSDK.setSendingAddress()).rejects.toThrow(
        'Must supply "formsAppId" as a number',
      )
    })

    test('should reject with correct validation errors for "emailAddress"', () => {
      return expect(formsAppsSDK.setSendingAddress(1)).rejects.toThrow(
        'Must supply "emailAddress" as a string',
      )
    })

    test('should reject with correct validation errors for "emailName"', () => {
      return expect(
        formsAppsSDK.setSendingAddress(1, 'developers@oneblink.io'),
      ).rejects.toThrow('Must supply "emailName" as a string')
    })
  })
})
