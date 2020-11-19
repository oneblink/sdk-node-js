// @flow
'use strict'

const querystring = require('querystring')

function generateFormUrl(
  {
    formId,
    token,
    externalId,
    preFillFormDataId,
    endpoint,
    userToken,
  } /* : {
  endpoint: string,
  formId: number,
  token: string,
  externalId: mixed,
  preFillFormDataId: ?string,
  userToken: ?string,
} */,
) {
  if (!formId) {
    throw new Error(
      'no form id provided, please provide a form id to generate a url',
    )
  }
  let searchParams = {
    access_key: token,
  }
  if (externalId) {
    searchParams = Object.assign({}, searchParams, { externalId })
  }
  if (preFillFormDataId) {
    searchParams = Object.assign({}, searchParams, { preFillFormDataId })
  }
  if (userToken) {
    searchParams = Object.assign({}, searchParams, { userToken })
  }
  const search = querystring.stringify(searchParams)

  return `${endpoint}/${formId}?${search}`
}

module.exports = generateFormUrl
