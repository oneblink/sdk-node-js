import {
  ApprovalTypes,
  EmailTemplateTypes,
  EnvironmentTypes,
  FormTypes,
  SubmissionTypes,
  MiscTypes,
  AWSTypes,
} from '@oneblink/types'
import jwksClient from 'jwks-rsa'
import { SendMailOptions } from 'nodemailer'
export * from '@oneblink/types'

export type ConstructorOptions = {
  accessKey: string
  secretKey: string
}

export type PreFillMeta = AWSTypes.FormS3Credentials & {
  preFillFormDataId: string
}

export type BaseSearchOptions = {
  /** Limit the number of results returned */
  limit?: number
  /** Skip a specific number of results, used in conjunction with `limit` to enforce paging */
  offset?: number
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
  MiscTypes.BaseSearchResult & {
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
} & MiscTypes.BaseSearchResult

export type FormsSearchOptions = BaseSearchOptions & {
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
}

export type FormSubmissionHistorySearchParameters = BaseSearchOptions & {
  /** Search for Submissions for a particular form Id */
  formId: number
  /** Search for Submissions starting at this date */
  submissionDateFrom?: string
  /** Search for Submissions ending on this date */
  submissionDateTo?: string
}

export type FormSubmissionHistorySearchResults = MiscTypes.BaseSearchResult & {
  formSubmissionMeta: SubmissionTypes.FormSubmissionMeta[]
}

export type EmailTemplatesSearchResult = {
  emailTemplates: EmailTemplateTypes.EmailTemplate[]
} & MiscTypes.BaseSearchResult

export type EmailTemplatesSearchOptions = BaseSearchOptions

export type FormSubmissionMetaResult = {
  formSubmissionMeta: SubmissionTypes.FormSubmissionMeta
  formApprovalFlowInstance?: ApprovalTypes.FormApprovalFlowInstance
  formSubmissionApprovals?: ApprovalTypes.FormSubmissionApproval[]
  formSubmissionPayments?: SubmissionTypes.FormSubmissionPayment[]
}

export { SendMailOptions }

export type SendEmailResult = {
  envelope: {
    from: string
    to: string[]
  }
  messageId: string
  response: string
  raw: string
}

export type FormsAppEnvironmentsSearchResult = {
  formsAppEnvironments: EnvironmentTypes.FormsAppEnvironment[]
} & MiscTypes.BaseSearchResult

export type FormsAppEnvironmentsSearchOptions = BaseSearchOptions

export type JobsSearchResult = MiscTypes.BaseSearchResult & {
  jobs: SubmissionTypes.FormsAppJob[]
}
