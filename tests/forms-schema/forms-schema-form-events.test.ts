// TODO: Check draft strip

import { validateWithFormSchema } from '../../src/lib/forms-validation'

// SCHEDULING Events
describe('Scheduling events should throw errors when not passed to "schedulingEvents" property', () => {
  const schedulingEvent = {
    type: 'SCHEDULING',
    configuration: {
      nylasAccountId: 'string',
      nylasSchedulingPageId: 1,
      nameElementId: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
      emailElementId: 'ff9b04c3-f2ad-4994-a525-e7189eb67a10',
    },
  }
  const form = {
    id: 1,
    name: 'string',
    description: 'string',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: 'ORGANISATION_00000000001',
    postSubmissionAction: 'FORMS_LIBRARY',
    isMultiPage: false,
    elements: [
      {
        id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
        type: 'text',
        name: 'text',
        label: 'text',
      },
      {
        id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a10',
        type: 'email',
        name: 'email',
        label: 'email',
      },
    ],
    isAuthenticated: true,
    tags: [],
  }
  test('SCHEDULING form event should error when being passed to "submissionEvents"', () => {
    expect(() =>
      validateWithFormSchema({
        ...form,
        submissionEvents: [schedulingEvent],
      }),
    ).toThrow(
      '"submissionEvents[0].type" must be one of [CALLBACK, PDF, EMAIL, ONEBLINK_API, TRIM, CP_HCMS, CIVICA_CRM, FRESHDESK_CREATE_TICKET, FRESHDESK_ADD_NOTE_TO_TICKET]',
    )
  })
  test('SCHEDULING form event should error when being passed to "paymentEvents"', () => {
    expect(() =>
      validateWithFormSchema({
        ...form,
        paymentEvents: [schedulingEvent],
      }),
    ).toThrow(
      '"paymentEvents[0].type" must be one of [CP_PAY, BPOINT, WESTPAC_QUICK_WEB]',
    )
  })
})

// Payment Events
describe('Payment events should throw errors when not passed to "paymentEvents" property', () => {
  const paymentEvent = {
    type: 'BPOINT',
    configuration: {
      elementId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
      environmentId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
    },
  }
  const form = {
    id: 1,
    name: 'string',
    description: 'string',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: 'ORGANISATION_00000000001',
    postSubmissionAction: 'FORMS_LIBRARY',
    isMultiPage: false,
    isAuthenticated: true,
    elements: [
      {
        id: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
        name: 'Numbers',
        label: 'Numbers',
        type: 'number',
        required: false,
      },
    ],
    tags: [],
  }
  test('Payment form event should error when being passed to "submissionEvents"', () => {
    expect(() =>
      validateWithFormSchema({
        ...form,
        submissionEvents: [paymentEvent],
      }),
    ).toThrow(
      '"submissionEvents[0].type" must be one of [CALLBACK, PDF, EMAIL, ONEBLINK_API, TRIM, CP_HCMS, CIVICA_CRM, FRESHDESK_CREATE_TICKET, FRESHDESK_ADD_NOTE_TO_TICKET]',
    )
  })
  test('Payment form event should error when being passed to "schedulingEvents"', () => {
    expect(() =>
      validateWithFormSchema({
        ...form,
        schedulingEvents: [paymentEvent],
      }),
    ).toThrow('"schedulingEvents[0].type" must be [SCHEDULING]')
  })
})

// Submission Events
describe('Submission events should throw errors when not passed to "paymentEvents" property', () => {
  const submissionEvent = {
    type: 'CALLBACK',
    configuration: {
      url: 'https://domain.io/path',
      secret: 'abc123',
    },
  }
  const form = {
    id: 1,
    name: 'string',
    description: 'string',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: 'ORGANISATION_00000000001',
    postSubmissionAction: 'FORMS_LIBRARY',
    isMultiPage: false,
    isAuthenticated: true,
    elements: [],
    tags: [],
  }
  test('Submission form event should error when being passed to "schedulingEvents"', () => {
    expect(() =>
      validateWithFormSchema({
        ...form,
        schedulingEvents: [submissionEvent],
      }),
    ).toThrow('"schedulingEvents[0].type" must be [SCHEDULING]')
  })
  test('Submission form event should error when being passed to "paymentEvents"', () => {
    expect(() =>
      validateWithFormSchema({
        ...form,
        paymentEvents: [submissionEvent],
      }),
    ).toThrow(
      '"paymentEvents[0].type" must be one of [CP_PAY, BPOINT, WESTPAC_QUICK_WEB]',
    )
  })
})

