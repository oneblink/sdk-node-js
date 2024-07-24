import OneBlinkAPI from '../lib/one-blink-api'
import {
  ConstructorOptions,
  FormApprovalFlowInstanceResponse,
  FormSubmissionApprovalResponse,
  FormSubmissionsAdministrationApprovalsResponse,
} from '../types'

export default class Approvals extends OneBlinkAPI {
  /**
   * ## Example
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
   * ## Example
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
   *
   *   ## Role Permissions Required
   *
   *   Submission Data: `Manager` or `Read Only`
   */
  async searchFormSubmissionAdministrationApprovals({
    formsAppId,
    limit,
    offset,
    ...rest
  }: {
    /** The formsAppId of the approvals app */
    formsAppId: number
    /** The formId of the approvals */
    formId?: number
    /** An exact externalId to search by */
    externalId?: string
    /** An exact submissionId to search by */
    submissionId?: string
    /** The date submitted after as an ISO string */
    submittedAfterDateTime?: string
    /** The date submitted before as an ISO string */
    submittedBeforeDateTime?: string
    /** The number of results to return. Maximum is 50 */
    limit: number
    /**
     * The offset of the results to return. Use this in conjunction with `limit`
     * for pagination
     */
    offset: number
    /**
     * An array of statuses to filter by (`'PENDING'`,
     * `'CLARIFICATION_RECEIVED'`, `'CLARIFICATION_REQUIRED'`, `'APPROVED'`,
     * `'CLOSED'`)
     */
    statuses?: string[]
    /** The date updated after as an ISO string */
    updatedAfterDateTime?: string
    /** The date updated before as an ISO string */
    updatedBeforeDateTime?: string
    /** An array of usernames to filter by */
    lastUpdatedBy?: string[]
    /** The exact formApprovalFlowInstanceId to search by */
    formApprovalFlowInstanceId?: number
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
   * ## Example
   *
   * ```javascript
   * const formSubmissionApproval =
   *   await approvals.getFormSubmissionApproval(
   *     'aaaaaaaa-bbbb-4543-cccc-addddd543454',
   *   )
   * // Use data here...
   * ```
   *
   * @param id The id of the form submission approval
   * @returns
   *
   *   ## Role Permissions Required
   *
   *   Submission Data: `Manager` or `Read Only`
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
   * ## Example
   *
   * ```javascript
   * const formSubmissionApproval =
   *   await approvals.getFormApprovalFlowInstance(1)
   * // Use data here...
   * ```
   *
   * @param id The id of the form approval flow instance
   * @returns
   *
   *   ## Role Permissions Required
   *
   *   Submission Data: `Manager` or `Read Only`
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
