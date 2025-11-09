import { FormTypes, SubmissionEventTypes } from '@oneblink/types'
import Joi from 'joi'
import { htmlString, s3ConfigurationSchema } from './common'
import elementSchema from './element-schema'
import {
  conditionallyShowPredicates,
  ConditionalPredicatesItemSchema,
  customCssClasses,
} from './property-schemas'
export const postSubmissionActions: FormTypes.FormPostSubmissionAction[] = [
  'BACK',
  'URL',
  'CLOSE',
  'FORMS_LIBRARY',
]

const emailSchema = Joi.alternatives([
  Joi.string().email(),
  Joi.string().regex(/^{ELEMENT:\S+}$/),
  Joi.string().regex(/^{ELEMENT_VALUE:\S+}$/),
  Joi.string().regex(/^{USER:email}$/),
])

const endpointConfigurationSchemaConfiguration = Joi.object()
  .required()
  .when('type', {
    is: 'CALLBACK',
    then: Joi.object({
      url: Joi.string().uri().required(),
      organisationManagedSecretId: Joi.number(),
    }),
  })
  .when('type', {
    is: 'ONEBLINK_API',
    then: Joi.object({
      apiId: Joi.string().required(),
      apiEnvironment: Joi.string().required(),
      apiEnvironmentRoute: Joi.string().required(),
      organisationManagedSecretId: Joi.number(),
    }),
  })

const endpointConfigurationSchema = Joi.object({
  type: Joi.string().required().valid('CALLBACK', 'ONEBLINK_API'),
  configuration: endpointConfigurationSchemaConfiguration,
})

const emailSubmissionEventConfiguration = {
  email: emailSchema,
  toEmail: Joi.array().items(emailSchema),
  ccEmail: Joi.array().items(emailSchema),
  bccEmail: Joi.array().items(emailSchema),
  emailSubjectLine: Joi.string().allow(null, ''),
  emailTemplate: Joi.object().keys({
    id: Joi.number().required(),
    mapping: Joi.array()
      .items(
        Joi.object().keys({
          mustacheTag: Joi.string()
            .regex(/^custom:\S+/)
            .required(),
          type: Joi.string().valid('FORM_ELEMENT', 'TEXT').required(),
          formElementId: Joi.when('type', {
            is: 'FORM_ELEMENT',
            then: Joi.string().uuid().required(),
            otherwise: Joi.any().strip(),
          }),
          text: Joi.when('type', {
            is: 'TEXT',
            then: Joi.string().required(),
            otherwise: Joi.any().strip(),
          }),
        }),
      )
      .required(),
  }),
  emailAttachmentsEndpoint: endpointConfigurationSchema,
  excludedAttachmentElementIds: Joi.array()
    .items(Joi.string().guid())
    .unique()
    .allow(null)
    .default([]),
}

const approvalFormsInclusionConfiguration = {
  approvalFormsInclusion: Joi.object().keys({
    value: Joi.string().required().valid('ALL', 'PARTIAL'),
    approvalStepLabels: Joi.when('value', {
      is: 'PARTIAL',
      then: Joi.array().required().unique().min(1).items(Joi.string()),
      otherwise: Joi.any().strip(),
    }),
  }),
}

