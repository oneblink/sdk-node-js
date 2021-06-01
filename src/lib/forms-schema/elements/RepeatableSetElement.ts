import Joi from 'joi'
import {
  id,
  name,
  label,
  hint,
  required,
  readOnly,
  conditionallyShowSchemas,
} from '../property-schemas'

// Think this needs to be a variable because of recursive dependency

const schema: Joi.ObjectSchema = Joi.object({
  id,
  name,
  label,
  hint,
  required,
  readOnly,
  ...conditionallyShowSchemas,
  minSetEntries: Joi.number().min(0),
  maxSetEntries: Joi.number().when('minSetEntries', {
    is: Joi.number().required().min(0),
    then: Joi.number().min(Joi.ref('minSetEntries', { render: true })),
    otherwise: Joi.number().min(0),
  }),
  addSetEntryLabel: Joi.string(),
  removeSetEntryLabel: Joi.string(),
  elements: Joi.array()
    .items(Joi.link('#formElement'))
    .required()
    .min(1)
    .unique('name', { ignoreUndefined: true })
    .unique('id'),
})
export default schema
