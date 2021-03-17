import * as OneBlinkSDK from '../src/oneblink'

describe('Generate Page Element', () => {
  test('Should return defaults', () => {
    const elementData = {}
    const pageElement = OneBlinkSDK.Forms.generatePageElement(elementData)
    expect(pageElement.type).toBe('page')
    expect(pageElement.elements.length).toBe(1)
    expect(pageElement.elements[0].id).toBeDefined()
  })
  test('Should use child elements if provided', () => {
    const childElement = OneBlinkSDK.Forms.generateFormElement({
      label: 'unit test',
    })
    const secondChildElement = OneBlinkSDK.Forms.generateFormElement({
      label: 'unit test 2',
    })
    const elementData = {
      elements: [childElement, secondChildElement],
    }
    const pageElement = OneBlinkSDK.Forms.generatePageElement(elementData)
    expect(pageElement.type).toBe('page')
    expect(pageElement.elements.length).toBe(2)
    expect(pageElement.elements[0]).toStrictEqual(childElement)
    expect(pageElement.elements[1]).toStrictEqual(secondChildElement)
  })
})
