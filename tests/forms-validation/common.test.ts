import { describe, test, expect } from 'vitest'
import { FormTypes, SubmissionEventTypes } from '@oneblink/types'
import { validateFormElementMappings } from '../../src/lib/forms-validation/common.js'

type Mapping = SubmissionEventTypes.FormElementMapping<Record<string, unknown>>

/** Fixed UUIDs for stable assertions in error messages */
const ID = {
  page: '10000000-0000-4000-8000-000000000000',
  textRoot: '10000000-0000-4000-8000-000000000001',
  textInPage: '20000000-0000-4000-8000-000000000002',
  textInSection: '30000000-0000-4000-8000-000000000003',
  formElement: '40000000-0000-4000-8000-000000000004',
  repeatOuter: '50000000-0000-4000-8000-000000000005',
  textInsideRs: '60000000-0000-4000-8000-000000000006',
  repeatInner: '70000000-0000-4000-8000-000000000007',
  textInnerRs: '80000000-0000-4000-8000-000000000008',
  missing: 'f0000000-0000-4000-8000-000000000999',
} as const

const text = (id: string, name: string): FormTypes.TextElement =>
  ({
    id,
    type: 'text',
    name,
    label: name,
  }) as FormTypes.TextElement

const formEl = (id: string, name: string): FormTypes.FormElement =>
  ({
    id,
    type: 'form',
    name,
    formId: 1,
  }) as FormTypes.FormElement

const repeatSet = (
  id: string,
  name: string,
  elements: FormTypes.FormElement[],
): FormTypes.FormElement =>
  ({
    id,
    type: 'repeatableSet',
    name,
    label: name,
    elements,
  }) as FormTypes.FormElement

