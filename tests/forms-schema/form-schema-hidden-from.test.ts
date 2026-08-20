import { describe, test, expect } from 'vitest'
import { elementSchema } from '../../src/lib/forms-schema'

const baseTextElement = {
  id: 'a5289278-5cb4-4103-90b6-f67ffe84dee7',
  type: 'text',
  name: 'text',
  label: 'Text',
}

describe('hiddenFrom form element property', () => {
  test('should allow hiddenFrom when isHidden is true', () => {
    const { error, value } = elementSchema.validate({
      ...baseTextElement,
      isHidden: true,
      hiddenFrom: ['APPROVER'],
    })
    expect(error).toBeFalsy()
    expect(value.hiddenFrom).toEqual(['APPROVER'])
  })

  test('should allow hiddenFrom with both audiences', () => {
    const { error, value } = elementSchema.validate({
      ...baseTextElement,
      isHidden: true,
      hiddenFrom: ['SUBMITTER', 'APPROVER'],
    })
    expect(error).toBeFalsy()
    expect(value.hiddenFrom).toEqual(['SUBMITTER', 'APPROVER'])
  })

  test('should strip hiddenFrom when isHidden is not true', () => {
    const { error, value } = elementSchema.validate({
      ...baseTextElement,
      isHidden: false,
      hiddenFrom: ['APPROVER'],
    })
    expect(error).toBeFalsy()
    expect(value.hiddenFrom).toBeUndefined()
  })

  test('should reject an invalid hiddenFrom audience', () => {
    const { error } = elementSchema.validate({
      ...baseTextElement,
      isHidden: true,
      hiddenFrom: ['FORM_COMPLETER'],
    })
    expect(error?.message).toContain(
      '"hiddenFrom[0]" must be one of [SUBMITTER, APPROVER]',
    )
  })

  test('should reject an empty hiddenFrom array', () => {
    const { error } = elementSchema.validate({
      ...baseTextElement,
      isHidden: true,
      hiddenFrom: [],
    })
    expect(error?.message).toContain(
      '"hiddenFrom" must contain at least 1 items',
    )
  })

  test('should reject duplicate hiddenFrom audiences', () => {
    const { error } = elementSchema.validate({
      ...baseTextElement,
      isHidden: true,
      hiddenFrom: ['APPROVER', 'APPROVER'],
    })
    expect(error?.message).toContain(
      '"hiddenFrom[1]" contains a duplicate value',
    )
  })
})
