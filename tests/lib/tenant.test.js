// @flow
'use strict'

describe('Region URL selecting', () => {
  beforeEach(() => {
    process.env.ONEBLINK_SDK_ENVIRONMENT = undefined
  })
  afterEach(() => {
    jest.resetModules()
  })
  test('should use the CIVICPLUS apiOrigin for the api', () => {
    const { Forms } = require('../../tenants/civicplus')
    const forms = new Forms({
      accessKey: '123',
      secretKey: 'abc',
    })
    return expect(forms.tenant.apiOrigin).toBe(
      'https://auth-api.transform.civicplus.com',
    )
  })

  test('should use the ONEBLINK apiOrigin for the api', () => {
    const { Forms } = require('../../tenants/oneblink')
    const forms = new Forms({
      accessKey: '123',
      secretKey: 'abc',
    })
    return expect(forms.tenant.apiOrigin).toBe('https://auth-api.blinkm.io')
  })

  test('should use the ONEBLINK apiOrigin for the api by default', () => {
    const { Forms } = require('../..')
    const forms = new Forms({
      accessKey: '123',
      secretKey: 'abc',
    })
    return expect(forms.tenant.apiOrigin).toBe('https://auth-api.blinkm.io')
  })

  test('should use the ONEBLINK test apiOrigin for the api', () => {
    process.env.ONEBLINK_SDK_ENVIRONMENT = 'test'
    const { Forms } = require('../../tenants/oneblink')
    const forms = new Forms({
      accessKey: '123',
      secretKey: 'abc',
    })
    return expect(forms.tenant.apiOrigin).toBe(
      'https://auth-api-test.blinkm.io',
    )
  })

  test('should use the CIVICPLUS test apiOrigin for the api', () => {
    process.env.ONEBLINK_SDK_ENVIRONMENT = 'test'
    const { Forms } = require('../../tenants/civicplus')
    const forms = new Forms({
      accessKey: '123',
      secretKey: 'abc',
    })
    return expect(forms.tenant.apiOrigin).toBe(
      'https://auth-api-test.transform.civicplus.com',
    )
  })
})
