/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
        patientID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const getPatientInfo = /* GraphQL */ `
  query GetPatientInfo($id: ID!) {
    getPatientInfo(id: $id) {
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
    $filter: ModelPatientInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPatientInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        patientID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
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
      items {
        id
        medname
        dosage
        patientID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const getMedicationInfo = /* GraphQL */ `
  query GetMedicationInfo($id: ID!) {
    getMedicationInfo(id: $id) {
      id
      medname
      dosage
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
export const listMedicationInfos = /* GraphQL */ `
  query ListMedicationInfos(
    $filter: ModelMedicationInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMedicationInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        medname
        dosage
        patientID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
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
      items {
        id
        Actname
        Location
        Frequency
        Days
        time
        patientID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
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
      Frequency
      Days
      time
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
      items {
        id
        Actname
        Location
        Frequency
        Days
        time
        patientID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
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
      items {
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
      items {
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
      items {
        id
        ActId
        Name
        Severity
        DateTime
        patientID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
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
      items {
        id
        ActId
        Name
        Severity
        DateTime
        patientID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
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
      items {
        id
        SymptomId
        Temperature
        Humidity
        Weight
        BPSys
        BPDi
        NoSteps
        OxySat
        DateTime
        patientID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const getReportVitals = /* GraphQL */ `
  query GetReportVitals($id: ID!) {
    getReportVitals(id: $id) {
      id
      SymptomId
      Temperature
      Humidity
      Weight
      BPSys
      BPDi
      NoSteps
      OxySat
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
      items {
        id
        SymptomId
        Temperature
        Humidity
        Weight
        BPSys
        BPDi
        NoSteps
        OxySat
        DateTime
        patientID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
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
      items {
        id
        name
        hospitalName
        role
        clinicianID
        owner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getClinicianInfo = /* GraphQL */ `
  query GetClinicianInfo($clinicianID: String!) {
    getClinicianInfo(clinicianID: $clinicianID) {
      id
      name
      hospitalName
      role
      clinicianID
      protectedInfo {
        id
        facts
        APS
        DTA
        UXSA
        NWA
        ALA
        MHA
        clinicianID
        owner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      owner
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
      items {
        id
        name
        hospitalName
        role
        clinicianID
        owner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
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
      items {
        id
        facts
        APS
        DTA
        UXSA
        NWA
        ALA
        MHA
        clinicianID
        owner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getClinicianProtectedInfo = /* GraphQL */ `
  query GetClinicianProtectedInfo($clinicianID: String!) {
    getClinicianProtectedInfo(clinicianID: $clinicianID) {
      id
      facts
      APS
      DTA
      UXSA
      NWA
      ALA
      MHA
      clinicianID
      owner
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
      items {
        id
        facts
        APS
        DTA
        UXSA
        NWA
        ALA
        MHA
        clinicianID
        owner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
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
      items {
        id
        clinicianID
        patientID
        owner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
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
      clinicianInfo {
        id
        name
        hospitalName
        role
        clinicianID
        owner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      owner
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
      items {
        id
        clinicianID
        patientID
        owner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
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
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const clinicianIDsByPatientID = /* GraphQL */ `
  query ClinicianIDsByPatientID(
    $patientID: String
    $clinicianID: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelClinicianPatientMapFilterInput
    $limit: Int
    $nextToken: String
  ) {
    clinicianIDsByPatientID(
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
        owner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
