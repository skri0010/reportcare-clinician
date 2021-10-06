"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteAlertNotification =
  exports.updateAlertNotification =
  exports.createAlertNotification =
  exports.deleteTodo =
  exports.updateTodo =
  exports.createTodo =
  exports.deleteAlert =
  exports.updateAlert =
  exports.createAlert =
  exports.deletePatientAssignment =
  exports.updatePatientAssignment =
  exports.createPatientAssignment =
  exports.deleteClinicianPatientMap =
  exports.updateClinicianPatientMap =
  exports.createClinicianPatientMap =
  exports.deleteClinicianProtectedInfo =
  exports.updateClinicianProtectedInfo =
  exports.createClinicianProtectedInfo =
  exports.deleteClinicianInfo =
  exports.updateClinicianInfo =
  exports.createClinicianInfo =
  exports.deleteIcdCrtRecord =
  exports.updateIcdCrtRecord =
  exports.createIcdCrtRecord =
  exports.deleteMedicalRecord =
  exports.updateMedicalRecord =
  exports.createMedicalRecord =
  exports.deleteReportVitals =
  exports.updateReportVitals =
  exports.createReportVitals =
  exports.deleteReportSymptom =
  exports.updateReportSymptom =
  exports.createReportSymptom =
  exports.deleteMedCompliant =
  exports.updateMedCompliant =
  exports.createMedCompliant =
  exports.deleteActivityInfo =
  exports.updateActivityInfo =
  exports.createActivityInfo =
  exports.deleteMedicationInfo =
  exports.updateMedicationInfo =
  exports.createMedicationInfo =
  exports.deletePatientInfo =
  exports.updatePatientInfo =
  exports.createPatientInfo =
    void 0;

/* tslint:disable */

/* eslint-disable */
// this is an auto generated file. This will be overwritten
const createPatientInfo =
  /* GraphQL */
  `
    mutation CreatePatientInfo(
      $input: CreatePatientInfoInput!
      $condition: ModelPatientInfoConditionInput
    ) {
      createPatientInfo(input: $input, condition: $condition) {
        id
        name
        address
        deviceNo
        diagnosisInfo
        NHYAclass
        cardiologist
        hospitalName
        hospitalLocation
        targetWeight
        targetActivity
        riskLevel
        gender
        birthDate
        language
        phoneNumber
        email
        emergencyContactName
        emergencyContactNumber
        fluidIntakeGoal
        configured
        patientID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
    }
  `;
exports.createPatientInfo = createPatientInfo;
const updatePatientInfo =
  /* GraphQL */
  `
    mutation UpdatePatientInfo(
      $input: UpdatePatientInfoInput!
      $condition: ModelPatientInfoConditionInput
    ) {
      updatePatientInfo(input: $input, condition: $condition) {
        id
        name
        address
        deviceNo
        diagnosisInfo
        NHYAclass
        cardiologist
        hospitalName
        hospitalLocation
        targetWeight
        targetActivity
        riskLevel
        gender
        birthDate
        language
        phoneNumber
        email
        emergencyContactName
        emergencyContactNumber
        fluidIntakeGoal
        configured
        patientID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
    }
  `;
exports.updatePatientInfo = updatePatientInfo;
const deletePatientInfo =
  /* GraphQL */
  `
    mutation DeletePatientInfo(
      $input: DeletePatientInfoInput!
      $condition: ModelPatientInfoConditionInput
    ) {
      deletePatientInfo(input: $input, condition: $condition) {
        id
        name
        address
        deviceNo
        diagnosisInfo
        NHYAclass
        cardiologist
        hospitalName
        hospitalLocation
        targetWeight
        targetActivity
        riskLevel
        gender
        birthDate
        language
        phoneNumber
        email
        emergencyContactName
        emergencyContactNumber
        fluidIntakeGoal
        configured
        patientID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
    }
  `;
exports.deletePatientInfo = deletePatientInfo;
const createMedicationInfo =
  /* GraphQL */
  `
    mutation CreateMedicationInfo(
      $input: CreateMedicationInfoInput!
      $condition: ModelMedicationInfoConditionInput
    ) {
      createMedicationInfo(input: $input, condition: $condition) {
        id
        name
        dosage
        frequency
        records
        patientID
        active
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
    }
  `;
