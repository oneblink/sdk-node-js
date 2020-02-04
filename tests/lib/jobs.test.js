// @flow
'use strict'

const constructorOptions = {
  accessKey: '123',
  secretKey: 'abc'
}

describe('Jobs SDK Class', () => {
  describe('createJob()', () => {
    describe('validation', () => {
      const Jobs = require('../../classes/Jobs.js')
      const jobs = new Jobs(constructorOptions)

      test('should reject with correct validation errors for "options"', () => {
        return expect(jobs.createJob()).rejects.toThrow('"options" is required')
      })

      describe('should reject with correct validation errors for "username"', () => {
        test('required', () => {
          return expect(jobs.createJob({})).rejects.toThrow(
            '"username" is required'
          )
        })
        test('string', () => {
          return expect(
            jobs.createJob({
              username: 123
            })
          ).rejects.toThrow('"username" must be a string')
        })
      })

      describe('should reject with correct validation errors for "formId"', () => {
        test('required', () => {
          return expect(
            jobs.createJob({
              username: 'username'
            })
          ).rejects.toThrow('"formId" is required')
        })
        test('string', () => {
          return expect(
            jobs.createJob({
              username: 'username',
              formId: 'abc'
            })
          ).rejects.toThrow('"formId" must be a number')
        })
      })

      describe('should reject with correct validation errors for "externalId"', () => {
        test('string', () => {
          return expect(
            jobs.createJob({
              username: 'username',
              formId: 1,
              externalId: 123
            })
          ).rejects.toThrow('"externalId" must be a string')
        })
      })

      describe('should reject with correct validation errors for "priority"', () => {
        test('string', () => {
          return expect(
            jobs.createJob({
              username: 'username',
              formId: 1,
              details: {
                title: 'job title',
                priority: 'one'
              }
            })
          ).rejects.toThrow('"priority" must be a number')
        })
      })
    })

    describe('API Calls', () => {
      const reset = () => {
        jest.resetModules()
        jest.clearAllMocks()
      }
      beforeEach(reset)
      afterAll(reset)

      test('should not call pre-fill data endpoints', async () => {
        const mockPostRequest = jest
          .fn()
          .mockImplementation(() => Promise.resolve({}))
        jest.mock(
          '../../lib/one-blink-api.js',
          () =>
            class {
              postRequest() {
                return mockPostRequest()
              }
            }
        )

        const Jobs = require('../../classes/Jobs.js')
        const jobs = new Jobs(constructorOptions)
        await jobs.createJob({
          username: 'username',
          formId: 1,
          details: {
            title: 'A title'
          }
        })

        expect(mockPostRequest).toBeCalledTimes(1)
      })

      test('should call pre-fill data endpoints', async () => {
        const mockPostRequest = jest
          .fn()
          .mockImplementation(() => Promise.resolve({}))
        jest.mock(
          '../../lib/one-blink-api.js',
          () =>
            class {
              postRequest() {
                return mockPostRequest()
              }
            }
        )
        const mockSetPreFillData = jest
          .fn()
          .mockImplementation(() => Promise.resolve())
        jest.mock('../../lib/pre-fill-data.js', () => mockSetPreFillData)

        const Jobs = require('../../classes/Jobs.js')
        const jobs = new Jobs(constructorOptions)
        const options = {
          username: 'username',
          formId: 1,
          details: {
            title: 'A title'
          }
        }
        const preFillData = {
          text_element: 'abc',
          number_element: 123
        }
        await jobs.createJob(options, preFillData)

        expect(mockPostRequest).toBeCalledTimes(2)
        expect(mockSetPreFillData).toBeCalledTimes(1)
      })
    })
  })

  describe('deleteJob()', () => {
    const Jobs = require('../../classes/Jobs.js')
    const jobs = new Jobs(constructorOptions)

    test('should reject with correct validation errors for "jobId"', () => {
      return expect(jobs.deleteJob()).rejects.toThrow(
        'Must supply "jobId" as a string'
      )
    })
  })

  describe('search()', () => {
    const reset = () => {
      jest.resetModules()
      jest.clearAllMocks()
    }
    beforeEach(reset)
    afterAll(reset)
    const Jobs = require('../../classes/Jobs.js')
    const jobs = new Jobs(constructorOptions)
    test('should reject form id', () => {
      return expect(jobs.searchJobs({ formId: 'ten' })).rejects.toThrow(
        'formId must be provided as a number or not at all'
      )
    })

    test('should reject externalId', () => {
      return expect(jobs.searchJobs({ externalId: 12345 })).rejects.toThrow(
        'externalId must be provided as a string or not at all'
      )
    })

    test('should reject username', () => {
      return expect(jobs.searchJobs({ username: 12345 })).rejects.toThrow(
        'username must be provided as a string or not at all'
      )
    })

    test('should reject isSubmitted', () => {
      return expect(jobs.searchJobs({ isSubmitted: 'maybe?' })).rejects.toThrow(
        'isSubmitted must be provided as a boolean or not at all'
      )
    })

    test('should reject limit', () => {
      return expect(jobs.searchJobs({ limit: 'infinite' })).rejects.toThrow(
        'limit must be provided as a number or not at all'
      )
    })

    test('should reject offset', () => {
      return expect(
        jobs.searchJobs({ offset: 'a little bit' })
      ).rejects.toThrow('offset must be provided as a number or not at all')
    })

    test('should make search call successfully', async () => {
      const mockSearchRequest = jest
        .fn()
        .mockImplementation(() => Promise.resolve({}))
      jest.mock(
        '../../lib/one-blink-api.js',
        () =>
          class {
            searchRequest() {
              return mockSearchRequest()
            }
          }
      )

      const Jobs = require('../../classes/Jobs.js')
      const jobs = new Jobs(constructorOptions)

      await jobs.searchJobs({
        externalId: 'abc',
        formId: 1,
        username: 'user@domain.io',
        isSubmitted: false,
        offset: 1,
        limit: 100
      })

      return expect(mockSearchRequest).toHaveBeenCalledTimes(1)
    })
  })
})
