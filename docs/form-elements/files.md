# OneBlink SDK | Form Element Definitions

[Back to all Elements](./README.md)

## Files Element

Allow the user upload a array of files from their device.

| Property       | Required | Type     | Default   | Description                                                                                                                                       |
| -------------- | -------- | -------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`         | Yes      | `string` | `'files'` | The type of Form Element.                                                                                                                         |
| `name`         | Yes      | `string` |           | The key that will be assigned a value in the submission data when the form is submitted.                                                          |
| `label`        | Yes      | `string` |           | Display text presented to the user above the input by default.                                                                                    |
| `hint`         | No       | `string` |           | A hint triggered by an icon tooltip to be displayed when hovering beside the element label.                                                       |
| `minEntries`   | No       | `string` |           | Minimum number of files required                                                                                                                  |
| `storageType`  | no       | `string` |           | How the files uploaded by a user will be stored: `private`, `public`, `legacy`                                                                    |
| `defaultValue` | no       | `Array`  |           | An array of attachments, see [Example Submission Data](#example-submission-data) below for structure which is based on the `storageType` property |

Files element also inherits the properties of the following:

- [Base Element](./base-element.md)
- [Lookup Element](./lookup-element.md)

### Example

```json
{
  "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
  "type": "files",
  "name": "supportingDocuments",
  "label": "Please Upload your Supporting Documentation",
  "storageType": "private",
  "minEntries": 1,
  "maxEntries": 2
}
```

### Example Submission Data

#### Private/Public Storage

```json
{
  "submission": {
    "[element.name]": [
      {
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
    ]
  }
}
```

#### Legacy Storage (Deprecated)

```json
{
  "submission": {
    "[element.name]": [
      {
        "fileName": "dot.png",
        "data": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAIElEQVQYV2NkYGBoYGBgqGdgYGhkZGBg+M8ABSAOXAYATFcEA8STCz8AAAAASUVORK5CYII="
      }
    ]
  }
}
```
