import { z } from 'zod'
import { htmlString } from './common'
import { ConditionTypes } from '@oneblink/types'

export const id = z.string().uuid()
export const name = z.string().trim()
export const label = z.string()
export const meta = z
  .string()
  .refine(
    (value) => {
      try {
        JSON.parse(value)
        return true
      } catch {
        return false
      }
    },
    {
      message: 'Invalid JSON string',
    },
  )
  .optional()

/**
 * This property is spread onto every element schema. Any new properties that
 * will be on ALL elements can be safely added here.
 */
export const baseSchemas = {
  id,
  meta,
}

export const hint = htmlString.optional()

export const hintPosition = z
  .enum(['BELOW_LABEL', 'TOOLTIP'])
  .default('TOOLTIP')

const required = z.boolean().default(false)
const requiredMessage = z.string().trim().optional()

export const requiredSchemas = {
  required,
  requiredMessage,
}

export const readOnly = z.boolean().default(false)

export const placeholderValue = z.string().optional()

export const buttons = z.boolean().default(false)

export const OptionsFormElementSchema = z.union([
  z.object({
    optionsType: z
      .literal('CUSTOM')
      .optional()
      .default('CUSTOM' as const),
    options: z
      .object({
        id: z.string().uuid(),
        value: z.string().trim(),
        label: z.string(),
        colour: z
          .string()
          .regex(/^#[A-Fa-f0-9]{3}([A-Fa-f0-9]{3})?$/)
          .optional()
          .nullable()
          .transform((value) => value ?? undefined),
        attributes: z
          .object({
            optionIds: z.string().array(),
            elementId: z.string().uuid(),
          })
          .array()
          .optional(),
        displayAlways: z.boolean().default(false),
      })
      // TODO .unique('id')
      .array(),
  }),
  z.object({
    optionsType: z.literal('DYNAMIC'),
    dynamicOptionSetId: z.number(),
    attributesMapping: z
      .object({
        elementId: z.string().uuid(),
        attribute: z.string(),
      })
      .array()
      .optional(),
  }),
  z.object({
    optionsType: z.literal('FRESHDESK_FIELD'),
    freshdeskFieldName: z.string(),
  }),
])

export const conditionallyShowOptionsSchema = z.union([
  z.object({
    conditionallyShowOptions: z.literal(false).optional(),
  }),
  z.object({
    conditionallyShowOptions: z.literal(true),
    conditionallyShowOptionsElementIds: z.string().uuid().array().min(1),
  }),
])

const ConditionalPredicatesItemBaseSchema = z
  .object({
    elementId: z.string().uuid(),
  })
  .and(
    z.union([
      z.object({
        type: z
          .literal('OPTIONS')
          .optional()
          .transform(() => 'OPTIONS' as const),
        optionIds: z.string().array().min(1),
      }),
      z
        .object({
          type: z.literal('NUMERIC'),
          operator: z.enum(['>', '>=', '===', '!==', '<=', '<']),
        })
        .and(
          z.union([
            z.object({
              compareWith: z.literal('ELEMENT'),
              value: z.string().uuid(),
            }),
            z.object({
              compareWith: z.literal('VALUE').optional(),
              value: z.number(),
            }),
          ]),
        ),
      z.object({
        type: z.literal('VALUE'),
        hasValue: z.boolean(),
      }),
      z
        .object({
          type: z.literal('BETWEEN'),
          min: z.number(),
          max: z.number(),
        })
        .refine(
          (predicate) => {
            return predicate.min <= predicate.max
          },
          {
            message: 'must be greater than or equal to "min"',
            path: ['max'],
          },
        ),
    ]),
  )

// Data lookup configuration
export const dataLookupSchema = z
  .union([
    z.object({
      isDataLookup: z.literal(false).optional(),
    }),
    z.object({
      isDataLookup: z.literal(true),
      dataLookupId: z.number(),
    }),
  ])
  .transform((value) => ({
    ...value,
    isDataLookup: !!value.isDataLookup,
  }))

// Element lookup configuration
export const elementLookupSchema = z
  .union([
    z.object({
      isElementLookup: z.literal(false).optional(),
    }),
    z.object({
      isElementLookup: z.literal(true),
      elementLookupId: z.number(),
    }),
  ])
  .transform((value) => ({
    ...value,
    isElementLookup: !!value.isElementLookup,
  }))

const lookupButtonSchema = z.object({
  lookupButton: z
    .object({
      icon: z.string().optional(),
      label: z.string().optional(),
    })
    .optional(),
})

export const LookupFormElementSchema = dataLookupSchema
  .and(elementLookupSchema)
  .and(lookupButtonSchema)

export const ConditionalPredicatesSchema: z.ZodType<
  ConditionTypes.ConditionalPredicate[],
  z.ZodTypeDef,
  unknown
> = z
  .union([
    ConditionalPredicatesItemBaseSchema,
    z.object({
      type: z.literal('REPEATABLESET'),
      elementId: z.string().uuid(),
      repeatableSetPredicate: ConditionalPredicatesItemBaseSchema,
    }),
  ])
  .array()
  // TODO .unique('elementId')
  .min(1)

export const ConditionallyShowSchema = z
  .union([
    z.object({
      conditionallyShow: z.literal(false).optional(),
    }),
    z.object({
      conditionallyShow: z.literal(true),
      requiresAllConditionallyShowPredicates: z.boolean().default(false),
      conditionallyShowPredicates: ConditionalPredicatesSchema,
    }),
  ])
  .transform((value) => ({
    ...value,
    conditionallyShow: !!value.conditionallyShow,
  }))

export const storageType = z
  .enum(['private', 'public', 'legacy'])
  .optional()
  .transform((value) => {
    if (value === 'legacy') {
      return 'private'
    }
    return value
  })

export const RegexFormElementSchema = z.union([
  z.object({
    regexPattern: z.string().refine((value) => {
      if (!value) return
      try {
        new RegExp(value)
        return value
      } catch (err) {
        throw new Error('it was an invalid regex pattern')
      }
    }),
    regexFlags: z
      .string()
      .regex(/^[dgimsuy]+$/)
      .optional(),
    regexMessage: z.string(),
  }),
  z.object({
    regexPattern: z.undefined().optional(),
  }),
])

export const canToggleAll = z.boolean().default(false)

export const customCssClasses = z
  .string()
  // regex from here https://stackoverflow.com/a/449000
  .regex(/^-?[_a-z]+[_a-z0-9-]*$/i)
  .array()
  .optional()
