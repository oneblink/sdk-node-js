// @flow
'use strict'

const Joi = require('joi')

const base64DataRegex = /<[^>]*src="data:([a-zA-Z]*)\/([a-zA-Z]*);base64,([^"]*)".*>/m

const elementTypes = [
  'camera',
  'checkboxes',
  'date',
  'datetime',
  'heading',
  'location',
  'number',
  'radio',
  'select',
  'draw',
  'text',
  'textarea',
  'time',
  'repeatableSet',
  'barcodeScanner',
  'html',
  'captcha',
  'email',
  'image',
  'file',
  'calculation',
  'telephone',
  'autocomplete',
  'form',
  'infoPage',
  'files',
  'summary',
]

const CUSTOM_OPTION_TYPE = 'CUSTOM'
const DYNAMIC_OPTION_TYPE = 'DYNAMIC'
const SEARCH_OPTION_TYPE = 'SEARCH'

const optionTypes = [CUSTOM_OPTION_TYPE, DYNAMIC_OPTION_TYPE]

const userInputTypes = [
  'checkboxes',
  'date',
  'datetime',
  'location',
  'number',
  'radio',
  'select',
  'text',
  'textarea',
  'time',
  'barcodeScanner',
  'email',
  'telephone',
  'autocomplete',
]

const ConditionalPredicatesItemsSchema = (
  subject /* : string */,
  action /* : string */,
) => {
  return Joi.object().keys({
    elementId: Joi.string()
      .guid()
      .required()
      .label(`${subject} - Conditionally ${action} Predicate - Element Id`),
    type: Joi.string()
      .default('OPTIONS')
      .label(`${subject} - Conditionally ${action} Predicate - Type`)
      .valid(['OPTIONS', 'NUMERIC', 'VALUE', 'BETWEEN']),
    optionIds: Joi.label(
      `${subject} - Conditionally ${action} Predicate - Option Ids`,
    ).when('type', {
      is: Joi.only('OPTIONS'),
      then: Joi.array().min(1).items(Joi.string()).required(),
      else: Joi.allow(null),
    }),
    operator: Joi.label(
      `${subject} - Conditionally ${action} Predicate - Operator`,
    ).when('type', {
      is: Joi.only('NUMERIC'),
      then: Joi.string().valid(['>', '>=', '===', '!==', '<=', '<']).required(),
      else: Joi.allow(null),
    }),
    value: Joi.label(
      `${subject} - Conditionally ${action} Predicate - Value`,
    ).when('type', {
      is: Joi.only('NUMERIC'),
      then: Joi.number().required(),
      else: Joi.allow(null),
    }),
    hasValue: Joi.label(
      `${subject} - Conditionally ${action} Predicate - Has Value`,
    ).when('type', {
      is: Joi.only('VALUE'),
      then: Joi.boolean().required(),
      else: Joi.allow(null),
    }),
    min: Joi.label(
      `${subject} - Conditionally ${action} Predicate - Between-Min`,
    ).when('type', {
      is: Joi.only('BETWEEN'),
      then: Joi.number().required(),
      else: Joi.any().strip(),
    }),
    max: Joi.label(
      `${subject} - Conditionally ${action} Predicate - Between-Max`,
    ).when('type', {
      is: Joi.only('BETWEEN'),
      then: Joi.number().required(),
      else: Joi.any().strip(),
    }),
  })
}
const ConditionallyShowPredicatesSchema = Joi.when('conditionallyShow', {
  is: true,
  then: Joi.array()
    .label('Form Element - Conditionally Show Predicates')
    .unique('elementId')
    .min(1)
    .items(ConditionalPredicatesItemsSchema('Form Element', 'Show'))
    .required(),
  otherwise: Joi.any().strip(),
})

const JoiRange = Joi.extend((joi) => ({
  base: joi.number(),
  name: 'range',
  language: {
    within: 'Must not exceed range of values {{min}} and {{max}}: ({{v}})',
  },
  rules: [
    {
      name: 'within',
      params: {
        options: joi.object({
          min: joi.func().ref(),
          max: joi.func().ref(),
        }),
      },
      validate(params, value, state, options) {
        const max = params.options.max.key
        const min = params.options.min.key
        const parent = state.parent
        const range = parent[max] - parent[min]
        if (value > range) {
          return this.createError(
            'range.within',
            { v: value, min: parent[min], max: parent[max] },
            state,
            options,
          )
        }
        return value
      },
    },
  ],
}))

