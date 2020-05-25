# Contributing

## Git Branch Workflow

This project adheres to [GitHub Flow](https://guides.github.com/introduction/flow/).

## Development

### Public Class Constructors

The following options are available as well the as the documented ones in each [Class Constructor ](./docs/README.md) to allow you to use test endpoints for local development or end to end testing

| Parameter                   | Required | Type     | Description                                                                               |
| --------------------------- | -------- | -------- | ----------------------------------------------------------------------------------------- |
| `options.oneBlinkAPIOrigin` | No       | `string` | The Origin of the OneBlink API. Should only be used for development and testing purposes. |

## Publishing Releases

## Beta Process

1. Checkout `master` and get the latest code

   ```
   git checkout master && git pull
   ```

1. Bump the version and create a release commit

   ```
   npm version x.x.x-beta.x --message "[RELEASE] %s"
   ```

1. Push changes to the `master` branch

   ```
   git push && git push --tags
   ```

1. Publish changes to npm

   ```
   npm publish --tag beta
   ```

## Production Process

1. Checkout `master` and get the latest code

   ```
   git checkout master && git pull
   ```

1. Run CLI `npx package-diff-summary {last-tag}`

1. Copy result (if there is one) under a _Dependencies_ heading in [Changelog](./CHANGELOG.md)

1. Update the [Changelog](./CHANGELOG.md) by replacing `Unreleased` with `x.x.x (YYYY-MM-DD)`

1. Bump the version and create a release commit

   ```
   npm version x.x.x --message "[RELEASE] %s"
   ```

1. Push changes to the `master` branch

   ```
   git push && git push --tags
   ```

1. Publish changes to npm

   ```
   npm publish
   ```
