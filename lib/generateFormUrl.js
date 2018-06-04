// @flow
'use strict'

function generateUrl (
  formId /* : string */,
  externalId /* : string */,
  token /* : string */
) {
  if (!formId) {
    throw new Error('no form id provided, please provide a form id to generate a url')
  }
  if (externalId) {
    this.url = `https://forms-test.oneblink.io/${formId}?externalId=${externalId}&access_key=${token}`
  } else {
    this.url = `https://forms-test.oneblink.io/${formId}?access_key=${token}`
  }
  return this.url
}

module.exports = {
  generateUrl
}
