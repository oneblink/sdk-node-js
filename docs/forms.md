# OneBlink SDK | Forms Class

## Instance Functions

- [`generateFormUrl()`](#generateformurl)
- [`generateSubmissionDataUrl()`](#generatesubmissiondataurl)
- [`getForm()`](#getform)
- [`getSubmissionData()`](#getsubmissiondata)
- [`createSubmissionAttachment()`](#createsubmissionattachment)
- [`getSubmissionAttachmentBuffer()`](#getsubmissionattachmentbuffer)
- [`getSubmissionAttachmentStream()`](#getsubmissionattachmentstream)
- [`generateSubmissionAttachmentUrl()`](#generatesubmissionattachmenturl)
- [`searchForms()`](#searchforms)
- [`searchSubmissions()`](#searchsubmissions)
- [`createForm()`](#createform)
- [`updateForm()`](#updateform)
- [`deleteForm()`](#deleteform)

## Static Functions

- [`validateForm()`](#validateform)
- [`generateFormElement()`](#generateformelement)
- [`generatePageElement()`](#generatepageelement)
- [`encryptUserToken()`](#encryptUserToken)
- [`decryptUserToken()`](#decryptUserToken)
- [`validateConditionalPredicates()`](#validateconditionalpredicates)
- [`validateApiRequest()`](#validateapirequest)

## Constructor

| Parameter           | Required | Type     | Description                                                       |
| ------------------- | -------- | -------- | ----------------------------------------------------------------- |
| `options.accessKey` | Yes      | `string` | Access key provided by OneBlink, requires the `FORMS` permission. |
| `options.secretKey` | Yes      | `string` | Secret key provided by OneBlink, requires the `FORMS` permission. |

### Example

```javascript
const OneBlink = require('@oneblink/sdk')

const options = {
  accessKey: '123455678901ABCDEFGHIJKL',
  secretKey: '123455678901ABCDEFGHIJKL123455678901ABCDEFGHIJKL',
}
const forms = new OneBlink.Forms(options)
```

## `generateFormUrl()`

### Example

```javascript
const parameters = {
  formId: 1,
  formsAppId: 2,
  externalId: 'My Custom Identifier',
  preFillData: {
    FieldName1: 'A Machine',
    FieldName2: 'Room B',
  },
  expiryInSeconds: 36800,
  username: 'username',
  secret: 'sshh',
  previousFormSubmissionApprovalId: 1,
}

forms.generateFormUrl(parameters).then((result) => {
  const formUrl = result.formUrl
  // Use form URL here...
})
```

### Parameters

| Parameter                                     | Required | Type     | Description                                                                                                                                                                                         |
| --------------------------------------------- | -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `parameters`                                  | Yes      | `Object` | An object containing all parameters to be passed to the function                                                                                                                                    |
| `parameters.formId`                           | Yes      | `number` | The exact id of the form you wish to generate a URL for                                                                                                                                             |
| `parameters.formsAppId`                       | No       | `number` | The exact id of the forms app you wish to generate a URL for. This is set to the first forms app the form was added to by default.                                                                  |
| `parameters.externalId`                       | No       | `string` | The external identifier of the form submission you wish to use, this identifier will be returned to you with the submissionId after a successful submission to allow you to retrieve the data later |
| `parameters.preFillData`                      | No       | `Object` | An object with the form field names as keys and the prefill data as the values                                                                                                                      |
| `parameters.expiryInSeconds`                  | No       | `number` | The time in seconds until the generated form URL is no longer valid. This is set to `28800` seconds (8 hours) by default.                                                                           |
| `parameters.username`                         | No       | `string` | An identifier for the user completing the form. Use this if you would like to securely know the user that submitted the form in a webhook.                                                          |
| `parameters.secret`                           | No       | `string` | A secret used to encrypt the `username` property which can be validated in a webhook.                                                                                                               |
| `parameters.previousFormSubmissionApprovalId` | No       | `number` | The exact id of the previous form submission approval this submission will be associated to                                                                                                         |

### Result (Resolved Promise)

```json
{
  "formUrl": "https://organisation.forms.oneblink.io/1?externalId=123456abc&access_key=qwertyuiop098765432&preFillFormDataId=123",
  "expiry": "2018-06-05T09:09:46.227Z"
}
```

## `generateSubmissionDataUrl()`

### Example

```javascript
const formId = 1
const submissionId = 'c1f0f27b-4289-4ce5-9807-bf84971991aa'
const expiryInSeconds = 900
forms
  .generateSubmissionDataUrl(formId, submissionId, expiryInSeconds)
  .then((result) => {
    const submissionDataUrl = result.url
    // Use URL here...
  })
```

### Parameters

| Parameter         | Required | Type     | Description                                                                                                                                               |
| ----------------- | -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `formId`          | Yes      | `number` | The exact id of the form you wish to generate a URL for                                                                                                   |
| `submissionId`    | Yes      | `string` | The submission identifier generated after a successful form submission, this will be return to you after a successful forms submission via a callback URL |
| `expiryInSeconds` | Yes      | `number` | The number of seconds the signed URL should be valid for, must be greater than or equal to `900`                                                          |

### Result (Resolved Promise)

```json
{
  "url": "https://domain.io/path?query=string"
}
```

## `getSubmissionData()`

### Example

```javascript
const formId = 1
const submissionId = 'c1f0f27b-4289-4ce5-9807-bf84971991aa'
const isDraft = false
forms
  .getSubmissionData(formId, submissionId, isDraft)
  .then((result) => {
    const definition = result.definition
    const submission = result.submission
  })
  .catch((error) => {
    // Handle error here
  })
```

#### Parameters

| Parameter      | Required | Type     | Description                                                                                                                                               |
| -------------- | -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `formId`       | Yes      | `number` | The exact id of the form you wish to get submission data for                                                                                              |
| `submissionId` | Yes      | `string` | The submission identifier generated after a successful form submission, this will be return to you after a successful forms submission via a callback URL |
| `isDraft`      | No       | `bool`   | `true` if the submission is a draft submission, otherwise `false`                                                                                         |

### Result (Resolved Promise)

```json
{
  "definition": {
    "id": 1,
    "name": "Form Name",
    "elements": [
      {
        "label": "Enter Comment Here",
        "name": "comment",
        "type": "text",
        "required": true
      }
    ]
  },
  "submission": {
    "comment": "This is my comment that I entered during completion of the form"
  },
  "submissionTimestamp": "2020-02-07T01:04:37.718Z",
  "formsAppId": 1,
  "user": {
    "userId": "1234abcd-1234-abcd-1234-1234abcd1234",
    "email": "user@email.com",
    "firstName": "Jane",
    "lastName": "Smith",
    "fullName": "Jane Smith",
    "picture": "https://example.com/image.png",
    "username": "user@email.com",
    "providerType": "Google",
    "providerUserId": "123456789098765432123",
    "isSAMLUser": false
  },
  "device": {
    "type": "BROWSER",
    "appCodeName": "Mozilla",
    "appName": "Netscape",
    "appVersion": "5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36",
    "cookieEnabled": true,
    "hardwareConcurrency": 8,
    "language": "en-GB",
    "maxTouchPoints": 0,
    "platform": "MacIntel",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36",
    "vendor": "Google Inc.",
    "webdriver": false
  }
}
```

## `createSubmissionAttachment()`

### Example

```javascript
const fs = require('fs')
const util = require('util')

const readFileAsync = util.promisify(fs.readFile)

async function run() {
  const formId = 1

  const imageFileName = 'profile-picture.png'
  const imageBuffer = await readFileAsync(imageFileName)
  const imageResult = await forms.createSubmissionAttachment({
    formId,
    body: imageBuffer,
    isPrivate: false,
    contentType: 'image/png',
    fileName: imageFileName,
  })

  const documentFileName = 'secrets.text'
  const readableStream = fs.createReadStream(documentFileName)
  const documentResult = await forms.createSubmissionAttachment({
    formId,
    isPrivate: true,
    contentType: 'text/plain',
    fileName: documentFileName,
    body: readableStream,
    username: 'user@example.com',
  })
}
```

#### Parameters

| Parameter             | Required | Type                             | Description                                                                          |
| --------------------- | -------- | -------------------------------- | ------------------------------------------------------------------------------------ |
| `options.formId`      | Yes      | `number`                         | The exact id of the form the attachment will be uploaded for                         |
| `options.isPrivate`   | Yes      | `boolean`                        | Determine if this attachment can be downloaded anonymously (`false`) or not (`true`) |
| `options.contentType` | Yes      | `string`                         | The attachment's content type                                                        |
| `options.fileName`    | Yes      | `string`                         | The attachment's file name                                                           |
| `options.body`        | Yes      | `Buffer` \| `Stream` \| `string` | The attachment's file content to upload                                              |
| `options.username`    | No       | `string`                         | An optional username to allow a single user to download he attachment file           |

### Result (Resolved Promise)

```json
{
  "id": "52c08190-8ddd-41ca-9c01-416de443f111",
  "contentType": "image/png",
  "fileName": "dot.png",
  "isPrivate": false,
  "url": "https://auth-api.blinkm.io/submissions/1/attachments/52c08190-8ddd-41ca-9c01-416de443f111",
  "s3": {
    "bucket": "customer.forms.oneblink.io",
    "key": "submissions/1/attachments/52c08190-8ddd-41ca-9c01-416de443f111",
    "region": "ap-southeast-2"
  }
}
```

## `getSubmissionAttachmentBuffer()`

### Example

```javascript
const fs = require('fs')
const util = require('util')

const writeFileAsync = util.promisify(fs.writeFile)

async function run() {
  const formId = 1
  const attachmentId = 'c1f0f27b-4289-4ce5-9807-bf84971991aa'
  const buffer = await forms.getSubmissionAttachmentBuffer(formId, attachmentId)

  await writeFileAsync('file.png', buffer)
}
```

#### Parameters

| Parameter      | Required | Type     | Description                                             |
| -------------- | -------- | -------- | ------------------------------------------------------- |
| `formId`       | Yes      | `number` | The exact id of the form the attachment was uploaded on |
| `attachmentId` | Yes      | `string` | The attachment identifier from the form submission data |

### Result (Resolved Promise)

```javascript
Buffer
```

## `getSubmissionAttachmentStream()`

### Example

```javascript
const fs = require('fs')
const util = require('util')
const stream = require('stream')

const finishedAsync = util.promisify(stream.finished)

async function run() {
  const formId = 1
  const attachmentId = 'c1f0f27b-4289-4ce5-9807-bf84971991aa'
  const readableStream = await forms.getSubmissionAttachmentStream(
    formId,
    attachmentId,
  )

  const writableStream = fs.createWriteStream('file.png')
  readableStream.pipe(writableStream)
  await finishedAsync(readableStream)
  writableStream.end()
}
```

#### Parameters

| Parameter      | Required | Type     | Description                                             |
| -------------- | -------- | -------- | ------------------------------------------------------- |
| `formId`       | Yes      | `number` | The exact id of the form the attachment was uploaded on |
| `attachmentId` | Yes      | `string` | The attachment identifier from the form submission data |

### Result (Resolved Promise)

```javascript
Stream
```

## `generateSubmissionAttachmentUrl()`

### Example

```javascript
const formId = 1
const attachmentId = 'c1f0f27b-4289-4ce5-9807-bf84971991aa'
const expiryInSeconds = 900
forms
  .generateSubmissionAttachmentUrl(formId, attachmentId, expiryInSeconds)
  .then((result) => {
    const attachmentUrl = result.url
    // Use URL here...
  })
```

### Parameters

| Parameter         | Required | Type     | Description                                                                                      |
| ----------------- | -------- | -------- | ------------------------------------------------------------------------------------------------ |
| `formId`          | Yes      | `number` | The exact id of the form you wish to generate a URL for                                          |
| `attachmentId`    | Yes      | `string` | The attachment identifier from the form submission data                                          |
| `expiryInSeconds` | Yes      | `number` | The number of seconds the signed URL should be valid for, must be greater than or equal to `900` |

### Result (Resolved Promise)

```json
{
  "url": "https://domain.io/path?query=string"
}
```

## `getDraftData()`

### Example

```javascript
const formId = 1
const draftDataId = 'c1f0f27b-4289-4ce5-9807-bf84971991aa'
forms
  .getDraftData(formId, draftDataId)
  .then((result) => {
    const definition = result.definition
    const draftData = result.submission
  })
  .catch((error) => {
    // Handle error here
  })
```

#### Parameters

| Parameter     | Required | Type     | Description                                                                                                                                             |
| ------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `formId`      | Yes      | `number` | The exact id of the form you wish to get submission data for                                                                                            |
| `draftDataId` | Yes      | `string` | The draft data identifier generated after the successful save of a draft, this will be returned to you after a successful draft save via a callback URL |

### Result (Resolved Promise)

```json
{
  "definition": {
    "id": 1,
    "name": "Form Name",
    "elements": [
      {
        "label": "Enter Comment Here",
        "name": "comment",
        "type": "text",
        "required": true
      }
    ]
  },
  "submission": {
    "comment": "This is my comment that I entered during completion of the form"
  }
}
```

## `getForm()`

### Example

```javascript
const formId = 1
const injectForms = false
forms.getForm(formId, injectForms).then((form) => {
  // Use form here...
})
```

### Parameters

| Parameter     | Required | Type      | Description                                                                                                                                        |
| ------------- | -------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `formId`      | Yes      | `number`  | The exact id of the form you wish to get                                                                                                           |
| `injectForms` | No       | `boolean` | Set to `true` to inject form elements from nested [Form](./form-elements/form.md) elements and [Info Page](./form-elements/info-page.md) elements. |

### Result (Resolved Promise)

```json
{
  "id": 1,
  "name": "testsform",
  "formsAppEnvironmentId": 1,
  "description": "a form",
  "organisationId": "0101010101010",
  "formsAppEnvironmentId": 1,
  "elements": [],
  "isAuthenticated": false,
  "submissionEvents": []
}
```

## `searchForms()`

### Example

```javascript
const options = {
  isAuthenticated: true,
  name: 'Form Name',
}
forms
  .searchForms(options)
  .then((result) => {
    const forms = result.forms
  })
  .catch((error) => {
    // Handle error here
  })
```

### Parameters

| Parameter                       | Required | Type      | Description                                                                                                     |
| ------------------------------- | -------- | --------- | --------------------------------------------------------------------------------------------------------------- |
| `options`                       | No       | `Object`  | Search options.                                                                                                 |
| `options.isAuthenticated`       | No       | `boolean` | Search on the `isAuthenticated` property of a form. Must be either `true` or `false` or not specified.          |
| `options.isInfoPage`            | No       | `boolean` | Search on the `isInfoPage` property of a form. Must be either `true` or `false` or not specified.               |
| `options.name`                  | No       | `string`  | Search on the `name` property of a form. Can be a prefix, suffix or partial match                               |
| `options.formsAppId`            | No       | `number`  | Search on the `formsAppIds` property of a form. Must be the exact match of one the ids in `formsAppIds`.        |
| `options.formsAppEnvironmentId` | No       | `number`  | Search on the `formsAppEnvironmentId` property of a form. Must be the exact match of a `formsAppEnvironmentId`. |
| `options.limit`                 | No       | `number`  | Limit the number of results returned                                                                            |
| `options.offset`                | No       | `number`  | Skip a specific number of results, used in conjunction with `limit` to enforce paging                           |

### Result (Resolved Promise)

```json
{
  "meta": {
    "limit": null,
    "offset": null,
    "nextOffset": null
  },
  "forms": [
    {
      "id": 1,
      "name": "testsform",
      "formsAppEnvironmentId": 1,
      "description": "a form",
      "organisationId": "0101010101010",
      "formsAppEnvironmentId": 1,
      "elements": [],
      "isAuthenticated": false,
      "submissionEvents": [],
      "postSubmissionAction": "FORMS_LIBRARY",
      "isInfoPage": false
    }
  ]
}
```

## `searchSubmissions()`

Search for details on submissions that match the search parameters.
Then use the information to fetch the actual submission data, if it is still available

### Example

```javascript
const options = {
  formId: 1,
  submissionDateFrom: '2018-08-16T05:28:26.448Z',
  submissionDateTo: '2019-08-16T05:28:26.448Z',
}
forms
  .searchSubmissions(options)
  .then((result) => {
    const submissionDetails = result.formSubmissionMeta
    return Promise.all(
      submissionDetails.map((metaData) =>
        forms.getSubmissionData(metaData.formId, metaData.submissionId),
      ),
    )
  })
  .then((submissions) => {
    // something...
  })
  .catch((error) => {
    // Handle error here
  })
```

### Parameters

| Parameter                    | Required | Type     | Description                                     |
| ---------------------------- | -------- | -------- | ----------------------------------------------- |
| `options`                    | Yes      | `Object` | Search options.                                 |
| `options.formId`             | Yes      | `number` | Search for Submissions for a particular form Id |
| `options.submissionDateFrom` | No       | `string` | Search for Submissions starting at this date    |
| `options.submissionDateTo`   | No       | `string` | Search for Submissions ending on this date      |

### Result (Resolved Promise)

```json
{
  "meta": {
    "limit": 10,
    "offset": 0,
    "nextOffset": 10
  },
  "formSubmissionMeta": [
    {
      "submissionId": "f1eadc2b-79c8-4f97-8d92-cde64b34911f",
      "formId": 123,
      "formName": "name of form",
      "dateTimeSubmitted": "2020-01-01",
      "user": "John Smith",
      "key": {
        "id": "identifier",
        "name": "key name"
      }
    }
  ]
}
```

## `createForm()`

### Example

```javascript
forms
  .createForm({
    name: 'testsform',
    formsAppEnvironmentId: 1,
    description: 'a form',
    organisationId: '0101010101010',
    formsAppEnvironmentId: 1,
    elements: [],
    isAuthenticated: false,
    submissionEvents: [],
    postSubmissionAction: 'FORMS_LIBRARY',
    formsAppIds: [1, 2, 3],
  })
  .then((form) => {
    // use form here
  })
  .catch((error) => {
    // Handle error here
  })
```

### Parameters

| Parameter | Required | Type                                        | Description                |
| --------- | -------- | ------------------------------------------- | -------------------------- |
| `form`    | Yes      | [`NewForm`](./types/form/README.md#newform) | The form object to create. |

### Result

```json
{
  "id": 1,
  "name": "testsform",
  "description": "a form",
  "organisationId": "0101010101010",
  "formsAppEnvironmentId": 1,
  "elements": [],
  "isAuthenticated": false,
  "submissionEvents": [],
  "postSubmissionAction": "FORMS_LIBRARY",
  "formsAppIds": [1, 2, 3],
  "isMultiPage": false,
  "isInfoPage": false
}
```

## `updateForm(definition, overrideLock)`

### Example

```javascript
forms
  .updateForm(
    {
      id: 1,
      name: 'testsform',
      formsAppEnvironmentId: 1,
      description: 'a form',
      organisationId: '0101010101010',
      formsAppEnvironmentId: 1,
      elements: [],
      isAuthenticated: false,
      submissionEvents: [],
      postSubmissionAction: 'FORMS_LIBRARY',
      formsAppIds: [1, 2, 3],
    },
    true,
  )
  .then((form) => {
    // use form here
  })
  .catch((error) => {
    // Handle error here
  })
```

### Parameters

| Parameter    | Required | Type                                  | Description                                                                                             |
| ------------ | -------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| definition   | Yes      | [`Form`](./types/form/README.md#form) | The form object to update                                                                               |
| overrideLock | no       | `boolean`                             | Defaults to false. Set to true to force updating of the form if the form is locked via the form builder |

### Result

```json
{
  "id": 1,
  "name": "testsform",
  "description": "a form",
  "organisationId": "0101010101010",
  "formsAppEnvironmentId": 1,
  "elements": [],
  "isAuthenticated": false,
  "submissionEvents": [],
  "postSubmissionAction": "FORMS_LIBRARY",
  "formsAppIds": [1, 2, 3],
  "isMultiPage": false,
  "isInfoPage": false
}
```

## `deleteForm(formId, overrideLock)`

### Example

```javascript
const formId = 1
forms
  .deleteForm(formId, true)
  .then(() => {
    // Form is not deleted
  })
  .catch((error) => {
    // Handle error here
  })
```

### Parameters

| Parameter    | Required | Type      | Description                                                                                             |
| ------------ | -------- | --------- | ------------------------------------------------------------------------------------------------------- |
| `formId`     | Yes      | `number`  | Id of the form.                                                                                         |
| overrideLock | no       | `boolean` | Defaults to false. Set to true to force deleting of the form if the form is locked via the form builder |

## `validateForm()`

`validateForm()` is a static method available on the forms class, used for validating a OneBlink compatible Forms Definition.

### Example

```javascript
const form = {
  id: 1,
  name: 'testsform',
  formsAppEnvironmentId: 1,
  description: 'a form',
  organisationId: '0101010101010',
  elements: [],
  isAuthenticated: false,
  submissionEvents: [],
  postSubmissionAction: 'FORMS_LIBRARY',
  formsAppIds: [1, 2, 3],
}

const validatedForm = OneBlink.Forms.validateForm(form)

return validatedForm
```

### Parameters

| Parameter | Required | Type                                        | Description                  |
| --------- | -------- | ------------------------------------------- | ---------------------------- |
| `form`    | Yes      | [`NewForm`](./types/form/README.md#newform) | The form object to validate. |

### Result

```json
{
  "id": 1,
  "name": "testsform",
  "description": "a form",
  "organisationId": "0101010101010",
  "formsAppEnvironmentId": 1,
  "elements": [],
  "isAuthenticated": false,
  "submissionEvents": [],
  "postSubmissionAction": "FORMS_LIBRARY",
  "formsAppIds": [1, 2, 3],
  "isMultiPage": false,
  "isInfoPage": false
}
```

## `generateFormElement()`

`generateFormElement()` is a static method available on the forms class, used for both creating and validating a OneBlink Form Element.

The method will set reasonable defaults for any values not passed to it, and validate ones that are against our Element Schema.

### Example

```javascript
const element = {
  name: 'my test element',
}

const generatedElement = OneBlink.Forms.generateFormElement(element)

return generatedElement
```

### Parameters

Please refer to our Form Element Definitions found [here](./form-elements/README.md)

### Result

[A valid Form Element](./form-elements/README.md)

## `generatePageElement()`

`generatePageElement()` is a static method available on the forms class, used for both creating and validating a OneBlink Page Element.

The method will set reasonable defaults for any values not passed to it, and validate ones that are against our Element Schema.

### Example

```javascript
const childElement = Forms.generateFormElement({ label: 'my first element' })

const element = {
  name: 'my test element',
  elements: [childElement],
}

const generatedElement = OneBlink.Forms.generatePageElement(element)

return generatedElement
```

### Parameters

Please refer to our Page Element Definition found [here](./form-elements/page.md)

### Result

[A valid Page Element](./form-elements/page.md)

## `encryptUserToken()`

`encryptUserToken()` is a static method available on the forms class for securely encrypting a user identifier (e.g. email address) when the OneBlink API is being called with a FaaS key and not a user JWT. This is automatically done for the user in [`generateFormUrl()`](#generateformurl) by passing the `username` and `secret` options.

### Parameters

| Parameter        | Required | Type   | Description                                                               |
| ---------------- | -------- | ------ | ------------------------------------------------------------------------- |
| details          | yes      | Object | An object containing the username and secret used to encrypt the username |
| details.username | yes      | string | the username to encrypt                                                   |
| details.secret   | yes      | string | a string used to encrypt the username                                     |

### Result

A string which is the encrypted representation of the username

## `decryptUserToken()`

`decryptUserToken()` is a static method available on the forms class for decrypting a user token. This token is passed to OneBlink webhooks in the `userToken` property.

### Parameters

| Parameter         | Required | Type   | Description                                                              |
| ----------------- | -------- | ------ | ------------------------------------------------------------------------ |
| details           | yes      | Object | An object containing the user token and secret used to decrypt the token |
| details.userToken | yes      | string | the user token to decrypt                                                |
| details.secret    | yes      | string | the secret used to encrypt the username                                  |

### Result

The decrypted username

## `validateFormConditionalPredicates()`

`validateFormConditionalPredicates()` is a static method available on the forms class, used for validating an array of Conditional Predicates found on form elements or submission events.

### Example

```javascript
const predicates = [
  {
    elementId: 'f1eadc2b-79c8-4f97-8d92-cde64b34911f',
    type: 'NUMERIC',
    operator: '===',
    value: 5,
  },
  {
    elementId: '32g6dc5j-79c8-gf4z-8d92-cde64b34911f',
    type: 'VALUE',
    hasValue: true,
  },
]

const validatedPredicates =
  OneBlink.Forms.validateConditionalPredicates(predicates)

return validatedPredicates
```

### Parameters

| Parameter    | Required | Type                    | Description                                         |
| ------------ | -------- | ----------------------- | --------------------------------------------------- |
| `predicates` | Yes      | `ConditionaPredicate[]` | The array of conditiona predicates to be validated. |

### Result

```json
[
  {
    "elementId": "f1eadc2b-79c8-4f97-8d92-cde64b34911f",
    "type": "NUMERIC",
    "operator": "===",
    "value": 5
  },
  {
    "elementId": "32g6dc5j-79c8-gf4z-8d92-cde64b34911f",
    "type": "VALUE",
    "hasValue": true
  },
  {}
]
```

Throws an error if validation fails

## `validateApiRequest()`

`validateApiRequest()` is a static method available on the forms class, used for validating a api request configuration.

### Example

```javascript
const apiRequest = {
  type: 'CALLBACK',
  configuration: {
    url: 'https://a-website.com/endpoint',
  },
}

const validatedApiRequest = OneBlink.Forms.validateApiRequest(apiRequest)

return validatedApiRequest
```

### Parameters

| Parameter    | Required | Type                   | Description                                    |
| ------------ | -------- | ---------------------- | ---------------------------------------------- |
| `apiRequest` | Yes      | `FormServerValidation` | The api request configuration to be validated. |

### Result

```json
{
  "type": "CALLBACK",
  "configuration": {
    "url": "https://a-website.com/endpoint"
  }
}
```

Throws an error if validation fails
