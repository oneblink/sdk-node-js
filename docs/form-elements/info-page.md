# OneBlink SDK | Form Element Definitions

[Back to all Elements](./README.md)

## Info Page Element

Allow the user to use elements from a info page

| Property | Required | Type     | Default      | Description                                                          |
| -------- | -------- | -------- | ------------ | -------------------------------------------------------------------- |
| `type`   | Yes      | `string` | `'infoPage'` | The type of Form Element.                                            |
| `name`   | Yes      | `string` |              | The key that will be assigned an object with the embedded form data. |
| `formId` | Yes      | `number` |              | The id of the Info Page whose elements should be included.           |

Info Page element also inherits the properties of the following:

- [Base Element](./base-element.md)

### Example

```JSON
{
  "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
  "type": "infoPage",
  "formId": 101
}
```
