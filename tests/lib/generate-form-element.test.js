
// @flow
'use strict'

describe('Generate Form Element', () => {
  describe('generateFormUrl()', () => {
    const Forms = require('../../classes/Forms.js')

    test('should return a default text element based off of only a name', async () => {
      const elementData = {
        'name': 'F'
      }
      const generatedElement = await Forms.generateFormElement(elementData)
      expect(typeof generatedElement.id).toBe('string')
      expect(generatedElement.name).toBe('F')
      expect(generatedElement.type).toBe('text')
      expect(generatedElement.required).toBe(false)
      expect(generatedElement.readOnly).toBe(false)
      expect(generatedElement.requiresAllConditionallyShowPredicates).toBe(false)
      expect(generatedElement.isDataLookup).toBe(false)
      expect(generatedElement.isElementLookup).toBe(false)
    })

    test('should convert name to url safe string', async () => {
      const elementData = {
        'name': 'lot s of sp a ce sss'
      }
      const generatedElement = await Forms.generateFormElement(elementData)
      expect(generatedElement.name).toBe('lot_s_of_sp_a_ce_sss')
    })

    test('should default label to type ONLY if no label is given', async () => {
      const elementData = {
        'type': 'number'
      }
      const generatedElement = await Forms.generateFormElement(elementData)
      expect(generatedElement.type).toBe('number')
      expect(generatedElement.label).toBe('number')

      const elementDataWithLabel = {
        'type': 'number',
        'label': 'i am a label'
      }
      const generatedElementWithLabel = await Forms.generateFormElement(elementDataWithLabel)
      expect(generatedElementWithLabel.type).toBe('number')
      expect(generatedElementWithLabel.label).toBe('i am a label')
    })

    test('should always set an element name', async () => {
      const elementDataWithName = {
        'type': 'number',
        name: 'i am a name'
      }
      const generatedElementWithName = await Forms.generateFormElement(elementDataWithName)
      expect(generatedElementWithName.name).toBe('i_am_a_name')

      const elementDataWithType = {
        'type': 'number'
      }
      const generatedElementWithType = await Forms.generateFormElement(elementDataWithType)
      expect(generatedElementWithType.name).toBe('number')

      const elementData = {}
      const generatedElement = await Forms.generateFormElement(elementData)
      expect(generatedElement.name).toBe('text')
    })
  })
})
