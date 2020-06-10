// @flow
'use strict'

const JwksClient = require('jwks-rsa')

module.exports = function generateTenant(
  tenantConfiguration /* : TenantConfiguration */,
) /* : Tenant */ {
  const isTest = process.env.ONEBLINK_SDK_ENVIRONMENT === 'test'

  const jwtIssuer = isTest
    ? tenantConfiguration.test.jwtIssuer
    : tenantConfiguration.prod.jwtIssuer

  return {
    apiOrigin: isTest
      ? tenantConfiguration.test.apiOrigin
      : tenantConfiguration.prod.apiOrigin,
    jwtIssuer,
    jwksInstance: new JwksClient({
      cache: true,
      jwksUri: `${jwtIssuer}/.well-known/jwks.json`,
    }),
  }
}
