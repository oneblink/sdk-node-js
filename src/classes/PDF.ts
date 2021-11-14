import { URLSearchParams } from 'url'
import { PDFTypes } from '@oneblink/types'
import OneBlinkAPI from '../lib/one-blink-api'
import { ConstructorOptions } from '../types'

export default class PDF extends OneBlinkAPI {
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
   * const keys = new OneBlink.Keys(options)
   * ```
   */
  constructor(options: ConstructorOptions) {
    options = options || {}
    super(options.accessKey, options.secretKey)
  }

  /**
   * ```javascript
   * const fs = require('fs')
   * const util = require('util')
   * 
   * const writeFileAsync = util.promisify(fs.writeFile)
   * 
   * async function run() {
   *     const buffer = await pdf.generateFormSubmissionPDF({
   *     formId: 1,
   *     submissionId: 'c63ec3ac-12ab-447c-951c-2815d0e6fc24',
   *     isDraft: false,
   *     includeSubmissionIdInPdf: false,
   *     excludedElementIds: ['1ae6d5f5-eade-411c-b85a-45fe40fe469e'],
   *   })
   *   await writeFileAsync('./submission.pdf', buffer, 'binary')
   * }
   * ```
   * @param options.formId The exact identifer of the form you wish to generate a pdf for 
   * @param options.submissionId The submission identifier generated after a successful form submission.
   * @param options.isDraft `true` if the submission is a draft submission, otherwise `false` 
   * @param options.includeSubmissionIdInPdf `true` to include the submission identifier in the PDF, otherwise `false` 
   * @param options.excludedElementIds Array of elements ids to be excluded from the PDF document  
   * @param options.usePagesAsBreaks Whether pages in the form submission should translate to page breaks in the PDF
   */
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
      origin: OneBlinkAPI.tenant.pdfOrigin,
      method: 'POST',
      path: `/forms/${formId}/submissions/${submissionId}/pdf-document?${urlSearchParams.toString()}`,
      headers: {
        Accept: `application/pdf`,
      },
      body: JSON.stringify({ excludedElementIds, usePagesAsBreaks }),
    })

    return response.buffer()
  }

  
  /**
   * #### Example
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
   * 
   * @param options.body.html The HTML to render as a pdf
   * @param options.header.html The HTML to render at the top of every page
   * @param options.footer.html The HTML to render at the bottom of every page
   * @param options.page.orientation `'Portrait'` or `'Landscape`'. Default is `'Portrait'`
   * @param options.page.size `'Letter'`, `'Legal'`, `'Tabloid'`, `'Ledger'`, `'A0'`, `'A1'`, `'A2'`, `'A3'`, `'A4'`, `'A5'` or `'A6'`. Default is `'A4'`
   * @param options.page.margins.top How much space between the top of each page and the content. Supported dimension units are: `'mm'`, `'cm'`, `'in'`, `'px'` 
   * @param options.page.margins.bottom How much space between the bottom of the page and content
   * @param options.page.margins.right How much space between the right of each page and the content. Supported dimension units are: `'mm'`, `'cm'`, `'in'`, `'px'`
   * @param options.page.margins.left How much space between the left of each page and the content. Supported dimension units are: `'mm'`, `'cm'`, `'in'`, `'px'`
   * ``` */
  async generatePDF(options: PDFTypes.GeneratePDFOptions): Promise<Buffer> {
    if (!options || !options.body || !options.body.html) {
      throw new TypeError('Must supply "options.body.html" as a string')
    }

    const response = await super.request({
      origin: OneBlinkAPI.tenant.pdfOrigin,
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
