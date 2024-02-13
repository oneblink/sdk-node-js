import { FormTypes, SubmissionEventTypes } from '@oneblink/types'
import { z } from 'zod'
import { htmlString } from './common'
import FormElementSchema from './element-schema'
import {
  ConditionalPredicatesSchema,
  customCssClasses,
} from './property-schemas'
import PageElementSchema from './elements/PageElement'

const emailSchema = z.union([
  z.string().email(),
  z.string().regex(/^{ELEMENT:\S+}$/),
  z.string().regex(/^{USER:email}$/),
])

const endpointConfigurationCallbackSchema = z.object({
  type: z.literal('CALLBACK'),
  configuration: z.object({
    url: z.string().url(),
    secret: z.string().optional(),
  }),
})
const endpointConfigurationApiSchema = z.object({
  type: z.literal('ONEBLINK_API'),
  configuration: z.object({
    apiId: z.string(),
    apiEnvironment: z.string(),
    apiEnvironmentRoute: z.string(),
    secret: z.string().optional(),
  }),
})

const endpointConfigurationSchema = z.union([
  endpointConfigurationCallbackSchema,
  endpointConfigurationApiSchema,
])

const emailSubmissionEventConfiguration = {
  email: emailSchema.optional(),
  toEmail: emailSchema.array().optional(),
  ccEmail: emailSchema.array().optional(),
  bccEmail: emailSchema.array().optional(),
  emailSubjectLine: z
    .string()
    .nullish()
    .transform((value) => value ?? undefined),
  emailTemplate: z
    .object({
      id: z.number(),
      mapping: z
        .intersection(
          z.object({
            mustacheTag: z.string().regex(/^custom:\S+/),
          }),
          z.union([
            z.object({
              type: z.literal('FORM_ELEMENT'),
              formElementId: z.string().uuid(),
            }),
            z.object({
              type: z.literal('TEXT'),
              text: z.string(),
            }),
          ]),
        )
        .array(),
    })
    .optional(),
  emailAttachmentsEndpoint: endpointConfigurationSchema.optional(),
}

const approvalFormsInclusionConfiguration = {
  approvalFormsInclusion: z
    .union([
      z.object({
        value: z.literal('ALL'),
      }),
      z.object({
        value: z.literal('PARTIAL'),
        approvalStepLabels: z
          .string()
          .array()
          // TODO .unique()
          .min(1),
      }),
    ])
    .optional(),
}

const pdfSubmissionEventConfiguration = {
  pdfFileName: z
    .string()
    .nullish()
    .transform((value) => value ?? undefined),
  includeSubmissionIdInPdf: z.boolean().optional(),
  includeExternalIdInPdf: z.boolean().optional(),
  includePaymentInPdf: z.boolean().optional(),
  excludedElementIds: z
    .string()
    .uuid()
    .array()
    // TODO .unique()
    .optional()
    // .nullable()
    .transform((value) => (value === null ? undefined : value)),
  usePagesAsBreaks: z.boolean().optional(),
  excludedCSSClasses: z
    .string()
    //regex from here https://stackoverflow.com/a/449000
    .regex(/^-?[_a-z]+[_a-z0-9-]*$/i)
    .array()
    .optional()
    // .nullable()
    .transform((value) => (value === null ? undefined : value)),
  pdfSize: z.enum(['A4', 'Letter']).optional(),
  ...approvalFormsInclusionConfiguration,
}

const FormEventBaseSchema = z
  .object({
    label: z.string().optional(),
    isRetryable: z.boolean().optional(),
  })
  .and(
    z
      .union([
        z.object({
          conditionallyExecute: z.literal(false).optional(),
        }),
        z.object({
          conditionallyExecute: z.literal(true),
          requiresAllConditionallyExecutePredicates: z.boolean().default(false),
          conditionallyExecutePredicates: ConditionalPredicatesSchema,
        }),
      ])
      .transform((value) => ({
        ...value,
        conditionallyExecute: !!value.conditionallyExecute,
      })),
  )

