# OneBlink SDK | PDF Class

## Instance Functions

- [`generateFormSubmissionPDF()`](#generateformsubmissionpdf)

## Constructor

| Parameter           | Required | Type     | Description                      |
| ------------------- | -------- | -------- | -------------------------------- |
| `options.accessKey` | Yes      | `string` | Access key provided by OneBlink. |
| `options.secretKey` | Yes      | `string` | Secret key provided by OneBlink. |

### Example

```javascript
const OneBlink = require('@oneblink/sdk')

const options = {
  accessKey: '123455678901ABCDEFGHIJKL',
  secretKey: '123455678901ABCDEFGHIJKL123455678901ABCDEFGHIJKL',
}
const pdf = new OneBlink.PDF(options)
```

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
  })
  await writeFileAsync('./submission.pdf', buffer, 'binary')
}
```

### Parameters

| Parameter                  | Required | Type     | Description                                                               |
| -------------------------- | -------- | -------- | ------------------------------------------------------------------------- |
| `formId`                   | Yes      | `number` | The exact identifier of the form you wish to generate the PDF for         |
| `submissionId`             | Yes      | `string` | The submission identifier generated after a successful form submission    |
| `isDraft`                  | No       | `bool`   | `true` if the submission is a draft submission, otherwise `false`         |
| `includeSubmissionIdInPdf` | No       | `bool`   | `true` to include the submission identifier in the PDF, otherwise `false` |

### Result (Resolved Promise)

- A [Node.js Buffer](https://nodejs.org/api/buffer.html) containing the PDF binary data.