exports.createMedicationInfo = createMedicationInfo;
const updateMedicationInfo =
  /* GraphQL */
  `
    mutation UpdateMedicationInfo(
      $input: UpdateMedicationInfoInput!
      $condition: ModelMedicationInfoConditionInput
    ) {
      updateMedicationInfo(input: $input, condition: $condition) {
        id
        name
        dosage
        frequency
        records
        patientID
        active
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
    }
  `;
exports.updateMedicationInfo = updateMedicationInfo;
const deleteMedicationInfo =
  /* GraphQL */
  `
    mutation DeleteMedicationInfo(
      $input: DeleteMedicationInfoInput!
      $condition: ModelMedicationInfoConditionInput
    ) {
      deleteMedicationInfo(input: $input, condition: $condition) {
        id
        name
        dosage
        frequency
        records
        patientID
        active
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
    }
  `;
exports.deleteMedicationInfo = deleteMedicationInfo;
const createActivityInfo =
  /* GraphQL */
  `
    mutation CreateActivityInfo(
      $input: CreateActivityInfoInput!
      $condition: ModelActivityInfoConditionInput
    ) {
      createActivityInfo(input: $input, condition: $condition) {
        id
        Actname
        Location
        expectedFrequency
        expectedDays
        expectedDurationMinutes
        recordDateTime
        patientID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
    }
  `;
exports.createActivityInfo = createActivityInfo;
const updateActivityInfo =
  /* GraphQL */
  `
    mutation UpdateActivityInfo(
      $input: UpdateActivityInfoInput!
      $condition: ModelActivityInfoConditionInput
    ) {
      updateActivityInfo(input: $input, condition: $condition) {
        id
        Actname
        Location
        expectedFrequency
        expectedDays
        expectedDurationMinutes
        recordDateTime
        patientID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
    }
  `;
exports.updateActivityInfo = updateActivityInfo;
const deleteActivityInfo =
  /* GraphQL */
  `
    mutation DeleteActivityInfo(
      $input: DeleteActivityInfoInput!
      $condition: ModelActivityInfoConditionInput
    ) {
      deleteActivityInfo(input: $input, condition: $condition) {
        id
        Actname
        Location
        expectedFrequency
        expectedDays
        expectedDurationMinutes
        recordDateTime
        patientID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
    }
  `;
exports.deleteActivityInfo = deleteActivityInfo;
const createMedCompliant =
  /* GraphQL */
  `
    mutation CreateMedCompliant(
      $input: CreateMedCompliantInput!
      $condition: ModelMedCompliantConditionInput
    ) {
      createMedCompliant(input: $input, condition: $condition) {
        id
        MedId
        Verification
        Date
        patientID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
    }
  `;
exports.createMedCompliant = createMedCompliant;
const updateMedCompliant =
  /* GraphQL */
  `
    mutation UpdateMedCompliant(
      $input: UpdateMedCompliantInput!
      $condition: ModelMedCompliantConditionInput
    ) {
      updateMedCompliant(input: $input, condition: $condition) {
        id
        MedId
        Verification
        Date
        patientID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
    }
  `;
exports.updateMedCompliant = updateMedCompliant;
const deleteMedCompliant =
  /* GraphQL */
  `
    mutation DeleteMedCompliant(
      $input: DeleteMedCompliantInput!
      $condition: ModelMedCompliantConditionInput
    ) {
      deleteMedCompliant(input: $input, condition: $condition) {
        id
        MedId
        Verification
        Date
        patientID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
    }
  `;
exports.deleteMedCompliant = deleteMedCompliant;
const createReportSymptom =
  /* GraphQL */
  `
    mutation CreateReportSymptom(
      $input: CreateReportSymptomInput!
      $condition: ModelReportSymptomConditionInput
    ) {
      createReportSymptom(input: $input, condition: $condition) {
        id
        ActId
        Name
        Severity
        DateTime
        Summary
        patientID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
    }
  `;
