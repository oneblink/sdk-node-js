# OneBlink SDK | Forms Class

## Constructor

| Parameter | Required | Type | Description
|---|---|---|---|
| `options.accessKey` | Yes | `string` | Access key provided by OneBlink. |
| `options.secretKey` | Yes | `string` | Secret key provided by OneBlink. |

### Example

```javascript
const OneBlink = require('@oneblink/sdk')

const options = {
  accessKey: '123455678901ABCDEFGHIJKL',
  secretKey: '123455678901ABCDEFGHIJKL123455678901ABCDEFGHIJKL'
}
const forms = new OneBlink.Forms(options)
```

## Generate Form URL

### Example

```javascript
const formId = 1
const externalId = 'My Custom Identifier'
const preFilledData = {
  'FieldName1' : 'A Machine',
  'FieldName2' : 'Room B'
}
forms.generateFormUrl(formId, externalId, preFilledData)
  .then((result) => {
    const formUrl = result.formUrl
    // Use form URL here...
  })
```

### Parameters

| Parameter | Required | Type | Description
|---|---|---|---|
| `formId` | Yes | `number` | The exact id of the form you wish to generate a URL for |
| `externalId` | No | `string` | The external identifier of the form submission you wish to use, this identifier will be returned to you with the submissionId after a successful submission to allow you to retrieve the data later |
| `preFilledData` | No | `Object` |  An object with the form field names as keys and the prefill data as the values |

### Result (Resolved Promise)

```json
{
  "formUrl": "https://organisation.forms.oneblink.io/1?externalId=123456abc&access_key=qwertyuiop098765432&preFillFormDataId=123",
  "expiry": "2018-06-05T09:09:46.227Z"
}
```

## Generate Submission Data URL

### Example

```javascript
const formId = 1
const submissionId = 'c1f0f27b-4289-4ce5-9807-bf84971991aa'
const expiryInSeconds = 900
forms.generateSubmissionDataUrl(formId, submissionId, expiryInSeconds)
  .then((result) => {
    const submissionDataUrl = result.url
    // Use URL here...
  })
```

### Parameters

| Parameter | Required | Type | Description
|---|---|---|---|
| `formId` | Yes | `number` | The exact id of the form you wish to generate a URL for |
| `submissionId` | Yes | `string` | The submission identifier generated after a successful form submission, this will be return to you after a successful forms submission via a callback URL |
| `expiryInSeconds` | Yes | `number` | The number of seconds the signed URL should be valid for, must be greater than or equal to `900` |

### Result (Resolved Promise)

```json
{
  "url": "https://domain.io/path?query=string",
}
```

## Get Submission Data

### Example

```javascript
const formId = 1
const submissionId = 'c1f0f27b-4289-4ce5-9807-bf84971991aa'
forms.getSubmissionData(formId, submissionId)
  .then((result) => {
    const definition = result.definition
    const submission = result.submission
  })
  .catch((error) => {
    // Handle error here
  })
```

#### Parameters

| Parameter | Required | Type | Description
|---|---|---|---|
| `formId` | Yes | `number` | The exact id of the form you wish to get submission data for |
| `submissionId` | Yes | `string` | The submission identifier generated after a successful form submission, this will be return to you after a successful forms submission via a callback URL |

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

## Get Single Form

### Example

```javascript
const formId = 1
forms.getForm(formId)
  .then((form) => {
    // Use form here...
  })
```

### Parameters

| Parameter | Required | Type | Description
|---|---|---|---|
| `formId` | Yes | `number` | The exact id of the form you wish to get |

### Result (Resolved Promise)

```json
{
  "id": 1,
  "name": "testsform",
  "description": "a form",
  "organisationId": "0101010101010",
  "elements": [],
  "isAuthenticated": false,
  "isPublished": true,
  "submissionEvents": []
}
```

## Search Forms

### Example

```javascript
const options = {
  isPublished: true,
  isAuthenticated: true,
  name: 'Form Name'
}
forms.search(options)
  .then((result) => {
    const forms = result.forms
  })
  .catch((error) => {
    // Handle error here
  })
```

### Parameters

| Parameter | Required | Type | Description
|---|---|---|---|
| `options` | No | `Object` | Search options. |
| `options.isAuthenticated` | No | `boolean` | Return authenticated forms or unauthenticated forms. If not supplied, all forms will be returned. |
| `options.isPublished` | No | `boolean` | Return published forms or unpublished forms. If not supplied, all forms will be returned. |
| `options.name` | No | `string` | Search on the name property of a form. Can be a prefix, suffix or partial match. |

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
      "description": "a form",
      "organisationId": "0101010101010",
      "elements": [],
      "isAuthenticated": false,
      "isPublished": true,
      "submissionEvents": [],
      "postSubmissionAction": "FORMS_LIBRARY",
      "isInfoPage": false,

    }
  ]
}
```

## Static Functions
___
## Validate Form

`validateForm()` is a static method available on the forms class, used for validating a OneBlink compatible Forms Definition.

### Example

```javascript
const form = {
  "id": 1,
  "name": "testsform",
  "description": "a form",
  "organisationId": "0101010101010",
  "elements": [],
  "isAuthenticated": false,
  "isPublished": true,
  "submissionEvents": [],
  "postSubmissionAction": "FORMS_LIBRARY",
  "formsAppIds": [1, 2, 3]
}