const generateFormWorkflowEventElementMappingKeys = (
  recursiveId: string,
  extraTypes: string[],
) => ({
  type: Joi.string()
    .valid(
      'FORM_FORM_ELEMENT',
      'FORM_ELEMENT',
      'VALUE',
      'SUBMISSION_ID',
      'EXTERNAL_ID',
      'SUBMISSION_TIMESTAMP',
      'COMPLETION_TIMESTAMP',
      'PAYMENT_DETAIL',
      ...extraTypes,
    )
    .required(),
  formElementId: Joi.when('type', {
    is: Joi.valid('FORM_FORM_ELEMENT', 'FORM_ELEMENT'),
    then: Joi.string().uuid().required(),
    otherwise: Joi.any().strip(),
  }),
  mapping: Joi.when('type', {
    is: 'FORM_FORM_ELEMENT',
    then: Joi.link(`#${recursiveId}`).required(),
    otherwise: Joi.any().strip(),
  }),
  value: Joi.when('type', {
    is: 'VALUE',
    then: Joi.alternatives()
      .try(
        Joi.string(),
        Joi.number(),
        Joi.boolean(),
        Joi.array().items(Joi.string()).min(1),
      )
      .required(),
    otherwise: Joi.any().strip(),
  }),
  key: Joi.when('type', {
    is: 'PAYMENT_DETAIL',
    then: Joi.valid(
      // NSW_GOV_PAY
      'NSW_GOV_PAY_COMPLETION_REFERENCE',
      'NSW_GOV_PAY_PAYMENT_REFERENCE',
      'NSW_GOV_PAY_BANK_REFERENCE',
      'NSW_GOV_PAY_PAYMENT_METHOD',
      'NSW_GOV_PAY_BPAY_BILLER_CODE',
      'NSW_GOV_PAY_CREDIT_CARD_NUMBER',
      'NSW_GOV_PAY_AMOUNT',
      'NSW_GOV_PAY_SURCHARGE_AMOUNT',
      'NSW_GOV_PAY_SURCHARGE_GST',
      'NSW_GOV_PAY_CREATED_DATE_TIME',
      // BPOINT
      'BPOINT_RECEIPT_NUMBER',
      'BPOINT_CRN1',
      'BPOINT_CRN2',
      'BPOINT_CRN3',
      'BPOINT_BILLER_CODE',
      'BPOINT_CREDIT_CARD_MASK',
      'BPOINT_AMOUNT',
      'BPOINT_SURCHARGE_AMOUNT',
      'BPOINT_PROCESSED_DATE_TIME',
      // CP_PAY
      'CP_PAY_TRANSACTION_ID',
      'CP_PAY_ORDER_NUMBER',
      'CP_PAY_PAYMENT_TYPE',
      'CP_PAY_CREDIT_CARD_MASK',
      'CP_PAY_AMOUNT',
      'CP_PAY_CREATED_DATE_TIME',
      // WESTPAC_QUICK_STREAM
      'WESTPAC_QUICK_STREAM_RECEIPT_NUMBER',
      'WESTPAC_QUICK_STREAM_PAYMENT_REFERENCE_NUMBER',
      'WESTPAC_QUICK_STREAM_CUSTOMER_REFERENCE_NUMBER',
      'WESTPAC_QUICK_STREAM_AMOUNT',
      'WESTPAC_QUICK_STREAM_SURCHARGE_AMOUNT',
      'WESTPAC_QUICK_STREAM_SETTLEMENT_DATE',
    ).required(),
    otherwise: Joi.any().strip(),
  }),
})

const pdfConfiguration = {
  pdfFileName: Joi.string().allow(null, ''),
  includeSubmissionIdInPdf: Joi.boolean(),
  includeExternalIdInPdf: Joi.boolean(),
  includePaymentInPdf: Joi.boolean(),
  includeCalendarBookingInPdf: Joi.boolean(),
  excludedElementIds: Joi.array()
    .items(Joi.string().guid())
    .unique()
    .allow(null)
    .default([]),
  usePagesAsBreaks: Joi.boolean(),
  excludedCSSClasses: Joi.array()
    .items(Joi.string().regex(/^-?[_a-z]+[_a-z0-9-]*$/i)) //regex from here https://stackoverflow.com/a/449000
    .allow(null)
    .default([]),
  pdfSize: Joi.valid('A4', 'Letter'),
  customPdfId: Joi.string().uuid(),
  isCustomPdfEditable: Joi.bool(),
}

const pdfSubmissionEventConfiguration = {
  ...pdfConfiguration,
  ...approvalFormsInclusionConfiguration,
}

const formEventBaseSchema = {
  label: Joi.string(),
  isRetryable: Joi.boolean(),
  conditionallyExecute: Joi.bool().default(false),
  requiresAllConditionallyExecutePredicates: Joi.bool().default(false),
  conditionallyExecutePredicates: Joi.when('conditionallyExecute', {
    is: true,
    then: Joi.array().min(1).items(ConditionalPredicatesItemSchema).required(),
    otherwise: Joi.any().strip(),
  }),
}

