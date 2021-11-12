import * as OneBlinkSDK from '../src/oneblink'

describe('Organisations SDK Class', () => {
  const organisations = new OneBlinkSDK.Organisations({
    accessKey: '123',
    secretKey: 'abc',
  })

  describe('getOrganisation', () => {
    test('should reject with correct validation errors for "organisationId"', () => {
      // @ts-expect-error Testing validation
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
      return expect(organisations.uploadAsset(asset)).rejects.toThrow(
        'Must supply "assetFileName" as a string',
      )
    })
  })
})