const BaseSchema = Joi.object().keys({
  // Generic
  id: Joi.string().guid().required().label('Form Element - Id'),
  type: Joi.string()
    .required()
    .label('Form Element - Type')
    .valid(elementTypes),
  name: Joi.string().label('Form Element - Name').required(),
  label: Joi.when('type', {
    is: Joi.only(['form', 'infoPage']),
    then: Joi.any().strip(),
    otherwise: Joi.string().label('Form Element - Label').required(),
  }),
  required: Joi.when('type', {
    is: Joi.only(['form', 'infoPage', 'files']),
    then: Joi.any().strip(),
    otherwise: Joi.bool().default(false).label('Form Element - Required'),
  }),
  readOnly: Joi.when('type', {
    is: Joi.only(['form', 'infoPage']),
    then: Joi.any().strip(),
    otherwise: Joi.bool().default(false).label('Form Element - Read Only'),
  }),
  conditionallyShow: Joi.bool()
    .default(false)
    .label('Form Element - Conditionally Show'),
  requiresAllConditionallyShowPredicates: Joi.when('conditionallyShow', {
    is: true,
    then: Joi.bool()
      .default(false)
      .label(
        'Form Element - Requires All Conditionally Show Predicates are Met',
      ),
    otherwise: Joi.any().strip(),
  }),
  conditionallyShowPredicates: ConditionallyShowPredicatesSchema,
  defaultValue: Joi.allow(null)
    .label('Form Element - Default Value')
    .when('type', {
      is: Joi.only(['barcodeScanner', 'telephone']),
      then: Joi.string(),
    })
    .when('type', {
      is: Joi.only(['text', 'textarea']),
      then: Joi.when('minLength', {
        is: Joi.number().required(),
        then: Joi.string().when('maxLength', {
          is: Joi.number().required(),
          then: Joi.string()
            .min(Joi.ref('minLength'))
            .max(Joi.ref('maxLength')),
          otherwise: Joi.string().min(Joi.ref('minLength')),
        }),
      })
        .when('maxLength', {
          is: Joi.number().required(),
          then: Joi.string().max(Joi.ref('maxLength')),
          otherwise: Joi.string(),
        })
        .label('Form Element - Default Value'),
    })
    .when('type', {
      is: Joi.only(['html', 'calculation']),
      then: Joi.string().required().regex(base64DataRegex, {
        name: 'No Binary Data',
        invert: true,
      }),
    })
    .when('type', {
      is: 'image',
      then: Joi.string().required().uri(),
    })
    .when('type', {
      is: 'number',
      then: Joi.number()
        .label('Form Element - Default Value')
        .when('minNumber', {
          is: Joi.number().required(),
          then: Joi.number().min(Joi.ref('minNumber')),
        })
        .when('maxNumber', {
          is: Joi.number().required(),
          then: Joi.number().max(Joi.ref('maxNumber')),
        }),
    })
    .when('type', {
      is: Joi.only(['date', 'datetime', 'time']),
      // This looks messy in order to keep the proper error messages intact when 'NOW' string option was added
      then: Joi.when(Joi.date().iso(), {
        then: Joi.when('fromDate', {
          is: Joi.date().iso().required(),
          then: Joi.date().iso().min(Joi.ref('fromDate')),
        }).when('toDate', {
          is: Joi.date().iso().required(),
          then: Joi.date().iso().max(Joi.ref('toDate')),
        }),
        otherwise: Joi.only(['NOW']).error(() => {
          return {
            message:
              '"Form Element - Default Date Value" must be a valid ISO 8601 date or the string "NOW"',
          }
        }),
      }).label('Form Element - Default Date Value'),
    })
    .when('type', {
      is: 'radio',
      then: Joi.when('optionsType', {
        is: Joi.invalid(DYNAMIC_OPTION_TYPE),
        then: Joi.string().guid().label('Form Element - Default Value'),
        otherwise: Joi.string().label('Form Element - Default Value'),
      }),
    })
    .when('type', {
      is: 'checkboxes',
      then: Joi.when('optionsType', {
        is: Joi.invalid(DYNAMIC_OPTION_TYPE),
        then: Joi.array()
          .items(Joi.string().guid())
          .label('Form Element - Default Value'),
        otherwise: Joi.array()
          .items(Joi.string())
          .label('Form Element - Default Value'),
      }),
    })
    .when('type', {
      is: 'autocompelete',
      then: Joi.when('optionsType', {
        is: Joi.invalid(DYNAMIC_OPTION_TYPE),
        then: Joi.string().guid().label('Form Element - Default Value'),
        otherwise: Joi.string().label('Form Element - Default Value'),
      }),
    })
    .when('type', {
      is: 'select',
      then: Joi.when('multi', {
        is: true,
        then: Joi.when('optionsType', {
          is: Joi.invalid(DYNAMIC_OPTION_TYPE),
          then: Joi.array()
            .items(Joi.string().guid())
            .label('Form Element - Default Value'),
          otherwise: Joi.array()
            .items(Joi.string())
            .label('Form Element - Default Value'),
        }),
        otherwise: Joi.when('optionsType', {
          is: Joi.invalid(DYNAMIC_OPTION_TYPE),
          then: Joi.string().guid().label('Form Element - Default Value'),
          otherwise: Joi.string().label('Form Element - Default Value'),
        }),
      }),
    })
    .when('type', {
      is: 'email',
      then: Joi.string().email().label('Form Element - Default Email Value'),
    }),
  // Radio buttons
  buttons: Joi.when('type', {
    is: Joi.only(['radio', 'checkboxes']),
    then: Joi.boolean()
      .label('Form Element - Radio Buttons as Buttons')
      .default(false),
    otherwise: Joi.any().strip(),
  }),
  // Select
  multi: Joi.when('type', {
    is: 'select',
    then: Joi.boolean().label('Form Element - Multi Select').default(false),
    otherwise: Joi.any().strip(),
  }),

  // Number
  isSlider: Joi.when('type', {
    is: 'number',
    then: Joi.boolean()
      .label('Form Element - Display Number as Slider')
      .default(false),
    otherwise: Joi.any().strip(),
  }),
  sliderIncrement: Joi.when('isSlider', {
    is: true,
    then: JoiRange.range()
      .within({ min: Joi.ref('minNumber'), max: Joi.ref('maxNumber') })
      .label('Form Element - Slider Increment'),
    else: Joi.any().strip(),
  }),
  minNumber: Joi.number()
    .allow(null)
    .label('Form Element - Minimum Number')
    .when('type', {
      is: Joi.not('number'),
      then: Joi.any().strip(),
    })
    .when('isSlider', {
      is: true,
      then: Joi.required(),
    }),
  maxNumber: Joi.number()
    .label('Form Element - Maximum Number')
    .when('type', {
      is: Joi.not('number'),
      then: Joi.any().strip(),
    })
    .when('minNumber', {
      is: Joi.number().required(),
      then: Joi.number().min(Joi.ref('minNumber')),
    })
    .when('isSlider', {
      is: true,
      then: Joi.required(),
    }),
  minLength: Joi.number()
    .label('Form Element - Minimum Length')
    .when('type', {
      is: Joi.not(['text', 'textarea']),
      then: Joi.any().strip(),
    }),
  maxLength: Joi.number()
    .label('Form Element - Maximum Length')
    .when('type', {
      is: Joi.not(['text', 'textarea']),
      then: Joi.any().strip(),
    })
    .when('minLength', {
      is: Joi.number().required(),
      then: Joi.number().min(Joi.ref('minLength')),
    }),
  // Heading
  headingType: Joi.when('type', {
    is: Joi.only('heading'),
    then: Joi.number()
      .required()
      .label('Form Element - Heading Size')
      .valid([1, 2, 3, 4, 5]),
    otherwise: Joi.any().strip(),
  }),

  // Date and Date+Time
  fromDate: Joi.when('type', {
    is: Joi.only(['date', 'datetime']),
    then: Joi.date().iso().label('Form Element - From Date').allow(null),
    otherwise: Joi.any().strip(),
  }),
  toDate: Joi.when('type', {
    is: Joi.only(['date', 'datetime']),
    then: Joi.when('fromDate', {
      is: Joi.date().iso().required().label('Form Element - To Date'),
      then: Joi.date()
        .iso()
        .min(Joi.ref('fromDate'))
        .label('Form Element - To Date'),
    }).allow(null),
    otherwise: Joi.any().strip(),
  }),
  // Checkboxes, selects, radio and autocomplete
  optionsType: Joi.when('type', {
    is: Joi.only(['checkboxes', 'radio', 'select', 'autocomplete']),
    then: Joi.string()
      .label('Form Element - Options type')
      .default(CUSTOM_OPTION_TYPE)
      .when('type', {
        is: 'autocomplete',
        then: Joi.valid([...optionTypes, SEARCH_OPTION_TYPE]),
        otherwise: Joi.valid(optionTypes),
      }),
    otherwise: Joi.any().strip(),
  }),
  dynamicOptionSetId: Joi.when('optionsType', {
    is: DYNAMIC_OPTION_TYPE,
    then: Joi.number().label('Form Element - Dynamic Option Set Id').required(),
    otherwise: Joi.any().strip(),
  }),
  options: Joi.when('optionsType', {
    is: CUSTOM_OPTION_TYPE,
    then: Joi.array()
      .label('Form Element - Options')
      .unique('id')
      .items(
        Joi.object().keys({
          id: Joi.string().guid().required().label('Form Element - Option Id'),
          value: Joi.string().required().label('Form Element - Option Value'),
          label: Joi.string().required().label('Form Element - Option Label'),
          colour: Joi.string()
            .allow([null, ''])
            .regex(/^#[A-Fa-f0-9]{3}([A-Fa-f0-9]{3})?$/)
            .label('Form Element - Option Colour'),
          attributes: Joi.array().items(
            Joi.object().keys({
              optionIds: Joi.array()
                .required()
                .items(Joi.string())
                .label('Form Element - Attributes Mapping - Element Id'),
              elementId: Joi.string()
                .guid()
                .required()
                .label('Form Element - Option Value - Attribute Option Id'),
            }),
          ),
        }),
      )
      .required(),
    otherwise: Joi.any().strip(),
  }),
  attributesMapping: Joi.when('optionsType', {
    is: DYNAMIC_OPTION_TYPE,
    then: Joi.array().items(
      Joi.object().keys({
        elementId: Joi.string()
          .guid()
          .required()
          .label('Form Element - Option Value - Attribute Element Id'),
        attribute: Joi.string()
          .required()
          .label('Form Element - Attributes Mapping - Attribute'),
      }),
    ),
    otherwise: Joi.any().strip(),
  }),
  conditionallyShowOptions: Joi.when('type', {
    is: Joi.only(['checkboxes', 'radio', 'select', 'autocomplete']),
    then: Joi.boolean()
      .label('Form Element - conditionallyShowOptionsElementIds')
      .default(false),
    otherwise: Joi.any().strip(),
  }),
  conditionallyShowOptionsElementIds: Joi.when('optionsType', {
    is: CUSTOM_OPTION_TYPE,
    then: Joi.array().items(
      Joi.string()
        .guid()
        .required()
        .label('Form Element - Attributes Mapping - Element Id'),
    ),
    otherwise: Joi.any().strip(),
  }),

  // repeatableSet
  minSetEntries: Joi.when('type', {
    is: Joi.only('repeatableSet'),
    then: Joi.number()
      .min(0)
      .label('Form Element - Minimum number of repeatable set entries'),
    otherwise: Joi.any().strip(),
  }),
  maxSetEntries: Joi.when('type', {
    is: Joi.only('repeatableSet'),
    then: Joi.number()
      .label('Form Element - Maximum number of repeatable set entries')
      .when('minSetEntries', {
        is: Joi.number().required().min(0),
        then: Joi.number().min(Joi.ref('minSetEntries')),
        otherwise: Joi.number().min(0),
      }),
    otherwise: Joi.any().strip(),
  }),
  addSetEntryLabel: Joi.string().when('type', {
    is: Joi.only('repeatableSet'),
    then: Joi.string().label('Form Element - Add repeatable set entry label'),
    otherwise: Joi.any().strip(),
  }),
  removeSetEntryLabel: Joi.when('type', {
    is: Joi.only('repeatableSet'),
    then: Joi.string().label(
      'Form Element - Remove repeatable set entry label',
    ),
    otherwise: Joi.any().strip(),
  }),
  elements: Joi.when('type', {
    is: Joi.only('repeatableSet'),
    then: Joi.array()
      .items(Joi.lazy(() => BaseSchema))
      .required()
      .min(1)
      .unique('name', { ignoreUndefined: true })
      .unique('id')
      .label('Form Element - Repeatable Set - Elements'),
    otherwise: Joi.any().strip(),
  }),

  // Barcode Scanner
  restrictBarcodeTypes: Joi.when('type', {
    is: Joi.only('barcodeScanner'),
    then: Joi.boolean()
      .default(false)
      .label('Form Element - Barcode Scanner - restrictBarcodeTypes'),
    otherwise: Joi.any().strip(),
  }),
  restrictedBarcodeTypes: Joi.when('type', {
    is: Joi.only('barcodeScanner'),
    then: Joi.when('restrictBarcodeTypes', {
      is: true,
      then: Joi.array()
        .items(Joi.string())
        .label('Form Element - Barcode Scanner - restrictedBarcodeTypes')
        .required(),
      otherwise: Joi.any().strip(),
    }),
    otherwise: Joi.any().strip(),
  }),

  // calculation
  calculation: Joi.when('type', {
    is: Joi.only('calculation'),
    then: Joi.string()
      .label('Form Element - Calculation - calculation')
      .required(),
    otherwise: Joi.any().strip(),
  }),
  preCalculationDisplay: Joi.when('type', {
    is: Joi.only('calculation'),
    then: Joi.string()
      .label('Form Element - Pre Calculation Display')
      .allow(null)
      .regex(base64DataRegex, {
        name: 'No Binary Data',
        invert: true,
      }),
    otherwise: Joi.any().strip(),
  }),

  // Data lookup configuration
  isDataLookup: Joi.when('type', {
    is: Joi.only(userInputTypes),
    then: Joi.boolean().default(false).label('Data Lookup enabled'),
    otherwise: Joi.any().strip(),
  }),
  dataLookupId: Joi.when('type', {
    is: Joi.only(userInputTypes),
    then: Joi.when('isDataLookup', {
      is: true,
      then: Joi.number().required().label('Data Lookup Id'),
      otherwise: Joi.any().strip(),
    }),
    otherwise: Joi.any().strip(),
  }),

  // Element lookup configuration
  isElementLookup: Joi.when('type', {
    is: Joi.only(userInputTypes),
    then: Joi.boolean().default(false).label('Element Lookup enabled'),
    otherwise: Joi.any().strip(),
  }),
  elementLookupId: Joi.when('type', {
    is: Joi.only(userInputTypes),
    then: Joi.when('isElementLookup', {
      is: true,
      then: Joi.number().required().label('Element Lookup Id'),
      otherwise: Joi.any().strip(),
    }),
    otherwise: Joi.any().strip(),
  }),

  // form and infoPage
  formId: Joi.when('type', {
    is: ['form', 'infoPage'],
    then: Joi.number().label('Form Id').required(),
    otherwise: Joi.any().strip(),
  }),

  // autocomplete with SEARCH option type
  searchUrl: Joi.when('type', {
    is: 'autocomplete',
    then: Joi.when('optionsType', {
      is: SEARCH_OPTION_TYPE,
      then: Joi.string().required().label('Search URL'),
      otherwise: Joi.any().strip(),
    }),
    otherwise: Joi.any().strip(),
  }),

  // file and files
  restrictFileTypes: Joi.when('type', {
    is: Joi.only(['file', 'files']),
    then: Joi.boolean().label('Restrict File Types').default(false),
    otherwise: Joi.any().strip(),
  }),
  restrictedFileTypes: Joi.when('type', {
    is: Joi.only(['file', 'files']),
    then: Joi.when('restrictFileTypes', {
      is: Joi.only(true),
      then: Joi.array()
        .items(Joi.string().label('restricted file type'))
        .required()
        .label('Restricted File Types'),
      otherwise: Joi.any().strip(),
    }),
    otherwise: Joi.any().strip(),
  }),
  minEntries: Joi.when('type', {
    is: Joi.only('files'),
    then: Joi.number().min(0).label('Form Element - Minimum number of files'),
    otherwise: Joi.any().strip(),
  }),
  maxEntries: Joi.when('type', {
    is: Joi.only('files'),
    then: Joi.number()
      .label('Form Element - Maximum number of files')
      .when('minEntries', {
        is: Joi.number().required().min(0),
        then: Joi.number().min(Joi.ref('minEntries')),
        otherwise: Joi.number().min(0),
      }),
    otherwise: Joi.any().strip(),
  }),
  // SUMMARY
  elementIds: Joi.when('type', {
    is: 'summary',
    then: Joi.array()
      .required()
      .label('Form Element - Summarised Element ID')
      .min(1)
      .items(Joi.string().uuid().required()),
    otherwise: Joi.any().strip(),
  }),
  // PLACEHOLDER
  placeholderValue: Joi.when('type', {
    is: Joi.only([
      'text',
      'textarea',
      'number',
      'email',
      'telephone',
      'autocomplete',
      'barcodeScanner',
      'date',
      'datetime',
      'time',
    ]),
    then: Joi.string().label('Form Element placeholder value'),
    otherwise: Joi.any().strip(),
  }),
})

const SubmissionEventsSchema = Joi.object().keys({
  isDraft: Joi.boolean().default(false),
  type: Joi.string()
    .required()
    .label('Form Submission Event - Type')
    .valid([
      'CALLBACK',
      'PDF',
      'SPOTTO',
      'ONEBLINK_API',
      'TRIM',
      'CP_PAY',
      'CP_HCMS',
      'BPOINT',
    ]),
  configuration: Joi.allow(null)
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
          .allow([null, ''])
          .label('Form Submission Event - PDF File Name'),
        emailSubjectLine: Joi.string()
          .allow([null, ''])
          .label('Form Submission Event - Email Subject Line'),
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
        recordTitle: Joi.string().allow([null, '']),
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
      }),
    })
    .when('type', {
      is: 'BPOINT',
      then: Joi.object().keys({
        elementId: Joi.string().uuid().required(),
        environmentId: Joi.string().uuid().required(),
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
      .label('Form Submission Event - Conditionally Execute Predicates')
      .unique('elementId')
      .min(1)
      .items(
        ConditionalPredicatesItemsSchema('Form Submission Event', 'Execute'),
      )
      .required(),
    otherwise: Joi.any().strip(),
  }),
  // ADD CONDITIONALS
})

