"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listTodosByAlertID =
  exports.listCompletedTodosByLastModifiedDate =
  exports.listPendingTodosByLastModifiedDate =
  exports.listCompletedRiskAlerts =
  exports.listPendingRiskAlerts =
  exports.listPendingAlertsByDateTime =
  exports.listPatientAlertsByDateTime =
  exports.listPendingPatientAssignments =
  exports.listClinicianMappingsByPatientID =
  exports.listIcdCrtRecordsByDateTime =
  exports.listMedicalRecordsByPatientID =
  exports.listReportVitalsByDateTime =
  exports.listReportVitalsByPatientID =
  exports.listReportSymptomsByDateTime =
  exports.listReportSymptomsByPatientID =
  exports.listMedCompliantsByDate =
  exports.listMedCompliantsByPatientID =
  exports.listActivityInfosByPatientID =
  exports.listMedicationInfosByPatientID =
  exports.listAlertNotifications =
  exports.getAlertNotification =
  exports.syncAlertNotifications =
  exports.listTodos =
  exports.getTodo =
  exports.syncTodos =
  exports.listAlerts =
  exports.getAlert =
  exports.syncAlerts =
  exports.listPatientAssignments =
  exports.getPatientAssignment =
  exports.syncPatientAssignments =
  exports.listClinicianPatientMaps =
  exports.getClinicianPatientMap =
  exports.syncClinicianPatientMaps =
  exports.listClinicianProtectedInfos =
  exports.getClinicianProtectedInfo =
  exports.syncClinicianProtectedInfos =
  exports.listClinicianInfos =
  exports.getClinicianInfo =
  exports.syncClinicianInfos =
  exports.listIcdCrtRecords =
  exports.getIcdCrtRecord =
  exports.syncIcdCrtRecords =
  exports.listMedicalRecords =
  exports.getMedicalRecord =
  exports.syncMedicalRecords =
  exports.listReportVitalss =
  exports.getReportVitals =
  exports.syncReportVitals =
  exports.listReportSymptoms =
  exports.getReportSymptom =
  exports.syncReportSymptoms =
  exports.listMedCompliants =
  exports.getMedCompliant =
  exports.syncMedCompliants =
  exports.listActivityInfos =
  exports.getActivityInfo =
  exports.syncActivityInfos =
  exports.listMedicationInfos =
  exports.getMedicationInfo =
  exports.syncMedicationInfos =
  exports.listPatientInfos =
  exports.getPatientInfo =
  exports.syncPatientInfos =
    void 0;

/* tslint:disable */

