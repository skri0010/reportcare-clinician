// TO BE UPDATED

# Packages

ClinicianShared

This document serves to give detailed info regarding how packages were installed

## Usage of Peer Dependencies

A peer dependency is a dependency that is expected to be installed by users of this package. This could include packages such as `react` and `react-native`. Notice in `package.json`, most of our dependencies are in `peerDependencies`. This is to ensure we do not accidentally install duplicate packages.

Users (ClinicianMobile and ClinicianDesktop) should include

> `"ClinicianShared": "file:<directory of shared repository>",`

## [Async Storage](https://react-native-async-storage.github.io/async-storage/docs/install/) (react-native-async-storage/async-storage)

This packages allows us to access an asynchronous, unencrypted, persistent, key-value storage system for React Native. Following the [guide](https://react-native-async-storage.github.io/async-storage/docs/install/),

- Android: Autolink (no additional steps)

- iOS: To be updated

- Windows: Autolink (no additional steps)

- MacOS: [Manual Linking](https://react-native-async-storage.github.io/async-storage/docs/link/)

## [AWS Amplify](https://www.npmjs.com/package/aws-amplify) (aws-amplify)

This package allows us to gain access to AWS Amplify which is a wide range of tools for application development.

For [authentication](https://docs.amplify.aws/lib/auth/getting-started/q/platform/js#create-authentication-service), the following packages are peer dependencies

    "@react-native-async-storage/async-storage"
    "@react-native-community/netinfo"
    "@react-native-async-storage/async-storage"

## [Icon Packs](https://www.npmjs.com/package/react-native-vector-icons) (react-native-vector-icons)

This package allows use to import a wide variety of icons. It is automatically linked.
Following the [guide](https://www.npmjs.com/package/react-native-vector-icons)

- [Android](https://www.npmjs.com/package/react-native-vector-icons#android): Option: Manually

- iOS: To be updated

- [Windows](https://www.npmjs.com/package/react-native-vector-icons#windows-via-react-native-windows): Windows via react-native-windows

- MacOS: To be updated
