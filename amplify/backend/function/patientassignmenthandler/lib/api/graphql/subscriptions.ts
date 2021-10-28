/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePatientInfo = /* GraphQL */ `
  subscription OnCreatePatientInfo($patientID: String) {
    onCreatePatientInfo(patientID: $patientID) {
      patientID
      name
      address
      gender
      birthDate
      language
      phoneNumber
      email
      emergencyContactName
      emergencyContactNumber
      riskLevel
      NYHAClass
      cardiologist
      diagnosisInfo
      hospitalName
      hospitalLocation
      targetWeight
      targetSteps
      deviceNo
      fluidIntakeGoalInMl
      configured
      version
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePatientInfo = /* GraphQL */ `
  subscription OnUpdatePatientInfo($patientID: String) {
    onUpdatePatientInfo(patientID: $patientID) {
      patientID
      name
      address
      gender
      birthDate
      language
      phoneNumber
      email
      emergencyContactName
      emergencyContactNumber
      riskLevel
      NYHAClass
      cardiologist
      diagnosisInfo
      hospitalName
      hospitalLocation
      targetWeight
      targetSteps
      deviceNo
      fluidIntakeGoalInMl
      configured
      version
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePatientInfo = /* GraphQL */ `
  subscription OnDeletePatientInfo($patientID: String) {
    onDeletePatientInfo(patientID: $patientID) {
      patientID
      name
      address
      gender
      birthDate
      language
      phoneNumber
      email
      emergencyContactName
      emergencyContactNumber
      riskLevel
      NYHAClass
      cardiologist
      diagnosisInfo
      hospitalName
      hospitalLocation
      targetWeight
      targetSteps
      deviceNo
      fluidIntakeGoalInMl
      configured
      version
      createdAt
      updatedAt
    }
  }
`;
export const onCreateMedicationInfo = /* GraphQL */ `
  subscription OnCreateMedicationInfo($patientID: String) {
    onCreateMedicationInfo(patientID: $patientID) {
      id
      patientID
      name
      dosage
      frequency
      records
      active
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMedicationInfo = /* GraphQL */ `
  subscription OnUpdateMedicationInfo($patientID: String) {
    onUpdateMedicationInfo(patientID: $patientID) {
      id
      patientID
      name
      dosage
      frequency
      records
      active
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMedicationInfo = /* GraphQL */ `
  subscription OnDeleteMedicationInfo($patientID: String) {
    onDeleteMedicationInfo(patientID: $patientID) {
      id
      patientID
      name
      dosage
      frequency
      records
      active
      createdAt
      updatedAt
    }
  }
`;
export const onCreateActivityInfo = /* GraphQL */ `
  subscription OnCreateActivityInfo($patientID: String) {
    onCreateActivityInfo(patientID: $patientID) {
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
  }
`;
export const onUpdateActivityInfo = /* GraphQL */ `
  subscription OnUpdateActivityInfo($patientID: String) {
    onUpdateActivityInfo(patientID: $patientID) {
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
  }
`;
export const onDeleteActivityInfo = /* GraphQL */ `
  subscription OnDeleteActivityInfo($patientID: String) {
    onDeleteActivityInfo(patientID: $patientID) {
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
  }
`;
export const onCreateReportSymptom = /* GraphQL */ `
  subscription OnCreateReportSymptom($patientID: String) {
    onCreateReportSymptom(patientID: $patientID) {
      id
      patientID
      activityInfoID
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
  }
`;
export const onUpdateReportSymptom = /* GraphQL */ `
  subscription OnUpdateReportSymptom($patientID: String) {
    onUpdateReportSymptom(patientID: $patientID) {
      id
      patientID
      activityInfoID
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
  }
`;
export const onDeleteReportSymptom = /* GraphQL */ `
  subscription OnDeleteReportSymptom($patientID: String) {
    onDeleteReportSymptom(patientID: $patientID) {
      id
      patientID
      activityInfoID
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
  }
`;
export const onCreateReportVitals = /* GraphQL */ `
  subscription OnCreateReportVitals($patientID: String) {
    onCreateReportVitals(patientID: $patientID) {
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
`;
export const onUpdateReportVitals = /* GraphQL */ `
  subscription OnUpdateReportVitals($patientID: String) {
    onUpdateReportVitals(patientID: $patientID) {
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
`;
export const onDeleteReportVitals = /* GraphQL */ `
  subscription OnDeleteReportVitals($patientID: String) {
    onDeleteReportVitals(patientID: $patientID) {
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
`;
export const onCreatePhysical = /* GraphQL */ `
  subscription OnCreatePhysical($patientID: String) {
    onCreatePhysical(patientID: $patientID) {
      id
      patientID
      steps
      stepsGoal
      averageWalkingSpeedInMetresPerSeconds
      distanceInMetres
      dateTime
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePhysical = /* GraphQL */ `
  subscription OnUpdatePhysical($patientID: String) {
    onUpdatePhysical(patientID: $patientID) {
      id
      patientID
      steps
      stepsGoal
      averageWalkingSpeedInMetresPerSeconds
      distanceInMetres
      dateTime
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePhysical = /* GraphQL */ `
  subscription OnDeletePhysical($patientID: String) {
    onDeletePhysical(patientID: $patientID) {
      id
      patientID
      steps
      stepsGoal
      averageWalkingSpeedInMetresPerSeconds
      distanceInMetres
      dateTime
      createdAt
      updatedAt
    }
  }
`;
export const onCreateClinicianInfo = /* GraphQL */ `
  subscription OnCreateClinicianInfo($clinicianID: String) {
    onCreateClinicianInfo(clinicianID: $clinicianID) {
      clinicianID
      name
      hospitalName
      role
      contactNumber
      version
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateClinicianInfo = /* GraphQL */ `
  subscription OnUpdateClinicianInfo($clinicianID: String) {
    onUpdateClinicianInfo(clinicianID: $clinicianID) {
      clinicianID
      name
      hospitalName
      role
      contactNumber
      version
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteClinicianInfo = /* GraphQL */ `
  subscription OnDeleteClinicianInfo($clinicianID: String) {
    onDeleteClinicianInfo(clinicianID: $clinicianID) {
      clinicianID
      name
      hospitalName
      role
      contactNumber
      version
      createdAt
      updatedAt
    }
  }
`;
export const onCreateClinicianProtectedInfo = /* GraphQL */ `
  subscription OnCreateClinicianProtectedInfo($clinicianID: String) {
    onCreateClinicianProtectedInfo(clinicianID: $clinicianID) {
      clinicianID
      facts
      APS
      DTA
      UXSA
      NWA
      ALA
      MHA
      CAM
      version
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateClinicianProtectedInfo = /* GraphQL */ `
  subscription OnUpdateClinicianProtectedInfo($clinicianID: String) {
    onUpdateClinicianProtectedInfo(clinicianID: $clinicianID) {
      clinicianID
      facts
      APS
      DTA
      UXSA
      NWA
      ALA
      MHA
      CAM
      version
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteClinicianProtectedInfo = /* GraphQL */ `
  subscription OnDeleteClinicianProtectedInfo($clinicianID: String) {
    onDeleteClinicianProtectedInfo(clinicianID: $clinicianID) {
      clinicianID
      facts
      APS
      DTA
      UXSA
      NWA
      ALA
      MHA
      CAM
      version
      createdAt
      updatedAt
    }
  }
`;
export const onCreateClinicianPatientMap = /* GraphQL */ `
  subscription OnCreateClinicianPatientMap(
    $clinicianID: String
    $patientID: String
  ) {
    onCreateClinicianPatientMap(
      clinicianID: $clinicianID
      patientID: $patientID
    ) {
      clinicianID
      patientID
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateClinicianPatientMap = /* GraphQL */ `
  subscription OnUpdateClinicianPatientMap(
    $clinicianID: String
    $patientID: String
  ) {
    onUpdateClinicianPatientMap(
      clinicianID: $clinicianID
      patientID: $patientID
    ) {
      clinicianID
      patientID
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteClinicianPatientMap = /* GraphQL */ `
  subscription OnDeleteClinicianPatientMap(
    $clinicianID: String
    $patientID: String
  ) {
    onDeleteClinicianPatientMap(
      clinicianID: $clinicianID
      patientID: $patientID
    ) {
      clinicianID
      patientID
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePatientAssignment = /* GraphQL */ `
  subscription OnCreatePatientAssignment(
    $patientID: String
    $clinicianID: String
  ) {
    onCreatePatientAssignment(
      patientID: $patientID
      clinicianID: $clinicianID
    ) {
      patientID
      clinicianID
      patientName
      pending
      resolution
      reassignToClinicianID
      sourceClinicianID
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePatientAssignment = /* GraphQL */ `
  subscription OnUpdatePatientAssignment(
    $patientID: String
    $clinicianID: String
  ) {
    onUpdatePatientAssignment(
      patientID: $patientID
      clinicianID: $clinicianID
    ) {
      patientID
      clinicianID
      patientName
      pending
      resolution
      reassignToClinicianID
      sourceClinicianID
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePatientAssignment = /* GraphQL */ `
  subscription OnDeletePatientAssignment(
    $patientID: String
    $clinicianID: String
  ) {
    onDeletePatientAssignment(
      patientID: $patientID
      clinicianID: $clinicianID
    ) {
      patientID
      clinicianID
      patientName
      pending
      resolution
      reassignToClinicianID
      sourceClinicianID
      createdAt
      updatedAt
    }
  }
`;
export const onCreateAlert = /* GraphQL */ `
  subscription OnCreateAlert($patientID: String) {
    onCreateAlert(patientID: $patientID) {
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
    }
  }
`;
export const onUpdateAlert = /* GraphQL */ `
  subscription OnUpdateAlert($patientID: String) {
    onUpdateAlert(patientID: $patientID) {
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
    }
  }
`;
export const onDeleteAlert = /* GraphQL */ `
  subscription OnDeleteAlert($patientID: String) {
    onDeleteAlert(patientID: $patientID) {
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
    }
  }
`;
export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($clinicianID: String) {
    onCreateTodo(clinicianID: $clinicianID) {
      id
      clinicianID
      title
      patientName
      notes
      lastModified
      alertID
      pending
      completed
      version
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($clinicianID: String) {
    onUpdateTodo(clinicianID: $clinicianID) {
      id
      clinicianID
      title
      patientName
      notes
      lastModified
      alertID
      pending
      completed
      version
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($clinicianID: String) {
    onDeleteTodo(clinicianID: $clinicianID) {
      id
      clinicianID
      title
      patientName
      notes
      lastModified
      alertID
      pending
      completed
      version
      createdAt
      updatedAt
    }
  }
`;
export const onCreateAlertNotification = /* GraphQL */ `
  subscription OnCreateAlertNotification($patientID: String) {
    onCreateAlertNotification(patientID: $patientID) {
      id
      patientID
      alertID
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateAlertNotification = /* GraphQL */ `
  subscription OnUpdateAlertNotification($patientID: String) {
    onUpdateAlertNotification(patientID: $patientID) {
      id
      patientID
      alertID
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteAlertNotification = /* GraphQL */ `
  subscription OnDeleteAlertNotification($patientID: String) {
    onDeleteAlertNotification(patientID: $patientID) {
      id
      patientID
      alertID
      createdAt
      updatedAt
    }
  }
`;
export const onCreateClinicianRecord = /* GraphQL */ `
  subscription OnCreateClinicianRecord($uploaderClinicianID: String) {
    onCreateClinicianRecord(uploaderClinicianID: $uploaderClinicianID) {
      patientID
      documentID
      type
      title
      path
      uploaderClinicianID
      uploadDateTime
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateClinicianRecord = /* GraphQL */ `
  subscription OnUpdateClinicianRecord($uploaderClinicianID: String) {
    onUpdateClinicianRecord(uploaderClinicianID: $uploaderClinicianID) {
      patientID
      documentID
      type
      title
      path
      uploaderClinicianID
      uploadDateTime
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteClinicianRecord = /* GraphQL */ `
  subscription OnDeleteClinicianRecord($uploaderClinicianID: String) {
    onDeleteClinicianRecord(uploaderClinicianID: $uploaderClinicianID) {
      patientID
      documentID
      type
      title
      path
      uploaderClinicianID
      uploadDateTime
      createdAt
      updatedAt
    }
  }
`;
