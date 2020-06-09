# OneBlink SDK | Keys Class

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
const keys = new OneBlink.Keys(options)
```

## Get Single Key

### Example

```javascript
const keyId = '123455678901ABCDEFGHIJKL'
keys.getKey(keyId).then((key) => {
  // Use key here...
})
```

### Parameters

| Parameter | Required | Type     | Description                             |
| --------- | -------- | -------- | --------------------------------------- |
| `keyId`   | Yes      | `string` | The exact id of the key you wish to get |

### Result (Resolved Promise)

```json
{
  "id": "123455678901ABCDEFGHIJKL",
  "name": "API Key",
  "privilege": {
    "API HOSTING": "DEPLOYMENT",
    "FORMS": "FaaS",
    "PDF": "BUILDER",
    "WEB APP HOSTING": "DEPLOYMENT"
  },
  "links": {
    "organisations": "ABCDEFGHIJKL123455678901"
  }
}
```
