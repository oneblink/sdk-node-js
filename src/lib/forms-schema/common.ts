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

export const idSchema = Joi.string().guid().required()
export const elementIdSchema = idSchema.label('Form Element - Id')
export const elementNameSchema = Joi.string()
  .required()
  .label('Form Element - Name')
export const elementLabelSchema = Joi.string()
  .required()
  .label('Form Element - Label')

export const elementHintSchema = Joi.string().label('Form Element - Hint')
export const elementRequired = Joi.bool()
  .default(false)
  .label('Form Element - Required')

export const elementReadOnly = Joi.bool()
  .default(false)
  .label('Form Element - Read Only')
export const elementConditionallyShow = Joi.bool()
  .default(false)
  .label('Form Element - Conditionally Show')

export const JoiRange = Joi.extend((joi: typeof Joi) => ({
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
      // @ts-expect-error sorry Joi, this is valid...at least it was in Flow
      validate(params, value, state, options) {
        const max = params.options.max.key
        const min = params.options.min.key
        const parent = state.parent
        const range = parent[max] - parent[min]
        if (value > range) {
          // @ts-expect-error sorry Joi, this is valid...at least it was in Flow
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

export const base64DataRegex = /<[^>]*src="data:([a-zA-Z]*)\/([a-zA-Z]*);base64,([^"]*)".*>/m
