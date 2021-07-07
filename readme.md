# Reportcare Clinician Web

## Getting started

1. Clone this repository
   > $ git clone `<Codecommit Link`>
2. In VSC terminal, install packages in `packages.json`
   > $ yarn
3. In VSC terminal, compile and run
   > $ yarn web

**Note**: In browser, go to the localhost:xxx specified in VSC terminal to view compiled app

## Committing to remote

1. Run ESLint and TypeScript checks before you commit

   > $ `yarn tsc`

2. If you are missing `aws-exports.js`, do the following
   > $ cd src/shared
   >
   > $ amplify pull
   >
   > ... Source directory path: aws
