import { describe, test, it, expect } from 'vitest'
import { FormTypes } from '@oneblink/types'
import { validateWithFormSchema } from '../../src/lib/forms-validation'

function validateFormThrowError(data: unknown) {
  const result = validateWithFormSchema(data)
  if (!result.success) {
    throw result.error
  }
  return result.data
}

const defaultForm = {
  id: 1,
  formsAppEnvironmentId: 1,
  name: 'Inspection',
  organisationId: 'ORGANISATION_00000000001',
  submissionEvents: [],
  elements: [],
  postSubmissionAction: 'BACK',
  formsAppIds: [],
}

// SCHEDULING Events
describe('Scheduling events should throw errors when not passed to "schedulingEvents" property', () => {
  const schedulingEvent = {
    type: 'NYLAS',
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
      '"submissionEvents[0].type" must be one of [CALLBACK, POWER_AUTOMATE_FLOW, CP_INTEGRATION_HUB_WEBHOOK, PDF, EMAIL, ONEBLINK_API, TRIM, CP_HCMS, CIVICA_CRM, FRESHDESK_CREATE_TICKET, FRESHDESK_ADD_NOTE_TO_TICKET, SHAREPOINT_CREATE_LIST_ITEM, SHAREPOINT_STORE_FILES, CIVIC_REC_COMPLETE_CHECKOUT, GOOD_TO_GO_UPDATE_ASSET, EXCEL_ADD_ROW, SYMPHONY_3_SMART_GLUE]',
    )
  })
  test('SCHEDULING form event should error when being passed to "paymentEvents"', () => {
    expect(() =>
      validateFormThrowError({
        ...form,
        paymentEvents: [schedulingEvent],
      }),
    ).toThrow(
      '"paymentEvents[0].type" must be one of [CP_PAY, BPOINT, WESTPAC_QUICK_STREAM, NSW_GOV_PAY]',
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
      '"submissionEvents[0].type" must be one of [CALLBACK, POWER_AUTOMATE_FLOW, CP_INTEGRATION_HUB_WEBHOOK, PDF, EMAIL, ONEBLINK_API, TRIM, CP_HCMS, CIVICA_CRM, FRESHDESK_CREATE_TICKET, FRESHDESK_ADD_NOTE_TO_TICKET, SHAREPOINT_CREATE_LIST_ITEM, SHAREPOINT_STORE_FILES, CIVIC_REC_COMPLETE_CHECKOUT, GOOD_TO_GO_UPDATE_ASSET, EXCEL_ADD_ROW, SYMPHONY_3_SMART_GLUE]',
    )
  })
  test('Payment form event should error when being passed to "schedulingEvents"', () => {
    expect(() =>
      validateFormThrowError({
        ...form,
        schedulingEvents: [paymentEvent],
      }),
    ).toThrow('"schedulingEvents[0].type" must be [NYLAS]')
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
      organisationManagedSecretId: 1,
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
    ).toThrow('"schedulingEvents[0].type" must be [NYLAS]')
  })
  test('Submission form event should error when being passed to "paymentEvents"', () => {
    expect(() =>
      validateFormThrowError({
        ...form,
        paymentEvents: [submissionEvent],
      }),
    ).toThrow(
      '"paymentEvents[0].type" must be one of [CP_PAY, BPOINT, WESTPAC_QUICK_STREAM, NSW_GOV_PAY]',
    )
  })
})

