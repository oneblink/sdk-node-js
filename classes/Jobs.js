// @flow
'use strict'

const Joi = require('joi')

const OneBlinkAPI = require('../lib/one-blink-api.js')
const setPreFillData = require('../lib/pre-fill-data.js')
const getTenantUrl = require('../lib/tenant')
const newJobSchema = Joi.object()
  .label('options')
  .required()
  .keys({
    username: Joi.string().required(),
    formId: Joi.number()
      .required()
      .min(1),
    externalId: Joi.string(),
    details: Joi.object()
      .required()
      .keys({
        key: Joi.string(),
        title: Joi.string().required(),
        description: Joi.string(),
        type: Joi.string(),
        priority: Joi.number()
      })
  })

module.exports = class Jobs extends OneBlinkAPI {
  constructor(options /* : ConstructorOptions */) {
    options = options || {}
    super(
      getTenantUrl(options.tenant, options.oneBlinkAPIOrigin),
      options.accessKey,
      options.secretKey
    )
  }

  async createJob(
    options /* : ?mixed */,
    preFillData /* : ?mixed */
  ) /* : Promise<Job> */ {
    await Promise.resolve()

    const result = Joi.validate(options, newJobSchema, { stripUnknown: true })
    if (result.error) {
      throw result.error
    }

    const newJob /* : NewJob */ = result.value

    if (preFillData) {
      const preFillMeta = await super.postRequest(
        `/forms/${newJob.formId}/pre-fill-credentials`
      )
      await setPreFillData(preFillMeta, preFillData)
      newJob.preFillFormDataId = preFillMeta.preFillFormDataId
    }

    const job = await super.postRequest/*:: <NewJob, Job> */('/jobs', newJob)

    return job
  }

  deleteJob(jobId /* : ?mixed */) /* : Promise<void> */ {
    if (!jobId || typeof jobId !== 'string') {
      return Promise.reject(new TypeError('Must supply "jobId" as a string'))
    }

    return super.deleteRequest(`/jobs/${jobId}`)
  }

  async searchJobs(
    options /* : ?mixed */
  ) /* : Promise<JobsSearchResult> */ {
    let searchOptions = {}

    if (options) {
      if (options.externalId) {
        if (typeof options.externalId !== 'string') {
          throw new TypeError(
            `externalId must be provided as a string or not at all`
          )
        }
        searchOptions = Object.assign(searchOptions, { externalId: options.externalId })
      }

      if (options.username) {
        if (typeof options.username !== 'string') {
          throw new TypeError(
            `username must be provided as a string or not at all`
          )
        }
        searchOptions = Object.assign(searchOptions, { username: options.username })
      }

      if (options.isSubmitted) {
        if (typeof options.isSubmitted !== 'boolean') {
          throw new TypeError(
            `isSubmitted must be provided as a boolean or not at all`
          )
        }
        searchOptions = Object.assign(searchOptions, { isSubmitted: options.isSubmitted })
      }

      if (options.formId) {
        if (typeof options.formId !== 'number') {
          throw new TypeError(`formId must be provided as a number or not at all`)
        }
        searchOptions = Object.assign(searchOptions, { formId: options.formId })
      }

      if (options.limit) {
        if (typeof options.limit !== 'number') {
          throw new TypeError(`limit must be provided as a number or not at all`)
        }
        searchOptions = Object.assign(searchOptions, { limit: options.limit })
      }

      if (options.offset) {
        if (typeof options.offset !== 'number') {
          throw new TypeError(`offset must be provided as a number or not at all`)
        }
        searchOptions = Object.assign(searchOptions, { offset: options.offset })
      }
    }

    const results =
      await super.searchRequest/*:: <JobsSearchOptions, JobsSearchResult> */(`/jobs`, searchOptions)

    return results
  }
}
