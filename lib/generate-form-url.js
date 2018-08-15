// @flow
'use strict'

const querystring = require('querystring')

function generateFormUrl (
  endpoint /* : string */,
  formId /* : number */,
  token /* : string */,
  externalId /* : mixed */,
  preFillFormDataId /* : ?string */
) {
  if (!formId) {
    throw new Error('no form id provided, please provide a form id to generate a url')
  }
  let searchParams = {
    access_key: token
  }
  if (externalId) {
    searchParams = Object.assign({}, searchParams, { externalId, preFillFormDataId })
  }
  const search = querystring.stringify(searchParams)
  return `${endpoint}/${formId}?${search}`
}

module.exports = generateFormUrl
