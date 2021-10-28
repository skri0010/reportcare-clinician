/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPatientInfo = /* GraphQL */ `
  mutation CreatePatientInfo(
    $input: CreatePatientInfoInput!
    $condition: ModelPatientInfoConditionInput
  ) {
    createPatientInfo(input: $input, condition: $condition) {
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
      owner
    }
  }
`;
export const updatePatientInfo = /* GraphQL */ `
  mutation UpdatePatientInfo(
    $input: UpdatePatientInfoInput!
    $condition: ModelPatientInfoConditionInput
  ) {
    updatePatientInfo(input: $input, condition: $condition) {
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
      owner
    }
  }
`;
export const deletePatientInfo = /* GraphQL */ `
  mutation DeletePatientInfo(
    $input: DeletePatientInfoInput!
    $condition: ModelPatientInfoConditionInput
  ) {
    deletePatientInfo(input: $input, condition: $condition) {
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
      owner
    }
  }
`;
export const createMedicationInfo = /* GraphQL */ `
  mutation CreateMedicationInfo(
    $input: CreateMedicationInfoInput!
    $condition: ModelMedicationInfoConditionInput
  ) {
    createMedicationInfo(input: $input, condition: $condition) {
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
export const updateMedicationInfo = /* GraphQL */ `
  mutation UpdateMedicationInfo(
    $input: UpdateMedicationInfoInput!
    $condition: ModelMedicationInfoConditionInput
  ) {
    updateMedicationInfo(input: $input, condition: $condition) {
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
export const deleteMedicationInfo = /* GraphQL */ `
  mutation DeleteMedicationInfo(
    $input: DeleteMedicationInfoInput!
    $condition: ModelMedicationInfoConditionInput
  ) {
    deleteMedicationInfo(input: $input, condition: $condition) {
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
export const createActivityInfo = /* GraphQL */ `
  mutation CreateActivityInfo(
    $input: CreateActivityInfoInput!
    $condition: ModelActivityInfoConditionInput
  ) {
    createActivityInfo(input: $input, condition: $condition) {
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
export const updateActivityInfo = /* GraphQL */ `
  mutation UpdateActivityInfo(
    $input: UpdateActivityInfoInput!
    $condition: ModelActivityInfoConditionInput
  ) {
    updateActivityInfo(input: $input, condition: $condition) {
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
export const deleteActivityInfo = /* GraphQL */ `
  mutation DeleteActivityInfo(
    $input: DeleteActivityInfoInput!
    $condition: ModelActivityInfoConditionInput
  ) {
    deleteActivityInfo(input: $input, condition: $condition) {
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
export const createReportSymptom = /* GraphQL */ `
  mutation CreateReportSymptom(
    $input: CreateReportSymptomInput!
    $condition: ModelReportSymptomConditionInput
  ) {
    createReportSymptom(input: $input, condition: $condition) {
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
      owner
    }
  }
`;
export const updateReportSymptom = /* GraphQL */ `
  mutation UpdateReportSymptom(
    $input: UpdateReportSymptomInput!
    $condition: ModelReportSymptomConditionInput
  ) {
    updateReportSymptom(input: $input, condition: $condition) {
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
      owner
    }
  }
`;
export const deleteReportSymptom = /* GraphQL */ `
  mutation DeleteReportSymptom(
    $input: DeleteReportSymptomInput!
    $condition: ModelReportSymptomConditionInput
  ) {
    deleteReportSymptom(input: $input, condition: $condition) {
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
      owner
    }
  }
`;
export const createReportVitals = /* GraphQL */ `
  mutation CreateReportVitals(
    $input: CreateReportVitalsInput!
    $condition: ModelReportVitalsConditionInput
  ) {
    createReportVitals(input: $input, condition: $condition) {
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
export const updateReportVitals = /* GraphQL */ `
  mutation UpdateReportVitals(
    $input: UpdateReportVitalsInput!
    $condition: ModelReportVitalsConditionInput
  ) {
    updateReportVitals(input: $input, condition: $condition) {
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
export const deleteReportVitals = /* GraphQL */ `
  mutation DeleteReportVitals(
    $input: DeleteReportVitalsInput!
    $condition: ModelReportVitalsConditionInput
  ) {
    deleteReportVitals(input: $input, condition: $condition) {
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
export const createPhysical = /* GraphQL */ `
  mutation CreatePhysical(
    $input: CreatePhysicalInput!
    $condition: ModelPhysicalConditionInput
  ) {
    createPhysical(input: $input, condition: $condition) {
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
export const updatePhysical = /* GraphQL */ `
  mutation UpdatePhysical(
    $input: UpdatePhysicalInput!
    $condition: ModelPhysicalConditionInput
  ) {
    updatePhysical(input: $input, condition: $condition) {
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
export const deletePhysical = /* GraphQL */ `
  mutation DeletePhysical(
    $input: DeletePhysicalInput!
    $condition: ModelPhysicalConditionInput
  ) {
    deletePhysical(input: $input, condition: $condition) {
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
export const createClinicianInfo = /* GraphQL */ `
  mutation CreateClinicianInfo(
    $input: CreateClinicianInfoInput!
    $condition: ModelClinicianInfoConditionInput
  ) {
    createClinicianInfo(input: $input, condition: $condition) {
      clinicianID
      name
      hospitalName
      role
      contactNumber
      version
      createdAt
      updatedAt
      protectedInfo {
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
  }
`;
export const updateClinicianInfo = /* GraphQL */ `
  mutation UpdateClinicianInfo(
    $input: UpdateClinicianInfoInput!
    $condition: ModelClinicianInfoConditionInput
  ) {
    updateClinicianInfo(input: $input, condition: $condition) {
      clinicianID
      name
      hospitalName
      role
      contactNumber
      version
      createdAt
      updatedAt
      protectedInfo {
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
  }
`;
export const deleteClinicianInfo = /* GraphQL */ `
  mutation DeleteClinicianInfo(
    $input: DeleteClinicianInfoInput!
    $condition: ModelClinicianInfoConditionInput
  ) {
    deleteClinicianInfo(input: $input, condition: $condition) {
      clinicianID
      name
      hospitalName
      role
      contactNumber
      version
      createdAt
      updatedAt
      protectedInfo {
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
  }
`;
export const createClinicianProtectedInfo = /* GraphQL */ `
  mutation CreateClinicianProtectedInfo(
    $input: CreateClinicianProtectedInfoInput!
    $condition: ModelClinicianProtectedInfoConditionInput
  ) {
    createClinicianProtectedInfo(input: $input, condition: $condition) {
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
export const updateClinicianProtectedInfo = /* GraphQL */ `
  mutation UpdateClinicianProtectedInfo(
    $input: UpdateClinicianProtectedInfoInput!
    $condition: ModelClinicianProtectedInfoConditionInput
  ) {
    updateClinicianProtectedInfo(input: $input, condition: $condition) {
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
export const deleteClinicianProtectedInfo = /* GraphQL */ `
  mutation DeleteClinicianProtectedInfo(
    $input: DeleteClinicianProtectedInfoInput!
    $condition: ModelClinicianProtectedInfoConditionInput
  ) {
    deleteClinicianProtectedInfo(input: $input, condition: $condition) {
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
export const createClinicianPatientMap = /* GraphQL */ `
  mutation CreateClinicianPatientMap(
    $input: CreateClinicianPatientMapInput!
    $condition: ModelClinicianPatientMapConditionInput
  ) {
    createClinicianPatientMap(input: $input, condition: $condition) {
      clinicianID
      patientID
      createdAt
      updatedAt
      clinicianInfo {
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
  }
`;
export const updateClinicianPatientMap = /* GraphQL */ `
  mutation UpdateClinicianPatientMap(
    $input: UpdateClinicianPatientMapInput!
    $condition: ModelClinicianPatientMapConditionInput
  ) {
    updateClinicianPatientMap(input: $input, condition: $condition) {
      clinicianID
      patientID
      createdAt
      updatedAt
      clinicianInfo {
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
  }
`;
export const deleteClinicianPatientMap = /* GraphQL */ `
  mutation DeleteClinicianPatientMap(
    $input: DeleteClinicianPatientMapInput!
    $condition: ModelClinicianPatientMapConditionInput
  ) {
    deleteClinicianPatientMap(input: $input, condition: $condition) {
      clinicianID
      patientID
      createdAt
      updatedAt
      clinicianInfo {
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
  }
`;
export const createPatientAssignment = /* GraphQL */ `
  mutation CreatePatientAssignment(
    $input: CreatePatientAssignmentInput!
    $condition: ModelPatientAssignmentConditionInput
  ) {
    createPatientAssignment(input: $input, condition: $condition) {
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
export const updatePatientAssignment = /* GraphQL */ `
  mutation UpdatePatientAssignment(
    $input: UpdatePatientAssignmentInput!
    $condition: ModelPatientAssignmentConditionInput
  ) {
    updatePatientAssignment(input: $input, condition: $condition) {
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
export const deletePatientAssignment = /* GraphQL */ `
  mutation DeletePatientAssignment(
    $input: DeletePatientAssignmentInput!
    $condition: ModelPatientAssignmentConditionInput
  ) {
    deletePatientAssignment(input: $input, condition: $condition) {
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
export const createAlert = /* GraphQL */ `
  mutation CreateAlert(
    $input: CreateAlertInput!
    $condition: ModelAlertConditionInput
  ) {
    createAlert(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
      symptomReport {
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
export const updateAlert = /* GraphQL */ `
  mutation UpdateAlert(
    $input: UpdateAlertInput!
    $condition: ModelAlertConditionInput
  ) {
    updateAlert(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
      symptomReport {
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
export const deleteAlert = /* GraphQL */ `
  mutation DeleteAlert(
    $input: DeleteAlertInput!
    $condition: ModelAlertConditionInput
  ) {
    deleteAlert(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
      symptomReport {
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
export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
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
      alert {
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
        createdAt
        updatedAt
        owner
      }
      owner
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
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
      alert {
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
        createdAt
        updatedAt
        owner
      }
      owner
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
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
      alert {
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
        createdAt
        updatedAt
        owner
      }
      owner
    }
  }
`;
export const createAlertNotification = /* GraphQL */ `
  mutation CreateAlertNotification(
    $input: CreateAlertNotificationInput!
    $condition: ModelAlertNotificationConditionInput
  ) {
    createAlertNotification(input: $input, condition: $condition) {
      id
      patientID
      alertID
      owner
      createdAt
      updatedAt
    }
  }
`;
export const updateAlertNotification = /* GraphQL */ `
  mutation UpdateAlertNotification(
    $input: UpdateAlertNotificationInput!
    $condition: ModelAlertNotificationConditionInput
  ) {
    updateAlertNotification(input: $input, condition: $condition) {
      id
      patientID
      alertID
      owner
      createdAt
      updatedAt
    }
  }
`;
export const deleteAlertNotification = /* GraphQL */ `
  mutation DeleteAlertNotification(
    $input: DeleteAlertNotificationInput!
    $condition: ModelAlertNotificationConditionInput
  ) {
    deleteAlertNotification(input: $input, condition: $condition) {
      id
      patientID
      alertID
      owner
      createdAt
      updatedAt
    }
  }
`;
export const createClinicianRecord = /* GraphQL */ `
  mutation CreateClinicianRecord(
    $input: CreateClinicianRecordInput!
    $condition: ModelClinicianRecordConditionInput
  ) {
    createClinicianRecord(input: $input, condition: $condition) {
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
export const updateClinicianRecord = /* GraphQL */ `
  mutation UpdateClinicianRecord(
    $input: UpdateClinicianRecordInput!
    $condition: ModelClinicianRecordConditionInput
  ) {
    updateClinicianRecord(input: $input, condition: $condition) {
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
export const deleteClinicianRecord = /* GraphQL */ `
  mutation DeleteClinicianRecord(
    $input: DeleteClinicianRecordInput!
    $condition: ModelClinicianRecordConditionInput
  ) {
    deleteClinicianRecord(input: $input, condition: $condition) {
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
