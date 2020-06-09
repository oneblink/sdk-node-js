// @flow
'use strict'

const JwksClient = require('jwks-rsa')

module.exports = function generateTenant(
  tenantConfiguration /* : TenantConfiguration */,
) /* : Tenant */ {
  const isTest = process.env.ONEBLINK_SDK_ENVIRONMENT === 'test'

  return {
    apiOrigin: isTest
      ? tenantConfiguration.test.apiOrigin
      : tenantConfiguration.prod.apiOrigin,
    jwksInstance: new JwksClient({
      cache: true,
      jwksUri: `${
        isTest
          ? tenantConfiguration.test.jwtIssuer
          : tenantConfiguration.prod.jwtIssuer
      }/.well-known/jwks.json`,
    }),
  }
}