OneBlink.Forms.validateForm(form)
  .then(validatedForm => {
    // validated form can be accessed here
  })
  .catch(error => {
    // form is not valid
  })
```

### Parameters

| Parameter | Required | Type | Description
|---|---|---|---|
| `name` | yes | `string` | Name of the form. |
| `description` | No | `string` | A description of the form. |
| `organisationId` | yes | `string` | The organisation ID the form belong to. |
| `formsAppIds` | yes | `number[]` | ID's of any Forms Apps that the form is included in. |
| `elements` | yes | [`FormElement`](./form-elements/README.md)`[]` | All elements contained within the form itself. |
| `isAuthenticated` | yes | `boolean` | Whether or not the form can only be viewed by an Authenticated user. |
| `isMultiPage` | yes | `boolean` | Whether or not the form contains multiple pages. |
| `isPublished` | yes | `boolean` | Whether or not the form is visible within the Forms Apps it's included in. |
| `submissionEvents` | No | `SubmissionEvent[]` | Events that occur/trigger on a valid successful submission. |
| `submissionEvents[].type` | Yes | `'CALLBACK' | 'PDF' | 'SPOTTO' | 'ONEBLINK_API'` | The type of submission event. |
| `submissionEvents[].configuration` | Yes | `mixed` | Configuration specific to the type of submission event. |
| `submissionEvents[].configuration.url` | If `type` is `CALLBACK` | `string` | URL that the callback is made to. |
| `submissionEvents[].configuration.secret` |  If `type` is `CALLBACK` or `ONEBLINK_API` | `string` | Secret string used for verifying the authenticity of the request made from the OneBlink system. |
| `submissionEvents[].configuration.email` |  If `type` is `PDF` | `string` | The email in which a PDF copy of the form submission will be sent. |
| `submissionEvents[].configuration.pdfFileName` |  If `type` is `PDF` | `string` | The name of the PDF file sent to the configured email address. |
| `submissionEvents[].configuration.emailSubjectLine` |  If `type` is `PDF` | `string` | The subject line of the email sent to the configured email address. |
| `submissionEvents[].configuration.apiId` |  If `type` is `ONEBLINK_API` | `string` | The ID of the OneBlink hosted API that a callback is made to on submission. |
| `submissionEvents[].configuration.apiEnvironment` |  If `type` is `ONEBLINK_API` | `string` | The environment of the specified OneBlink hosted API to recieve the callback. |
| `submissionEvents[].configuration.apiEnvironmentRoute` |  If `type` is `ONEBLINK_API` | `string` | The route of the specified API and Environment to recieve the callback payload. |
| `createdAt` | No | `Date` | Date that the form was created. |
| `updatedAt` | No | `Date` | Date that the form was last updated. |
| `postSubmissionAction` | Yes | `string` | The action for the Form to take on a successful submission. |
| `redirectUrl` | No | `string` | The URL the form will redirect to if configured to do so by the `postSubmissionActions`. |
| `isInfoPage` | Yes | `boolean` | Whether or not the Form is an Info Page. |

### Result

```json
{ 
  "id": 1,
  "name": "testsform",
  "description": "a form",
  "organisationId": "0101010101010",
  "elements": [],
  "isAuthenticated": false,
  "isPublished": true,
  "submissionEvents": [],
  "postSubmissionAction": "FORMS_LIBRARY",
  "formsAppIds": [ 1, 2, 3 ],
  "isMultiPage": false,
  "isInfoPage": false 
}
```

## Generate Form Element

`generateFormElement()` is a static method available on the forms class, used for both creating and validating a OneBlink Form Element.

The method will set reasonable defaults for any values not passed to it, and validate ones that are against our Element Schema.

### Example

```javascript
const element = {
  "name": "my test element"
}

OneBlink.Forms.generateFormElement(element)
  .then(generatedElement => {
    // generated/validated element can be accessed here
  })
  .catch(error => {
    // element is not valid
  })
```

### Parameters

Please refer to our Form Element Definitions found [here](./form-elements/README.md)

### Result (Resolved Promise)

```json
{ 
  "name": "my test element",
  "id": "f3a6dd75-1bea-4df1-8f93-e4e44c2dbdb2",
  "type": "text",
  "required": false,
  "label": "text",
  "conditionallyShow": false,
  "readOnly": false,
  "requiresAllConditionallyShowPredicates": false,
  "isDataLookup": false,
  "isElementLookup": false 
}
```