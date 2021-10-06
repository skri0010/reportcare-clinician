"use strict";
/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten
exports.__esModule = true;
exports.getAlert =
  exports.syncPatientAssignments =
  exports.listPendingPatientAssignments =
  exports.listPatientAssignments =
  exports.getPatientAssignment =
  exports.syncClinicianPatientMaps =
  exports.listClinicianMappingsByPatientID =
  exports.listClinicianPatientMaps =
  exports.getClinicianPatientMap =
  exports.syncClinicianProtectedInfos =
  exports.listClinicianProtectedInfos =
  exports.getClinicianProtectedInfo =
  exports.syncClinicianInfos =
  exports.listClinicianInfos =
  exports.getClinicianInfo =
  exports.syncIcdCrtRecords =
  exports.listIcdCrtRecordsByDateTime =
  exports.listIcdCrtRecords =
  exports.getIcdCrtRecord =
  exports.syncMedicalRecords =
  exports.listMedicalRecordsByPatientID =
  exports.listMedicalRecords =
  exports.getMedicalRecord =
  exports.syncReportVitals =
  exports.listReportVitalsByDateTime =
  exports.listReportVitalsByPatientID =
  exports.listReportVitalss =
  exports.getReportVitals =
  exports.syncReportSymptoms =
  exports.listReportSymptomsByDateTime =
  exports.listReportSymptomsByPatientID =
  exports.listReportSymptoms =
  exports.getReportSymptom =
  exports.syncMedCompliants =
  exports.listMedCompliantsByDate =
  exports.listMedCompliantsByPatientID =
  exports.listMedCompliants =
  exports.getMedCompliant =
  exports.syncActivityInfos =
  exports.listActivityInfosByPatientID =
  exports.listActivityInfos =
  exports.getActivityInfo =
  exports.syncMedicationInfos =
  exports.listMedicationInfosByPatientID =
  exports.listMedicationInfos =
  exports.getMedicationInfo =
  exports.syncPatientInfos =
  exports.listPatientInfos =
  exports.getPatientInfo =
  exports.getPresignedUrlForClinicianRecords =
    void 0;
exports.syncClinicianRecords =
  exports.listUploadedClinicianRecordsByPatientID =
  exports.listClinicianRecords =
  exports.getClinicianRecord =
  exports.syncAlertNotifications =
  exports.listAlertNotifications =
  exports.getAlertNotification =
  exports.syncTodos =
  exports.listTodosByAlertID =
  exports.listCompletedTodosByLastModifiedDate =
  exports.listPendingTodosByLastModifiedDate =
  exports.listTodos =
  exports.getTodo =
  exports.syncAlerts =
  exports.listCompletedRiskAlerts =
  exports.listPendingRiskAlerts =
  exports.listPendingAlertsByDateTime =
  exports.listPatientAlertsByDateTime =
  exports.listAlerts =
    void 0;
exports.getPresignedUrlForClinicianRecords =
  "\n  query GetPresignedUrlForClinicianRecords(\n    $recordType: String\n    $operation: String\n    $patientID: String\n    $documentID: String\n    $documentTitle: String\n  ) {\n    getPresignedUrlForClinicianRecords(\n      recordType: $recordType\n      operation: $operation\n      patientID: $patientID\n      documentID: $documentID\n      documentTitle: $documentTitle\n    )\n  }\n";
exports.getPatientInfo =
  "\n  query GetPatientInfo($patientID: String!) {\n    getPatientInfo(patientID: $patientID) {\n      id\n      name\n      address\n      deviceNo\n      diagnosisInfo\n      NHYAclass\n      cardiologist\n      hospitalName\n      hospitalLocation\n      targetWeight\n      targetActivity\n      riskLevel\n      gender\n      birthDate\n      language\n      phoneNumber\n      email\n      emergencyContactName\n      emergencyContactNumber\n      fluidIntakeGoal\n      configured\n      patientID\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n      owner\n    }\n  }\n";
