# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `emailTemplate` to `"PDF"` submission event
- `FormsAppEnvironments` class

### Breaking Changes

- Updated `Forms.search()` to `Forms.searchForms()`.

## [0.16.0] - 2021-11-01

### Added

- Lookup element schema to `files` element type

## [0.15.0] - 2021-10-05

### Added

- `usePagesAsBreaks` property to submission events which can generate a PDF

## [0.14.0] - 2021-09-27

### Added

- `groupFiles` property to `'TRIM'` form submission event

### Dependencies

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [0.1.3](https://github.com/oneblink/sdk-core-js/releases/tag/v0.1.3) (from [0.1.3-beta.1](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md))

- update [aws-sdk](https://www.npmjs.com/package/aws-sdk) to [2.994.0](https://github.com/aws/aws-sdk-js/releases/tag/v2.994.0) (from [2.971.0](https://github.com/aws/aws-sdk-js/releases/tag/v2.971.0))

- update [node-fetch](https://www.npmjs.com/package/node-fetch) to 2.6.5 (from [2.6.1](https://github.com/node-fetch/node-fetch/releases/tag/v2.6.1))

- update [nodemailer](https://www.npmjs.com/package/nodemailer) to [6.6.5](https://github.com/nodemailer/nodemailer/blob/master/CHANGELOG.md) (from [6.6.3](https://github.com/nodemailer/nodemailer/blob/master/CHANGELOG.md))

## [0.13.0] - 2021-09-24

### Added

- `BSB` form element

## [0.12.1] - 2021-09-20

### Dependencies

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [0.1.3-beta.1](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md) (from [0.1.0](https://github.com/oneblink/sdk-core-js/releases/tag/v0.1.0))

## [0.12.0] - 2021-09-15

### Added

- [`validateApiRequest()`](./docs/forms.md#validateapirequest) function
- [`getFormSubmissionApproval()`](./docs/approvals.md#getformsubmissionapproval) function
- [`getFormApprovalFlowInstance()`](./docs/approvals.md#getformapprovalflowinstance) function

### Renamed

- [`searchFormSubmissionAdministrationApprovals()`](./docs/approvals.md#searchformsubmissionadministrationapprovals) function

## [0.11.2] - 2021-09-09

### Fixed

- summary element validation not allowing nested form elements

## [0.11.1] - 2021-08-31

### Added

- `updatedAfterDateTime` and `updatedBeforeDateTime` query parameters to `approvals.getFormSubmissionAdministrationApprovals`
- `lastUpdatedBy` query parameter to `approvals.getFormSubmissionAdministrationApprovals`

## [0.11.0] - 2021-08-23

### Added

- `isDescription` property to `form.submissionEvents[].configuration.mapping[]`

### Dependencies

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [0.1.0](https://github.com/oneblink/sdk-core-js/releases/tag/v0.1.0) (from [0.1.0-beta.1](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md))

- update [aws-sdk](https://www.npmjs.com/package/aws-sdk) to [2.971.0](https://github.com/aws/aws-sdk-js/releases/tag/v2.971.0) (from [2.925.0](https://github.com/aws/aws-sdk-js/releases/tag/v2.925.0))

- update [joi](https://www.npmjs.com/package/joi) to 17.4.2 (from 17.4.0)

- update [jwks-rsa](https://www.npmjs.com/package/jwks-rsa) to [2.0.4](https://github.com/auth0/node-jwks-rsa/releases/tag/v2.0.4) (from [2.0.3](https://github.com/auth0/node-jwks-rsa/releases/tag/v2.0.3))

- update [nodemailer](https://www.npmjs.com/package/nodemailer) to [6.6.3](https://github.com/nodemailer/nodemailer/blob/master/CHANGELOG.md) (from [6.6.1](https://github.com/nodemailer/nodemailer/blob/master/CHANGELOG.md))

## [0.10.3] - 2021-08-11

### Added

- `Approvals` class
- `externalIdGeneration` property to form schema

## [0.10.2] - 2021-08-02

### Added

- `serverValidation` property to form schema

## [0.10.1] - 2021-07-21

### Fixed

- conditional predicate submission event validation

## [0.10.0] - 2021-07-20

### Added

- extra validation for form (copied out of API)
- [`generateSubmissionAttachmentUrl()`](./docs/forms.md#generatesubmissionattachmenturl)

### Breaking Changes

- drop support for NodeJS 10

### Dependencies

- depend upon [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) [0.1.0-beta.1](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md)

## [0.9.16] - 2021-06-30

### Added

- `defaultValue` to `files` form element validation
- `excludedElementIds` to `pdf.generateFormSubmissionPDF()`

## [0.9.15] - 2021-06-23

### Added

- `Section` form element
- `Boolean` form element
- `CIVICA_CRM` form submission event
- `civicaStreetName` form element
- `civicaRecordName` form element

### Dependencies

- update [aws-sdk](https://www.npmjs.com/package/aws-sdk) to [2.925.0](https://github.com/aws/aws-sdk-js/releases/tag/v2.925.0) (from [2.920.0](https://github.com/aws/aws-sdk-js/releases/tag/v2.920.0))

## [0.9.14] - 2021-06-06

### Added

- `canToggleAll` property to checkbox and multi select elements
- `WESTPAC_QUICK_WEB` submission event to form schema

### Dependencies

- update [aws-sdk](https://www.npmjs.com/package/aws-sdk) to [2.920.0](https://github.com/aws/aws-sdk-js/releases/tag/v2.920.0) (from [2.918.0](https://github.com/aws/aws-sdk-js/releases/tag/v2.918.0))

## [0.9.13] - 2021-06-02

### Updated

- Form element schemas to support regex properties.

### Fixed

- `Content-Disposition` header for attachment uploads

### Dependencies

- update [aws-sdk](https://www.npmjs.com/package/aws-sdk) to [2.918.0](https://github.com/aws/aws-sdk-js/releases/tag/v2.918.0) (from [2.912.0](https://github.com/aws/aws-sdk-js/releases/tag/v2.912.0))

- update [joi](https://www.npmjs.com/package/joi) to 17.4.0 (from 14.3.1)

- depend upon [content-disposition](https://www.npmjs.com/package/content-disposition) [0.5.3](https://github.com/jshttp/content-disposition/releases/tag/v0.5.3)

## [0.9.12] - 2021-05-26

### Changed

- `toDate` and `fromDate` to return raw data in form schema

### Added

- `encryptPdf` property to `CP_HCMS` submission event type
- `toDateDaysOffset`, `fromDateDaysOffset` and `defaultValueDaysOffset` properties to docs
- `cancelAction` property to Form

### Fixed

- network request's that fail without a JSON response attempting to parse the text as JSON

### Dependencies

- update [aws-sdk](https://www.npmjs.com/package/aws-sdk) to [2.912.0](https://github.com/aws/aws-sdk-js/releases/tag/v2.912.0) (from [2.894.0](https://github.com/aws/aws-sdk-js/releases/tag/v2.894.0))

- update [nodemailer](https://www.npmjs.com/package/nodemailer) to [6.6.1](https://github.com/nodemailer/nodemailer/blob/master/CHANGELOG.md) (from [6.5.0](https://github.com/nodemailer/nodemailer/blob/master/CHANGELOG.md))

## [0.9.11] - 2021-05-19

### Added

- documentation for `recaptchaIntegrationDomainId` property

## [0.9.10] - 2021-05-13

### Added

- `displayAsCurrency` to form element schema
- `storageType` to form element schema
- [`createSubmissionAttachment()`](./docs/forms.md#createsubmissionattachment)
- [`getSubmissionAttachmentBuffer()`](./docs/forms.md#getSubmissionAttachmentBuffer)
- [`getSubmissionAttachmentStream()`](./docs/forms.md#getsubmissionattachmentstream)
- `author` to submission events schema

### Dependencies

- update [aws-sdk](https://www.npmjs.com/package/aws-sdk) to [2.894.0](https://github.com/aws/aws-sdk-js/releases/tag/v2.894.0) (from [2.876.0](https://github.com/aws/aws-sdk-js/releases/tag/v2.876.0))

- update [jwks-rsa](https://www.npmjs.com/package/jwks-rsa) to [2.0.3](https://github.com/auth0/node-jwks-rsa/releases/tag/v2.0.3) (from [2.0.2](https://github.com/auth0/node-jwks-rsa/releases/tag/v2.0.2))

## [0.9.9] - 2021-04-27

### Added

- `isClientLoggingEnabled` to forms app docs
- `zoom` property to `location` form element submission data docs

## [0.9.8] - 2021-04-15

### Added

- `pointAddress` form element to form element schema

## [0.9.7] - 2021-03-31

### Added

- [Sending Emails](./docs/sendEmail.md)
- [PDF class](./docs/pdf.md)
- [`validateConditionalPredicates()`](./docs/forms.md#validateconditionalpredicates) function

### Dependencies

- update [aws-sdk](https://www.npmjs.com/package/aws-sdk) to [2.876.0](https://github.com/aws/aws-sdk-js/releases/tag/v2.876.0) (from [2.865.0](https://github.com/aws/aws-sdk-js/releases/tag/v2.865.0))

- update [jwks-rsa](https://www.npmjs.com/package/jwks-rsa) to [2.0.2](https://github.com/auth0/node-jwks-rsa/releases/tag/v2.0.2) (from [2.0.1](https://github.com/auth0/node-jwks-rsa/releases/tag/v2.0.1))

- depend upon [nodemailer](https://www.npmjs.com/package/nodemailer) [6.5.0](https://github.com/nodemailer/nodemailer/blob/master/CHANGELOG.md)

## [0.9.6] - 2021-03-23

### Added

- Compliance form element
- `hint` property to Form schema

### Fixed

- `form.submissionEvent[].configuration` allowing `null`

### Changed

- source to typescript

### Dependencies

- update [aws-sdk](https://www.npmjs.com/package/aws-sdk) to [2.865.0](https://github.com/aws/aws-sdk-js/releases/tag/v2.865.0) (from [2.812.0](https://github.com/aws/aws-sdk-js/releases/tag/v2.812.0))

- no longer depend upon [axios](https://www.npmjs.com/package/axios)

- update [jwks-rsa](https://www.npmjs.com/package/jwks-rsa) to [2.0.1](https://github.com/auth0/node-jwks-rsa/blob/master/CHANGELOG.md) (from [1.12.0](https://github.com/auth0/node-jwks-rsa/releases/tag/v1.12.0))

- depend upon [node-fetch](https://www.npmjs.com/package/node-fetch) [2.6.1](https://github.com/node-fetch/node-fetch/releases/tag/v2.6.1)

## [0.9.5] - 2021-03-03

### Added

- Allow `previousFormSubmissionApprovalId` to be included in `generateFormUrl()`

## [0.9.4] - 2021-02-09

### Updated

- Forms Apps docs to reflect separate app types

### Fixed

- Allow `excludedElementIds` to be an empty array

## [0.9.3] - 2020-01-18

### Added

- `excludedElementIds` to PDF Submission event configuration
- `geoscapeAddress` form element to form element schema

## [0.9.2] - 2020-12-22

### Added

- Added `includeSubmissionIdInPdf` to PDF and Trim Submission event properties
- Added `crn2` and `crn3` as BPoint Submission event properties

## [0.9.1] - 2020-12-15

### Added

- `encryptedElementIds` to `CP_HCMS` submission event type

## [0.9.0] - 2020-11-24

### Added

- `userToken` to form URLs
- `Forms.decryptUserToken()` and `Forms.encryptUserToken()` functions

## [0.8.0] - 2020-11-17

### Added

- [`setSendingAddress()`](./docs/forms-apps.md#setSendingAddress) function
- [`deleteSendingAddress()`](./docs/forms-apps.md#deleteSendingAddress) function

### Removed

- SPOTTO submission event

## [0.7.6] - 2020-11-12

### Added

- minLength/maxLength props for text & textarea elements
- `isInteger` to `number` element type
- `includeTimestampWatermark` to `camera` element type

## [0.7.5] - 2020-11-05

### Added

- BETWEEN type to conditional logic predicates

## [0.7.4] - 2020-10-15

### Added

- Solution prop to RolePrivilege type
- `uploadAsset` to `Organisations` class

### Fixed

- `form.submissionEvents` allowing `null` and `undefined`

## [0.7.3] - 2020-07-23

### Added

- Conditional execute properties to submission events
- Allowed 'NOW' for date, time and DateTime defaultValues
- Update `Forms-App` docs

## [0.7.2] - 2020-07-09

### Added

- `environmentId` to BPOINT and TRIM submission event configuration

## [0.7.1] - 2020-07-06

### Added

- Publish start and end date
- Added tags for form def
- Types and validation for placeholderValue on form elements
- added `overrideLock` parameter to update and delete form functions
- docs for all available search parameters when searching for forms
- `gatewayId` to `FormSubmissionEventConfiguration`
- `generatePageElement` to `Forms` class

## [0.7.0] - 2020-06-10

### Breaking Changes

- removed `tenant` argument from all classes. This has been replaced by specifying the tenant in the `require()` path. See the [Tenants](./docs/README.md#tenants) documentation for more details.

### Added

- static verifyJWT function in FormsApps Class

## [0.6.1] - 2020-06-03

### Added

- `BPOINT` submission event to form schema
- `CP_HCMS` submission event to form schema
- `SEARCH` and `searchUrl` documentation for Autocomplete elements

### Dependencies

- update [aws-sdk](https://www.npmjs.com/package/aws-sdk) to [2.683.0](https://github.com/aws/aws-sdk-js/releases/tag/v2.683.0) (from [2.673.0](https://github.com/aws/aws-sdk-js/releases/tag/v2.673.0))

- update [uuid](https://www.npmjs.com/package/uuid) to [8.1.0](https://github.com/uuidjs/uuid/blob/master/CHANGELOG.md) (from [8.0.0](https://github.com/uuidjs/uuid/blob/master/CHANGELOG.md))

## [0.6.0] - 2020-05-25

### Added

- Summary Element to Element types
- `slug` property to Forms Apps
- `slug` property to Organisations

## [0.5.0] - 2020-05-14

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

## [0.4.5] - 2020-04-03

### Fixed

- `0.4.4` being published with `--tag beta`

## [0.4.4] - 2020-04-02

### Removed

- Regex for apiId in the form submission

### Added

- `TRIM` submission event to forms schema

## [0.4.3] - 2020-02-26

### Added

- Added [`searchSubmissions()`](./docs/forms#searchSubmissions) function to Form class

## [0.4.2] - 2020-02-13

### Added

- `Files` element
- `priority` as optional parameter to `createJob` function
- `device` property to example of form submission data

## [0.4.1] - 2020-01-30

### Added

- Added [`search()`](./docs/jobs#search) function to Jobs class

## [0.4.0] - 2019-12-18

### Added

- Added form schema validation for `formsAppEnvironmentId` in Forms and FormsApps

### Changed

- element and data lookup configuration

## [0.3.4] - 2019-11-04

### Added

- Added `restrictFileTypes` and `restrictedFileTypes` properties for file element

## [0.3.3] - 2019-09-16

### Added

- Added `SEARCH` options type and `searchUrl` property for autocomplete element

## [0.3.2] - 2019-06-20

### Added

- `isDraft` property to form submission events
- `isDraft` parameter to [`Forms.getSubmissionData()`](./docs/forms.md#getsubmissiondata)
- [`TeamMembers`](./docs/team-members.md) class

## [0.3.1] - 2019-06-18

### Added

- `formsAppId` options to [`Forms.generateFormUrl()`](./docs/forms.md#generateformurl)

## [0.3.0] - 2019-06-07

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

## [0.2.9] - 2019-06-03

### Added

- [`getMyFormsApp()`](./docs/forms-apps.md#getmyformsapp) function
- `injectForms` parameter to `getForm()` function

## [0.2.8] - 2019-05-23

### Added

- ON-4090 # added `form` and `infoPage` element types
- ON-4098 # Strip out unwanted properties from form elements
- [`FormsApps`](./docs/forms-apps.md) class

## [0.2.7] - 2019-05-06

### Added

- ON-4044 # added `validateForm()` function for validating a form schema
- ON-4039 # added `generateFormElement()` function for generating & validating a form element

## [0.2.6] - 2019-03-14

### Added

- `Jobs` class with `createJob()` and `deleteJob()` functions

### Dependencies

- update [aws-sdk](https://www.npmjs.com/package/aws-sdk) to [2.400.0](https://github.com/aws/aws-sdk-js/releases/tag/v2.400.0) (from [2.336.0](https://github.com/aws/aws-sdk-js/releases/tag/v2.336.0))

- update [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) to [8.4.0](https://github.com/auth0/node-jsonwebtoken/blob/master/CHANGELOG.md) (from [8.3.0](https://github.com/auth0/node-jsonwebtoken/blob/master/CHANGELOG.md))

- depend upon [joi](https://www.npmjs.com/package/joi) [14.3.1](https://github.com/hapijs/joi/blob/master/CHANGELOG.md)

## [0.2.5] - 2018-01-14

### Changed

- Changed `generateFormUrl()` function to get hostname via `appId`

## [0.2.4] - 2018-10-24

### Added

- `forms.generateSubmissionDataUrl()` function

## [0.2.3] - 2018-10-17

### Added

- `forms.getForm()` function

## [0.2.2] - 2018-09-25

### Added

- `Organisations` classes
- `Keys` class

## [0.2.1] - 2018-09-04

### Added

- Pre filled data argument to `forms.generateFormUrl()` function

### Fixed

- Path of forms renderer URL to match `/forms/{formId}`

## [0.2.0] - 2018-08-07

### Changed

- `forms.generateFormUrl(formId, externalId)` to return a promise that will resolve with the same value as before

## [0.1.0] - 2018-07-11

### Added

- `isAuthenticated` search parameter to Forms `search()` function
- `name` search parameter to Forms `search()` function

### Removed

- `organisationId` search parameter from Forms `search()` function

### Dependencies

- update [aws-sdk](https://www.npmjs.com/package/aws-sdk) to [2.272.1](https://github.com/aws/aws-sdk-js/releases/tag/v2.272.1) (from [2.251.1](https://github.com/aws/aws-sdk-js/releases/tag/v2.251.1))

- update [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) to [8.3.0](https://github.com/auth0/node-jsonwebtoken/blob/master/CHANGELOG.md) (from [8.2.2](https://github.com/auth0/node-jsonwebtoken/blob/master/CHANGELOG.md))

## [0.0.1] - 2018-06-13

### Initial Release
