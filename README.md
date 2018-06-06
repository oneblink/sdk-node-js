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
const SECRET_KEY = 'abcd'
const oneblink = new OneBlink.Forms({
  accessKey: ACCESS_KEY,
  secretKey: SECRET_KEY
})
```

## API

The Oneblink SDK currently exposes the following functions:

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
  "formUrl": "https://forms.oneblink.io/1?externalId=123456abc&access_key=qwertyuiop098765432",
  "expiry": "2018-06-05T09:09:46.227Z"
}
```

```javascript
getSubmissionData(formId, submissionId)
```
| Parameter | Description
|---|---|
| `formId` | The exact id of the form you wish to retrieve a record from |
| `submissionId` | The exact submission id of the form record you wish to retrieve

Response Object:

```json
{
  "object": {
    "one": "two"
  }
}
```

```javascript
search(organisationId, isPublished)
```
| Parameter | Description
|---|---|
| `organisationId` | The exact id of the organisation you wish to return a list of forms from |
| `isPublished` | a true/false boolean to either return published forms or unpublished forms

Response Object:

```json
  [
    {
      "id": 1,
      "name": "testsform",
      "description": "a form",
      "organisationId": "0101010101010",
      "elements": [],
      "isAuthenticated": false,
      "isPublished": true,
      "submissionEvents": []
    }
  ]
```