exports.listPatientInfos =
  "\n  query ListPatientInfos(\n    $patientID: String\n    $filter: ModelPatientInfoFilterInput\n    $limit: Int\n    $nextToken: String\n    $sortDirection: ModelSortDirection\n  ) {\n    listPatientInfos(\n      patientID: $patientID\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n      sortDirection: $sortDirection\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.syncPatientInfos =
  "\n  query SyncPatientInfos(\n    $filter: ModelPatientInfoFilterInput\n    $limit: Int\n    $nextToken: String\n    $lastSync: AWSTimestamp\n  ) {\n    syncPatientInfos(\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n      lastSync: $lastSync\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.getMedicationInfo =
  "\n  query GetMedicationInfo($id: ID!) {\n    getMedicationInfo(id: $id) {\n      id\n      name\n      dosage\n      frequency\n      records\n      patientID\n      active\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n      owner\n    }\n  }\n";
exports.listMedicationInfos =
  "\n  query ListMedicationInfos(\n    $filter: ModelMedicationInfoFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listMedicationInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.listMedicationInfosByPatientID =
  "\n  query ListMedicationInfosByPatientID(\n    $patientID: String\n    $sortDirection: ModelSortDirection\n    $filter: ModelMedicationInfoFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listMedicationInfosByPatientID(\n      patientID: $patientID\n      sortDirection: $sortDirection\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.syncMedicationInfos =
  "\n  query SyncMedicationInfos(\n    $filter: ModelMedicationInfoFilterInput\n    $limit: Int\n    $nextToken: String\n    $lastSync: AWSTimestamp\n  ) {\n    syncMedicationInfos(\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n      lastSync: $lastSync\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.getActivityInfo =
  "\n  query GetActivityInfo($id: ID!) {\n    getActivityInfo(id: $id) {\n      id\n      Actname\n      Location\n      expectedFrequency\n      expectedDays\n      expectedDurationMinutes\n      recordDateTime\n      patientID\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n      owner\n    }\n  }\n";
exports.listActivityInfos =
  "\n  query ListActivityInfos(\n    $filter: ModelActivityInfoFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listActivityInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.listActivityInfosByPatientID =
  "\n  query ListActivityInfosByPatientID(\n    $patientID: String\n    $sortDirection: ModelSortDirection\n    $filter: ModelActivityInfoFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listActivityInfosByPatientID(\n      patientID: $patientID\n      sortDirection: $sortDirection\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.syncActivityInfos =
  "\n  query SyncActivityInfos(\n    $filter: ModelActivityInfoFilterInput\n    $limit: Int\n    $nextToken: String\n    $lastSync: AWSTimestamp\n  ) {\n    syncActivityInfos(\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n      lastSync: $lastSync\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.getMedCompliant =
  "\n  query GetMedCompliant($id: ID!) {\n    getMedCompliant(id: $id) {\n      id\n      MedId\n      Verification\n      Date\n      patientID\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n      owner\n    }\n  }\n";
exports.listMedCompliants =
  "\n  query ListMedCompliants(\n    $filter: ModelMedCompliantFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listMedCompliants(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.listMedCompliantsByPatientID =
  "\n  query ListMedCompliantsByPatientID(\n    $patientID: String\n    $sortDirection: ModelSortDirection\n    $filter: ModelMedCompliantFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listMedCompliantsByPatientID(\n      patientID: $patientID\n      sortDirection: $sortDirection\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.listMedCompliantsByDate =
  "\n  query ListMedCompliantsByDate(\n    $patientID: String\n    $Date: ModelStringKeyConditionInput\n    $sortDirection: ModelSortDirection\n    $filter: ModelMedCompliantFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listMedCompliantsByDate(\n      patientID: $patientID\n      Date: $Date\n      sortDirection: $sortDirection\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.syncMedCompliants =
  "\n  query SyncMedCompliants(\n    $filter: ModelMedCompliantFilterInput\n    $limit: Int\n    $nextToken: String\n    $lastSync: AWSTimestamp\n  ) {\n    syncMedCompliants(\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n      lastSync: $lastSync\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.getReportSymptom =
  "\n  query GetReportSymptom($id: ID!) {\n    getReportSymptom(id: $id) {\n      id\n      ActId\n      Name\n      Severity\n      DateTime\n      Summary\n      patientID\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n      owner\n    }\n  }\n";
