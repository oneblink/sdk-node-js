import { SubmissionTypes } from '@oneblink/types'
import { z } from 'zod'

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
