// Three-level getAlert
export const getAlert = /* GraphQL */ `
  query GetAlert($id: ID!) {
    getAlert(id: $id) {
      id
      patientID
      patientName
      dateTime
      summary
      colorCode
      triageValue
      vitalsReportID
      symptomReportID
      pending
      completed
      version
      updatedByUser
      createdAt
      updatedAt
      symptomReport {
        id
        patientID
        activityInfoID
        activityInfo {
          id
          patientID
          activityName
          startTime
          days
          durationInMinutes
          locations
          symptoms
          createdAt
          updatedAt
          owner
        }
        symptomName
        severity
        dateTime
        summary
        weather
        temperature
        humidity
        createdAt
        updatedAt
        owner
      }
      vitalsReport {
        id
        patientID
        dateTime
        weight
        systolicBloodPressure
        diastolicBloodPressure
        oxygenSaturation
        fluidIntakeInMl
        weather
        temperature
        humidity
        createdAt
        updatedAt
        owner
      }
      owner
    }
  }
`;

export const listReportSymptomsWithActivitiesByDateTime = /* GraphQL */ `
  query ListReportSymptomsByDateTime(
    $patientID: String
    $DateTime: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelReportSymptomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReportSymptomsByDateTime(
      patientID: $patientID
      DateTime: $DateTime
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        patientID
        activityInfoID
        activityInfo {
          id
          patientID
          activityName
          startTime
          days
          durationInMinutes
          locations
          symptoms
          createdAt
          updatedAt
          owner
        }
        symptomName
        severity
        dateTime
        summary
        weather
        temperature
        humidity
        createdAt
        updatedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