const PaymentEventSchema = z
  .union([
    z.object({
      type: z.literal('CP_PAY'),
      configuration: z.object({
        elementId: z.string().uuid(),
        gatewayId: z.string().uuid(),
      }),
    }),
    z.object({
      type: z.literal('BPOINT'),
      configuration: z.object({
        elementId: z.string().uuid(),
        environmentId: z.string().uuid(),
        crn2: z.string().optional(),
        crn3: z.string().optional(),
      }),
    }),
    z.object({
      type: z.enum(['WESTPAC_QUICK_WEB', 'WESTPAC_QUICK_STREAM']),
      configuration: z.object({
        elementId: z.string().uuid(),
        environmentId: z.string().uuid(),
        customerReferenceNumber: z.string(),
      }),
    }),
    z.object({
      type: z.literal('NSW_GOV_PAY'),
      configuration: z.object({
        elementId: z.string().uuid(),
        primaryAgencyId: z.string().uuid(),
        productDescription: z.string().max(250),
        customerReference: z.string().max(250).optional(),
        subAgencyCode: z.string().optional(),
      }),
    }),
  ])
  .and(FormEventBaseSchema)

const SchedulingEventSchema: z.ZodType<
  SubmissionEventTypes.SchedulingSubmissionEvent,
  z.ZodTypeDef,
  unknown
> = z
  .object({
    type: z.literal('SCHEDULING'),
    configuration: z.object({
      nylasAccountId: z.string(),
      nylasSchedulingPageId: z.number(),
      nameElementId: z.string().uuid().optional(),
      emailElementId: z.string().uuid().optional(),
      emailDescription: z.string().optional(),
      ...pdfSubmissionEventConfiguration,
    }),
  })
  .and(FormEventBaseSchema)

const FreshdeskFieldMappingSchema: z.ZodType<
  SubmissionEventTypes.FreshdeskSubmissionEventFieldMapping,
  z.ZodTypeDef,
  unknown
> = z
  .object({
    freshdeskFieldName: z.string(),
  })
  .and(
    z.union([
      z.object({
        type: z.literal('FORM_FORM_ELEMENT'),
        formElementId: z.string().uuid(),
        mapping: z.lazy(() => FreshdeskFieldMappingSchema),
      }),
      z.object({
        type: z.literal('FORM_ELEMENT'),
        formElementId: z.string().uuid(),
      }),
      z.object({
        type: z.literal('VALUE'),
        value: z.union([z.string(), z.number(), z.boolean()]),
      }),
      z.object({
        type: z.literal('DEPENDENT_FIELD_VALUE'),
        dependentFieldValue: z.object({
          category: z.string(),
          subCategory: z.string(),
          item: z.string(),
        }),
      }),
      z.object({
        type: z.enum(['SUBMISSION_ID', 'EXTERNAL_ID']),
      }),
    ]),
  )

const WorkflowEventSchema: z.ZodType<
  SubmissionEventTypes.FormWorkflowEvent,
  z.ZodTypeDef,
  unknown
