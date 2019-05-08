# OneBlink SDK | Form Element Definitions

[Back to all Elements](./README.md)

## Form Element

Allow the user to use elements from a form

| Property       | Required | Type      | Default      | Description                                                                              |
| -------------- | -------- | --------- | ------------ | ---------------------------------------------------------------------------------------- |
| `type`         | Yes      | `string`  | `'form'`     | The type of Form Element.                                                                |
| `name`         | Yes      | `string`  |              | The key that will be assigned a value in the submission data when the form is submitted. |
| `label`        | Yes      | `string`  |              | Display text presented to the user above the input by default.                           |
| `formId`       | Yes      | `number`  |              | The id of the form whose elements should be included.                                    |

Form element also inherits the properties of the following:

-   [Base Element](./base-element.md)

### Example

```JSON
{
  "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
  "type": "form",
  "name": "form",
  "label": "A form",
  "formId": 100
}
```
