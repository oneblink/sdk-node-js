
// @flow
'use strict'

describe('Jobs SDK Class', () => {
  const Jobs = require('../../classes/Jobs.js')
  const keys = new Jobs({
    accessKey: '123',
    secretKey: 'abc'
  })

  describe('deleteJob()', () => {
    test('should reject with correct validation errors for "jobId"', () => {
      return expect(keys.deleteJob()).rejects.toThrow('Must supply "jobId" as a string')
    })
  })
})