> = z
  .union([
    z.object({
      type: z.literal('CALLBACK'),
      configuration: z.object({
        url: z.string().url(),
        secret: z.string(),
      }),
    }),
    z.object({
      type: z.literal('POWER_AUTOMATE_FLOW'),
      configuration: z.object({
        url: z.string().url(),
      }),
    }),
    z.object({
      type: z.literal('PDF'),
      configuration: z.object({
        ...emailSubmissionEventConfiguration,
        ...pdfSubmissionEventConfiguration,
      }),
    }),
    z.object({
      type: z.literal('EMAIL'),
      configuration: z.object({
        ...emailSubmissionEventConfiguration,
        ...approvalFormsInclusionConfiguration,
      }),
    }),
    z.object({
      type: z.literal('ONEBLINK_API'),
      configuration: z.object({
        apiId: z.string(),
        apiEnvironment: z.string(),
        apiEnvironmentRoute: z.string(),
        secret: z.string(),
      }),
    }),
    z.object({
      type: z.literal('TRIM'),
      configuration: z.object({
        environmentId: z.string().uuid(),
        recordTitle: z
          .string()
          .nullable()
          .optional()
          .transform((value) => value ?? undefined),
        container: z.object({
          uri: z.number(),
          label: z.string(),
        }),
        recordType: z.object({
          uri: z.number(),
          label: z.string(),
        }),
        actionDefinition: z
          .object({
            uri: z.number(),
            label: z.string(),
          })
          .optional()
          .nullable()
          .transform((value) => value ?? undefined),
        location: z
          .object({
            uri: z.number(),
            label: z.string(),
          })
          .optional()
          .nullable()
          .transform((value) => value ?? undefined),
        author: z
          .object({
            uri: z.number(),
            label: z.string(),
          })
          .optional()
          .nullable()
          .transform((value) => value ?? undefined),
        groupFiles: z.boolean().default(false),
        ...pdfSubmissionEventConfiguration,
      }),
    }),
    z.object({
      type: z.literal('CP_HCMS'),
      configuration: z.object({
        contentTypeName: z
          .string()
          .regex(/^[a-z0-9-]+$/)
          .max(40),
        encryptedElementIds: z
          .string()
          .uuid()
          .array()
          // TODO .unique()
          .optional()
          .nullable()
          .transform((value) => value ?? undefined),
        tags: z
          .string()
          .array()
          // TODO .unique()
          .min(1),
        categories: z
          .object({
            id: z.string().uuid(),
            name: z.string(),
          })
          .array()
          // TODO .unique('id')
          .min(1),
        encryptPdf: z.boolean().default(false),
        ...pdfSubmissionEventConfiguration,
      }),
    }),
    z.object({
      type: z.literal('CIVICA_CRM'),
      configuration: z.object({
        environmentId: z.string().uuid(),
        civicaCustomerContactMethod: z.object({
          code: z.string(),
          description: z.string(),
        }),
        civicaCategory: z.object({
          id: z.number(),
          label: z.string(),
        }),
        mapping: z
          .object({
            civicaCategoryItemNumber: z.number(),
            formElementId: z.string().uuid(),
            isDescription: z.boolean().default(false),
          })
          .array()
          // TODO .unique('civicaCategoryItemNumber'),
          .min(1),
        ...pdfSubmissionEventConfiguration,
      }),
    }),
    z.object({
      type: z.literal('FRESHDESK_CREATE_TICKET'),
      configuration: z.object({
        mapping: FreshdeskFieldMappingSchema.array(),
        ...approvalFormsInclusionConfiguration,
      }),
    }),
    z.object({
      type: z.literal('FRESHDESK_ADD_NOTE_TO_TICKET'),
      configuration: z.object(approvalFormsInclusionConfiguration),
    }),
  ])
  .and(FormEventBaseSchema)

const externalIdGenerationSchema = z.union([
  endpointConfigurationCallbackSchema,
  endpointConfigurationApiSchema,
  z.object({
    type: z.literal('RECEIPT_ID'),
    configuration: z.object({
      receiptComponents: z
        .union([
          z.object({
            type: z.literal('text'),
            value: z.string(),
          }),
          z.object({
            type: z.literal('date'),
            format: z.enum(['dayOfMonth', 'monthNumber', 'yearShort', 'year']),
          }),
          z.object({
            type: z.literal('random'),
            length: z.number().min(1),
            numbers: z.boolean().default(false),
            uppercase: z.boolean().default(false),
            lowercase: z.boolean().default(false),
          }),
        ])
        .array(),
    }),
  }),
])

const cannedResponsesSchema = z
  .object({
    key: z.string(),
    label: z.string(),
    notes: z.string(),
  })
  .array()
  // TODO .unique('key')
  .min(1)
  .optional()

