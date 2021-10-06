"use strict";
/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten
exports.__esModule = true;
exports.onDeleteClinicianRecord =
  exports.onUpdateClinicianRecord =
  exports.onCreateClinicianRecord =
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
exports.onCreatePatientInfo =
  "\n  subscription OnCreatePatientInfo($owner: String) {\n    onCreatePatientInfo(owner: $owner) {\n      id\n      name\n      address\n      deviceNo\n      diagnosisInfo\n      NHYAclass\n      cardiologist\n      hospitalName\n      hospitalLocation\n      targetWeight\n      targetActivity\n      riskLevel\n      gender\n      birthDate\n      language\n      phoneNumber\n      email\n      emergencyContactName\n      emergencyContactNumber\n      fluidIntakeGoal\n      configured\n      patientID\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n      owner\n    }\n  }\n";
exports.onUpdatePatientInfo =
  "\n  subscription OnUpdatePatientInfo($owner: String) {\n    onUpdatePatientInfo(owner: $owner) {\n      id\n      name\n      address\n      deviceNo\n      diagnosisInfo\n      NHYAclass\n      cardiologist\n      hospitalName\n      hospitalLocation\n      targetWeight\n      targetActivity\n      riskLevel\n      gender\n      birthDate\n      language\n      phoneNumber\n      email\n      emergencyContactName\n      emergencyContactNumber\n      fluidIntakeGoal\n      configured\n      patientID\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n      owner\n    }\n  }\n";
exports.onDeletePatientInfo =
  "\n  subscription OnDeletePatientInfo($owner: String) {\n    onDeletePatientInfo(owner: $owner) {\n      id\n      name\n      address\n      deviceNo\n      diagnosisInfo\n      NHYAclass\n      cardiologist\n      hospitalName\n      hospitalLocation\n      targetWeight\n      targetActivity\n      riskLevel\n      gender\n      birthDate\n      language\n      phoneNumber\n      email\n      emergencyContactName\n      emergencyContactNumber\n      fluidIntakeGoal\n      configured\n      patientID\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n      owner\n    }\n  }\n";
exports.onCreateMedicationInfo =
  "\n  subscription OnCreateMedicationInfo($owner: String, $patientID: String) {\n    onCreateMedicationInfo(owner: $owner, patientID: $patientID) {\n      id\n      name\n      dosage\n      frequency\n      records\n      patientID\n      active\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n      owner\n    }\n  }\n";
exports.onUpdateMedicationInfo =
  "\n  subscription OnUpdateMedicationInfo($owner: String, $patientID: String) {\n    onUpdateMedicationInfo(owner: $owner, patientID: $patientID) {\n      id\n      name\n      dosage\n      frequency\n      records\n      patientID\n      active\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n      owner\n    }\n  }\n";
exports.onDeleteMedicationInfo =
  "\n  subscription OnDeleteMedicationInfo($owner: String, $patientID: String) {\n    onDeleteMedicationInfo(owner: $owner, patientID: $patientID) {\n      id\n      name\n      dosage\n      frequency\n      records\n      patientID\n      active\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n      owner\n    }\n  }\n";
exports.onCreateActivityInfo =
  "\n  subscription OnCreateActivityInfo($owner: String) {\n    onCreateActivityInfo(owner: $owner) {\n      id\n      Actname\n      Location\n      expectedFrequency\n      expectedDays\n      expectedDurationMinutes\n      recordDateTime\n      patientID\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n      owner\n    }\n  }\n";
exports.onUpdateActivityInfo =
  "\n  subscription OnUpdateActivityInfo($owner: String) {\n    onUpdateActivityInfo(owner: $owner) {\n      id\n      Actname\n      Location\n      expectedFrequency\n      expectedDays\n      expectedDurationMinutes\n      recordDateTime\n      patientID\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n      owner\n    }\n  }\n";
exports.onDeleteActivityInfo =
  "\n  subscription OnDeleteActivityInfo($owner: String) {\n    onDeleteActivityInfo(owner: $owner) {\n      id\n      Actname\n      Location\n      expectedFrequency\n      expectedDays\n      expectedDurationMinutes\n      recordDateTime\n      patientID\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n      owner\n    }\n  }\n";
