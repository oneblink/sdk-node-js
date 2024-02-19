// TODO: Check draft strip

import { validateWithFormSchema } from '../../src/lib/forms-validation'

function validateFormThrowError(data: unknown) {
  const result = validateWithFormSchema(data)
  if (!result.success) {
    throw result.error
  }
  return result.data
}

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
      validateFormThrowError({
        ...form,
        submissionEvents: [schedulingEvent],
      }),
    ).toThrow(
      '"submissionEvents[0].type" must be one of [CALLBACK, POWER_AUTOMATE_FLOW, PDF, EMAIL, ONEBLINK_API, TRIM, CP_HCMS, CIVICA_CRM, FRESHDESK_CREATE_TICKET, FRESHDESK_ADD_NOTE_TO_TICKET]',
    )
  })
  test('SCHEDULING form event should error when being passed to "paymentEvents"', () => {
    expect(() =>
      validateFormThrowError({
        ...form,
        paymentEvents: [schedulingEvent],
      }),
    ).toThrow(
      '"paymentEvents[0].type" must be one of [CP_PAY, BPOINT, WESTPAC_QUICK_WEB, WESTPAC_QUICK_STREAM, NSW_GOV_PAY]',
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
      validateFormThrowError({
        ...form,
        submissionEvents: [paymentEvent],
      }),
    ).toThrow(
      '"submissionEvents[0].type" must be one of [CALLBACK, POWER_AUTOMATE_FLOW, PDF, EMAIL, ONEBLINK_API, TRIM, CP_HCMS, CIVICA_CRM, FRESHDESK_CREATE_TICKET, FRESHDESK_ADD_NOTE_TO_TICKET]',
    )
  })
  test('Payment form event should error when being passed to "schedulingEvents"', () => {
    expect(() =>
      validateFormThrowError({
        ...form,
        schedulingEvents: [paymentEvent],
      }),
    ).toThrow('"schedulingEvents[0].type" must be [SCHEDULING]')
  })
})