export const paymentEventTypes: SubmissionEventTypes.FormPaymentEventType[] = [
  'CP_PAY',
  'BPOINT',
  'WESTPAC_QUICK_STREAM',
  'NSW_GOV_PAY',
]
export const PaymentEventSchema = Joi.object({
  type: Joi.string()
    .required()
    .valid(...paymentEventTypes),
  configuration: Joi.object()
    .required()
    .when('type', {
      is: 'BPOINT',
      then: Joi.object().keys({
        elementId: Joi.string().uuid().required(),
        environmentId: Joi.string().uuid().required(),
        crn2: Joi.string(),
        crn3: Joi.string(),
      }),
    })
    .when('type', {
      is: Joi.valid('WESTPAC_QUICK_STREAM'),
      then: Joi.object().keys({
        elementId: Joi.string().uuid().required(),
        environmentId: Joi.string().uuid().required(),
        customerReferenceNumber: Joi.string().required(),
      }),
    })
    .when('type', {
      is: 'CP_PAY',
      then: Joi.object().keys({
        elementId: Joi.string().uuid().required(),
        gatewayId: Joi.string().uuid().required(),
      }),
    })
    .when('type', {
      is: 'NSW_GOV_PAY',
      then: Joi.object().keys({
        elementId: Joi.string().uuid().required(),
        primaryAgencyId: Joi.string().uuid().required(),
        productDescription: Joi.string().required().max(250),
        customerReference: Joi.string().max(250),
        subAgencyCode: Joi.string(),
      }),
    }),
  ...formEventBaseSchema,
})
export const schedulingEventTypes: SubmissionEventTypes.FormSchedulingEventType[] =
  ['NYLAS']
export const SchedulingEventSchema = Joi.object({
  type: Joi.string()
    .required()
    .valid(...schedulingEventTypes),
  configuration: Joi.object()
    .required()
    .when('type', {
      is: 'NYLAS',
      then: Joi.object().keys({
        nylasGrantId: Joi.string().required(),
        nylasConfigurationId: Joi.string().required(),
        nameElementId: Joi.string().guid(),
        emailElementId: Joi.string().guid(),
        emailDescription: Joi.string(),
        ...pdfSubmissionEventConfiguration,
      }),
    }),
  ...formEventBaseSchema,
})
export const formWorkflowEventTypes: SubmissionEventTypes.FormWorkflowEventType[] =
  [
    'CALLBACK',
    'POWER_AUTOMATE_FLOW',
    'CP_INTEGRATION_HUB_WEBHOOK',
    'PDF',
    'EMAIL',
    'ONEBLINK_API',
    'TRIM',
    'CP_HCMS',
    'CIVICA_CRM',
    'FRESHDESK_CREATE_TICKET',
    'FRESHDESK_ADD_NOTE_TO_TICKET',
    'SHAREPOINT_CREATE_LIST_ITEM',
    'SHAREPOINT_STORE_FILES',
    'CIVIC_REC_COMPLETE_CHECKOUT',
    'GOOD_TO_GO_UPDATE_ASSET',
    'EXCEL_ADD_ROW',
  ]

const entraApplicationKeys = {
  integrationEntraApplicationId: Joi.string().required(),
}

const entraApplicationEntitySchema = Joi.object().keys({
  id: Joi.string().required(),
  displayName: Joi.string().required(),
})

const entraApplicationFolderPathSchema = Joi.string()
  .custom((value, helpers) => {
    if (typeof value === 'string') {
      if (!value.startsWith('/')) {
        return helpers.error('string.startsWithSlash')
      }
      if (value.endsWith('/')) {
        return helpers.error('string.endsWithSlash')
      }
    }

    return value
  })
  .messages({
    'string.startsWithSlash':
      '{{#label}} must start with a forward slash ("/")',
    'string.endsWithSlash':
      '{{#label}} must not end with a forward slash ("/")',
  })

