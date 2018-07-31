
// @flow
'use strict'

const querystring = require('querystring')
const { URL } = require('url')

const Forms = require('../../lib/forms.js')

describe('Forms SDK Class', () => {
  describe('generateFormUrl()', () => {
    const forms = new Forms({
      accessKey: '123',
      secretKey: 'abc',
      formsRendererOrigin: 'https://domain.com'
    })

    test('should throw correct validation errors', () => {
      expect(() => forms.generateFormUrl()).toThrow('Must supply "formId" as a number')
      expect(() => forms.generateFormUrl(1, 1)).toThrow('Must supply "externalId" as a string or not at all')
    })

    test('should generate url and expiry with external id', () => {
      const result = forms.generateFormUrl(1, 'blah blah')

      expect(new Date(result.expiry)).toBeInstanceOf(Date)

      const parsedUrl = new URL(result.formUrl)
      expect(parsedUrl.protocol).toBe('https:')
      expect(parsedUrl.hostname).toBe('domain.com')
      expect(parsedUrl.pathname).toBe('/1')

      // need to remove the ? from the query string
      const search = parsedUrl.search.slice(1)
      const searchParams = querystring.parse(search)
      expect(searchParams.access_key).toBeDefined()
      expect(searchParams.externalId).toBe('blah blah')
    })

    test('should generate url and expiry without external id', () => {
      const forms = new Forms({
        accessKey: '123',
        secretKey: 'abc',
        formsRendererOrigin: 'https://forms.oneblink.io'
      })
      const result = forms.generateFormUrl(2)

      const parsedUrl = new URL(result.formUrl)
      expect(parsedUrl.protocol).toBe('https:')
      expect(parsedUrl.hostname).toBe('forms.oneblink.io')
      expect(parsedUrl.pathname).toBe('/2')

      // need to remove the ? from the query string
      const search = parsedUrl.search.slice(1)
      const searchParams = querystring.parse(search)
      expect(searchParams.access_key).toBeDefined()
      expect(searchParams.externalId).toBeUndefined()
    })
  })

  describe('getSubmissionData()', () => {
    const forms = new Forms({
      accessKey: '123',
      secretKey: 'abc',
      formsRendererOrigin: 'https://domain.com',
      oneBlinkAPIOrigin: 'https://domain.api.com'
    })

    describe('should reject with correct validation errors for', () => {
      test('"formId"', () => {
        return expect(forms.getSubmissionData()).rejects.toThrow('Must supply "formId" as a number')
      })

      test('"submissionId"', () => {
        return expect(forms.getSubmissionData(1)).rejects.toThrow('Must supply "submissionId" as a string')
      })
    })
  })
})