exports.onCreateMedCompliant =
  "\n  subscription OnCreateMedCompliant($owner: String) {\n    onCreateMedCompliant(owner: $owner) {\n      id\n      MedId\n      Verification\n      Date\n      patientID\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n      owner\n    }\n  }\n";
exports.onUpdateMedCompliant =
  "\n  subscription OnUpdateMedCompliant($owner: String) {\n    onUpdateMedCompliant(owner: $owner) {\n      id\n      MedId\n      Verification\n      Date\n      patientID\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n      owner\n    }\n  }\n";
exports.onDeleteMedCompliant =
  "\n  subscription OnDeleteMedCompliant($owner: String) {\n    onDeleteMedCompliant(owner: $owner) {\n      id\n      MedId\n      Verification\n      Date\n      patientID\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n      owner\n    }\n  }\n";
exports.onCreateReportSymptom =
  "\n  subscription OnCreateReportSymptom($owner: String) {\n    onCreateReportSymptom(owner: $owner) {\n      id\n      ActId\n      Name\n      Severity\n      DateTime\n      Summary\n      patientID\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n      owner\n    }\n  }\n";
exports.onUpdateReportSymptom =
  "\n  subscription OnUpdateReportSymptom($owner: String) {\n    onUpdateReportSymptom(owner: $owner) {\n      id\n      ActId\n      Name\n      Severity\n      DateTime\n      Summary\n      patientID\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n      owner\n    }\n  }\n";
exports.onDeleteReportSymptom =
  "\n  subscription OnDeleteReportSymptom($owner: String) {\n    onDeleteReportSymptom(owner: $owner) {\n      id\n      ActId\n      Name\n      Severity\n      DateTime\n      Summary\n      patientID\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n      owner\n    }\n  }\n";
exports.onCreateReportVitals =
  "\n  subscription OnCreateReportVitals($owner: String) {\n    onCreateReportVitals(owner: $owner) {\n      id\n      Temperature\n      Humidity\n      Weight\n      BPSys\n      BPDi\n      NoSteps\n      OxySat\n      FluidIntake\n      DateTime\n      patientID\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n      owner\n    }\n  }\n";
exports.onUpdateReportVitals =
  "\n  subscription OnUpdateReportVitals($owner: String) {\n    onUpdateReportVitals(owner: $owner) {\n      id\n      Temperature\n      Humidity\n      Weight\n      BPSys\n      BPDi\n      NoSteps\n      OxySat\n      FluidIntake\n      DateTime\n      patientID\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n      owner\n    }\n  }\n";
exports.onDeleteReportVitals =
  "\n  subscription OnDeleteReportVitals($owner: String) {\n    onDeleteReportVitals(owner: $owner) {\n      id\n      Temperature\n      Humidity\n      Weight\n      BPSys\n      BPDi\n      NoSteps\n      OxySat\n      FluidIntake\n      DateTime\n      patientID\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n      owner\n    }\n  }\n";
