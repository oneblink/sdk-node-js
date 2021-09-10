import OneBlinkAPI from '../lib/one-blink-api'
import { SubmissionTypes, ApprovalTypes, FormTypes } from '@oneblink/types'
import { Tenant, ConstructorOptions } from '../lib/types'

export type FormSubmissionApprovalHistoryRecord = {
  formSubmissionMeta: SubmissionTypes.FormSubmissionMeta
  formApprovalFlowInstance: ApprovalTypes.FormApprovalFlowInstance
  formSubmissionApprovals: ApprovalTypes.FormSubmissionApproval[]
}

export type FormSubmissionsAdministrationApprovalsResponse = {
  approvals: Array<
    FormSubmissionApprovalHistoryRecord & {
      history: FormSubmissionApprovalHistoryRecord[]
    }
  >
  meta: {
    limit?: number
    offset?: number
    nextOffset?: number
  }
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (tenant: Tenant) =>
  class Approvals extends OneBlinkAPI {
    constructor(options: ConstructorOptions) {
      options = options || {}
      super(options.accessKey, options.secretKey, tenant)
    }

    async searchFormSubmissionAdministrationApprovals({
      formsAppId,
      limit,
      offset,
      ...rest
    }: {
      formsAppId: number
      formId?: number
      externalId?: string
      submissionid?: string
      submittedAfterDateTime?: string
      submittedBeforeDateTime?: string
      limit: number
      offset: number
      statuses?: string[]
      updatedAfterDateTime?: string
      updatedBeforeDateTime?: string
      lastUpdatedBy?: string[]
    }): Promise<FormSubmissionsAdministrationApprovalsResponse> {
      if (typeof formsAppId !== 'number') {
        throw new Error('"formsAppId" must be a number and is required')
      }
      if (typeof limit !== 'number' || typeof offset !== 'number') {
        throw new Error('"limit" and "offset" are required')
      }
      return await super.searchRequest(`/forms-apps/${formsAppId}/approvals`, {
        limit,
        offset,
        ...rest,
      })
    }

    async getFormSubmissionApproval(
      id: string,
    ): Promise<FormSubmissionApprovalResponse> {
      if (!id) {
        throw new Error('"id" must be a string and is required')
      }
      return await super.getRequest(`/form-submission-approvals/${id}`)
    }

    async getFormApprovalFlowInstance(
      id: number,
    ): Promise<FormApprovalFlowInstanceResponse> {
      if (typeof id !== 'number') {
        throw new Error('"id" must be a number and is required')
      }
      return await super.getRequest(`/form-approval-flow-instances/${id}`)
    }
  }
