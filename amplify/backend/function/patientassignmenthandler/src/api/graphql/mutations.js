"use strict";
/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten
exports.__esModule = true;
exports.deleteClinicianRecord = exports.updateClinicianRecord = exports.createClinicianRecord = exports.deleteAlertNotification = exports.updateAlertNotification = exports.createAlertNotification = exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.deleteAlert = exports.updateAlert = exports.createAlert = exports.deletePatientAssignment = exports.updatePatientAssignment = exports.createPatientAssignment = exports.deleteClinicianPatientMap = exports.updateClinicianPatientMap = exports.createClinicianPatientMap = exports.deleteClinicianProtectedInfo = exports.updateClinicianProtectedInfo = exports.createClinicianProtectedInfo = exports.deleteClinicianInfo = exports.updateClinicianInfo = exports.createClinicianInfo = exports.deletePhysical = exports.updatePhysical = exports.createPhysical = exports.deleteReportVitals = exports.updateReportVitals = exports.createReportVitals = exports.deleteReportSymptom = exports.updateReportSymptom = exports.createReportSymptom = exports.deleteActivityInfo = exports.updateActivityInfo = exports.createActivityInfo = exports.deleteMedicationInfo = exports.updateMedicationInfo = exports.createMedicationInfo = exports.deletePatientInfo = exports.updatePatientInfo = exports.createPatientInfo = void 0;
exports.createPatientInfo = "\n  mutation CreatePatientInfo(\n    $input: CreatePatientInfoInput!\n    $condition: ModelPatientInfoConditionInput\n  ) {\n    createPatientInfo(input: $input, condition: $condition) {\n      patientID\n      name\n      address\n      gender\n      birthDate\n      language\n      phoneNumber\n      email\n      emergencyContactName\n      emergencyContactNumber\n      riskLevel\n      NYHAClass\n      cardiologist\n      diagnosisInfo\n      hospitalName\n      hospitalLocation\n      targetWeight\n      targetSteps\n      deviceNo\n      fluidIntakeGoalInMl\n      configured\n      version\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.updatePatientInfo = "\n  mutation UpdatePatientInfo(\n    $input: UpdatePatientInfoInput!\n    $condition: ModelPatientInfoConditionInput\n  ) {\n    updatePatientInfo(input: $input, condition: $condition) {\n      patientID\n      name\n      address\n      gender\n      birthDate\n      language\n      phoneNumber\n      email\n      emergencyContactName\n      emergencyContactNumber\n      riskLevel\n      NYHAClass\n      cardiologist\n      diagnosisInfo\n      hospitalName\n      hospitalLocation\n      targetWeight\n      targetSteps\n      deviceNo\n      fluidIntakeGoalInMl\n      configured\n      version\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.deletePatientInfo = "\n  mutation DeletePatientInfo(\n    $input: DeletePatientInfoInput!\n    $condition: ModelPatientInfoConditionInput\n  ) {\n    deletePatientInfo(input: $input, condition: $condition) {\n      patientID\n      name\n      address\n      gender\n      birthDate\n      language\n      phoneNumber\n      email\n      emergencyContactName\n      emergencyContactNumber\n      riskLevel\n      NYHAClass\n      cardiologist\n      diagnosisInfo\n      hospitalName\n      hospitalLocation\n      targetWeight\n      targetSteps\n      deviceNo\n      fluidIntakeGoalInMl\n      configured\n      version\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.createMedicationInfo = "\n  mutation CreateMedicationInfo(\n    $input: CreateMedicationInfoInput!\n    $condition: ModelMedicationInfoConditionInput\n  ) {\n    createMedicationInfo(input: $input, condition: $condition) {\n      id\n      patientID\n      name\n      dosage\n      frequency\n      records\n      active\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.updateMedicationInfo = "\n  mutation UpdateMedicationInfo(\n    $input: UpdateMedicationInfoInput!\n    $condition: ModelMedicationInfoConditionInput\n  ) {\n    updateMedicationInfo(input: $input, condition: $condition) {\n      id\n      patientID\n      name\n      dosage\n      frequency\n      records\n      active\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.deleteMedicationInfo = "\n  mutation DeleteMedicationInfo(\n    $input: DeleteMedicationInfoInput!\n    $condition: ModelMedicationInfoConditionInput\n  ) {\n    deleteMedicationInfo(input: $input, condition: $condition) {\n      id\n      patientID\n      name\n      dosage\n      frequency\n      records\n      active\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.createActivityInfo = "\n  mutation CreateActivityInfo(\n    $input: CreateActivityInfoInput!\n    $condition: ModelActivityInfoConditionInput\n  ) {\n    createActivityInfo(input: $input, condition: $condition) {\n      id\n      patientID\n      activityName\n      startTime\n      days\n      durationInMinutes\n      locations\n      symptoms\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.updateActivityInfo = "\n  mutation UpdateActivityInfo(\n    $input: UpdateActivityInfoInput!\n    $condition: ModelActivityInfoConditionInput\n  ) {\n    updateActivityInfo(input: $input, condition: $condition) {\n      id\n      patientID\n      activityName\n      startTime\n      days\n      durationInMinutes\n      locations\n      symptoms\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.deleteActivityInfo = "\n  mutation DeleteActivityInfo(\n    $input: DeleteActivityInfoInput!\n    $condition: ModelActivityInfoConditionInput\n  ) {\n    deleteActivityInfo(input: $input, condition: $condition) {\n      id\n      patientID\n      activityName\n      startTime\n      days\n      durationInMinutes\n      locations\n      symptoms\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.createReportSymptom = "\n  mutation CreateReportSymptom(\n    $input: CreateReportSymptomInput!\n    $condition: ModelReportSymptomConditionInput\n  ) {\n    createReportSymptom(input: $input, condition: $condition) {\n      id\n      patientID\n      activityInfoID\n      symptomName\n      severity\n      dateTime\n      summary\n      weather\n      temperature\n      humidity\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.updateReportSymptom = "\n  mutation UpdateReportSymptom(\n    $input: UpdateReportSymptomInput!\n    $condition: ModelReportSymptomConditionInput\n  ) {\n    updateReportSymptom(input: $input, condition: $condition) {\n      id\n      patientID\n      activityInfoID\n      symptomName\n      severity\n      dateTime\n      summary\n      weather\n      temperature\n      humidity\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.deleteReportSymptom = "\n  mutation DeleteReportSymptom(\n    $input: DeleteReportSymptomInput!\n    $condition: ModelReportSymptomConditionInput\n  ) {\n    deleteReportSymptom(input: $input, condition: $condition) {\n      id\n      patientID\n      activityInfoID\n      symptomName\n      severity\n      dateTime\n      summary\n      weather\n      temperature\n      humidity\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.createReportVitals = "\n  mutation CreateReportVitals(\n    $input: CreateReportVitalsInput!\n    $condition: ModelReportVitalsConditionInput\n  ) {\n    createReportVitals(input: $input, condition: $condition) {\n      id\n      patientID\n      dateTime\n      weight\n      systolicBloodPressure\n      diastolicBloodPressure\n      oxygenSaturation\n      fluidIntakeInMl\n      weather\n      temperature\n      humidity\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.updateReportVitals = "\n  mutation UpdateReportVitals(\n    $input: UpdateReportVitalsInput!\n    $condition: ModelReportVitalsConditionInput\n  ) {\n    updateReportVitals(input: $input, condition: $condition) {\n      id\n      patientID\n      dateTime\n      weight\n      systolicBloodPressure\n      diastolicBloodPressure\n      oxygenSaturation\n      fluidIntakeInMl\n      weather\n      temperature\n      humidity\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.deleteReportVitals = "\n  mutation DeleteReportVitals(\n    $input: DeleteReportVitalsInput!\n    $condition: ModelReportVitalsConditionInput\n  ) {\n    deleteReportVitals(input: $input, condition: $condition) {\n      id\n      patientID\n      dateTime\n      weight\n      systolicBloodPressure\n      diastolicBloodPressure\n      oxygenSaturation\n      fluidIntakeInMl\n      weather\n      temperature\n      humidity\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.createPhysical = "\n  mutation CreatePhysical(\n    $input: CreatePhysicalInput!\n    $condition: ModelPhysicalConditionInput\n  ) {\n    createPhysical(input: $input, condition: $condition) {\n      id\n      patientID\n      steps\n      stepsGoal\n      averageWalkingSpeedInMetresPerSeconds\n      distanceInMetres\n      dateTime\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.updatePhysical = "\n  mutation UpdatePhysical(\n    $input: UpdatePhysicalInput!\n    $condition: ModelPhysicalConditionInput\n  ) {\n    updatePhysical(input: $input, condition: $condition) {\n      id\n      patientID\n      steps\n      stepsGoal\n      averageWalkingSpeedInMetresPerSeconds\n      distanceInMetres\n      dateTime\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.deletePhysical = "\n  mutation DeletePhysical(\n    $input: DeletePhysicalInput!\n    $condition: ModelPhysicalConditionInput\n  ) {\n    deletePhysical(input: $input, condition: $condition) {\n      id\n      patientID\n      steps\n      stepsGoal\n      averageWalkingSpeedInMetresPerSeconds\n      distanceInMetres\n      dateTime\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.createClinicianInfo = "\n  mutation CreateClinicianInfo(\n    $input: CreateClinicianInfoInput!\n    $condition: ModelClinicianInfoConditionInput\n  ) {\n    createClinicianInfo(input: $input, condition: $condition) {\n      clinicianID\n      name\n      hospitalName\n      role\n      contactNumber\n      version\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.updateClinicianInfo = "\n  mutation UpdateClinicianInfo(\n    $input: UpdateClinicianInfoInput!\n    $condition: ModelClinicianInfoConditionInput\n  ) {\n    updateClinicianInfo(input: $input, condition: $condition) {\n      clinicianID\n      name\n      hospitalName\n      role\n      contactNumber\n      version\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.deleteClinicianInfo = "\n  mutation DeleteClinicianInfo(\n    $input: DeleteClinicianInfoInput!\n    $condition: ModelClinicianInfoConditionInput\n  ) {\n    deleteClinicianInfo(input: $input, condition: $condition) {\n      clinicianID\n      name\n      hospitalName\n      role\n      contactNumber\n      version\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.createClinicianProtectedInfo = "\n  mutation CreateClinicianProtectedInfo(\n    $input: CreateClinicianProtectedInfoInput!\n    $condition: ModelClinicianProtectedInfoConditionInput\n  ) {\n    createClinicianProtectedInfo(input: $input, condition: $condition) {\n      clinicianID\n      facts\n      APS\n      DTA\n      UXSA\n      NWA\n      ALA\n      MHA\n      CAM\n      version\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.updateClinicianProtectedInfo = "\n  mutation UpdateClinicianProtectedInfo(\n    $input: UpdateClinicianProtectedInfoInput!\n    $condition: ModelClinicianProtectedInfoConditionInput\n  ) {\n    updateClinicianProtectedInfo(input: $input, condition: $condition) {\n      clinicianID\n      facts\n      APS\n      DTA\n      UXSA\n      NWA\n      ALA\n      MHA\n      CAM\n      version\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.deleteClinicianProtectedInfo = "\n  mutation DeleteClinicianProtectedInfo(\n    $input: DeleteClinicianProtectedInfoInput!\n    $condition: ModelClinicianProtectedInfoConditionInput\n  ) {\n    deleteClinicianProtectedInfo(input: $input, condition: $condition) {\n      clinicianID\n      facts\n      APS\n      DTA\n      UXSA\n      NWA\n      ALA\n      MHA\n      CAM\n      version\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.createClinicianPatientMap = "\n  mutation CreateClinicianPatientMap(\n    $input: CreateClinicianPatientMapInput!\n    $condition: ModelClinicianPatientMapConditionInput\n  ) {\n    createClinicianPatientMap(input: $input, condition: $condition) {\n      clinicianID\n      patientID\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.updateClinicianPatientMap = "\n  mutation UpdateClinicianPatientMap(\n    $input: UpdateClinicianPatientMapInput!\n    $condition: ModelClinicianPatientMapConditionInput\n  ) {\n    updateClinicianPatientMap(input: $input, condition: $condition) {\n      clinicianID\n      patientID\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.deleteClinicianPatientMap = "\n  mutation DeleteClinicianPatientMap(\n    $input: DeleteClinicianPatientMapInput!\n    $condition: ModelClinicianPatientMapConditionInput\n  ) {\n    deleteClinicianPatientMap(input: $input, condition: $condition) {\n      clinicianID\n      patientID\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.createPatientAssignment = "\n  mutation CreatePatientAssignment(\n    $input: CreatePatientAssignmentInput!\n    $condition: ModelPatientAssignmentConditionInput\n  ) {\n    createPatientAssignment(input: $input, condition: $condition) {\n      patientID\n      clinicianID\n      patientName\n      pending\n      resolution\n      reassignToClinicianID\n      sourceClinicianID\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.updatePatientAssignment = "\n  mutation UpdatePatientAssignment(\n    $input: UpdatePatientAssignmentInput!\n    $condition: ModelPatientAssignmentConditionInput\n  ) {\n    updatePatientAssignment(input: $input, condition: $condition) {\n      patientID\n      clinicianID\n      patientName\n      pending\n      resolution\n      reassignToClinicianID\n      sourceClinicianID\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.deletePatientAssignment = "\n  mutation DeletePatientAssignment(\n    $input: DeletePatientAssignmentInput!\n    $condition: ModelPatientAssignmentConditionInput\n  ) {\n    deletePatientAssignment(input: $input, condition: $condition) {\n      patientID\n      clinicianID\n      patientName\n      pending\n      resolution\n      reassignToClinicianID\n      sourceClinicianID\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.createAlert = "\n  mutation CreateAlert(\n    $input: CreateAlertInput!\n    $condition: ModelAlertConditionInput\n  ) {\n    createAlert(input: $input, condition: $condition) {\n      id\n      patientID\n      patientName\n      dateTime\n      summary\n      colorCode\n      triageValue\n      vitalsReportID\n      symptomReportID\n      pending\n      completed\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.updateAlert = "\n  mutation UpdateAlert(\n    $input: UpdateAlertInput!\n    $condition: ModelAlertConditionInput\n  ) {\n    updateAlert(input: $input, condition: $condition) {\n      id\n      patientID\n      patientName\n      dateTime\n      summary\n      colorCode\n      triageValue\n      vitalsReportID\n      symptomReportID\n      pending\n      completed\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.deleteAlert = "\n  mutation DeleteAlert(\n    $input: DeleteAlertInput!\n    $condition: ModelAlertConditionInput\n  ) {\n    deleteAlert(input: $input, condition: $condition) {\n      id\n      patientID\n      patientName\n      dateTime\n      summary\n      colorCode\n      triageValue\n      vitalsReportID\n      symptomReportID\n      pending\n      completed\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.createTodo = "\n  mutation CreateTodo(\n    $input: CreateTodoInput!\n    $condition: ModelTodoConditionInput\n  ) {\n    createTodo(input: $input, condition: $condition) {\n      id\n      clinicianID\n      title\n      patientName\n      notes\n      lastModified\n      alertID\n      pending\n      completed\n      version\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.updateTodo = "\n  mutation UpdateTodo(\n    $input: UpdateTodoInput!\n    $condition: ModelTodoConditionInput\n  ) {\n    updateTodo(input: $input, condition: $condition) {\n      id\n      clinicianID\n      title\n      patientName\n      notes\n      lastModified\n      alertID\n      pending\n      completed\n      version\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.deleteTodo = "\n  mutation DeleteTodo(\n    $input: DeleteTodoInput!\n    $condition: ModelTodoConditionInput\n  ) {\n    deleteTodo(input: $input, condition: $condition) {\n      id\n      clinicianID\n      title\n      patientName\n      notes\n      lastModified\n      alertID\n      pending\n      completed\n      version\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.createAlertNotification = "\n  mutation CreateAlertNotification(\n    $input: CreateAlertNotificationInput!\n    $condition: ModelAlertNotificationConditionInput\n  ) {\n    createAlertNotification(input: $input, condition: $condition) {\n      id\n      patientID\n      alertID\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.updateAlertNotification = "\n  mutation UpdateAlertNotification(\n    $input: UpdateAlertNotificationInput!\n    $condition: ModelAlertNotificationConditionInput\n  ) {\n    updateAlertNotification(input: $input, condition: $condition) {\n      id\n      patientID\n      alertID\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.deleteAlertNotification = "\n  mutation DeleteAlertNotification(\n    $input: DeleteAlertNotificationInput!\n    $condition: ModelAlertNotificationConditionInput\n  ) {\n    deleteAlertNotification(input: $input, condition: $condition) {\n      id\n      patientID\n      alertID\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.createClinicianRecord = "\n  mutation CreateClinicianRecord(\n    $input: CreateClinicianRecordInput!\n    $condition: ModelClinicianRecordConditionInput\n  ) {\n    createClinicianRecord(input: $input, condition: $condition) {\n      patientID\n      documentID\n      type\n      title\n      path\n      uploaderClinicianID\n      uploadDateTime\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.updateClinicianRecord = "\n  mutation UpdateClinicianRecord(\n    $input: UpdateClinicianRecordInput!\n    $condition: ModelClinicianRecordConditionInput\n  ) {\n    updateClinicianRecord(input: $input, condition: $condition) {\n      patientID\n      documentID\n      type\n      title\n      path\n      uploaderClinicianID\n      uploadDateTime\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.deleteClinicianRecord = "\n  mutation DeleteClinicianRecord(\n    $input: DeleteClinicianRecordInput!\n    $condition: ModelClinicianRecordConditionInput\n  ) {\n    deleteClinicianRecord(input: $input, condition: $condition) {\n      patientID\n      documentID\n      type\n      title\n      path\n      uploaderClinicianID\n      uploadDateTime\n      createdAt\n      updatedAt\n    }\n  }\n";