exports.onCreateMedicalRecord =
  "\n  subscription OnCreateMedicalRecord($clinicianID: String) {\n    onCreateMedicalRecord(clinicianID: $clinicianID) {\n      id\n      patientID\n      clinicianID\n      title\n      fileKey\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.onUpdateMedicalRecord =
  "\n  subscription OnUpdateMedicalRecord($clinicianID: String) {\n    onUpdateMedicalRecord(clinicianID: $clinicianID) {\n      id\n      patientID\n      clinicianID\n      title\n      fileKey\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.onDeleteMedicalRecord =
  "\n  subscription OnDeleteMedicalRecord($clinicianID: String) {\n    onDeleteMedicalRecord(clinicianID: $clinicianID) {\n      id\n      patientID\n      clinicianID\n      title\n      fileKey\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.onCreateIcdCrtRecord =
  "\n  subscription OnCreateIcdCrtRecord($clinicianID: String) {\n    onCreateIcdCrtRecord(clinicianID: $clinicianID) {\n      id\n      patientID\n      clinicianID\n      title\n      dateTime\n      fileKey\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.onUpdateIcdCrtRecord =
  "\n  subscription OnUpdateIcdCrtRecord($clinicianID: String) {\n    onUpdateIcdCrtRecord(clinicianID: $clinicianID) {\n      id\n      patientID\n      clinicianID\n      title\n      dateTime\n      fileKey\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.onDeleteIcdCrtRecord =
  "\n  subscription OnDeleteIcdCrtRecord($clinicianID: String) {\n    onDeleteIcdCrtRecord(clinicianID: $clinicianID) {\n      id\n      patientID\n      clinicianID\n      title\n      dateTime\n      fileKey\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.onCreateClinicianInfo =
  "\n  subscription OnCreateClinicianInfo($clinicianID: String) {\n    onCreateClinicianInfo(clinicianID: $clinicianID) {\n      id\n      clinicianID\n      name\n      hospitalName\n      role\n      contactNumber\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.onUpdateClinicianInfo =
  "\n  subscription OnUpdateClinicianInfo($clinicianID: String) {\n    onUpdateClinicianInfo(clinicianID: $clinicianID) {\n      id\n      clinicianID\n      name\n      hospitalName\n      role\n      contactNumber\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.onDeleteClinicianInfo =
  "\n  subscription OnDeleteClinicianInfo($clinicianID: String) {\n    onDeleteClinicianInfo(clinicianID: $clinicianID) {\n      id\n      clinicianID\n      name\n      hospitalName\n      role\n      contactNumber\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.onCreateClinicianProtectedInfo =
  "\n  subscription OnCreateClinicianProtectedInfo($clinicianID: String) {\n    onCreateClinicianProtectedInfo(clinicianID: $clinicianID) {\n      id\n      clinicianID\n      facts\n      APS\n      DTA\n      UXSA\n      NWA\n      ALA\n      MHA\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.onUpdateClinicianProtectedInfo =
  "\n  subscription OnUpdateClinicianProtectedInfo($clinicianID: String) {\n    onUpdateClinicianProtectedInfo(clinicianID: $clinicianID) {\n      id\n      clinicianID\n      facts\n      APS\n      DTA\n      UXSA\n      NWA\n      ALA\n      MHA\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.onDeleteClinicianProtectedInfo =
  "\n  subscription OnDeleteClinicianProtectedInfo($clinicianID: String) {\n    onDeleteClinicianProtectedInfo(clinicianID: $clinicianID) {\n      id\n      clinicianID\n      facts\n      APS\n      DTA\n      UXSA\n      NWA\n      ALA\n      MHA\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.onCreateClinicianPatientMap =
  "\n  subscription OnCreateClinicianPatientMap(\n    $clinicianID: String\n    $patientID: String\n  ) {\n    onCreateClinicianPatientMap(\n      clinicianID: $clinicianID\n      patientID: $patientID\n    ) {\n      id\n      clinicianID\n      patientID\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.onUpdateClinicianPatientMap =
  "\n  subscription OnUpdateClinicianPatientMap(\n    $clinicianID: String\n    $patientID: String\n  ) {\n    onUpdateClinicianPatientMap(\n      clinicianID: $clinicianID\n      patientID: $patientID\n    ) {\n      id\n      clinicianID\n      patientID\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.onDeleteClinicianPatientMap =
  "\n  subscription OnDeleteClinicianPatientMap(\n    $clinicianID: String\n    $patientID: String\n  ) {\n    onDeleteClinicianPatientMap(\n      clinicianID: $clinicianID\n      patientID: $patientID\n    ) {\n      id\n      clinicianID\n      patientID\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.onCreatePatientAssignment =
  "\n  subscription OnCreatePatientAssignment(\n    $patientID: String\n    $clinicianID: String\n  ) {\n    onCreatePatientAssignment(\n      patientID: $patientID\n      clinicianID: $clinicianID\n    ) {\n      id\n      patientID\n      clinicianID\n      patientName\n      pending\n      resolution\n      reassignToClinicianID\n      adminCompleted\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n      adminReassignFromClinicianID\n    }\n  }\n";
