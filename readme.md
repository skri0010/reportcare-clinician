# Reportcare Clinician Web

## Setup

```
1. Clone this repository
   $ git clone `<Codecommit Link`>

2. Install packages in `package.json`
   $ yarn

3. Pull amplify changes
   $ amplify pull
      > Language: JavaScript
      > Framework: React Native
      > src/aws

4. In VSC terminal, compile and run
   $ yarn web

5. Create a build for production
   $ yarn build
```

## Committing to remote

```
1. Run ESLint and TypeScript checks before you commit
   $ yarn lint

2. Husky prepare script will also run `yarn lint` and yarn `format` before a commit can be made

3. Prefix your commit with [IC-xx] so that it can be tracked by Jira
```

## Versions

### Version 1.0.0

- Clinician web app
  - Authentication screen
    - Sign in
    - Sign up
    - Confirm
    - Forgot password
  - Home screen
    - Pending alerts buttons
    - Pending todos
    - Pending patient assignments
  - Patients screen
    - Search patients
    - Filter patients by risk level
    - View patient details
      - Overview
        - Visualize current day's data
        - Includes diastolic BP, systolic BP, oxygen saturation, weight and fluid intake, steps, medication and symptoms
      - Parameters
        - Visualize one week of data
        - Filter by min, max or average
        - Includes diastolic BP, systolic BP, oxygen saturation, weight and fluid intake
      - ICD/CRT
        - Upload and view ICD/CRT records
        - Delete ICD/CRT records within 2 days
      - History
        - View past alerts
        - Upload and view medical records
        - Delete ICD/CRT records within 2 days
      - Info
        - Basic information
        - Extra information
    - Patient configuration modal
  - Clinicians screen
    - Search clinicians
    - View clinician details
  - Alerts screen
    - Search alerts
    - Filter alerts by risk level
    - View alert details
    - Address alerts
  - Todo screen
    - Search todos
    - View todo details
    - Create todos
    - Complete todos
    - Undo completed todos
  - Setting screen
    - Color scheme
    - Language
  - Offline syncing feature
- Clinician agent framework
  - Alert assistant (ALA)
  - App configuration assistant (APA)
  - Context awareness assistant (CAM)
  - Data assistant (DTA)
  - Medical health assistant (MHA)
  - Network assistant (NWA)
  - User specific assistant (UXSA)
- TypeScript types
  - Typed AppSync GraphQL API (aws/TypedAPI)
  - Typed local storage (rc_agents/storage)
  - Typed navigation (web/navigation)
  - Typed Redux (ic-redux)
