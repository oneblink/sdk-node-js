import { SubmissionTypes } from '@oneblink/types'
import { ZodCustomIssue, z } from 'zod'

export const htmlString = z.string().refine(
  (value) => {
    // return falsy for invalid data
    return !/<[^>]*src="data:([a-zA-Z]*)\/([a-zA-Z]*);base64,([^"]*)".*>/m.test(
      value,
    )
  },
  {
    message: 'cannot include binary data',
  },
)

export const attachment: z.ZodType<SubmissionTypes.FormSubmissionAttachment> =
  z.object({
    id: z.string(),
    url: z.string().url(),
    contentType: z.string(),
    fileName: z.string(),
    isPrivate: z.boolean(),
    s3: z.object({
      bucket: z.string(),
      key: z.string(),
      region: z.string(),
    }),
  })

type RefineMaxMinParamsGetValue<V> = (v: V) => number | undefined
type RefineMaxMinParams<V> = {
  getMin: RefineMaxMinParamsGetValue<V>
  getMax: RefineMaxMinParamsGetValue<V>
}

export const refineRange = {
  validation: <V>(
    options: RefineMaxMinParams<V> & {
      getField: RefineMaxMinParamsGetValue<V>
    },
  ) => {
    return (v: V) => {
      const field = options.getField(v)
      const min = options.getMin(v)
      const max = options.getMax(v)

      if (
        typeof field === 'number' &&
        ((typeof min === 'number' && field < min) ||
          (typeof max === 'number' && field > max))
      ) {
        return false
      }
      return true
    }
  },
  error: ({ min, max, path }: { min: string; max: string; path: string }) => {
    return {
      message: `must be greater than or equal to "${min}" and less than or equal to "${max}"`,
      path: [path],
    }
  },
}

export const refineMaxGreaterThanMin = {
  validation: <V>(options: RefineMaxMinParams<V>) => {
    return (v: V) => {
      const min = options.getMin(v)
      const max = options.getMax(v)

      if (typeof min === 'number' && typeof max === 'number' && max < min) {
        return false
      }
      return true
    }
  },
  error: ({ min, max }: { min: string; max: string }) => {
    return {
      message: `must be greater than or equal to "${min}"`,
      path: [max],
    }
  },
}

/**
 * Call this method as a spread argument to a zod `refine` function which is
 * called on an array of objects. The string passed should be the name of the
 * property on the object which is to be validated as unique between items
 */
export const getRefineUniquePropInArrayArgs = <
  K extends string,
  T extends Record<K, unknown>,
>(
  prop: K,
) => {
  return [
    (items: Array<T>) => {
      const values = items.map((val) => val[prop])
      const valuesAsSet = new Set(items)
      return values.length === valuesAsSet.size
    },
    {
      message: `must not contain a duplicate "${prop}"`,
      path: ['[*]', prop],
    } as Partial<Omit<ZodCustomIssue, 'code'>>,
  ] as const
}

/**
 * Use this variable as a spread argument to a zod `refine` function which is
 * called on an array of literals to validate they are unique in the array.
 */
export const getUniqueLiteralInArray = [
  (items: Array<string | number>) => {
    const literalSet = new Set(items)

    return items.length === literalSet.size
  },
  {
    message: `must not contain a duplicate value`,
    path: ['[*]'],
  } as Partial<Omit<ZodCustomIssue, 'code'>>,
] as const