exports.onUpdatePatientAssignment =
  "\n  subscription OnUpdatePatientAssignment(\n    $patientID: String\n    $clinicianID: String\n  ) {\n    onUpdatePatientAssignment(\n      patientID: $patientID\n      clinicianID: $clinicianID\n    ) {\n      id\n      patientID\n      clinicianID\n      patientName\n      pending\n      resolution\n      reassignToClinicianID\n      adminCompleted\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n      adminReassignFromClinicianID\n    }\n  }\n";
exports.onDeletePatientAssignment =
  "\n  subscription OnDeletePatientAssignment(\n    $patientID: String\n    $clinicianID: String\n  ) {\n    onDeletePatientAssignment(\n      patientID: $patientID\n      clinicianID: $clinicianID\n    ) {\n      id\n      patientID\n      clinicianID\n      patientName\n      pending\n      resolution\n      reassignToClinicianID\n      adminCompleted\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n      adminReassignFromClinicianID\n    }\n  }\n";
exports.onCreateAlert =
  "\n  subscription OnCreateAlert($owner: String) {\n    onCreateAlert(owner: $owner) {\n      id\n      patientID\n      patientName\n      dateTime\n      summary\n      colorCode\n      vitalsReportID\n      symptomReportID\n      pending\n      completed\n      owner\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.onUpdateAlert =
  "\n  subscription OnUpdateAlert($owner: String) {\n    onUpdateAlert(owner: $owner) {\n      id\n      patientID\n      patientName\n      dateTime\n      summary\n      colorCode\n      vitalsReportID\n      symptomReportID\n      pending\n      completed\n      owner\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.onDeleteAlert =
  "\n  subscription OnDeleteAlert($owner: String) {\n    onDeleteAlert(owner: $owner) {\n      id\n      patientID\n      patientName\n      dateTime\n      summary\n      colorCode\n      vitalsReportID\n      symptomReportID\n      pending\n      completed\n      owner\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.onCreateTodo =
  "\n  subscription OnCreateTodo($owner: String) {\n    onCreateTodo(owner: $owner) {\n      id\n      clinicianID\n      title\n      patientName\n      notes\n      lastModified\n      alertID\n      pending\n      completed\n      owner\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.onUpdateTodo =
  "\n  subscription OnUpdateTodo($owner: String) {\n    onUpdateTodo(owner: $owner) {\n      id\n      clinicianID\n      title\n      patientName\n      notes\n      lastModified\n      alertID\n      pending\n      completed\n      owner\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.onDeleteTodo =
  "\n  subscription OnDeleteTodo($owner: String) {\n    onDeleteTodo(owner: $owner) {\n      id\n      clinicianID\n      title\n      patientName\n      notes\n      lastModified\n      alertID\n      pending\n      completed\n      owner\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.onCreateAlertNotification =
  "\n  subscription OnCreateAlertNotification {\n    onCreateAlertNotification {\n      id\n      patientID\n      alertID\n      owner\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.onUpdateAlertNotification =
  "\n  subscription OnUpdateAlertNotification {\n    onUpdateAlertNotification {\n      id\n      patientID\n      alertID\n      owner\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.onDeleteAlertNotification =
  "\n  subscription OnDeleteAlertNotification {\n    onDeleteAlertNotification {\n      id\n      patientID\n      alertID\n      owner\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.onCreateClinicianRecord =
  "\n  subscription OnCreateClinicianRecord {\n    onCreateClinicianRecord {\n      patientID\n      documentID\n      type\n      title\n      path\n      uploaderClinicianID\n      uploadDateTime\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.onUpdateClinicianRecord =
  "\n  subscription OnUpdateClinicianRecord {\n    onUpdateClinicianRecord {\n      patientID\n      documentID\n      type\n      title\n      path\n      uploaderClinicianID\n      uploadDateTime\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.onDeleteClinicianRecord =
  "\n  subscription OnDeleteClinicianRecord {\n    onDeleteClinicianRecord {\n      patientID\n      documentID\n      type\n      title\n      path\n      uploaderClinicianID\n      uploadDateTime\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n";
