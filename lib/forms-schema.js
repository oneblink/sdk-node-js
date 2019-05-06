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
  'autocomplete'
]

const CUSTOM_OPTION_TYPE = 'CUSTOM'
const DYNAMIC_OPTION_TYPE = 'DYNAMIC'
const optionTypes = [
  CUSTOM_OPTION_TYPE,
  DYNAMIC_OPTION_TYPE
]

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
  'autocomplete'
]

const ConditionallyShowPredicatesSchema = Joi.array().label('Form Element - Conditionally Show Predicates').unique('elementId').when('conditionallyShow', {
  is: true,
  then: Joi.array().min(1).items(Joi.object().keys({
    'elementId': Joi.string().guid().required().label('Form Element - Conditionally Show Predicate - Element Id'),
    'type': Joi.string().default('OPTIONS').label('Form Element - Conditionally Show Predicate - Type').valid(['OPTIONS', 'NUMERIC']),
    'optionIds': Joi.label('Form Element - Conditionally Show Predicate - Option Ids')
      .when('type', {
        is: Joi.only('OPTIONS'),
        then: Joi.array().min(1).items(Joi.string()).required(),
        else: Joi.allow(null)
      }),
    'operator': Joi.label('Form Element - Conditionally Show Predicate - Operator')
      .when('type', {
        is: Joi.only('NUMERIC'),
        then: Joi.string().valid(['>', '>=', '===', '!==', '<=', '<']).required(),
        else: Joi.allow(null)
      }),
    'value': Joi.label('Form Element - Conditionally Show Predicate - Value')
      .when('type', {
        is: Joi.only('NUMERIC'),
        then: Joi.number().required(),
        else: Joi.allow(null)
      })
  })).required(),
  otherwise: Joi.allow(null)
})

const JoiRange = Joi.extend((joi) => ({
  base: joi.number(),
  name: 'range',
  language: {
    within: 'Must not exceed range of values {{min}} and {{max}}: ({{v}})'
  },
  rules: [
    {
      name: 'within',
      params: {
        options: joi.object({
          min: joi.func().ref(),
          max: joi.func().ref()
        })
      },
      validate (params, value, state, options) {
        const max = params.options.max.key
        const min = params.options.min.key
        const parent = state.parent
        const range = parent[max] - parent[min]
        if (value > range) {
          return this.createError('range.within', { v: value, min: parent[min], max: parent[max] }, state, options)
        }
        return value
      }
    }
  ]
}))

