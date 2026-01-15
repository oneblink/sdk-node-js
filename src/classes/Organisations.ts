import { OrganisationTypes } from '@oneblink/types'
import OneBlinkAPI from '../lib/one-blink-api.js'
import { ConstructorOptions } from '../types.js'
import { Readable } from 'stream'

export default class Organisations extends OneBlinkAPI {
  /**
   * @example
   *   const OneBlink = require('@oneblink/sdk')
   *   const options = {
   *     accessKey: '123455678901ABCDEFGHIJKL',
   *     secretKey: '123455678901ABCDEFGHIJKL123455678901ABCDEFGHIJKL',
   *   }
   *   const organisations = new OneBlink.Organisations(options)
   */
  constructor(options: ConstructorOptions) {
    options = options || {}
    super(options.accessKey, options.secretKey)
  }

  /**
   * @example
   *   const organisation = await organisations.getOrganisation()
   *   // Use organisation here...
   *
   * @returns
   */
  async getOrganisation(): Promise<OrganisationTypes.Organisation> {
    const searchResponse = await super.getRequest<{
      organisations: OrganisationTypes.Organisation[]
    }>('/organisations')
    if (!searchResponse.organisations || !searchResponse.organisations[0]) {
      throw new TypeError('You do not have access to any organisations')
    }

    return searchResponse.organisations[0]
  }

  /**
   * @example
   *   const asset = {
   *     assetData: 'some kind of data',
   *     assetFileName: 'myfile.png',
   *     assetContentType: 'image/png',
   *   }
   *   const { location } = await organisations.uploadAsset(asset)
   *   // Use location here...
   *
   * @param asset The properties of the asset to upload
   * @returns
   */
  async uploadAsset(asset: {
    assetData: unknown
    assetFileName?: unknown
    assetContentType?: string
  }): Promise<{ location: string }> {
    const { assetData, assetFileName, assetContentType } = asset
    if (typeof assetFileName !== 'string') {
      throw new TypeError('Must supply "assetFileName" as a string')
    }
    if (assetContentType && typeof assetContentType !== 'string') {
      throw new TypeError('If supplied, "assetContentType" must be a string')
    }

    if (
      typeof assetData !== 'string' &&
      !(
        assetData instanceof Buffer ||
        assetData instanceof Uint8Array ||
        assetData instanceof Readable
      )
    ) {
      throw new TypeError(
        '"assetData" must be either a string, Uint8Array, Buffer or Readable',
      )
    }
    const { id: organisationId } = await this.getOrganisation()

    const { url } = await this.oneBlinkUploader.uploadAsset({
      data: assetData,
      // S3 defaults unknown file types to the following, do the same here
      contentType: assetContentType ?? 'application/octet-stream',
      fileName: assetFileName,
      organisationId,
    })
    return { location: url }
  }
}
