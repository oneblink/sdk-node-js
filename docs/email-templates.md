# OneBlink SDK | Email Templates Class

## Instance Functions

- [`getEmailTemplate()`](#getEmailTemplate)
- [`searchEmailTemplates()`](#searchEmailTemplates)
- [`createEmailTemplate()`](#createEmailTemplate)
- [`updateEmailTemplate()`](#updateEmailTemplate)
- [`deleteEmailTemplate()`](#deleteEmailTemplate)

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
const emailTemplates = new OneBlink.FormsAppEnvironments(options)
```

## `getEmailTemplate()`

### Example

```javascript
const id = 1
const emailTemplate = await emailTemplates.getFormsAppEnvironment(id)
```

### Parameters

| Parameter | Required | Type     | Description                                        |
| --------- | -------- | -------- | -------------------------------------------------- |
| `id`      | Yes      | `number` | The exact id of the email template you wish to get |

### Result (Resolved Promise)

```json
{
  "id": 2,
  "name": "Development",
  "description": "This is the greatest environment ever made",
  "organisationId": "59a17b708b1f8f8700ee1709",
  "slug": "dev",
  "createdAt": "2018-06-18T06:28:28.000Z",
  "updatedAt": "2018-06-18T06:28:42.000Z"
}
```

## `searchEmailTemplates()`

### Example

```javascript
const options = {
  limit: 1,
  offset: 1,
}
const { emailTemplates } = await emailTemplates.searchFormsAppEnvironments(
  options,
)
```

### Parameters

| Parameter        | Required | Type     | Description                                                                           |
| ---------------- | -------- | -------- | ------------------------------------------------------------------------------------- |
| `options`        | No       | `Object` | Search options.                                                                       |
| `options.limit`  | No       | `number` | Limit the number of results returned                                                  |
| `options.offset` | No       | `number` | Skip a specific number of results, used in conjunction with `limit` to enforce paging |

### Result (Resolved Promise)

```json
{
  "meta": {
    "limit": null,
    "offset": null
  },
  "emailTemplates": [
    {
      "id": 2,
      "name": "Development",
      "slug": "dev",
      "description": "This is the greatest environment ever made",
      "organisationId": "59a17b708b1f8f8700ee1709",
      "createdAt": "2018-06-18T06:28:28.000Z",
      "updatedAt": "2018-06-18T06:28:42.000Z"
    },
    ...
  ]
}
```

## `createEmailTemplate()`

### Example

```javascript
const emailTemplate = await emailTemplates.createFormsAppEnvironment({
  name: 'string',
  description: 'string',
  slug: 'string',
  organisationId: '5a57ff94ff150a0010aa96ea',
  cloneOptions: {
    sourceFormsAppEnvironmentId: 1,
    isCloningFormElementOptionsSets: true,
    isCloningFormElementLookups: true,
    isCloningFormSubmissionEvents: true,
    isCloningFormServerValidation: true,
    isCloningFormExternalIdGeneration: true,
    isCloningFormPostSubmissionActions: true,
  },
})
```

### Parameters

| Parameter       | Required | Type                                                                                                                                        | Description                                 |
| --------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `emailTemplate` | Yes      | [`NewFormsAppEnvironment`](https://github.com/oneblink/types/blob/0f1f21650f57c2432d5f27b759ed8642769d3317/typescript/environments.d.ts#L1) | The forms app environment object to create. |

### Result

```json
{
  "id": 1,
  "name": "Development",
  "description": "Here be dragons",
  "slug": "dev",
  "organisationId": "5a57ff94ff150a0010aa96ea",
  "createdAt": "2018-06-18T06:28:28.000Z",
  "updatedAt": "2018-06-18T06:28:42.000Z"
}
```

## `updateEmailTemplate(definition)`

### Example

```javascript
const emailTemplate = await emailTemplates.updateFormsAppEnvironment({
  id: 1,
  name: 'string',
  description: 'string',
  slug: 'dev',
  organisationId: '5a57ff94ff150a0010aa96ea',
})
```

### Parameters

| Parameter  | Required | Type                                                                                                                                      | Description                                |
| ---------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| definition | Yes      | [`FormsAppEnvironment`](https://github.com/oneblink/types/blob/0f1f21650f57c2432d5f27b759ed8642769d3317/typescript/environments.d.ts#L17) | The forms app environment object to update |

### Result

```json
{
  "id": 1,
  "name": "Development",
  "description": "Here be dragons",
  "organisationId": "5a57ff94ff150a0010aa96ea",
  "createdAt": "2018-06-18T06:28:28.000Z",
  "updatedAt": "2018-06-18T06:28:42.000Z"
}
```

## `deleteEmailTemplate(id)`

### Example

```javascript
const id = 1
await emailTemplates.deleteFormsAppEnvironment(id)
```

### Parameters

| Parameter | Required | Type     | Description                      |
| --------- | -------- | -------- | -------------------------------- |
| `id`      | Yes      | `number` | id of the forms app environment. |
