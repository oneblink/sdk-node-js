# OneBlink SDK | Form Element Definitions

[Back to all Elements](./README.md)

## Page Element

A form level only element to group other elements.

| Property   | Required | Type                             | Default  | Description                                      |
| ---------- | -------- | -------------------------------- | -------- | ------------------------------------------------ |
| `type`     | Yes      | `string`                         | `'page'` | The type of Form Element.                        |
| `label`    | Yes      | `string`                         |          | Display text presented to the user for the page. |
| `elements` | Yes      | [`FormElement`](./README.md)`[]` |          | All elements contained within the page.          |

Page element also inherits the properties of the following:

- [Base Element](./base-element.md)

### Example

```JSON
{
  "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
  "type": "page",
  "label": "Page 1",
  "elements": []
}
```
