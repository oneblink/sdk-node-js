import OneBlinkAPI from '../lib/one-blink-api'
import {
  ConstructorOptions,
  FormApprovalFlowInstanceResponse,
  FormSubmissionApprovalResponse,
  FormSubmissionsAdministrationApprovalsResponse,
} from '../types'

export default class Approvals extends OneBlinkAPI {
  /**
   * Example
   *
   * ```typescript
   * const OneBlink = require('@oneblink/sdk')
   *
   * const options = {
   *   accessKey: '123455678901ABCDEFGHIJKL',
   *   secretKey: '123455678901ABCDEFGHIJKL123455678901ABCDEFGHIJKL',
   * }
   *
   * const approvals = new OneBlink.Approvals(options)
   * ```
   */
  constructor(options: ConstructorOptions) {
    options = options || {}
    super(options.accessKey, options.secretKey)
  }

  /**
   * Example
   *
   * ```javascript
   * const { approvals, meta } =
   *   await approvals.searchFormSubmissionAdministrationApprovals({
   *     formsAppId: 1,
   *     formId: 2,
   *     limit: 50,
   *     offset: 0,
   *   })
   * ```
   *
   * @param options Search options
   * @returns
   */
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

  /**
   * Example
   *
   * ```javascript
   * const formSubmissionApproval =
   *   await approvals.getFormApprovalFlowInstance(1)
   * // Use data here...
   * ```
   *
   * @param id The id of the form submission approval
   * @returns
   */
  async getFormSubmissionApproval(
    id: string,
  ): Promise<FormSubmissionApprovalResponse> {
    if (!id) {
      throw new Error('"id" must be a string and is required')
    }
    return await super.getRequest(`/form-submission-approvals/${id}`)
  }

  /**
   * Example
   *
   * ```javascript
   * const formSubmissionApproval =
   *   await approvals.getFormApprovalFlowInstance(1)
   * // Use data here...
   * ```
   *
   * @param id The id of the form approval flow instance
   * @returns
   */
  async getFormApprovalFlowInstance(
    id: number,
  ): Promise<FormApprovalFlowInstanceResponse> {
    if (typeof id !== 'number') {
      throw new Error('"id" must be a number and is required')
    }
    return await super.getRequest(`/form-approval-flow-instances/${id}`)
  }
}
