import { OrganisationTypes } from '@oneblink/types'
import OneBlinkAPI from '../lib/one-blink-api'
import { BaseSearchResult, ConstructorOptions, PreFillMeta } from '../types'
import uploadAsset from '../lib/upload-asset'

type OrganisationsSearchResult = {
  organisations: OrganisationTypes.Organisation[]
} & BaseSearchResult

export default class Organisations extends OneBlinkAPI {
  constructor(options: ConstructorOptions) {
    options = options || {}
    super(options.accessKey, options.secretKey)
  }

  async getOrganisation(
    organisationId?: unknown,
  ): Promise<OrganisationTypes.Organisation> {
    if (typeof organisationId !== 'string') {
      throw new TypeError('Must supply "organisationId" as a string')
    }

    return super.getRequest(`/organisations/${organisationId}`)
  }

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
    const searchResponse = await super.getRequest<OrganisationsSearchResult>(
      '/organisations',
    )
    if (!searchResponse.organisations || !searchResponse.organisations[0]) {
      throw new TypeError('You do not have access to any organisations')
    }
    const organisationId = searchResponse.organisations[0].id
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
