/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePatientInfo = /* GraphQL */ `
  subscription OnCreatePatientInfo($owner: String) {
    onCreatePatientInfo(owner: $owner) {
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
      NYHAClass
      cardiologist
      diagnosisInfo
      hospitalName
      hospitalLocation
      targetWeight
      targetSteps
      riskLevel
      deviceNo
      fluidIntakeGoalInMl
      configured
      version
      updatedByUser
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdatePatientInfo = /* GraphQL */ `
  subscription OnUpdatePatientInfo($owner: String) {
    onUpdatePatientInfo(owner: $owner) {
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
      NYHAClass
      cardiologist
      diagnosisInfo
      hospitalName
      hospitalLocation
      targetWeight
      targetSteps
      riskLevel
      deviceNo
      fluidIntakeGoalInMl
      configured
      version
      updatedByUser
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeletePatientInfo = /* GraphQL */ `
  subscription OnDeletePatientInfo($owner: String) {
    onDeletePatientInfo(owner: $owner) {
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
      NYHAClass
      cardiologist
      diagnosisInfo
      hospitalName
      hospitalLocation
      targetWeight
      targetSteps
      riskLevel
      deviceNo
      fluidIntakeGoalInMl
      configured
      version
      updatedByUser
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateMedicationInfo = /* GraphQL */ `
  subscription OnCreateMedicationInfo($owner: String, $patientID: String) {
    onCreateMedicationInfo(owner: $owner, patientID: $patientID) {
      id
      patientID
      name
      dosage
      frequency
      records
      active
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateMedicationInfo = /* GraphQL */ `
  subscription OnUpdateMedicationInfo($owner: String, $patientID: String) {
    onUpdateMedicationInfo(owner: $owner, patientID: $patientID) {
      id
      patientID
      name
      dosage
      frequency
      records
      active
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteMedicationInfo = /* GraphQL */ `
  subscription OnDeleteMedicationInfo($owner: String, $patientID: String) {
    onDeleteMedicationInfo(owner: $owner, patientID: $patientID) {
      id
      patientID
      name
      dosage
      frequency
      records
      active
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateActivityInfo = /* GraphQL */ `
  subscription OnCreateActivityInfo($owner: String) {
    onCreateActivityInfo(owner: $owner) {
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
  }
`;
export const onUpdateActivityInfo = /* GraphQL */ `
  subscription OnUpdateActivityInfo($owner: String) {
    onUpdateActivityInfo(owner: $owner) {
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
  }
`;
export const onDeleteActivityInfo = /* GraphQL */ `
  subscription OnDeleteActivityInfo($owner: String) {
    onDeleteActivityInfo(owner: $owner) {
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
  }
`;
export const onCreateReportSymptom = /* GraphQL */ `
  subscription OnCreateReportSymptom($owner: String) {
    onCreateReportSymptom(owner: $owner) {
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
      owner
    }
  }
`;
export const onUpdateReportSymptom = /* GraphQL */ `
  subscription OnUpdateReportSymptom($owner: String) {
    onUpdateReportSymptom(owner: $owner) {
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
      owner
    }
  }
`;
export const onDeleteReportSymptom = /* GraphQL */ `
  subscription OnDeleteReportSymptom($owner: String) {
    onDeleteReportSymptom(owner: $owner) {
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
      owner
    }
  }
`;
export const onCreateReportVitals = /* GraphQL */ `
  subscription OnCreateReportVitals($owner: String) {
    onCreateReportVitals(owner: $owner) {
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
  }
`;
export const onUpdateReportVitals = /* GraphQL */ `
  subscription OnUpdateReportVitals($owner: String) {
    onUpdateReportVitals(owner: $owner) {
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
  }
`;
export const onDeleteReportVitals = /* GraphQL */ `
  subscription OnDeleteReportVitals($owner: String) {
    onDeleteReportVitals(owner: $owner) {
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
  }
`;
export const onCreatePhysical = /* GraphQL */ `
  subscription OnCreatePhysical($owner: String) {
    onCreatePhysical(owner: $owner) {
      id
      patientID
      steps
      stepsGoal
      averageWalkingSpeedInMetresPerSeconds
      distanceInMetres
      dateTime
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdatePhysical = /* GraphQL */ `
  subscription OnUpdatePhysical($owner: String) {
    onUpdatePhysical(owner: $owner) {
      id
      patientID
      steps
      stepsGoal
      averageWalkingSpeedInMetresPerSeconds
      distanceInMetres
      dateTime
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeletePhysical = /* GraphQL */ `
  subscription OnDeletePhysical($owner: String) {
    onDeletePhysical(owner: $owner) {
      id
      patientID
      steps
      stepsGoal
      averageWalkingSpeedInMetresPerSeconds
      distanceInMetres
      dateTime
      createdAt
      updatedAt
      owner
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
  subscription OnCreateAlert($owner: String) {
    onCreateAlert(owner: $owner) {
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
      owner
    }
  }
`;
export const onUpdateAlert = /* GraphQL */ `
  subscription OnUpdateAlert($owner: String) {
    onUpdateAlert(owner: $owner) {
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
      owner
    }
  }
`;
export const onDeleteAlert = /* GraphQL */ `
  subscription OnDeleteAlert($owner: String) {
    onDeleteAlert(owner: $owner) {
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
      owner
    }
  }
`;
export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($owner: String) {
    onCreateTodo(owner: $owner) {
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
      owner
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($owner: String) {
    onUpdateTodo(owner: $owner) {
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
      owner
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($owner: String) {
    onDeleteTodo(owner: $owner) {
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
      owner
    }
  }
`;
export const onCreateAlertNotification = /* GraphQL */ `
  subscription OnCreateAlertNotification {
    onCreateAlertNotification {
      id
      patientID
      alertID
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateAlertNotification = /* GraphQL */ `
  subscription OnUpdateAlertNotification {
    onUpdateAlertNotification {
      id
      patientID
      alertID
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteAlertNotification = /* GraphQL */ `
  subscription OnDeleteAlertNotification {
    onDeleteAlertNotification {
      id
      patientID
      alertID
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onCreateClinicianRecord = /* GraphQL */ `
  subscription OnCreateClinicianRecord($owner: String) {
    onCreateClinicianRecord(owner: $owner) {
      patientID
      documentID
      type
      title
      path
      uploaderClinicianID
      uploadDateTime
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateClinicianRecord = /* GraphQL */ `
  subscription OnUpdateClinicianRecord($owner: String) {
    onUpdateClinicianRecord(owner: $owner) {
      patientID
      documentID
      type
      title
      path
      uploaderClinicianID
      uploadDateTime
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteClinicianRecord = /* GraphQL */ `
  subscription OnDeleteClinicianRecord($owner: String) {
    onDeleteClinicianRecord(owner: $owner) {
      patientID
      documentID
      type
      title
      path
      uploaderClinicianID
      uploadDateTime
      createdAt
      updatedAt
      owner
    }
  }
`;
