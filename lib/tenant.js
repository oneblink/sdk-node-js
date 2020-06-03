// @flow
'use strict'

const tenants = {
  ONEBLINK: {
    url: 'https://auth-api.blinkm.io',
    iss:
      'https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_o1t3ntGWx',
  },
  CIVICPLUS: {
    url: 'https://auth-api.transform.civicplus.com',
    iss: 'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_A92OPccYd',
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
