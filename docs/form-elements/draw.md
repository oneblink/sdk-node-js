# OneBlink SDK | Form Element Definitions

[Back to all Elements](./README.md)

## Draw (Signature) Element

Allow the user to draw a sketch (usually used to submit signatures).

| Property      | Required | Type      | Default  | Description                                                                                 |
| ------------- | -------- | --------- | -------- | ------------------------------------------------------------------------------------------- |
| `type`        | Yes      | `string`  | `'draw'` | The type of Form Element.                                                                   |
| `name`        | Yes      | `string`  |          | The key that will be assigned a value in the submission data when the form is submitted.    |
| `label`       | Yes      | `string`  |          | Display text presented to the user above the input by default.                              |
| `hint`        | No       | `string`  |          | A hint triggered by an icon tooltip to be displayed when hovering beside the element label. |
| `required`    | Yes      | `boolean` | `false`  | Determine if this input requires a value drawn by the user (`true`) or not (`false`).       |
| `storageType` | no       | `string`  |          | How the drawing will be stored: `private`, `public`, `legacy`                               |

Draw element also inherits the properties of the following:

- [Base Element](./base-element.md)

### Example

```JSON
{
  "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
  "type": "draw",
  "name": "signature",
  "label": "Sign Here",
  "storageType": "private",
  "required": true
}
```

### Example Submission Data

#### Private/Public Storage

```json
{
  "submission": {
    "[element.name]": {
      "s3": {
        "region": "ap-southeast-2",
        "bucket": "customer.forms.oneblink.io",
        "key": "submissions/1/attachments/44cdee6f-edbd-4620-aaf5-df25ce976e43"
      },
      "url": "https://auth-api.blinkm.io/submissions/1/attachments/44cdee6f-edbd-4620-aaf5-df25ce976e43",
      "contentType": "image/png",
      "fileName": "dot.png",
      "id": "44cdee6f-edbd-4620-aaf5-df25ce976e43",
      "isPrivate": true
    }
  }
}
```

#### Legacy Storage (Deprecated)

```json
{
  "submission": {
    "[element.name]": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAIElEQVQYV2NkYGBoYGBgqGdgYGhkZGBg+M8ABSAOXAYATFcEA8STCz8AAAAASUVORK5CYII="
  }
}
```
