# OneBlink SDK

## installation

`npm i @oneblink/sdk --save`

## usage

require in the SDK:

`const OneblinkSDK = require('@oneblink/sdk')`

initialise the SDK object:

```javascript
const oneblink = new OneblinkSDK()
```

The OneblinkSDK currently exposes the following function:

```javascript
generateFormUrl(accessKey, secretKey, formId, externalId, jwtExpiry)
```

| Parameter | Description
|---|---|
| `accessKey` | The access key variable of your FaaS key |
| `secretKey` | The secret of your FaaS key |
| `formId` | The exact id of the form you wish to generate a URL for |
| `externalId` | The external identifier of the form or form submission you wish to use, this will be given back to you in the query string |

Return Object:

```json
{
  "formUrl": "https://forms.oneblink.io/1?externalId=123456abc",
  "jwt": "qwertyuiop098765432",
  "jwtExpiry": "2018-01-01T23:00:00"
}
```

