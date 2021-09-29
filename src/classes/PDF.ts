import { URLSearchParams } from 'url'
import { PDFTypes } from '@oneblink/types'
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
      excludedElementIds?: string[]
      usePagesAsBreaks?: boolean
    }): Promise<Buffer> {
      if (!options) {
        throw new TypeError('Must supply "options" as a string')
      }
      const {
        submissionId,
        formId,
        isDraft,
        includeSubmissionIdInPdf,
        excludedElementIds,
        usePagesAsBreaks,
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
          Accept: `application/pdf`,
        },
        body: JSON.stringify({ excludedElementIds, usePagesAsBreaks }),
      })

      return response.buffer()
    }

    async generatePDF(options: PDFTypes.GeneratePDFOptions): Promise<Buffer> {
      if (!options || !options.body || !options.body.html) {
        throw new TypeError('Must supply "options.body.html" as a string')
      }

      const response = await super.request({
        origin: this.tenant.pdfOrigin,
        method: 'POST',
        path: '/pdf-document',
        body: JSON.stringify(options),
        headers: {
          Accept: `application/pdf`,
          'Content-Type': `application/json`,
        },
      })

      return response.buffer()
    }
  }
