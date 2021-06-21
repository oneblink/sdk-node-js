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

export const type = 'civicaNameRecord'

const boolSchema = Joi.boolean().default(false)
const textSchema = Joi.string()

export default Joi.object({
  id,
  name,
  label,
  hint,
  required,
  readOnly,
  ...conditionallyShowSchemas,
  useGeoscapeAddressing: Joi.boolean().default(false),

  givenName1Label: textSchema,
  givenName1IsRequired: boolSchema,
  givenName1IsHidden: boolSchema,

  emailAddressLabel: textSchema,
  emailAddressIsRequired: boolSchema,
  emailAddressIsHidden: boolSchema,

  homePhoneLabel: textSchema,
  homePhoneIsRequired: boolSchema,
  homePhoneIsHidden: boolSchema,

  businessPhoneLabel: textSchema,
  businessPhoneIsRequired: boolSchema,
  businessPhoneIsHidden: boolSchema,

  mobilePhoneLabel: textSchema,
  mobilePhoneIsRequired: boolSchema,
  mobilePhoneIsHidden: boolSchema,

  faxPhoneLabel: textSchema,
  faxPhoneIsRequired: boolSchema,
  faxPhoneIsHidden: boolSchema,

  streetAddressesLabel: textSchema,
  address1Label: textSchema,
  address2Label: textSchema,
  postcodeLabel: textSchema,
})