/* eslint-disable */
// this is an auto generated file. This will be overwritten
const syncPatientInfos =
  /* GraphQL */
  `
    query SyncPatientInfos(
      $filter: ModelPatientInfoFilterInput
      $limit: Int
      $nextToken: String
      $lastSync: AWSTimestamp
    ) {
      syncPatientInfos(
        filter: $filter
        limit: $limit
        nextToken: $nextToken
        lastSync: $lastSync
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.syncPatientInfos = syncPatientInfos;
const getPatientInfo =
  /* GraphQL */
  `
    query GetPatientInfo($patientID: String!) {
      getPatientInfo(patientID: $patientID) {
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
exports.getPatientInfo = getPatientInfo;
const listPatientInfos =
  /* GraphQL */
  `
    query ListPatientInfos(
      $patientID: String
      $filter: ModelPatientInfoFilterInput
      $limit: Int
      $nextToken: String
      $sortDirection: ModelSortDirection
    ) {
      listPatientInfos(
        patientID: $patientID
        filter: $filter
        limit: $limit
        nextToken: $nextToken
        sortDirection: $sortDirection
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.listPatientInfos = listPatientInfos;
const syncMedicationInfos =
  /* GraphQL */
  `
    query SyncMedicationInfos(
      $filter: ModelMedicationInfoFilterInput
      $limit: Int
      $nextToken: String
      $lastSync: AWSTimestamp
    ) {
      syncMedicationInfos(
        filter: $filter
        limit: $limit
        nextToken: $nextToken
        lastSync: $lastSync
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.syncMedicationInfos = syncMedicationInfos;
const getMedicationInfo =
  /* GraphQL */
  `
    query GetMedicationInfo($id: ID!) {
      getMedicationInfo(id: $id) {
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
exports.getMedicationInfo = getMedicationInfo;
const listMedicationInfos =
  /* GraphQL */
  `
    query ListMedicationInfos(
      $filter: ModelMedicationInfoFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listMedicationInfos(
        filter: $filter
        limit: $limit
        nextToken: $nextToken
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.listMedicationInfos = listMedicationInfos;
const syncActivityInfos =
  /* GraphQL */
  `
    query SyncActivityInfos(
      $filter: ModelActivityInfoFilterInput
      $limit: Int
      $nextToken: String
      $lastSync: AWSTimestamp
    ) {
      syncActivityInfos(
        filter: $filter
        limit: $limit
        nextToken: $nextToken
        lastSync: $lastSync
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.syncActivityInfos = syncActivityInfos;
const getActivityInfo =
  /* GraphQL */
  `
    query GetActivityInfo($id: ID!) {
      getActivityInfo(id: $id) {
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
exports.getActivityInfo = getActivityInfo;
const listActivityInfos =
  /* GraphQL */
  `
    query ListActivityInfos(
      $filter: ModelActivityInfoFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listActivityInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
        nextToken
        startedAt
      }
    }
  `;
exports.listActivityInfos = listActivityInfos;
const syncMedCompliants =
  /* GraphQL */
  `
    query SyncMedCompliants(
      $filter: ModelMedCompliantFilterInput
      $limit: Int
      $nextToken: String
      $lastSync: AWSTimestamp
    ) {
      syncMedCompliants(
        filter: $filter
        limit: $limit
        nextToken: $nextToken
        lastSync: $lastSync
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.syncMedCompliants = syncMedCompliants;
const getMedCompliant =
  /* GraphQL */
  `
    query GetMedCompliant($id: ID!) {
      getMedCompliant(id: $id) {
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
exports.getMedCompliant = getMedCompliant;
const listMedCompliants =
  /* GraphQL */
  `
    query ListMedCompliants(
      $filter: ModelMedCompliantFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listMedCompliants(filter: $filter, limit: $limit, nextToken: $nextToken) {
        nextToken
        startedAt
      }
    }
  `;
exports.listMedCompliants = listMedCompliants;
const syncReportSymptoms =
  /* GraphQL */
  `
    query SyncReportSymptoms(
      $filter: ModelReportSymptomFilterInput
      $limit: Int
      $nextToken: String
      $lastSync: AWSTimestamp
    ) {
      syncReportSymptoms(
        filter: $filter
        limit: $limit
        nextToken: $nextToken
        lastSync: $lastSync
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.syncReportSymptoms = syncReportSymptoms;
const getReportSymptom =
  /* GraphQL */
  `
    query GetReportSymptom($id: ID!) {
      getReportSymptom(id: $id) {
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
exports.getReportSymptom = getReportSymptom;
const listReportSymptoms =
  /* GraphQL */
  `
    query ListReportSymptoms(
      $filter: ModelReportSymptomFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listReportSymptoms(
        filter: $filter
        limit: $limit
        nextToken: $nextToken
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.listReportSymptoms = listReportSymptoms;
const syncReportVitals =
  /* GraphQL */
  `
    query SyncReportVitals(
      $filter: ModelReportVitalsFilterInput
      $limit: Int
      $nextToken: String
      $lastSync: AWSTimestamp
    ) {
      syncReportVitals(
        filter: $filter
        limit: $limit
        nextToken: $nextToken
        lastSync: $lastSync
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.syncReportVitals = syncReportVitals;
const getReportVitals =
  /* GraphQL */
  `
    query GetReportVitals($id: ID!) {
      getReportVitals(id: $id) {
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
exports.getReportVitals = getReportVitals;
const listReportVitalss =
  /* GraphQL */
  `
    query ListReportVitalss(
      $filter: ModelReportVitalsFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listReportVitalss(filter: $filter, limit: $limit, nextToken: $nextToken) {
        nextToken
        startedAt
      }
    }
  `;
exports.listReportVitalss = listReportVitalss;
const syncMedicalRecords =
  /* GraphQL */
  `
    query SyncMedicalRecords(
      $filter: ModelMedicalRecordFilterInput
      $limit: Int
      $nextToken: String
      $lastSync: AWSTimestamp
    ) {
      syncMedicalRecords(
        filter: $filter
        limit: $limit
        nextToken: $nextToken
        lastSync: $lastSync
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.syncMedicalRecords = syncMedicalRecords;
const getMedicalRecord =
  /* GraphQL */
  `
    query GetMedicalRecord($id: ID!) {
      getMedicalRecord(id: $id) {
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
exports.getMedicalRecord = getMedicalRecord;
const listMedicalRecords =
  /* GraphQL */
  `
    query ListMedicalRecords(
      $filter: ModelMedicalRecordFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listMedicalRecords(
        filter: $filter
        limit: $limit
        nextToken: $nextToken
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.listMedicalRecords = listMedicalRecords;
const syncIcdCrtRecords =
  /* GraphQL */
  `
    query SyncIcdCrtRecords(
      $filter: ModelIcdCrtRecordFilterInput
      $limit: Int
      $nextToken: String
      $lastSync: AWSTimestamp
    ) {
      syncIcdCrtRecords(
        filter: $filter
        limit: $limit
        nextToken: $nextToken
        lastSync: $lastSync
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.syncIcdCrtRecords = syncIcdCrtRecords;
const getIcdCrtRecord =
  /* GraphQL */
  `
    query GetIcdCrtRecord($id: ID!) {
      getIcdCrtRecord(id: $id) {
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
exports.getIcdCrtRecord = getIcdCrtRecord;
const listIcdCrtRecords =
  /* GraphQL */
  `
    query ListIcdCrtRecords(
      $filter: ModelIcdCrtRecordFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listIcdCrtRecords(filter: $filter, limit: $limit, nextToken: $nextToken) {
        nextToken
        startedAt
      }
    }
  `;
exports.listIcdCrtRecords = listIcdCrtRecords;
const syncClinicianInfos =
  /* GraphQL */
  `
    query SyncClinicianInfos(
      $filter: ModelClinicianInfoFilterInput
      $limit: Int
      $nextToken: String
      $lastSync: AWSTimestamp
    ) {
      syncClinicianInfos(
        filter: $filter
        limit: $limit
        nextToken: $nextToken
        lastSync: $lastSync
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.syncClinicianInfos = syncClinicianInfos;
const getClinicianInfo =
  /* GraphQL */
  `
    query GetClinicianInfo($clinicianID: String!) {
      getClinicianInfo(clinicianID: $clinicianID) {
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
exports.getClinicianInfo = getClinicianInfo;
const listClinicianInfos =
  /* GraphQL */
  `
    query ListClinicianInfos(
      $clinicianID: String
      $filter: ModelClinicianInfoFilterInput
      $limit: Int
      $nextToken: String
      $sortDirection: ModelSortDirection
    ) {
      listClinicianInfos(
        clinicianID: $clinicianID
        filter: $filter
        limit: $limit
        nextToken: $nextToken
        sortDirection: $sortDirection
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.listClinicianInfos = listClinicianInfos;
const syncClinicianProtectedInfos =
  /* GraphQL */
  `
    query SyncClinicianProtectedInfos(
      $filter: ModelClinicianProtectedInfoFilterInput
      $limit: Int
      $nextToken: String
      $lastSync: AWSTimestamp
    ) {
      syncClinicianProtectedInfos(
        filter: $filter
        limit: $limit
        nextToken: $nextToken
        lastSync: $lastSync
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.syncClinicianProtectedInfos = syncClinicianProtectedInfos;
const getClinicianProtectedInfo =
  /* GraphQL */
  `
    query GetClinicianProtectedInfo($clinicianID: String!) {
      getClinicianProtectedInfo(clinicianID: $clinicianID) {
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
exports.getClinicianProtectedInfo = getClinicianProtectedInfo;
const listClinicianProtectedInfos =
  /* GraphQL */
  `
    query ListClinicianProtectedInfos(
      $clinicianID: String
      $filter: ModelClinicianProtectedInfoFilterInput
      $limit: Int
      $nextToken: String
      $sortDirection: ModelSortDirection
    ) {
      listClinicianProtectedInfos(
        clinicianID: $clinicianID
        filter: $filter
        limit: $limit
        nextToken: $nextToken
        sortDirection: $sortDirection
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.listClinicianProtectedInfos = listClinicianProtectedInfos;
const syncClinicianPatientMaps =
  /* GraphQL */
  `
    query SyncClinicianPatientMaps(
      $filter: ModelClinicianPatientMapFilterInput
      $limit: Int
      $nextToken: String
      $lastSync: AWSTimestamp
    ) {
      syncClinicianPatientMaps(
        filter: $filter
        limit: $limit
        nextToken: $nextToken
        lastSync: $lastSync
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.syncClinicianPatientMaps = syncClinicianPatientMaps;
const getClinicianPatientMap =
  /* GraphQL */
  `
    query GetClinicianPatientMap($clinicianID: String!, $patientID: String!) {
      getClinicianPatientMap(clinicianID: $clinicianID, patientID: $patientID) {
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
exports.getClinicianPatientMap = getClinicianPatientMap;
const listClinicianPatientMaps =
  /* GraphQL */
  `
    query ListClinicianPatientMaps(
      $clinicianID: String
      $patientID: ModelStringKeyConditionInput
      $filter: ModelClinicianPatientMapFilterInput
      $limit: Int
      $nextToken: String
      $sortDirection: ModelSortDirection
    ) {
      listClinicianPatientMaps(
        clinicianID: $clinicianID
        patientID: $patientID
        filter: $filter
        limit: $limit
        nextToken: $nextToken
        sortDirection: $sortDirection
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.listClinicianPatientMaps = listClinicianPatientMaps;
const syncPatientAssignments =
  /* GraphQL */
  `
    query SyncPatientAssignments(
      $filter: ModelPatientAssignmentFilterInput
      $limit: Int
      $nextToken: String
      $lastSync: AWSTimestamp
    ) {
      syncPatientAssignments(
        filter: $filter
        limit: $limit
        nextToken: $nextToken
        lastSync: $lastSync
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.syncPatientAssignments = syncPatientAssignments;
const getPatientAssignment =
  /* GraphQL */
  `
    query GetPatientAssignment($patientID: String!, $clinicianID: String!) {
      getPatientAssignment(patientID: $patientID, clinicianID: $clinicianID) {
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
exports.getPatientAssignment = getPatientAssignment;
const listPatientAssignments =
  /* GraphQL */
  `
    query ListPatientAssignments(
      $patientID: String
      $clinicianID: ModelStringKeyConditionInput
      $filter: ModelPatientAssignmentFilterInput
      $limit: Int
      $nextToken: String
      $sortDirection: ModelSortDirection
    ) {
      listPatientAssignments(
        patientID: $patientID
        clinicianID: $clinicianID
        filter: $filter
        limit: $limit
        nextToken: $nextToken
        sortDirection: $sortDirection
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.listPatientAssignments = listPatientAssignments;
const syncAlerts =
  /* GraphQL */
  `
    query SyncAlerts(
      $filter: ModelAlertFilterInput
      $limit: Int
      $nextToken: String
      $lastSync: AWSTimestamp
    ) {
      syncAlerts(
        filter: $filter
        limit: $limit
        nextToken: $nextToken
        lastSync: $lastSync
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.syncAlerts = syncAlerts;
const getAlert =
  /* GraphQL */
  `
    query GetAlert($id: ID!) {
      getAlert(id: $id) {
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
exports.getAlert = getAlert;
const listAlerts =
  /* GraphQL */
  `
    query ListAlerts(
      $filter: ModelAlertFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listAlerts(filter: $filter, limit: $limit, nextToken: $nextToken) {
        nextToken
        startedAt
      }
    }
  `;
exports.listAlerts = listAlerts;
const syncTodos =
  /* GraphQL */
  `
    query SyncTodos(
      $filter: ModelTodoFilterInput
      $limit: Int
      $nextToken: String
      $lastSync: AWSTimestamp
    ) {
      syncTodos(
        filter: $filter
        limit: $limit
        nextToken: $nextToken
        lastSync: $lastSync
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.syncTodos = syncTodos;
const getTodo =
  /* GraphQL */
  `
    query GetTodo($id: ID!) {
      getTodo(id: $id) {
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
exports.getTodo = getTodo;
const listTodos =
  /* GraphQL */
  `
    query ListTodos(
      $filter: ModelTodoFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
        nextToken
        startedAt
      }
    }
  `;
exports.listTodos = listTodos;
const syncAlertNotifications =
  /* GraphQL */
  `
    query SyncAlertNotifications(
      $filter: ModelAlertNotificationFilterInput
      $limit: Int
      $nextToken: String
      $lastSync: AWSTimestamp
    ) {
      syncAlertNotifications(
        filter: $filter
        limit: $limit
        nextToken: $nextToken
        lastSync: $lastSync
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.syncAlertNotifications = syncAlertNotifications;
const getAlertNotification =
  /* GraphQL */
  `
    query GetAlertNotification($id: ID!) {
      getAlertNotification(id: $id) {
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
exports.getAlertNotification = getAlertNotification;
const listAlertNotifications =
  /* GraphQL */
  `
    query ListAlertNotifications(
      $filter: ModelAlertNotificationFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listAlertNotifications(
        filter: $filter
        limit: $limit
        nextToken: $nextToken
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.listAlertNotifications = listAlertNotifications;
const listMedicationInfosByPatientID =
  /* GraphQL */
  `
    query ListMedicationInfosByPatientID(
      $patientID: String
      $sortDirection: ModelSortDirection
      $filter: ModelMedicationInfoFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listMedicationInfosByPatientID(
        patientID: $patientID
        sortDirection: $sortDirection
        filter: $filter
        limit: $limit
        nextToken: $nextToken
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.listMedicationInfosByPatientID = listMedicationInfosByPatientID;
const listActivityInfosByPatientID =
  /* GraphQL */
  `
    query ListActivityInfosByPatientID(
      $patientID: String
      $sortDirection: ModelSortDirection
      $filter: ModelActivityInfoFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listActivityInfosByPatientID(
        patientID: $patientID
        sortDirection: $sortDirection
        filter: $filter
        limit: $limit
        nextToken: $nextToken
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.listActivityInfosByPatientID = listActivityInfosByPatientID;
const listMedCompliantsByPatientID =
  /* GraphQL */
  `
    query ListMedCompliantsByPatientID(
      $patientID: String
      $sortDirection: ModelSortDirection
      $filter: ModelMedCompliantFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listMedCompliantsByPatientID(
        patientID: $patientID
        sortDirection: $sortDirection
        filter: $filter
        limit: $limit
        nextToken: $nextToken
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.listMedCompliantsByPatientID = listMedCompliantsByPatientID;
const listMedCompliantsByDate =
  /* GraphQL */
  `
    query ListMedCompliantsByDate(
      $patientID: String
      $Date: ModelStringKeyConditionInput
      $sortDirection: ModelSortDirection
      $filter: ModelMedCompliantFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listMedCompliantsByDate(
        patientID: $patientID
        Date: $Date
        sortDirection: $sortDirection
        filter: $filter
        limit: $limit
        nextToken: $nextToken
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.listMedCompliantsByDate = listMedCompliantsByDate;
const listReportSymptomsByPatientID =
  /* GraphQL */
  `
    query ListReportSymptomsByPatientID(
      $patientID: String
      $sortDirection: ModelSortDirection
      $filter: ModelReportSymptomFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listReportSymptomsByPatientID(
        patientID: $patientID
        sortDirection: $sortDirection
        filter: $filter
        limit: $limit
        nextToken: $nextToken
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.listReportSymptomsByPatientID = listReportSymptomsByPatientID;
const listReportSymptomsByDateTime =
  /* GraphQL */
  `
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
        nextToken
        startedAt
      }
    }
  `;
exports.listReportSymptomsByDateTime = listReportSymptomsByDateTime;
const listReportVitalsByPatientID =
  /* GraphQL */
  `
    query ListReportVitalsByPatientID(
      $patientID: String
      $sortDirection: ModelSortDirection
      $filter: ModelReportVitalsFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listReportVitalsByPatientID(
        patientID: $patientID
        sortDirection: $sortDirection
        filter: $filter
        limit: $limit
        nextToken: $nextToken
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.listReportVitalsByPatientID = listReportVitalsByPatientID;
const listReportVitalsByDateTime =
  /* GraphQL */
  `
    query ListReportVitalsByDateTime(
      $patientID: String
      $DateTime: ModelStringKeyConditionInput
      $sortDirection: ModelSortDirection
      $filter: ModelReportVitalsFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listReportVitalsByDateTime(
        patientID: $patientID
        DateTime: $DateTime
        sortDirection: $sortDirection
        filter: $filter
        limit: $limit
        nextToken: $nextToken
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.listReportVitalsByDateTime = listReportVitalsByDateTime;
const listMedicalRecordsByPatientID =
  /* GraphQL */
  `
    query ListMedicalRecordsByPatientID(
      $patientID: String
      $sortDirection: ModelSortDirection
      $filter: ModelMedicalRecordFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listMedicalRecordsByPatientID(
        patientID: $patientID
        sortDirection: $sortDirection
        filter: $filter
        limit: $limit
        nextToken: $nextToken
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.listMedicalRecordsByPatientID = listMedicalRecordsByPatientID;
const listIcdCrtRecordsByDateTime =
  /* GraphQL */
  `
    query ListIcdCrtRecordsByDateTime(
      $patientID: String
      $dateTime: ModelStringKeyConditionInput
      $sortDirection: ModelSortDirection
      $filter: ModelIcdCrtRecordFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listIcdCrtRecordsByDateTime(
        patientID: $patientID
        dateTime: $dateTime
        sortDirection: $sortDirection
        filter: $filter
        limit: $limit
        nextToken: $nextToken
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.listIcdCrtRecordsByDateTime = listIcdCrtRecordsByDateTime;
const listClinicianMappingsByPatientID =
  /* GraphQL */
  `
    query ListClinicianMappingsByPatientID(
      $patientID: String
      $clinicianID: ModelStringKeyConditionInput
      $sortDirection: ModelSortDirection
      $filter: ModelClinicianPatientMapFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listClinicianMappingsByPatientID(
        patientID: $patientID
        clinicianID: $clinicianID
        sortDirection: $sortDirection
        filter: $filter
        limit: $limit
        nextToken: $nextToken
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.listClinicianMappingsByPatientID = listClinicianMappingsByPatientID;
const listPendingPatientAssignments =
  /* GraphQL */
  `
    query ListPendingPatientAssignments(
      $clinicianID: String
      $pending: ModelStringKeyConditionInput
      $sortDirection: ModelSortDirection
      $filter: ModelPatientAssignmentFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listPendingPatientAssignments(
        clinicianID: $clinicianID
        pending: $pending
        sortDirection: $sortDirection
        filter: $filter
        limit: $limit
        nextToken: $nextToken
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.listPendingPatientAssignments = listPendingPatientAssignments;
const listPatientAlertsByDateTime =
  /* GraphQL */
  `
    query ListPatientAlertsByDateTime(
      $patientID: String
      $dateTime: ModelStringKeyConditionInput
      $sortDirection: ModelSortDirection
      $filter: ModelAlertFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listPatientAlertsByDateTime(
        patientID: $patientID
        dateTime: $dateTime
        sortDirection: $sortDirection
        filter: $filter
        limit: $limit
        nextToken: $nextToken
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.listPatientAlertsByDateTime = listPatientAlertsByDateTime;
const listPendingAlertsByDateTime =
  /* GraphQL */
  `
    query ListPendingAlertsByDateTime(
      $pending: String
      $dateTime: ModelStringKeyConditionInput
      $sortDirection: ModelSortDirection
      $filter: ModelAlertFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listPendingAlertsByDateTime(
        pending: $pending
        dateTime: $dateTime
        sortDirection: $sortDirection
        filter: $filter
        limit: $limit
        nextToken: $nextToken
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.listPendingAlertsByDateTime = listPendingAlertsByDateTime;
const listPendingRiskAlerts =
  /* GraphQL */
  `
    query ListPendingRiskAlerts(
      $pending: String
      $colorCode: ModelStringKeyConditionInput
      $sortDirection: ModelSortDirection
      $filter: ModelAlertFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listPendingRiskAlerts(
        pending: $pending
        colorCode: $colorCode
        sortDirection: $sortDirection
        filter: $filter
        limit: $limit
        nextToken: $nextToken
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.listPendingRiskAlerts = listPendingRiskAlerts;
const listCompletedRiskAlerts =
  /* GraphQL */
  `
    query ListCompletedRiskAlerts(
      $completed: String
      $colorCode: ModelStringKeyConditionInput
      $sortDirection: ModelSortDirection
      $filter: ModelAlertFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listCompletedRiskAlerts(
        completed: $completed
        colorCode: $colorCode
        sortDirection: $sortDirection
        filter: $filter
        limit: $limit
        nextToken: $nextToken
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.listCompletedRiskAlerts = listCompletedRiskAlerts;
const listPendingTodosByLastModifiedDate =
  /* GraphQL */
  `
    query ListPendingTodosByLastModifiedDate(
      $pending: String
      $lastModified: ModelStringKeyConditionInput
      $sortDirection: ModelSortDirection
      $filter: ModelTodoFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listPendingTodosByLastModifiedDate(
        pending: $pending
        lastModified: $lastModified
        sortDirection: $sortDirection
        filter: $filter
        limit: $limit
        nextToken: $nextToken
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.listPendingTodosByLastModifiedDate = listPendingTodosByLastModifiedDate;
const listCompletedTodosByLastModifiedDate =
  /* GraphQL */
  `
    query ListCompletedTodosByLastModifiedDate(
      $completed: String
      $lastModified: ModelStringKeyConditionInput
      $sortDirection: ModelSortDirection
      $filter: ModelTodoFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listCompletedTodosByLastModifiedDate(
        completed: $completed
        lastModified: $lastModified
        sortDirection: $sortDirection
        filter: $filter
        limit: $limit
        nextToken: $nextToken
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.listCompletedTodosByLastModifiedDate =
  listCompletedTodosByLastModifiedDate;
const listTodosByAlertID =
  /* GraphQL */
  `
    query ListTodosByAlertID(
      $clinicianID: String
      $alertID: ModelIDKeyConditionInput
      $sortDirection: ModelSortDirection
      $filter: ModelTodoFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listTodosByAlertID(
        clinicianID: $clinicianID
        alertID: $alertID
        sortDirection: $sortDirection
        filter: $filter
        limit: $limit
        nextToken: $nextToken
      ) {
        nextToken
        startedAt
      }
    }
  `;
exports.listTodosByAlertID = listTodosByAlertID;
