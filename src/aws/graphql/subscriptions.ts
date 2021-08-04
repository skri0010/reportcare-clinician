/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePatientInfo = /* GraphQL */ `
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
export const onUpdatePatientInfo = /* GraphQL */ `
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
export const onDeletePatientInfo = /* GraphQL */ `
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
export const onCreateMedicationInfo = /* GraphQL */ `
  subscription OnCreateMedicationInfo($owner: String) {
    onCreateMedicationInfo(owner: $owner) {
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
export const onUpdateMedicationInfo = /* GraphQL */ `
  subscription OnUpdateMedicationInfo($owner: String) {
    onUpdateMedicationInfo(owner: $owner) {
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
export const onDeleteMedicationInfo = /* GraphQL */ `
  subscription OnDeleteMedicationInfo($owner: String) {
    onDeleteMedicationInfo(owner: $owner) {
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
export const onCreateActivityInfo = /* GraphQL */ `
  subscription OnCreateActivityInfo($owner: String) {
    onCreateActivityInfo(owner: $owner) {
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
export const onUpdateActivityInfo = /* GraphQL */ `
  subscription OnUpdateActivityInfo($owner: String) {
    onUpdateActivityInfo(owner: $owner) {
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
export const onDeleteActivityInfo = /* GraphQL */ `
  subscription OnDeleteActivityInfo($owner: String) {
    onDeleteActivityInfo(owner: $owner) {
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
export const onCreateMedCompliant = /* GraphQL */ `
  subscription OnCreateMedCompliant($owner: String) {
    onCreateMedCompliant(owner: $owner) {
      id
      MedId
      MedicationInfo {
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
export const onUpdateMedCompliant = /* GraphQL */ `
  subscription OnUpdateMedCompliant($owner: String) {
    onUpdateMedCompliant(owner: $owner) {
      id
      MedId
      MedicationInfo {
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
export const onDeleteMedCompliant = /* GraphQL */ `
  subscription OnDeleteMedCompliant($owner: String) {
    onDeleteMedCompliant(owner: $owner) {
      id
      MedId
      MedicationInfo {
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
export const onCreateReportSymptom = /* GraphQL */ `
  subscription OnCreateReportSymptom($owner: String) {
    onCreateReportSymptom(owner: $owner) {
      id
      ActId
      ActivityInfo {
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
export const onUpdateReportSymptom = /* GraphQL */ `
  subscription OnUpdateReportSymptom($owner: String) {
    onUpdateReportSymptom(owner: $owner) {
      id
      ActId
      ActivityInfo {
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
export const onDeleteReportSymptom = /* GraphQL */ `
  subscription OnDeleteReportSymptom($owner: String) {
    onDeleteReportSymptom(owner: $owner) {
      id
      ActId
      ActivityInfo {
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
export const onCreateReportVitals = /* GraphQL */ `
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
export const onUpdateReportVitals = /* GraphQL */ `
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
export const onDeleteReportVitals = /* GraphQL */ `
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
export const onCreateClinicianInfo = /* GraphQL */ `
  subscription OnCreateClinicianInfo($owner: String) {
    onCreateClinicianInfo(owner: $owner) {
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
export const onUpdateClinicianInfo = /* GraphQL */ `
  subscription OnUpdateClinicianInfo($owner: String) {
    onUpdateClinicianInfo(owner: $owner) {
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
export const onDeleteClinicianInfo = /* GraphQL */ `
  subscription OnDeleteClinicianInfo($owner: String) {
    onDeleteClinicianInfo(owner: $owner) {
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
export const onCreateClinicianProtectedInfo = /* GraphQL */ `
  subscription OnCreateClinicianProtectedInfo($owner: String) {
    onCreateClinicianProtectedInfo(owner: $owner) {
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
export const onUpdateClinicianProtectedInfo = /* GraphQL */ `
  subscription OnUpdateClinicianProtectedInfo($owner: String) {
    onUpdateClinicianProtectedInfo(owner: $owner) {
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
export const onDeleteClinicianProtectedInfo = /* GraphQL */ `
  subscription OnDeleteClinicianProtectedInfo($owner: String) {
    onDeleteClinicianProtectedInfo(owner: $owner) {
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
export const onCreateClinicianPatientMap = /* GraphQL */ `
  subscription OnCreateClinicianPatientMap($owner: String, $patientID: String) {
    onCreateClinicianPatientMap(owner: $owner, patientID: $patientID) {
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
export const onUpdateClinicianPatientMap = /* GraphQL */ `
  subscription OnUpdateClinicianPatientMap($owner: String, $patientID: String) {
    onUpdateClinicianPatientMap(owner: $owner, patientID: $patientID) {
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
export const onDeleteClinicianPatientMap = /* GraphQL */ `
  subscription OnDeleteClinicianPatientMap($owner: String, $patientID: String) {
    onDeleteClinicianPatientMap(owner: $owner, patientID: $patientID) {
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
export const onCreatePatientAssignment = /* GraphQL */ `
  subscription OnCreatePatientAssignment($owner: String, $clinicianID: String) {
    onCreatePatientAssignment(owner: $owner, clinicianID: $clinicianID) {
      id
      patientID
      clinicianID
      pending
      resolution
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdatePatientAssignment = /* GraphQL */ `
  subscription OnUpdatePatientAssignment($owner: String, $clinicianID: String) {
    onUpdatePatientAssignment(owner: $owner, clinicianID: $clinicianID) {
      id
      patientID
      clinicianID
      pending
      resolution
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeletePatientAssignment = /* GraphQL */ `
  subscription OnDeletePatientAssignment($owner: String, $clinicianID: String) {
    onDeletePatientAssignment(owner: $owner, clinicianID: $clinicianID) {
      id
      patientID
      clinicianID
      pending
      resolution
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateAlert = /* GraphQL */ `
  subscription OnCreateAlert($owner: String) {
    onCreateAlert(owner: $owner) {
      id
      patientID
      dateTime
      summary
      colorCode
      vitalsReportID
      vitalsReport {
        id
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
      symptomReportID
      symptomReport {
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
export const onUpdateAlert = /* GraphQL */ `
  subscription OnUpdateAlert($owner: String) {
    onUpdateAlert(owner: $owner) {
      id
      patientID
      dateTime
      summary
      colorCode
      vitalsReportID
      vitalsReport {
        id
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
      symptomReportID
      symptomReport {
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
export const onDeleteAlert = /* GraphQL */ `
  subscription OnDeleteAlert($owner: String) {
    onDeleteAlert(owner: $owner) {
      id
      patientID
      dateTime
      summary
      colorCode
      vitalsReportID
      vitalsReport {
        id
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
      symptomReportID
      symptomReport {
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
export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($owner: String) {
    onCreateTodo(owner: $owner) {
      id
      clinicianID
      title
      notes
      lastModified
      alertID
      alert {
        id
        patientID
        dateTime
        summary
        colorCode
        vitalsReportID
        symptomReportID
        completed
        owner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
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
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($owner: String) {
    onUpdateTodo(owner: $owner) {
      id
      clinicianID
      title
      notes
      lastModified
      alertID
      alert {
        id
        patientID
        dateTime
        summary
        colorCode
        vitalsReportID
        symptomReportID
        completed
        owner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
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
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($owner: String) {
    onDeleteTodo(owner: $owner) {
      id
      clinicianID
      title
      notes
      lastModified
      alertID
      alert {
        id
        patientID
        dateTime
        summary
        colorCode
        vitalsReportID
        symptomReportID
        completed
        owner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
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
