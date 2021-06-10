# OneBlink SDK | Form Element Definitions

[Back to all Elements](./README.md)

## Section Element

Allow the user add multiple entries of a set of elements.

| Property      | Required | Type                             | Default     | Description                                                    |
| ------------- | -------- | -------------------------------- | ----------- | -------------------------------------------------------------- |
| `type`        | Yes      | `string`                         | `'section'` | The type of Form Element.                                      |
| `label`       | Yes      | `string`                         |             | Display text presented to the user above the input by default. |
| `isCollapsed` | No       | `boolean`                        | `false`     | Whether or not the section is collapsed by default.            |
| `elements`    | Yes      | [`FormElement`](./README.md)`[]` |             | The elements contained within the section .                    |

Section element also inherits the properties of the following:

- [Base Element](./base-element.md)

### Example

```JSON
{
  "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
  "type": "section",
  "label": "My Section",
  "isCollapsed": true,
  "elements": [
    {
      "id": "a6298740-6bb7-11e9-a923-1681be627d8a",
      "type": "text",
      "name": "fullName",
      "label": "Please Enter Your Full Name",
      "defaultValue": "John Smith",
      "required": true,
      "readOnly": false
    }
  ]
}
```

### Example Submission Data

Section element has no effect on this submission structure. The elements within will be included as per usual.
eg. The example above would look like:

```json
{
  "submission": {
    "fullName": "Obi-Wan Kenobi"
  }
}
```