describe('CP Pay', () => {
  test('fails when cp pay payment elementId is not found', async () => {
    expect(() =>
      validateFormThrowError({
        id: 1,
        formsAppEnvironmentId: 1,
        name: 'Inspection',
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        submissionEvents: [],
        paymentEvents: [
          {
            type: 'CP_PAY',
            configuration: {
              gatewayId: '31042cfe-65e0-4a85-826b-ae6a2e48da11',
              elementId: '31042cfe-65e0-4a85-826b-ae6a2e48da11',
            },
          },
        ],
        elements: [
          {
            id: '31042cfe-65e0-4a85-826b-ae6a2e48da10',
            type: 'number',
            name: 'payment_element',
            label: 'Payment element',
          },
        ],
      }),
    ).toThrow(
      '"paymentEvents[0].configuration.elementId" (31042cfe-65e0-4a85-826b-ae6a2e48da11) does not exist in "elements"',
    )
  })
  test('fails when cp pay payment elementId is not a valid type', async () => {
    expect(() =>
      validateFormThrowError({
        id: 1,
        formsAppEnvironmentId: 1,
        name: 'Inspection',
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        submissionEvents: [],
        paymentEvents: [
          {
            type: 'CP_PAY',
            configuration: {
              gatewayId: '31042cfe-65e0-4a85-826b-ae6a2e48da11',
              elementId: '31042cfe-65e0-4a85-826b-ae6a2e48da10',
            },
          },
        ],
        elements: [
          {
            id: '31042cfe-65e0-4a85-826b-ae6a2e48da10',
            type: 'text',
            name: 'payment_element',
            label: 'Payment element',
          },
        ],
      }),
    ).toThrow(
      '"paymentEvents[0].configuration.elementId" (31042cfe-65e0-4a85-826b-ae6a2e48da10) references a form element that is not a "number" or "calculation" element.',
    )
  })
  test('fails when cp pay payment elementId is a child of a repeatableSet', async () => {
    expect(() =>
      validateFormThrowError({
        id: 1,
        formsAppEnvironmentId: 1,
        name: 'Inspection',
        formsAppIds: [1],
        organisationId: 'ORGANISATION_00000000001',
        postSubmissionAction: 'FORMS_LIBRARY',
        submissionEvents: [],
        paymentEvents: [
          {
            type: 'CP_PAY',
            configuration: {
              gatewayId: '31042cfe-65e0-4a85-826b-ae6a2e48da11',
              elementId: '31042cfe-65e0-4a85-826b-ae6a2e48da10',
            },
          },
        ],
        elements: [
          {
            id: '31042cfe-65e0-4a85-826b-ae6a2e48da11',
            type: 'repeatableSet',
            name: 'rs_element',
            label: 'RS element',
            elements: [
              {
                id: '31042cfe-65e0-4a85-826b-ae6a2e48da10',
                type: 'number',
                name: 'payment_element',
                label: 'Payment element',
              },
            ],
          },
        ],
      }),
    ).toThrow(
      'paymentEvents[0].configuration.elementId" (31042cfe-65e0-4a85-826b-ae6a2e48da10) does not exist in "elements"',
    )
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
      validateFormThrowError({
        ...form,
        schedulingEvents: [submissionEvent],
      }),
    ).toThrow('"schedulingEvents[0].type" must be [SCHEDULING]')
  })
  test('Submission form event should error when being passed to "paymentEvents"', () => {
    expect(() =>
      validateFormThrowError({
        ...form,
        paymentEvents: [submissionEvent],
      }),
    ).toThrow(
      '"paymentEvents[0].type" must be one of [CP_PAY, BPOINT, WESTPAC_QUICK_WEB, WESTPAC_QUICK_STREAM, NSW_GOV_PAY]',
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
      validateFormThrowError({
        ...form,
        draftEvents: [paymentEvent],
      }),
    ).toThrow(
      '"draftEvents[0].type" must be one of [CALLBACK, POWER_AUTOMATE_FLOW, PDF, EMAIL, ONEBLINK_API, TRIM, CP_HCMS, CIVICA_CRM, FRESHDESK_CREATE_TICKET, FRESHDESK_ADD_NOTE_TO_TICKET]',
    )
  })
  test('SCHEDULING form event should error when being passed to "draftEvents"', () => {
    expect(() =>
      validateFormThrowError({
        ...form,
        draftEvents: [schedulingEvent],
      }),
    ).toThrow(
      '"draftEvents[0].type" must be one of [CALLBACK, POWER_AUTOMATE_FLOW, PDF, EMAIL, ONEBLINK_API, TRIM, CP_HCMS, CIVICA_CRM, FRESHDESK_CREATE_TICKET, FRESHDESK_ADD_NOTE_TO_TICKET]',
    )
  })
  test('Should not error when passing submissionEvents to "draftEvents"', () => {
    expect(() =>
      validateFormThrowError({
        ...form,
        draftEvents: [submissionEvent],
      }),
    ).not.toThrow()
  })

  test('Payment form event should error when being passed to "approvalEvents"', () => {
    expect(() =>
      validateFormThrowError({
        ...form,
        approvalEvents: [paymentEvent],
      }),
    ).toThrow(
      '"approvalEvents[0].type" must be one of [CALLBACK, POWER_AUTOMATE_FLOW, PDF, EMAIL, ONEBLINK_API, TRIM, CP_HCMS, CIVICA_CRM, FRESHDESK_CREATE_TICKET, FRESHDESK_ADD_NOTE_TO_TICKET]',
    )
  })
  test('SCHEDULING form event should error when being passed to "approvalEvents"', () => {
    expect(() =>
      validateFormThrowError({
        ...form,
        approvalEvents: [schedulingEvent],
      }),
    ).toThrow(
      '"approvalEvents[0].type" must be one of [CALLBACK, POWER_AUTOMATE_FLOW, PDF, EMAIL, ONEBLINK_API, TRIM, CP_HCMS, CIVICA_CRM, FRESHDESK_CREATE_TICKET, FRESHDESK_ADD_NOTE_TO_TICKET]',
    )
  })
  test('Should not error when passing submissionEvents to "approvalEvents"', () => {
    expect(() =>
      validateFormThrowError({
        ...form,
        approvalEvents: [submissionEvent],
      }),
    ).not.toThrow()
  })
})
