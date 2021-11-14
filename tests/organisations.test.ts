import * as OneBlinkSDK from '../src/oneblink'

describe('Organisations SDK Class', () => {
  const organisations = new OneBlinkSDK.Organisations({
    accessKey: '123',
    secretKey: 'abc',
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
