import Joi from 'joi'

export const CUSTOM_OPTION_TYPE = 'CUSTOM'
export const DYNAMIC_OPTION_TYPE = 'DYNAMIC'
export const FRESHDESK_FIELD_OPTION_TYPE = 'FRESHDESK_FIELD'
export const SEARCH_OPTION_TYPE = 'SEARCH'

export const optionTypes = [
  CUSTOM_OPTION_TYPE,
  DYNAMIC_OPTION_TYPE,
  FRESHDESK_FIELD_OPTION_TYPE,
]

const MINIMUM_MYSQL_DATETIME_YEAR = 1000
const MAXIMUM_MYSQL_DATETIME_YEAR = 9999

/**
 * An ISO date-time string that can be persisted in a MySQL `DATETIME` column.
 */
export const mysqlDateTimeSchema = Joi.string()
  .isoDate()
  .custom((value: string, helpers) => {
    const date = new Date(value)
    // The mysql driver writes Date values in local time, so the year must be
    // read in local time as well to match what is stored.
    const year = Number.isNaN(date.getTime()) ? undefined : date.getFullYear()
    if (
      year === undefined ||
      year < MINIMUM_MYSQL_DATETIME_YEAR ||
      year > MAXIMUM_MYSQL_DATETIME_YEAR
    ) {
      return helpers.error('date.mysqlDateTimeRange', { date: value })
    }
    return value
  })
  .messages({
    'date.mysqlDateTimeRange': `{{#label}} ({{#date}}) must be a date between the years ${MINIMUM_MYSQL_DATETIME_YEAR} and ${MAXIMUM_MYSQL_DATETIME_YEAR}`,
  })

export const JoiRange = Joi.extend((joi: typeof Joi) => ({
  type: 'range',
  base: joi.number(),
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
      validate(value, helpers, args) {
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

export const htmlString = Joi.string().regex(
  /<[^>]*src="data:([a-zA-Z]*)\/([a-zA-Z]*);base64,([^"]*)".*>/m,
  {
    name: 'No Binary Data',
    invert: true,
  },
)

export const s3ConfigurationSchema = Joi.object()
  .keys({
    bucket: Joi.string().required(),
    key: Joi.string().required(),
    region: Joi.string().required(),
  })
  .required()

export const attachment = Joi.object().keys({
  id: Joi.string().required(),
  url: Joi.string().required().uri(),
  contentType: Joi.string().required(),
  fileName: Joi.string().required(),
  isPrivate: Joi.boolean().required(),
  s3: s3ConfigurationSchema,
})
