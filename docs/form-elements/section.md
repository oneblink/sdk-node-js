# OneBlink SDK | Form Element Definitions

[Back to all Elements](./README.md)

## Section Element

Allows the grouping of multiple elements into a collapsible section.

| Property      | Required | Type                             | Default     | Description                                                                           |
| ------------- | -------- | -------------------------------- | ----------- | ------------------------------------------------------------------------------------- |
| `type`        | Yes      | `string`                         | `'section'` | The type of Form Element.                                                             |
| `label`       | Yes      | `string`                         |             | Display text presented to the user as a collapsible heading.                          |
| `hint`        | No       | `string`                         |             | A hint triggered by an icon tooltip to be displayed when hovering beside the heading. |
| `isCollapsed` | No       | `boolean`                        | `false`     | Whether or not the section is collapsed by default.                                   |
| `elements`    | Yes      | [`FormElement`](./README.md)`[]` |             | The elements contained within the section .                                           |

The Section element also inherits the properties of the following:

- [Base Element](./base-element.md)

### Example

```JSON
{
  "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
  "type": "section",
  "label": "Person Details",
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

The Section element has no effect on this submission structure. The elements within will be included as per usual.
eg. The example above would look like:

```json
{
  "submission": {
    "fullName": "Obi-Wan Kenobi"
  }
}
```