exports.listReportSymptoms =
  "\n  query ListReportSymptoms(\n    $filter: ModelReportSymptomFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listReportSymptoms(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.listReportSymptomsByPatientID =
  "\n  query ListReportSymptomsByPatientID(\n    $patientID: String\n    $sortDirection: ModelSortDirection\n    $filter: ModelReportSymptomFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listReportSymptomsByPatientID(\n      patientID: $patientID\n      sortDirection: $sortDirection\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.listReportSymptomsByDateTime =
  "\n  query ListReportSymptomsByDateTime(\n    $patientID: String\n    $DateTime: ModelStringKeyConditionInput\n    $sortDirection: ModelSortDirection\n    $filter: ModelReportSymptomFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listReportSymptomsByDateTime(\n      patientID: $patientID\n      DateTime: $DateTime\n      sortDirection: $sortDirection\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.syncReportSymptoms =
  "\n  query SyncReportSymptoms(\n    $filter: ModelReportSymptomFilterInput\n    $limit: Int\n    $nextToken: String\n    $lastSync: AWSTimestamp\n  ) {\n    syncReportSymptoms(\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n      lastSync: $lastSync\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.getReportVitals =
  "\n  query GetReportVitals($id: ID!) {\n    getReportVitals(id: $id) {\n      id\n      Temperature\n      Humidity\n      Weight\n      BPSys\n      BPDi\n      NoSteps\n      OxySat\n      FluidIntake\n      DateTime\n      patientID\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n      owner\n    }\n  }\n";
