// @flow
'use strict'

const apis = {
  AU: 'https://auth-api.blinkm.io',
  US: 'https://us-auth-api.blinkm.io'
}

class RegionError extends Error {
  constructor(message) {
    super(message)
    this.name = 'RegionError'
  }
}

module.exports = (
  regionCode /* : ?string */ = 'AU',
  apiOrigin /* : mixed */
) => {
  if (!!regionCode && !Object.keys(apis).includes(regionCode)) {
    throw new RegionError(
      `Region must be passed a valid region code. Valid options are ${Object.keys(
        apis
      ).toString()}`
    )
  }

  if (apiOrigin) return apiOrigin
  // HAD TO ADD THIS CHECK BECAUSE FLOW COMPLAINED EVEN THOUGH REGION CODE HAS A DEFAULT VALUE FOR WHEN ITS NULL OT UNDEFINED
  if (regionCode) return apis[regionCode]
  return apis.AU
}
