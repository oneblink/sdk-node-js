// @flow
'use strict'

describe('Organisations SDK Class', () => {
  const Organisations = require('../../classes/Organisations.js')
  const organisations = new Organisations({
    accessKey: '123',
    secretKey: 'abc',
  })

  test('should reject with correct validation errors for "organisationId"', () => {
    return expect(organisations.getOrganisation()).rejects.toThrow(
      'Must supply "organisationId" as a string',
    )
  })
})
