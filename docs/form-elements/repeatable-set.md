# OneBlink SDK | Form Element Definitions

[Back to all Elements](./README.md)

## Repeatable Set Element

Allow the user add multiple entries of a set of elements.

| Property              | Required | Type                             | Default           | Description                                                                                 |
| --------------------- | -------- | -------------------------------- | ----------------- | ------------------------------------------------------------------------------------------- |
| `type`                | Yes      | `string`                         | `'repeatableSet'` | The type of Form Element.                                                                   |
| `name`                | Yes      | `string`                         |                   | The key that will be assigned a value in the submission data when the form is submitted.    |
| `label`               | Yes      | `string`                         |                   | Display text presented to the user above the input by default.                              |
| `hint`                | No       | `string`                         |                   | A hint triggered by an icon tooltip to be displayed when hovering beside the element label. |
| `readOnly`            | Yes      | `boolean`                        | `false`           | Determine if entries can be added and removed by the user (`true`) or not (`false`).        |
| `minSetEntries`       | No       | `number`                         |                   | The minimum number of entries the set requires before submitting.                           |
| `maxSetEntries`       | No       | `number`                         |                   | The maximum number of entries the set is allowed before submitting.                         |
| `addSetEntryLabel`    | No       | `string`                         |                   | The label on the button to add an entry.                                                    |
| `removeSetEntryLabel` | No       | `string`                         |                   | The label on the button to remove an entry.                                                 |
| `elements`            | Yes      | [`FormElement`](./README.md)`[]` |                   | The elements contained within the set.                                                      |

Repeatable Set element also inherits the properties of the following:

- [Base Element](./base-element.md)

### Example

```JSON
{
  "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
  "type": "repeatableSet",
  "name": "photos",
  "required": true,
  "label": "Please take at least 1 photo, but no more than 5",
  "minSetEntries": 1,
  "maxSetEntries": 5,
  "addSetEntryLabel": "Add Photo",
  "removeSetEntryLabel": "Remove Photo",
  "elements": []
}
```
