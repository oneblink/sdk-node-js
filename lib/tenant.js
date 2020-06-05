// @flow
'use strict'
const JwksClient = require('jwks-rsa')
const isTest = process.env.ONEBLINK_SDK_ENVIRONMENT === 'test'
const ONEBLINK = {
  test: {
    iss:
      'https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_E03xBaafT',
    apiOrigin: 'https://auth-api-test.blinkm.io',
  },
  prod: {
    iss:
      'https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_o1t3ntGWx',
    apiOrigin: 'https://auth-api.blinkm.io',
  },
}
const CIVICPLUS = {
  test: {
    iss: 'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_e2gd0LSVp',
    apiOrigin: 'https://auth-api-test.transform.civicplus.com',
  },
  prod: {
    iss: 'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_A92OPccYd',
    apiOrigin: 'https://auth-api.transform.civicplus.com',
  },
}
const tenants = {
  ONEBLINK: {
    apiOrigin: isTest ? ONEBLINK.test.apiOrigin : ONEBLINK.prod.apiOrigin,
    jwksInstance: new JwksClient({
      cache: true,
      jwksUri: `${
        isTest ? ONEBLINK.test.iss : ONEBLINK.prod.iss
      }/.well-known/jwks.json`,
    }),
  },
  CIVICPLUS: {
    apiOrigin: isTest ? CIVICPLUS.test.apiOrigin : CIVICPLUS.prod.apiOrigin,
    jwksInstance: new JwksClient({
      cache: true,
      jwksUri: `${
        isTest ? CIVICPLUS.test.iss : CIVICPLUS.prod.iss
      }/.well-known/jwks.json`,
    }),
  },
}

module.exports = (tenant /* : string */ = 'ONEBLINK') => {
  if (!!tenant && !Object.keys(tenants).includes(tenant.toUpperCase())) {
    throw new TypeError(
      ` Must be passed a valid tenant. Valid options are ${Object.keys(
        tenants,
      ).toString()}`,
    )
  }
  return tenants[tenant.toUpperCase()]
}
