// @flow
'use strict'

const querystring = require('querystring')
const axios = require('axios')

function generateFormsList (
  organisationId /* : string */,
  isPublished /* : boolean */,
  token /* : string */,
  apiOrigin /* : string */
) {
  if (!organisationId) {
    throw new Error('no organisation id provided, please provide a form id to generate a url')
  }

  let searchParams

  searchParams = Object.assign({}, searchParams, { organisationId, isPublished })

  const search = querystring.stringify(searchParams)

  let api = axios.create({
    baseURL: `${apiOrigin}`,
    headers: {'Authorization': `Bearer ${token}`}
  })

  return api.get(`/forms?${search}`)
    .then(function (response) {
      return response.data.forms
    })
}

module.exports = generateFormsList