const PageSchema = Joi.object().keys({
  id: Joi.string().guid().required().label('Form Element - Id'),
  label: Joi.string().required().label('Form Element - Label'),
  type: Joi.only('page'),
  conditionallyShow: Joi.bool()
    .default(false)
    .label('Form Element - Conditionally Show'),
  conditionallyShowPredicates: ConditionallyShowPredicatesSchema,
  requiresAllConditionallyShowPredicates: Joi.bool()
    .default(false)
    .label('Form Element - Requires All Conditionally Show Predicates are Met'),
  elements: Joi.array()
    .label('Form Element - Page - Elements')
    .required()
    .items(BaseSchema)
    .min(1)
    .unique('name', { ignoreUndefined: true })
    .unique('id'),
})

module.exports = {
  formSchema: Joi.object().keys({
    id: Joi.number(),
    formsAppEnvironmentId: Joi.number().label('Environment').required(),
    name: Joi.string().label('Name').required(),
    description: Joi.string().label('Description').allow('').allow(null),
    organisationId: Joi.string().label('Organisation').required(),
    elements: Joi.array()
      .label('Form Elements')
      .when('isMultiPage', {
        is: false,
        then: Joi.array()
          .required()
          .items(BaseSchema)
          .unique('name', { ignoreUndefined: true })
          .unique('id'),
        otherwise: Joi.array().items(PageSchema),
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
      .valid(['URL', 'CLOSE', 'FORMS_LIBRARY']),
    redirectUrl: Joi.when('postSubmissionAction', {
      is: 'URL',
      then: Joi.string().required().label('Post Submission Redirect URL'),
      otherwise: Joi.any().strip(),
    }),
    isInfoPage: Joi.bool().default(false).label('Form Information Page'),
    formsAppIds: Joi.array()
      .items(Joi.number())
      .required()
      .label('Associated Forms Apps'),
    createdAt: Joi.string().label('Date Created').allow('').allow(null),
    updatedAt: Joi.string().label('Date Updated').allow('').allow(null),
    // TAGS
    tags: Joi.array().default([]).label('Form Tags').items(Joi.string()),
  }),
  elementSchema: BaseSchema,
  pageElementSchema: PageSchema,
}
