// @flow
'use strict'

const apis = {
  AU: 'https://auth-api.blinkm.io',
  US: 'https://us-auth-api.blinkm.io'
}

module.exports = (
  regionCode /* : string */ = 'AU',
  apiOrigin /* : mixed */
) => {
  if (!!regionCode && !Object.keys(apis).includes(regionCode)) {
    throw new TypeError(
      `Region must be passed a valid region code. Valid options are ${Object.keys(
        apis
      ).toString()}`
    )
  }

  if (apiOrigin) return apiOrigin
  return apis[regionCode]
}
