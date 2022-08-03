import Joi from 'joi'
import elementSchema from './element-schema'
import {
  conditionallyShowPredicates,
  ConditionalPredicatesItemSchema,
} from './property-schemas'
const postSubmissionActions = ['BACK', 'URL', 'CLOSE', 'FORMS_LIBRARY']
const emailSubmissionEventConfiguration = {
  email: Joi.alternatives([
    Joi.string().email().required(),
    Joi.string()
      .regex(/^{ELEMENT:\S+}$/)
      .required(),
  ]),
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

const pdfSubmissionEventConfiguration = {
  pdfFileName: Joi.string().allow(null, ''),
  includeSubmissionIdInPdf: Joi.boolean(),
  includePaymentInPdf: Joi.boolean(),
  excludedElementIds: Joi.array()
    .items(Joi.string().guid())
    .unique()
    .allow(null)
    .default([]),
  usePagesAsBreaks: Joi.boolean(),
  ...approvalFormsInclusionConfiguration,
}

const formEventConditionalSchemas = {
  conditionallyExecute: Joi.bool().default(false),
  requiresAllConditionallyExecutePredicates: Joi.bool().default(false),
  conditionallyExecutePredicates: Joi.when('conditionallyExecute', {
    is: true,
    then: Joi.array()
      .unique('elementId')
      .min(1)
      .items(ConditionalPredicatesItemSchema)
      .required(),
    otherwise: Joi.any().strip(),
  }),
}

export const PaymentEventSchema = Joi.object({
  type: Joi.string().required().valid('CP_PAY', 'BPOINT', 'WESTPAC_QUICK_WEB'),
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
      is: 'WESTPAC_QUICK_WEB',
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
    }),
  ...formEventConditionalSchemas,
})
export const SchedulingEventSchema = Joi.object({
  type: Joi.string().required().valid('SCHEDULING'),
  configuration: Joi.object()
    .required()
    .when('type', {
      is: 'SCHEDULING',
      then: Joi.object().keys({
        nylasAccountId: Joi.string().required(),
        nylasSchedulingPageId: Joi.number().required(),
        nameElementId: Joi.string().guid(),
        emailElementId: Joi.string().guid(),
        emailDescription: Joi.string(),
        ...pdfSubmissionEventConfiguration,
      }),
    }),
  ...formEventConditionalSchemas,
})
export const WorkflowEventSchema = Joi.object().keys({
  type: Joi.string()
    .required()
    .valid(
      'CALLBACK',
      'POWER_AUTOMATE_FLOW',
      'PDF',
      'EMAIL',
      'ONEBLINK_API',
      'TRIM',
      'CP_HCMS',
      'CIVICA_CRM',
      'FRESHDESK_CREATE_TICKET',
      'FRESHDESK_ADD_NOTE_TO_TICKET',
    ),
  configuration: Joi.object()
    .required()
    .when('type', {
      is: 'CALLBACK',
      then: Joi.object().keys({
        url: Joi.string().uri().required(),
        secret: Joi.string().required(),
      }),
    })
    .when('type', {
      is: 'POWER_AUTOMATE_FLOW',
      then: Joi.object().keys({
        url: Joi.string().uri().required(),
      }),
    })
    .when('type', {
      is: 'EMAIL',
      then: Joi.object().keys({
        ...emailSubmissionEventConfiguration,
        ...approvalFormsInclusionConfiguration,
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
        secret: Joi.string().required(),
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
        actionDefinition: Joi.object().keys({
          uri: Joi.number().required(),
          label: Joi.string().required(),
        }),
        location: Joi.object().keys({
          uri: Joi.number().required(),
          label: Joi.string().required(),
        }),
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
        encryptPdf: Joi.boolean().default(false),
        ...pdfSubmissionEventConfiguration,
      }),
    })
    .when('type', {
      is: 'FRESHDESK_CREATE_TICKET',
      then: Joi.object().keys({
        mapping: Joi.array().items(
          Joi.object().keys({
            freshdeskFieldName: Joi.string().required(),
            type: Joi.string()
              .valid('FORM_ELEMENT', 'VALUE', 'DEPENDENT_FIELD_VALUE')
              .required(),
            formElementId: Joi.when('type', {
              is: 'FORM_ELEMENT',
              then: Joi.string().uuid().required(),
              otherwise: Joi.any().strip(),
            }),
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
            value: Joi.when('type', {
              is: 'VALUE',
              then: Joi.alternatives().try(
                Joi.string(),
                Joi.number(),
                Joi.boolean(),
              ),
              otherwise: Joi.any().strip(),
            }),
          }),
        ),
        ...approvalFormsInclusionConfiguration,
      }),
    })
    .when('type', {
      is: 'FRESHDESK_ADD_NOTE_TO_TICKET',
      then: Joi.object().keys(approvalFormsInclusionConfiguration),
    }),
  ...formEventConditionalSchemas,
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

const apiRequestSchema = Joi.object({
  type: Joi.string().required().valid('CALLBACK', 'ONEBLINK_API'),
  configuration: Joi.object()
    .required()
    .when('type', {
      is: 'CALLBACK',
      then: Joi.object({
        url: Joi.string().uri().required(),
      }),
    })
    .when('type', {
      is: 'ONEBLINK_API',
      then: Joi.object({
        apiId: Joi.string().required(),
        apiEnvironment: Joi.string().required(),
        apiEnvironmentRoute: Joi.string().required(),
      }),
    }),
})

const formSchema = Joi.object().keys({
  id: Joi.number(),
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
  // Form Events and Workflow
  draftEvents: Joi.array().items(WorkflowEventSchema),
  schedulingEvents: Joi.array().items(SchedulingEventSchema),
  paymentEvents: Joi.array().items(PaymentEventSchema),
  submissionEvents: Joi.array().allow(null).items(WorkflowEventSchema),
  approvalEvents: Joi.array().items(WorkflowEventSchema),
  approvalSteps: Joi.array()
    .min(1)
    .unique('label')
    .items(
      Joi.object()
        .required()
        .keys({
          label: Joi.string().required(),
          group: Joi.string().required(),
          isConditional: Joi.boolean().default(false),
          requiresAllConditionalPredicates: Joi.boolean().default(false),
          conditionalPredicates: Joi.when('isConditional', {
            is: true,
            then: Joi.array()
              .unique('elementId')
              .min(1)
              .items(ConditionalPredicatesItemSchema)
              .required(),
            otherwise: Joi.any().strip(),
          }),
          approvalFormId: Joi.number(),
          clarificationRequestEmailTemplateId: Joi.number(),
        }),
    ),

  postSubmissionAction: Joi.string()
    .required()
    .valid(...postSubmissionActions),
  redirectUrl: Joi.when('postSubmissionAction', {
    is: 'URL',
    then: Joi.string().required(),
    otherwise: Joi.any().strip(),
  }),
  cancelAction: Joi.string()
    .default('BACK')
    .valid(...postSubmissionActions),
  cancelRedirectUrl: Joi.when('cancelAction', {
    is: 'URL',
    then: Joi.string().required(),
    otherwise: Joi.any().strip(),
  }),
  isInfoPage: Joi.bool().default(false),
  formsAppIds: Joi.array().items(Joi.number()).required(),
  createdAt: Joi.string().allow('', null),
  updatedAt: Joi.string().allow('', null),
  // TAGS
  tags: Joi.array().default([]).items(Joi.string()),
  serverValidation: apiRequestSchema,
  externalIdGeneration: apiRequestSchema,
})

export { formSchema, elementSchema, pageElementSchema, apiRequestSchema }