const NewFormSchema: z.ZodType<FormTypes.NewForm, z.ZodTypeDef, unknown> = z
  .object({
    formsAppEnvironmentId: z.number(),
    name: z.string(),
    description: z
      .string()
      .nullable()
      .optional()
      .transform((value) => value ?? ''),
    organisationId: z.string(),
    isAuthenticated: z.boolean().default(false),
    publishStartDate: z.string().optional(),
    publishEndDate: z.string().optional(),
    unpublishedUserMessage: z.string().optional(),
    // Form Events and Workflow
    draftEvents: WorkflowEventSchema.array().optional(),
    schedulingEvents: SchedulingEventSchema.array().optional(),
    paymentEvents: PaymentEventSchema.array().optional(),
    submissionEvents: WorkflowEventSchema.array()
      .nullable()
      .optional()
      .transform((value) => value || []),
    approvalEvents: WorkflowEventSchema.array().optional(),
    approvalSteps: z
      .object({
        label: z.string(),
        group: z.string(),
        approvalFormId: z.number().optional(),
        clarificationRequestEmailTemplateId: z.number().optional(),
      })
      .and(
        z.union([
          z.object({
            isConditional: z.literal(false).optional(),
          }),
          z.object({
            isConditional: z.literal(true),
            requiresAllConditionalPredicates: z.boolean().default(false),
            conditionalPredicates: ConditionalPredicatesSchema,
          }),
        ]),
      )
      .array()
      // TODO .unique('label')
      .min(1)
      .optional(),
    approvalConfiguration: z
      .object({
        defaultNotificationEmailElementId: z.string().uuid().optional(),
        approveCannedResponses: cannedResponsesSchema,
        clarificationRequestCannedResponses: cannedResponsesSchema,
        denyCannedResponses: cannedResponsesSchema,
        autoDenyAfterClarificationRequest: z
          .object({
            days: z.number().int(),
            notify: z
              .object({
                notes: z.string(),
                notificationEmailAddress: z.string().array().optional(),
                cannedResponseKey: z.string().optional(),
              })
              .optional(),
            internalNotes: z.string().optional(),
          })
          .optional(),
        disallowApprovingWhenAwaitingClarification: z.boolean().optional(),
        defaultPreventPaymentOnClarificationRequest: z.boolean().optional(),
        approvalCreatedEmailTemplateId: z.number().int().optional(),
        clarificationRequestEmailTemplateId: z.number().int().optional(),
        approvedEmailTemplateId: z.number().int().optional(),
        deniedEmailTemplateId: z.number().int().optional(),
      })
      .optional(),
    formsAppIds: z.number().array(),
    tags: z.string().array().default([]),
    serverValidation: endpointConfigurationSchema.optional(),
    externalIdGenerationOnSubmit: externalIdGenerationSchema.optional(),
    personalisation: endpointConfigurationSchema.optional(),
    submissionTitle: z.string().optional(),
    continueWithAutosave: z.boolean().optional(),
    customCssClasses,
  })
  .and(
    z.union([
      z.object({
        isMultiPage: z.literal(false).optional().default(false),
        elements: FormElementSchema.array(), // TODO .unique('id')
      }),
      z.object({
        isMultiPage: z.literal(true),
        elements: PageElementSchema.array(), // TODO .unique('id')
      }),
    ]),
  )
  .and(
    z.union([
      z.object({
        postSubmissionAction: z.literal('URL'),
        redirectUrl: z.string().url(), // TODO support relative URLs
      }),
      z.object({
        postSubmissionAction: z.enum(['BACK', 'CLOSE', 'FORMS_LIBRARY']),
        postSubmissionReceipt: z
          .object({
            html: htmlString.optional(),
            allowPDFDownload: z
              .object(pdfSubmissionEventConfiguration)
              .optional(),
          })
          .optional(),
      }),
    ]),
  )
  .and(
    z.union([
      z.object({
        cancelAction: z.literal('URL'),
        cancelRedirectUrl: z.string().url(), // TODO support relative URLs
      }),
      z.object({
        cancelAction: z
          .enum(['BACK', 'CLOSE', 'FORMS_LIBRARY'])
          .default('BACK'),
      }),
    ]),
  )

export { NewFormSchema, endpointConfigurationSchema, WorkflowEventSchema }
