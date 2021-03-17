import * as OneBlinkSDK from '../src/oneblink'

describe('TeamMembers SDK Class', () => {
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