exports.createReportSymptom = createReportSymptom;
const updateReportSymptom =
  /* GraphQL */
  `
    mutation UpdateReportSymptom(
      $input: UpdateReportSymptomInput!
      $condition: ModelReportSymptomConditionInput
    ) {
      updateReportSymptom(input: $input, condition: $condition) {
        id
        ActId
        Name
        Severity
        DateTime
        Summary
        patientID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
    }
  `;
exports.updateReportSymptom = updateReportSymptom;
const deleteReportSymptom =
  /* GraphQL */
  `
    mutation DeleteReportSymptom(
      $input: DeleteReportSymptomInput!
      $condition: ModelReportSymptomConditionInput
    ) {
      deleteReportSymptom(input: $input, condition: $condition) {
        id
        ActId
        Name
        Severity
        DateTime
        Summary
        patientID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
    }
  `;
exports.deleteReportSymptom = deleteReportSymptom;
const createReportVitals =
  /* GraphQL */
  `
    mutation CreateReportVitals(
      $input: CreateReportVitalsInput!
      $condition: ModelReportVitalsConditionInput
    ) {
      createReportVitals(input: $input, condition: $condition) {
        id
        Temperature
        Humidity
        Weight
        BPSys
        BPDi
        NoSteps
        OxySat
        FluidIntake
        DateTime
        patientID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
    }
  `;
exports.createReportVitals = createReportVitals;
const updateReportVitals =
  /* GraphQL */
  `
    mutation UpdateReportVitals(
      $input: UpdateReportVitalsInput!
      $condition: ModelReportVitalsConditionInput
    ) {
      updateReportVitals(input: $input, condition: $condition) {
        id
        Temperature
        Humidity
        Weight
        BPSys
        BPDi
        NoSteps
        OxySat
        FluidIntake
        DateTime
        patientID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
    }
  `;
exports.updateReportVitals = updateReportVitals;
const deleteReportVitals =
  /* GraphQL */
  `
    mutation DeleteReportVitals(
      $input: DeleteReportVitalsInput!
      $condition: ModelReportVitalsConditionInput
    ) {
      deleteReportVitals(input: $input, condition: $condition) {
        id
        Temperature
        Humidity
        Weight
        BPSys
        BPDi
        NoSteps
        OxySat
        FluidIntake
        DateTime
        patientID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
    }
  `;
