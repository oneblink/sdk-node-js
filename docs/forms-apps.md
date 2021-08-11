# OneBlink SDK | FormsApps Class

## Functions

- [`createFormsApp()`](#createformsapp)
- [`createUser()`](#createuser)
- [`deleteFormsApp()`](#deleteformsapp)
- [`deleteUser()`](#deleteuser)
- [`getFormsApp()`](#getformsapp)
- [`getMyFormsApp()`](#getmyformsapp)
- [`updateFormsApp()`](#updateformsapp)
- [`updateStyles()`](#updatestyles)
- [`setSendingAddress()`](#setSendingAddress)
- [`deleteSendingAddress()`](#deleteSendingAddress)

## Static Functions

- [`verifyJWT()`](#verifyjwt)

## Constructor

| Parameter           | Required | Type     | Description                                                       |
| ------------------- | -------- | -------- | ----------------------------------------------------------------- |
| `options.accessKey` | Yes      | `string` | Access key provided by OneBlink, requires the `FORMS` permission. |
| `options.secretKey` | Yes      | `string` | Secret key provided by OneBlink, requires the `FORMS` permission. |

### Example

```javascript
const OneBlink = require('@oneblink/sdk')

const options = {
  accessKey: '123455678901ABCDEFGHIJKL',
  secretKey: '123455678901ABCDEFGHIJKL123455678901ABCDEFGHIJKL',
}
const formsAppsSDK = new OneBlink.FormsApps(options)
```

## `verifyJWT()`

A static function to verify a JWT and return its result

### Example

```javascript
const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
// or
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
OneBlink.FormsApps.verifyJWT(token)
  .then((result) => {
    // Result is Decoded Token
  })
  .catch((e) => {
    // Token was invalid
  })
```

### Parameters

| Parameter | Required | Type     | Description                |
| --------- | -------- | -------- | -------------------------- |
| `token`   | Yes      | `string` | The JWT you wish to verify |

### Result (Resolved Promise)

```js
{
  sub: '88724de3-d728-448a-b0a9-7c1b585f1f0f',
  'cognito:groups': ['ap-southeast-2_o1t3ntGWx_Google'],
  token_use: 'access',
  scope: 'aws.cognito.signin.user.admin openid profile email',
  auth_time: 1591078251,
  iss:
    'https://token-issuer-url.com/',
  exp: 1591141557,
  iat: 1591137957,
  version: 2,
  jti: 'e36f68e7-a0ff-4f93-b2b0-c3b8c63c02f0',
  client_id: 'clientId',
  username: 'username',
}
```

## `createFormsApp()`

Create a [Forms App](./types/forms-app/README.md)

### Example

```javascript
const formsApp = {
  name: 'My Application',
  slug: 'my',
  pwaSettings: {
    homeScreenName: 'App',
    splashScreenName: 'Application',
  },
  organisationId: 'ABCDEFGHIJKL123456789012',
  formsAppEnvironmentId: 1,
  formIds: [],
  notificationEmailAddresses: ['support@organisation.com'],
}
formsAppsSDK.createFormsApp(formsApp).then((savedFormsApp) => {
  // Use Forms App here...
})
```

### Parameters

| Parameter  | Required | Type                                                     | Description          |
| ---------- | -------- | -------------------------------------------------------- | -------------------- |
| `formsApp` | Yes      | [`NewFormsApp`](./types/forms-app/README.md#newformsapp) | Forms App properties |

### Result (Resolved Promise)

[Retrieved Forms App](./types/forms-app/README.md#retrievedformsapp)

## `createUser()`

Create a Forms App User

### Example

```javascript
const formsAppUser = {
  email: 'email@domain.io',
  formsAppId: 1,
  generatePassword: true,
  welcomeEmailParameters: {
    company: 'Company Name',
  },
}
formsAppsSDK.createUser(formsAppUser).then((savedFormsAppUser) => {
  // Use Forms App User here...
})
```

### Parameters

| Parameter                             | Required | Type      | Description                                                                                                                                                           |
| ------------------------------------- | -------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `formsAppUser`                        | Yes      | `Object`  | Forms App User properties                                                                                                                                             |
| `formsAppUser.email`                  | Yes      | `string`  | Email address of the Forms App User                                                                                                                                   |
| `formsAppUser.formsAppId`             | Yes      | `number`  | The exact Forms App identifier the Forms App User is associated with                                                                                                  |
| `formsAppUser.generatePassword`       | Yes      | `boolean` | Determine if a password is generated for the Forms App User (`true`) or not (`false`). Specify `false` if the user is using a social provider (e.g. Google) to login. |
| `formsAppUser.welcomeEmailParameters` | No       | `Object`  | Additional parameters to be passed to the welcome email template for the form app matching the `formsAppId`                                                           |

#### Welcome Email Parameters

The following parameters for the welcome email [mustache](http://mustache.github.io/#demo) template are already taken and will be overridden if supplied:

| Parameter              | type      | Description                                                                                           |
| ---------------------- | --------- | ----------------------------------------------------------------------------------------------------- |
| `formsAppUrl`          | `string`  | The URL for the Forms App, use this to allow your new user to click the a link and open the Forms App |
| `formsAppName`         | `string`  | The name of the Forms App                                                                             |
| `coloursHighlight`     | `string`  | The `highlightColour` set in the `styles` for the Forms App                                           |
| `coloursContrast`      | `string`  | The `contrastColour` set in the `styles` for the Forms App                                            |
| `displayPassword`      | `boolean` | Determine if a password will be included in the welcome email (`true`) or not (`false`)               |
| `showExistingPassword` | `boolean` | Determine if a the user already has a password in the system (`true`) or not (`false`)                |
| `password`             | `string`  | The new users temporary password                                                                      |

### Result (Resolved Promise)

```json
{
  "id": 1,
  "email": "email@domain.io",
  "formsAppId": 1,
  "createdAt": "2018-06-01T00:00:00.000Z"
}
```

## `deleteFormsApp()`

Delete a Forms App by its identifier

### Example

```javascript
const formsAppId = 1
formsAppsSDK.deleteFormsApp(formsAppId).then(() => {
  // Forms App has been deleted...
})
```

### Parameters

| Parameter   | Required | Type     | Description                                              |
| ----------- | -------- | -------- | -------------------------------------------------------- |
| `formAppId` | Yes      | `number` | The exact identifier of the Forms App you wish to delete |

### Result (Resolved Promise)

```js
undefined
```

## `deleteUser()`

Delete a Forms App User by its identifier

### Example

```javascript
const formsAppUserId = 1
formsAppsSDK.deleteUser(formsAppUserId).then(() => {
  // Forms App User has been deleted...
})
```

### Parameters

| Parameter        | Required | Type     | Description                                            |
| ---------------- | -------- | -------- | ------------------------------------------------------ |
| `formsAppUserId` | Yes      | `number` | The exact Forms App User identifier you wish to delete |

### Result (Resolved Promise)

```js
undefined
```

## `getFormsApp()`

Get a single [Forms App](./types/forms-app/README.md) by its identifier

### Example

```javascript
const formsAppId = 1
formsAppsSDK.getFormsApp(formsAppId).then((formsApp) => {
  // Use Forms App here...
})
```

### Parameters

| Parameter   | Required | Type     | Description                                           |
| ----------- | -------- | -------- | ----------------------------------------------------- |
| `formAppId` | Yes      | `number` | The exact identifier of the Forms App you wish to get |

### Result (Resolved Promise)

```json
{
  "id": 1,
  "name": "My Application",
  "hostname": "customer-my.app.oneblink.io",
  "slug": "my",
  "oAuthClientId": "ABCDEFGHIJKL123456789012",
  "styles": {
    "logoUrl": "",
    "customCss": "",
    "contrastColour": "#fff",
    "highlightColour": "#0693e3",
    "foregroundColour": "#abb8c3",
    "menuItems": []
  },
  "pwaSettings": {
    "homeScreenName": "App",
    "splashScreenName": "Application",
    "homeScreenIconUrl": ""
  },
  "createdAt": "2018-06-01T00:00:00.000Z",
  "updatedAt": "2019-05-17T05:49:14.000Z",
  "organisationId": "ABCDEFGHIJKL123456789012",
  "formsAppEnvironmentId": 1,
  "formIds": [],
  "notificationEmailAddresses": ["support@organisation.com"],
  "isClientLoggingEnabled": false
}
```

## `getMyFormsApp()`

Get a single [Forms App](./types/forms-app/README.md) for the Bearer token of a Forms App User

### Example

```javascript
const bearerToken = ''
formsAppsSDK.getMyFormsApp(bearerToken).then((formsApp) => {
  // Use Forms App here...
})
```

### Parameters

| Parameter     | Required | Type     | Description                                                                    |
| ------------- | -------- | -------- | ------------------------------------------------------------------------------ |
| `bearerToken` | Yes      | `string` | The Bearer token in the `Authorization` header from a request from an App User |

### Result (Resolved Promise)

Same as [`getFormsApp()`](#getformsapp)

## `updateFormsApp()`

Update a [Forms App](./types/forms-app/README.md)

### Example

```javascript
formsAppsSDK.updateFormsApp(formsApp).then((savedFormsApp) => {
  // Use Forms App here...
})
```

### Parameters

| Parameter  | Required | Type                                               | Description          |
| ---------- | -------- | -------------------------------------------------- | -------------------- |
| `formsApp` | Yes      | [`FormsApp`](./types/forms-app/README.md#formsapp) | Forms App properties |

### Result (Resolved Promise)

[Retreived FormsApp](./types/forms-app/README.md#retreived-formsapp)

## `updateStyles()`

Update styles for [Forms App](./types/forms-app/README.md)

### Example

```javascript
formsAppsSDK.updateStyles(formsAppId, styles).then(() => {
  // Styles have been updated...
})
```

### Parameters

| Parameter | Required | Type                                                    | Description                 |
| --------- | -------- | ------------------------------------------------------- | --------------------------- |
| `styles`  | Yes      | [`FormsAppStyles`](./types/forms-app/FormsAppStyles.md) | Forms App styles properties |

### Result (Resolved Promise)

[`FormsAppStyles`](./types/forms-app/FormsAppStyles.md)

## `setSendingAddress()`

Set the email address forms app emails will be sent from

### Example

```javascript
const formsAppId = 1
const sendingAddressConfig = {
  emailAddress: 'developers@oneblink.io',
  emailName: 'developers',
}

const res = await formsAppsSDK.setSendingAddress(
  formsAppId,
  sendingAddressConfig,
)
```

### Parameters

| Parameter                           | Required | Type     | Description                                                                      |
| ----------------------------------- | -------- | -------- | -------------------------------------------------------------------------------- |
| `formsAppId`                        | Yes      | `string` | The ID of the forms app you wish to set the sending address for.                 |
| `sendingAddressConfig`              | Yes      | `Object` | The object containing the `emailAddress` & `emailName` properties                |
| `sendingAddressConfig.emailAddress` | Yes      | `string` | The email address to be used as the sending address.                             |
| `sendingAddressConfig.emailName`    | No       | `string` | The name that will appear as the sender on emails sent from the sending address. |

### Result (Resolved Promise)

```json
{
  "emailAddress": "developers@oneblink.io",
  "emailName": "developers",
  "formsAppId": 760,
  "createdAt": "2020-11-13T03:40:14.000Z",
  "updatedAt": "2020-11-15T23:19:34.250Z",
  "sesVerificationAttributes": { "VerificationStatus": "Pending" }
}
```

## `deleteSendingAddress()`

Remove a custom sending address for a forms app

### Example

```javascript
const formsAppId = 1

await formsAppsSDK.deleteSendingAddress(formsAppId)
```

### Parameters

| Parameter    | Required | Type     | Description                                                          |
| ------------ | -------- | -------- | -------------------------------------------------------------------- |
| `formsAppId` | Yes      | `string` | The ID of the forms app you wish to remove the sending address from. |
