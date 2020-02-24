// @flow
'use strict'

describe('Region URL selecting', () => {
  describe('Use correct apiOrigin', () => {
    const Forms = require('../../classes/Forms.js')

    test('should use the US apiOrigin for the api', () => {
      const forms = new Forms({
        accessKey: '123',
        secretKey: 'abc',
        regionCode: 'US'
      })
      return expect(forms.oneBlinkAPI.defaults.baseURL).toBe(
        'https://us-auth-api.blinkm.io'
      )
    })

    test('should use the AU apiOrigin for the api', () => {
      const forms = new Forms({
        accessKey: '123',
        secretKey: 'abc',
        regionCode: 'AU'
      })
      return expect(forms.oneBlinkAPI.defaults.baseURL).toBe(
        'https://auth-api.blinkm.io'
      )
    })

    test('should throw an error when trying to use a region that is not supported', () => {
      return expect(
        () =>
          new Forms({
            accessKey: '123',
            secretKey: 'abc',
            regionCode: 'CA'
          })
      ).toThrow()
    })

    test('should use the AU apiOrigin for the api by default', () => {
      const forms = new Forms({
        accessKey: '123',
        secretKey: 'abc'
      })
      return expect(forms.oneBlinkAPI.defaults.baseURL).toBe(
        'https://auth-api.blinkm.io'
      )
    })

    test('should use the provided custom apiOrigin for the api', () => {
      const forms = new Forms({
        accessKey: '123',
        secretKey: 'abc',
        oneBlinkAPIOrigin: 'https://my-custom-url.blinkm.io'
      })
      return expect(forms.oneBlinkAPI.defaults.baseURL).toBe(
        'https://my-custom-url.blinkm.io'
      )
    })
  })
})
