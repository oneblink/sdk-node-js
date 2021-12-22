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
  formsAppEnvironments: EmailTemplateTypes.EmailTemplate[]
} & MiscTypes.BaseSearchResult

export type EmailTemplatesSearchOptions = BaseSearchOptions & {
  /**
   * Search on the `formsAppEnvironmentId` property of a email template. Must be
   * the exact match of a `formsAppEnvironmentId`.
   */
  formsAppEnvironmentId: number
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

export interface FormMigrationOptions {
  /** formsAppEnvironmentId is required. The Forms App Environment to migrate to  */
  formsAppEnvironmentId: number
  /** sourceFormId is required. The form to migrate */
  sourceFormId: number
  /** targetFormId can be omitted to create a new form, otherwise the form Id to update in the target environment */
  targetFormId?: number
  /** should form elements be migrated */
  elements: boolean
  /** should submission events be migrated */
  submissionEvents: boolean
  /** should server validations be migrated */
  serverValidation: boolean
  /** should external id generation config be migrated */
  externalIdGeneration: boolean
  /** should the post submission action be migrated */
  postSubmissionAction: boolean
}
