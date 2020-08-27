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
    test('should reject when assetData is not valid', () => {
      // $FlowFixMe
      return expect(organisations.uploadAsset(1, '', '')).rejects.toThrow(
        'Must supply "assetData" as a string',
      )
    })
    test('should reject when assetFileName is not valid', () => {
      // $FlowFixMe
      return expect(organisations.uploadAsset('', 1, '')).rejects.toThrow(
        'Must supply "assetFileName" as a string',
      )
    })
    test('should reject when organisationId is not valid', () => {
      return expect(organisations.uploadAsset('', '')).rejects.toThrow(
        'Must supply "organisationId" as a string',
      )
    })
  })
})
