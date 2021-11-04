# OneBlink SDK | FormSubmissionEventConfiguration Definition

[Back to FormSubmissionEvent](./FormSubmissionEvent.md)

## CallbackSubmissionEventConfiguration

| Property | Required | Type     | Description                                                                                     |
| -------- | -------- | -------- | ----------------------------------------------------------------------------------------------- |
| `url`    | yes      | `string` | URL that the callback is made to.                                                               |
| `secret` | yes      | `string` | Secret string used for verifying the authenticity of the request made from the OneBlink system. |

### Example

```JSON
{
  "url": "https://api.url.com/callback",
  "secret": "superSecretString"
}
```

## PDFSubmissionEventConfiguration

| Property                                | Required | Type       | Description                                                                              |
| --------------------------------------- | -------- | ---------- | ---------------------------------------------------------------------------------------- |
| `email`                                 | yes      | `string`   | The email in which a PDF copy of the form submission will be sent.                       |
| `emailSubjectLine`                      | yes      | `string`   | The subject line of the email sent to the configured email address.                      |
| `pdfFileName`                           | yes      | `string`   | The name of the PDF file sent to the configured email address.                           |
| `includeSubmissionIdInPdf`              | no       | `boolean`  | Whether the submission id should be included in the generated pdf (defaults to `false`). |
| `excludedElementIds`                    | no       | `string[]` | An array of element ids to exclude from the submission when generating pdf.              |
| `usePagesAsBreaks`                      | no       | `boolean`  | Whether pages in the form submission should translate to page breaks in the PDF.         |
| `emailTemplate`                         | no       | `Object`   | A reference to a custom template for the email body.                                     |
| `emailTemplate.id`                      | yes      | `number`   | The `id` of the `emailTemplate`.                                                         |
| `emailTemplate.mapping`                 | yes      | `Array`    | The mappings required from the email template.                                           |
| `emailTemplate.mapping[].mustacheTag`   | yes      | `string`   | The mustache tag to replace in the email template.                                       |
| `emailTemplate.mapping[].type`          | yes      | `string`   | `'FORM_ELEMENT' \| 'TEXT'`.                                                              |
| `emailTemplate.mapping[].text`          | no       | `string`   | The free text to insert if type is `'TEXT'`.                                             |
| `emailTemplate.mapping[].formElementId` | no       | `string`   | The value from the form submission for a form element if type is `'FORM_ELEMENT'`.       |

### Example

```JSON
{
  "email": "test@oneblink.io",
  "emailSubjectLine": "My Subject",
  "pdfFileName": "Submission_File.pdf",
  "includeSubmissionIdInPdf": true,
  "excludedElementIds": ["c1f0f27b-4289-4ce5-9807-bf84971991aa"]
}
```

## OneBlinkAPISubmissionEventConfiguration

| Property              | Required | Type     | Description                                                                                     |
| --------------------- | -------- | -------- | ----------------------------------------------------------------------------------------------- |
| `apiId`               | yes      | `string` | The ID of the OneBlink hosted API that a callback is made to on submission.                     |
| `apiEnvironment`      | yes      | `string` | The environment of the specified OneBlink hosted API to recieve the callback.                   |
| `apiEnvironmentRoute` | yes      | `string` | The route of the specified API and Environment to recieve the callback payload.                 |
| `secret`              | yes      | `string` | Secret string used for verifying the authenticity of the request made from the OneBlink system. |

### Example

```JSON
{
  "apiId": "oneblink-api-id",
  "apiEnvironment": "test",
  "apiEnvironmentRoute": "/my-route",
  "secret": "superSecretString"
}
```

## BPOINTSubmissionEventConfiguration

| Property        | Required | Type     | Description                                                                                              |
| --------------- | -------- | -------- | -------------------------------------------------------------------------------------------------------- |
| `elementId`     | yes      | `string` | The elementId that holds the value that will be paid. Must be the id of a number or calculation element. |
| `environmentId` | yes      | `string` | The id of the OneBlink -> BPOINT integration environment to be used.                                     |
| `crn2`          | no       | `string` | An optional crn string.                                                                                  |
| `crn3`          | no       | `string` | An optional crn string.                                                                                  |

### Example

```JSON
{
  "elementId": "1234abcd-1234-abcd-1234-1234abcd1234",
  "environmentId": "c1f0f27b-4289-4ce5-9807-bf84971991aa",
  "crn2": "12321232",
  "crn3": "9865676"
}
```

