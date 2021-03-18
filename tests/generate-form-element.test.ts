import { FormTypes } from '@oneblink/types'
import * as OneBlinkSDK from '../src/oneblink'

describe('Generate Form Element', () => {
  test('should return a default text element based off of only a name', () => {
    const elementData = {
      name: 'F',
    }
    const generatedElement = OneBlinkSDK.Forms.generateFormElement<FormTypes.TextElement>(
      elementData,
    )
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
    const generatedElement = OneBlinkSDK.Forms.generateFormElement<FormTypes.NumberElement>(
      elementData,
    )
    expect(generatedElement.type).toBe('number')
    expect(generatedElement.label).toBe('number')

    const elementDataWithLabel = {
      type: 'number',
      label: 'i am a label',
    }
    const generatedElementWithLabel = OneBlinkSDK.Forms.generateFormElement<FormTypes.NumberElement>(
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
    const generatedElementWithName = OneBlinkSDK.Forms.generateFormElement<FormTypes.NumberElement>(
      elementDataWithName,
    )
    expect(generatedElementWithName.name).toBe('i am a name')

    const elementDataWithType = {
      type: 'number',
    }
    const generatedElementWithType = OneBlinkSDK.Forms.generateFormElement<FormTypes.NumberElement>(
      elementDataWithType,
    )
    expect(generatedElementWithType.name).toBe('number')

    const elementData = {}
    const generatedElement = OneBlinkSDK.Forms.generateFormElement<FormTypes.TextElement>(
      elementData,
    )
    expect(generatedElement.name).toBe('text')
  })
})
