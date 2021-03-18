export const ONEBLINK = {
  test: {
    jwtIssuer:
      'https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_E03xBaafT',
    apiOrigin: 'https://auth-api-test.blinkm.io',
  },
  prod: {
    jwtIssuer:
      'https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_o1t3ntGWx',
    apiOrigin: 'https://auth-api.blinkm.io',
  },
}

export const CIVICPLUS = {
  test: {
    jwtIssuer:
      'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_e2gd0LSVp',
    apiOrigin: 'https://auth-api-test.transform.civicplus.com',
  },
  prod: {
    jwtIssuer:
      'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_A92OPccYd',
    apiOrigin: 'https://auth-api.transform.civicplus.com',
  },
}
