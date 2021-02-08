# Changelog

## Unreleased

### Updated

- Forms Apps docs to reflect separate app types

### Fixed

- Allow `excludedElementIds` to be an empty array

## 0.9.3 (2020-01-18)

### Added

- `excludedElementIds` to PDF Submission event configuration
- `geoscapeAddress` form element to form element schema

## 0.9.2 (2020-12-22)

### Added

- Added `includeSubmissionIdInPdf` to PDF and Trim Submission event properties
- Added `crn2` and `crn3` as BPoint Submission event properties

## 0.9.1 (2020-12-15)

### Added

- `encryptedElementIds` to `CP_HCMS` submission event type

## 0.9.0 (2020-11-24)

### Added

- `userToken` to form URLs
- `Forms.decryptUserToken()` and `Forms.encryptUserToken()` functions

## 0.8.0 (2020-11-17)

### Added

- [`setSendingAddress()`](./docs/forms-apps.md#setSendingAddress) function
- [`deleteSendingAddress()`](./docs/forms-apps.md#deleteSendingAddress) function

### Removed

- SPOTTO submission event

## 0.7.6 (2020-11-12)

### Added

- minLength/maxLength props for text & textarea elements
- `isInteger` to `number` element type
- `includeTimestampWatermark` to `camera` element type

## 0.7.5 (2020-11-05)

### Added

- BETWEEN type to conditional logic predicates

## 0.7.4 (2020-10-15)

### Added

- Solution prop to RolePrivilege type
- `uploadAsset` to `Organisations` class

### Fixed

- `form.submissionEvents` allowing `null` and `undefined`

## 0.7.3 (2020-07-23)

### Added

- Conditional execute properties to submission events
- Allowed 'NOW' for date, time and DateTime defaultValues
- Update `Forms-App` docs

## 0.7.2 (2020-07-09)

### Added

- `environmentId` to BPOINT and TRIM submission event configuration

## 0.7.1 (2020-07-06)

### Added

- Publish start and end date
- Added tags for form def
- Types and validation for placeholderValue on form elements
- added `overrideLock` parameter to update and delete form functions
- docs for all available search parameters when searching for forms
- `gatewayId` to `FormSubmissionEventConfiguration`
- `generatePageElement` to `Forms` class

## 0.7.0 (2020-06-10)

### Breaking Changes

- removed `tenant` argument from all classes. This has been replaced by specifying the tenant in the `require()` path. See the [Tenants](./docs/README.md#tenants) documentation for more details.

### Added

- static verifyJWT function in FormsApps Class

## 0.6.1 (2020-06-03)

### Added

- `BPOINT` submission event to form schema
- `CP_HCMS` submission event to form schema
- `SEARCH` and `searchUrl` documentation for Autocomplete elements

### Dependencies

- update [aws-sdk](https://www.npmjs.com/package/aws-sdk) to [2.683.0](https://github.com/aws/aws-sdk-js/releases/tag/v2.683.0) (from [2.673.0](https://github.com/aws/aws-sdk-js/releases/tag/v2.673.0))

- update [uuid](https://www.npmjs.com/package/uuid) to [8.1.0](https://github.com/uuidjs/uuid/blob/master/CHANGELOG.md) (from [8.0.0](https://github.com/uuidjs/uuid/blob/master/CHANGELOG.md))

## 0.6.0 (2020-05-25)

### Added

- Summary Element to Element types
- `slug` property to Forms Apps
- `slug` property to Organisations

## 0.5.0 (2020-05-14)

### Breaking Changes

- Drop support for Node 8

### Added

- `CP_PAY` submission event to form schema
- [`createForm()`](./docs/forms.md#createform) function
- [`updateForm()`](./docs/forms.md#updateform) function
- [`deleteForm()`](./docs/forms.md#deleteform) function
- `required` to `location` form element type

### Removed

- `url`, `username` and `password` from `TRIM` submission event

## 0.4.5 (2020-04-03)

### Fixed

- `0.4.4` being published with `--tag beta`

## 0.4.4 (2020-04-02)

### Removed

- Regex for apiId in the form submission

### Added

- `TRIM` submission event to forms schema

## 0.4.3 (2020-02-26)

### Added

- Added [`searchSubmissions()`](./docs/forms#searchSubmissions) function to Form class

## 0.4.2 (2020-02-13)

### Added

- `Files` element
- `priority` as optional parameter to `createJob` function
- `device` property to example of form submission data

## 0.4.1 (2020-01-30)

### Added

- Added [`search()`](./docs/jobs#search) function to Jobs class

## 0.4.0 (2019-12-18)

### Added

- Added form schema validation for `formsAppEnvironmentId` in Forms and FormsApps

### Changed

- element and data lookup configuration

## 0.3.4 (2019-11-04)

### Added

- Added `restrictFileTypes` and `restrictedFileTypes` properties for file element

## 0.3.3 (2019-09-16)

### Added

- Added `SEARCH` options type and `searchUrl` property for autocomplete element

## 0.3.2 (2019-06-20)

### Added

- `isDraft` property to form submission events
- `isDraft` parameter to [`Forms.getSubmissionData()`](./docs/forms.md#getsubmissiondata)
- [`TeamMembers`](./docs/team-members.md) class

## 0.3.1 (2019-06-18)

### Added

- `formsAppId` options to [`Forms.generateFormUrl()`](./docs/forms.md#generateformurl)

## 0.3.0 (2019-06-07)

### Breaking Changes

- [`Forms.generateFormUrl()`](./docs/forms.md#generateformurl)) now takes an object with the following properties
  - `formId`
  - `externalId`
  - `preFillData`
  - `expiryInSeconds`

```diff
const OneBlink = require('@oneblink/sdk')

const options = {
  accessKey: '123455678901ABCDEFGHIJKL',
  secretKey: '123455678901ABCDEFGHIJKL123455678901ABCDEFGHIJKL'
}
const formsSDK = new OneBlink.Forms(options)

-const formId = 1
-const externalId = 'My Custom Identifier'
-const preFillData = {
-  'FieldName1' : 'A Machine',
-  'FieldName2' : 'Room B'
-}
-formsSDK.generateFormUrl(formId, externalId, preFillData)
+formsSDK.generateFormUrl({
+  formId: 1,
+  externalId: 'My Custom Identifier',
+  preFillData: {
+    'FieldName1' : 'A Machine',
+    'FieldName2' : 'Room B'
+  }
+})
```

## 0.2.9 (2019-06-03)

### Added

- [`getMyFormsApp()`](./docs/forms-apps.md#getmyformsapp) function
- `injectForms` parameter to `getForm()` function

## 0.2.8 (2019-05-23)

### Added

- ON-4090 # added `form` and `infoPage` element types
- ON-4098 # Strip out unwanted properties from form elements
- [`FormsApps`](./docs/forms-apps.md) class

## 0.2.7 (2019-05-06)

### Added

- ON-4044 # added `validateForm()` function for validating a form schema
- ON-4039 # added `generateFormElement()` function for generating & validating a form element

## 0.2.6 (2019-03-14)

### Added

- `Jobs` class with `createJob()` and `deleteJob()` functions

### Dependencies

- update [aws-sdk](https://www.npmjs.com/package/aws-sdk) to [2.400.0](https://github.com/aws/aws-sdk-js/releases/tag/v2.400.0) (from [2.336.0](https://github.com/aws/aws-sdk-js/releases/tag/v2.336.0))

- update [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) to [8.4.0](https://github.com/auth0/node-jsonwebtoken/blob/master/CHANGELOG.md) (from [8.3.0](https://github.com/auth0/node-jsonwebtoken/blob/master/CHANGELOG.md))

- depend upon [joi](https://www.npmjs.com/package/joi) [14.3.1](https://github.com/hapijs/joi/blob/master/CHANGELOG.md)

## 0.2.5 (2018-01-14)

### Changed

- Changed `generateFormUrl()` function to get hostname via `appId`

## 0.2.4 (2018-10-24)

### Added

- `forms.generateSubmissionDataUrl()` function

## 0.2.3 (2018-10-17)

### Added

- `forms.getForm()` function

## 0.2.2 (2018-09-25)

### Added

- `Organisations` classes
- `Keys` class

## 0.2.1 (2018-09-04)

### Added

- Pre filled data argument to `forms.generateFormUrl()` function

### Fixed

- Path of forms renderer URL to match `/forms/{formId}`

## 0.2.0 (2018-08-07)

### Changed

- `forms.generateFormUrl(formId, externalId)` to return a promise that will resolve with the same value as before

## 0.1.0 (2018-07-11)

### Added

- `isAuthenticated` search parameter to Forms `search()` function
- `name` search parameter to Forms `search()` function

### Removed

- `organisationId` search parameter from Forms `search()` function

### Dependencies

- update [aws-sdk](https://www.npmjs.com/package/aws-sdk) to [2.272.1](https://github.com/aws/aws-sdk-js/releases/tag/v2.272.1) (from [2.251.1](https://github.com/aws/aws-sdk-js/releases/tag/v2.251.1))

- update [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) to [8.3.0](https://github.com/auth0/node-jsonwebtoken/blob/master/CHANGELOG.md) (from [8.2.2](https://github.com/auth0/node-jsonwebtoken/blob/master/CHANGELOG.md))

## 0.0.1 (2018-06-13)

### Initial Release
