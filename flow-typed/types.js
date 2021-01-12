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

declare type FormSubmissionHistorySearchResults = BaseSearchResult & {
  formSubmissionMeta: FormSubmissionMeta[],
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
