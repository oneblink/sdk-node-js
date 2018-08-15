// @flow
'use strict'

/* ::
export type ConstructorOptions = {
  accessKey: mixed,
  secretKey: mixed,
  oneBlinkAPIOrigin?: mixed
}

export type AWSCredentials = {
  AccessKeyId: string,
  SecretAccessKey: string,
  SessionToken: string
}

export type FormRetrievalData = {
  credentials: AWSCredentials,
  s3: {
    bucket: string,
    key: string,
    region: string
  }
}

export type PreFillMeta = {
  credentials: AWSCredentials,
  s3: {
    bucket: string,
    key: string,
    region: string
  }
}

export type BaseSearchResult = {
  meta: {
    "limit": null,
    "offset": null,
    "nextOffset": null
  }
}

export type FormElement = {
  type: 'camera' |
    'checkboxes' |
    'date' |
    'datetime' |
    'heading' |
    'location' |
    'number' |
    'radio' |
    'select' |
    'draw' |
    'text' |
    'textarea' |
    'time',
  name: string,
  label: string,
  required: boolean,
  multi?: boolean,
  minNumber?: number,
  maxNumber?: number,
  headingType?: number,
  fromDate?: string,
  toDate?: string,
  options?: Array<{
    id: string,
    value: string
  }>
}

export type Form = {
  id: number,
  name: string,
  description?: string,
  organisationId: string,
  elements: FormElement[],
  isAuthenticated: boolean,
  isPublished: boolean,
  submissionEvents?: Array<FormSubmissionEvent>
}

export type FormSubmissionEvent = {
  id: number,
  type: 'CALLBACK',
  configuration: Object
}

export type FormsSearchResult = {
  forms: Form[]
} & BaseSearchResult

export type FormsSearchOptions = {
  isAuthenticated?: mixed,
  isPublished?: mixed,
  name?: mixed
}

export type S3SubmissionData = {
  submission: {
    [name: string]: any
  },
  definition: Form,
  submissionTimestamp: string
}
*/
