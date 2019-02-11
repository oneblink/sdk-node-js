// @flow
'use strict'

/* ::
declare type ConstructorOptions = {
  accessKey: mixed,
  secretKey: mixed,
  oneBlinkAPIOrigin?: mixed
}

declare type AWSCredentials = {
  AccessKeyId: string,
  SecretAccessKey: string,
  SessionToken: string
}

declare type FormRetrievalData = {
  credentials: AWSCredentials,
  s3: {
    bucket: string,
    key: string,
    region: string
  }
}

declare type PreFillMeta = {
  credentials: AWSCredentials,
  s3: {
    bucket: string,
    key: string,
    region: string
  }
}

declare type BaseSearchResult = {
  meta: {
    "limit": null,
    "offset": null,
    "nextOffset": null
  }
}

declare type FormElement = {
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

declare type Form = {
  id: number,
  name: string,
  description?: string,
  organisationId: string,
  elements: FormElement[],
  isAuthenticated: boolean,
  isPublished: boolean,
  submissionEvents?: Array<FormSubmissionEvent>
}

declare type FormSubmissionEvent = {
  id: number,
  type: 'CALLBACK',
  configuration: Object
}

declare type FormsSearchResult = {
  forms: Form[]
} & BaseSearchResult

declare type FormsSearchOptions = {
  isAuthenticated?: mixed,
  isPublished?: mixed,
  name?: mixed
}

declare type S3SubmissionData = {
  submission: {
    [name: string]: any
  },
  definition: Form,
  submissionTimestamp: string
}

declare type Key = {
  id: string,
  secret: string | void,
  name: string,
  privilege: {
    'API HOSTING'?: 'DEPLOYMENT',
    'PDF'?: 'BUILDER',
    'WEB APP HOSTING'?: 'DEPLOYMENT',
    'FORMS'?: 'FaaS'
  },
  links: {
    organisations: string
  }
}

declare type Organisation = {
  id: string,
  name: string,
  formsHostname: string,
  formsCloudFrontDistributionOrigin?: string,
  beeFormsCustomer: boolean,
  createdAt: string,
  tags: string[],
  links: {
    awsAccounts: string[]
  }
}

declare type NewJob = {
  username: string,
  formId: number,
  externalId?: string,
  preFillFormDataId?: string,
  details?: {
    key?: string,
    title?: string,
    description?: string,
    type?: string
  }
}

declare type Job = NewJob & {
  id: string,
  isSubmitted: false,
  createdAt: string
}
*/