describe('validateFormElementMappings', () => {
  test('does not throw for an empty mappings array', () => {
    expect(() =>
      validateFormElementMappings({
        mappings: [],
        validatedFormElements: [text(ID.textRoot, 'a')],
        propertyName: 'config.mapping',
      }),
    ).not.toThrow()
  })

  test('ignores mapping types that do not reference a form element by id (e.g. VALUE, SUBMISSION_ID)', () => {
    const mappings: Mapping[] = [
      { type: 'VALUE', value: 'x' } as Mapping,
      { type: 'SUBMISSION_ID' } as Mapping,
      { type: 'EXTERNAL_ID' } as Mapping,
    ]
    expect(() =>
      validateFormElementMappings({
        mappings,
        validatedFormElements: [text(ID.textRoot, 'a')],
        propertyName: 'config.mapping',
      }),
    ).not.toThrow()
  })

  test('accepts FORM_ELEMENT when formElementId exists on a top-level element', () => {
    const mappings: Mapping[] = [
      { type: 'FORM_ELEMENT', formElementId: ID.textRoot } as Mapping,
    ]
    expect(() =>
      validateFormElementMappings({
        mappings,
        validatedFormElements: [text(ID.textRoot, 'a')],
        propertyName: 'config.mapping',
      }),
    ).not.toThrow()
  })

  test('finds FORM_ELEMENT by id when the element is nested in a page', () => {
    const elements: FormTypes.FormElement[] = [
      {
        id: ID.page,
        type: 'page',
        label: 'p1',
        elements: [text(ID.textInPage, 'inPage')],
      } as FormTypes.FormElement,
    ]
    const mappings: Mapping[] = [
      { type: 'FORM_ELEMENT', formElementId: ID.textInPage } as Mapping,
    ]
    expect(() =>
      validateFormElementMappings({
        mappings,
        validatedFormElements: elements,
        propertyName: 'integration.mapping',
      }),
    ).not.toThrow()
  })

  test('finds FORM_ELEMENT by id when the element is nested in a section', () => {
    const sectionId = 'b0000000-0000-4000-8000-0000000000bb'
    const elements: FormTypes.FormElement[] = [
      {
        id: sectionId,
        type: 'section',
        label: 's1',
        elements: [text(ID.textInSection, 'inSec')],
      } as FormTypes.FormElement,
    ]
    const mappings: Mapping[] = [
      { type: 'FORM_ELEMENT', formElementId: ID.textInSection } as Mapping,
    ]
    expect(() =>
      validateFormElementMappings({
        mappings,
        validatedFormElements: elements,
        propertyName: 'x.mapping',
      }),
    ).not.toThrow()
  })

  test('throws when FORM_ELEMENT formElementId is not present in elements, with the mapping index in the path', () => {
    const mappings: Mapping[] = [
      { type: 'FORM_ELEMENT', formElementId: ID.missing } as Mapping,
    ]
    expect(() =>
      validateFormElementMappings({
        mappings,
        validatedFormElements: [text(ID.textRoot, 'a')],
        propertyName: 'submissionEvent.configuration.mapping',
      }),
    ).toThrow(
      `"submissionEvent.configuration.mapping[0].formElementId" (${ID.missing}) does not exist in "elements".`,
    )
  })

  test('uses the correct zero-based index when the failing entry is not the first mapping', () => {
    const mappings: Mapping[] = [
      { type: 'FORM_ELEMENT', formElementId: ID.textRoot } as Mapping,
      { type: 'FORM_ELEMENT', formElementId: ID.missing } as Mapping,
    ]
    expect(() =>
      validateFormElementMappings({
        mappings,
        validatedFormElements: [text(ID.textRoot, 'a')],
        propertyName: 'm',
      }),
    ).toThrow(
      `"m[1].formElementId" (${ID.missing}) does not exist in "elements".`,
    )
  })

  test('accepts FORM_FORM_ELEMENT when the referenced element has type "form"', () => {
    const mappings: Mapping[] = [
      {
        type: 'FORM_FORM_ELEMENT',
        formElementId: ID.formElement,
        mapping: {},
      } as unknown as Mapping,
    ]
    expect(() =>
      validateFormElementMappings({
        mappings,
        validatedFormElements: [formEl(ID.formElement, 'f')],
        propertyName: 'm',
      }),
    ).not.toThrow()
  })

  test('throws when FORM_FORM_ELEMENT references a non-form element', () => {
    const mappings: Mapping[] = [
      {
        type: 'FORM_FORM_ELEMENT',
        formElementId: ID.textRoot,
        mapping: {},
      } as unknown as Mapping,
    ]
    expect(() =>
      validateFormElementMappings({
        mappings,
        validatedFormElements: [text(ID.textRoot, 't')],
        propertyName: 'cfg.mapping',
      }),
    ).toThrow(
      `"cfg.mapping[0].formElementId" (${ID.textRoot}) must be the "id" for a "form" type element.`,
    )
  })

  test('accepts REPEATABLE_SET_FORM_ELEMENT when the id is a repeatableSet and the nested mapping is valid for its child elements', () => {
    const elements = [
      repeatSet(ID.repeatOuter, 'rs', [text(ID.textInsideRs, 'child')]),
    ]
    const mappings: Mapping[] = [
      {
        type: 'REPEATABLE_SET_FORM_ELEMENT',
        formElementId: ID.repeatOuter,
        entryNumber: 1,
        mapping: {
          type: 'FORM_ELEMENT',
          formElementId: ID.textInsideRs,
        } as Mapping,
      } as Mapping,
    ]
    expect(() =>
      validateFormElementMappings({
        mappings,
        validatedFormElements: elements,
        propertyName: 'map',
      }),
    ).not.toThrow()
  })

  test("validates REPEATABLE_SET children only against that set's element tree (not the whole form)", () => {
    const elements: FormTypes.FormElement[] = [
      text(ID.textRoot, 'sibling'),
      repeatSet(ID.repeatOuter, 'rs', [text(ID.textInsideRs, 'inside')]),
    ]
    const mappings: Mapping[] = [
      {
        type: 'REPEATABLE_SET_FORM_ELEMENT',
        formElementId: ID.repeatOuter,
        entryNumber: 1,
        mapping: {
          type: 'FORM_ELEMENT',
          formElementId: ID.textRoot,
        } as Mapping,
      } as Mapping,
    ]
    expect(() =>
      validateFormElementMappings({
        mappings,
        validatedFormElements: elements,
        propertyName: 'outer',
      }),
    ).toThrow(
      `"outer[0].mapping[0].formElementId" (${ID.textRoot}) does not exist in "elements".`,
    )
  })

  test('throws when REPEATABLE_SET_FORM_ELEMENT formElementId is not a repeatableSet', () => {
    const mappings: Mapping[] = [
      {
        type: 'REPEATABLE_SET_FORM_ELEMENT',
        formElementId: ID.textRoot,
        entryNumber: 1,
        mapping: {
          type: 'FORM_ELEMENT',
          formElementId: ID.textRoot,
        } as Mapping,
      } as Mapping,
    ]
    expect(() =>
      validateFormElementMappings({
        mappings,
        validatedFormElements: [text(ID.textRoot, 'a')],
        propertyName: 'e.mapping',
      }),
    ).toThrow(
      `"e.mapping[0].formElementId" (${ID.textRoot}) must be the "id" for a "repeatableSet" type element.`,
    )
  })

  test('recurses for nested REPEATABLE_SET_FORM_ELEMENT (repeatable inside repeatable)', () => {
    const inner = repeatSet(ID.repeatInner, 'inner', [
      text(ID.textInnerRs, 'innerText'),
    ])
    const outer = repeatSet(ID.repeatOuter, 'outer', [inner])
    const mapping: Mapping = {
      type: 'REPEATABLE_SET_FORM_ELEMENT',
      formElementId: ID.repeatOuter,
      entryNumber: 1,
      mapping: {
        type: 'REPEATABLE_SET_FORM_ELEMENT',
        formElementId: ID.repeatInner,
        entryNumber: 1,
        mapping: {
          type: 'FORM_ELEMENT',
          formElementId: ID.textInnerRs,
        } as Mapping,
      } as Mapping,
    } as Mapping
    expect(() =>
      validateFormElementMappings({
        mappings: [mapping],
        validatedFormElements: [outer],
        propertyName: 'multi',
      }),
    ).not.toThrow()
  })

  test('surfaces validation errors for inner repeatableSet with a nested propertyName path', () => {
    const inner = repeatSet(ID.repeatInner, 'inner', [
      text(ID.textInnerRs, 'innerText'),
    ])
    const outer = repeatSet(ID.repeatOuter, 'outer', [inner])
    const mapping: Mapping = {
      type: 'REPEATABLE_SET_FORM_ELEMENT',
      formElementId: ID.repeatOuter,
      entryNumber: 1,
      mapping: {
        type: 'REPEATABLE_SET_FORM_ELEMENT',
        formElementId: ID.repeatInner,
        entryNumber: 1,
        mapping: { type: 'FORM_ELEMENT', formElementId: ID.missing } as Mapping,
      } as Mapping,
    } as Mapping
    expect(() =>
      validateFormElementMappings({
        mappings: [mapping],
        validatedFormElements: [outer],
        propertyName: 'p.configuration.mapping',
      }),
    ).toThrow(
      `"p.configuration.mapping[0].mapping[0].mapping[0].formElementId" (${ID.missing}) does not exist in "elements".`,
    )
  })

  test('accepts a single run with multiple valid mappings of different types', () => {
    const elements: FormTypes.FormElement[] = [
      text(ID.textRoot, 't1'),
      formEl(ID.formElement, 'f1'),
      repeatSet(ID.repeatOuter, 'rs1', [text(ID.textInsideRs, 'inner')]),
    ]
    const mappings: Mapping[] = [
      { type: 'VALUE', value: 42 } as Mapping,
      { type: 'FORM_ELEMENT', formElementId: ID.textRoot } as Mapping,
      {
        type: 'FORM_FORM_ELEMENT',
        formElementId: ID.formElement,
        mapping: {},
      } as unknown as Mapping,
      {
        type: 'REPEATABLE_SET_FORM_ELEMENT',
        formElementId: ID.repeatOuter,
        entryNumber: 1,
        mapping: {
          type: 'FORM_ELEMENT',
          formElementId: ID.textInsideRs,
        } as Mapping,
      } as Mapping,
    ]
    expect(() =>
      validateFormElementMappings({
        mappings,
        validatedFormElements: elements,
        propertyName: 'm',
      }),
    ).not.toThrow()
  })

  test('does not recurse into FORM_FORM_ELEMENT.mapping (only repeatableSet triggers nested validateFormElementMappings)', () => {
    // Inner mapping references an unknown id; validation still passes because
    // FORM_FORM_ELEMENT is not recursed in validateFormElementMappings.
    const mappings: Mapping[] = [
      {
        type: 'FORM_FORM_ELEMENT',
        formElementId: ID.formElement,
        mapping: {
          type: 'FORM_ELEMENT',
          formElementId: ID.missing,
        } as Mapping,
      } as unknown as Mapping,
    ]
    expect(() =>
      validateFormElementMappings({
        mappings,
        validatedFormElements: [formEl(ID.formElement, 'f')],
        propertyName: 'm',
      }),
    ).not.toThrow()
  })
})
