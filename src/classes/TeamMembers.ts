import { TeamMemberTypes } from '@oneblink/types'
import OneBlinkAPI from '../lib/one-blink-api'
import { ConstructorOptions } from '../lib/types'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default class TeamMembers extends OneBlinkAPI {
  constructor(options: ConstructorOptions) {
    options = options || {}
    super(options.accessKey, options.secretKey)
  }

  async getTeamMemberRole(
    email?: unknown,
  ): Promise<TeamMemberTypes.Role | null> {
    if (typeof email !== 'string') {
      return Promise.reject(new TypeError('Must supply "email" as a string'))
    }

    const { permissions } = await super.searchRequest('/permissions', {
      email,
    })
    if (
      !permissions[0] ||
      !permissions[0].links ||
      !permissions[0].links.role
    ) {
      return null
    }

    return permissions[0].links.role
  }
}
