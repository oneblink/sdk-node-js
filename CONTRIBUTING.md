# Contributing

## Git Branch Workflow

This project adheres to [GitHub Flow](https://guides.github.com/introduction/flow/).

## Development

### Using Test Host (Not for customers)

To set configuration values (apiOrigin, JWT Issuer) to those matching the test environment, set

```js
process.env.ONEBLINK_SDK_ENVIRONMENT = 'test'
```

before you import the SDK

## Beta Release Process

1. Checkout `master` and get the latest code

   ```
   git checkout master
   ```

1. Get the latest code

   ```
   git pull
   ```

1. Bump the version and create a release commit

   ```
   npm version x.x.x-beta.x --message "[RELEASE] %s"
   ```

1. Push changes to the `master` branch

   ```
   git push
   ```

1. Push new tag

   ```
   git push --tags
   ```

## Production Release Process

1. Checkout `master` and get the latest code

   ```
   git checkout master
   ```

1. Get the latest code

   ```
   git pull
   ```

1. Run CLI `npx package-diff-summary {last-tag}`

1. Copy result (if there is one) under a `### Dependencies` heading in [Changelog](./CHANGELOG.md)

1. Update the [Changelog](./CHANGELOG.md) by adding `## [x.x.x] - YYYY-MM-DD` under `## Unreleased`

1. Stage changes

   ```
   git add -A
   ```

1. Commit changes to the `master` branch

   ```
   git commit -m "[CHANGELOG] x.x.x"
   ```

1. Bump the version and create a release commit

   ```
   npm version x.x.x --message "[RELEASE] %s"
   ```

1. Push changes to the `master` branch

   ```
   git push
   ```

1. Push new tag

   ```
   git push --tags
   ```
