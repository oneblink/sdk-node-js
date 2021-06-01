import Joi from 'joi'
import elementSchema from './element-schema'
import {
  conditionallyShowPredicates,
  ConditionalPredicatesItemSchema,
} from './property-schemas'
const postSubmissionActions = ['BACK', 'URL', 'CLOSE', 'FORMS_LIBRARY']

const SubmissionEventsSchema = Joi.object().keys({
  isDraft: Joi.boolean().default(false),
  type: Joi.string()
    .required()
    .label('Form Submission Event - Type')
    .valid(
      'CALLBACK',
      'PDF',
      'ONEBLINK_API',
      'TRIM',
      'CP_PAY',
      'CP_HCMS',
      'BPOINT',
    ),
  configuration: Joi.object()
    .required()
    .label('Form Submission Event - Configuration')
    .when('type', {
      is: 'CALLBACK',
      then: Joi.object().keys({
        url: Joi.string()
          .uri()
          .required()
          .label('Form Submission Event - Callback Url'),
        secret: Joi.string()
          .required()
          .label('Form Submission Event - Callback Secret'),
      }),
    })
    .when('type', {
      is: 'PDF',
      then: Joi.object().keys({
        email: Joi.alternatives([
          Joi.string()
            .email()
            .required()
            .label('Form Submission Event - Email Address'),
          Joi.string()
            .regex(/^{ELEMENT:\S+}$/)
            .required()
            .label('Form Submission Event - Email Address'),
        ]),
        pdfFileName: Joi.string()
          .allow(null, '')
          .label('Form Submission Event - PDF File Name'),
        emailSubjectLine: Joi.string()
          .allow(null, '')
          .label('Form Submission Event - Email Subject Line'),
        includeSubmissionIdInPdf: Joi.boolean().label(
          'Form Submission Event - Include Submission ID',
        ),
        excludedElementIds: Joi.array()
          .items(Joi.string().guid())
          .unique()
          .allow(null)
          .default([])
          .label('Form Submission Event - Excludeded element ids'),
      }),
    })
    .when('type', {
      is: 'ONEBLINK_API',
      then: Joi.object().keys({
        apiId: Joi.string()
          .required()
          .label('Form Submission Event - API Instance'),
        apiEnvironment: Joi.string()
          .required()
          .label('Form Submission Event - API Environment'),
        apiEnvironmentRoute: Joi.string()
          .required()
          .label('Form Submission Event - API Environment Route'),
        secret: Joi.string()
          .required()
          .label('Form Submission Event - Callback Secret'),
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
        includeSubmissionIdInPdf: Joi.boolean().label(
          'Form Submission Event - Include Submission ID',
        ),
        author: Joi.object()
          .keys({
            uri: Joi.number().required(),
            label: Joi.string().required(),
          })
          .allow(null),
      }),
    })
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
      is: 'CP_PAY',
      then: Joi.object().keys({
        elementId: Joi.string().uuid().required(),
        gatewayId: Joi.string().uuid().required(),
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
      }),
    }),
  conditionallyExecute: Joi.bool()
    .default(false)
    .label('Form Submission Event - Conditionally Execute'),
  requiresAllConditionallyExecutePredicates: Joi.bool()
    .default(false)
    .label(
      'Form Submission Event - Requires All Conditionally Execute Predicates are Met',
    ),
  conditionallyExecutePredicates: Joi.when('conditionallyExecute', {
    is: true,
    then: Joi.array()
      .unique('elementId')
      .min(1)
      .items(ConditionalPredicatesItemSchema)
      .required(),
    otherwise: Joi.any().strip(),
  }),
})

const pageElementSchema = Joi.object().keys({
  id: Joi.string().guid().required().label('Form Element - Id'),
  label: Joi.string().required().label('Form Element - Label'),
  type: Joi.valid('page'),
  conditionallyShow: Joi.bool()
    .default(false)
    .label('Form Element - Conditionally Show'),
  conditionallyShowPredicates: conditionallyShowPredicates,
  requiresAllConditionallyShowPredicates: Joi.bool()
    .default(false)
    .label('Form Element - Requires All Conditionally Show Predicates are Met'),
  elements: Joi.array()
    .label('Form Element - Page - Elements')
    .required()
    .items(elementSchema)
    .min(1)
    .unique('name', { ignoreUndefined: true })
    .unique('id'),
})

const formSchema = Joi.object().keys({
  id: Joi.number(),
  formsAppEnvironmentId: Joi.number().label('Environment').required(),
  name: Joi.string().label('Name').required(),
  description: Joi.string().label('Description').allow('', null),
  organisationId: Joi.string().label('Organisation').required(),
  elements: Joi.array()
    .label('Form Elements')
    .when('isMultiPage', {
      is: false,
      then: Joi.array()
        .required()
        .items(elementSchema)
        .unique('name', { ignoreUndefined: true })
        .unique('id'),
      otherwise: Joi.array().items(pageElementSchema),
    }),
  isMultiPage: Joi.bool().default(false).label('Form Is Multi Page'),
  isAuthenticated: Joi.bool().default(false).label('Form Authentication'),
  publishStartDate: Joi.string().isoDate().label('Publish Start Date'),
  publishEndDate: Joi.string().isoDate().label('Publish End Date'),
  submissionEvents: Joi.array()
    .allow(null)
    .label('Submission Events')
    .items(SubmissionEventsSchema),
  postSubmissionAction: Joi.string()
    .label('Post Submission Action')
    .required()
    .valid(...postSubmissionActions),
  redirectUrl: Joi.when('postSubmissionAction', {
    is: 'URL',
    then: Joi.string().required().label('Post Submission Redirect URL'),
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
  isInfoPage: Joi.bool().default(false).label('Form Information Page'),
  formsAppIds: Joi.array()
    .items(Joi.number())
    .required()
    .label('Associated Forms Apps'),
  createdAt: Joi.string().label('Date Created').allow('', null),
  updatedAt: Joi.string().label('Date Updated').allow('', null),
  // TAGS
  tags: Joi.array().default([]).label('Form Tags').items(Joi.string()),
})

export { formSchema, elementSchema, pageElementSchema }