exports.listReportVitalss =
  "\n  query ListReportVitalss(\n    $filter: ModelReportVitalsFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listReportVitalss(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.listReportVitalsByPatientID =
  "\n  query ListReportVitalsByPatientID(\n    $patientID: String\n    $sortDirection: ModelSortDirection\n    $filter: ModelReportVitalsFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listReportVitalsByPatientID(\n      patientID: $patientID\n      sortDirection: $sortDirection\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.listReportVitalsByDateTime =
  "\n  query ListReportVitalsByDateTime(\n    $patientID: String\n    $DateTime: ModelStringKeyConditionInput\n    $sortDirection: ModelSortDirection\n    $filter: ModelReportVitalsFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listReportVitalsByDateTime(\n      patientID: $patientID\n      DateTime: $DateTime\n      sortDirection: $sortDirection\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.syncReportVitals =
  "\n  query SyncReportVitals(\n    $filter: ModelReportVitalsFilterInput\n    $limit: Int\n    $nextToken: String\n    $lastSync: AWSTimestamp\n  ) {\n    syncReportVitals(\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n      lastSync: $lastSync\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.getMedicalRecord =
  "\n  query GetMedicalRecord($id: ID!) {\n    getMedicalRecord(id: $id) {\n      id\n      patientID\n      clinicianID\n      title\n      fileKey\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.listMedicalRecords =
  "\n  query ListMedicalRecords(\n    $filter: ModelMedicalRecordFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listMedicalRecords(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.listMedicalRecordsByPatientID =
  "\n  query ListMedicalRecordsByPatientID(\n    $patientID: String\n    $sortDirection: ModelSortDirection\n    $filter: ModelMedicalRecordFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listMedicalRecordsByPatientID(\n      patientID: $patientID\n      sortDirection: $sortDirection\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.syncMedicalRecords =
  "\n  query SyncMedicalRecords(\n    $filter: ModelMedicalRecordFilterInput\n    $limit: Int\n    $nextToken: String\n    $lastSync: AWSTimestamp\n  ) {\n    syncMedicalRecords(\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n      lastSync: $lastSync\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.getIcdCrtRecord =
  "\n  query GetIcdCrtRecord($id: ID!) {\n    getIcdCrtRecord(id: $id) {\n      id\n      patientID\n      clinicianID\n      title\n      dateTime\n      fileKey\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.listIcdCrtRecords =
  "\n  query ListIcdCrtRecords(\n    $filter: ModelIcdCrtRecordFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listIcdCrtRecords(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.listIcdCrtRecordsByDateTime =
  "\n  query ListIcdCrtRecordsByDateTime(\n    $patientID: String\n    $dateTime: ModelStringKeyConditionInput\n    $sortDirection: ModelSortDirection\n    $filter: ModelIcdCrtRecordFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listIcdCrtRecordsByDateTime(\n      patientID: $patientID\n      dateTime: $dateTime\n      sortDirection: $sortDirection\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.syncIcdCrtRecords =
  "\n  query SyncIcdCrtRecords(\n    $filter: ModelIcdCrtRecordFilterInput\n    $limit: Int\n    $nextToken: String\n    $lastSync: AWSTimestamp\n  ) {\n    syncIcdCrtRecords(\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n      lastSync: $lastSync\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.getClinicianInfo =
  "\n  query GetClinicianInfo($clinicianID: String!) {\n    getClinicianInfo(clinicianID: $clinicianID) {\n      id\n      clinicianID\n      name\n      hospitalName\n      role\n      contactNumber\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.listClinicianInfos =
  "\n  query ListClinicianInfos(\n    $clinicianID: String\n    $filter: ModelClinicianInfoFilterInput\n    $limit: Int\n    $nextToken: String\n    $sortDirection: ModelSortDirection\n  ) {\n    listClinicianInfos(\n      clinicianID: $clinicianID\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n      sortDirection: $sortDirection\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.syncClinicianInfos =
  "\n  query SyncClinicianInfos(\n    $filter: ModelClinicianInfoFilterInput\n    $limit: Int\n    $nextToken: String\n    $lastSync: AWSTimestamp\n  ) {\n    syncClinicianInfos(\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n      lastSync: $lastSync\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.getClinicianProtectedInfo =
  "\n  query GetClinicianProtectedInfo($clinicianID: String!) {\n    getClinicianProtectedInfo(clinicianID: $clinicianID) {\n      id\n      clinicianID\n      facts\n      APS\n      DTA\n      UXSA\n      NWA\n      ALA\n      MHA\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.listClinicianProtectedInfos =
  "\n  query ListClinicianProtectedInfos(\n    $clinicianID: String\n    $filter: ModelClinicianProtectedInfoFilterInput\n    $limit: Int\n    $nextToken: String\n    $sortDirection: ModelSortDirection\n  ) {\n    listClinicianProtectedInfos(\n      clinicianID: $clinicianID\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n      sortDirection: $sortDirection\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.syncClinicianProtectedInfos =
  "\n  query SyncClinicianProtectedInfos(\n    $filter: ModelClinicianProtectedInfoFilterInput\n    $limit: Int\n    $nextToken: String\n    $lastSync: AWSTimestamp\n  ) {\n    syncClinicianProtectedInfos(\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n      lastSync: $lastSync\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.getClinicianPatientMap =
  "\n  query GetClinicianPatientMap($clinicianID: String!, $patientID: String!) {\n    getClinicianPatientMap(clinicianID: $clinicianID, patientID: $patientID) {\n      id\n      clinicianID\n      patientID\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.listClinicianPatientMaps =
  "\n  query ListClinicianPatientMaps(\n    $clinicianID: String\n    $patientID: ModelStringKeyConditionInput\n    $filter: ModelClinicianPatientMapFilterInput\n    $limit: Int\n    $nextToken: String\n    $sortDirection: ModelSortDirection\n  ) {\n    listClinicianPatientMaps(\n      clinicianID: $clinicianID\n      patientID: $patientID\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n      sortDirection: $sortDirection\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.listClinicianMappingsByPatientID =
  "\n  query ListClinicianMappingsByPatientID(\n    $patientID: String\n    $clinicianID: ModelStringKeyConditionInput\n    $sortDirection: ModelSortDirection\n    $filter: ModelClinicianPatientMapFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listClinicianMappingsByPatientID(\n      patientID: $patientID\n      clinicianID: $clinicianID\n      sortDirection: $sortDirection\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.syncClinicianPatientMaps =
  "\n  query SyncClinicianPatientMaps(\n    $filter: ModelClinicianPatientMapFilterInput\n    $limit: Int\n    $nextToken: String\n    $lastSync: AWSTimestamp\n  ) {\n    syncClinicianPatientMaps(\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n      lastSync: $lastSync\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.getPatientAssignment =
  "\n  query GetPatientAssignment($patientID: String!, $clinicianID: String!) {\n    getPatientAssignment(patientID: $patientID, clinicianID: $clinicianID) {\n      id\n      patientID\n      clinicianID\n      patientName\n      pending\n      resolution\n      reassignToClinicianID\n      adminCompleted\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n      adminReassignFromClinicianID\n    }\n  }\n";
