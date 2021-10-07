"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onDeleteAlertNotification =
  exports.onUpdateAlertNotification =
  exports.onCreateAlertNotification =
  exports.onDeleteTodo =
  exports.onUpdateTodo =
  exports.onCreateTodo =
  exports.onDeleteAlert =
  exports.onUpdateAlert =
  exports.onCreateAlert =
  exports.onDeletePatientAssignment =
  exports.onUpdatePatientAssignment =
  exports.onCreatePatientAssignment =
  exports.onDeleteClinicianPatientMap =
  exports.onUpdateClinicianPatientMap =
  exports.onCreateClinicianPatientMap =
  exports.onDeleteClinicianProtectedInfo =
  exports.onUpdateClinicianProtectedInfo =
  exports.onCreateClinicianProtectedInfo =
  exports.onDeleteClinicianInfo =
  exports.onUpdateClinicianInfo =
  exports.onCreateClinicianInfo =
  exports.onDeleteIcdCrtRecord =
  exports.onUpdateIcdCrtRecord =
  exports.onCreateIcdCrtRecord =
  exports.onDeleteMedicalRecord =
  exports.onUpdateMedicalRecord =
  exports.onCreateMedicalRecord =
  exports.onDeleteReportVitals =
  exports.onUpdateReportVitals =
  exports.onCreateReportVitals =
  exports.onDeleteReportSymptom =
  exports.onUpdateReportSymptom =
  exports.onCreateReportSymptom =
  exports.onDeleteMedCompliant =
  exports.onUpdateMedCompliant =
  exports.onCreateMedCompliant =
  exports.onDeleteActivityInfo =
  exports.onUpdateActivityInfo =
  exports.onCreateActivityInfo =
  exports.onDeleteMedicationInfo =
  exports.onUpdateMedicationInfo =
  exports.onCreateMedicationInfo =
  exports.onDeletePatientInfo =
  exports.onUpdatePatientInfo =
  exports.onCreatePatientInfo =
    void 0;

/* tslint:disable */

