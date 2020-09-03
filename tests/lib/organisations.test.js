// @flow
'use strict'

describe('Organisations SDK Class', () => {
  const { Organisations } = require('../..')
  const organisations = new Organisations({
    accessKey: '123',
    secretKey: 'abc',
  })

  describe('getOrganisation', () => {
    test('should reject with correct validation errors for "organisationId"', () => {
      return expect(organisations.getOrganisation()).rejects.toThrow(
        'Must supply "organisationId" as a string',
      )
    })
  })
  describe('uploadAsset', () => {
    test('should reject when assetFileName is not valid', () => {
      // $FlowFixMe
      return expect(organisations.uploadAsset('', 1, '')).rejects.toThrow(
        'Must supply "assetFileName" as a string',
      )
    })
  })
})