export const WorkflowEventSchema = Joi.object().keys({
  type: Joi.string()
    .required()
    .valid(...formWorkflowEventTypes),
  configuration: Joi.object()
    .required()
    .when('type', {
      is: 'CALLBACK',
      then: Joi.object().keys({
        url: Joi.string().uri().required(),
        organisationManagedSecretId: Joi.number(),
      }),
    })
    .when('type', {
      is: Joi.valid('POWER_AUTOMATE_FLOW', 'CP_INTEGRATION_HUB_WEBHOOK'),
      then: Joi.object().keys({
        url: Joi.string().uri().required(),
        formId: Joi.number(),
      }),
    })
    .when('type', {
      is: 'EMAIL',
      then: Joi.object().keys({
        ...emailSubmissionEventConfiguration,
        ...approvalFormsInclusionConfiguration,
        pdfConfigurations: Joi.array().items(
          Joi.object().keys(pdfSubmissionEventConfiguration),
        ),
      }),
    })
    .when('type', {
      is: 'PDF',
      then: Joi.object().keys({
        ...emailSubmissionEventConfiguration,
        ...pdfSubmissionEventConfiguration,
      }),
    })
    .when('type', {
      is: 'ONEBLINK_API',
      then: Joi.object().keys({
        apiId: Joi.string().required(),
        apiEnvironment: Joi.string().required(),
        apiEnvironmentRoute: Joi.string().required(),
        organisationManagedSecretId: Joi.number().required(),
      }),
    })
    .when('type', {
      is: 'TRIM',
      then: Joi.object().keys({
        environmentId: Joi.string().uuid().required(),
        recordTitle: Joi.string().allow(null, ''),
        container: Joi.object().keys({
          uri: Joi.number().required(),
          label: Joi.string().required(),
        }),
        recordType: Joi.object().keys({
          uri: Joi.number().required(),
          label: Joi.string().required(),
        }),
        actionDefinition: Joi.object()
          .keys({
            uri: Joi.number().required(),
            label: Joi.string().required(),
          })
          .allow(null),
        location: Joi.object()
          .keys({
            uri: Joi.number().required(),
            label: Joi.string().required(),
          })
          .allow(null),
        author: Joi.object()
          .keys({
            uri: Joi.number().required(),
            label: Joi.string().required(),
          })
          .allow(null),
        groupFiles: Joi.boolean().default(false),
        ...pdfSubmissionEventConfiguration,
      }),
    })
    .when('type', {
      is: 'CIVICA_CRM',
      then: Joi.object().keys({
        environmentId: Joi.string().uuid().required(),
        civicaCustomerContactMethod: Joi.object({
          code: Joi.string().required(),
          description: Joi.string().required(),
        }).required(),
        civicaCategory: Joi.object({
          id: Joi.number().required(),
          label: Joi.string().required(),
        }).required(),
        mapping: Joi.array()
          .required()
          .min(1)
          .unique('civicaCategoryItemNumber')
          .items(
            Joi.object({
              civicaCategoryItemNumber: Joi.number().required(),
              formElementId: Joi.string().uuid().required(),
              isDescription: Joi.boolean().default(false),
            }),
          ),
        ...pdfSubmissionEventConfiguration,
      }),
    })
    .when('type', {
      is: 'CP_HCMS',
      then: Joi.object().keys({
        contentTypeName: Joi.string()
          .regex(/^[a-z0-9-]+$/)
          .required()
          .max(40),
        encryptedElementIds: Joi.array()
          .items(Joi.string().guid())
          .unique()
          .allow(null),
        tags: Joi.array().min(1).items(Joi.string()).unique(),
        categories: Joi.array()
          .min(1)
          .items(
            Joi.object().keys({
              id: Joi.string().uuid().required(),
              name: Joi.string().required(),
            }),
          )
          .unique('id'),
        encryptPdf: Joi.boolean().default(false),
        notificationElementId: Joi.string().uuid(),
        ...pdfSubmissionEventConfiguration,
      }),
    })
    .when('type', {
      is: 'FRESHDESK_CREATE_TICKET',
      then: Joi.object().keys({
        mapping: Joi.array()
          .items(
            Joi.object({
              freshdeskFieldName: Joi.string().required(),
              ...generateFormWorkflowEventElementMappingKeys(
                'FreshdeskMappingSchema',
                ['DEPENDENT_FIELD_VALUE'],
              ),
              dependentFieldValue: Joi.when('type', {
                is: 'DEPENDENT_FIELD_VALUE',
                then: Joi.object()
                  .keys({
                    category: Joi.string().required(),
                    subCategory: Joi.string().required(),
                    item: Joi.string().required(),
                  })
                  .required(),
                otherwise: Joi.any().strip(),
              }),
            }).id('FreshdeskMappingSchema'),
          )
          .default([]),
        ...approvalFormsInclusionConfiguration,
      }),
    })
    .when('type', {
      is: 'FRESHDESK_ADD_NOTE_TO_TICKET',
      then: Joi.object().keys(approvalFormsInclusionConfiguration),
    })
    .when('type', {
      is: 'SHAREPOINT_CREATE_LIST_ITEM',
      then: Joi.object().keys({
        ...entraApplicationKeys,
        sharepointSite: entraApplicationEntitySchema.required(),
        sharepointList: entraApplicationEntitySchema.required(),
        mapping: Joi.array()
          .items(
            Joi.object({
              sharepointColumnDefinitionName: Joi.string().required(),
              ...generateFormWorkflowEventElementMappingKeys(
                'SharepointCreateListItemMapping',
                [],
              ),
            }).id('SharepointCreateListItemMapping'),
          )
          .default([]),
      }),
    })
    .when('type', {
      is: 'SHAREPOINT_STORE_FILES',
      then: Joi.object().keys({
        ...entraApplicationKeys,
        sharepointSite: entraApplicationEntitySchema.required(),
        sharepointDrive: entraApplicationEntitySchema.required(),
        folderPath: entraApplicationFolderPathSchema,
        excludeAttachments: Joi.boolean().default(false),
        ...pdfSubmissionEventConfiguration,
      }),
    })
    .when('type', {
      is: 'EXCEL_ADD_ROW',
      then: Joi.object().keys({
        ...entraApplicationKeys,
        site: entraApplicationFolderPathSchema.required(),
        drive: entraApplicationFolderPathSchema.required(),
        folderPath: entraApplicationFolderPathSchema.required(),
        excelFile: entraApplicationEntitySchema.required(),
        table: entraApplicationEntitySchema.required(),
        mapping: Joi.array()
          .items(
            Joi.object({
              columnName: Joi.string().required(),
              ...generateFormWorkflowEventElementMappingKeys(
                'ExcelAddRowMapping',
                [],
              ),
            }).id('ExcelAddRowMapping'),
          )
          .min(1)
          .required(),
      }),
    })
    .when('type', {
      is: 'CIVIC_REC_COMPLETE_CHECKOUT',
      then: Joi.object().keys({
        environmentId: Joi.string().uuid().required(),
      }),
    })
    .when('type', {
      is: 'GOOD_TO_GO_UPDATE_ASSET',
      then: Joi.object().keys({
        elementId: Joi.string().uuid().required(),
        integrationKeyId: Joi.string().required(),
        mapping: Joi.array()
          .items(
            Joi.object({
              goodToGoCustomFieldName: Joi.string().required(),
              ...generateFormWorkflowEventElementMappingKeys(
                'GoodToGoUpdateAssetMappingSchema',
                [],
              ),
            }).id('GoodToGoUpdateAssetMappingSchema'),
          )
          .default([]),
      }),
    }),
  ...formEventBaseSchema,
})

