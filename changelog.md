# Changelog

## Unreleased

# 0.4.2 (2020-02-13)

### Added

- `Files` element
- `priority` as optional parameter to `createJob` function
- `device` property to example of form submission data

# 0.4.1 (2020-01-30)

### Added

- Added [`search()`](./docs/jobs#search) function to Jobs class

# 0.4.0 (2019-12-18)

### Added

- Added form schema validation for `formsAppEnvironmentId` in Forms and FormsApps

### Changed

- element and data lookup configuration

# 0.3.4 (2019-11-04)

### Added

- Added `restrictFileTypes` and `restrictedFileTypes` properties for file element

# 0.3.3 (2019-09-16)

### Added

- Added `SEARCH` options type and `searchUrl` property for autocomplete element

# 0.3.2 (2019-06-20)

### Added

- `isDraft` property to form submission events
- `isDraft` parameter to [`Forms.getSubmissionData()`](./docs/forms.md#getsubmissiondata)
- [`TeamMembers`](./docs/team-members.md) class

# 0.3.1 (2019-06-18)

### Added

- `formsAppId` options to [`Forms.generateFormUrl()`](./docs/forms.md#generateformurl)

# 0.3.0 (2019-06-07)

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
