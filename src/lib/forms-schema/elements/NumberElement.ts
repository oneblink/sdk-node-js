import Joi from 'joi'
import { JoiRange } from '../common'
import {
  id,
  name,
  label,
  hint,
  required,
  readOnly,
  conditionallyShowSchemas,
  placeholderValue,
  lookupSchemas,
} from '../property-schemas'

export default Joi.object({
  id,
  name,
  label,
  hint,
  required,
  readOnly,
  placeholderValue,
  ...conditionallyShowSchemas,
  ...lookupSchemas,
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
    otherwise: Joi.any().strip(),
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
    })
    .when('isInteger', {
      is: true,
      then: Joi.number().integer(),
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
    })
    .when('isInteger', {
      is: true,
      then: Joi.number().integer(),
    }),
  isInteger: Joi.when('type', {
    is: 'number',
    then: Joi.boolean().label('Form Element - isInteger').default(false),
    otherwise: Joi.any().strip(),
  }),
  defaultValue: Joi.when('minNumber', {
    is: Joi.number().required(),
    then: Joi.when('isInteger', {
      is: true,
      then: Joi.number().integer().min(Joi.ref('minNumber')),
      otherwise: Joi.number().min(Joi.ref('minNumber')),
    }),
  })
    .when('maxNumber', {
      is: Joi.number().required(),
      then: Joi.when('isInteger', {
        is: true,
        then: Joi.number().integer().max(Joi.ref('maxNumber')),
        otherwise: Joi.number().max(Joi.ref('maxNumber')),
      }),
    })
    .when('isInteger', {
      is: true,
      then: Joi.number().integer(),
      otherwise: Joi.number(),
    })
    .when('maxLength', {
      is: Joi.number().required(),
      then: Joi.string().max(Joi.ref('maxLength')),
      otherwise: Joi.string(),
    })
    .label('Form Element - Default Value'),
})
