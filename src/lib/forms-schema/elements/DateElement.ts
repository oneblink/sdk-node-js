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

const NOW = 'NOW' as const
const daysOffsetSchema = z.number().int().optional()
const datePropertySchema = z
  .union([z.string().datetime(), z.literal(NOW)])
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

    fromDate: datePropertySchema,
    toDate: datePropertySchema,
    fromDateElementId: dateElementId,
    fromDateDaysOffset: daysOffsetSchema,
    toDateElementId: dateElementId,
    toDateDaysOffset: daysOffsetSchema,

    defaultValue: datePropertySchema,
    defaultValueDaysOffset: daysOffsetSchema,
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
  .transform((v) => ({
    ...v,
    defaultValueDaysOffset:
      v.defaultValue === NOW ? v.defaultValueDaysOffset : undefined,
  }))
  .transform((v) => ({
    ...v,
    fromDateDaysOffset:
      v.fromDate === NOW || v.fromDateElementId
        ? v.fromDateDaysOffset
        : undefined,
  }))
  .transform((v) => ({
    ...v,
    toDateDaysOffset:
      v.toDate === NOW || v.toDateElementId ? v.toDateDaysOffset : undefined,
  }))
  // I think this particular piece of validation is actually not right and inconsistent
  // with the console front end validation.
  // However, I am leaving in for now as it is a 1 for 1 of the existing Joi validation.
  .refine(
    (v) => {
      if (
        typeof v.fromDateDaysOffset === 'number' &&
        typeof v.toDateDaysOffset === 'number' &&
        v.toDateDaysOffset < v.fromDateDaysOffset
      ) {
        return false
      }
      return true
    },
    {
      message: 'must be equal to or greater than "fromDateDaysOffset"',
      path: ['toDateDaysOffset'],
    },
  )
  .refine(
    (v) => {
      if (
        typeof v.fromDate === 'string' &&
        v.fromDate !== NOW &&
        typeof v.toDate === 'string' &&
        v.toDate !== NOW &&
        new Date(v.toDate) < new Date(v.fromDate)
      ) {
        return false
      }
      return true
    },
    {
      message: 'must be equal to or greater than "fromDate"',
      path: ['toDate'],
    },
  )
  .refine(
    (v) => {
      const defaultValue =
        typeof v.defaultValue === 'string' && v.defaultValue !== NOW
          ? new Date(v.defaultValue)
          : undefined
      if (
        defaultValue &&
        ((typeof v.toDate === 'string' &&
          v.toDate !== NOW &&
          defaultValue > new Date(v.toDate)) ||
          (typeof v.fromDate === 'string' &&
            v.fromDate !== NOW &&
            defaultValue < new Date(v.fromDate)))
      ) {
        return false
      }
      return true
    },
    {
      message:
        'must be equal to or greater than "fromDate" and equal to or less than "toDate"',
      path: ['defaultValue'],
    },
  )
  .refine(
    (v) => {
      if (
        typeof v.fromDate === 'string' &&
        v.fromDate !== NOW &&
        typeof v.toDate === 'string' &&
        v.toDate !== NOW &&
        new Date(v.toDate) < new Date(v.fromDate)
      ) {
        return false
      }
      return true
    },
    {
      message: 'must be equal to or greater than "fromDate"',
      path: ['toDate'],
    },
  )
