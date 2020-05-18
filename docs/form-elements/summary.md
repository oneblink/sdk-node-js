# OneBlink SDK | Form Element Definitions

[Back to all Elements](./README.md)

## Summary Element

Display a summary of other element values.

| Property     | Required | Type       | Default     | Description                                                                              |
| ------------ | -------- | ---------- | ----------- | ---------------------------------------------------------------------------------------- |
| `type`       | Yes      | `string`   | `'summary'` | The type of Form Element.                                                                |
| `name`       | Yes      | `string`   |             | The key that will be assigned a value in the submission data when the form is submitted. |
| `label`      | Yes      | `string`   |             | Display text presented to the user above the input by default.                           |
| `elementIds` | Yes      | `string[]` |             | The identifiers of the element(s) to summarize.                                          |

Telephone element also inherits the properties of the following:

- [Base Element](./base-element.md)

### Example

```JSON
{
  "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
  "type": "summary",
  "name": "summary",
  "label": "Summary",
  "elementIds": [
    "b1311ae0-6bb7-11e9-a923-1681be663d31",
    "b1311ae0-6bb7-11e9-a923-1681be663d32"
  ]
}
```
