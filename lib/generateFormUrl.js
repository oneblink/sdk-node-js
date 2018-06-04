'use strict'

// @flow

function generateUrl (formId, externalId) {
  if (!formId) {
    throw new Error('no form id provided, please provide a form id to generate a url')
  }
  if (externalId) {
    this.url = `https://forms-test.oneblink.io/${formId}?externalId=${externalId}`
  } else {
    this.url = `https://forms-test.oneblink.io/${formId}`
  }
  return this.url
}

module.exports = {
  generateUrl
}
