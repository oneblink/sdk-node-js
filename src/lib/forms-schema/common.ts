import Joi from 'joi'

export const addressIntegrationTypes = ['geoscapeAddress', 'pointAddress']
export const userInputTypes = [
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
  'compliance',
  ...addressIntegrationTypes,
]
export const elementTypes = [
  ...userInputTypes,
  'camera',
  'heading',
  'draw',
  'repeatableSet',
  'html',
  'captcha',
  'image',
  'file',
  'calculation',
  'form',
  'infoPage',
  'files',
  'summary',
].sort()

export const CUSTOM_OPTION_TYPE = 'CUSTOM'
export const DYNAMIC_OPTION_TYPE = 'DYNAMIC'
export const SEARCH_OPTION_TYPE = 'SEARCH'

export const optionTypes = [CUSTOM_OPTION_TYPE, DYNAMIC_OPTION_TYPE]

export const JoiRange = Joi.extend((joi: typeof Joi) => ({
  type: 'range',
  base: joi.number(),
  //name: 'range',
  messages: {
    'range.within':
      'Must not exceed range of values {{#min}} and {{#max}}: ({{#v}})',
  },
  rules: {
    within: {
      method(min, max) {
        return this.$_addRule({ name: 'within', args: { min, max } })
      },
      args: [
        {
          name: 'min',
          ref: true,
          assert: joi.number(),
        },
        {
          name: 'max',
          ref: true,
          assert: joi.number(),
        },
      ],
      validate(value, helpers, args, options) {
        console.log({
          value,
          helpers,
          args,
          options,
        })
        const max = args.max
        const min = args.min
        const range = max - min
        if (value > range) {
          return helpers.error('range.within', { v: value, min, max })
        }
        return value
      },
    },
  },
}))

export const base64DataRegex =
  /<[^>]*src="data:([a-zA-Z]*)\/([a-zA-Z]*);base64,([^"]*)".*>/m
