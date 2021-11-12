import {
  ApprovalTypes,
  EmailTemplateTypes,
  EnvironmentTypes,
  FormTypes,
  OrganisationTypes,
  SubmissionTypes,
} from '@oneblink/types'
import jwksClient from 'jwks-rsa'
export * from '@oneblink/types'

export type ConstructorOptions = {
  accessKey: string
  secretKey: string
}

export type AWSCredentials = {
  AccessKeyId: string
  SecretAccessKey: string
  SessionToken: string
}

export type FormRetrievalData = {
  credentials: AWSCredentials
  s3: {
    bucket: string
    key: string
    region: string
  }
}

export type PreFillMeta = FormRetrievalData & {
  preFillFormDataId: string
}

export type BaseSearchResult = {
  meta: {
    limit: null
    offset: null
    nextOffset: null
  }
}

export type TenantBase = {
  awsRegion: string
}

export type TenantEnvironment = {
  apiOrigin: string
  pdfOrigin: string
  jwtIssuer: string
}

export type TenantConfiguration = TenantBase & {
  test: TenantEnvironment
  prod: TenantEnvironment
}

export type Tenant = TenantBase &
  TenantEnvironment & {
    jwksInstance: jwksClient.JwksClient
  }

export type FormSubmissionApprovalHistoryRecord = {
  formSubmissionMeta: SubmissionTypes.FormSubmissionMeta
  formApprovalFlowInstance: ApprovalTypes.FormApprovalFlowInstance
  formSubmissionApprovals: ApprovalTypes.FormSubmissionApproval[]
}

export type FormSubmissionsAdministrationApprovalsResponse =
  BaseSearchResult & {
    approvals: Array<
      FormSubmissionApprovalHistoryRecord & {
        history: FormSubmissionApprovalHistoryRecord[]
      }
    >
  }

export type FormSubmissionApprovalResponse = {
  formSubmissionMeta: SubmissionTypes.FormSubmissionMeta
  formSubmissionApproval: ApprovalTypes.FormSubmissionApproval
  formApprovalFlowInstance: ApprovalTypes.FormApprovalFlowInstance
  form: FormTypes.Form
  history: FormSubmissionApprovalHistoryRecord[]
}

export type FormApprovalFlowInstanceResponse = {
  formSubmissionMeta: SubmissionTypes.FormSubmissionMeta
  formApprovalFlowInstance: ApprovalTypes.FormApprovalFlowInstance
  form: FormTypes.Form
  formSubmissionApprovals: ApprovalTypes.FormSubmissionApproval[]
}

export type FormsSearchResult = {
  forms: FormTypes.Form[]
} & BaseSearchResult

export type FormsSearchOptions = {
  /**
   * Search on the `isAuthenticated` property of a form. Must be either `true`
   * or `false` or not specified.
   */
  isAuthenticated?: boolean
  /** Search on the `name` property of a form. Can be a prefix, suffix or partial match */
  name?: string
  /**
   * Search on the `isInfoPage` property of a form. Must be either `true` or
   * `false` or not specified.
   */
  isInfoPage?: boolean
  /**
   * Search on the `formsAppIds` property of a form. Must be the exact match of
   * one the ids in `formsAppIds`.
   */
  formsAppId?: number
  /**
   * Search on the `formsAppEnvironmentId` property of a form. Must be the exact
   * match of a `formsAppEnvironmentId`.
   */
  formsAppEnvironmentId?: number
  /** Limit the number of results returned */
  limit?: number
  /** Skip a specific number of results, used in conjunction with `limit` to enforce paging */
  offset?: number
}

export type FormSubmissionHistorySearchParameters = {
  /** Search for Submissions for a particular form Id */
  formId: number
  /** Search for Submissions starting at this date */
  submissionDateFrom?: string
  /** Search for Submissions ending on this date */
  submissionDateTo?: string
  /** Limit the number of results returned */
  limit?: number
  /** Skip a specific number of results, used in conjunction with `limit` to enforce paging */
  offset?: number
}

export type FormSubmissionHistorySearchResults = BaseSearchResult & {
  formSubmissionMeta: SubmissionTypes.FormSubmissionMeta[]
}

export type EmailTemplatesSearchResult = {
  formsAppEnvironments: EmailTemplateTypes.EmailTemplate[]
} & BaseSearchResult

export type EmailTemplatesSearchOptions = {
  formsAppEnvironmentId: number
  limit?: number
  offset?: number
}

export type OrganisationsSearchResult = {
  organisations: OrganisationTypes.Organisation[]
} & BaseSearchResult

export type FormsAppEnvironmentsSearchResult = {
  formsAppEnvironments: EnvironmentTypes.FormsAppEnvironment[]
} & BaseSearchResult

export type FormsAppEnvironmentsSearchOptions = {
  limit?: number
  offset?: number
}
