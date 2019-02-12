// @flow
'use strict'

const Joi = require('joi')

const OneBlinkAPI = require('../lib/one-blink-api.js')
const setPreFillData = require('../lib/pre-fill-data.js')

const newJobSchema = Joi.object().label('options').required().keys({
  'username': Joi.string().required(),
  'formId': Joi.number().required().min(1),
  'externalId': Joi.string(),
  'details': Joi.object().required().keys({
    'key': Joi.string(),
    'title': Joi.string().required(),
    'description': Joi.string(),
    'type': Joi.string()
  })
})

module.exports = class Jobs extends OneBlinkAPI {
  constructor (
    options /* : ConstructorOptions */
  ) {
    options = options || {}
    super(
      options.oneBlinkAPIOrigin,
      options.accessKey,
      options.secretKey
    )
  }

  async createJob (
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
      const preFillMeta = await super.postRequest(`/forms/${newJob.formId}/pre-fill-credentials`)
      await setPreFillData(preFillMeta, preFillData)
      newJob.preFillFormDataId = preFillMeta.preFillFormDataId
    }

    const job /* Job */ = await super.postRequest('/jobs', newJob)

    return job
  }

  deleteJob (
    jobId /* : ?mixed */
  ) /* : Promise<void> */ {
    if (!jobId || typeof jobId !== 'string') {
      return Promise.reject(new TypeError('Must supply "jobId" as a string'))
    }

    return super.deleteRequest(`/jobs/${jobId}`)
  }
}