## WestpacQuickWebSubmissionEventConfiguration

| Property                  | Required | Type     | Description                                                                                              |
| ------------------------- | -------- | -------- | -------------------------------------------------------------------------------------------------------- |
| `elementId`               | yes      | `string` | The elementId that holds the value that will be paid. Must be the id of a number or calculation element. |
| `environmentId`           | yes      | `string` | The id of the OneBlink -> WestpacQuickWeb integration environment to be used.                            |
| `customerReferenceNumber` | yes      | `string` | A crn string.                                                                                            |

### Example

```JSON
{
  "elementId": "1234abcd-1234-abcd-1234-1234abcd1234",
  "environmentId": "c1f0f27b-4289-4ce5-9807-bf84971991aa",
  "customerReferenceNumber": "12321232"
}
```

## CPPaySubmissionEventConfiguration

| Property    | Required | Type     | Description                                                                                              |
| ----------- | -------- | -------- | -------------------------------------------------------------------------------------------------------- |
| `elementId` | yes      | `string` | The elementId that holds the value that will be paid. Must be the id of a number or calculation element. |
| `gatewayId` | yes      | `string` | The id of the OneBlink -> CP Pay integration gateway to be used.                                         |

### Example

```JSON
{
  "elementId": "1234abcd-1234-abcd-1234-1234abcd1234",
  "gatewayId": "c1f0f27b-4289-4ce5-9807-bf84971991aa"
}
```

## CPHCMSSubmissionEventConfiguration

| Property              | Required | Type       | Description                                                               |
| --------------------- | -------- | ---------- | ------------------------------------------------------------------------- |
| `contentTypeName`     | yes      | `string`   | The content type name for the submission in the CivicPlus HCMS.           |
| `encryptedElementIds` | no       | `string[]` | An array of element ids to be set as encrypted in the CP HCMS.            |
| `encryptPdf`          | no       | `string`   | Whether the generated pdf file should be encrypted. (defaults to `false`) |

### Example

```JSON
{
  "contentTypeName": "My Content Type",
  "encryptedElementIds": ["c1f0f27b-4289-4ce5-9807-bf84971991aa"],
  "encryptPdf": true
}
```

## SchedulingSubmissionEventConfiguration

| Property                | Required | Type     | Description                                                                                            |
| ----------------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------ |
| `nylasAccountId`        | yes      | `string` | The id of scheduling provider.                                                                         |
| `nylasSchedulingPageId` | yes      | `number` | The id of the scheduling page.                                                                         |
| `nameElementId`         | no       | `string` | The id of the form element to map to the name field on the scheduling page. Must be a text element.    |
| `emailElementId`        | no       | `string` | The id of the form element to map to the email field on the scheduling page. Must be an email element. |
| `emailDescription`      | no       | `string` | An optional extra description to be included in the email.                                             |

### Example

```JSON
{
  "nylasAccountId": "nylasAccountId",
  "nylasSchedulingPageId": 12345
}
```

## TRIMSubmissionEventConfiguration