const pageElementSchema = Joi.object().keys({
  id: Joi.string().guid().required(),
  label: Joi.string().required(),
  type: Joi.valid('page'),
  conditionallyShow: Joi.bool().default(false),
  conditionallyShowPredicates: conditionallyShowPredicates,
  requiresAllConditionallyShowPredicates: Joi.bool().default(false),
  elements: Joi.array()
    .required()
    .items(elementSchema)
    .min(1)
    .unique('name', { ignoreUndefined: true })
    .unique('id'),
})

const externalIdGenerationSchema = Joi.object({
  type: Joi.string().required().valid('CALLBACK', 'ONEBLINK_API', 'RECEIPT_ID'),
  configuration: endpointConfigurationSchemaConfiguration.when('type', {
    is: 'RECEIPT_ID',
    then: Joi.object({
      receiptComponents: Joi.array()
        .required()
        .min(1)
        .items(
          Joi.object({
            type: Joi.string()
              .required()
              .valid('text', 'date', 'random', 'sequentialNumber'),
            value: Joi.when('type', {
              is: 'text',
              then: Joi.string().required(),
              otherwise: Joi.any().strip(),
            }),
            format: Joi.when('type', {
              is: 'date',
              then: Joi.string()
                .required()
                .valid('dayOfMonth', 'monthNumber', 'yearShort', 'year'),
              otherwise: Joi.any().strip(),
            }),
            length: Joi.when('type', {
              is: 'random',
              then: Joi.number().required().min(1),
              otherwise: Joi.any().strip(),
            }),
            numbers: Joi.when('type', {
              is: 'random',
              then: Joi.boolean().default(false),
              otherwise: Joi.any().strip(),
            }),
            uppercase: Joi.when('type', {
              is: 'random',
              then: Joi.boolean().default(false),
              otherwise: Joi.any().strip(),
            }),
            lowercase: Joi.when('type', {
              is: 'random',
              then: Joi.boolean().default(false),
              otherwise: Joi.any().strip(),
            }),
          }),
        )
        .unique(
          (a, b) =>
            a.type &&
            b.type &&
            a.type === 'sequentialNumber' &&
            b.type === 'sequentialNumber',
        )
        .prefs({
          messages: {
            'array.unique': `"externalIdGenerationOnSubmit.configuration.receiptComponents" can only contain one "sequentialNumber" type.`,
          },
        }),
      startingSequentialNumber: Joi.number(),
    }),
  }),
})

