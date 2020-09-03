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
      const asset = {
        assetData: '',
      }
      // $FlowFixMe
      return expect(organisations.uploadAsset(asset)).rejects.toThrow(
        'Must supply "assetFileName" as a string',
      )
    })
  })
})
