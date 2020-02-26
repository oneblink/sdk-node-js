// @flow
'use strict'

const apis = {
  ONEBLINK: 'https://auth-api.blinkm.io',
  CIVICPLUS: 'https://us-auth-api.blinkm.io'
}

module.exports = (
  tenant /* : string */ = 'ONEBLINK',
  apiOrigin /* : mixed */
) => {
  if (!!tenant && !Object.keys(apis).includes(tenant.toUpperCase())) {
    throw new TypeError(
      ` Must be passed a valid tenant. Valid options are ${Object.keys(
        apis
      ).toString()}`
    )
  }

  if (apiOrigin) return apiOrigin
  return apis[tenant.toUpperCase()]
}