describe('"draftEvents" and "approvalEvents" should allow only submission events', () => {
  const submissionEvent = {
    type: 'CALLBACK',
    configuration: {
      url: 'https://domain.io/path',
      organisationManagedSecretId: 1,
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
    type: 'NYLAS',
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
      '"draftEvents[0].type" must be one of [CALLBACK, POWER_AUTOMATE_FLOW, CP_INTEGRATION_HUB_WEBHOOK, PDF, EMAIL, ONEBLINK_API, TRIM, CP_HCMS, CIVICA_CRM, FRESHDESK_CREATE_TICKET, FRESHDESK_ADD_NOTE_TO_TICKET, SHAREPOINT_CREATE_LIST_ITEM, SHAREPOINT_STORE_FILES, CIVIC_REC_COMPLETE_CHECKOUT, GOOD_TO_GO_UPDATE_ASSET, EXCEL_ADD_ROW, SYMPHONY_3_SMART_GLUE]',
    )
  })
  test('SCHEDULING form event should error when being passed to "draftEvents"', () => {
    expect(() =>
      validateFormThrowError({
        ...form,
        draftEvents: [schedulingEvent],
      }),
    ).toThrow(
      '"draftEvents[0].type" must be one of [CALLBACK, POWER_AUTOMATE_FLOW, CP_INTEGRATION_HUB_WEBHOOK, PDF, EMAIL, ONEBLINK_API, TRIM, CP_HCMS, CIVICA_CRM, FRESHDESK_CREATE_TICKET, FRESHDESK_ADD_NOTE_TO_TICKET, SHAREPOINT_CREATE_LIST_ITEM, SHAREPOINT_STORE_FILES, CIVIC_REC_COMPLETE_CHECKOUT, GOOD_TO_GO_UPDATE_ASSET, EXCEL_ADD_ROW, SYMPHONY_3_SMART_GLUE]',
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
      '"approvalEvents[0].type" must be one of [CALLBACK, POWER_AUTOMATE_FLOW, CP_INTEGRATION_HUB_WEBHOOK, PDF, EMAIL, ONEBLINK_API, TRIM, CP_HCMS, CIVICA_CRM, FRESHDESK_CREATE_TICKET, FRESHDESK_ADD_NOTE_TO_TICKET, SHAREPOINT_CREATE_LIST_ITEM, SHAREPOINT_STORE_FILES, CIVIC_REC_COMPLETE_CHECKOUT, GOOD_TO_GO_UPDATE_ASSET, EXCEL_ADD_ROW, SYMPHONY_3_SMART_GLUE]',
    )
  })
  test('SCHEDULING form event should error when being passed to "approvalEvents"', () => {
    expect(() =>
      validateFormThrowError({
        ...form,
        approvalEvents: [schedulingEvent],
      }),
    ).toThrow(
      '"approvalEvents[0].type" must be one of [CALLBACK, POWER_AUTOMATE_FLOW, CP_INTEGRATION_HUB_WEBHOOK, PDF, EMAIL, ONEBLINK_API, TRIM, CP_HCMS, CIVICA_CRM, FRESHDESK_CREATE_TICKET, FRESHDESK_ADD_NOTE_TO_TICKET, SHAREPOINT_CREATE_LIST_ITEM, SHAREPOINT_STORE_FILES, CIVIC_REC_COMPLETE_CHECKOUT, GOOD_TO_GO_UPDATE_ASSET, EXCEL_ADD_ROW, SYMPHONY_3_SMART_GLUE]',
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

describe('SHAREPOINT_STORE_FILES', () => {
  const validSubmissionEvent = {
    type: 'SHAREPOINT_STORE_FILES',
    configuration: {
      integrationEntraApplicationId: '31042cfe-65e0-4a85-826b-ae6a2e48da11',
      sharepointSite: {
        id: 'id',
        displayName: 'displayName',
      },
      sharepointDrive: {
        id: 'id',
        displayName: 'displayName',
      },
      folderPath: '/form-submissions',
      excludeAttachments: true,
    },
  }
  test('allows valid sharepoint store files submission event', async () => {
    const form = validateFormThrowError({
      ...defaultForm,
      submissionEvents: [validSubmissionEvent],
    })

    expect(form.submissionEvents[0]).toEqual({
      ...validSubmissionEvent,
      conditionallyExecute: false,
      requiresAllConditionallyExecutePredicates: false,
      configuration: {
        ...validSubmissionEvent.configuration,
        excludedCSSClasses: [],
        excludedElementIds: [],
      },
    })
  })

  test('fails when sharepoint store files "configuration" is not passed', async () => {
    expect(() =>
      validateFormThrowError({
        ...defaultForm,
        submissionEvents: [
          {
            type: 'SHAREPOINT_STORE_FILES',
          },
        ],
      }),
    ).toThrow('"submissionEvents[0].configuration" is required')
  })

  test('fails when sharepoint store files "configuration.folderPath" does not start with a slash', async () => {
    expect(() =>
      validateFormThrowError({
        ...defaultForm,
        submissionEvents: [
          {
            ...validSubmissionEvent,
            configuration: {
              ...validSubmissionEvent.configuration,
              folderPath: 'i-am-invalid',
            },
          },
        ],
      }),
    ).toThrow(
      '"submissionEvents[0].configuration.folderPath" must start with a forward slash ("/")',
    )
  })

  test('fails when sharepoint store files "configuration.folderPath" ends with a slash', async () => {
    expect(() =>
      validateFormThrowError({
        ...defaultForm,
        submissionEvents: [
          {
            ...validSubmissionEvent,
            configuration: {
              ...validSubmissionEvent.configuration,
              folderPath: '/i-am-invalid/',
            },
          },
        ],
      }),
    ).toThrow(
      '"submissionEvents[0].configuration.folderPath" must not end with a forward slash ("/")',
    )
  })
})

describe('CIVIC_REC_COMPLETE_CHECKOUT', () => {
  const validSubmissionEvent = {
    type: 'CIVIC_REC_COMPLETE_CHECKOUT',
    configuration: {
      environmentId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
    },
  }

  it('should strip out any additional data in the configuration', () => {
    const form = validateFormThrowError({
      ...defaultForm,
      submissionEvents: [
        {
          ...validSubmissionEvent,
          configuration: {
            environmentId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1',
            fakeVariable: "I'm fake!",
          },
        },
      ],
    })

    expect(form.submissionEvents[0]).toEqual({
      ...validSubmissionEvent,
      conditionallyExecute: false,
      requiresAllConditionallyExecutePredicates: false,
      configuration: { environmentId: 'b941ea2d-965c-4d40-8c1d-e5a231fc18b1' },
    })
  })

  it('should fail with empty configuration on the submission event', () => {
    expect(() =>
      validateFormThrowError({
        ...defaultForm,
        submissionEvents: [
          {
            type: 'CIVIC_REC_COMPLETE_CHECKOUT',
          },
        ],
      }),
    ).toThrow('"submissionEvents[0].configuration" is required')
  })
})

describe('PDF configuration', () => {
  const submissionEvent = {
    type: 'PDF',
    configuration: {
      toEmail: ['dev@oneblink.io'],
      customPdfId: '944344d8-91f3-462e-ab1f-fbfea3e5c416',
    },
  }
  const elements = [
    {
      id: 'ff9b04c3-f2ad-4994-a525-e7189eb67a78',
      type: 'text',
      name: 'firstName',
      label: 'First Name',
    },
  ]
  const customPDFs: FormTypes.FormCustomPDF[] = [
    {
      id: submissionEvent.configuration.customPdfId,
      label: 'My PDF',
      s3: {
        bucket: 'bucket',
        key: 'key',
        region: 'region',
      },
      mapping: [
        {
          replaceableField: 'someName',
          type: 'FORM_ELEMENT',
          formElementId: elements[0].id,
        },
        {
          replaceableField: 'anotherName',
          type: 'VALUE',
          font: 'Brush Script MT Italic',
          value: ['some choice'],
        },
      ],
    },
  ]
  test('should allow valid PDF submission event custom PDF', () => {
    const form = validateFormThrowError({
      ...defaultForm,
      customPDFs,
      elements,
      submissionEvents: [submissionEvent],
    })
    expect(form.submissionEvents[0]).toEqual({
      ...submissionEvent,
      conditionallyExecute: false,
      requiresAllConditionallyExecutePredicates: false,
      configuration: {
        ...submissionEvent.configuration,
        excludedAttachmentElementIds: [],
        excludedCSSClasses: [],
        excludedElementIds: [],
      },
    })
  })

  test('should not allow PDF submission event with pdfId that does not exist in customPDFs', () => {
    const run = () =>
      validateFormThrowError({
        ...defaultForm,
        customPDFs: [],
        elements,
        submissionEvents: [submissionEvent],
      })
    expect(run).toThrow(
      '"submissionEvents[0].configuration.customPdfId" (944344d8-91f3-462e-ab1f-fbfea3e5c416) must reference a "customPDFs[].id" property.',
    )
  })

  test('should not allow PDF submission event with wrong formElementId mapped to custom pdf', () => {
    const run = () =>
      validateFormThrowError({
        ...defaultForm,
        customPDFs,
        submissionEvents: [submissionEvent],
      })
    expect(run).toThrow(
      '"customPDFs[0].mappings[0].formElementId" (ff9b04c3-f2ad-4994-a525-e7189eb67a78) does not exist in "elements".',
    )
  })
})
