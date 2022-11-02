import { Tenant, TenantConfiguration } from '../types'

export default function generateTenant(
  tenantConfiguration: TenantConfiguration,
): Tenant {
  const isTest = process.env.ONEBLINK_SDK_ENVIRONMENT === 'test'

  return {
    awsRegion: tenantConfiguration.awsRegion,
    apiOrigin: isTest
      ? tenantConfiguration.test.apiOrigin
      : tenantConfiguration.prod.apiOrigin,
  }
}
