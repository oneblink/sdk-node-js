// @flow
'use strict'

const generateTenant = require('../lib/generate-tenant')

module.exports = (tenantConfiguration /* : TenantConfiguration */) => {
  const tenant = generateTenant(tenantConfiguration)

  const Forms = require('./Forms.js')(tenant)
  const FormsApps = require('./FormsApps.js')(tenant)
  const Jobs = require('./Jobs.js')(tenant)
  const Keys = require('./Keys.js')(tenant)
  const Organisations = require('./Organisations.js')(tenant)
  const TeamMembers = require('./TeamMembers.js')(tenant)

  return {
    Forms,
    FormsApps,
    Jobs,
    Keys,
    Organisations,
    TeamMembers,
  }
}
