import jwksClient from 'jwks-rsa'
import { Tenant, TenantConfiguration } from '../types'

export default function generateTenant(
  tenantConfiguration: TenantConfiguration,
): Tenant {
  const isTest = process.env.ONEBLINK_SDK_ENVIRONMENT === 'test'

  const jwtIssuer = isTest
    ? tenantConfiguration.test.jwtIssuer
    : tenantConfiguration.prod.jwtIssuer

  return {
    awsRegion: tenantConfiguration.awsRegion,
    pdfOrigin: isTest
      ? tenantConfiguration.test.pdfOrigin
      : tenantConfiguration.prod.pdfOrigin,
    apiOrigin: isTest
      ? tenantConfiguration.test.apiOrigin
      : tenantConfiguration.prod.apiOrigin,
    jwtIssuer,
    jwksInstance: jwksClient({
      cache: true,
      jwksUri: `${jwtIssuer}/.well-known/jwks.json`,
    }),
  }
}
