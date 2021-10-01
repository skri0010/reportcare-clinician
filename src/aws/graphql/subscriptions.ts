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
export const onCreateMedicationInfo = /* GraphQL */ `
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
export const onUpdateMedicationInfo = /* GraphQL */ `
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
export const onDeleteMedicationInfo = /* GraphQL */ `
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
export const onCreateActivityInfo = /* GraphQL */ `
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
export const onUpdateActivityInfo = /* GraphQL */ `
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
export const onDeleteActivityInfo = /* GraphQL */ `
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
export const onCreateMedCompliant = /* GraphQL */ `
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
      MedicationInfo {
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
      owner
    }
  }
`;
export const onUpdateMedCompliant = /* GraphQL */ `
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
      MedicationInfo {
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
      owner
    }
  }
`;
export const onDeleteMedCompliant = /* GraphQL */ `
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
      MedicationInfo {
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
      owner
    }
  }
`;
export const onCreateReportSymptom = /* GraphQL */ `
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
      ActivityInfo {
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
      owner
    }
  }
`;
export const onUpdateReportSymptom = /* GraphQL */ `
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
      ActivityInfo {
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
      owner
    }
  }
`;
export const onDeleteReportSymptom = /* GraphQL */ `
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
      ActivityInfo {
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
export const onCreateMedicalRecord = /* GraphQL */ `
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
export const onUpdateMedicalRecord = /* GraphQL */ `
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
export const onDeleteMedicalRecord = /* GraphQL */ `
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
export const onCreateIcdCrtRecord = /* GraphQL */ `
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
export const onUpdateIcdCrtRecord = /* GraphQL */ `
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
export const onDeleteIcdCrtRecord = /* GraphQL */ `
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
export const onCreateClinicianInfo = /* GraphQL */ `
  subscription OnCreateClinicianInfo($clinicianID: String) {
    onCreateClinicianInfo(clinicianID: $clinicianID) {
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  }
`;
export const onUpdateClinicianInfo = /* GraphQL */ `
  subscription OnUpdateClinicianInfo($clinicianID: String) {
    onUpdateClinicianInfo(clinicianID: $clinicianID) {
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  }
`;
export const onDeleteClinicianInfo = /* GraphQL */ `
  subscription OnDeleteClinicianInfo($clinicianID: String) {
    onDeleteClinicianInfo(clinicianID: $clinicianID) {
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  }
`;
export const onCreateClinicianProtectedInfo = /* GraphQL */ `
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
export const onUpdateClinicianProtectedInfo = /* GraphQL */ `
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
export const onDeleteClinicianProtectedInfo = /* GraphQL */ `
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
export const onCreateClinicianPatientMap = /* GraphQL */ `
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
      clinicianInfo {
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
      id
      clinicianID
      patientID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      clinicianInfo {
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
      id
      clinicianID
      patientID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      clinicianInfo {
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
      id
      patientID
      clinicianID
      patientName
      pending
      resolution
      reassignToClinicianID
      adminReassignFromClinicianID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      adminCompleted
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
      id
      patientID
      clinicianID
      patientName
      pending
      resolution
      reassignToClinicianID
      adminReassignFromClinicianID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      adminCompleted
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
      id
      patientID
      clinicianID
      patientName
      pending
      resolution
      reassignToClinicianID
      adminReassignFromClinicianID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      adminCompleted
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
      symptomReport {
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
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
      symptomReport {
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
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
      symptomReport {
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
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
      owner
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      alert {
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
      owner
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      alert {
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
      owner
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      alert {
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
  }
`;
export const onCreateAlertNotification = /* GraphQL */ `
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
export const onUpdateAlertNotification = /* GraphQL */ `
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
export const onDeleteAlertNotification = /* GraphQL */ `
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
