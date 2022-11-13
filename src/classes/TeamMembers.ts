import { TeamMemberTypes } from '@oneblink/types'
import OneBlinkAPI from '../lib/one-blink-api'
import { ConstructorOptions } from '../types'

export default class TeamMembers extends OneBlinkAPI {
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
   * const teamMembersSDK = new OneBlink.TeamMembers(options)
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
   * const email = 'email@domain.io'
   * teamMembersSDK.getTeamMemberRole(email).then((role) => {
   *   if (role !== null) {
   *     // Use role here...
   *   }
   * })
   * ```
   *
   * @param email The email address the team member uses to login
   */
  async getTeamMemberRole(email: string): Promise<TeamMemberTypes.Role | null> {
    if (typeof email !== 'string') {
      return Promise.reject(new TypeError('Must supply "email" as a string'))
    }

    const { permissions } = await super.searchRequest<{
      permissions: TeamMemberTypes.Permission[]
    }>('/permissions', {
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
