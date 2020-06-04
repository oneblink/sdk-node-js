// @flow
'use strict'

describe('Region URL selecting', () => {
  beforeEach(() => {
    process.env.ONEBLINK_SDK_ENVIRONMENT = undefined
  })
  afterEach(() => {
    jest.resetModules()
  })
  const Forms = require('../../classes/Forms.js')
  test('should use the CIVICPLUS apiOrigin for the api', () => {
    const forms = new Forms({
      accessKey: '123',
      secretKey: 'abc',
      tenant: 'civicplus',
    })
    return expect(forms.oneBlinkAPI.defaults.baseURL).toBe(
      'https://auth-api.transform.civicplus.com',
    )
  })

  test('should use the ONEBLINK apiOrigin for the api', () => {
    const forms = new Forms({
      accessKey: '123',
      secretKey: 'abc',
      tenant: 'oneblink',
    })
    return expect(forms.oneBlinkAPI.defaults.baseURL).toBe(
      'https://auth-api.blinkm.io',
    )
  })

  test('should throw an error when trying to use a region that is not supported', () => {
    return expect(
      () =>
        new Forms({
          accessKey: '123',
          secretKey: 'abc',
          tenant: 'SomeOtherCompany',
        }),
    ).toThrow()
  })

  test('should use the ONEBLINK apiOrigin for the api by default', () => {
    const forms = new Forms({
      accessKey: '123',
      secretKey: 'abc',
    })
    return expect(forms.oneBlinkAPI.defaults.baseURL).toBe(
      'https://auth-api.blinkm.io',
    )
  })

  test('should use the ONEBLINK test apiOrigin for the api', () => {
    process.env.ONEBLINK_SDK_ENVIRONMENT = 'test'
    const FormsTest = require('../../classes/Forms')
    const forms = new FormsTest({
      accessKey: '123',
      secretKey: 'abc',
    })
    return expect(forms.oneBlinkAPI.defaults.baseURL).toBe(
      'https://auth-api-test.blinkm.io',
    )
  })
  test('should use the CIVICPLUS test apiOrigin for the api', () => {
    process.env.ONEBLINK_SDK_ENVIRONMENT = 'test'
    const FormsTest = require('../../classes/Forms')
    const forms = new FormsTest({
      accessKey: '123',
      secretKey: 'abc',
      tenant: 'civicplus',
    })
    return expect(forms.oneBlinkAPI.defaults.baseURL).toBe(
      'https://auth-api-test.transform.civicplus.com',
    )
  })
})
