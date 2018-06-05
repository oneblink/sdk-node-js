// @flow
'use strict'

const querystring = require('querystring')

function generateFormUrl (
  endpoint /* : string */,
  formId /* : number */,
  externalId /* : string */,
  token /* : string */
) {
  if (!formId) {
    throw new Error('no form id provided, please provide a form id to generate a url')
  }
  const searchParams = querystring.stringify({
    externalId,
    access_key: token
  })
  return `${endpoint}/${formId}?${searchParams}`
}

module.exports = generateFormUrl
