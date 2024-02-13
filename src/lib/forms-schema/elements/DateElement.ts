import { z } from 'zod'
import {
  baseSchemas,
  name,
  label,
  hint,
  requiredSchemas,
  readOnly,
  ConditionallyShowSchema,
  LookupFormElementSchema,
  placeholderValue,
  customCssClasses,
  hintPosition,
} from '../property-schemas'

const daysOffsetSchema = z.number().int().optional()
const datePropertySchema = z
  .union([z.string().datetime(), z.literal('NOW')])
  .nullable()
  .optional()
  .transform((value) => value ?? undefined)

const dateElementId = z.string().uuid().optional()

export default z
  .object({
    ...baseSchemas,
    name,
    label,
    hint,
    hintPosition,
    ...requiredSchemas,
    readOnly,
    placeholderValue,
    fromDateElementId: dateElementId,
    fromDate: datePropertySchema,
    fromDateDaysOffset: daysOffsetSchema,
    toDateElementId: dateElementId,
    toDate: datePropertySchema,
    toDateDaysOffset: daysOffsetSchema,
    defaultValue: datePropertySchema,
    defaultValueDaysOffset: daysOffsetSchema, // set to null if defaultValue is not 'NOW'
    customCssClasses,
  })
  .and(ConditionallyShowSchema)
  .and(LookupFormElementSchema)
  .and(
    z.union([
      z.object({
        type: z.literal('date'),
      }),
      z.object({
        type: z.literal('datetime'),
      }),
    ]),
  )
