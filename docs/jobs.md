# OneBlink SDK | Jobs Class

## Constructor

| Parameter | Required | Type | Description
|---|---|---|---|
| `options.accessKey` | Yes | `string` | Access key provided by OneBlink. |
| `options.secretKey` | Yes | `string` | Secret key provided by OneBlink. |

### Example

```javascript
const OneBlink = require('@oneblink/sdk')

const options = {
  accessKey: '123455678901ABCDEFGHIJKL',
  secretKey: '123455678901ABCDEFGHIJKL123455678901ABCDEFGHIJKL'
}
const jobs = new OneBlink.Jobs(options)
```

## Delete Single Job

### Example

```javascript
const jobId = '123455678901ABCDEFGHIJKL'
jobs.deleteJob(jobId)
  .then(() => {
    // Job has been deleted
  })
```

### Parameters

| Parameter | Required | Type | Description
|---|---|---|---|
| `keyId` | Yes | `string` | The exact id of the key you wish to get |

### Result (Resolved Promise)

-   No return value (`undefined`)
