# OneBlink SDK | Form Element Definitions

[Back to all Elements](./README.md)

## Camera Element

Allow the user to take a photo using native camera functionality (or select an existing image) if the device is supported.

| Property                    | Required | Type      | Default    | Description                                                                                 |
| --------------------------- | -------- | --------- | ---------- | ------------------------------------------------------------------------------------------- |
| `type`                      | Yes      | `string`  | `'camera'` | The type of Form Element.                                                                   |
| `name`                      | Yes      | `string`  |            | The key that will be assigned a value in the submission data when the form is submitted.    |
| `label`                     | Yes      | `string`  |            | Display text presented to the user above the input by default.                              |
| `required`                  | Yes      | `boolean` | `false`    | Determine if this input requires a value entered by the user (`true`) or not (`false`).     |
| `hint`                      | No       | `string`  |            | A hint triggered by an icon tooltip to be displayed when hovering beside the element label. |
| `includeTimestampWatermark` | no       | `boolean` | `false`    | Whether a watermark with a timestamp should be placed on images captured with this element. |
| `storageType`               | no       | `string`  |            | How the photo taken by a user will be stored: `private`, `public`, `legacy`                 |

Camera element also inherits the properties of the following:

- [Base Element](./base-element.md)

### Example

```json
{
  "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
  "type": "camera",
  "name": "photo",
  "label": "Please Take a Photo",
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