| Property                   | Required | Type                                                                                      | Description                                                                                         |
| -------------------------- | -------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `environmentId`            | yes      | `string`                                                                                  | The id of the OneBlink -> TRIM (Micro Focus Content Manager) integration environment to be used.    |
| `recordTitle`              | no       | `string`                                                                                  |                                                                                                     |
| `container`                | yes      | [`TRIMSubmissionEventConfigurationAttribute`](#trimsubmissioneventconfigurationattribute) | The container object. Contains the container properties.                                            |
| `recordType`               | yes      | [`TRIMSubmissionEventConfigurationAttribute`](#trimsubmissioneventconfigurationattribute) | The recordType object. Contains the recordType properties.                                          |
| `actionDefinition`         | yes      | [`TRIMSubmissionEventConfigurationAttribute`](#trimsubmissioneventconfigurationattribute) | The actionDefinition object. Contains the actionDefinition properties.                              |
| `location`                 | yes      | [`TRIMSubmissionEventConfigurationAttribute`](#trimsubmissioneventconfigurationattribute) | The location object. Contains the location properties.                                              |
| `includeSubmissionIdInPdf` | no       | `boolean`                                                                                 | Whether the submission id should be included in the generated pdf (defaults to `false`).            |
| `author`                   | no       | [`TRIMSubmissionEventConfigurationAttribute`](#trimsubmissioneventconfigurationattribute) | The author object. Contains the author properties.                                                  |
| `groupFiles`               | no       | `boolean`                                                                                 | Whether the submission pdf and attachments should be zipped before uploading (defaults to `false`). |
| `excludedElementIds`       | no       | `string[]`                                                                                | An array of element ids to exclude from the submission when generating pdf.                         |
| `usePagesAsBreaks`         | no       | `boolean`                                                                                 | Whether pages in the form submission should translate to page breaks in the PDF.                    |

### TRIMSubmissionEventConfigurationAttribute

| Property | Required | Type     | Description          |
| -------- | -------- | -------- | -------------------- |
| `uri`    | yes      | `string` | The attribute uri.   |
| `label`  | yes      | `string` | The attribute label. |

### Example

```JSON
{
  "environmentId": "1234abcd-1234-abcd-1234-1234abcd1234",
  "recordTitle": "My Record Title",
  "container": {
    "label": "Container Label",
    "uri": "htts://www.container.com"
  },
  "recordType": {
    "label": "Record Type Label",
    "uri": "htts://www.record-type.com"
  },
  "actionDefinition": {
    "label": "Action Definition Label",
    "uri": "htts://www.action-definition.com"
  },
  "location": {
    "label": "Location Label",
    "uri": "htts://www.location.com"
  },
  "includeSubmissionIdInPdf": true,
  "author": {
    "label": "Author Label",
    "uri": "htts://www.author.com"
  }
}
```

## CivicaCRMSubmissionEventConfiguration

| Property                                  | Required | Type                                                                                              | Description                                                                              |
| ----------------------------------------- | -------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `environmentId`                           | yes      | `string`                                                                                          | The id of the OneBlink -> Civica integration environment to be used.                     |
| `civicaDescription`                       | yes      | `string`                                                                                          | The civica description.                                                                  |
| `civicaCustomerContactMethod`             | yes      | `object`                                                                                          | The civicaCustomerContactMethod object.                                                  |
| `civicaCustomerContactMethod.code`        | yes      | `string`                                                                                          | The civicaCustomerContactMethod code.                                                    |
| `civicaCustomerContactMethod.description` | yes      | `string`                                                                                          | The civicaCustomerContactMethod description.                                             |
| `civicaCategory`                          | yes      | `object`                                                                                          | The civicaCategory object.                                                               |
| `civicaCategory.id`                       | yes      | `number`                                                                                          | The civicaCategory id.                                                                   |
| `civicaCategory.label`                    | yes      | `string`                                                                                          | The civicaCategory label.                                                                |
| `mapping`                                 | yes      | [`CivicaCRMSubmissionEventConfigurationMapping[]`](#civicacrmsubmissioneventconfigurationmapping) | An array containing mapping information.                                                 |
| `pdfFileName`                             | yes      | `string`                                                                                          | The name of the PDF file that is generated.                                              |
| `includeSubmissionIdInPdf`                | no       | `boolean`                                                                                         | Whether the submission id should be included in the generated pdf (defaults to `false`). |
| `excludedElementIds`                      | no       | `string[]`                                                                                        | An array of element ids to exclude from the submission when generating pdf.              |
| `usePagesAsBreaks`                        | no       | `boolean`                                                                                         | Whether pages in the form submission should translate to page breaks in the PDF.         |

### CivicaCRMSubmissionEventConfigurationMapping

| Property                   | Required | Type     | Description                                                         |
| -------------------------- | -------- | -------- | ------------------------------------------------------------------- |
| `civicaCategoryItemNumber` | yes      | `number` | The item number of the civica category to map the OB form field to. |
| `formElementId`            | yes      | `string` | The elementId of the field to map to the civica category.           |

### Example

```JSON
{
  "environmentId": "1234abcd-1234-abcd-1234-1234abcd1234",
  "civicaDescription": "civica description",
  "civicaCustomerContactMethod": {
    "code": "sdf4nj45grfg",
    "description": "description"
  },
  "civicaCategory": {
    "id": 123,
    "label": "My Label"
  },
  "mapping": [
    {
      "civicaCategoryItemNumber": 12345,
      "formElementId": "1234abcd-1234-abcd-1234-1234abcd1234",
    }
  ],
  "pdfFileName": "Submission_File.pdf",
  "includeSubmissionIdInPdf": true,
  "excludedElementIds": ["c1f0f27b-4289-4ce5-9807-bf84971991aa"]

}
```
