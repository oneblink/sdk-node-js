import { SubmissionTypes } from '@oneblink/types'
import Joi from 'joi'

import OneBlinkAPI from '../lib/one-blink-api'
import setPreFillData from '../lib/pre-fill-data'
import { ConstructorOptions, PreFillMeta, JobsSearchResult } from '../types'

const newJobSchema = Joi.object()
  .required()
  .keys({
    username: Joi.string().required(),
    formId: Joi.number().required().min(1),
    externalId: Joi.string(),
    details: Joi.object().required().keys({
      key: Joi.string(),
      title: Joi.string().required(),
      description: Joi.string(),
      type: Joi.string(),
      priority: Joi.number(),
    }),
  })

export default class Jobs extends OneBlinkAPI {
  /**
   * #### Example
   *
   * ```typescript
   * const OneBlink = require('@oneblink/sdk')
   *
   * const options = {
   *   accessKey: '123455678901ABCDEFGHIJKL',
   *   secretKey: '123455678901ABCDEFGHIJKL123455678901ABCDEFGHIJKL',
   * }
   * const jobs = new OneBlink.Jobs(options)
   * ```
   */
  constructor(options: ConstructorOptions) {
    options = options || {}
    super(options.accessKey, options.secretKey)
  }

  /**
   * Create a single Job
   *
   * #### Example
   *
   * ```javascript
   * const newJob = {
   *   username: 'user@domain.io',
   *   formId: 1,
   *   externalId: 'your-job-identifier',
   *   details: {
   *     key: 'JOB-123',
   *     title: 'Job Title',
   *     description: 'Job description',
   *     type: 'Type',
   *     priority: 3,
   *   },
   * }
   *
   * const preFillData = {
   *   text_element: 'abc',
   *   number_element: 123,
   * }
   *
   * jobs.createJob(newJob, preFillData).then((job) => {
   *   // job.id can be used to delete the Job
   * })
   * ```
   *
   * @param data The Job to create
   * @param preFillData Key/value pairs with the form field names as keys and
   *   the pre-fill data as the values
   */
  async createJob(
    data: SubmissionTypes.NewFormsAppJob,
    preFillData?: Record<string, unknown>,
  ): Promise<SubmissionTypes.FormsAppJob> {
    const result = newJobSchema.validate(data, { stripUnknown: true })
    if (result.error) {
      throw result.error
    }

    const newJob = result.value as SubmissionTypes.NewFormsAppJob

    if (preFillData) {
      const preFillMeta = await super.postEmptyRequest<PreFillMeta>(
        `/forms/${newJob.formId}/pre-fill-credentials`,
      )
      await setPreFillData(preFillMeta, preFillData)
      newJob.preFillFormDataId = preFillMeta.preFillFormDataId
    }

    const job: SubmissionTypes.FormsAppJob = await super.postRequest(
      '/jobs',
      newJob,
    )

    return job
  }

  /**
   * Delete a single Job
   *
   * #### Example
   *
   * ```javascript
   * const jobId = 'f73985fd-2dba-4bf7-abbe-e204889f5216'
   * jobs.deleteJob(jobId).then(() => {
   *   // Job has been deleted
   * })
   * ```
   *
   * @param jobId The exact id of the job you wish to delete
   */
  deleteJob(jobId: string): Promise<void> {
    if (!jobId || typeof jobId !== 'string') {
      return Promise.reject(new TypeError('Must supply "jobId" as a string'))
    }

    return super.deleteRequest(`/jobs/${jobId}`)
  }

  /**
   * Search Jobs
   *
   * #### Example
   *
   * ```javascript
   * const results = await jobs.searchJobs({
   *   username: 'user@domain.io',
   *   formId: 10,
   * })
   *
   * // an array of jobs
   * const jobs = results.jobs
   * ```
   *
   * @param options Search options
   */
  async searchJobs(options?: {
    /** The `externalId` property of a job */
    externalId?: string
    /** The `formId` matching the form that a job was created for */
    formId?: number
    /** The `username` that the job was assigned to */
    username?: string
    /** Whether the job has been submitted or not */
    isSubmitted?: boolean
    /** Limit the number of jobs returned */
    limit?: number
    /**
     * Skip a specific number of results, used in conjunction with `limit` to
     * enforce paging
     */
    offset?: number
  }): Promise<JobsSearchResult> {
    let searchOptions = {}

    if (options) {
      if (options.externalId) {
        if (typeof options.externalId !== 'string') {
          throw new TypeError(
            `externalId must be provided as a string or not at all`,
          )
        }
        searchOptions = Object.assign(searchOptions, {
          externalId: options.externalId,
        })
      }

      if (options.username) {
        if (typeof options.username !== 'string') {
          throw new TypeError(
            `username must be provided as a string or not at all`,
          )
        }
        searchOptions = Object.assign(searchOptions, {
          username: options.username,
        })
      }

      if (options.isSubmitted) {
        if (typeof options.isSubmitted !== 'boolean') {
          throw new TypeError(
            `isSubmitted must be provided as a boolean or not at all`,
          )
        }
        searchOptions = Object.assign(searchOptions, {
          isSubmitted: options.isSubmitted,
        })
      }

      if (options.formId) {
        if (typeof options.formId !== 'number') {
          throw new TypeError(
            `formId must be provided as a number or not at all`,
          )
        }
        searchOptions = Object.assign(searchOptions, {
          formId: options.formId,
        })
      }

      if (options.limit) {
        if (typeof options.limit !== 'number') {
          throw new TypeError(
            `limit must be provided as a number or not at all`,
          )
        }
        searchOptions = Object.assign(searchOptions, { limit: options.limit })
      }

      if (options.offset) {
        if (typeof options.offset !== 'number') {
          throw new TypeError(
            `offset must be provided as a number or not at all`,
          )
        }
        searchOptions = Object.assign(searchOptions, {
          offset: options.offset,
        })
      }
    }

    const results: JobsSearchResult = await super.searchRequest(
      `/jobs`,
      searchOptions,
    )

    return results
  }
}
