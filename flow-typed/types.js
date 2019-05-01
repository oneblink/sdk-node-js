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
  id: string,
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
    'time' |
    'repeatableSet' |
    'html' |
    'barcodeScanner' |
    'captcha' |
    'page' |
    'email' |
    'file',
  name: string,
  label: string,
  required: boolean,
  readOnly: boolean,
  conditionallyShow: boolean,
  conditionallyShowPredicates?: Array<{
    elementId: string,
    type: 'OPTIONS' | 'NUMERIC',
    optionIds?: string[],
    operator?: string,
    value?: number
  }>,
  requiresAllConditionallyShowPredicates?: boolean,
  multi?: boolean,
  minNumber?: number,
  maxNumber?: number,
  headingType?: number,
  fromDate?: string,
  toDate?: string,
  optionsType? : 'custom' | 'dynamic',
  dynamicOptionSetId?: number,
  options?: Array<{
    optionId: string,
    id: string,
    value: string
  }>,
  elements?: Array<FormElement>,
  minSets?: number,
  maxSets?: number,
  defaultValue?: any,
  isDataLookup?: boolean,
  isElementLookup?: boolean
}

declare type Form = {
  id: number,
  name: string,
  description?: string,
  organisationId: string,
  formsAppIds: number[],
  elements: FormElement[],
  isAuthenticated: boolean,
  isMultiPage: boolean,
  isPublished: boolean,
  submissionEvents?: Array<FormSubmissionEvent>,
  createdAt?: Date,
  updatedAt?: Date,
  postSubmissionAction: string,
  redirectUrl? : string,
  organisation? : Organisation,
  isInfoPage: boolean
}

declare type FormSubmissionEvent = {
  type: 'CALLBACK' | 'PDF' | 'SPOTTO' | 'ONEBLINK_API',
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
