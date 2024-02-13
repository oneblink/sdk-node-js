import { z } from 'zod'
import {
  baseSchemas,
  name,
  label,
  hint,
  requiredSchemas,
  readOnly,
  ConditionallyShowSchema,
  customCssClasses,
  hintPosition,
} from '../property-schemas'

const boolSchema = z.boolean().default(false)
const textSchema = z.string().optional()

export default z
  .object({
    type: z.literal('civicaNameRecord'),
    ...baseSchemas,
    name,
    label,
    hint,
    hintPosition,
    ...requiredSchemas,
    readOnly,
    useGeoscapeAddressing: boolSchema,

    titleLabel: textSchema,
    familyNameLabel: textSchema,

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
    customCssClasses,
  })
  .and(ConditionallyShowSchema)
