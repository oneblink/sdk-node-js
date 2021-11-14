import { OrganisationTypes } from '@oneblink/types'
import OneBlinkAPI from '../lib/one-blink-api'
import { ConstructorOptions, PreFillMeta } from '../types'
import uploadAsset from '../lib/upload-asset'

export default class Organisations extends OneBlinkAPI {
  /**
   * #### Example
   *
   * ```typescript
   * const OneBlink = require('@oneblink/sdk')
   *
   * const options = {
   *   accessKey: '123455678901ABCDEFGHIJKL',
   *   secretKey: '123455678901ABCDEFGHIJKL123455678901ABCDEFGHIJKL',
   * }
   * const organisations = new OneBlink.Organisations(options)
   * ```
   */
  constructor(options: ConstructorOptions) {
    options = options || {}
    super(options.accessKey, options.secretKey)
  }

  /**
   * #### Example
   *
   * ```javascript
   * const organisation = await organisations.getOrganisation()
   * // Use organisation here...
   * ```
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
   * #### Example
   *
   * ```javascript
   * const asset = {
   *   assetData: 'some kind of data',
   *   assetFileName: 'myfile.png',
   *   assetContentType: 'image/png',
   * }
   * const { location } = await organisations.uploadAsset(asset)
   * // Use location here...
   * ```
   *
   * @param asset The properties of the asset to upload
   */
  async uploadAsset(asset: {
    assetData: unknown
    assetFileName?: unknown
    assetContentType?: string
  }): Promise<{ location: string }> {
    if (typeof asset.assetFileName !== 'string') {
      throw new TypeError('Must supply "assetFileName" as a string')
    }
    if (asset.assetContentType && typeof asset.assetContentType !== 'string') {
      throw new TypeError('If supplied, "assetContentType" must be a string')
    }
    const { id: organisationId } = await this.getOrganisation()
    const credentials = await super.postRequest<
      {
        assetPath: string
        organisationId: string
      },
      PreFillMeta
    >('/asset-upload-credentials', {
      assetPath: `assets/${asset.assetFileName}`,
      organisationId,
    })

    const uploadDetails = await uploadAsset(
      credentials,
      asset.assetData,
      asset.assetContentType,
    )
    return { location: uploadDetails.Location }
  }
}
