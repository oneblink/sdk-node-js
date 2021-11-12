// @flow
'use strict'

describe('Region URL selecting', () => {
  beforeEach(() => {
    process.env.ONEBLINK_SDK_ENVIRONMENT = undefined
  })
  afterEach(() => {
    jest.resetModules()
  })
  test('should use the CIVICPLUS apiOrigin for the api', async () => {
    const { Forms } = await import('../src/civicplus')
    return expect(Forms.tenant.apiOrigin).toBe(
      'https://auth-api.transform.civicplus.com',
    )
  })

  test('should use the ONEBLINK apiOrigin for the api', async () => {
    const { Forms } = await import('../src/oneblink')
    return expect(Forms.tenant.apiOrigin).toBe('https://auth-api.blinkm.io')
  })

  test('should use the ONEBLINK test apiOrigin for the api', async () => {
    process.env.ONEBLINK_SDK_ENVIRONMENT = 'test'
    const { Forms } = await import('../src/oneblink')
    return expect(Forms.tenant.apiOrigin).toBe(
      'https://auth-api-test.blinkm.io',
    )
  })

  test('should use the CIVICPLUS test apiOrigin for the api', async () => {
    process.env.ONEBLINK_SDK_ENVIRONMENT = 'test'
    const { Forms } = await import('../src/civicplus')
    return expect(Forms.tenant.apiOrigin).toBe(
      'https://auth-api-test.transform.civicplus.com',
    )
  })
})
