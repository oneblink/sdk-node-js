const constructorOptions = {
  accessKey: '123',
  secretKey: 'abc',
}

describe('Jobs SDK Class', () => {
  const getJobsSdk = async () => {
    const OneBlinkSDK = await import('../src/oneblink')
    return new OneBlinkSDK.Jobs(constructorOptions)
  }
  describe('createJob()', () => {
    describe('validation', () => {
      test('should reject with correct validation errors for "options"', async () => {
        const jobs = await getJobsSdk()
        return expect(jobs.createJob()).rejects.toThrow('"options" is required')
      })

      describe('should reject with correct validation errors for "username"', () => {
        test('required', async () => {
          const jobs = await getJobsSdk()
          return expect(jobs.createJob({})).rejects.toThrow(
            '"username" is required',
          )
        })
        test('string', async () => {
          const jobs = await getJobsSdk()
          return expect(
            jobs.createJob({
              username: 123,
            }),
          ).rejects.toThrow('"username" must be a string')
        })
      })

      describe('should reject with correct validation errors for "formId"', () => {
        test('required', async () => {
          const jobs = await getJobsSdk()
          return expect(
            jobs.createJob({
              username: 'username',
            }),
          ).rejects.toThrow('"formId" is required')
        })
        test('string', async () => {
          const jobs = await getJobsSdk()
          return expect(
            jobs.createJob({
              username: 'username',
              formId: 'abc',
            }),
          ).rejects.toThrow('"formId" must be a number')
        })
      })

      describe('should reject with correct validation errors for "externalId"', () => {
        test('string', async () => {
          const jobs = await getJobsSdk()
          return expect(
            jobs.createJob({
              username: 'username',
              formId: 1,
              externalId: 123,
            }),
          ).rejects.toThrow('"externalId" must be a string')
        })
      })

      describe('should reject with correct validation errors for "priority"', () => {
        test('string', async () => {
          const jobs = await getJobsSdk()
          return expect(
            jobs.createJob({
              username: 'username',
              formId: 1,
              details: {
                title: 'job title',
                priority: 'one',
              },
            }),
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
          '../src/lib/one-blink-api',
          () =>
            class {
              postRequest() {
                return mockPostRequest()
              }
              postEmptyRequest() {
                return mockPostRequest()
              }
            },
        )

        const jobs = await getJobsSdk()
        await jobs.createJob({
          username: 'username',
          formId: 1,
          details: {
            title: 'A title',
          },
        })

        expect(mockPostRequest).toBeCalledTimes(1)
      })

      test('should call pre-fill data endpoints', async () => {
        const mockPostRequest = jest
          .fn()
          .mockImplementation(() => Promise.resolve({}))
        jest.mock(
          '../src/lib/one-blink-api',
          () =>
            class {
              postRequest() {
                return mockPostRequest()
              }
              postEmptyRequest() {
                return mockPostRequest()
              }
            },
        )
        const mockSetPreFillData = jest
          .fn()
          .mockImplementation(() => Promise.resolve())
        jest.mock('../src/lib/pre-fill-data', () => mockSetPreFillData)

        const jobs = await getJobsSdk()
        const options = {
          username: 'username',
          formId: 1,
          details: {
            title: 'A title',
          },
        }
        const preFillData = {
          text_element: 'abc',
          number_element: 123,
        }
        await jobs.createJob(options, preFillData)

        expect(mockPostRequest).toBeCalledTimes(2)
        expect(mockSetPreFillData).toBeCalledTimes(1)
      })
    })
  })

  describe('deleteJob()', () => {
    test('should reject with correct validation errors for "jobId"', async () => {
      const jobs = await getJobsSdk()
      return expect(jobs.deleteJob()).rejects.toThrow(
        'Must supply "jobId" as a string',
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

    test('should reject form id', async () => {
      const jobs = await getJobsSdk()
      return expect(jobs.searchJobs({ formId: 'ten' })).rejects.toThrow(
        'formId must be provided as a number or not at all',
      )
    })

    test('should reject externalId', async () => {
      const jobs = await getJobsSdk()
      return expect(jobs.searchJobs({ externalId: 12345 })).rejects.toThrow(
        'externalId must be provided as a string or not at all',
      )
    })

    test('should reject username', async () => {
      const jobs = await getJobsSdk()
      return expect(jobs.searchJobs({ username: 12345 })).rejects.toThrow(
        'username must be provided as a string or not at all',
      )
    })

    test('should reject isSubmitted', async () => {
      const jobs = await getJobsSdk()
      return expect(jobs.searchJobs({ isSubmitted: 'maybe?' })).rejects.toThrow(
        'isSubmitted must be provided as a boolean or not at all',
      )
    })

    test('should reject limit', async () => {
      const jobs = await getJobsSdk()
      return expect(jobs.searchJobs({ limit: 'infinite' })).rejects.toThrow(
        'limit must be provided as a number or not at all',
      )
    })

    test('should reject offset', async () => {
      const jobs = await getJobsSdk()
      return expect(
        jobs.searchJobs({ offset: 'a little bit' }),
      ).rejects.toThrow('offset must be provided as a number or not at all')
    })

    test('should make search call successfully', async () => {
      const mockSearchRequest = jest
        .fn()
        .mockImplementation(() => Promise.resolve({}))
      jest.mock(
        '../src/lib/one-blink-api',
        () =>
          class {
            searchRequest() {
              return mockSearchRequest()
            }
          },
      )
      const jobs = await getJobsSdk()

      await jobs.searchJobs({
        externalId: 'abc',
        formId: 1,
        username: 'user@domain.io',
        isSubmitted: false,
        offset: 1,
        limit: 100,
      })

      return expect(mockSearchRequest).toHaveBeenCalledTimes(1)
    })
  })
})