const BaseSchema = Joi.object().keys({
  // Generic
  'id': Joi.string().guid().required().label('Form Element - Id'),
  'type': Joi.string().required().label('Form Element - Type').valid(elementTypes),
  'name': Joi.string().required().label('Form Element - Name'),
  'label': Joi.string().required().label('Form Element - Label'),
  'required': Joi.bool().default(false).label('Form Element - Required'),
  'readOnly': Joi.bool().default(false).label('Form Element - Read Only'),
  'conditionallyShow': Joi.bool().default(false).label('Form Element - Conditionally Show'),
  'conditionallyShowPredicates': ConditionallyShowPredicatesSchema,
  'requiresAllConditionallyShowPredicates': Joi.bool().default(false).label('Form Element - Requires All Conditionally Show Predicates are Met'),
  'defaultValue': Joi.allow(null).label('Form Element - Default Value')
    .when('type', {
      is: Joi.only([
        'text',
        'textarea',
        'barcodeScanner',
        'telephone'
      ]),
      then: Joi.string()
    })
    .when('type', {
      is: Joi.only(['html', 'calculation']),
      then: Joi.string().required().regex(base64DataRegex, {
        name: 'No Binary Data',
        invert: true
      })
    })
    .when('type', {
      is: 'image',
      then: Joi.string().required().uri()
    })
    .when('type', {
      is: 'number',
      then: Joi.number().label('Form Element - Default Value')
        .when('minNumber', {
          is: Joi.number().required(),
          then: Joi.number().min(Joi.ref('minNumber'))
        })
        .when('maxNumber', {
          is: Joi.number().required(),
          then: Joi.number().max(Joi.ref('maxNumber'))
        })
    })
    .when('type', {
      is: Joi.only([
        'date',
        'datetime',
        'time'
      ]),
      then: Joi.date().iso().label('Form Element - Default Date Value')
        .when('fromDate', {
          is: Joi.date().iso().required(),
          then: Joi.date().iso().min(Joi.ref('fromDate'))
        })
        .when('toDate', {
          is: Joi.date().iso().required(),
          then: Joi.date().iso().max(Joi.ref('toDate'))
        })
    })
    .when('type', {
      is: 'radio',
      then: Joi.when('optionsType', {
        is: Joi.invalid(DYNAMIC_OPTION_TYPE),
        then: Joi.string().guid().label('Form Element - Default Value'),
        otherwise: Joi.string().label('Form Element - Default Value')
      })
    })
    .when('type', {
      is: 'checkboxes',
      then: Joi.when('optionsType', {
        is: Joi.invalid(DYNAMIC_OPTION_TYPE),
        then: Joi.array().items(Joi.string().guid()).label('Form Element - Default Value'),
        otherwise: Joi.array().items(Joi.string()).label('Form Element - Default Value')
      })
    })
    .when('type', {
      is: 'autocompelete',
      then: Joi.when('optionsType', {
        is: Joi.invalid(DYNAMIC_OPTION_TYPE),
        then: Joi.string().guid().label('Form Element - Default Value'),
        otherwise: Joi.string().label('Form Element - Default Value')
      })
    })
    .when('type', {
      is: 'select',
      then: Joi.when('multi', {
        is: true,
        then: Joi.when('optionsType', {
          is: Joi.invalid(DYNAMIC_OPTION_TYPE),
          then: Joi.array().items(Joi.string().guid()).label('Form Element - Default Value'),
          otherwise: Joi.array().items(Joi.string()).label('Form Element - Default Value')
        }),
        otherwise: Joi.when('optionsType', {
          is: Joi.invalid(DYNAMIC_OPTION_TYPE),
          then: Joi.string().guid().label('Form Element - Default Value'),
          otherwise: Joi.string().label('Form Element - Default Value')
        })
      })
    })
    .when('type', {
      is: 'email',
      then: Joi.string().email().label('Form Element - Default Email Value')
    }),
  // Radio buttons
  'buttons': Joi.boolean().label('Form Element - Radio Buttons as Buttons').when('type', {
    is: Joi.only(['radio', 'checkboxes']),
    then: Joi.default(false),
    otherwise: Joi.allow(null)
  }),
  'sliderIncrement': Joi.label('Form Element - Slider Increment').when('isSlider', {
    is: true,
    then: JoiRange.range().within({ min: Joi.ref('minNumber'), max: Joi.ref('maxNumber') }),
    else: Joi.allow(null)
  }),
  // Select
  'multi': Joi.boolean().label('Form Element - Multi Select').when('type', {
    is: 'select',
    then: Joi.default(false),
    otherwise: Joi.allow(null)
  }),

  // Number
  'isSlider': Joi.boolean().label('Form Element - Display Number as Slider').when('type', {
    is: 'number',
    then: Joi.default(false),
    otherwise: Joi.allow(null)
  }),
  'minNumber': Joi.number().allow(null).label('Form Element - Minimum Number')
    .when('isSlider', {
      is: true,
      then: Joi.required()
    }),
  'maxNumber': Joi.number().label('Form Element - Maximum Number')
    .when('minNumber', {
      is: Joi.number().required(),
      then: Joi.number().min(Joi.ref('minNumber'))
    })
    .when('isSlider', {
      is: true,
      then: Joi.required()
    }),

  // Heading
  'headingType': Joi.number().label('Form Element - Heading Size').valid([
    1,
    2,
    3,
    4,
    5
  ]).when('heading', {
    is: 'select',
    then: Joi.required(),
    otherwise: Joi.allow(null)
  }),

  // Date and Date+Time
  'fromDate': Joi.date().iso().allow(null).label('Form Element - From Date'),
  'toDate': Joi.date().iso().allow(null).label('Form Element - To Date').when('fromDate', {
    is: Joi.date().iso().required(),
    then: Joi.date().iso().min(Joi.ref('fromDate'))
  }),
  // Checkboxes, selects, radio and autocomplete
  'optionsType': Joi.when('type', {
    is: Joi.only(['checkboxes', 'radio', 'select', 'autocomplete']),
    then: Joi.string().label('Form Element - Options type').default(CUSTOM_OPTION_TYPE).valid(optionTypes),
    otherwise: Joi.allow(null)
  }),
  'dynamicOptionSetId': Joi.when('optionsType', {
    is: DYNAMIC_OPTION_TYPE,
    then: Joi.number().label('Form Element - Dynamic Option Set Id').required(),
    otherwise: Joi.allow(null)
  }),
  'options': Joi.array().label('Form Element - Options').unique('id').when('optionsType', {
    is: CUSTOM_OPTION_TYPE,
    then: Joi.array().items(Joi.object().keys({
      'id': Joi.string().guid().required().label('Form Element - Option Id'),
      'value': Joi.string().required().label('Form Element - Option Value'),
      'label': Joi.string().required().label('Form Element - Option Label'),
      'colour': Joi.string().allow([null, '']).regex(/^#[A-Fa-f0-9]{3}([A-Fa-f0-9]{3})?$/).label('Form Element - Option Colour'),
      'attributes': Joi.array().items(Joi.object().keys({
        'optionIds': Joi.array().required().items(Joi.string()).label('Form Element - Attributes Mapping - Element Id'),
        'elementId': Joi.string().guid().required().label('Form Element - Option Value - Attribute Option Id')
      }))
    })).required(),
    otherwise: Joi.allow(null)
  }),
  'attributesMapping': Joi.when('optionsType', {
    is: DYNAMIC_OPTION_TYPE,
    then: Joi.array().items(Joi.object().keys({
      'elementId': Joi.string().guid().required().label('Form Element - Option Value - Attribute Element Id'),
      'attribute': Joi.string().required().label('Form Element - Attributes Mapping - Attribute')
    })),
    otherwise: Joi.allow(null)
  }),
  'conditionallyShowOptions': Joi.when('type', {
    is: Joi.only(['checkboxes', 'radio', 'select', 'autocomplete']),
    then: Joi.boolean().label('Form Element - conditionallyShowOptionsElementIds').default(false),
    otherwise: Joi.allow(null)
  }),
  'conditionallyShowOptionsElementIds': Joi.when('optionsType', {
    is: CUSTOM_OPTION_TYPE,
    then: Joi.array().items(Joi.string().guid().required().label('Form Element - Attributes Mapping - Element Id')),
    otherwise: Joi.allow(null)
  }),

  // repeatableSet
  'minSetEntries': Joi.number().label('Form Element - Minimum number of repeatable set entries').min(0),
  'maxSetEntries': Joi.number().label('Form Element - Maximum number of repeatable set entries').when('minSetEntries', {
    is: Joi.number().required().min(0),
    then: Joi.number().min(Joi.ref('minSetEntries')),
    otherwise: Joi.number().min(0)
  }),
  'addSetEntryLabel': Joi.string().label('Form Element - Add repeatable set entry label'),
  'removeSetEntryLabel': Joi.string().label('Form Element - Remove repeatable set entry label'),
  'elements': Joi.array().label('Form Element - Repeatable Set - Elements').when('type', {
    is: Joi.only('repeatableSet'),
    then: Joi.array().items(Joi.lazy(() => BaseSchema)).required().min(1).unique('name').unique('id'),
    otherwise: Joi.allow(null)
  }),

  // Barcode Scanner
  'restrictBarcodeTypes': Joi.boolean().label('Form Element - Barcode Scanner - restrictBarcodeTypes').when('type', {
    is: Joi.only('barcodeScanner'),
    then: Joi.default(false),
    otherwise: Joi.allow(null)
  }),
  'restrictedBarcodeTypes': Joi.array().label('Form Element - Barcode Scanner - restrictedBarcodeTypes').when('restrictBarcodeTypes', {
    is: true,
    then: Joi.array().items(Joi.string()).label('Form Element - Barcode Scanner - restrictedBarcodeTypesArray').required(),
    otherwise: Joi.allow(null)
  }),

  // calculation
  'calculation': Joi.string().label('Form Element - Calculation - calculation').when('type', {
    is: Joi.only('calculation'),
    then: Joi.required(),
    otherwise: Joi.allow(null)
  }),
  'preCalculationDisplay': Joi.string().allow(null).label('Form Element - Pre Calculation Display').regex(base64DataRegex, {
    name: 'No Binary Data',
    invert: true
  }),

  // Data lookup configuration
  'isDataLookup': Joi.label('Data Lookup enabled').when('type', {
    is: Joi.only(userInputTypes),
    then: Joi.boolean().default(false),
    otherwise: Joi.allow(null)
  }),
  'dataLookupUrl': Joi.string().uri().label('Data Lookup Url').when('isDataLookup', {
    is: true,
    then: Joi.required(),
    otherwise: Joi.allow(null)
  }),
  'dataLookupApiId': Joi.string().label('Data Lookup Api Id').when('isDataLookup', {
    is: true,
    then: Joi.string(),
    otherwise: Joi.allow(null)
  }),

  // Element lookup configuration
  'isElementLookup': Joi.label('Element Lookup enabled').when('type', {
    is: Joi.only(userInputTypes),
    then: Joi.boolean().default(false),
    otherwise: Joi.allow(null)
  }),
  'elementLookupUrl': Joi.string().uri().label('Element Lookup Url').when('isElementLookup', {
    is: true,
    then: Joi.required(),
    otherwise: Joi.allow(null)
  }),
  'elementLookupApiId': Joi.string().label('Element Lookup Api Id').when('isElementLookup', {
    is: true,
    then: Joi.string(),
    otherwise: Joi.allow(null)
  }),
  'elementLookupFormId': Joi.number().label('Element Lookup Form Id').when('isElementLookup', {
    is: true,
    then: Joi.number(),
    otherwise: Joi.allow(null)
  })
})

const SubmissionEventsSchema = Joi.object().keys({
  'type': Joi.string().required().label('Form Submission Event - Type').valid([
    'CALLBACK',
    'PDF',
    'SPOTTO',
    'ONEBLINK_API'
  ]),
  'configuration': Joi.allow(null).label('Form Submission Event - Configuration')
    .when('type', {
      is: 'CALLBACK',
      then: Joi.object().keys({
        'url': Joi.string().uri().required().label('Form Submission Event - Callback Url'),
        'secret': Joi.string().required().label('Form Submission Event - Callback Secret')
      })
    })
    .when('type', {
      is: 'PDF',
      then: Joi.object().keys({
        'email': Joi.alternatives([
          Joi.string().email().required().label('Form Submission Event - Email Address'),
          Joi.string().regex(/^{ELEMENT:\S+}$/).required().label('Form Submission Event - Email Address')
        ]),
        'pdfFileName': Joi.string().allow([null, '']).label('Form Submission Event - PDF File Name'),
        'emailSubjectLine': Joi.string().allow([null, '']).label('Form Submission Event - Email Subject Line')
      })
    })
    .when('type', {
      is: 'ONEBLINK_API',
      then: Joi.object().keys({
        'apiId': Joi.string().required().regex(/^[a-z\d-]+\.api\.(?:oneblink|blinkm)\.io$/).label('Form Submission Event - API Instance'),
        'apiEnvironment': Joi.string().required().label('Form Submission Event - API Environment'),
        'apiEnvironmentRoute': Joi.string().required().label('Form Submission Event - API Environment Route'),
        'secret': Joi.string().required().label('Form Submission Event - Callback Secret')
      })
    })
})

module.exports = {
  formSchema: Joi.object().keys({
    'id': Joi.number(),
    'name': Joi.string().label('Name').required(),
    'description': Joi.string().label('Description').allow('').allow(null),
    'organisationId': Joi.string().label('Organisation').required(),
    'elements': Joi.array().label('Form Elements').when('isMultiPage', {
      is: false,
      then: Joi.array().required().items(BaseSchema).unique('name').unique('id'),
      otherwise: Joi.array().items(Joi.object().keys({
        'id': Joi.string().guid().required().label('Form Element - Id'),
        'label': Joi.string().required().label('Form Element - Label'),
        'type': Joi.only('page'),
        'conditionallyShow': Joi.bool().default(false).label('Form Element - Conditionally Show'),
        'conditionallyShowPredicates': ConditionallyShowPredicatesSchema,
        'requiresAllConditionallyShowPredicates': Joi.bool().default(false).label('Form Element - Requires All Conditionally Show Predicates are Met'),
        'elements': Joi.array().label('Form Element - Page - Elements').required().items(BaseSchema).min(1).unique('name').unique('id')
      }))
    }),
    'isMultiPage': Joi.bool().default(false).label('Form Is Multi Page'),
    'isAuthenticated': Joi.bool().default(false).label('Form Authentication'),
    'isPublished': Joi.bool().default(false).label('Form Publication'),
    'submissionEvents': Joi.array().allow(null).label('Submission Events').items(SubmissionEventsSchema),
    'postSubmissionAction': Joi.string().label('Post Submission Action').required().valid(['URL', 'CLOSE', 'FORMS_LIBRARY']),
    'redirectUrl': Joi.string().label('Post Submission Redirect URL').when('postSubmissionAction', {
      is: 'URL',
      then: Joi.required(),
      otherwise: Joi.allow(null)
    }),
    'isInfoPage': Joi.bool().default(false).label('Form Information Page'),
    'formsAppIds': Joi.array().items(Joi.number()).required().label('Associated Forms Apps'),
    'createdAt': Joi.string().label('Date Created').allow('').allow(null),
    'updatedAt': Joi.string().label('Date Updated').allow('').allow(null)
  }),
  elementSchema: BaseSchema
}
