// Depth level 3 - getAlert
export const getFullAlert = /* GraphQL */ `
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
      }
    }
  }
`;

export const listReportSymptomsWithActivitiesByDateTime = /* GraphQL */ `
  query ListReportSymptomsByDateTime(
    $patientID: String
    $dateTime: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelReportSymptomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReportSymptomsByDateTime(
      patientID: $patientID
      dateTime: $dateTime
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
      }
      nextToken
    }
  }
`;
