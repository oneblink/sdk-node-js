# OneBlink SDK | Form Element Definitions

[Back to all Elements](../README.md)

## HTML Element

Display information to the user formatted using [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML).

| Property       | Required | Type     | Default  | Description                                                                                                                              |
| -------------- | -------- | -------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `type`         | Yes      | `string` | `'html'` | The type of Form Element.                                                                                                                |
| `name`         | Yes      | `string` |          | The key that will be assigned a value `true` (if the element is shown) or `false` (if the element is hidden) when the form is submitted. |
| `label`        | Yes      | `string` |          | Display text to identify the element.                                                                                                    |
| `defaultValue` | Yes      | `string` |          | The HTML to display.                                                                                                                     |

HTML element also inherits the properties of the following:

-   [Base Element](./base-element.md)

## Example

```JSON
{
  "type": "html",
  "name": "information",
  "label": "Information",
  "defaultValue": "<p>html to <b>display</b> to the <i>user</i></p>"
}
```
