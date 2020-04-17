// @flow
'use strict'

describe('TeamMembers SDK Class', () => {
  const OneBlinkSDK = require('../../index.js')
  const teamMembersSDK = new OneBlinkSDK.TeamMembers({
    accessKey: '123',
    secretKey: 'abc',
  })

  test('should reject with correct validation errors for "keyId"', () => {
    return expect(teamMembersSDK.getTeamMemberRole()).rejects.toThrow(
      'Must supply "email" as a string',
    )
  })
})
