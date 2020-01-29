# OneBlink SDK | Form Element Definitions

[Back to all Elements](./README.md)

## File Element

Allow the user upload a file from their device.

| Property     | Required | Type     | Default  | Description                                                                              |
| ------------ | -------- | -------- | -------- | ---------------------------------------------------------------------------------------- |
| `type`       | Yes      | `string` | `'file'` | The type of Form Element.                                                                |
| `name`       | Yes      | `string` |          | The key that will be assigned a value in the submission data when the form is submitted. |
| `label`      | Yes      | `string` |          | Display text presented to the user above the input by default.                           |
| `minEntries` | No       | `string` |          | Minimum number of files required                                                         |
| `maxEntries` | No       | `string` |          | Maximum number of files allowed                                                          |

File element also inherits the properties of the following:

- [Base Element](./base-element.md)

### Example

```JSON
{
  "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
  "type": "file",
  "name": "supportingDocument",
  "label": "Please Upload your Supporting Documentation",
  "minEntries": 1,
  "maxEntries": 2
}
```
