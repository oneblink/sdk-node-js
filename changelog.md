# Changelog

## Unreleased

## 0.2.1 (2018-09-04)

### Added

-   Pre filled data argument to `forms.generateFormUrl()` function

### Fixed

-   Path of forms renderer URL to match `/forms/{formId}`

## 0.2.0 (2018-08-07)

### Changed

-   `forms.generateFormUrl(formId, externalId)` to return a promise that will resolve with the same value as before

## 0.1.0 (2018-07-11)

### Added

-   `isAuthenticated` search parameter to Forms `search()` function
-   `name` search parameter to Forms `search()` function

### Removed

-   `organisationId` search parameter from Forms `search()` function

### Dependencies

-   update [aws-sdk](https://www.npmjs.com/package/aws-sdk) to [2.272.1](https://github.com/aws/aws-sdk-js/releases/tag/v2.272.1) (from [2.251.1](https://github.com/aws/aws-sdk-js/releases/tag/v2.251.1))

-   update [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) to [8.3.0](https://github.com/auth0/node-jsonwebtoken/blob/master/CHANGELOG.md) (from [8.2.2](https://github.com/auth0/node-jsonwebtoken/blob/master/CHANGELOG.md))

## 0.0.1 (2018-06-13)

### Initial Release
