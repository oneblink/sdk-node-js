// @flow
'use strict'

const { ONEBLINK } = require('../../lib/tenant-configuration')
const generateTenant = require('../../lib/generate-tenant')

const tenant = generateTenant(ONEBLINK)

describe('Generate Form Element', () => {
  const Forms = require('../../classes/Forms.js')(tenant)

  test('should return a default text element based off of only a name', () => {
    const elementData = {
      name: 'F',
    }
    const generatedElement = Forms.generateFormElement(elementData)
    expect(typeof generatedElement.id).toBe('string')
    expect(generatedElement.name).toBe('F')
    expect(generatedElement.type).toBe('text')
    expect(generatedElement.required).toBe(false)
    expect(generatedElement.readOnly).toBe(false)
    expect(generatedElement.conditionallyShow).toBe(false)
    expect(generatedElement.isDataLookup).toBe(false)
    expect(generatedElement.isElementLookup).toBe(false)
  })

  test('should default label to type ONLY if no label is given', () => {
    const elementData = {
      type: 'number',
    }
    const generatedElement = Forms.generateFormElement(elementData)
    expect(generatedElement.type).toBe('number')
    expect(generatedElement.label).toBe('number')

    const elementDataWithLabel = {
      type: 'number',
      label: 'i am a label',
    }
    const generatedElementWithLabel = Forms.generateFormElement(
      elementDataWithLabel,
    )
    expect(generatedElementWithLabel.type).toBe('number')
    expect(generatedElementWithLabel.label).toBe('i am a label')
  })

  test('should always set an element name', () => {
    const elementDataWithName = {
      type: 'number',
      name: 'i am a name',
    }
    const generatedElementWithName = Forms.generateFormElement(
      elementDataWithName,
    )
    expect(generatedElementWithName.name).toBe('i am a name')

    const elementDataWithType = {
      type: 'number',
    }
    const generatedElementWithType = Forms.generateFormElement(
      elementDataWithType,
    )
    expect(generatedElementWithType.name).toBe('number')

    const elementData = {}
    const generatedElement = Forms.generateFormElement(elementData)
    expect(generatedElement.name).toBe('text')
  })
})
