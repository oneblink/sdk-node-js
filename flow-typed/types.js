// @flow
'use strict'

declare type ConstructorOptions = {
  accessKey: mixed,
  secretKey: mixed,
}

declare type AWSCredentials = {
  AccessKeyId: string,
  SecretAccessKey: string,
  SessionToken: string,
}

declare type FormRetrievalData = {
  credentials: AWSCredentials,
  s3: {
    bucket: string,
    key: string,
    region: string,
  },
}

declare type PreFillMeta = {
  credentials: AWSCredentials,
  s3: {
    bucket: string,
    key: string,
    region: string,
  },
}

declare type BaseSearchResult = {
  meta: {
    limit: null,
    offset: null,
    nextOffset: null,
  },
}

declare type FormsSearchResult = {
  forms: Form[],
} & BaseSearchResult

declare type FormsSearchOptions = {
  isAuthenticated?: mixed,
  name?: mixed,
}

declare type S3SubmissionData = {
  submission: {
    [name: string]: any,
  },
  definition: Form,
  submissionTimestamp: string,
}

declare type Key = {
  id: string,
  secret: string | void,
  name: string,
  privilege: {
    'API HOSTING'?: 'DEPLOYMENT',
    PDF?: 'BUILDER',
    'WEB APP HOSTING'?: 'DEPLOYMENT',
    FORMS?: 'FaaS',
  },
  links: {
    organisations: string,
  },
}

declare type Organisation = {
  id: string,
  name: string,
  assetsS3Bucket: string,
  slug: string,
  formsCloudFrontDistributionOrigin?: string,
  beeFormsCustomer: boolean,
  createdAt: string,
  tags: string[],
  links: {
    awsAccounts: string[],
  },
}

declare type NewJob = {
  username: string,
  formId: number,
  externalId?: string,
  preFillFormDataId?: string,
  details: {
    title: string,
    key?: string,
    description?: string,
    type?: string,
    priority?: number,
  },
}

declare type Job = NewJob & {
  id: string,
  isSubmitted: false,
  createdAt: string,
}

declare type FormsAppStyles = {
  foregroundColour?: string,
  highlightColour?: string,
  contrastColour?: string,
  logoUrl?: string,
  customCss?: string,
}

declare type FormsApp = {
  id: number,
  name: string,
  slug: string,
  hostname: string,
  oAuthClientId: ?string,
  createdAt: string,
  updatedAt: string,
  organisationId: string,
  formIds: number[],
  styles: FormsAppStyles,
  pwaSettings: {
    homeScreenIconUrl?: string,
    homeScreenName?: string,
    splashScreenName?: string,
  },
  welcomeEmail?: {
    body?: string,
    subject?: string,
  },
}

declare type FormsAppUser = {
  id: number,
  email: string,
  formsAppId: number,
  createdAt: string,
}

type RolePrivileges = {
  ANALYTICS?: 'ANALYST' | 'READER',
  API_HOSTING?: 'MANAGER' | 'DEVELOPER' | 'READONLY',
  AUTH?: 'MANAGER' | 'READONLY',
  BUILDBOT?: 'BUILDER',
  FORMS?: 'MANAGER' | 'READONLY',
  FORM_SUBMISSIONS?: 'READONLY',
  FORM_OPTIONS_SETS?: 'MANAGER' | 'READONLY',
  FORMS_APPS?: 'MANAGER' | 'READONLY',
  FORMS_APP_STYLES?: 'MANAGER' | 'READONLY',
  FORMS_APP_USERS?: 'MANAGER' | 'READONLY',
  KEYS?: 'MANAGER' | 'READONLY',
  WEB_APP_HOSTING?: 'MANAGER' | 'DEVELOPER' | 'READONLY',
}

type Role = {
  id: number,
  name: string,
  description: string,
  privilege: RolePrivileges,
  organisationId: string,
  createdAt: string,
  updatedAt: string,
}

declare type JobsSearchOptions = {
  username?: string,
  externalId?: string,
  formId?: number,
  isSubmitted?: boolean,
  limit?: number,
  offset?: number,
}

declare type JobsSearchResult = {
  meta: {
    limit: number,
    offset: number,
  },
  jobs: Job[],
}

declare type FormSubmissionMetadata = {
  submissionId: string,
  formId: number,
  formName: string,
  dateTimeSubmitted: string,
  user?: FormSubmissionMetaUserDetails,
  key?: {
    id: string,
    name: string,
  },
}

declare type FormSubmissionHistorySearchResults = BaseSearchResult & {
  formSubmissionMeta: FormSubmissionMetadata[],
}

declare type FormSubmissionHistorySearchParameters = {
  formId: number,
  submissionDateFrom?: string,
  submissionDateTo?: string,
  limit?: number,
  offset?: number,
}

declare type TenantConfiguration = {
  test: {
    apiOrigin: string,
    jwtIssuer: string,
  },
  prod: {
    apiOrigin: string,
    jwtIssuer: string,
  },
}

declare type JwksClient = Object

declare type Tenant = {
  apiOrigin: string,
  jwtIssuer: string,
  jwksInstance: JwksClient,
}
