import { URLSearchParams } from 'url'
import OneBlinkAPI from '../lib/one-blink-api'
import { ConstructorOptions, Tenant } from '../lib/types'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (tenant: Tenant) =>
  class PDF extends OneBlinkAPI {
    constructor(options: ConstructorOptions) {
      options = options || {}
      super(options.accessKey, options.secretKey, tenant)
    }

    async generateFormSubmissionPDF(options: {
      formId: number
      submissionId: string
      isDraft?: boolean
      includeSubmissionIdInPdf?: boolean
    }): Promise<Buffer> {
      if (!options) {
        throw new TypeError('Must supply "options" as a string')
      }
      const {
        submissionId,
        formId,
        isDraft,
        includeSubmissionIdInPdf,
      } = options
      if (!submissionId || typeof submissionId !== 'string') {
        throw new TypeError('Must supply "options.submissionId" as a string')
      }
      if (Number.isNaN(formId) || typeof formId !== 'number') {
        throw new TypeError('Must supply "options.formId" as a number')
      }

      const urlSearchParams = new URLSearchParams()
      if (isDraft !== undefined) {
        urlSearchParams.append('isDraft', isDraft.toString())
      }
      if (includeSubmissionIdInPdf !== undefined) {
        urlSearchParams.append(
          'includeSubmissionIdInPdf',
          includeSubmissionIdInPdf.toString(),
        )
      }
      const response = await super.request({
        origin: this.tenant.pdfOrigin,
        method: 'POST',
        path: `/forms/${formId}/submissions/${submissionId}/pdf-document?${urlSearchParams.toString()}`,
        headers: {
          'Content-Type': `application/pdf`,
        },
      })

      return response.buffer()
    }
  }
