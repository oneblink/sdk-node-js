# OneBlink SDK | Form Definition

[Back to Documentation](../../README.md)

## NewForm

| Property                | Required | Type                                                | Description                                                                              |
| ----------------------- | -------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `name`                  | Yes      | `string`                                            | Name of the form.                                                                        |
| `description`           | No       | `string`                                            | A description of the form.                                                               |
| `organisationId`        | Yes      | `string`                                            | The organisation ID the form belong to.                                                  |
| `formsAppEnvironmentId` | Yes      | `number`                                            | The forms app environment ID the form belong to.                                         |
| `formsAppIds`           | Yes      | `number[]`                                          | ID's of any Forms Apps that the form is included in.                                     |
| `elements`              | Yes      | [`FormElement`](../../form-elements/README.md)`[]`  | All elements contained within the form itself.                                           |
| `isAuthenticated`       | Yes      | `boolean`                                           | Whether or not the form can only be viewed by an Authenticated user.                     |
| `isMultiPage`           | Yes      | `boolean`                                           | Whether or not the form contains multiple pages.                                         |
| `submissionEvents`      | No       | [`FormSubmissionEvent[]`](./FormSubmissionEvent.md) | Events that occur/trigger on a valid successful submission.                              |
| `postSubmissionAction`  | Yes      | `string`                                            | The action for the Form to take on a successful submission.                              |
| `redirectUrl`           | No       | `string`                                            | The URL the form will redirect to if configured to do so by the `postSubmissionActions`. |
| `isInfoPage`            | Yes      | `boolean`                                           | Whether or not the Form is an Info Page.                                                 |
| `tags`                  | No       | `string[]`                                          | A list of tags used to categorise or describe the form.                                  |
| `publishStartDate`      | No       | `string`                                            | The date and time (in ISO format) a form becomes available.                              |
| `publishEndDate`        | No       | `string`                                            | The date and time (in ISO format) a form becomes unavailable.                            |
| `serverValidation`      | No       | [`FormServerValidation`](./FormServerValidation.md) | The details of the form validation endpoint.                                             |
| `externalIdGeneration`  | No       | [`FormServerValidation`](./FormServerValidation.md) | The details of the externalId generation endpoint.                                       |

## Form

| Property                | Required | Type                                                | Description                                                                              |
| ----------------------- | -------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `id`                    | Yes      | `number`                                            | Id of the form.                                                                          |
| `name`                  | Yes      | `string`                                            | Name of the form.                                                                        |
| `description`           | No       | `string`                                            | A description of the form.                                                               |
| `organisationId`        | Yes      | `string`                                            | The organisation ID the form belong to.                                                  |
| `formsAppEnvironmentId` | Yes      | `number`                                            | The forms app environment ID the form belong to.                                         |
| `formsAppIds`           | Yes      | `number[]`                                          | ID's of any Forms Apps that the form is included in.                                     |
| `elements`              | Yes      | [`FormElement`](../../form-elements/README.md)`[]`  | All elements contained within the form itself.                                           |
| `isAuthenticated`       | Yes      | `boolean`                                           | Whether or not the form can only be viewed by an Authenticated user.                     |
| `isMultiPage`           | Yes      | `boolean`                                           | Whether or not the form contains multiple pages.                                         |
| `submissionEvents`      | No       | [`FormSubmissionEvent[]`](./FormSubmissionEvent.md) | Events that occur/trigger on a valid successful submission.                              |
| `postSubmissionAction`  | Yes      | `string`                                            | The action for the Form to take on a successful submission.                              |
| `redirectUrl`           | No       | `string`                                            | The URL the form will redirect to if configured to do so by the `postSubmissionActions`. |
| `isInfoPage`            | Yes      | `boolean`                                           | Whether or not the Form is an Info Page.                                                 |
| `tags`                  | No       | `string[]`                                          | A list of tags used to categorise or describe the form.                                  |
| `publishStartDate`      | No       | `string`                                            | The date and time (in ISO format) a form becomes available.                              |
| `publishEndDate`        | No       | `string`                                            | The date and time (in ISO format) a form becomes unavailable.                            |
| `serverValidation`      | No       | [`FormServerValidation`](./FormServerValidation.md) | The details of the form validation endpoint.                                             |
| `externalIdGeneration`  | No       | [`FormServerValidation`](./FormServerValidation.md) | The details of the externalId generation endpoint.                                       |

## Examples

### NewForm

```JSON
{
  "name": "testsform",
  "formsAppEnvironmentId": 1,
  "description": "a form",
  "organisationId": "0101010101010",
  "formsAppEnvironmentId": 1,
  "elements": [],
  "isAuthenticated": false,
  "submissionEvents": [],
  "postSubmissionAction": "FORMS_LIBRARY",
  "formsAppIds": [1, 2, 3],
}
```

### Form

```JSON
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
  "formsAppIds": [1, 2, 3],
}
```
