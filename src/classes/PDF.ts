import {
  PDFTypes,
  SubmissionEventTypes,
  SubmissionTypes,
} from '@oneblink/types'
import OneBlinkAPI from '../lib/one-blink-api'
import { ConstructorOptions } from '../types'

export default class PDF extends OneBlinkAPI {
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
   * const pdf = new OneBlink.PDF(options)
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
   * const fs = require('fs')
   * const util = require('util')
   *
   * const writeFileAsync = util.promisify(fs.writeFile)
   *
   * async function run() {
   *   const buffer = await pdf.generateFormSubmissionPDF({
   *     formId: 1,
   *     submissionId: 'c63ec3ac-12ab-447c-951c-2815d0e6fc24',
   *     isDraft: false,
   *     includeSubmissionIdInPdf: false,
   *     includeExternalIdInPdf: false,
   *     excludedElementIds: ['1ae6d5f5-eade-411c-b85a-45fe40fe469e'],
   *   })
   *   await writeFileAsync('./submission.pdf', buffer, 'binary')
   * }
   * ```
   *
   * @param options An object containing all parameters to be passed into the
   *   function.
   * @returns
   *
   *   ## Role Permissions Required
   *
   *   Form Submissions: `Manager` or `Read Only`
   */
  async generateFormSubmissionPDF(
    options: {
      /** The exact identifier of the form you wish to generate a pdf for */
      formId: number
      /** The submission identifier generated after a successful form submission */
      submissionId: string
      /** `true` if the submission is a draft submission, otherwise `false` */
      isDraft?: boolean
    } & Omit<SubmissionEventTypes.PDFConfiguration, 'fileName'>,
  ): Promise<Buffer> {
    if (!options) {
      throw new TypeError('Must supply "options" as a string')
    }
    const { submissionId, formId, ...body } = options
    if (!submissionId || typeof submissionId !== 'string') {
      throw new TypeError('Must supply "options.submissionId" as a string')
    }
    if (Number.isNaN(formId) || typeof formId !== 'number') {
      throw new TypeError('Must supply "options.formId" as a number')
    }

    const response = await super.request({
      origin: OneBlinkAPI.tenant.apiOrigin,
      method: 'POST',
      path: `/forms/${formId}/submissions/${submissionId}/pdf-document`,
      headers: {
        Accept: `application/pdf`,
      },
      body: JSON.stringify(body),
    })

    return response.buffer()
  }

  /**
   * ## Example
   *
   * ```javascript
   * const fs = require('fs')
   * const util = require('util')
   *
   * const writeFileAsync = util.promisify(fs.writeFile)
   *
   * async function run() {
   *   const buffer = await pdf.generatePDF({
   *     body: {
   *       html: `
   *         <p>I will be in the middle</p>
   *       `,
   *     },
   *     header: {
   *       html: `
   *       <div style="font-size: 9px; margin: 0 15px; width: 100%; text-align: center;">
   *         I will be at the top of every page
   *       </div>
   *       `,
   *     },
   *     footer: {
   *       html: `
   *       <div style="font-size: 9px; margin: 0 15px; width: 100%; text-align: center;">
   *         I will be at the bottom of every page ({_BLINK_PAGE_NO_}/{_BLINK_PAGES_})
   *       </div>
   *       `,
   *     },
   *     page: {
   *       orientation: 'Portrait',
   *       size: 'A4',
   *       margins: {
   *         top: '15mm',
   *         right: '5mm',
   *         bottom: '15mm',
   *         left: '5mm',
   *       },
   *     },
   *   })
   *   await writeFileAsync('./custom.pdf', buffer, 'binary')
   * }
   * ```
   *
   * @returns
   *
   *   ## Role Permissions Required
   *
   *   PDF Generation: `On`
   */
  async generatePDF(options: PDFTypes.GeneratePDFOptions): Promise<Buffer> {
    if (!options || !options.body || !options.body.html) {
      throw new TypeError('Must supply "options.body.html" as a string')
    }

    const response = await super.request({
      origin: OneBlinkAPI.tenant.apiOrigin,
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

  /**
   * ## Example
   *
   * ```javascript
   * const fs = require('fs')
   * const util = require('util')
   *
   * const writeFileAsync = util.promisify(fs.writeFile)
   *
   * async function run() {
   *   const buffer = await pdf.generatePdfFromSubmissionData({
   *     submissionData: {
   *       submission: {
   *         myElementName: 'text 123'
   *       },
   *       definition: {} // form definition
   *       submissionTimestamp: new Date().toISOString(),
   *       formsAppId: 1
   *     },
   *     excludedElementIds: ['1ae6d5f5-eade-411c-b85a-45fe40fe469e'],
   *     usePagesBreaks: true,
   *     excludedCSSClasses: []
   *     includeExternalIdInPdf: false,
   *   })
   *   await writeFileAsync('./submission.pdf', buffer, 'binary')
   * }
   * ```
   *
   * @param options An object containing all parameters to be passed into the
   *   function.
   * @returns
   *
   *   ## Role Permissions Required
   *
   *   PDF Generation: `On`
   */
  async generatePdfFromSubmissionData(options: {
    submissionData: SubmissionTypes.S3SubmissionData
    excludedElementIds?: string[]
    usePagesBreaks?: boolean
    excludedCSSClasses?: string[]
    includeExternalIdInPdf?: boolean
  }): Promise<Buffer> {
    const response = await super.request({
      origin: OneBlinkAPI.tenant.apiOrigin,
      method: 'POST',
      path: '/generate-pdf',
      body: JSON.stringify(options),
      headers: {
        Accept: `application/pdf`,
        'Content-Type': `application/json`,
      },
    })

    return response.buffer()
  }
}
