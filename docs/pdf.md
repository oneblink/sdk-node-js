# OneBlink SDK | PDF Class

## Instance Functions

- [`generatePDF()`](#generatepdf)
- [`generateFormSubmissionPDF()`](#generateformsubmissionpdf)

## Constructor

| Parameter           | Required | Type     | Description                                                                 |
| ------------------- | -------- | -------- | --------------------------------------------------------------------------- |
| `options.accessKey` | Yes      | `string` | Access key provided by OneBlink, requires the `PDF` and `FORMS` permission. |
| `options.secretKey` | Yes      | `string` | Secret key provided by OneBlink, requires the `PDF` and `FORMS` permission. |

### Example

```javascript
const OneBlink = require('@oneblink/sdk')

const options = {
  accessKey: '123455678901ABCDEFGHIJKL',
  secretKey: '123455678901ABCDEFGHIJKL123455678901ABCDEFGHIJKL',
}
const pdf = new OneBlink.PDF(options)
```

## `generatePDF()`

### Example

```javascript
const fs = require('fs')
const util = require('util')

const writeFileAsync = util.promisify(fs.writeFile)

async function run() {
  const buffer = await pdf.generatePDF({
    body: {
      html: `
        <p>I will be in the middle</p>
      `,
    },
    header: {
      html: `
      <div style="font-size: 9px; margin: 0 15px; width: 100%; text-align: center;">
        I will be at the top of every page
      </div>
      `,
    },
    footer: {
      html: `
      <div style="font-size: 9px; margin: 0 15px; width: 100%; text-align: center;">
        I will be at the bottom of every page ({_BLINK_PAGE_NO_}/{_BLINK_PAGES_})
      </div>
      `,
    },
    page: {
      orientation: 'Portrait',
      size: 'A4',
      margins: {
        top: '15mm',
        right: '5mm',
        bottom: '15mm',
        left: '5mm',
      },
    },
  })
  await writeFileAsync('./custom.pdf', buffer, 'binary')
}
```

### Parameters

| Parameter                     | Required | Type     | Description                                                                                                                                                                                                                                                                                       |
| ----------------------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `options.body.html`           | Yes      | `string` | The HTML to render as a PDF                                                                                                                                                                                                                                                                       |
| `options.header.html`         | No       | `string` | The HTML to render at the top of every page of the PDF. Allows for `{_BLINK_PAGE_NO_}` and `{_BLINK_PAGES_}` to be replaced by the current page number and the total number of pages. **Must include the `font-size` style in the HTML, the default is `1px` and will likely not be visible.**    |
| `options.footer.html`         | No       | `string` | The HTML to render at the bottom of every page of the PDF. Allows for `{_BLINK_PAGE_NO_}` and `{_BLINK_PAGES_}` to be replaced by the current page number and the total number of pages. **Must include the `font-size` style in the HTML, the default is `1px` and will likely not be visible.** |
| `options.page.orientation`    | No       | `string` | `'Portrait'` or `'Landscape'`. Default is `'Portrait'`.                                                                                                                                                                                                                                           |
| `options.page.size`           | No       | `string` | `'Letter'`, `'Legal'`, `'Tabloid'`, `'Ledger'`, `'A0'`, `'A1'`, `'A2'`, `'A3'`, `'A4'`, `'A5'` or `'A6'`. Default is `'A4'`.                                                                                                                                                                      |
| `options.page.margins.top`    | No       | `string` | How much space between the top of each page and the content. Supported dimension units are: `'mm'`, `'cm'`, `'in'`, `'px'`.                                                                                                                                                                       |
| `options.page.margins.bottom` | No       | `string` | How much space between the bottom of each page and the content. Supported dimension units are: `'mm'`, `'cm'`, `'in'`, `'px'`.                                                                                                                                                                    |
| `options.page.margins.right`  | No       | `string` | How much space between the right of each page and the content. Supported dimension units are: `'mm'`, `'cm'`, `'in'`, `'px'`.                                                                                                                                                                     |
| `options.page.margins.left`   | No       | `string` | How much space between the left of each page and the content. Supported dimension units are: `'mm'`, `'cm'`, `'in'`, `'px'`.                                                                                                                                                                      |

### Result (Resolved Promise)

- A [Node.js Buffer](https://nodejs.org/api/buffer.html) containing the PDF binary data.

## `generateFormSubmissionPDF()`

### Example

```javascript
const fs = require('fs')
const util = require('util')

const writeFileAsync = util.promisify(fs.writeFile)

async function run() {
  const buffer = await pdf.generateFormSubmissionPDF({
    formId: 1,
    submissionId: 'c63ec3ac-12ab-447c-951c-2815d0e6fc24',
    isDraft: false,
    includeSubmissionIdInPdf: false,
    excludedElementIds: ['1ae6d5f5-eade-411c-b85a-45fe40fe469e'],
  })
  await writeFileAsync('./submission.pdf', buffer, 'binary')
}
```

### Parameters

| Parameter                          | Required | Type       | Description                                                                     |
| ---------------------------------- | -------- | ---------- | ------------------------------------------------------------------------------- |
| `options.formId`                   | Yes      | `number`   | The exact identifier of the form you wish to generate the PDF for               |
| `options.submissionId`             | Yes      | `string`   | The submission identifier generated after a successful form submission          |
| `options.isDraft`                  | No       | `bool`     | `true` if the submission is a draft submission, otherwise `false`               |
| `options.includeSubmissionIdInPdf` | No       | `bool`     | `true` to include the submission identifier in the PDF, otherwise `false`       |
| `options.excludedElementIds`       | No       | `string[]` | Array of elements ids to be excluded from the PDF document                      |
| `options.usePagesAsBreaks`         | No       | `boolean`  | Whether pages in the form submission should translate to page breaks in the PDF |

usePagesAsBreaks

### Result (Resolved Promise)

- A [Node.js Buffer](https://nodejs.org/api/buffer.html) containing the PDF binary data.
