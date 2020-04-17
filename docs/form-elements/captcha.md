# OneBlink SDK | Form Element Definitions

[Back to all Elements](./README.md)

## Captcha (Not a Robot) Element

Force the user to prove they are not a robot.

| Property | Required | Type     | Default     | Description                                                                              |
| -------- | -------- | -------- | ----------- | ---------------------------------------------------------------------------------------- |
| `type`   | Yes      | `string` | `'captcha'` | The type of Form Element.                                                                |
| `name`   | Yes      | `string` |             | The key that will be assigned a value in the submission data when the form is submitted. |
| `label`  | Yes      | `string` |             | Friendly text to identify the element.                                                   |

Captcha element also inherits the properties of the following:

- [Base Element](./base-element.md)

### Example

```JSON
{
  "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
  "type": "captcha",
  "name": "proof",
  "label": "Not a Robot"
}
```
