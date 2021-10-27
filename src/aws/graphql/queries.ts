/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const queryS3ClinicianRecordsBridge = /* GraphQL */ `
  query QueryS3ClinicianRecordsBridge(
    $recordType: String
    $operation: String
    $patientID: String
    $documentID: String
    $documentTitle: String
  ) {
    queryS3ClinicianRecordsBridge(
      recordType: $recordType
      operation: $operation
      patientID: $patientID
      documentID: $documentID
      documentTitle: $documentTitle
    )
  }
`;
export const handlePatientAssignmentResolution = /* GraphQL */ `
  query HandlePatientAssignmentResolution(
    $patientID: String
    $resolution: String
    $reassignToClinicianID: String
  ) {
    handlePatientAssignmentResolution(
      patientID: $patientID
      resolution: $resolution
      reassignToClinicianID: $reassignToClinicianID
    )
  }
`;
export const sharePatientAssignment = /* GraphQL */ `
  query SharePatientAssignment(
    $patientID: String
    $patientName: String
    $shareToClinicianID: String
  ) {
    sharePatientAssignment(
      patientID: $patientID
      patientName: $patientName
      shareToClinicianID: $shareToClinicianID
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
      items {
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
        createdAt
        updatedAt
        owner
      }
      nextToken
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
      items {
        id
        name
        dosage
        frequency
        records
        patientID
        active
        createdAt
        updatedAt
        owner
      }
      nextToken
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
      items {
        id
        name
        dosage
        frequency
        records
        patientID
        active
        createdAt
        updatedAt
        owner
      }
      nextToken
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
      items {
        id
        Actname
        Location
        expectedFrequency
        expectedDays
        expectedDurationMinutes
        recordDateTime
        patientID
        createdAt
        updatedAt
        owner
      }
      nextToken
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
      items {
        id
        Actname
        Location
        expectedFrequency
        expectedDays
        expectedDurationMinutes
        recordDateTime
        patientID
        createdAt
        updatedAt
        owner
      }
      nextToken
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
      createdAt
      updatedAt
      MedicationInfo {
        id
        name
        dosage
        frequency
        records
        patientID
        active
        createdAt
        updatedAt
        owner
      }
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
      items {
        id
        MedId
        Verification
        Date
        patientID
        createdAt
        updatedAt
        owner
      }
      nextToken
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
      items {
        id
        MedId
        Verification
        Date
        patientID
        createdAt
        updatedAt
        owner
      }
      nextToken
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
      items {
        id
        MedId
        Verification
        Date
        patientID
        createdAt
        updatedAt
        owner
      }
      nextToken
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
      createdAt
      updatedAt
      ActivityInfo {
        id
        Actname
        Location
        expectedFrequency
        expectedDays
        expectedDurationMinutes
        recordDateTime
        patientID
        createdAt
        updatedAt
        owner
      }
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
      items {
        id
        ActId
        Name
        Severity
        DateTime
        Summary
        patientID
        createdAt
        updatedAt
        owner
      }
      nextToken
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
      items {
        id
        ActId
        Name
        Severity
        DateTime
        Summary
        patientID
        createdAt
        updatedAt
        owner
      }
      nextToken
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
      items {
        id
        ActId
        Name
        Severity
        DateTime
        Summary
        patientID
        createdAt
        updatedAt
        owner
      }
      nextToken
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
      items {
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
        createdAt
        updatedAt
        owner
      }
      nextToken
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
      items {
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
        createdAt
        updatedAt
        owner
      }
      nextToken
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
      items {
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
        createdAt
        updatedAt
        owner
      }
      nextToken
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
      createdAt
      updatedAt
      protectedInfo {
        id
        clinicianID
        facts
        APS
        DTA
        UXSA
        NWA
        ALA
        MHA
        CAM
        createdAt
        updatedAt
      }
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
      items {
        id
        clinicianID
        name
        hospitalName
        role
        contactNumber
        createdAt
        updatedAt
      }
      nextToken
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
      CAM
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
      items {
        id
        clinicianID
        facts
        APS
        DTA
        UXSA
        NWA
        ALA
        MHA
        CAM
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getClinicianPatientMap = /* GraphQL */ `
  query GetClinicianPatientMap($clinicianID: String!, $patientID: String!) {
    getClinicianPatientMap(clinicianID: $clinicianID, patientID: $patientID) {
      id
      clinicianID
      patientID
      createdAt
      updatedAt
      clinicianInfo {
        id
        clinicianID
        name
        hospitalName
        role
        contactNumber
        createdAt
        updatedAt
      }
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
      items {
        id
        clinicianID
        patientID
        createdAt
        updatedAt
      }
      nextToken
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
      items {
        id
        clinicianID
        patientID
        createdAt
        updatedAt
      }
      nextToken
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
      sourceClinicianID
      createdAt
      updatedAt
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
      items {
        id
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
      nextToken
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
      items {
        id
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
      nextToken
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
      triageValue
      vitalsReportID
      symptomReportID
      pending
      completed
      owner
      createdAt
      updatedAt
      symptomReport {
        id
        ActId
        Name
        Severity
        DateTime
        Summary
        patientID
        createdAt
        updatedAt
        owner
      }
      vitalsReport {
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
        createdAt
        updatedAt
        owner
      }
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
      items {
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
        owner
        createdAt
        updatedAt
      }
      nextToken
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
      items {
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
        owner
        createdAt
        updatedAt
      }
      nextToken
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
      items {
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
        owner
        createdAt
        updatedAt
      }
      nextToken
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
      items {
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
        owner
        createdAt
        updatedAt
      }
      nextToken
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
      items {
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
        owner
        createdAt
        updatedAt
      }
      nextToken
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
        owner
        createdAt
        updatedAt
      }
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
      items {
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
        createdAt
        updatedAt
      }
      nextToken
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
      items {
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
        createdAt
        updatedAt
      }
      nextToken
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
      items {
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
        createdAt
        updatedAt
      }
      nextToken
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
      items {
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
        createdAt
        updatedAt
      }
      nextToken
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
      items {
        id
        patientID
        alertID
        owner
        createdAt
        updatedAt
      }
      nextToken
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
      createdAt
      updatedAt
      owner
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
      items {
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
      nextToken
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
      items {
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
      nextToken
    }
  }
`;
