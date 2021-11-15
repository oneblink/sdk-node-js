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

## Release Process

1. Checkout `master`

   ```
   git checkout master
   ```

1. Get the latest code

   ```
   git pull
   ```

1. Start the release process

   ```
   npm run release
   ```