/* eslint-disable */
// this is an auto generated file. This will be overwritten
const onCreatePatientInfo =
  /* GraphQL */
  `
    subscription OnCreatePatientInfo($owner: String) {
      onCreatePatientInfo(owner: $owner) {
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
exports.onCreatePatientInfo = onCreatePatientInfo;
const onUpdatePatientInfo =
  /* GraphQL */
  `
    subscription OnUpdatePatientInfo($owner: String) {
      onUpdatePatientInfo(owner: $owner) {
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
exports.onUpdatePatientInfo = onUpdatePatientInfo;
const onDeletePatientInfo =
  /* GraphQL */
  `
    subscription OnDeletePatientInfo($owner: String) {
      onDeletePatientInfo(owner: $owner) {
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
exports.onDeletePatientInfo = onDeletePatientInfo;
const onCreateMedicationInfo =
  /* GraphQL */
  `
    subscription OnCreateMedicationInfo($owner: String, $patientID: String) {
      onCreateMedicationInfo(owner: $owner, patientID: $patientID) {
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
exports.onCreateMedicationInfo = onCreateMedicationInfo;
const onUpdateMedicationInfo =
  /* GraphQL */
  `
    subscription OnUpdateMedicationInfo($owner: String, $patientID: String) {
      onUpdateMedicationInfo(owner: $owner, patientID: $patientID) {
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
exports.onUpdateMedicationInfo = onUpdateMedicationInfo;
const onDeleteMedicationInfo =
  /* GraphQL */
  `
    subscription OnDeleteMedicationInfo($owner: String, $patientID: String) {
      onDeleteMedicationInfo(owner: $owner, patientID: $patientID) {
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
exports.onDeleteMedicationInfo = onDeleteMedicationInfo;
const onCreateActivityInfo =
  /* GraphQL */
  `
    subscription OnCreateActivityInfo($owner: String) {
      onCreateActivityInfo(owner: $owner) {
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
exports.onCreateActivityInfo = onCreateActivityInfo;
const onUpdateActivityInfo =
  /* GraphQL */
  `
    subscription OnUpdateActivityInfo($owner: String) {
      onUpdateActivityInfo(owner: $owner) {
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
exports.onUpdateActivityInfo = onUpdateActivityInfo;
const onDeleteActivityInfo =
  /* GraphQL */
  `
    subscription OnDeleteActivityInfo($owner: String) {
      onDeleteActivityInfo(owner: $owner) {
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
exports.onDeleteActivityInfo = onDeleteActivityInfo;
const onCreateMedCompliant =
  /* GraphQL */
  `
    subscription OnCreateMedCompliant($owner: String) {
      onCreateMedCompliant(owner: $owner) {
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
exports.onCreateMedCompliant = onCreateMedCompliant;
const onUpdateMedCompliant =
  /* GraphQL */
  `
    subscription OnUpdateMedCompliant($owner: String) {
      onUpdateMedCompliant(owner: $owner) {
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
exports.onUpdateMedCompliant = onUpdateMedCompliant;
const onDeleteMedCompliant =
  /* GraphQL */
  `
    subscription OnDeleteMedCompliant($owner: String) {
      onDeleteMedCompliant(owner: $owner) {
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
exports.onDeleteMedCompliant = onDeleteMedCompliant;
const onCreateReportSymptom =
  /* GraphQL */
  `
    subscription OnCreateReportSymptom($owner: String) {
      onCreateReportSymptom(owner: $owner) {
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
exports.onCreateReportSymptom = onCreateReportSymptom;
const onUpdateReportSymptom =
  /* GraphQL */
  `
    subscription OnUpdateReportSymptom($owner: String) {
      onUpdateReportSymptom(owner: $owner) {
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
exports.onUpdateReportSymptom = onUpdateReportSymptom;
const onDeleteReportSymptom =
  /* GraphQL */
  `
    subscription OnDeleteReportSymptom($owner: String) {
      onDeleteReportSymptom(owner: $owner) {
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
exports.onDeleteReportSymptom = onDeleteReportSymptom;
const onCreateReportVitals =
  /* GraphQL */
  `
    subscription OnCreateReportVitals($owner: String) {
      onCreateReportVitals(owner: $owner) {
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
exports.onCreateReportVitals = onCreateReportVitals;
const onUpdateReportVitals =
  /* GraphQL */
  `
    subscription OnUpdateReportVitals($owner: String) {
      onUpdateReportVitals(owner: $owner) {
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
exports.onUpdateReportVitals = onUpdateReportVitals;
const onDeleteReportVitals =
  /* GraphQL */
  `
    subscription OnDeleteReportVitals($owner: String) {
      onDeleteReportVitals(owner: $owner) {
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
exports.onDeleteReportVitals = onDeleteReportVitals;
const onCreateMedicalRecord =
  /* GraphQL */
  `
    subscription OnCreateMedicalRecord($clinicianID: String) {
      onCreateMedicalRecord(clinicianID: $clinicianID) {
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
exports.onCreateMedicalRecord = onCreateMedicalRecord;
const onUpdateMedicalRecord =
  /* GraphQL */
  `
    subscription OnUpdateMedicalRecord($clinicianID: String) {
      onUpdateMedicalRecord(clinicianID: $clinicianID) {
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
exports.onUpdateMedicalRecord = onUpdateMedicalRecord;
const onDeleteMedicalRecord =
  /* GraphQL */
  `
    subscription OnDeleteMedicalRecord($clinicianID: String) {
      onDeleteMedicalRecord(clinicianID: $clinicianID) {
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
exports.onDeleteMedicalRecord = onDeleteMedicalRecord;
const onCreateIcdCrtRecord =
  /* GraphQL */
  `
    subscription OnCreateIcdCrtRecord($clinicianID: String) {
      onCreateIcdCrtRecord(clinicianID: $clinicianID) {
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
exports.onCreateIcdCrtRecord = onCreateIcdCrtRecord;
const onUpdateIcdCrtRecord =
  /* GraphQL */
  `
    subscription OnUpdateIcdCrtRecord($clinicianID: String) {
      onUpdateIcdCrtRecord(clinicianID: $clinicianID) {
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
exports.onUpdateIcdCrtRecord = onUpdateIcdCrtRecord;
const onDeleteIcdCrtRecord =
  /* GraphQL */
  `
    subscription OnDeleteIcdCrtRecord($clinicianID: String) {
      onDeleteIcdCrtRecord(clinicianID: $clinicianID) {
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
exports.onDeleteIcdCrtRecord = onDeleteIcdCrtRecord;
const onCreateClinicianInfo =
  /* GraphQL */
  `
    subscription OnCreateClinicianInfo($clinicianID: String) {
      onCreateClinicianInfo(clinicianID: $clinicianID) {
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
exports.onCreateClinicianInfo = onCreateClinicianInfo;
const onUpdateClinicianInfo =
  /* GraphQL */
  `
    subscription OnUpdateClinicianInfo($clinicianID: String) {
      onUpdateClinicianInfo(clinicianID: $clinicianID) {
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
exports.onUpdateClinicianInfo = onUpdateClinicianInfo;
const onDeleteClinicianInfo =
  /* GraphQL */
  `
    subscription OnDeleteClinicianInfo($clinicianID: String) {
      onDeleteClinicianInfo(clinicianID: $clinicianID) {
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
exports.onDeleteClinicianInfo = onDeleteClinicianInfo;
const onCreateClinicianProtectedInfo =
  /* GraphQL */
  `
    subscription OnCreateClinicianProtectedInfo($clinicianID: String) {
      onCreateClinicianProtectedInfo(clinicianID: $clinicianID) {
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
exports.onCreateClinicianProtectedInfo = onCreateClinicianProtectedInfo;
const onUpdateClinicianProtectedInfo =
  /* GraphQL */
  `
    subscription OnUpdateClinicianProtectedInfo($clinicianID: String) {
      onUpdateClinicianProtectedInfo(clinicianID: $clinicianID) {
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
exports.onUpdateClinicianProtectedInfo = onUpdateClinicianProtectedInfo;
const onDeleteClinicianProtectedInfo =
  /* GraphQL */
  `
    subscription OnDeleteClinicianProtectedInfo($clinicianID: String) {
      onDeleteClinicianProtectedInfo(clinicianID: $clinicianID) {
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
exports.onDeleteClinicianProtectedInfo = onDeleteClinicianProtectedInfo;
const onCreateClinicianPatientMap =
  /* GraphQL */
  `
    subscription OnCreateClinicianPatientMap(
      $clinicianID: String
      $patientID: String
    ) {
      onCreateClinicianPatientMap(
        clinicianID: $clinicianID
        patientID: $patientID
      ) {
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
exports.onCreateClinicianPatientMap = onCreateClinicianPatientMap;
const onUpdateClinicianPatientMap =
  /* GraphQL */
  `
    subscription OnUpdateClinicianPatientMap(
      $clinicianID: String
      $patientID: String
    ) {
      onUpdateClinicianPatientMap(
        clinicianID: $clinicianID
        patientID: $patientID
      ) {
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
exports.onUpdateClinicianPatientMap = onUpdateClinicianPatientMap;
const onDeleteClinicianPatientMap =
  /* GraphQL */
  `
    subscription OnDeleteClinicianPatientMap(
      $clinicianID: String
      $patientID: String
    ) {
      onDeleteClinicianPatientMap(
        clinicianID: $clinicianID
        patientID: $patientID
      ) {
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
exports.onDeleteClinicianPatientMap = onDeleteClinicianPatientMap;
const onCreatePatientAssignment =
  /* GraphQL */
  `
    subscription OnCreatePatientAssignment(
      $patientID: String
      $clinicianID: String
    ) {
      onCreatePatientAssignment(
        patientID: $patientID
        clinicianID: $clinicianID
      ) {
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
exports.onCreatePatientAssignment = onCreatePatientAssignment;
const onUpdatePatientAssignment =
  /* GraphQL */
  `
    subscription OnUpdatePatientAssignment(
      $patientID: String
      $clinicianID: String
    ) {
      onUpdatePatientAssignment(
        patientID: $patientID
        clinicianID: $clinicianID
      ) {
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
exports.onUpdatePatientAssignment = onUpdatePatientAssignment;
const onDeletePatientAssignment =
  /* GraphQL */
  `
    subscription OnDeletePatientAssignment(
      $patientID: String
      $clinicianID: String
    ) {
      onDeletePatientAssignment(
        patientID: $patientID
        clinicianID: $clinicianID
      ) {
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
exports.onDeletePatientAssignment = onDeletePatientAssignment;
const onCreateAlert =
  /* GraphQL */
  `
    subscription OnCreateAlert($owner: String) {
      onCreateAlert(owner: $owner) {
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
exports.onCreateAlert = onCreateAlert;
const onUpdateAlert =
  /* GraphQL */
  `
    subscription OnUpdateAlert($owner: String) {
      onUpdateAlert(owner: $owner) {
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
exports.onUpdateAlert = onUpdateAlert;
const onDeleteAlert =
  /* GraphQL */
  `
    subscription OnDeleteAlert($owner: String) {
      onDeleteAlert(owner: $owner) {
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
exports.onDeleteAlert = onDeleteAlert;
const onCreateTodo =
  /* GraphQL */
  `
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
        owner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  `;
exports.onCreateTodo = onCreateTodo;
const onUpdateTodo =
  /* GraphQL */
  `
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
        owner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  `;
exports.onUpdateTodo = onUpdateTodo;
const onDeleteTodo =
  /* GraphQL */
  `
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
        owner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  `;
exports.onDeleteTodo = onDeleteTodo;
const onCreateAlertNotification =
  /* GraphQL */
  `
    subscription OnCreateAlertNotification {
      onCreateAlertNotification {
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
exports.onCreateAlertNotification = onCreateAlertNotification;
const onUpdateAlertNotification =
  /* GraphQL */
  `
    subscription OnUpdateAlertNotification {
      onUpdateAlertNotification {
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
exports.onUpdateAlertNotification = onUpdateAlertNotification;
const onDeleteAlertNotification =
  /* GraphQL */
  `
    subscription OnDeleteAlertNotification {
      onDeleteAlertNotification {
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
exports.onDeleteAlertNotification = onDeleteAlertNotification;
