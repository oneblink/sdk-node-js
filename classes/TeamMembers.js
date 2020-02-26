// @flow
'use strict'

const OneBlinkAPI = require('../lib/one-blink-api.js')
const getTenantUrl = require('../lib/tenant')
module.exports = class TeamMembers extends OneBlinkAPI {
  constructor(options /* : ConstructorOptions */) {
    options = options || {}
    super(
      getTenantUrl(options.tenantName, options.oneBlinkAPIOrigin),
      options.accessKey,
      options.secretKey
    )
  }

  async getTeamMemberRole(email /* : ?mixed */) /* : Promise<Role | null> */ {
    if (typeof email !== 'string') {
      return Promise.reject(new TypeError('Must supply "email" as a string'))
    }

    const { permissions } = await super.searchRequest('/permissions', {
      email
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
