# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- `approvalFormsInclusion` not being validated on PDF configs for email events

## [12.2.0] - 2025-09-19

### Added

- `pdfConfigurations` to email submission event validation

## [12.1.0] - 2025-09-15

### Added

- support for `SUBMISSION_TIMESTAMP` and `COMPLETION_TIMESTAMP` in workflow event mappings
- `PAYMENT_DETAIL` to form workflow validation

### Removed

- `path` property to `FormSubmissionAttachment`

### Dependencies

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [8.8.1-beta.3](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md) (from [8.8.0-beta.1](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md))

## [12.0.0] - 2025-08-29

### Changed

- validate that an option attributes length matches conditionallyShowOptionsElementIds length
- **[BREAKING]** `getSendingAddress()` result
- **[BREAKING]** `setSendingAddress()` to optionally allow `emailAddress` and result

### Added

- `requiresAllConditionallyShowOptionsPredicates` to optionSchemas
- `allowAttachmentsDownload` to form validation
- `path` property to `FormSubmissionAttachment`

### Dependencies

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [8.8.0-beta.1](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md) (from [8.7.0-beta.2](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md))

- update [@oneblink/storage](https://www.npmjs.com/package/@oneblink/storage) to [3.2.3-beta.1](https://github.com/oneblink/storage/blob/master/CHANGELOG.md) (from [3.2.1-beta.2](https://github.com/oneblink/storage/blob/master/CHANGELOG.md))

## [11.8.1] - 2025-08-11

- add snapshot properties to `ArcGISWebMapElement`

### Dependencies

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [8.7.0-beta.2](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md) (from [8.6.0-beta.1](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md))

## [11.8.0] - 2025-07-25

### Added

- `GOOD_TO_GO_UPDATE_ASSET` form worklow event
- `sendNotificationEmailOptionDefaultUnchecked` to `approvalConfiguration`

### Dependencies

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [8.6.0-beta.1](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md) (from [8.5.1-beta.1](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md))

- update [@oneblink/storage](https://www.npmjs.com/package/@oneblink/storage) to [3.2.1-beta.2](https://github.com/oneblink/storage/blob/master/CHANGELOG.md) (from [3.2.0-beta.4](https://github.com/oneblink/storage/blob/master/CHANGELOG.md))

## [11.7.0] - 2025-07-10

### Added

- `restrictFileSize` and `maxFilesSize` to `FilesElement`
- `lookupButton` form element to validation
- `visible` to `ArcGISWebMapElement.defaultValue.layers`
- `measurementDimensionsEnabled` to `ArcGISWebMapElement`

### Dependencies

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [8.5.1-beta.1](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md) (from [8.5.0-beta.1](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md))

- update [@oneblink/storage](https://www.npmjs.com/package/@oneblink/storage) to [3.2.0-beta.4](https://github.com/oneblink/storage/blob/master/CHANGELOG.md) (from [3.1.0-beta.1](https://github.com/oneblink/storage/blob/master/CHANGELOG.md))

## [11.6.0] - 2025-07-01

### Added

- `ELEMENT_VALUE:` to `emailSchema`
- `readOnly` to `FormElement`

### Dependencies

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [8.5.0-beta.1](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md) (from [8.4.0-beta.2](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md))

- update [@oneblink/storage](https://www.npmjs.com/package/@oneblink/storage) to [3.1.0-beta.1](https://github.com/oneblink/storage/blob/master/CHANGELOG.md) (from [3.0.0-beta.1](https://github.com/oneblink/storage/blob/master/CHANGELOG.md))

## [11.5.0] - 2025-06-16

### Added

- `description` to `ArcGISWebMapElement.allowedDrawingTools.graphicAttributeOptions`
- `generateBearerToken()` function to `OneBlinkAPI` class
- `id` to `ArcGISWebMapElement.defaultValue.layers`

## [11.4.0] - 2025-06-03

### Added

`requiresConfirmation` to Email Element
`displayAsCheckbox` to `BooleanElement`
`displayAsCurrency` to `NumberElement`

### Dependencies

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [8.4.0-beta.2](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md) (from [8.3.0-beta.2](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md))

## [11.3.1] - 2025-05-22

### Dependencies

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [8.3.0-beta.2](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md) (from [8.2.0-beta.2](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md))

## [11.2.1] - 2025-05-06

### Dependencies

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [8.2.0-beta.2](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md) (from [8.1.0-beta.5](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md))

## [11.2.0] - 2025-04-30

### Added

- `pointCadastralParcel` form element type

### Changed

- `arcGISWebMap` element schema

### Dependencies

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [8.1.0-beta.5](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md) (from [8.0.0-beta.3](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md))

## [11.1.0] - 2025-04-04

### Added

- `sharepointIntegrationEntraApplicationId` to form validation
- custom pdf read only validation
- Civic Rec Workflow Event validation
- `isDisplayingAddressInformation` to `pointAddress` form element

### Dependencies

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [8.0.0-beta.3](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md) (from [7.4.0-beta.3](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md))

## [11.0.1] - 2025-03-19

### Fixed

- `Forms.getForm()` using legacy endpoint.

## [11.0.0] - 2025-03-11

### Added

- custom pdf validation to form

### Changed

- **[BREAKING]** `Forms.validateFormEvent()` arguments. See diff below to migrate:
  ```diff
  - Forms.validateFormEvent(formElements, workflowEvent)
  + Forms.validateFormEvent(workflowEvent, {
  +   formElements,
  +   customPDFs: []
  + })
  ```

### Fixed

- form workflow event allowing `undefined` for `configuration.mapping` property

### Dependencies

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [7.4.0-beta.3](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md) (from [7.3.2-beta.1](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md))

## [10.5.1] - 2025-02-20

### Added

- 10`SHAREPOINT_CREATE_LIST_ITEM` and `SHAREPOINT_STORE_FILES` form workflow event to validation

## [10.5.0] - 2025-01-29

### Added

- `layout` property to `RepeatableSetElement`

## [10.4.0] - 2025-01-22

### Added

- `isArchived` to `Form`

## [10.3.1] - 2025-01-12

### Added

- `styles` to `FormsAppEnvironment`

### Dependencies

- update [@oneblink/storage](https://www.npmjs.com/package/@oneblink/storage) to [3.0.0-beta.1](https://github.com/oneblink/storage/blob/master/CHANGELOG.md) (from [2.1.2-beta.3](https://github.com/oneblink/storage/blob/master/CHANGELOG.md))

## [10.3.0] - 2024-12-11

### Removed

- legacy nylas

## [10.2.0] - 2024-12-09

### Added

- `imageUrl` to options
- `disableAutosave` to Form schema

### Dependencies

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [7.3.2-beta.1](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md) (from [7.3.1-beta.1](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md))

- update [@oneblink/storage](https://www.npmjs.com/package/@oneblink/storage) to [2.1.2-beta.3](https://github.com/oneblink/storage/blob/master/CHANGELOG.md) (from [2.1.1-beta.1](https://github.com/oneblink/storage/blob/master/CHANGELOG.md))

## [10.1.0] - 2024-11-27

## [10.0.0] - 2024-11-13

### Added

- `NYLAS` form scheduling workflow event

### Removed

- **[BREAKING]** `FormsApps.updateStyles()` The `styles` property can be set using `FormsApps.createFormsApp()` and updated using `FormsApps.updateFormsApp()`

### Dependencies

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [7.3.1-beta.1](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md) (from [7.3.0-beta.2](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md))

## [9.2.0] - 2024-10-29

### Added

- `sequentialNumber` to `receiptComponents` type
- `startingSequentialNumber` to `externalIdGeneration` configuration

## [9.1.0] - 2024-10-09

### Added

- `enableSubmission` to Form schema

## [9.0.1] - 2024-09-30

### Fixed

- form slug validation allowing a number as the first character

## [9.0.0] - 2024-09-25

### Added

- `autocompleteAttributes` to form elements

### Removed

- **[BREAKING]** `TeamMembers` class

### Dependencies

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [7.3.0-beta.2](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md) (from [7.1.0-beta.1](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md))

## [8.1.1] - 2024-09-03

### Added

- `slug` to form

### Dependencies

- update [@aws-sdk/client-sesv2](https://www.npmjs.com/package/@aws-sdk/client-sesv2) to [3.637.0](https://github.com/aws/aws-sdk-js-v3/releases/tag/v3.637.0) (from [3.606.0](https://github.com/aws/aws-sdk-js-v3/releases/tag/v3.606.0))

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [7.1.0-beta.1](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md) (from [7.0.0-beta.1](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md))

- update [@oneblink/storage](https://www.npmjs.com/package/@oneblink/storage) to [2.1.1-beta.1](https://github.com/oneblink/storage/blob/master/CHANGELOG.md) (from [2.1.0-beta.3](https://github.com/oneblink/storage/blob/master/CHANGELOG.md))

## [8.1.0] - 2024-08-13

### Added

-`isHidden` prop to all elements

### Removed

- validation of date and location form element references

### Dependencies

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [7.0.0-beta.1](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md) (from [6.3.1-beta.1](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md))

## [8.0.0] - 2024-08-07

### Removed

- **[BREAKING]** `Forms.encryptUserToken`
- **[BREAKING]** `Forms.decryptUserToken`

### Added

- Permissions required for functions

### Changed

- allow `postSubmissionReceipt` if `postSubmissionAction` is `URL`
- `generateFormUrl` function to include the `username` property into the JWT payload

### Fixed

- `isSubmitted` not being sent when searching for jobs if passing `false`

### Dependencies

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [6.3.1-beta.1](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md) (from [6.3.0-beta.2](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md))

## [7.2.0] - 2024-07-10

### Added

- `canCollapseFromBottom` to section element

### Changed

- form submissions and draft downloads to use storage endpoints

### Dependencies

- no longer depend upon [@aws-sdk/client-s3](https://www.npmjs.com/package/@aws-sdk/client-s3)

- update [@aws-sdk/client-sesv2](https://www.npmjs.com/package/@aws-sdk/client-sesv2) to [3.606.0](https://github.com/aws/aws-sdk-js-v3/blob/master/CHANGELOG.md) (from [3.521.0](https://github.com/aws/aws-sdk-js-v3/blob/master/CHANGELOG.md))

- update [@oneblink/storage](https://www.npmjs.com/package/@oneblink/storage) to [2.1.0-beta.3](https://github.com/oneblink/storage/blob/master/CHANGELOG.md) (from [2.0.0-beta.2](https://github.com/oneblink/storage/blob/master/CHANGELOG.md))

## [7.1.3] - 2024-07-01

### Fixed

- Removed ALLOW_TAG_PREFIX from release workflow

## [7.1.0] - 2024-07-01

### Added

- `allowGeoscapeAddresses` to form
- `CP_INTEGRATION_HUB_WEBHOOK` workflow event

### Changed

- `secret` to `organisationManagedSecretId` in forms definition validation

## [7.0.0] - 2024-06-21

### Added

- `pointAddressEnvironmentId` to form
- `ADDRESS_PROPERTY` to conditional predicates schema

### Removed

- **[BREAKING]** support for NodeJS 16

### Dependencies

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [6.3.0-beta.2](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md) (from [6.2.0-beta.5](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md))

## [6.6.0] - 2024-06-13

### Added

- `excludedAttachmentElementIds` to email and PDF events
- `executeWorkflowEvent` to Forms class

## [6.5.0] - 2024-06-04

### Added

- `googleAddress` element validation

### Dependencies

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [6.2.0-beta.5](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md) (from [6.1.0-beta.2](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md))

## [6.4.0] - 2024-05-20

### Added

- support for `approvalForms` in `migrateForm`

### Dependencies

- update [@oneblink/storage](https://www.npmjs.com/package/@oneblink/storage) to [2.0.0-beta.2](https://github.com/oneblink/storage/blob/master/CHANGELOG.md) (from [1.0.0-beta.13](https://github.com/oneblink/storage/blob/master/CHANGELOG.md))

## [6.3.0] - 2024-05-10

### Added

- `includeCalendarBookingInPdf` config to be added to `PDF` events

## [6.2.0] - 2024-04-30

### Added

- `FORM` type to conditional predicates schema
- LocationElement validation for `showStreetAddress` and `formattedAddressElementId`

### Removed

- unique elementId constraint from form event and approval step validation

### Dependencies

- no longer depend upon [@aws-sdk/lib-storage](https://www.npmjs.com/package/@aws-sdk/lib-storage)

- no longer depend upon [@aws-sdk/s3-request-presigner](https://www.npmjs.com/package/@aws-sdk/s3-request-presigner)

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [6.1.0-beta.2](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md) (from [6.0.1-beta.2](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md))

- depend upon [@oneblink/storage](https://www.npmjs.com/package/@oneblink/storage) [1.0.0-beta.13](https://github.com/oneblink/storage/blob/master/CHANGELOG.md)

## [6.1.1] - 2024-04-10

### Added

- `pendingApprovalsReminder` to form

## [6.1.0] - 2024-03-14

### Added

- `notificationElementId` to HCMS form workflow event
- `decorativeImage` to image element validation

### Dependencies

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [6.0.1-beta.2](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md) (from [6.0.0-beta.3](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md))

## [6.0.1] - 2024-03-06

### Dependencies

- update [@aws-sdk/client-s3](https://www.npmjs.com/package/@aws-sdk/client-s3) to [3.521.0](https://github.com/aws/aws-sdk-js-v3/blob/master/CHANGELOG.md) (from [3.504.0](https://github.com/aws/aws-sdk-js-v3/blob/master/CHANGELOG.md))

- update [@aws-sdk/client-sesv2](https://www.npmjs.com/package/@aws-sdk/client-sesv2) to [3.521.0](https://github.com/aws/aws-sdk-js-v3/blob/master/CHANGELOG.md) (from [3.504.0](https://github.com/aws/aws-sdk-js-v3/blob/master/CHANGELOG.md))

- update [@aws-sdk/lib-storage](https://www.npmjs.com/package/@aws-sdk/lib-storage) to [3.521.0](https://github.com/aws/aws-sdk-js-v3/blob/master/CHANGELOG.md) (from [3.504.0](https://github.com/aws/aws-sdk-js-v3/blob/master/CHANGELOG.md))

- update [@aws-sdk/s3-request-presigner](https://www.npmjs.com/package/@aws-sdk/s3-request-presigner) to [3.521.0](https://github.com/aws/aws-sdk-js-v3/blob/master/CHANGELOG.md) (from [3.504.0](https://github.com/aws/aws-sdk-js-v3/blob/master/CHANGELOG.md))

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [6.0.0-beta.3](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md) (from [5.4.0-beta.1](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md))

- update [joi](https://www.npmjs.com/package/joi) to 17.12.2 (from 17.12.1)

- update [nodemailer](https://www.npmjs.com/package/nodemailer) to [6.9.10](https://github.com/nodemailer/nodemailer/blob/master/CHANGELOG.md) (from [6.9.9](https://github.com/nodemailer/nodemailer/blob/master/CHANGELOG.md))

## [6.0.0] - 2024-02-21

### Added

- `Forms.validateEndpointConfiguration()`

### Changed

- **[BREAKING]** `Forms.validateForm()` and `Forms.validateFormEvent()` to return an object with a result or an error instead of throwing errors
- **[BREAKING]** `Forms.validateForm()` to return a `NewForm` (a `Form` without the `id`, `createdAt` and `updatedAt` properties)

### Removed

- **[BREAKING]** `Forms.validateApiRequest()`
- **[BREAKING]** `Forms.validateConditionalPredicates()`

## [5.5.0] - 2024-02-18

### Added

- `arcGISWebMap` form element

### Dependencies

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [5.4.0-beta.1](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md) (from [5.3.0](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md))

## [5.4.0] - 2024-02-07

### Added

- `isRetryable` to form workflow events

### Dependencies

- update [@aws-sdk/client-s3](https://www.npmjs.com/package/@aws-sdk/client-s3) to [3.504.0](https://github.com/aws/aws-sdk-js-v3/blob/master/CHANGELOG.md) (from [3.474.0](https://github.com/aws/aws-sdk-js-v3/blob/master/CHANGELOG.md))

- update [@aws-sdk/client-sesv2](https://www.npmjs.com/package/@aws-sdk/client-sesv2) to [3.504.0](https://github.com/aws/aws-sdk-js-v3/blob/master/CHANGELOG.md) (from [3.474.0](https://github.com/aws/aws-sdk-js-v3/blob/master/CHANGELOG.md))

- update [@aws-sdk/lib-storage](https://www.npmjs.com/package/@aws-sdk/lib-storage) to [3.504.0](https://github.com/aws/aws-sdk-js-v3/blob/master/CHANGELOG.md) (from [3.474.0](https://github.com/aws/aws-sdk-js-v3/blob/master/CHANGELOG.md))

- update [@aws-sdk/s3-request-presigner](https://www.npmjs.com/package/@aws-sdk/s3-request-presigner) to [3.504.0](https://github.com/aws/aws-sdk-js-v3/blob/master/CHANGELOG.md) (from [3.474.0](https://github.com/aws/aws-sdk-js-v3/blob/master/CHANGELOG.md))

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [5.3.0](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md) (from [5.2.0-beta.2](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md))

- update [joi](https://www.npmjs.com/package/joi) to 17.12.1 (from 17.11.0)

- update [nodemailer](https://www.npmjs.com/package/nodemailer) to [6.9.9](https://github.com/nodemailer/nodemailer/blob/master/CHANGELOG.md) (from [6.9.7](https://github.com/nodemailer/nodemailer/blob/master/CHANGELOG.md))

## [5.3.0] - 2024-01-30

### Added

- `WESTPAC_QUICK_STREAM` payment event to form schema

## [5.2.0] - 2024-01-18

### Updated

- PDF config validation to include PDF Page size
- Form validation to include `customCssClasses` prop
- `forms.getSubmissionData` to return undefined when an `AccessDenied` error is thrown

### Added

- `nswAPILiquorLicence` form element
- `uploadEmailAttachment` to `Forms` class
- `emailAttachmentsEndpoint` to email form workflow events validation

### Dependencies

- update [@aws-sdk/client-s3](https://www.npmjs.com/package/@aws-sdk/client-s3) to [3.474.0](https://github.com/aws/aws-sdk-js-v3/releases/tag/v3.474.0) (from [3.433.0](https://github.com/aws/aws-sdk-js-v3/releases/tag/v3.433.0))

- update [@aws-sdk/client-sesv2](https://www.npmjs.com/package/@aws-sdk/client-sesv2) to [3.474.0](https://github.com/aws/aws-sdk-js-v3/releases/tag/v3.474.0) (from [3.433.0](https://github.com/aws/aws-sdk-js-v3/releases/tag/v3.433.0))

- update [@aws-sdk/lib-storage](https://www.npmjs.com/package/@aws-sdk/lib-storage) to [3.474.0](https://github.com/aws/aws-sdk-js-v3/releases/tag/v3.474.0) (from [3.433.0](https://github.com/aws/aws-sdk-js-v3/releases/tag/v3.433.0))

- update [@aws-sdk/s3-request-presigner](https://www.npmjs.com/package/@aws-sdk/s3-request-presigner) to [3.474.0](https://github.com/aws/aws-sdk-js-v3/releases/tag/v3.474.0) (from [3.433.0](https://github.com/aws/aws-sdk-js-v3/releases/tag/v3.433.0))

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [5.2.0-beta.2](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md) (from [3.1.0-beta.4](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md))

- update [joi](https://www.npmjs.com/package/joi) to 17.11.0 (from 17.9.2)

- update [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) to [9.0.2](https://github.com/auth0/node-jsonwebtoken/blob/master/CHANGELOG.md) (from [9.0.0](https://github.com/auth0/node-jsonwebtoken/blob/master/CHANGELOG.md))

- update [jwks-rsa](https://www.npmjs.com/package/jwks-rsa) to [3.1.0](https://github.com/auth0/node-jwks-rsa/releases/tag/v3.1.0) (from [3.0.1](https://github.com/auth0/node-jwks-rsa/releases/tag/v3.0.1))

- update [node-fetch](https://www.npmjs.com/package/node-fetch) to [2.7.0](https://github.com/node-fetch/node-fetch/releases/tag/v2.7.0) (from [2.6.11](https://github.com/node-fetch/node-fetch/releases/tag/v2.6.11))

- update [nodemailer](https://www.npmjs.com/package/nodemailer) to [6.9.7](https://github.com/nodemailer/nodemailer/releases/tag/v6.9.7) (from [6.9.3](https://github.com/nodemailer/nodemailer/blob/master/CHANGELOG.md))

- update [uuid](https://www.npmjs.com/package/uuid) to [9.0.1](https://github.com/uuidjs/uuid/blob/master/CHANGELOG.md) (from [9.0.0](https://github.com/uuidjs/uuid/blob/master/CHANGELOG.md))

## [5.1.3] - 2023-12-12

### Fixed

- `externalId` not being used as search param in `searchSubmissions()`

## [5.1.2] - 2023-11-29

### Added

- URI Encoding for Asset Upload

## [5.1.1] - 2023-11-21

### Fixed

- public file URL for S3 assets

## [5.1.0] - 2023-11-20

### Added

- `continueWithAutosave` to forms validation
- `generatePdfFromSubmissionData()` function to `PDF` class
- `externalId` as option for `searchSubmissions()`

## [5.0.1] - 2023-11-01

## [5.0.0] - 2023-10-25

### Changed

- **[BREAKING]** `sendEmail()` result

### Dependencies

- depend upon [@aws-sdk/client-s3](https://www.npmjs.com/package/@aws-sdk/client-s3) [3.433.0](https://github.com/aws/aws-sdk-js-v3/releases/tag/v3.433.0)

- depend upon [@aws-sdk/client-sesv2](https://www.npmjs.com/package/@aws-sdk/client-sesv2) [3.433.0](https://github.com/aws/aws-sdk-js-v3/releases/tag/v3.433.0)

- depend upon [@aws-sdk/lib-storage](https://www.npmjs.com/package/@aws-sdk/lib-storage) [3.433.0](https://github.com/aws/aws-sdk-js-v3/releases/tag/v3.433.0)

- depend upon [@aws-sdk/s3-request-presigner](https://www.npmjs.com/package/@aws-sdk/s3-request-presigner) [3.433.0](https://github.com/aws/aws-sdk-js-v3/releases/tag/v3.433.0)

## [4.1.0] - 2023-10-23

### Added

- `REPEATABLESET` type to conditional predicates

## [4.0.1] - 2023-10-15

### Added

- CI job for building docs

## [4.0.0] - 2023-08-17

### Removed

- **[BREAKING]** `definition` from `DataManager.searchRecords()` result

## [3.5.0] - 2023-08-10

### Added

- `submissionTitle` to `Form` type
- `submissionTitle` to `forms.searchSubmissions()`

### Removed

- legacy receipt generation and personalisation code

## [3.4.0] - 2023-07-26

### Added

- `runLookupOnClear` to `FormElementLookup` type

## [3.3.1] - 2023-07-12

### Fixed

- `submissionId` typed as `number` instead of `string`

## [3.3.0] - 2023-07-12

### Added

- `generateWorkflowAttachmentLink()` function to `Forms` class

## [3.2.0] - 2023-07-03

### Added

- `FormElementLookups` class
- `FormElementLists` class
- `lookupButton` prop to form elements

### Fixed

- summary form element validation not allowing referenced elements from outside the scope of the summary element when using repeatable sets

### Dependencies

- update [joi](https://www.npmjs.com/package/joi) to 17.9.2 (from 17.8.3)

- update [node-fetch](https://www.npmjs.com/package/node-fetch) to [2.6.11](https://github.com/node-fetch/node-fetch/releases/tag/v2.6.11) (from [2.6.9](https://github.com/node-fetch/node-fetch/releases/tag/v2.6.9))

- update [nodemailer](https://www.npmjs.com/package/nodemailer) to [6.9.3](https://github.com/nodemailer/nodemailer/blob/master/CHANGELOG.md) (from [6.9.1](https://github.com/nodemailer/nodemailer/blob/master/CHANGELOG.md))

## [3.1.0] - 2023-06-23

### Added

- `defaultPreventPaymentOnClarificationRequest` to form
- `NSW_GOV_PAY` payment event added to validation

### Dependencies

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [3.1.0-beta.4](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md) (from [3.0.0-beta.1](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md))

## [3.0.0] - 2023-06-05

### Removed

- **[BREAKING]** support for NodeJS 14

### Changed

- email validation now allows `{USER:email}`

### Added

- `includeExternalIdInPdf` to `pdfSubmissionEventConfiguration`

### Dependencies

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [3.0.0-beta.1](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md) (from [0.4.6](https://github.com/oneblink/sdk-core-js/releases/tag/v0.4.6))

## [2.8.0] - 2023-05-26

### Added

- `searchQuerystringParameter` to `autocomplete` form element
- `externalIdGenerationOnSubmit` and `personalisation` to form validation

## [2.7.0] - 2023-05-22

### Added

- nested form elements to Freshdesk ticket creation form event

## [2.6.0] - 2023-05-12

### Added

- `unpublishedUserMessage` property to form validation

## [2.5.0] - 2023-05-02

### Added

- `displayAlways` to options sets option attribute for use with Autocomplete elements
- `tags` and `categories` to CivicPlus HCMS form workflow event

## [2.4.0] - 2023-04-27

### Added

- Element ID validation for min and max entry properties on 'repeatableSet` elements

## [2.3.1] - 2023-04-20

### Added

- `@microsoft/eslint-plugin-sdl` eslint plugin
- `SUBMISSION_ID` and `EXTERNAL_ID` to FreshDesk mapping in form workflow events

## [2.3.0] - 2023-04-14

### Added

- elementId validation for date/datetime elements

### Changed

- validate elements inside repeatable sets

## [2.2.0] - 2023-04-02

### Changed

- remove requirement for conditionalPredicates to be unique on elementId
- `excludedCSSClasses` to `pdfSubmissionEventConfiguration`

## [2.1.0] - 2023-03-26

### Added

- `RECEIPT_ID` option to external id generation for forms
- `postSubmissionReceipt` property to form validation
- `hintPosition` property to element validation
- `toEmail`, `ccEmail` and `bccEmail` to `emailSubmissionEventConfiguration`
- html string validation to form element hint

### Changed

- Deprecated `emailSubmissionEventConfiguration.email`

## [2.0.2] - 2023-03-13

### Added

- `formApprovalFlowInstanceId` to `Approvals.searchFormSubmissionAdministrationApprovals()`
- `requiredAll` to checkbox form element

### Dependencies

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [0.4.6](https://github.com/oneblink/sdk-core-js/releases/tag/v0.4.6) (from [0.4.4](https://github.com/oneblink/sdk-core-js/releases/tag/v0.4.4))

- update [joi](https://www.npmjs.com/package/joi) to 17.8.3 (from 17.7.0)

- update [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) to [9.0.0](https://github.com/auth0/node-jsonwebtoken/blob/master/CHANGELOG.md) (from [8.5.1](https://github.com/auth0/node-jsonwebtoken/blob/master/CHANGELOG.md))

- update [jwks-rsa](https://www.npmjs.com/package/jwks-rsa) to [3.0.1](https://github.com/auth0/node-jwks-rsa/releases/tag/v3.0.1) (from [3.0.0](https://github.com/auth0/node-jwks-rsa/releases/tag/v3.0.0))

- update [node-fetch](https://www.npmjs.com/package/node-fetch) to [2.6.9](https://github.com/node-fetch/node-fetch/releases/tag/v2.6.9) (from [2.6.7](https://github.com/node-fetch/node-fetch/releases/tag/v2.6.7))

- update [nodemailer](https://www.npmjs.com/package/nodemailer) to [6.9.1](https://github.com/nodemailer/nodemailer/blob/master/CHANGELOG.md) (from [6.8.0](https://github.com/nodemailer/nodemailer/blob/master/CHANGELOG.md))

## [2.0.1] - 2023-03-03

### Added

- `'oneblink:access'` claim to JWT for signed URL to submit an authenticated form

## [2.0.0] - 2023-02-22

### Added

- `disallowApprovingWhenAwaitingClarification` to `approvalConfiguration`

### Updated

- **BREAKING** `searchForms` to use `/v2/forms` (see [migration guide](./README.md#migrating-to-v2))

## [1.0.2] - 2023-02-16

### Removed

`isInfoPage` prop from Forms

### Updated

- Validation for TRIM to optionally require `location` and `actionDefinition`

## [1.0.1] - 2022-12-12

### Added

- timezone to Organisation

## [1.0.0] - 2022-11-14

### Changed

- **BREAKING** drop support for NodeJS 12
- `FormsApps.verifyJWT()` to use cognito directly

### Removed

- `(new FormsApps()).verifyJWT()` instance function

### Dependencies

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [0.4.4](https://github.com/oneblink/sdk-core-js/releases/tag/v0.4.4) (from [0.4.4-beta.1](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md))

- update [joi](https://www.npmjs.com/package/joi) to 17.7.0 (from 17.6.0)

- update [nodemailer](https://www.npmjs.com/package/nodemailer) to [6.8.0](https://github.com/nodemailer/nodemailer/blob/master/CHANGELOG.md) (from [6.7.7](https://github.com/nodemailer/nodemailer/blob/master/CHANGELOG.md))

- update [uuid](https://www.npmjs.com/package/uuid) to [9.0.0](https://github.com/uuidjs/uuid/blob/master/CHANGELOG.md) (from [8.3.2](https://github.com/uuidjs/uuid/blob/master/CHANGELOG.md))

- depend upon [jwks-rsa](https://www.npmjs.com/package/jwks-rsa) [3.0.0](https://github.com/auth0/node-jwks-rsa/releases/tag/v3.0.0)

## [0.19.17] - 2022-11-08

### Changed

- verifyJWT to call API instead of using cognito

### Dependencies

- no longer depend upon [jwks-rsa](https://www.npmjs.com/package/jwks-rsa)

## [0.19.16] - 2022-11-02

### Added

- `getSubmissionAttachmentMeta` to `Forms` class

## [0.19.15] - 2022-10-26

### Changed

- test environment domains to `.test.`

## [0.19.14] - 2022-10-19

### Added

- form events and post submission actions to exports

## [0.19.13] - 2022-09-27

### Changed

- Preset Response Keys to be unique

### Added

- `autoDenyAfterClarificationRequest` to `approvalConfiguration` on form validation

## [0.19.12] - 2022-09-13

### Added

- `secret` validation to `serverValidation` prop on form
- `isValid` property to `searchSubmissions` params
- `approvalConfiguration` property to `Form`
- `DataManager` class

### Dependencies

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [0.4.4-beta.1](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md) (from [0.4.2](https://github.com/oneblink/sdk-core-js/releases/tag/v0.4.2))

## [0.19.11] - 2022-08-28

### Changed

- form element validation to convert legacy storage type to private

## [0.19.10] - 2022-08-16

### Added

- `meta` property to all Form Elements
- `customCssClasses` to form element validation
- `requireMessage` to form element validation
- `label` to form workflow event validation
- `POWER_AUTOMATE_FLOW` workflow event

### Dependencies

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [0.4.2](https://github.com/oneblink/sdk-core-js/releases/tag/v0.4.2) (from [0.4.1-beta.5](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md))

- update [nodemailer](https://www.npmjs.com/package/nodemailer) to [6.7.7](https://github.com/nodemailer/nodemailer/blob/master/CHANGELOG.md) (from [6.7.5](https://github.com/nodemailer/nodemailer/blob/master/CHANGELOG.md))

## [0.19.9] - 2022-07-29

### Added

- `Forms.validateFormEvent` function to validate form events
- `formSubmissionWorkflowEvents` and `formSubmissionSchedulingBooking` to result from `Forms.getFormSubmissionMeta()`

## [0.19.8] - 2022-06-29

### Added

- PDF configuration options to allow appropriate submission events, including the new configuration `includePaymentInPdf`

### Fixed

- `approvals.getFormSubmissionApproval()` docs

## [0.19.7] - 2022-06-17

### Added

- `freshdeskDependentField` form element

### Dependencies

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [0.4.1-beta.5](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md) (from [0.4.0](https://github.com/oneblink/sdk-core-js/releases/tag/v0.4.0))

## [0.19.6] - 2022-06-09

### Changed

- email templates to cater for multiple environments
- PDF origin to API origin

### Dependencies

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [0.4.0](https://github.com/oneblink/sdk-core-js/releases/tag/v0.4.0) (from [0.4.0-beta.2](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md))

- update [jwks-rsa](https://www.npmjs.com/package/jwks-rsa) to [2.1.4](https://github.com/auth0/node-jwks-rsa/releases/tag/v2.1.4) (from [2.0.5](https://github.com/auth0/node-jwks-rsa/releases/tag/v2.0.5))

- update [node-fetch](https://www.npmjs.com/package/node-fetch) to [2.6.7](https://github.com/node-fetch/node-fetch/releases/tag/v2.6.7) (from 2.6.5)

- update [nodemailer](https://www.npmjs.com/package/nodemailer) to [6.7.5](https://github.com/nodemailer/nodemailer/blob/master/CHANGELOG.md) (from [6.7.3](https://github.com/nodemailer/nodemailer/blob/master/CHANGELOG.md))

## [0.19.5] - 2022-05-31

### Added

- `formSubmissionPayments` to result from `Forms.getFormSubmissionMeta()`

## [0.19.4] - 2022-05-24

### Changed

- `formSubmissionmeta` type renamed to `formSubmissionMeta`

## [0.19.3] - 2022-05-20

## [0.19.2] - 2022-05-10

### Added

- `FRESHDESK_ADD_NOTE_TO_TICKET` to form validation

### Changed

- Element validation to trim whitespace on name and option set value

## [0.19.1] - 2022-04-19

### Added

- `compareWith` property to Conditional Predicates

### Dependencies

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [0.4.0-beta.2](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md) (from [0.3.3-beta.1](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md))

- update [joi](https://www.npmjs.com/package/joi) to 17.6.0 (from 17.4.2)

- update [jwks-rsa](https://www.npmjs.com/package/jwks-rsa) to [2.0.5](https://github.com/auth0/node-jwks-rsa/releases/tag/v2.0.5) (from [2.0.4](https://github.com/auth0/node-jwks-rsa/releases/tag/v2.0.4))

- update [nodemailer](https://www.npmjs.com/package/nodemailer) to [6.7.3](https://github.com/nodemailer/nodemailer/blob/master/CHANGELOG.md) (from [6.6.5](https://github.com/nodemailer/nodemailer/blob/master/CHANGELOG.md))

## [0.19.0] - 2022-03-31

### Breaking Changes

- `FormsApps.setSendingAddress()` now returns the `FormsAppSendingAddressResponse` type instead of the `FormsAppSendingAddress`.

### Added

- `FormsApps.getSendingAddress()`

## [0.18.10] - 2022-03-15

### Added

- `clarificationRequestEmailTemplateId` to `ApprovalSteps`

### Changed

- move `aws-sdk` from dependencies to peerDependencies

### Dependencies

- no longer depend upon [aws-sdk](https://www.npmjs.com/package/aws-sdk)

## [0.18.9] - 2022-03-02

### Fixed

- `Forms.createForm()` no longer requires `createdAt` and `updatedAt` properties

## [0.18.8] - 2022-01-24

### Added

- `createSubmissionAttachment` now returns `uploadedAt`

### Changed

- Switch migrateForm() param type to `EnvironmentTypes.FormMigrationData` and now return the migrated form
- `contentDisposition` to use SDK-Core function instead

### Dependencies

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [0.3.3-beta.1](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md) (from [0.2.4-beta.2](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md))

- no longer depend upon [content-disposition](https://www.npmjs.com/package/content-disposition)

## [0.18.7] - 2022-01-19

### Added

- `approvalFormsInclusion` property to configuration for approval events that generate a PDF
- `approvalFormId` to approvalSteps
- `Forms.getFormSubmissionMeta()` method

## [0.18.6] - 2021-12-23

### Added

- `migrateForm` function to Forms

## [0.18.5] - 2021-12-21

### Changed

- `submissionEvents` in to `formEvents`.

### Added

- `approvalSteps` to form definition

## [0.18.4] - 2021-12-09

### Added

- ABN Element Validation

## [0.18.3] - 2021-12-02

### Added

- submission event for Freshdesk ticket creation
- `FRESHDESK_FIELD` options type for form elements

## [0.18.2] - 2021-11-24

### Changed

- `createFormsApp` type to omit `styles`

### Added

- Submission Event for only emails

### Updated

- File Elements to disallow extensionless files

## [0.18.1] - 2021-11-18

### Added

- hint and conditional logic to BSB element

## [0.18.0] - 2021-11-15

### Added

- `EmailTemplates` class

### Dependencies

- update [@oneblink/sdk-core](https://www.npmjs.com/package/@oneblink/sdk-core) to [0.2.4-beta.2](https://github.com/oneblink/sdk-core-js/blob/master/CHANGELOG.md) (from [0.1.3](https://github.com/oneblink/sdk-core-js/releases/tag/v0.1.3))

## [0.17.0] - 2021-11-11

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
