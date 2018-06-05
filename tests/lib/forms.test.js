
// @flow
'use strict'

const querystring = require('querystring')
const { URL } = require('url')

const Forms = require('../../lib/forms.js')

describe('Forms SDK Class', () => {
  afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  test('generateFormUrl() should generate url and expiry', () => {
    const forms = new Forms({
      accessKey: '123',
      secretKey: 'abc',
      formsRendererHostname: 'https://domain.com'
    })
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
})
