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
  minSetEntries: Joi.number()
    .min(0)
    .label('Form Element - Minimum number of repeatable set entries'),
  maxSetEntries: Joi.number()
    .label('Form Element - Maximum number of repeatable set entries')
    .when('minSetEntries', {
      is: Joi.number().required().min(0),
      then: Joi.number().min(Joi.ref('minSetEntries', { render: true })),
      otherwise: Joi.number().min(0),
    }),
  addSetEntryLabel: Joi.string().label(
    'Form Element - Add repeatable set entry label',
  ),
  removeSetEntryLabel: Joi.string().label(
    'Form Element - Remove repeatable set entry label',
  ),
  elements: Joi.array()
    .items(Joi.link('#formElement'))
    .required()
    .min(1)
    .unique('name', { ignoreUndefined: true })
    .unique('id')
    .label('Form Element - Repeatable Set - Elements'),
})
export default schema
