import { TenantConfiguration } from '../types'

export const ONEBLINK: TenantConfiguration = {
  awsRegion: 'ap-southeast-2',
  test: {
    jwtIssuer:
      'https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_AfFQWsYIH',
    apiOrigin: 'https://auth-api.test.blinkm.io',
  },
  prod: {
    jwtIssuer:
      'https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_7kAsz3n3x',
    apiOrigin: 'https://auth-api.blinkm.io',
  },
}

export const CIVICPLUS: TenantConfiguration = {
  awsRegion: 'us-east-2',
  test: {
    jwtIssuer:
      'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_rvIeXcSue',
    apiOrigin: 'https://auth-api.test.transform.civicplus.com',
  },
  prod: {
    jwtIssuer:
      'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_PmyuuhfWj',
    apiOrigin: 'https://auth-api.transform.civicplus.com',
  },
}