exports.deleteReportVitals = deleteReportVitals;
const createMedicalRecord =
  /* GraphQL */
  `
    mutation CreateMedicalRecord(
      $input: CreateMedicalRecordInput!
      $condition: ModelMedicalRecordConditionInput
    ) {
      createMedicalRecord(input: $input, condition: $condition) {
        id
        patientID
        clinicianID
        title
        fileKey
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  `;
exports.createMedicalRecord = createMedicalRecord;
const updateMedicalRecord =
  /* GraphQL */
  `
    mutation UpdateMedicalRecord(
      $input: UpdateMedicalRecordInput!
      $condition: ModelMedicalRecordConditionInput
    ) {
      updateMedicalRecord(input: $input, condition: $condition) {
        id
        patientID
        clinicianID
        title
        fileKey
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  `;
exports.updateMedicalRecord = updateMedicalRecord;
const deleteMedicalRecord =
  /* GraphQL */
  `
    mutation DeleteMedicalRecord(
      $input: DeleteMedicalRecordInput!
      $condition: ModelMedicalRecordConditionInput
    ) {
      deleteMedicalRecord(input: $input, condition: $condition) {
        id
        patientID
        clinicianID
        title
        fileKey
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  `;
exports.deleteMedicalRecord = deleteMedicalRecord;
const createIcdCrtRecord =
  /* GraphQL */
  `
    mutation CreateIcdCrtRecord(
      $input: CreateIcdCrtRecordInput!
      $condition: ModelIcdCrtRecordConditionInput
    ) {
      createIcdCrtRecord(input: $input, condition: $condition) {
        id
        patientID
        clinicianID
        title
        dateTime
        fileKey
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  `;
exports.createIcdCrtRecord = createIcdCrtRecord;
const updateIcdCrtRecord =
  /* GraphQL */
  `
    mutation UpdateIcdCrtRecord(
      $input: UpdateIcdCrtRecordInput!
      $condition: ModelIcdCrtRecordConditionInput
    ) {
      updateIcdCrtRecord(input: $input, condition: $condition) {
        id
        patientID
        clinicianID
        title
        dateTime
        fileKey
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  `;
exports.updateIcdCrtRecord = updateIcdCrtRecord;
const deleteIcdCrtRecord =
  /* GraphQL */
  `
    mutation DeleteIcdCrtRecord(
      $input: DeleteIcdCrtRecordInput!
      $condition: ModelIcdCrtRecordConditionInput
    ) {
      deleteIcdCrtRecord(input: $input, condition: $condition) {
        id
        patientID
        clinicianID
        title
        dateTime
        fileKey
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  `;
exports.deleteIcdCrtRecord = deleteIcdCrtRecord;
const createClinicianInfo =
  /* GraphQL */
  `
    mutation CreateClinicianInfo(
      $input: CreateClinicianInfoInput!
      $condition: ModelClinicianInfoConditionInput
    ) {
      createClinicianInfo(input: $input, condition: $condition) {
        id
        clinicianID
        name
        hospitalName
        role
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  `;
exports.createClinicianInfo = createClinicianInfo;
const updateClinicianInfo =
  /* GraphQL */
  `
    mutation UpdateClinicianInfo(
      $input: UpdateClinicianInfoInput!
      $condition: ModelClinicianInfoConditionInput
    ) {
      updateClinicianInfo(input: $input, condition: $condition) {
        id
        clinicianID
        name
        hospitalName
        role
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  `;
exports.updateClinicianInfo = updateClinicianInfo;
const deleteClinicianInfo =
  /* GraphQL */
  `
    mutation DeleteClinicianInfo(
      $input: DeleteClinicianInfoInput!
      $condition: ModelClinicianInfoConditionInput
    ) {
      deleteClinicianInfo(input: $input, condition: $condition) {
        id
        clinicianID
        name
        hospitalName
        role
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  `;
exports.deleteClinicianInfo = deleteClinicianInfo;
const createClinicianProtectedInfo =
  /* GraphQL */
  `
    mutation CreateClinicianProtectedInfo(
      $input: CreateClinicianProtectedInfoInput!
      $condition: ModelClinicianProtectedInfoConditionInput
    ) {
      createClinicianProtectedInfo(input: $input, condition: $condition) {
        id
        clinicianID
        facts
        APS
        DTA
        UXSA
        NWA
        ALA
        MHA
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  `;
exports.createClinicianProtectedInfo = createClinicianProtectedInfo;
const updateClinicianProtectedInfo =
  /* GraphQL */
  `
    mutation UpdateClinicianProtectedInfo(
      $input: UpdateClinicianProtectedInfoInput!
      $condition: ModelClinicianProtectedInfoConditionInput
    ) {
      updateClinicianProtectedInfo(input: $input, condition: $condition) {
        id
        clinicianID
        facts
        APS
        DTA
        UXSA
        NWA
        ALA
        MHA
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  `;
exports.updateClinicianProtectedInfo = updateClinicianProtectedInfo;
const deleteClinicianProtectedInfo =
  /* GraphQL */
  `
    mutation DeleteClinicianProtectedInfo(
      $input: DeleteClinicianProtectedInfoInput!
      $condition: ModelClinicianProtectedInfoConditionInput
    ) {
      deleteClinicianProtectedInfo(input: $input, condition: $condition) {
        id
        clinicianID
        facts
        APS
        DTA
        UXSA
        NWA
        ALA
        MHA
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  `;
exports.deleteClinicianProtectedInfo = deleteClinicianProtectedInfo;
const createClinicianPatientMap =
  /* GraphQL */
  `
    mutation CreateClinicianPatientMap(
      $input: CreateClinicianPatientMapInput!
      $condition: ModelClinicianPatientMapConditionInput
    ) {
      createClinicianPatientMap(input: $input, condition: $condition) {
        id
        clinicianID
        patientID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  `;
exports.createClinicianPatientMap = createClinicianPatientMap;
const updateClinicianPatientMap =
  /* GraphQL */
  `
    mutation UpdateClinicianPatientMap(
      $input: UpdateClinicianPatientMapInput!
      $condition: ModelClinicianPatientMapConditionInput
    ) {
      updateClinicianPatientMap(input: $input, condition: $condition) {
        id
        clinicianID
        patientID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  `;