const cannedResponsesSchema = Joi.array()
  .min(1)
  .items(
    Joi.object().required().keys({
      key: Joi.string().required(),
      label: Joi.string().required(),
      notes: Joi.string().required(),
    }),
  )
  .unique('key')

const approvalStepCommonProps = {
  clarificationRequestEmailTemplateId: Joi.number(),
}

const approvalStepNodeProps = {
  label: Joi.string().required(),
  group: Joi.string().required(),
  approvalFormId: Joi.number(),
  isConditional: Joi.boolean().default(false),
  requiresAllConditionalPredicates: Joi.boolean().default(false),
  conditionalPredicates: Joi.when('isConditional', {
    is: true,
    then: Joi.array().min(1).items(ConditionalPredicatesItemSchema).required(),
    otherwise: Joi.any().strip(),
  }),
  hideApprovalDenyButton: Joi.boolean(),
}

const formSchema = Joi.object().keys({
  formsAppEnvironmentId: Joi.number().required(),
  name: Joi.string().required(),
  description: Joi.string().allow('', null),
  organisationId: Joi.string().required(),
  elements: Joi.array().when('isMultiPage', {
    is: false,
    then: Joi.array()
      .required()
      .items(elementSchema)
      .unique('name', { ignoreUndefined: true })
      .unique('id'),
    otherwise: Joi.array().items(pageElementSchema),
  }),
  isMultiPage: Joi.bool().default(false),
  isAuthenticated: Joi.bool().default(false),
  publishStartDate: Joi.string().isoDate(),
  publishEndDate: Joi.string().isoDate(),
  unpublishedUserMessage: Joi.string(),
  // Form Events and Workflow
  draftEvents: Joi.array().items(WorkflowEventSchema),
  schedulingEvents: Joi.array().items(SchedulingEventSchema),
  paymentEvents: Joi.array().items(PaymentEventSchema),
  submissionEvents: Joi.array().allow(null).items(WorkflowEventSchema),
  approvalEvents: Joi.array().items(WorkflowEventSchema),
  approvalSteps: Joi.array()
    .min(1)
    .items(
      Joi.alternatives([
        Joi.object({
          type: Joi.string().valid('STANDARD'),
          ...approvalStepCommonProps,
          ...approvalStepNodeProps,
        }).required(),
        Joi.object({
          type: Joi.string().valid('CONCURRENT').required(),
          nodes: Joi.array()
            .items(Joi.object(approvalStepNodeProps).required())
            .min(1)
            .required(),
          ...approvalStepCommonProps,
        }).required(),
      ]),
    ),
  approvalConfiguration: Joi.object({
    defaultNotificationEmailElementId: Joi.string().guid(),
    sendNotificationEmailOptionDefaultUnchecked: Joi.boolean(),
    approveCannedResponses: cannedResponsesSchema,
    clarificationRequestCannedResponses: cannedResponsesSchema,
    denyCannedResponses: cannedResponsesSchema,
    autoDenyAfterClarificationRequest: Joi.object({
      days: Joi.number().integer().required(),
      notify: Joi.object({
        notes: Joi.string().required(),
        notificationEmailAddress: Joi.array().items(Joi.string().required()),
        cannedResponseKey: Joi.string(),
      }),
      internalNotes: Joi.string(),
    }),
    disallowApprovingWhenAwaitingClarification: Joi.boolean(),
    defaultPreventPaymentOnClarificationRequest: Joi.boolean(),
    approvalCreatedEmailTemplateId: Joi.number().integer(),
    clarificationRequestEmailTemplateId: Joi.number().integer(),
    approvedEmailTemplateId: Joi.number().integer(),
    deniedEmailTemplateId: Joi.number().integer(),
    pendingApprovalsReminder: Joi.object({
      daysInterval: Joi.number().integer().required(),
    }),
  }),
  postSubmissionAction: Joi.string()
    .required()
    .valid(...postSubmissionActions),
  redirectUrl: Joi.when('postSubmissionAction', {
    is: 'URL',
    then: Joi.string().required(),
    otherwise: Joi.any().strip(),
  }),
  postSubmissionReceipt: Joi.object({
    html: htmlString,
    allowPDFDownload: Joi.object(pdfSubmissionEventConfiguration),
    allowAttachmentsDownload: endpointConfigurationSchema,
  }),
  cancelAction: Joi.string()
    .default('BACK')
    .valid(...postSubmissionActions),
  cancelRedirectUrl: Joi.when('cancelAction', {
    is: 'URL',
    then: Joi.string().required(),
    otherwise: Joi.any().strip(),
  }),
  formsAppIds: Joi.array().items(Joi.number()).required(),
  // TAGS
  tags: Joi.array().default([]).items(Joi.string()),
  serverValidation: endpointConfigurationSchema,
  externalIdGenerationOnSubmit: externalIdGenerationSchema,
  personalisation: endpointConfigurationSchema,
  submissionTitle: Joi.string(),
  continueWithAutosave: Joi.boolean(),
  customCssClasses,
  pointAddressEnvironmentId: Joi.string(),
  pointAddressV3EnvironmentId: Joi.string().uuid(),
  sharepointIntegrationEntraApplicationId: Joi.string().uuid(),
  allowGeoscapeAddresses: Joi.boolean(),
  slug: Joi.string()
    .max(60)
    .regex(/^[a-z][a-z\d-]*$/),
  enableSubmission: Joi.object({
    requiresAllConditionalPredicates: Joi.boolean().default(false),
    conditionalPredicates: Joi.array()
      .min(1)
      .items(ConditionalPredicatesItemSchema)
      .required(),
  }),
  disableAutosave: Joi.boolean(),
  isArchived: Joi.boolean(),
  customPDFs: Joi.array()
    .unique('id')
    .items(
      Joi.object().keys({
        id: Joi.string().uuid().required(),
        label: Joi.string().required(),
        s3: s3ConfigurationSchema,
        mapping: Joi.array()
          .items(
            Joi.object({
              replaceableField: Joi.string().required(),
              font: Joi.string().valid(
                'Courier',
                'Courier-Bold',
                'Courier-Oblique',
                'Courier-BoldOblique',
                'Helvetica',
                'Helvetica-Bold',
                'Helvetica-Oblique',
                'Helvetica-BoldOblique',
                'Times-Roman',
                'Times-Bold',
                'Times-Italic',
                'Times-BoldItalic',
                'Symbol',
                'ZapfDingbats',
                'Brush Script MT Italic',
              ),
              ...generateFormWorkflowEventElementMappingKeys(
                'CustomPDFMappingSchema',
                [],
              ),
            }).id('CustomPDFMappingSchema'),
          )
          .required(),
      }),
    ),
  isAIBuilderSupported: Joi.boolean().default(false),
})

export const formEventTypes: SubmissionEventTypes.FormEventType[] = [
  ...formWorkflowEventTypes,
  ...paymentEventTypes,
  ...schedulingEventTypes,
]

export {
  formSchema,
  elementSchema,
  pageElementSchema,
  endpointConfigurationSchema,
}
