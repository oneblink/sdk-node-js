# OneBlink SDK | Organisations Class

## Constructor

| Parameter           | Required | Type     | Description                      |
| ------------------- | -------- | -------- | -------------------------------- |
| `options.accessKey` | Yes      | `string` | Access key provided by OneBlink. |
| `options.secretKey` | Yes      | `string` | Secret key provided by OneBlink. |

### Example

```javascript
const OneBlink = require('@oneblink/sdk')

const options = {
  accessKey: '123455678901ABCDEFGHIJKL',
  secretKey: '123455678901ABCDEFGHIJKL123455678901ABCDEFGHIJKL',
}
const organisations = new OneBlink.Organisations(options)
```

## Get Single Organisation

### Example

```javascript
const organisationId = 'ABCDEFGHIJKL123455678901'
organisations.getOrganisation(organisationId).then((organisation) => {
  // Use organisation here...
})
```

### Parameters

| Parameter        | Required | Type     | Description                                      |
| ---------------- | -------- | -------- | ------------------------------------------------ |
| `organisationId` | Yes      | `string` | The exact id of the organisation you wish to get |

### Result (Resolved Promise)

```json
{
  "id": "ABCDEFGHIJKL123455678901",
  "name": "Organisation Name",
  "createdAt": "2017-09-28T05:28:43.000Z",
  "links": {
    "awsAccounts": ["ABCDEFG55678901HIJKL1234"]
  },
  "tags": ["Organisation Tag"],
  "assetsS3Bucket": "example.forms.oneblink.io",
  "slug": "example",
  "beeFormsCustomer": false
}
```

## Upload Asset

### Example

```javascript
const assetData = 'binary data'
const assetFileName = 'file.jpg'
const assetContentType = 'text/plain'
organisations.uploadAsset(assetData, assetFileName).then((uploadResult) => {
  // Use uploadResult  here...
})
```

### Parameters

| Parameter          | Required | Type     | Description                                                                                                                                           |
| ------------------ | -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `assetData`        | Yes      | `any`    | Binary data of the asset to upload                                                                                                                    |
| `assetFileName`    | Yes      | `string` | Filename to use for the asset                                                                                                                         |
| `assetContentType` | No       | `string` | A standard MIME type describing the format of the contents. For more information, see http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.17 |

### Result (Resolved Promise)

```json
{
  "location": "https://assets.com/assets/file.jpg"
}
```
