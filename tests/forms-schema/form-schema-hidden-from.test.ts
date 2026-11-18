import { describe, test, expect } from 'vitest'
import { elementSchema, pageElementSchema } from '../../src/lib/forms-schema'
import { validateWithFormSchema } from '../../src/lib/forms-validation'

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

const basePageElement = {
  id: '6d8f0a4e-1c2b-4a55-9e10-0a1b2c3d4e5f',
  type: 'page',
  label: 'Approver',
  elements: [
    {
      id: 'a5289278-5cb4-4103-90b6-f67ffe84dee7',
      type: 'text',
      name: 'notes',
      label: 'Notes',
    },
  ],
}

describe('hiddenFrom page property', () => {
  test('should allow a page hidden from submitters', () => {
    const { error, value } = pageElementSchema.validate({
      ...basePageElement,
      isHidden: true,
      hiddenFrom: ['SUBMITTER'],
    })
    expect(error).toBeFalsy()
    expect(value.isHidden).toBe(true)
    expect(value.hiddenFrom).toEqual(['SUBMITTER'])
  })

  test('should allow a page hidden from approvers', () => {
    const { error, value } = pageElementSchema.validate({
      ...basePageElement,
      isHidden: true,
      hiddenFrom: ['APPROVER'],
    })
    expect(error).toBeFalsy()
    expect(value.hiddenFrom).toEqual(['APPROVER'])
  })

  test('should allow a page hidden from both audiences', () => {
    const { error, value } = pageElementSchema.validate({
      ...basePageElement,
      isHidden: true,
      hiddenFrom: ['SUBMITTER', 'APPROVER'],
    })
    expect(error).toBeFalsy()
    expect(value.hiddenFrom).toEqual(['SUBMITTER', 'APPROVER'])
  })

  test('should strip hiddenFrom on a page when isHidden is not true', () => {
    const { error, value } = pageElementSchema.validate({
      ...basePageElement,
      isHidden: false,
      hiddenFrom: ['SUBMITTER'],
    })
    expect(error).toBeFalsy()
    expect(value.hiddenFrom).toBeUndefined()
  })

  test('should reject an invalid page hiddenFrom audience', () => {
    const { error } = pageElementSchema.validate({
      ...basePageElement,
      isHidden: true,
      hiddenFrom: ['REVIEWER'],
    })
    expect(error?.message).toContain(
      '"hiddenFrom[0]" must be one of [SUBMITTER, APPROVER]',
    )
  })
})

function multiPageForm(
  pages: Array<{
    id: string
    isHidden?: boolean
    hiddenFrom?: Array<'SUBMITTER' | 'APPROVER'>
  }>,
) {
  return {
    name: 'Hidden pages',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: '59cc888b8969af000fb50ddb',
    postSubmissionAction: 'FORMS_LIBRARY',
    isMultiPage: true,
    elements: pages.map((page) => ({
      id: page.id,
      type: 'page',
      label: page.id,
      isHidden: page.isHidden,
      hiddenFrom: page.hiddenFrom,
      elements: [
        {
          id: `${page.id}-text`,
          type: 'text',
          name: page.id,
          label: page.id,
        },
      ],
    })),
  }
}

describe('pages visible to an audience', () => {
  test('should allow hiding a page when another page stays visible to that audience', () => {
    const result = validateWithFormSchema(
      multiPageForm([
        { id: 'submitter-page', isHidden: true, hiddenFrom: ['SUBMITTER'] },
        { id: 'approver-page', isHidden: true, hiddenFrom: ['APPROVER'] },
      ]),
    )
    expect(result.success).toBe(true)
  })

  test('should reject hiding every page from submitters', () => {
    const result = validateWithFormSchema(
      multiPageForm([
        { id: 'page-1', isHidden: true, hiddenFrom: ['SUBMITTER'] },
        {
          id: 'page-2',
          isHidden: true,
          hiddenFrom: ['SUBMITTER', 'APPROVER'],
        },
      ]),
    )
    expect(result.success).toBe(false)
    if (result.success) return
    expect(result.error.message).toBe(
      'At least one page must stay visible to submitters.',
    )
  })

  test('should treat a hidden page with no hiddenFrom as hidden from both audiences', () => {
    const result = validateWithFormSchema(
      multiPageForm([
        { id: 'page-1', isHidden: true },
        { id: 'page-2', isHidden: true, hiddenFrom: ['APPROVER'] },
      ]),
    )
    expect(result.success).toBe(false)
    if (result.success) return
    expect(result.error.message).toBe(
      'At least one page must stay visible to approvers.',
    )
  })

  test('should reject hiding every page from both audiences', () => {
    const result = validateWithFormSchema(
      multiPageForm([
        { id: 'page-1', isHidden: true },
        { id: 'page-2', isHidden: true, hiddenFrom: ['SUBMITTER', 'APPROVER'] },
      ]),
    )
    expect(result.success).toBe(false)
    if (result.success) return
    expect(result.error.message).toBe(
      'At least one page must stay visible to submitters and approvers.',
    )
  })
})
