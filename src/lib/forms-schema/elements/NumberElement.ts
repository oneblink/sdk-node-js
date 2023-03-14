import Joi from 'joi'
import { JoiRange } from '../common'
import {
  baseSchemas,
  name,
  label,
  hint,
  requiredSchemas,
  readOnly,
  conditionallyShowSchemas,
  placeholderValue,
  lookupSchemas,
  regexSchemas,
  customCssClasses,
  hintPosition,
} from '../property-schemas'

export const type = 'number'

export default Joi.object({
  ...baseSchemas,
  name,
  label,
  hint,
  hintPosition,
  ...requiredSchemas,
  readOnly,
  placeholderValue,
  ...conditionallyShowSchemas,
  ...lookupSchemas,
  isSlider: Joi.when('type', {
    is: 'number',
    then: Joi.boolean().default(false),
    otherwise: Joi.any().strip(),
  }),
  sliderIncrement: Joi.when('isSlider', {
    is: true,
    then: JoiRange.range().within(
      Joi.ref('minNumber', { render: true }),
      Joi.ref('maxNumber', { render: true }),
    ),
    otherwise: Joi.any().strip(),
  }),
  minNumber: Joi.number()
    .allow(null)
    .when('type', {
      is: Joi.not('number'),
      then: Joi.any().strip(),
    })
    .when('isSlider', {
      is: true,
      then: Joi.required(),
    })
    .when('isInteger', {
      is: true,
      then: Joi.number().integer(),
    }),
  maxNumber: Joi.number()
    .when('type', {
      is: Joi.not('number'),
      then: Joi.any().strip(),
    })
    .when('minNumber', {
      is: Joi.number().required(),
      then: Joi.number().min(Joi.ref('minNumber', { render: true })),
    })
    .when('isSlider', {
      is: true,
      then: Joi.required(),
    })
    .when('isInteger', {
      is: true,
      then: Joi.number().integer(),
    }),
  isInteger: Joi.when('type', {
    is: 'number',
    then: Joi.boolean().default(false),
    otherwise: Joi.any().strip(),
  }),
  defaultValue: Joi.when('minNumber', {
    is: Joi.number().required(),
    then: Joi.when('isInteger', {
      is: true,
      then: Joi.number()
        .integer()
        .min(Joi.ref('minNumber', { render: true })),
      otherwise: Joi.number().min(Joi.ref('minNumber', { render: true })),
    }),
  })
    .when('maxNumber', {
      is: Joi.number().required(),
      then: Joi.when('isInteger', {
        is: true,
        then: Joi.number()
          .integer()
          .max(Joi.ref('maxNumber', { render: true })),
        otherwise: Joi.number().max(Joi.ref('maxNumber', { render: true })),
      }),
    })
    .when('isInteger', {
      is: true,
      then: Joi.number().integer(),
      otherwise: Joi.number(),
    }),
  ...regexSchemas,
  customCssClasses,
})
