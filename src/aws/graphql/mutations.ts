/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPatientInfo = /* GraphQL */ `
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
export const updatePatientInfo = /* GraphQL */ `
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
export const deletePatientInfo = /* GraphQL */ `
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
export const createMedicationInfo = /* GraphQL */ `
  mutation CreateMedicationInfo(
    $input: CreateMedicationInfoInput!
    $condition: ModelMedicationInfoConditionInput
  ) {
    createMedicationInfo(input: $input, condition: $condition) {
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
export const updateMedicationInfo = /* GraphQL */ `
  mutation UpdateMedicationInfo(
    $input: UpdateMedicationInfoInput!
    $condition: ModelMedicationInfoConditionInput
  ) {
    updateMedicationInfo(input: $input, condition: $condition) {
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
export const deleteMedicationInfo = /* GraphQL */ `
  mutation DeleteMedicationInfo(
    $input: DeleteMedicationInfoInput!
    $condition: ModelMedicationInfoConditionInput
  ) {
    deleteMedicationInfo(input: $input, condition: $condition) {
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
export const createActivityInfo = /* GraphQL */ `
  mutation CreateActivityInfo(
    $input: CreateActivityInfoInput!
    $condition: ModelActivityInfoConditionInput
  ) {
    createActivityInfo(input: $input, condition: $condition) {
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
export const updateActivityInfo = /* GraphQL */ `
  mutation UpdateActivityInfo(
    $input: UpdateActivityInfoInput!
    $condition: ModelActivityInfoConditionInput
  ) {
    updateActivityInfo(input: $input, condition: $condition) {
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
export const deleteActivityInfo = /* GraphQL */ `
  mutation DeleteActivityInfo(
    $input: DeleteActivityInfoInput!
    $condition: ModelActivityInfoConditionInput
  ) {
    deleteActivityInfo(input: $input, condition: $condition) {
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
export const createMedCompliant = /* GraphQL */ `
  mutation CreateMedCompliant(
    $input: CreateMedCompliantInput!
    $condition: ModelMedCompliantConditionInput
  ) {
    createMedCompliant(input: $input, condition: $condition) {
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
export const updateMedCompliant = /* GraphQL */ `
  mutation UpdateMedCompliant(
    $input: UpdateMedCompliantInput!
    $condition: ModelMedCompliantConditionInput
  ) {
    updateMedCompliant(input: $input, condition: $condition) {
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
export const deleteMedCompliant = /* GraphQL */ `
  mutation DeleteMedCompliant(
    $input: DeleteMedCompliantInput!
    $condition: ModelMedCompliantConditionInput
  ) {
    deleteMedCompliant(input: $input, condition: $condition) {
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
export const createReportSymptom = /* GraphQL */ `
  mutation CreateReportSymptom(
    $input: CreateReportSymptomInput!
    $condition: ModelReportSymptomConditionInput
  ) {
    createReportSymptom(input: $input, condition: $condition) {
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
export const updateReportSymptom = /* GraphQL */ `
  mutation UpdateReportSymptom(
    $input: UpdateReportSymptomInput!
    $condition: ModelReportSymptomConditionInput
  ) {
    updateReportSymptom(input: $input, condition: $condition) {
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
export const deleteReportSymptom = /* GraphQL */ `
  mutation DeleteReportSymptom(
    $input: DeleteReportSymptomInput!
    $condition: ModelReportSymptomConditionInput
  ) {
    deleteReportSymptom(input: $input, condition: $condition) {
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
export const createReportVitals = /* GraphQL */ `
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
export const updateReportVitals = /* GraphQL */ `
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
export const deleteReportVitals = /* GraphQL */ `
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
export const createClinicianInfo = /* GraphQL */ `
  mutation CreateClinicianInfo(
    $input: CreateClinicianInfoInput!
    $condition: ModelClinicianInfoConditionInput
  ) {
    createClinicianInfo(input: $input, condition: $condition) {
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
export const updateClinicianInfo = /* GraphQL */ `
  mutation UpdateClinicianInfo(
    $input: UpdateClinicianInfoInput!
    $condition: ModelClinicianInfoConditionInput
  ) {
    updateClinicianInfo(input: $input, condition: $condition) {
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
export const deleteClinicianInfo = /* GraphQL */ `
  mutation DeleteClinicianInfo(
    $input: DeleteClinicianInfoInput!
    $condition: ModelClinicianInfoConditionInput
  ) {
    deleteClinicianInfo(input: $input, condition: $condition) {
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
export const createClinicianProtectedInfo = /* GraphQL */ `
  mutation CreateClinicianProtectedInfo(
    $input: CreateClinicianProtectedInfoInput!
    $condition: ModelClinicianProtectedInfoConditionInput
  ) {
    createClinicianProtectedInfo(input: $input, condition: $condition) {
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
export const updateClinicianProtectedInfo = /* GraphQL */ `
  mutation UpdateClinicianProtectedInfo(
    $input: UpdateClinicianProtectedInfoInput!
    $condition: ModelClinicianProtectedInfoConditionInput
  ) {
    updateClinicianProtectedInfo(input: $input, condition: $condition) {
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
export const deleteClinicianProtectedInfo = /* GraphQL */ `
  mutation DeleteClinicianProtectedInfo(
    $input: DeleteClinicianProtectedInfoInput!
    $condition: ModelClinicianProtectedInfoConditionInput
  ) {
    deleteClinicianProtectedInfo(input: $input, condition: $condition) {
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
export const createClinicianPatientMap = /* GraphQL */ `
  mutation CreateClinicianPatientMap(
    $input: CreateClinicianPatientMapInput!
    $condition: ModelClinicianPatientMapConditionInput
  ) {
    createClinicianPatientMap(input: $input, condition: $condition) {
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
export const updateClinicianPatientMap = /* GraphQL */ `
  mutation UpdateClinicianPatientMap(
    $input: UpdateClinicianPatientMapInput!
    $condition: ModelClinicianPatientMapConditionInput
  ) {
    updateClinicianPatientMap(input: $input, condition: $condition) {
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
export const deleteClinicianPatientMap = /* GraphQL */ `
  mutation DeleteClinicianPatientMap(
    $input: DeleteClinicianPatientMapInput!
    $condition: ModelClinicianPatientMapConditionInput
  ) {
    deleteClinicianPatientMap(input: $input, condition: $condition) {
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
export const createPatientAssignment = /* GraphQL */ `
  mutation CreatePatientAssignment(
    $input: CreatePatientAssignmentInput!
    $condition: ModelPatientAssignmentConditionInput
  ) {
    createPatientAssignment(input: $input, condition: $condition) {
      id
      patientID
      clinicianID
      pending
      resolution
      patientName
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updatePatientAssignment = /* GraphQL */ `
  mutation UpdatePatientAssignment(
    $input: UpdatePatientAssignmentInput!
    $condition: ModelPatientAssignmentConditionInput
  ) {
    updatePatientAssignment(input: $input, condition: $condition) {
      id
      patientID
      clinicianID
      pending
      resolution
      patientName
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deletePatientAssignment = /* GraphQL */ `
  mutation DeletePatientAssignment(
    $input: DeletePatientAssignmentInput!
    $condition: ModelPatientAssignmentConditionInput
  ) {
    deletePatientAssignment(input: $input, condition: $condition) {
      id
      patientID
      clinicianID
      pending
      resolution
      patientName
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
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
