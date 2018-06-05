# OneBlink SDK

OneBlink SDK to serve as an entry point for all OneBlink Services in NodeJS

## Installation

```sh
npm install @oneblink/sdk --save
```

## Usage

Require in the SDK:

```javascript
const OneBlink = require('@oneblink/sdk')
```

Initialise the SDK object for Forms:

```javascript
const ACCESS_KEY = '12345'
const SECRET = 'abcd'
const oneblink = new OneBlink.Forms({
  accessKey: ACCESS_KEY,
  Secret: SECRET
})
```

The Oneblink SDK currently exposes the following function:

```javascript
generateFormUrl(formId, externalId)
```

| Parameter | Description
|---|---|
| `formId` | The exact id of the form you wish to generate a URL for |
| `externalId` | (optional) The external identifier of the form or form submission you wish to use, this will be given back to you in the query string

Response Object:

```json
{
  "formUrl": "https://forms.oneblink.io/1?externalId=123456abc",
  "jwt": "qwertyuiop098765432",
  "jwtExpiry": "2018-01-01T23:00:00"
}
```