exports.listPatientAssignments =
  "\n  query ListPatientAssignments(\n    $patientID: String\n    $clinicianID: ModelStringKeyConditionInput\n    $filter: ModelPatientAssignmentFilterInput\n    $limit: Int\n    $nextToken: String\n    $sortDirection: ModelSortDirection\n  ) {\n    listPatientAssignments(\n      patientID: $patientID\n      clinicianID: $clinicianID\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n      sortDirection: $sortDirection\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.listPendingPatientAssignments =
  "\n  query ListPendingPatientAssignments(\n    $clinicianID: String\n    $pending: ModelStringKeyConditionInput\n    $sortDirection: ModelSortDirection\n    $filter: ModelPatientAssignmentFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listPendingPatientAssignments(\n      clinicianID: $clinicianID\n      pending: $pending\n      sortDirection: $sortDirection\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.syncPatientAssignments =
  "\n  query SyncPatientAssignments(\n    $filter: ModelPatientAssignmentFilterInput\n    $limit: Int\n    $nextToken: String\n    $lastSync: AWSTimestamp\n  ) {\n    syncPatientAssignments(\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n      lastSync: $lastSync\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.getAlert =
  "\n  query GetAlert($id: ID!) {\n    getAlert(id: $id) {\n      id\n      patientID\n      patientName\n      dateTime\n      summary\n      colorCode\n      vitalsReportID\n      symptomReportID\n      pending\n      completed\n      owner\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.listAlerts =
  "\n  query ListAlerts(\n    $filter: ModelAlertFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listAlerts(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.listPatientAlertsByDateTime =
  "\n  query ListPatientAlertsByDateTime(\n    $patientID: String\n    $dateTime: ModelStringKeyConditionInput\n    $sortDirection: ModelSortDirection\n    $filter: ModelAlertFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listPatientAlertsByDateTime(\n      patientID: $patientID\n      dateTime: $dateTime\n      sortDirection: $sortDirection\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.listPendingAlertsByDateTime =
  "\n  query ListPendingAlertsByDateTime(\n    $pending: String\n    $dateTime: ModelStringKeyConditionInput\n    $sortDirection: ModelSortDirection\n    $filter: ModelAlertFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listPendingAlertsByDateTime(\n      pending: $pending\n      dateTime: $dateTime\n      sortDirection: $sortDirection\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.listPendingRiskAlerts =
  "\n  query ListPendingRiskAlerts(\n    $pending: String\n    $colorCode: ModelStringKeyConditionInput\n    $sortDirection: ModelSortDirection\n    $filter: ModelAlertFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listPendingRiskAlerts(\n      pending: $pending\n      colorCode: $colorCode\n      sortDirection: $sortDirection\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.listCompletedRiskAlerts =
  "\n  query ListCompletedRiskAlerts(\n    $completed: String\n    $colorCode: ModelStringKeyConditionInput\n    $sortDirection: ModelSortDirection\n    $filter: ModelAlertFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listCompletedRiskAlerts(\n      completed: $completed\n      colorCode: $colorCode\n      sortDirection: $sortDirection\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.syncAlerts =
  "\n  query SyncAlerts(\n    $filter: ModelAlertFilterInput\n    $limit: Int\n    $nextToken: String\n    $lastSync: AWSTimestamp\n  ) {\n    syncAlerts(\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n      lastSync: $lastSync\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.getTodo =
  "\n  query GetTodo($id: ID!) {\n    getTodo(id: $id) {\n      id\n      clinicianID\n      title\n      patientName\n      notes\n      lastModified\n      alertID\n      pending\n      completed\n      owner\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.listTodos =
  "\n  query ListTodos(\n    $filter: ModelTodoFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.listPendingTodosByLastModifiedDate =
  "\n  query ListPendingTodosByLastModifiedDate(\n    $pending: String\n    $lastModified: ModelStringKeyConditionInput\n    $sortDirection: ModelSortDirection\n    $filter: ModelTodoFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listPendingTodosByLastModifiedDate(\n      pending: $pending\n      lastModified: $lastModified\n      sortDirection: $sortDirection\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.listCompletedTodosByLastModifiedDate =
  "\n  query ListCompletedTodosByLastModifiedDate(\n    $completed: String\n    $lastModified: ModelStringKeyConditionInput\n    $sortDirection: ModelSortDirection\n    $filter: ModelTodoFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listCompletedTodosByLastModifiedDate(\n      completed: $completed\n      lastModified: $lastModified\n      sortDirection: $sortDirection\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.listTodosByAlertID =
  "\n  query ListTodosByAlertID(\n    $clinicianID: String\n    $alertID: ModelIDKeyConditionInput\n    $sortDirection: ModelSortDirection\n    $filter: ModelTodoFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listTodosByAlertID(\n      clinicianID: $clinicianID\n      alertID: $alertID\n      sortDirection: $sortDirection\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.syncTodos =
  "\n  query SyncTodos(\n    $filter: ModelTodoFilterInput\n    $limit: Int\n    $nextToken: String\n    $lastSync: AWSTimestamp\n  ) {\n    syncTodos(\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n      lastSync: $lastSync\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.getAlertNotification =
  "\n  query GetAlertNotification($id: ID!) {\n    getAlertNotification(id: $id) {\n      id\n      patientID\n      alertID\n      owner\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.listAlertNotifications =
  "\n  query ListAlertNotifications(\n    $filter: ModelAlertNotificationFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listAlertNotifications(\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.syncAlertNotifications =
  "\n  query SyncAlertNotifications(\n    $filter: ModelAlertNotificationFilterInput\n    $limit: Int\n    $nextToken: String\n    $lastSync: AWSTimestamp\n  ) {\n    syncAlertNotifications(\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n      lastSync: $lastSync\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.getClinicianRecord =
  "\n  query GetClinicianRecord($patientID: String!, $documentID: String!) {\n    getClinicianRecord(patientID: $patientID, documentID: $documentID) {\n      patientID\n      documentID\n      type\n      title\n      path\n      uploaderClinicianID\n      uploadDateTime\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.listClinicianRecords =
  "\n  query ListClinicianRecords(\n    $patientID: String\n    $documentID: ModelStringKeyConditionInput\n    $filter: ModelClinicianRecordFilterInput\n    $limit: Int\n    $nextToken: String\n    $sortDirection: ModelSortDirection\n  ) {\n    listClinicianRecords(\n      patientID: $patientID\n      documentID: $documentID\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n      sortDirection: $sortDirection\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.listUploadedClinicianRecordsByPatientID =
  "\n  query ListUploadedClinicianRecordsByPatientID(\n    $patientID: String\n    $uploadDateTime: ModelStringKeyConditionInput\n    $sortDirection: ModelSortDirection\n    $filter: ModelClinicianRecordFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listUploadedClinicianRecordsByPatientID(\n      patientID: $patientID\n      uploadDateTime: $uploadDateTime\n      sortDirection: $sortDirection\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
exports.syncClinicianRecords =
  "\n  query SyncClinicianRecords(\n    $filter: ModelClinicianRecordFilterInput\n    $limit: Int\n    $nextToken: String\n    $lastSync: AWSTimestamp\n  ) {\n    syncClinicianRecords(\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n      lastSync: $lastSync\n    ) {\n      nextToken\n      startedAt\n    }\n  }\n";
