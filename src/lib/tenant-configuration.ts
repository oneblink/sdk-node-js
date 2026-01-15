import { TenantConfiguration } from '../types.js'

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

export const ONEBLINK_US: TenantConfiguration = {
  awsRegion: 'us-east-1',
  test: {
    jwtIssuer:
      'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_x2AYHCleu',
    apiOrigin: 'https://auth-api.test.us.oneblink.io',
  },
  prod: {
    jwtIssuer:
      'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_ZzZdgJR4F',
    apiOrigin: 'https://auth-api.us.oneblink.io',
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
