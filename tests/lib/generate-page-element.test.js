// @flow
'use strict'

const { ONEBLINK } = require('../../lib/tenant-configuration')
const generateTenant = require('../../lib/generate-tenant')

const tenant = generateTenant(ONEBLINK)

describe('Generate Page Element', () => {
  const Forms = require('../../classes/Forms.js')(tenant)
  test('Should return defaults', () => {
    const elementData = {}
    const pageElement = Forms.generatePageElement(elementData)
    expect(pageElement.type).toBe('page')
    expect(pageElement.elements.length).toBe(1)
    expect(pageElement.elements[0].id).toBeDefined()
  })
  test('Should use child elements if provided', () => {
    const childElement = Forms.generateFormElement({ label: 'unit test' })
    const secondChildElement = Forms.generateFormElement({
      label: 'unit test 2',
    })
    const elementData = {
      elements: [childElement, secondChildElement],
    }
    const pageElement = Forms.generatePageElement(elementData)
    expect(pageElement.type).toBe('page')
    expect(pageElement.elements.length).toBe(2)
    expect(pageElement.elements[0]).toStrictEqual(childElement)
    expect(pageElement.elements[1]).toStrictEqual(secondChildElement)
  })
})