exports.updateClinicianPatientMap = updateClinicianPatientMap;
const deleteClinicianPatientMap =
  /* GraphQL */
  `
    mutation DeleteClinicianPatientMap(
      $input: DeleteClinicianPatientMapInput!
      $condition: ModelClinicianPatientMapConditionInput
    ) {
      deleteClinicianPatientMap(input: $input, condition: $condition) {
        id
        clinicianID
        patientID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  `;
exports.deleteClinicianPatientMap = deleteClinicianPatientMap;
const createPatientAssignment =
  /* GraphQL */
  `
    mutation CreatePatientAssignment(
      $input: CreatePatientAssignmentInput!
      $condition: ModelPatientAssignmentConditionInput
    ) {
      createPatientAssignment(input: $input, condition: $condition) {
        id
        patientID
        clinicianID
        patientName
        pending
        resolution
        reassignToClinicianID
        adminReassignFromClinicianID
        adminCompleted
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  `;
exports.createPatientAssignment = createPatientAssignment;
const updatePatientAssignment =
  /* GraphQL */
  `
    mutation UpdatePatientAssignment(
      $input: UpdatePatientAssignmentInput!
      $condition: ModelPatientAssignmentConditionInput
    ) {
      updatePatientAssignment(input: $input, condition: $condition) {
        id
        patientID
        clinicianID
        patientName
        pending
        resolution
        reassignToClinicianID
        adminReassignFromClinicianID
        adminCompleted
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  `;
exports.updatePatientAssignment = updatePatientAssignment;
const deletePatientAssignment =
  /* GraphQL */
  `
    mutation DeletePatientAssignment(
      $input: DeletePatientAssignmentInput!
      $condition: ModelPatientAssignmentConditionInput
    ) {
      deletePatientAssignment(input: $input, condition: $condition) {
        id
        patientID
        clinicianID
        patientName
        pending
        resolution
        reassignToClinicianID
        adminReassignFromClinicianID
        adminCompleted
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  `;
exports.deletePatientAssignment = deletePatientAssignment;
const createAlert =
  /* GraphQL */
  `
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
        vitalsReportID
        symptomReportID
        pending
        completed
        owner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  `;
exports.createAlert = createAlert;
const updateAlert =
  /* GraphQL */
  `
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
        vitalsReportID
        symptomReportID
        pending
        completed
        owner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  `;
exports.updateAlert = updateAlert;
const deleteAlert =
  /* GraphQL */
  `
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
        vitalsReportID
        symptomReportID
        pending
        completed
        owner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  `;
exports.deleteAlert = deleteAlert;
const createTodo =
  /* GraphQL */
  `
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
        owner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  `;
exports.createTodo = createTodo;
const updateTodo =
  /* GraphQL */
  `
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
        owner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  `;
exports.updateTodo = updateTodo;
const deleteTodo =
  /* GraphQL */
  `
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
        owner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  `;
exports.deleteTodo = deleteTodo;
const createAlertNotification =
  /* GraphQL */
  `
    mutation CreateAlertNotification(
      $input: CreateAlertNotificationInput!
      $condition: ModelAlertNotificationConditionInput
    ) {
      createAlertNotification(input: $input, condition: $condition) {
        id
        patientID
        alertID
        owner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  `;
exports.createAlertNotification = createAlertNotification;
const updateAlertNotification =
  /* GraphQL */
  `
    mutation UpdateAlertNotification(
      $input: UpdateAlertNotificationInput!
      $condition: ModelAlertNotificationConditionInput
    ) {
      updateAlertNotification(input: $input, condition: $condition) {
        id
        patientID
        alertID
        owner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  `;
exports.updateAlertNotification = updateAlertNotification;
const deleteAlertNotification =
  /* GraphQL */
  `
    mutation DeleteAlertNotification(
      $input: DeleteAlertNotificationInput!
      $condition: ModelAlertNotificationConditionInput
    ) {
      deleteAlertNotification(input: $input, condition: $condition) {
        id
        patientID
        alertID
        owner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  `;
exports.deleteAlertNotification = deleteAlertNotification;
