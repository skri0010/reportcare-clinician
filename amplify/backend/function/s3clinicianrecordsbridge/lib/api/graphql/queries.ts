/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPresignedUrlForClinicianRecords = /* GraphQL */ `
  query GetPresignedUrlForClinicianRecords(
    $recordType: String
    $operation: String
    $patientID: String
    $documentID: String
    $documentTitle: String
  ) {
    getPresignedUrlForClinicianRecords(
      recordType: $recordType
      operation: $operation
      patientID: $patientID
      documentID: $documentID
      documentTitle: $documentTitle
    )
  }
`;
export const getPatientInfo = /* GraphQL */ `
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
export const listPatientInfos = /* GraphQL */ `
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
export const syncPatientInfos = /* GraphQL */ `
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
export const getMedicationInfo = /* GraphQL */ `
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
export const listMedicationInfos = /* GraphQL */ `
  query ListMedicationInfos(
    $filter: ModelMedicationInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMedicationInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      nextToken
      startedAt
    }
  }
`;
export const listMedicationInfosByPatientID = /* GraphQL */ `
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
export const syncMedicationInfos = /* GraphQL */ `
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
export const getActivityInfo = /* GraphQL */ `
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
export const listActivityInfos = /* GraphQL */ `
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
export const listActivityInfosByPatientID = /* GraphQL */ `
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
export const syncActivityInfos = /* GraphQL */ `
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
export const getMedCompliant = /* GraphQL */ `
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
export const listMedCompliants = /* GraphQL */ `
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
export const listMedCompliantsByPatientID = /* GraphQL */ `
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
export const listMedCompliantsByDate = /* GraphQL */ `
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
export const syncMedCompliants = /* GraphQL */ `
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
export const getReportSymptom = /* GraphQL */ `
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
export const listReportSymptoms = /* GraphQL */ `
  query ListReportSymptoms(
    $filter: ModelReportSymptomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReportSymptoms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      nextToken
      startedAt
    }
  }
`;
export const listReportSymptomsByPatientID = /* GraphQL */ `
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
export const listReportSymptomsByDateTime = /* GraphQL */ `
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
export const syncReportSymptoms = /* GraphQL */ `
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
export const getReportVitals = /* GraphQL */ `
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
export const listReportVitalss = /* GraphQL */ `
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
export const listReportVitalsByPatientID = /* GraphQL */ `
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
export const listReportVitalsByDateTime = /* GraphQL */ `
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
export const syncReportVitals = /* GraphQL */ `
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
export const getMedicalRecord = /* GraphQL */ `
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
export const listMedicalRecords = /* GraphQL */ `
  query ListMedicalRecords(
    $filter: ModelMedicalRecordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMedicalRecords(filter: $filter, limit: $limit, nextToken: $nextToken) {
      nextToken
      startedAt
    }
  }
`;
export const listMedicalRecordsByPatientID = /* GraphQL */ `
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
export const syncMedicalRecords = /* GraphQL */ `
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
export const getIcdCrtRecord = /* GraphQL */ `
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
export const listIcdCrtRecords = /* GraphQL */ `
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
export const listIcdCrtRecordsByDateTime = /* GraphQL */ `
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
export const syncIcdCrtRecords = /* GraphQL */ `
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
export const getClinicianInfo = /* GraphQL */ `
  query GetClinicianInfo($clinicianID: String!) {
    getClinicianInfo(clinicianID: $clinicianID) {
      id
      clinicianID
      name
      hospitalName
      role
      contactNumber
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listClinicianInfos = /* GraphQL */ `
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
export const syncClinicianInfos = /* GraphQL */ `
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
export const getClinicianProtectedInfo = /* GraphQL */ `
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
export const listClinicianProtectedInfos = /* GraphQL */ `
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
export const syncClinicianProtectedInfos = /* GraphQL */ `
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
export const getClinicianPatientMap = /* GraphQL */ `
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
export const listClinicianPatientMaps = /* GraphQL */ `
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
export const listClinicianMappingsByPatientID = /* GraphQL */ `
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
export const syncClinicianPatientMaps = /* GraphQL */ `
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
export const getPatientAssignment = /* GraphQL */ `
  query GetPatientAssignment($patientID: String!, $clinicianID: String!) {
    getPatientAssignment(patientID: $patientID, clinicianID: $clinicianID) {
      id
      patientID
      clinicianID
      patientName
      pending
      resolution
      reassignToClinicianID
      adminCompleted
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      adminReassignFromClinicianID
    }
  }
`;
export const listPatientAssignments = /* GraphQL */ `
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
export const listPendingPatientAssignments = /* GraphQL */ `
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
export const syncPatientAssignments = /* GraphQL */ `
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
export const getAlert = /* GraphQL */ `
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
export const listAlerts = /* GraphQL */ `
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
export const listPatientAlertsByDateTime = /* GraphQL */ `
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
export const listPendingAlertsByDateTime = /* GraphQL */ `
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
export const listPendingRiskAlerts = /* GraphQL */ `
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
export const listCompletedRiskAlerts = /* GraphQL */ `
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
export const syncAlerts = /* GraphQL */ `
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
export const getTodo = /* GraphQL */ `
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
export const listTodos = /* GraphQL */ `
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
export const listPendingTodosByLastModifiedDate = /* GraphQL */ `
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
export const listCompletedTodosByLastModifiedDate = /* GraphQL */ `
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
export const listTodosByAlertID = /* GraphQL */ `
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
export const syncTodos = /* GraphQL */ `
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
export const getAlertNotification = /* GraphQL */ `
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
export const listAlertNotifications = /* GraphQL */ `
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
export const syncAlertNotifications = /* GraphQL */ `
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
export const getClinicianRecord = /* GraphQL */ `
  query GetClinicianRecord($patientID: String!, $documentID: String!) {
    getClinicianRecord(patientID: $patientID, documentID: $documentID) {
      patientID
      documentID
      type
      title
      path
      uploaderClinicianID
      uploadDateTime
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listClinicianRecords = /* GraphQL */ `
  query ListClinicianRecords(
    $patientID: String
    $documentID: ModelStringKeyConditionInput
    $filter: ModelClinicianRecordFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listClinicianRecords(
      patientID: $patientID
      documentID: $documentID
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
export const listUploadedClinicianRecordsByPatientID = /* GraphQL */ `
  query ListUploadedClinicianRecordsByPatientID(
    $patientID: String
    $uploadDateTime: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelClinicianRecordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUploadedClinicianRecordsByPatientID(
      patientID: $patientID
      uploadDateTime: $uploadDateTime
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
export const syncClinicianRecords = /* GraphQL */ `
  query SyncClinicianRecords(
    $filter: ModelClinicianRecordFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncClinicianRecords(
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
