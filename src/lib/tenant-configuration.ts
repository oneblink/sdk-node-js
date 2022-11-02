import { TenantConfiguration } from '../types'

export const ONEBLINK: TenantConfiguration = {
  awsRegion: 'ap-southeast-2',
  test: {
    apiOrigin: 'https://auth-api.test.blinkm.io',
  },
  prod: {
    apiOrigin: 'https://auth-api.blinkm.io',
  },
}

export const CIVICPLUS: TenantConfiguration = {
  awsRegion: 'us-east-2',
  test: {
    apiOrigin: 'https://auth-api.test.transform.civicplus.com',
  },
  prod: {
    apiOrigin: 'https://auth-api.transform.civicplus.com',
  },
}
