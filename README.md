This project is about sharing redux config for both React and React Native using monorepo.

# Setup

```sh
./scripts/setup.sh
```

- Start dummy server

  ```sh
  yarn start-server
  ```

- Start web app

  ```sh
  yarn start-web
  ```

- Start mobile app

  ```sh
  yarn start-mobile
  ```

## Setup for Server

Access to [this](packages/dummy-api/README.md) for more info.

## Setup for React

Access to [this](packages/web/README.md) for more info.

## Setup for React Native

Access to [this](packages/mobile/README.md) for more info.

# Notice

Always run `yarn build-redux-common` or `yarn soft-build-redux-common` after changing the package `redux-common`.
