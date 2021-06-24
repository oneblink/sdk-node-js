import querystring from 'querystring'
import { URL } from 'url'

describe('Forms SDK Class', () => {
  const getFormsSdk = async () => {
    const OneBlinkSDK = await import('../src/oneblink')
    return new OneBlinkSDK.Forms({
      accessKey: '123',
      secretKey: 'abc',
    })
  }

  describe('generateFormUrl()', () => {
    beforeEach(() => {
      jest.mock('../src/lib/one-blink-api', () => {
        return class {
          accessKey: string
          secretKey: string
          constructor(accessKey: string, secretKey: string) {
            this.accessKey = accessKey
            this.secretKey = secretKey
          }

          getRequest(path: string) {
            if (path === '/forms/1') {
              return Promise.resolve({
                id: 1,
                name: 'Emptiness',
                formsAppIds: [1, 2],
              })
            } else {
              return Promise.resolve({
                id: 1,
                name: 'appname',
                hostname: 'orgname-appname.apps.oneblink.io',
                slug: 'appname',
              })
            }
          }
        }
      })
    })

    afterEach(() => {
      jest.clearAllMocks()
      jest.resetModules()
    })

    test('should reject with correct validation errors for "formId"', async () => {
      const forms = await getFormsSdk()
      return expect(forms.generateFormUrl({ formId: 'asdf' })).rejects.toThrow(
        'Must supply "formId" as a number',
      )
    })

    test('should reject with correct validation errors for "externalId"', async () => {
      const forms = await getFormsSdk()
      return expect(
        forms.generateFormUrl({ formId: 1, externalId: 1 }),
      ).rejects.toThrow('Must supply "externalId" as a string or not at all')
    })

    test('should reject with correct validation errors for "formsAppId"', async () => {
      const forms = await getFormsSdk()
      return expect(
        forms.generateFormUrl({ formId: 1, formsAppId: 'abc' }),
      ).rejects.toThrow('Must supply "formsAppId" as a number or not at all')
    })

    test('should generate url and expiry with external id', async () => {
      const forms = await getFormsSdk()
      const result = await forms.generateFormUrl({
        formId: 1,
        externalId: 'blah blah',
      })

      expect(new Date(result.expiry)).toBeInstanceOf(Date)

      const parsedUrl = new URL(result.formUrl)
      expect(parsedUrl.protocol).toBe('https:')
      expect(parsedUrl.hostname).toBe('orgname-appname.apps.oneblink.io')
      expect(parsedUrl.pathname).toBe('/forms/1')

      // need to remove the ? from the query string
      const search = parsedUrl.search.slice(1)
      const searchParams = querystring.parse(search)
      expect(searchParams.access_key).toBeDefined()
      expect(searchParams.externalId).toBe('blah blah')
    })

    test('should generate url and expiry without external id', async () => {
      const forms = await getFormsSdk()
      const result = await forms.generateFormUrl({ formId: 1 })

      const parsedUrl = new URL(result.formUrl)
      expect(parsedUrl.protocol).toBe('https:')
      expect(parsedUrl.hostname).toBe('orgname-appname.apps.oneblink.io')
      expect(parsedUrl.pathname).toBe('/forms/1')

      // need to remove the ? from the query string
      const search = parsedUrl.search.slice(1)
      const searchParams = querystring.parse(search)
      expect(searchParams.access_key).toBeDefined()
      expect(searchParams.externalId).toBeUndefined()
    })
  })

  describe('getSubmissionData()', () => {
    describe('should reject with correct validation errors for', () => {
      test('"formId"', async () => {
        const forms = await getFormsSdk()
        return expect(forms.getSubmissionData()).rejects.toThrow(
          'Must supply "formId" as a number',
        )
      })

      test('"submissionId"', async () => {
        const forms = await getFormsSdk()
        return expect(forms.getSubmissionData(1)).rejects.toThrow(
          'Must supply "submissionId" as a string',
        )
      })
    })
  })

  describe('generateSubmissionDataUrl()', () => {
    describe('should reject with correct validation errors for', () => {
      test('"formId"', async () => {
        const forms = await getFormsSdk()
        return expect(forms.generateSubmissionDataUrl()).rejects.toThrow(
          'Must supply "formId" as a number',
        )
      })

      test('"submissionId"', async () => {
        const forms = await getFormsSdk()
        return expect(forms.generateSubmissionDataUrl(1)).rejects.toThrow(
          'Must supply "submissionId" as a string',
        )
      })

      test('"expiryInSeconds"', async () => {
        const forms = await getFormsSdk()
        return expect(
          forms.generateSubmissionDataUrl(1, '123'),
        ).rejects.toThrow('Must supply "expiryInSeconds" as a number')
      })

      test('minimum "expiryInSeconds"', async () => {
        const forms = await getFormsSdk()
        return expect(
          forms.generateSubmissionDataUrl(1, '123', 600),
        ).rejects.toThrow(
          '"expiryInSeconds" must be greater than or equal to 900',
        )
      })
    })
  })

  describe('getForm()', () => {
    describe('should reject with correct validation errors for', () => {
      test('"formId"', async () => {
        const forms = await getFormsSdk()
        const promise = forms.getForm(
          // @ts-expect-error Intentionally passing a string here instead of a number
          '123',
        )
        return expect(promise).rejects.toThrow(
          'Must supply "formId" as a number',
        )
      })
    })
  })

  describe('createForm', () => {
    describe('should reject with correct validation errors for', () => {
      test('Non unique element names', async () => {
        const form = {
          id: 1,
          name: 'Form',
          formsAppEnvironmentId: 1,
          formsAppIds: [1],
          organisationId: '59cc888b8969af000fb50ddb',
          postSubmissionAction: 'FORMS_LIBRARY',
          isMultiPage: true,
          submissionEvents: [],
          elements: [
            {
              id: '9014e80c-3c68-4adb-a335-1be04ebc95ee',
              label: 'Page Heading',
              type: 'page',
              elements: [
                {
                  id: '9014e80c-3c68-4adb-a335-1be04ebc95ee',
                  label: 'section 1',
                  type: 'section',
                  elements: [
                    {
                      id: 'dee04cf1-ab5a-4854-9166-e71a87404fd1',
                      name: 'text',
                      type: 'text',
                      label: 'text 1',
                    },
                  ],
                },
              ],
            },
            {
              id: '9014e80c-3c68-4adb-a335-1be04ebc95e2',
              label: 'Page Heading 2',
              type: 'page',
              elements: [
                {
                  id: '9014e80c-3c68-4adb-a335-1be04ebc95ef',
                  label: 'section 2',
                  type: 'section',
                  elements: [
                    {
                      id: 'dee04cf1-ab5a-4854-9166-e71a87404fd2',
                      name: 'text',
                      type: 'text',
                      label: 'text 2',
                    },
                  ],
                },
              ],
            },
          ],
        }
        const forms = await getFormsSdk()
        return expect(forms.createForm(form)).rejects.toThrow(
          'Element name is not unique: text',
        )
      })
    })
  })
})
