// @flow
'use strict'

const querystring = require('querystring')
const { URL } = require('url')

describe('Forms SDK Class', () => {
  describe('generateFormUrl()', () => {
    jest.mock('../../lib/one-blink-api.js', () => {
      return class {
        /* ::
        accessKey: string
        secretKey: string
        */
        constructor(apiOrigin, accessKey, secretKey) {
          this.accessKey = accessKey
          this.secretKey = secretKey
        }

        getRequest(path) {
          if (path === '/forms/1') {
            return Promise.resolve({
              id: 1,
              name: 'Emptiness',
              formsAppIds: [1, 2]
            })
          } else {
            return Promise.resolve({
              id: 1,
              name: 'appname',
              hostname: 'orgname-appname.apps.oneblink.io'
            })
          }
        }
      }
    })

    const Forms = require('../../classes/Forms.js')
    const forms = new Forms({
      accessKey: '123',
      secretKey: 'abc'
    })

    test('should reject with correct validation errors for "formId"', () => {
      return expect(forms.generateFormUrl({ formId: 'asdf' })).rejects.toThrow(
        'Must supply "formId" as a number'
      )
    })

    test('should reject with correct validation errors for "externalId"', () => {
      return expect(
        forms.generateFormUrl({ formId: 1, externalId: 1 })
      ).rejects.toThrow('Must supply "externalId" as a string or not at all')
    })

    test('should reject with correct validation errors for "formsAppId"', () => {
      return expect(
        forms.generateFormUrl({ formId: 1, formsAppId: 'abc' })
      ).rejects.toThrow('Must supply "formsAppId" as a number or not at all')
    })

    test('should generate url and expiry with external id', async () => {
      const result = await forms.generateFormUrl({
        formId: 1,
        externalId: 'blah blah'
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

  describe('getDraftData()', () => {
    const Forms = require('../../classes/Forms.js')
    const forms = new Forms({
      accessKey: '123',
      secretKey: 'abc',
      oneBlinkAPIOrigin: 'https://domain.api.com'
    })

    describe('should reject with correct validation errors for', () => {
      test('"formId"', () => {
        return expect(forms.getDraftData()).rejects.toThrow(
          'Must supply "formId" as a number'
        )
      })

      test('"draftDataId"', () => {
        return expect(forms.getDraftData(1)).rejects.toThrow(
          'Must supply "draftDataId" as a string'
        )
      })
    })
  })

  describe('getSubmissionData()', () => {
    const Forms = require('../../classes/Forms.js')
    const forms = new Forms({
      accessKey: '123',
      secretKey: 'abc',
      oneBlinkAPIOrigin: 'https://domain.api.com'
    })

    describe('should reject with correct validation errors for', () => {
      test('"formId"', () => {
        return expect(forms.getSubmissionData()).rejects.toThrow(
          'Must supply "formId" as a number'
        )
      })

      test('"submissionId"', () => {
        return expect(forms.getSubmissionData(1)).rejects.toThrow(
          'Must supply "submissionId" as a string'
        )
      })
    })
  })

  describe('generateSubmissionDataUrl()', () => {
    const Forms = require('../../classes/Forms.js')
    const forms = new Forms({
      accessKey: '123',
      secretKey: 'abc',
      oneBlinkAPIOrigin: 'https://domain.api.com'
    })

    describe('should reject with correct validation errors for', () => {
      test('"formId"', () => {
        return expect(forms.generateSubmissionDataUrl()).rejects.toThrow(
          'Must supply "formId" as a number'
        )
      })

      test('"submissionId"', () => {
        return expect(forms.generateSubmissionDataUrl(1)).rejects.toThrow(
          'Must supply "submissionId" as a string'
        )
      })

      test('"expiryInSeconds"', () => {
        return expect(
          forms.generateSubmissionDataUrl(1, '123')
        ).rejects.toThrow('Must supply "expiryInSeconds" as a number')
      })

      test('minimum "expiryInSeconds"', () => {
        return expect(
          forms.generateSubmissionDataUrl(1, '123', 600)
        ).rejects.toThrow(
          '"expiryInSeconds" must be greater than or equal to 900'
        )
      })
    })
  })

  describe('getForm()', () => {
    const Forms = require('../../classes/Forms.js')
    const forms = new Forms({
      accessKey: '123',
      secretKey: 'abc',
      oneBlinkAPIOrigin: 'https://domain.api.com'
    })

    describe('should reject with correct validation errors for', () => {
      test('"formId"', () => {
        return expect(forms.getForm('123')).rejects.toThrow(
          'Must supply "formId" as a number'
        )
      })
    })
  })
})