describe('"draftEvents" and "approvalEvents" should allow only submission events', () => {
  const submissionEvent = {
    type: 'CALLBACK',
    configuration: {
      url: 'https://domain.io/path',
      secret: 'abc123',
    },
  }
  const paymentEvent = {
    type: 'BPOINT',
    configuration: {
      elementId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
      environmentId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
    },
  }
  const schedulingEvent = {
    type: 'SCHEDULING',
    configuration: {
      nylasAccountId: 'string',
      nylasSchedulingPageId: 1,
      nameElementId: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
      emailElementId: 'ff9b04c3-f2ad-4994-a525-e7189eb67a10',
    },
  }

  const form = {
    id: 1,
    name: 'string',
    description: 'string',
    formsAppEnvironmentId: 1,
    formsAppIds: [1],
    organisationId: 'ORGANISATION_00000000001',
    postSubmissionAction: 'FORMS_LIBRARY',
    isMultiPage: false,
    isAuthenticated: true,
    elements: [
      {
        id: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
        name: 'Numbers',
        label: 'Numbers',
        type: 'number',
        required: false,
      },
      {
        id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a79',
        type: 'text',
        name: 'text',
        label: 'text',
      },
      {
        id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a10',
        type: 'email',
        name: 'email',
        label: 'email',
      },
    ],
    tags: [],
  }
  test('Payment form event should error when being passed to "draftEvents"', () => {
    expect(() =>
      validateWithFormSchema({
        ...form,
        draftEvents: [paymentEvent],
      }),
    ).toThrow(
      '"draftEvents[0].type" must be one of [CALLBACK, PDF, EMAIL, ONEBLINK_API, TRIM, CP_HCMS, CIVICA_CRM, FRESHDESK_CREATE_TICKET, FRESHDESK_ADD_NOTE_TO_TICKET]',
    )
  })
  test('SCHEDULING form event should error when being passed to "draftEvents"', () => {
    expect(() =>
      validateWithFormSchema({
        ...form,
        draftEvents: [schedulingEvent],
      }),
    ).toThrow(
      '"draftEvents[0].type" must be one of [CALLBACK, PDF, EMAIL, ONEBLINK_API, TRIM, CP_HCMS, CIVICA_CRM, FRESHDESK_CREATE_TICKET, FRESHDESK_ADD_NOTE_TO_TICKET]',
    )
  })
  test('Should not error when passing submissionEvents to "draftEvents"', () => {
    expect(() =>
      validateWithFormSchema({
        ...form,
        draftEvents: [submissionEvent],
      }),
    ).not.toThrow()
  })

  test('Payment form event should error when being passed to "approvalEvents"', () => {
    expect(() =>
      validateWithFormSchema({
        ...form,
        approvalEvents: [paymentEvent],
      }),
    ).toThrow(
      '"approvalEvents[0].type" must be one of [CALLBACK, PDF, EMAIL, ONEBLINK_API, TRIM, CP_HCMS, CIVICA_CRM, FRESHDESK_CREATE_TICKET, FRESHDESK_ADD_NOTE_TO_TICKET]',
    )
  })
  test('SCHEDULING form event should error when being passed to "approvalEvents"', () => {
    expect(() =>
      validateWithFormSchema({
        ...form,
        approvalEvents: [schedulingEvent],
      }),
    ).toThrow(
      '"approvalEvents[0].type" must be one of [CALLBACK, PDF, EMAIL, ONEBLINK_API, TRIM, CP_HCMS, CIVICA_CRM, FRESHDESK_CREATE_TICKET, FRESHDESK_ADD_NOTE_TO_TICKET]',
    )
  })
  test('Should not error when passing submissionEvents to "approvalEvents"', () => {
    expect(() =>
      validateWithFormSchema({
        ...form,
        approvalEvents: [submissionEvent],
      }),
    ).not.toThrow()
  })
})
