import { SubmissionTypes } from '@oneblink/types'
import Joi from 'joi'

import OneBlinkAPI from '../lib/one-blink-api'
import setPreFillData from '../lib/pre-fill-data'
import { ConstructorOptions, PreFillMeta, Tenant } from '../lib/types'

const newJobSchema = Joi.object()
  .label('options')
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

type JobsSearchResult = {
  meta: {
    limit: number
    offset: number
  }
  jobs: SubmissionTypes.FormsAppJob[]
}

export default (tenant: Tenant) =>
  class Jobs extends OneBlinkAPI {
    constructor(options: ConstructorOptions) {
      options = options || {}
      super(options.accessKey, options.secretKey, tenant)
    }

    async createJob(
      options?: unknown,
      preFillData?: unknown,
    ): Promise<SubmissionTypes.FormsAppJob> {
      const result = Joi.validate(options, newJobSchema, { stripUnknown: true })
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

    deleteJob(jobId?: unknown): Promise<void> {
      if (!jobId || typeof jobId !== 'string') {
        return Promise.reject(new TypeError('Must supply "jobId" as a string'))
      }

      return super.deleteRequest(`/jobs/${jobId}`)
    }

    async searchJobs(
      options?: Record<string, unknown>,
    ): Promise<JobsSearchResult> {
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
