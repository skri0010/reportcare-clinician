/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreatePatientInfoInput = {
  id?: string | null;
  name: string;
  address: string;
  deviceNo: string;
  diagnosisInfo: string;
  NHYAclass: string;
  cardiologist: string;
  hospitalName: string;
  hospitalLocation: string;
  targetWeight: string;
  targetActivity: string;
  riskLevel: string;
  gender: string;
  birthDate: string;
  language: string;
  phoneNumber: string;
  email: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  fluidIntakeGoal: string;
  configured: boolean;
  patientID: string;
  _version?: number | null;
};

export type ModelPatientInfoConditionInput = {
  name?: ModelStringInput | null;
  address?: ModelStringInput | null;
  deviceNo?: ModelStringInput | null;
  diagnosisInfo?: ModelStringInput | null;
  NHYAclass?: ModelStringInput | null;
  cardiologist?: ModelStringInput | null;
  hospitalName?: ModelStringInput | null;
  hospitalLocation?: ModelStringInput | null;
  targetWeight?: ModelStringInput | null;
  targetActivity?: ModelStringInput | null;
  riskLevel?: ModelStringInput | null;
  gender?: ModelStringInput | null;
  birthDate?: ModelStringInput | null;
  language?: ModelStringInput | null;
  phoneNumber?: ModelStringInput | null;
  email?: ModelStringInput | null;
  emergencyContactName?: ModelStringInput | null;
  emergencyContactNumber?: ModelStringInput | null;
  fluidIntakeGoal?: ModelStringInput | null;
  configured?: ModelBooleanInput | null;
  and?: Array<ModelPatientInfoConditionInput | null> | null;
  or?: Array<ModelPatientInfoConditionInput | null> | null;
  not?: ModelPatientInfoConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null"
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelBooleanInput = {
  ne?: boolean | null;
  eq?: boolean | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type PatientInfo = {
  __typename: "PatientInfo";
  id: string;
  name: string;
  address: string;
  deviceNo: string;
  diagnosisInfo: string;
  NHYAclass: string;
  cardiologist: string;
  hospitalName: string;
  hospitalLocation: string;
  targetWeight: string;
  targetActivity: string;
  riskLevel: string;
  gender: string;
  birthDate: string;
  language: string;
  phoneNumber: string;
  email: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  fluidIntakeGoal: string;
  configured: boolean;
  patientID: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type UpdatePatientInfoInput = {
  id?: string | null;
  name?: string | null;
  address?: string | null;
  deviceNo?: string | null;
  diagnosisInfo?: string | null;
  NHYAclass?: string | null;
  cardiologist?: string | null;
  hospitalName?: string | null;
  hospitalLocation?: string | null;
  targetWeight?: string | null;
  targetActivity?: string | null;
  riskLevel?: string | null;
  gender?: string | null;
  birthDate?: string | null;
  language?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  emergencyContactName?: string | null;
  emergencyContactNumber?: string | null;
  fluidIntakeGoal?: string | null;
  configured?: boolean | null;
  patientID: string;
  _version?: number | null;
};

export type DeletePatientInfoInput = {
  patientID: string;
  _version?: number | null;
};

export type CreateMedicationInfoInput = {
  id?: string | null;
  name: string;
  dosage: number;
  frequency: number;
  records: string;
  patientID: string;
  active: boolean;
  _version?: number | null;
};

export type ModelMedicationInfoConditionInput = {
  name?: ModelStringInput | null;
  dosage?: ModelIntInput | null;
  frequency?: ModelIntInput | null;
  records?: ModelStringInput | null;
  active?: ModelBooleanInput | null;
  and?: Array<ModelMedicationInfoConditionInput | null> | null;
  or?: Array<ModelMedicationInfoConditionInput | null> | null;
  not?: ModelMedicationInfoConditionInput | null;
};

export type ModelIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type MedicationInfo = {
  __typename: "MedicationInfo";
  id: string;
  name: string;
  dosage: number;
  frequency: number;
  records: string;
  patientID: string;
  active: boolean;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type UpdateMedicationInfoInput = {
  id: string;
  name?: string | null;
  dosage?: number | null;
  frequency?: number | null;
  records?: string | null;
  patientID?: string | null;
  active?: boolean | null;
  _version?: number | null;
};

export type DeleteMedicationInfoInput = {
  id: string;
  _version?: number | null;
};

export type CreateActivityInfoInput = {
  id?: string | null;
  Actname: string;
  Location: string;
  expectedFrequency?: number | null;
  expectedDays?: Array<string> | null;
  expectedDurationMinutes?: number | null;
  recordDateTime?: string | null;
  patientID: string;
  _version?: number | null;
};

export type ModelActivityInfoConditionInput = {
  Actname?: ModelStringInput | null;
  Location?: ModelStringInput | null;
  expectedFrequency?: ModelIntInput | null;
  expectedDays?: ModelStringInput | null;
  expectedDurationMinutes?: ModelIntInput | null;
  recordDateTime?: ModelStringInput | null;
  and?: Array<ModelActivityInfoConditionInput | null> | null;
  or?: Array<ModelActivityInfoConditionInput | null> | null;
  not?: ModelActivityInfoConditionInput | null;
};

export type ActivityInfo = {
  __typename: "ActivityInfo";
  id: string;
  Actname: string;
  Location: string;
  expectedFrequency?: number | null;
  expectedDays?: Array<string> | null;
  expectedDurationMinutes?: number | null;
  recordDateTime?: string | null;
  patientID: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type UpdateActivityInfoInput = {
  id: string;
  Actname?: string | null;
  Location?: string | null;
  expectedFrequency?: number | null;
  expectedDays?: Array<string> | null;
  expectedDurationMinutes?: number | null;
  recordDateTime?: string | null;
  patientID?: string | null;
  _version?: number | null;
};

export type DeleteActivityInfoInput = {
  id: string;
  _version?: number | null;
};

export type CreateMedCompliantInput = {
  id?: string | null;
  MedId: string;
  Verification: boolean;
  Date: string;
  patientID: string;
  _version?: number | null;
};

export type ModelMedCompliantConditionInput = {
  MedId?: ModelIDInput | null;
  Verification?: ModelBooleanInput | null;
  Date?: ModelStringInput | null;
  and?: Array<ModelMedCompliantConditionInput | null> | null;
  or?: Array<ModelMedCompliantConditionInput | null> | null;
  not?: ModelMedCompliantConditionInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type MedCompliant = {
  __typename: "MedCompliant";
  id: string;
  MedId: string;
  Verification: boolean;
  Date: string;
  patientID: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
  MedicationInfo?: MedicationInfo | null;
  owner?: string | null;
};

export type UpdateMedCompliantInput = {
  id: string;
  MedId?: string | null;
  Verification?: boolean | null;
  Date?: string | null;
  patientID?: string | null;
  _version?: number | null;
};

export type DeleteMedCompliantInput = {
  id: string;
  _version?: number | null;
};

export type CreateReportSymptomInput = {
  id?: string | null;
  ActId: string;
  Name: string;
  Severity: string;
  DateTime: string;
  Summary?: string | null;
  patientID: string;
  _version?: number | null;
};

export type ModelReportSymptomConditionInput = {
  ActId?: ModelIDInput | null;
  Name?: ModelStringInput | null;
  Severity?: ModelStringInput | null;
  DateTime?: ModelStringInput | null;
  Summary?: ModelStringInput | null;
  and?: Array<ModelReportSymptomConditionInput | null> | null;
  or?: Array<ModelReportSymptomConditionInput | null> | null;
  not?: ModelReportSymptomConditionInput | null;
};

export type ReportSymptom = {
  __typename: "ReportSymptom";
  id: string;
  ActId: string;
  Name: string;
  Severity: string;
  DateTime: string;
  Summary?: string | null;
  patientID: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
  ActivityInfo?: ActivityInfo | null;
  owner?: string | null;
};

export type UpdateReportSymptomInput = {
  id: string;
  ActId?: string | null;
  Name?: string | null;
  Severity?: string | null;
  DateTime?: string | null;
  Summary?: string | null;
  patientID?: string | null;
  _version?: number | null;
};

export type DeleteReportSymptomInput = {
  id: string;
  _version?: number | null;
};

export type CreateReportVitalsInput = {
  id?: string | null;
  Temperature?: string | null;
  Humidity?: string | null;
  Weight?: string | null;
  BPSys?: string | null;
  BPDi?: string | null;
  NoSteps?: string | null;
  OxySat?: string | null;
  FluidIntake?: string | null;
  DateTime: string;
  patientID: string;
  _version?: number | null;
};

export type ModelReportVitalsConditionInput = {
  Temperature?: ModelStringInput | null;
  Humidity?: ModelStringInput | null;
  Weight?: ModelStringInput | null;
  BPSys?: ModelStringInput | null;
  BPDi?: ModelStringInput | null;
  NoSteps?: ModelStringInput | null;
  OxySat?: ModelStringInput | null;
  FluidIntake?: ModelStringInput | null;
  DateTime?: ModelStringInput | null;
  and?: Array<ModelReportVitalsConditionInput | null> | null;
  or?: Array<ModelReportVitalsConditionInput | null> | null;
  not?: ModelReportVitalsConditionInput | null;
};

export type ReportVitals = {
  __typename: "ReportVitals";
  id: string;
  Temperature?: string | null;
  Humidity?: string | null;
  Weight?: string | null;
  BPSys?: string | null;
  BPDi?: string | null;
  NoSteps?: string | null;
  OxySat?: string | null;
  FluidIntake?: string | null;
  DateTime: string;
  patientID: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type UpdateReportVitalsInput = {
  id: string;
  Temperature?: string | null;
  Humidity?: string | null;
  Weight?: string | null;
  BPSys?: string | null;
  BPDi?: string | null;
  NoSteps?: string | null;
  OxySat?: string | null;
  FluidIntake?: string | null;
  DateTime?: string | null;
  patientID?: string | null;
  _version?: number | null;
};

export type DeleteReportVitalsInput = {
  id: string;
  _version?: number | null;
};

export type CreateMedicalRecordInput = {
  id?: string | null;
  patientID: string;
  clinicianID: string;
  title: string;
  fileKey: string;
  _version?: number | null;
};

export type ModelMedicalRecordConditionInput = {
  title?: ModelStringInput | null;
  fileKey?: ModelStringInput | null;
  and?: Array<ModelMedicalRecordConditionInput | null> | null;
  or?: Array<ModelMedicalRecordConditionInput | null> | null;
  not?: ModelMedicalRecordConditionInput | null;
};

export type MedicalRecord = {
  __typename: "MedicalRecord";
  id: string;
  patientID: string;
  clinicianID: string;
  title: string;
  fileKey: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
};

export type UpdateMedicalRecordInput = {
  id: string;
  patientID?: string | null;
  clinicianID?: string | null;
  title?: string | null;
  fileKey?: string | null;
  _version?: number | null;
};

export type DeleteMedicalRecordInput = {
  id: string;
  _version?: number | null;
};

export type CreateIcdCrtRecordInput = {
  id?: string | null;
  patientID: string;
  clinicianID: string;
  title: string;
  dateTime: string;
  fileKey: string;
  _version?: number | null;
};

export type ModelIcdCrtRecordConditionInput = {
  title?: ModelStringInput | null;
  dateTime?: ModelStringInput | null;
  fileKey?: ModelStringInput | null;
  and?: Array<ModelIcdCrtRecordConditionInput | null> | null;
  or?: Array<ModelIcdCrtRecordConditionInput | null> | null;
  not?: ModelIcdCrtRecordConditionInput | null;
};

export type IcdCrtRecord = {
  __typename: "IcdCrtRecord";
  id: string;
  patientID: string;
  clinicianID: string;
  title: string;
  dateTime: string;
  fileKey: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
};

export type UpdateIcdCrtRecordInput = {
  id: string;
  patientID?: string | null;
  clinicianID?: string | null;
  title?: string | null;
  dateTime?: string | null;
  fileKey?: string | null;
  _version?: number | null;
};

export type DeleteIcdCrtRecordInput = {
  id: string;
  _version?: number | null;
};

export type CreateClinicianInfoInput = {
  id?: string | null;
  clinicianID: string;
  name: string;
  hospitalName: string;
  role: string;
  contactNumber: string;
  _version?: number | null;
};

export type ModelClinicianInfoConditionInput = {
  name?: ModelStringInput | null;
  hospitalName?: ModelStringInput | null;
  role?: ModelStringInput | null;
  contactNumber?: ModelStringInput | null;
  and?: Array<ModelClinicianInfoConditionInput | null> | null;
  or?: Array<ModelClinicianInfoConditionInput | null> | null;
  not?: ModelClinicianInfoConditionInput | null;
};

export type ClinicianInfo = {
  __typename: "ClinicianInfo";
  id?: string | null;
  clinicianID: string;
  name: string;
  hospitalName: string;
  role: string;
  contactNumber: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
  protectedInfo?: ClinicianProtectedInfo | null;
};

export type ClinicianProtectedInfo = {
  __typename: "ClinicianProtectedInfo";
  id?: string | null;
  clinicianID: string;
  facts: string;
  APS: string;
  DTA: string;
  UXSA: string;
  NWA: string;
  ALA: string;
  MHA: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
};

export type UpdateClinicianInfoInput = {
  id?: string | null;
  clinicianID: string;
  name?: string | null;
  hospitalName?: string | null;
  role?: string | null;
  contactNumber?: string | null;
  _version?: number | null;
};

export type DeleteClinicianInfoInput = {
  clinicianID: string;
  _version?: number | null;
};

export type CreateClinicianProtectedInfoInput = {
  id?: string | null;
  clinicianID: string;
  facts: string;
  APS: string;
  DTA: string;
  UXSA: string;
  NWA: string;
  ALA: string;
  MHA: string;
  _version?: number | null;
};

export type ModelClinicianProtectedInfoConditionInput = {
  facts?: ModelStringInput | null;
  APS?: ModelStringInput | null;
  DTA?: ModelStringInput | null;
  UXSA?: ModelStringInput | null;
  NWA?: ModelStringInput | null;
  ALA?: ModelStringInput | null;
  MHA?: ModelStringInput | null;
  and?: Array<ModelClinicianProtectedInfoConditionInput | null> | null;
  or?: Array<ModelClinicianProtectedInfoConditionInput | null> | null;
  not?: ModelClinicianProtectedInfoConditionInput | null;
};

export type UpdateClinicianProtectedInfoInput = {
  id?: string | null;
  clinicianID: string;
  facts?: string | null;
  APS?: string | null;
  DTA?: string | null;
  UXSA?: string | null;
  NWA?: string | null;
  ALA?: string | null;
  MHA?: string | null;
  _version?: number | null;
};

export type DeleteClinicianProtectedInfoInput = {
  clinicianID: string;
  _version?: number | null;
};

export type CreateClinicianPatientMapInput = {
  id?: string | null;
  clinicianID: string;
  patientID: string;
  _version?: number | null;
};

export type ModelClinicianPatientMapConditionInput = {
  and?: Array<ModelClinicianPatientMapConditionInput | null> | null;
  or?: Array<ModelClinicianPatientMapConditionInput | null> | null;
  not?: ModelClinicianPatientMapConditionInput | null;
};

export type ClinicianPatientMap = {
  __typename: "ClinicianPatientMap";
  id?: string | null;
  clinicianID: string;
  patientID: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
  clinicianInfo: ClinicianInfo;
};

export type UpdateClinicianPatientMapInput = {
  id?: string | null;
  clinicianID: string;
  patientID: string;
  _version?: number | null;
};

export type DeleteClinicianPatientMapInput = {
  clinicianID: string;
  patientID: string;
  _version?: number | null;
};

export type DeletePatientAssignmentInput = {
  patientID: string;
  clinicianID: string;
  _version?: number | null;
};

export type ModelPatientAssignmentConditionInput = {
  patientName?: ModelStringInput | null;
  pending?: ModelStringInput | null;
  resolution?: ModelStringInput | null;
  reassignToClinicianID?: ModelStringInput | null;
  adminReassignFromClinicianID?: ModelStringInput | null;
  adminCompleted?: ModelBooleanInput | null;
  and?: Array<ModelPatientAssignmentConditionInput | null> | null;
  or?: Array<ModelPatientAssignmentConditionInput | null> | null;
  not?: ModelPatientAssignmentConditionInput | null;
};

export type PatientAssignment = {
  __typename: "PatientAssignment";
  id?: string | null;
  patientID: string;
  clinicianID: string;
  patientName: string;
  pending?: string | null;
  resolution?: string | null;
  reassignToClinicianID?: string | null;
  adminCompleted?: boolean | null;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
  adminReassignFromClinicianID?: string | null;
};

export type CreatePatientAssignmentInput = {
  id?: string | null;
  patientID: string;
  clinicianID: string;
  patientName: string;
  pending?: string | null;
  resolution?: string | null;
  reassignToClinicianID?: string | null;
  adminReassignFromClinicianID?: string | null;
  adminCompleted?: boolean | null;
  _version?: number | null;
};

export type UpdatePatientAssignmentInput = {
  id?: string | null;
  patientID: string;
  clinicianID: string;
  patientName?: string | null;
  pending?: string | null;
  resolution?: string | null;
  reassignToClinicianID?: string | null;
  adminReassignFromClinicianID?: string | null;
  adminCompleted?: boolean | null;
  _version?: number | null;
};

export type CreateAlertInput = {
  id?: string | null;
  patientID: string;
  patientName: string;
  dateTime: string;
  summary: string;
  colorCode: string;
  vitalsReportID: string;
  symptomReportID: string;
  pending?: string | null;
  completed?: string | null;
  owner: string;
  _version?: number | null;
};

export type ModelAlertConditionInput = {
  patientName?: ModelStringInput | null;
  dateTime?: ModelStringInput | null;
  summary?: ModelStringInput | null;
  colorCode?: ModelStringInput | null;
  vitalsReportID?: ModelIDInput | null;
  symptomReportID?: ModelIDInput | null;
  pending?: ModelStringInput | null;
  completed?: ModelStringInput | null;
  and?: Array<ModelAlertConditionInput | null> | null;
  or?: Array<ModelAlertConditionInput | null> | null;
  not?: ModelAlertConditionInput | null;
};

export type Alert = {
  __typename: "Alert";
  id: string;
  patientID: string;
  patientName: string;
  dateTime: string;
  summary: string;
  colorCode: string;
  vitalsReportID: string;
  symptomReportID: string;
  pending?: string | null;
  completed?: string | null;
  owner: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
  symptomReport?: ReportSymptom | null;
  vitalsReport?: ReportVitals | null;
};

export type UpdateAlertInput = {
  id: string;
  patientID?: string | null;
  patientName?: string | null;
  dateTime?: string | null;
  summary?: string | null;
  colorCode?: string | null;
  vitalsReportID?: string | null;
  symptomReportID?: string | null;
  pending?: string | null;
  completed?: string | null;
  owner?: string | null;
  _version?: number | null;
};

export type DeleteAlertInput = {
  id: string;
  _version?: number | null;
};

export type CreateTodoInput = {
  id?: string | null;
  clinicianID: string;
  title: string;
  patientName: string;
  notes: string;
  lastModified: string;
  alertID?: string | null;
  pending?: string | null;
  completed?: string | null;
  owner: string;
  _version?: number | null;
};

export type ModelTodoConditionInput = {
  clinicianID?: ModelStringInput | null;
  title?: ModelStringInput | null;
  patientName?: ModelStringInput | null;
  notes?: ModelStringInput | null;
  lastModified?: ModelStringInput | null;
  alertID?: ModelIDInput | null;
  pending?: ModelStringInput | null;
  completed?: ModelStringInput | null;
  and?: Array<ModelTodoConditionInput | null> | null;
  or?: Array<ModelTodoConditionInput | null> | null;
  not?: ModelTodoConditionInput | null;
};

export type Todo = {
  __typename: "Todo";
  id: string;
  clinicianID: string;
  title: string;
  patientName: string;
  notes: string;
  lastModified: string;
  alertID?: string | null;
  pending?: string | null;
  completed?: string | null;
  owner: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
  alert?: Alert | null;
};

export type UpdateTodoInput = {
  id: string;
  clinicianID?: string | null;
  title?: string | null;
  patientName?: string | null;
  notes?: string | null;
  lastModified?: string | null;
  alertID?: string | null;
  pending?: string | null;
  completed?: string | null;
  owner?: string | null;
  _version?: number | null;
};

export type DeleteTodoInput = {
  id: string;
  _version?: number | null;
};

export type CreateAlertNotificationInput = {
  id?: string | null;
  patientID: string;
  alertID: string;
  owner: string;
  _version?: number | null;
};

export type ModelAlertNotificationConditionInput = {
  patientID?: ModelStringInput | null;
  alertID?: ModelIDInput | null;
  owner?: ModelStringInput | null;
  and?: Array<ModelAlertNotificationConditionInput | null> | null;
  or?: Array<ModelAlertNotificationConditionInput | null> | null;
  not?: ModelAlertNotificationConditionInput | null;
};

export type AlertNotification = {
  __typename: "AlertNotification";
  id: string;
  patientID: string;
  alertID: string;
  owner: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
};

export type UpdateAlertNotificationInput = {
  id: string;
  patientID?: string | null;
  alertID?: string | null;
  owner?: string | null;
  _version?: number | null;
};

export type DeleteAlertNotificationInput = {
  id: string;
  _version?: number | null;
};

export type ModelPatientInfoFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  address?: ModelStringInput | null;
  deviceNo?: ModelStringInput | null;
  diagnosisInfo?: ModelStringInput | null;
  NHYAclass?: ModelStringInput | null;
  cardiologist?: ModelStringInput | null;
  hospitalName?: ModelStringInput | null;
  hospitalLocation?: ModelStringInput | null;
  targetWeight?: ModelStringInput | null;
  targetActivity?: ModelStringInput | null;
  riskLevel?: ModelStringInput | null;
  gender?: ModelStringInput | null;
  birthDate?: ModelStringInput | null;
  language?: ModelStringInput | null;
  phoneNumber?: ModelStringInput | null;
  email?: ModelStringInput | null;
  emergencyContactName?: ModelStringInput | null;
  emergencyContactNumber?: ModelStringInput | null;
  fluidIntakeGoal?: ModelStringInput | null;
  configured?: ModelBooleanInput | null;
  patientID?: ModelStringInput | null;
  and?: Array<ModelPatientInfoFilterInput | null> | null;
  or?: Array<ModelPatientInfoFilterInput | null> | null;
  not?: ModelPatientInfoFilterInput | null;
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC"
}

export type ModelPatientInfoConnection = {
  __typename: "ModelPatientInfoConnection";
  items?: Array<PatientInfo | null> | null;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelMedicationInfoFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  dosage?: ModelIntInput | null;
  frequency?: ModelIntInput | null;
  records?: ModelStringInput | null;
  patientID?: ModelStringInput | null;
  active?: ModelBooleanInput | null;
  and?: Array<ModelMedicationInfoFilterInput | null> | null;
  or?: Array<ModelMedicationInfoFilterInput | null> | null;
  not?: ModelMedicationInfoFilterInput | null;
};

export type ModelMedicationInfoConnection = {
  __typename: "ModelMedicationInfoConnection";
  items?: Array<MedicationInfo | null> | null;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelActivityInfoFilterInput = {
  id?: ModelIDInput | null;
  Actname?: ModelStringInput | null;
  Location?: ModelStringInput | null;
  expectedFrequency?: ModelIntInput | null;
  expectedDays?: ModelStringInput | null;
  expectedDurationMinutes?: ModelIntInput | null;
  recordDateTime?: ModelStringInput | null;
  patientID?: ModelStringInput | null;
  and?: Array<ModelActivityInfoFilterInput | null> | null;
  or?: Array<ModelActivityInfoFilterInput | null> | null;
  not?: ModelActivityInfoFilterInput | null;
};

export type ModelActivityInfoConnection = {
  __typename: "ModelActivityInfoConnection";
  items?: Array<ActivityInfo | null> | null;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelMedCompliantFilterInput = {
  id?: ModelIDInput | null;
  MedId?: ModelIDInput | null;
  Verification?: ModelBooleanInput | null;
  Date?: ModelStringInput | null;
  patientID?: ModelStringInput | null;
  and?: Array<ModelMedCompliantFilterInput | null> | null;
  or?: Array<ModelMedCompliantFilterInput | null> | null;
  not?: ModelMedCompliantFilterInput | null;
};

export type ModelMedCompliantConnection = {
  __typename: "ModelMedCompliantConnection";
  items?: Array<MedCompliant | null> | null;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelStringKeyConditionInput = {
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type ModelReportSymptomFilterInput = {
  id?: ModelIDInput | null;
  ActId?: ModelIDInput | null;
  Name?: ModelStringInput | null;
  Severity?: ModelStringInput | null;
  DateTime?: ModelStringInput | null;
  Summary?: ModelStringInput | null;
  patientID?: ModelStringInput | null;
  and?: Array<ModelReportSymptomFilterInput | null> | null;
  or?: Array<ModelReportSymptomFilterInput | null> | null;
  not?: ModelReportSymptomFilterInput | null;
};

export type ModelReportSymptomConnection = {
  __typename: "ModelReportSymptomConnection";
  items?: Array<ReportSymptom | null> | null;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelReportVitalsFilterInput = {
  id?: ModelIDInput | null;
  Temperature?: ModelStringInput | null;
  Humidity?: ModelStringInput | null;
  Weight?: ModelStringInput | null;
  BPSys?: ModelStringInput | null;
  BPDi?: ModelStringInput | null;
  NoSteps?: ModelStringInput | null;
  OxySat?: ModelStringInput | null;
  FluidIntake?: ModelStringInput | null;
  DateTime?: ModelStringInput | null;
  patientID?: ModelStringInput | null;
  and?: Array<ModelReportVitalsFilterInput | null> | null;
  or?: Array<ModelReportVitalsFilterInput | null> | null;
  not?: ModelReportVitalsFilterInput | null;
};

export type ModelReportVitalsConnection = {
  __typename: "ModelReportVitalsConnection";
  items?: Array<ReportVitals | null> | null;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelMedicalRecordFilterInput = {
  id?: ModelIDInput | null;
  patientID?: ModelStringInput | null;
  clinicianID?: ModelStringInput | null;
  title?: ModelStringInput | null;
  fileKey?: ModelStringInput | null;
  and?: Array<ModelMedicalRecordFilterInput | null> | null;
  or?: Array<ModelMedicalRecordFilterInput | null> | null;
  not?: ModelMedicalRecordFilterInput | null;
};

export type ModelMedicalRecordConnection = {
  __typename: "ModelMedicalRecordConnection";
  items?: Array<MedicalRecord | null> | null;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelIcdCrtRecordFilterInput = {
  id?: ModelIDInput | null;
  patientID?: ModelStringInput | null;
  clinicianID?: ModelStringInput | null;
  title?: ModelStringInput | null;
  dateTime?: ModelStringInput | null;
  fileKey?: ModelStringInput | null;
  and?: Array<ModelIcdCrtRecordFilterInput | null> | null;
  or?: Array<ModelIcdCrtRecordFilterInput | null> | null;
  not?: ModelIcdCrtRecordFilterInput | null;
};

export type ModelIcdCrtRecordConnection = {
  __typename: "ModelIcdCrtRecordConnection";
  items?: Array<IcdCrtRecord | null> | null;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelClinicianInfoFilterInput = {
  id?: ModelIDInput | null;
  clinicianID?: ModelStringInput | null;
  name?: ModelStringInput | null;
  hospitalName?: ModelStringInput | null;
  role?: ModelStringInput | null;
  contactNumber?: ModelStringInput | null;
  and?: Array<ModelClinicianInfoFilterInput | null> | null;
  or?: Array<ModelClinicianInfoFilterInput | null> | null;
  not?: ModelClinicianInfoFilterInput | null;
};

export type ModelClinicianInfoConnection = {
  __typename: "ModelClinicianInfoConnection";
  items?: Array<ClinicianInfo | null> | null;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelClinicianProtectedInfoFilterInput = {
  id?: ModelIDInput | null;
  clinicianID?: ModelStringInput | null;
  facts?: ModelStringInput | null;
  APS?: ModelStringInput | null;
  DTA?: ModelStringInput | null;
  UXSA?: ModelStringInput | null;
  NWA?: ModelStringInput | null;
  ALA?: ModelStringInput | null;
  MHA?: ModelStringInput | null;
  and?: Array<ModelClinicianProtectedInfoFilterInput | null> | null;
  or?: Array<ModelClinicianProtectedInfoFilterInput | null> | null;
  not?: ModelClinicianProtectedInfoFilterInput | null;
};

export type ModelClinicianProtectedInfoConnection = {
  __typename: "ModelClinicianProtectedInfoConnection";
  items?: Array<ClinicianProtectedInfo | null> | null;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelClinicianPatientMapFilterInput = {
  id?: ModelIDInput | null;
  clinicianID?: ModelStringInput | null;
  patientID?: ModelStringInput | null;
  and?: Array<ModelClinicianPatientMapFilterInput | null> | null;
  or?: Array<ModelClinicianPatientMapFilterInput | null> | null;
  not?: ModelClinicianPatientMapFilterInput | null;
};

export type ModelClinicianPatientMapConnection = {
  __typename: "ModelClinicianPatientMapConnection";
  items?: Array<ClinicianPatientMap | null> | null;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelPatientAssignmentFilterInput = {
  id?: ModelIDInput | null;
  patientID?: ModelStringInput | null;
  clinicianID?: ModelStringInput | null;
  patientName?: ModelStringInput | null;
  pending?: ModelStringInput | null;
  resolution?: ModelStringInput | null;
  reassignToClinicianID?: ModelStringInput | null;
  adminReassignFromClinicianID?: ModelStringInput | null;
  adminCompleted?: ModelBooleanInput | null;
  and?: Array<ModelPatientAssignmentFilterInput | null> | null;
  or?: Array<ModelPatientAssignmentFilterInput | null> | null;
  not?: ModelPatientAssignmentFilterInput | null;
};

export type ModelPatientAssignmentConnection = {
  __typename: "ModelPatientAssignmentConnection";
  items?: Array<PatientAssignment | null> | null;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelAlertFilterInput = {
  id?: ModelIDInput | null;
  patientID?: ModelStringInput | null;
  patientName?: ModelStringInput | null;
  dateTime?: ModelStringInput | null;
  summary?: ModelStringInput | null;
  colorCode?: ModelStringInput | null;
  vitalsReportID?: ModelIDInput | null;
  symptomReportID?: ModelIDInput | null;
  pending?: ModelStringInput | null;
  completed?: ModelStringInput | null;
  owner?: ModelStringInput | null;
  and?: Array<ModelAlertFilterInput | null> | null;
  or?: Array<ModelAlertFilterInput | null> | null;
  not?: ModelAlertFilterInput | null;
};

export type ModelAlertConnection = {
  __typename: "ModelAlertConnection";
  items?: Array<Alert | null> | null;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelTodoFilterInput = {
  id?: ModelIDInput | null;
  clinicianID?: ModelStringInput | null;
  title?: ModelStringInput | null;
  patientName?: ModelStringInput | null;
  notes?: ModelStringInput | null;
  lastModified?: ModelStringInput | null;
  alertID?: ModelIDInput | null;
  pending?: ModelStringInput | null;
  completed?: ModelStringInput | null;
  owner?: ModelStringInput | null;
  and?: Array<ModelTodoFilterInput | null> | null;
  or?: Array<ModelTodoFilterInput | null> | null;
  not?: ModelTodoFilterInput | null;
};

export type ModelTodoConnection = {
  __typename: "ModelTodoConnection";
  items?: Array<Todo | null> | null;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelIDKeyConditionInput = {
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type ModelAlertNotificationFilterInput = {
  id?: ModelIDInput | null;
  patientID?: ModelStringInput | null;
  alertID?: ModelIDInput | null;
  owner?: ModelStringInput | null;
  and?: Array<ModelAlertNotificationFilterInput | null> | null;
  or?: Array<ModelAlertNotificationFilterInput | null> | null;
  not?: ModelAlertNotificationFilterInput | null;
};

export type ModelAlertNotificationConnection = {
  __typename: "ModelAlertNotificationConnection";
  items?: Array<AlertNotification | null> | null;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type CreatePatientInfoMutationVariables = {
  input: CreatePatientInfoInput;
  condition?: ModelPatientInfoConditionInput | null;
};

export type CreatePatientInfoMutation = {
  createPatientInfo?: {
    __typename: "PatientInfo";
    id: string;
    name: string;
    address: string;
    deviceNo: string;
    diagnosisInfo: string;
    NHYAclass: string;
    cardiologist: string;
    hospitalName: string;
    hospitalLocation: string;
    targetWeight: string;
    targetActivity: string;
    riskLevel: string;
    gender: string;
    birthDate: string;
    language: string;
    phoneNumber: string;
    email: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
    fluidIntakeGoal: string;
    configured: boolean;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type UpdatePatientInfoMutationVariables = {
  input: UpdatePatientInfoInput;
  condition?: ModelPatientInfoConditionInput | null;
};

export type UpdatePatientInfoMutation = {
  updatePatientInfo?: {
    __typename: "PatientInfo";
    id: string;
    name: string;
    address: string;
    deviceNo: string;
    diagnosisInfo: string;
    NHYAclass: string;
    cardiologist: string;
    hospitalName: string;
    hospitalLocation: string;
    targetWeight: string;
    targetActivity: string;
    riskLevel: string;
    gender: string;
    birthDate: string;
    language: string;
    phoneNumber: string;
    email: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
    fluidIntakeGoal: string;
    configured: boolean;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type DeletePatientInfoMutationVariables = {
  input: DeletePatientInfoInput;
  condition?: ModelPatientInfoConditionInput | null;
};

export type DeletePatientInfoMutation = {
  deletePatientInfo?: {
    __typename: "PatientInfo";
    id: string;
    name: string;
    address: string;
    deviceNo: string;
    diagnosisInfo: string;
    NHYAclass: string;
    cardiologist: string;
    hospitalName: string;
    hospitalLocation: string;
    targetWeight: string;
    targetActivity: string;
    riskLevel: string;
    gender: string;
    birthDate: string;
    language: string;
    phoneNumber: string;
    email: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
    fluidIntakeGoal: string;
    configured: boolean;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type CreateMedicationInfoMutationVariables = {
  input: CreateMedicationInfoInput;
  condition?: ModelMedicationInfoConditionInput | null;
};

export type CreateMedicationInfoMutation = {
  createMedicationInfo?: {
    __typename: "MedicationInfo";
    id: string;
    name: string;
    dosage: number;
    frequency: number;
    records: string;
    patientID: string;
    active: boolean;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type UpdateMedicationInfoMutationVariables = {
  input: UpdateMedicationInfoInput;
  condition?: ModelMedicationInfoConditionInput | null;
};

export type UpdateMedicationInfoMutation = {
  updateMedicationInfo?: {
    __typename: "MedicationInfo";
    id: string;
    name: string;
    dosage: number;
    frequency: number;
    records: string;
    patientID: string;
    active: boolean;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type DeleteMedicationInfoMutationVariables = {
  input: DeleteMedicationInfoInput;
  condition?: ModelMedicationInfoConditionInput | null;
};

export type DeleteMedicationInfoMutation = {
  deleteMedicationInfo?: {
    __typename: "MedicationInfo";
    id: string;
    name: string;
    dosage: number;
    frequency: number;
    records: string;
    patientID: string;
    active: boolean;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type CreateActivityInfoMutationVariables = {
  input: CreateActivityInfoInput;
  condition?: ModelActivityInfoConditionInput | null;
};

export type CreateActivityInfoMutation = {
  createActivityInfo?: {
    __typename: "ActivityInfo";
    id: string;
    Actname: string;
    Location: string;
    expectedFrequency?: number | null;
    expectedDays?: Array<string> | null;
    expectedDurationMinutes?: number | null;
    recordDateTime?: string | null;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type UpdateActivityInfoMutationVariables = {
  input: UpdateActivityInfoInput;
  condition?: ModelActivityInfoConditionInput | null;
};

export type UpdateActivityInfoMutation = {
  updateActivityInfo?: {
    __typename: "ActivityInfo";
    id: string;
    Actname: string;
    Location: string;
    expectedFrequency?: number | null;
    expectedDays?: Array<string> | null;
    expectedDurationMinutes?: number | null;
    recordDateTime?: string | null;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type DeleteActivityInfoMutationVariables = {
  input: DeleteActivityInfoInput;
  condition?: ModelActivityInfoConditionInput | null;
};

export type DeleteActivityInfoMutation = {
  deleteActivityInfo?: {
    __typename: "ActivityInfo";
    id: string;
    Actname: string;
    Location: string;
    expectedFrequency?: number | null;
    expectedDays?: Array<string> | null;
    expectedDurationMinutes?: number | null;
    recordDateTime?: string | null;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type CreateMedCompliantMutationVariables = {
  input: CreateMedCompliantInput;
  condition?: ModelMedCompliantConditionInput | null;
};

export type CreateMedCompliantMutation = {
  createMedCompliant?: {
    __typename: "MedCompliant";
    id: string;
    MedId: string;
    Verification: boolean;
    Date: string;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type UpdateMedCompliantMutationVariables = {
  input: UpdateMedCompliantInput;
  condition?: ModelMedCompliantConditionInput | null;
};

export type UpdateMedCompliantMutation = {
  updateMedCompliant?: {
    __typename: "MedCompliant";
    id: string;
    MedId: string;
    Verification: boolean;
    Date: string;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type DeleteMedCompliantMutationVariables = {
  input: DeleteMedCompliantInput;
  condition?: ModelMedCompliantConditionInput | null;
};

export type DeleteMedCompliantMutation = {
  deleteMedCompliant?: {
    __typename: "MedCompliant";
    id: string;
    MedId: string;
    Verification: boolean;
    Date: string;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type CreateReportSymptomMutationVariables = {
  input: CreateReportSymptomInput;
  condition?: ModelReportSymptomConditionInput | null;
};

export type CreateReportSymptomMutation = {
  createReportSymptom?: {
    __typename: "ReportSymptom";
    id: string;
    ActId: string;
    Name: string;
    Severity: string;
    DateTime: string;
    Summary?: string | null;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type UpdateReportSymptomMutationVariables = {
  input: UpdateReportSymptomInput;
  condition?: ModelReportSymptomConditionInput | null;
};

export type UpdateReportSymptomMutation = {
  updateReportSymptom?: {
    __typename: "ReportSymptom";
    id: string;
    ActId: string;
    Name: string;
    Severity: string;
    DateTime: string;
    Summary?: string | null;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type DeleteReportSymptomMutationVariables = {
  input: DeleteReportSymptomInput;
  condition?: ModelReportSymptomConditionInput | null;
};

export type DeleteReportSymptomMutation = {
  deleteReportSymptom?: {
    __typename: "ReportSymptom";
    id: string;
    ActId: string;
    Name: string;
    Severity: string;
    DateTime: string;
    Summary?: string | null;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type CreateReportVitalsMutationVariables = {
  input: CreateReportVitalsInput;
  condition?: ModelReportVitalsConditionInput | null;
};

export type CreateReportVitalsMutation = {
  createReportVitals?: {
    __typename: "ReportVitals";
    id: string;
    Temperature?: string | null;
    Humidity?: string | null;
    Weight?: string | null;
    BPSys?: string | null;
    BPDi?: string | null;
    NoSteps?: string | null;
    OxySat?: string | null;
    FluidIntake?: string | null;
    DateTime: string;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type UpdateReportVitalsMutationVariables = {
  input: UpdateReportVitalsInput;
  condition?: ModelReportVitalsConditionInput | null;
};

export type UpdateReportVitalsMutation = {
  updateReportVitals?: {
    __typename: "ReportVitals";
    id: string;
    Temperature?: string | null;
    Humidity?: string | null;
    Weight?: string | null;
    BPSys?: string | null;
    BPDi?: string | null;
    NoSteps?: string | null;
    OxySat?: string | null;
    FluidIntake?: string | null;
    DateTime: string;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type DeleteReportVitalsMutationVariables = {
  input: DeleteReportVitalsInput;
  condition?: ModelReportVitalsConditionInput | null;
};

export type DeleteReportVitalsMutation = {
  deleteReportVitals?: {
    __typename: "ReportVitals";
    id: string;
    Temperature?: string | null;
    Humidity?: string | null;
    Weight?: string | null;
    BPSys?: string | null;
    BPDi?: string | null;
    NoSteps?: string | null;
    OxySat?: string | null;
    FluidIntake?: string | null;
    DateTime: string;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type CreateMedicalRecordMutationVariables = {
  input: CreateMedicalRecordInput;
  condition?: ModelMedicalRecordConditionInput | null;
};

export type CreateMedicalRecordMutation = {
  createMedicalRecord?: {
    __typename: "MedicalRecord";
    id: string;
    patientID: string;
    clinicianID: string;
    title: string;
    fileKey: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type UpdateMedicalRecordMutationVariables = {
  input: UpdateMedicalRecordInput;
  condition?: ModelMedicalRecordConditionInput | null;
};

export type UpdateMedicalRecordMutation = {
  updateMedicalRecord?: {
    __typename: "MedicalRecord";
    id: string;
    patientID: string;
    clinicianID: string;
    title: string;
    fileKey: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type DeleteMedicalRecordMutationVariables = {
  input: DeleteMedicalRecordInput;
  condition?: ModelMedicalRecordConditionInput | null;
};

export type DeleteMedicalRecordMutation = {
  deleteMedicalRecord?: {
    __typename: "MedicalRecord";
    id: string;
    patientID: string;
    clinicianID: string;
    title: string;
    fileKey: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type CreateIcdCrtRecordMutationVariables = {
  input: CreateIcdCrtRecordInput;
  condition?: ModelIcdCrtRecordConditionInput | null;
};

export type CreateIcdCrtRecordMutation = {
  createIcdCrtRecord?: {
    __typename: "IcdCrtRecord";
    id: string;
    patientID: string;
    clinicianID: string;
    title: string;
    dateTime: string;
    fileKey: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type UpdateIcdCrtRecordMutationVariables = {
  input: UpdateIcdCrtRecordInput;
  condition?: ModelIcdCrtRecordConditionInput | null;
};

export type UpdateIcdCrtRecordMutation = {
  updateIcdCrtRecord?: {
    __typename: "IcdCrtRecord";
    id: string;
    patientID: string;
    clinicianID: string;
    title: string;
    dateTime: string;
    fileKey: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type DeleteIcdCrtRecordMutationVariables = {
  input: DeleteIcdCrtRecordInput;
  condition?: ModelIcdCrtRecordConditionInput | null;
};

export type DeleteIcdCrtRecordMutation = {
  deleteIcdCrtRecord?: {
    __typename: "IcdCrtRecord";
    id: string;
    patientID: string;
    clinicianID: string;
    title: string;
    dateTime: string;
    fileKey: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type CreateClinicianInfoMutationVariables = {
  input: CreateClinicianInfoInput;
  condition?: ModelClinicianInfoConditionInput | null;
};

export type CreateClinicianInfoMutation = {
  createClinicianInfo?: {
    __typename: "ClinicianInfo";
    id?: string | null;
    clinicianID: string;
    name: string;
    hospitalName: string;
    role: string;
    contactNumber: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type UpdateClinicianInfoMutationVariables = {
  input: UpdateClinicianInfoInput;
  condition?: ModelClinicianInfoConditionInput | null;
};

export type UpdateClinicianInfoMutation = {
  updateClinicianInfo?: {
    __typename: "ClinicianInfo";
    id?: string | null;
    clinicianID: string;
    name: string;
    hospitalName: string;
    role: string;
    contactNumber: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type DeleteClinicianInfoMutationVariables = {
  input: DeleteClinicianInfoInput;
  condition?: ModelClinicianInfoConditionInput | null;
};

export type DeleteClinicianInfoMutation = {
  deleteClinicianInfo?: {
    __typename: "ClinicianInfo";
    id?: string | null;
    clinicianID: string;
    name: string;
    hospitalName: string;
    role: string;
    contactNumber: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type CreateClinicianProtectedInfoMutationVariables = {
  input: CreateClinicianProtectedInfoInput;
  condition?: ModelClinicianProtectedInfoConditionInput | null;
};

export type CreateClinicianProtectedInfoMutation = {
  createClinicianProtectedInfo?: {
    __typename: "ClinicianProtectedInfo";
    id?: string | null;
    clinicianID: string;
    facts: string;
    APS: string;
    DTA: string;
    UXSA: string;
    NWA: string;
    ALA: string;
    MHA: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type UpdateClinicianProtectedInfoMutationVariables = {
  input: UpdateClinicianProtectedInfoInput;
  condition?: ModelClinicianProtectedInfoConditionInput | null;
};

export type UpdateClinicianProtectedInfoMutation = {
  updateClinicianProtectedInfo?: {
    __typename: "ClinicianProtectedInfo";
    id?: string | null;
    clinicianID: string;
    facts: string;
    APS: string;
    DTA: string;
    UXSA: string;
    NWA: string;
    ALA: string;
    MHA: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type DeleteClinicianProtectedInfoMutationVariables = {
  input: DeleteClinicianProtectedInfoInput;
  condition?: ModelClinicianProtectedInfoConditionInput | null;
};

export type DeleteClinicianProtectedInfoMutation = {
  deleteClinicianProtectedInfo?: {
    __typename: "ClinicianProtectedInfo";
    id?: string | null;
    clinicianID: string;
    facts: string;
    APS: string;
    DTA: string;
    UXSA: string;
    NWA: string;
    ALA: string;
    MHA: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type CreateClinicianPatientMapMutationVariables = {
  input: CreateClinicianPatientMapInput;
  condition?: ModelClinicianPatientMapConditionInput | null;
};

export type CreateClinicianPatientMapMutation = {
  createClinicianPatientMap?: {
    __typename: "ClinicianPatientMap";
    id?: string | null;
    clinicianID: string;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type UpdateClinicianPatientMapMutationVariables = {
  input: UpdateClinicianPatientMapInput;
  condition?: ModelClinicianPatientMapConditionInput | null;
};

export type UpdateClinicianPatientMapMutation = {
  updateClinicianPatientMap?: {
    __typename: "ClinicianPatientMap";
    id?: string | null;
    clinicianID: string;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type DeleteClinicianPatientMapMutationVariables = {
  input: DeleteClinicianPatientMapInput;
  condition?: ModelClinicianPatientMapConditionInput | null;
};

export type DeleteClinicianPatientMapMutation = {
  deleteClinicianPatientMap?: {
    __typename: "ClinicianPatientMap";
    id?: string | null;
    clinicianID: string;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type DeletePatientAssignmentMutationVariables = {
  input: DeletePatientAssignmentInput;
  condition?: ModelPatientAssignmentConditionInput | null;
};

export type DeletePatientAssignmentMutation = {
  deletePatientAssignment?: {
    __typename: "PatientAssignment";
    id?: string | null;
    patientID: string;
    clinicianID: string;
    patientName: string;
    pending?: string | null;
    resolution?: string | null;
    reassignToClinicianID?: string | null;
    adminCompleted?: boolean | null;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    adminReassignFromClinicianID?: string | null;
  } | null;
};

export type CreatePatientAssignmentMutationVariables = {
  input: CreatePatientAssignmentInput;
  condition?: ModelPatientAssignmentConditionInput | null;
};

export type CreatePatientAssignmentMutation = {
  createPatientAssignment?: {
    __typename: "PatientAssignment";
    id?: string | null;
    patientID: string;
    clinicianID: string;
    patientName: string;
    pending?: string | null;
    resolution?: string | null;
    reassignToClinicianID?: string | null;
    adminCompleted?: boolean | null;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    adminReassignFromClinicianID?: string | null;
  } | null;
};

export type UpdatePatientAssignmentMutationVariables = {
  input: UpdatePatientAssignmentInput;
  condition?: ModelPatientAssignmentConditionInput | null;
};

export type UpdatePatientAssignmentMutation = {
  updatePatientAssignment?: {
    __typename: "PatientAssignment";
    id?: string | null;
    patientID: string;
    clinicianID: string;
    patientName: string;
    pending?: string | null;
    resolution?: string | null;
    reassignToClinicianID?: string | null;
    adminCompleted?: boolean | null;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    adminReassignFromClinicianID?: string | null;
  } | null;
};

export type CreateAlertMutationVariables = {
  input: CreateAlertInput;
  condition?: ModelAlertConditionInput | null;
};

export type CreateAlertMutation = {
  createAlert?: {
    __typename: "Alert";
    id: string;
    patientID: string;
    patientName: string;
    dateTime: string;
    summary: string;
    colorCode: string;
    vitalsReportID: string;
    symptomReportID: string;
    pending?: string | null;
    completed?: string | null;
    owner: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type UpdateAlertMutationVariables = {
  input: UpdateAlertInput;
  condition?: ModelAlertConditionInput | null;
};

export type UpdateAlertMutation = {
  updateAlert?: {
    __typename: "Alert";
    id: string;
    patientID: string;
    patientName: string;
    dateTime: string;
    summary: string;
    colorCode: string;
    vitalsReportID: string;
    symptomReportID: string;
    pending?: string | null;
    completed?: string | null;
    owner: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type DeleteAlertMutationVariables = {
  input: DeleteAlertInput;
  condition?: ModelAlertConditionInput | null;
};

export type DeleteAlertMutation = {
  deleteAlert?: {
    __typename: "Alert";
    id: string;
    patientID: string;
    patientName: string;
    dateTime: string;
    summary: string;
    colorCode: string;
    vitalsReportID: string;
    symptomReportID: string;
    pending?: string | null;
    completed?: string | null;
    owner: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type CreateTodoMutationVariables = {
  input: CreateTodoInput;
  condition?: ModelTodoConditionInput | null;
};

export type CreateTodoMutation = {
  createTodo?: {
    __typename: "Todo";
    id: string;
    clinicianID: string;
    title: string;
    patientName: string;
    notes: string;
    lastModified: string;
    alertID?: string | null;
    pending?: string | null;
    completed?: string | null;
    owner: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type UpdateTodoMutationVariables = {
  input: UpdateTodoInput;
  condition?: ModelTodoConditionInput | null;
};

export type UpdateTodoMutation = {
  updateTodo?: {
    __typename: "Todo";
    id: string;
    clinicianID: string;
    title: string;
    patientName: string;
    notes: string;
    lastModified: string;
    alertID?: string | null;
    pending?: string | null;
    completed?: string | null;
    owner: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type DeleteTodoMutationVariables = {
  input: DeleteTodoInput;
  condition?: ModelTodoConditionInput | null;
};

export type DeleteTodoMutation = {
  deleteTodo?: {
    __typename: "Todo";
    id: string;
    clinicianID: string;
    title: string;
    patientName: string;
    notes: string;
    lastModified: string;
    alertID?: string | null;
    pending?: string | null;
    completed?: string | null;
    owner: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type CreateAlertNotificationMutationVariables = {
  input: CreateAlertNotificationInput;
  condition?: ModelAlertNotificationConditionInput | null;
};

export type CreateAlertNotificationMutation = {
  createAlertNotification?: {
    __typename: "AlertNotification";
    id: string;
    patientID: string;
    alertID: string;
    owner: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type UpdateAlertNotificationMutationVariables = {
  input: UpdateAlertNotificationInput;
  condition?: ModelAlertNotificationConditionInput | null;
};

export type UpdateAlertNotificationMutation = {
  updateAlertNotification?: {
    __typename: "AlertNotification";
    id: string;
    patientID: string;
    alertID: string;
    owner: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type DeleteAlertNotificationMutationVariables = {
  input: DeleteAlertNotificationInput;
  condition?: ModelAlertNotificationConditionInput | null;
};

export type DeleteAlertNotificationMutation = {
  deleteAlertNotification?: {
    __typename: "AlertNotification";
    id: string;
    patientID: string;
    alertID: string;
    owner: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type EchoQueryVariables = {
  msg?: string | null;
};

export type EchoQuery = {
  echo?: string | null;
};

export type GetPatientInfoQueryVariables = {
  patientID: string;
};

export type GetPatientInfoQuery = {
  getPatientInfo?: {
    __typename: "PatientInfo";
    id: string;
    name: string;
    address: string;
    deviceNo: string;
    diagnosisInfo: string;
    NHYAclass: string;
    cardiologist: string;
    hospitalName: string;
    hospitalLocation: string;
    targetWeight: string;
    targetActivity: string;
    riskLevel: string;
    gender: string;
    birthDate: string;
    language: string;
    phoneNumber: string;
    email: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
    fluidIntakeGoal: string;
    configured: boolean;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type ListPatientInfosQueryVariables = {
  patientID?: string | null;
  filter?: ModelPatientInfoFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  sortDirection?: ModelSortDirection | null;
};

export type ListPatientInfosQuery = {
  listPatientInfos?: {
    __typename: "ModelPatientInfoConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type SyncPatientInfosQueryVariables = {
  filter?: ModelPatientInfoFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncPatientInfosQuery = {
  syncPatientInfos?: {
    __typename: "ModelPatientInfoConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type GetMedicationInfoQueryVariables = {
  id: string;
};

export type GetMedicationInfoQuery = {
  getMedicationInfo?: {
    __typename: "MedicationInfo";
    id: string;
    name: string;
    dosage: number;
    frequency: number;
    records: string;
    patientID: string;
    active: boolean;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type ListMedicationInfosQueryVariables = {
  filter?: ModelMedicationInfoFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListMedicationInfosQuery = {
  listMedicationInfos?: {
    __typename: "ModelMedicationInfoConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type ListMedicationInfosByPatientIDQueryVariables = {
  patientID?: string | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelMedicationInfoFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListMedicationInfosByPatientIDQuery = {
  listMedicationInfosByPatientID?: {
    __typename: "ModelMedicationInfoConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type SyncMedicationInfosQueryVariables = {
  filter?: ModelMedicationInfoFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncMedicationInfosQuery = {
  syncMedicationInfos?: {
    __typename: "ModelMedicationInfoConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type GetActivityInfoQueryVariables = {
  id: string;
};

export type GetActivityInfoQuery = {
  getActivityInfo?: {
    __typename: "ActivityInfo";
    id: string;
    Actname: string;
    Location: string;
    expectedFrequency?: number | null;
    expectedDays?: Array<string> | null;
    expectedDurationMinutes?: number | null;
    recordDateTime?: string | null;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type ListActivityInfosQueryVariables = {
  filter?: ModelActivityInfoFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListActivityInfosQuery = {
  listActivityInfos?: {
    __typename: "ModelActivityInfoConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type ListActivityInfosByPatientIDQueryVariables = {
  patientID?: string | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelActivityInfoFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListActivityInfosByPatientIDQuery = {
  listActivityInfosByPatientID?: {
    __typename: "ModelActivityInfoConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type SyncActivityInfosQueryVariables = {
  filter?: ModelActivityInfoFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncActivityInfosQuery = {
  syncActivityInfos?: {
    __typename: "ModelActivityInfoConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type GetMedCompliantQueryVariables = {
  id: string;
};

export type GetMedCompliantQuery = {
  getMedCompliant?: {
    __typename: "MedCompliant";
    id: string;
    MedId: string;
    Verification: boolean;
    Date: string;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type ListMedCompliantsQueryVariables = {
  filter?: ModelMedCompliantFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListMedCompliantsQuery = {
  listMedCompliants?: {
    __typename: "ModelMedCompliantConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type ListMedCompliantsByPatientIDQueryVariables = {
  patientID?: string | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelMedCompliantFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListMedCompliantsByPatientIDQuery = {
  listMedCompliantsByPatientID?: {
    __typename: "ModelMedCompliantConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type ListMedCompliantsByDateQueryVariables = {
  patientID?: string | null;
  Date?: ModelStringKeyConditionInput | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelMedCompliantFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListMedCompliantsByDateQuery = {
  listMedCompliantsByDate?: {
    __typename: "ModelMedCompliantConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type SyncMedCompliantsQueryVariables = {
  filter?: ModelMedCompliantFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncMedCompliantsQuery = {
  syncMedCompliants?: {
    __typename: "ModelMedCompliantConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type GetReportSymptomQueryVariables = {
  id: string;
};

export type GetReportSymptomQuery = {
  getReportSymptom?: {
    __typename: "ReportSymptom";
    id: string;
    ActId: string;
    Name: string;
    Severity: string;
    DateTime: string;
    Summary?: string | null;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type ListReportSymptomsQueryVariables = {
  filter?: ModelReportSymptomFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListReportSymptomsQuery = {
  listReportSymptoms?: {
    __typename: "ModelReportSymptomConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type ListReportSymptomsByPatientIDQueryVariables = {
  patientID?: string | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelReportSymptomFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListReportSymptomsByPatientIDQuery = {
  listReportSymptomsByPatientID?: {
    __typename: "ModelReportSymptomConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type ListReportSymptomsByDateTimeQueryVariables = {
  patientID?: string | null;
  DateTime?: ModelStringKeyConditionInput | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelReportSymptomFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListReportSymptomsByDateTimeQuery = {
  listReportSymptomsByDateTime?: {
    __typename: "ModelReportSymptomConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type SyncReportSymptomsQueryVariables = {
  filter?: ModelReportSymptomFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncReportSymptomsQuery = {
  syncReportSymptoms?: {
    __typename: "ModelReportSymptomConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type GetReportVitalsQueryVariables = {
  id: string;
};

export type GetReportVitalsQuery = {
  getReportVitals?: {
    __typename: "ReportVitals";
    id: string;
    Temperature?: string | null;
    Humidity?: string | null;
    Weight?: string | null;
    BPSys?: string | null;
    BPDi?: string | null;
    NoSteps?: string | null;
    OxySat?: string | null;
    FluidIntake?: string | null;
    DateTime: string;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type ListReportVitalssQueryVariables = {
  filter?: ModelReportVitalsFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListReportVitalssQuery = {
  listReportVitalss?: {
    __typename: "ModelReportVitalsConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type ListReportVitalsByPatientIDQueryVariables = {
  patientID?: string | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelReportVitalsFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListReportVitalsByPatientIDQuery = {
  listReportVitalsByPatientID?: {
    __typename: "ModelReportVitalsConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type ListReportVitalsByDateTimeQueryVariables = {
  patientID?: string | null;
  DateTime?: ModelStringKeyConditionInput | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelReportVitalsFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListReportVitalsByDateTimeQuery = {
  listReportVitalsByDateTime?: {
    __typename: "ModelReportVitalsConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type SyncReportVitalsQueryVariables = {
  filter?: ModelReportVitalsFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncReportVitalsQuery = {
  syncReportVitals?: {
    __typename: "ModelReportVitalsConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type GetMedicalRecordQueryVariables = {
  id: string;
};

export type GetMedicalRecordQuery = {
  getMedicalRecord?: {
    __typename: "MedicalRecord";
    id: string;
    patientID: string;
    clinicianID: string;
    title: string;
    fileKey: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type ListMedicalRecordsQueryVariables = {
  filter?: ModelMedicalRecordFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListMedicalRecordsQuery = {
  listMedicalRecords?: {
    __typename: "ModelMedicalRecordConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type ListMedicalRecordsByPatientIDQueryVariables = {
  patientID?: string | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelMedicalRecordFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListMedicalRecordsByPatientIDQuery = {
  listMedicalRecordsByPatientID?: {
    __typename: "ModelMedicalRecordConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type SyncMedicalRecordsQueryVariables = {
  filter?: ModelMedicalRecordFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncMedicalRecordsQuery = {
  syncMedicalRecords?: {
    __typename: "ModelMedicalRecordConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type GetIcdCrtRecordQueryVariables = {
  id: string;
};

export type GetIcdCrtRecordQuery = {
  getIcdCrtRecord?: {
    __typename: "IcdCrtRecord";
    id: string;
    patientID: string;
    clinicianID: string;
    title: string;
    dateTime: string;
    fileKey: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type ListIcdCrtRecordsQueryVariables = {
  filter?: ModelIcdCrtRecordFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListIcdCrtRecordsQuery = {
  listIcdCrtRecords?: {
    __typename: "ModelIcdCrtRecordConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type ListIcdCrtRecordsByDateTimeQueryVariables = {
  patientID?: string | null;
  dateTime?: ModelStringKeyConditionInput | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelIcdCrtRecordFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListIcdCrtRecordsByDateTimeQuery = {
  listIcdCrtRecordsByDateTime?: {
    __typename: "ModelIcdCrtRecordConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type SyncIcdCrtRecordsQueryVariables = {
  filter?: ModelIcdCrtRecordFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncIcdCrtRecordsQuery = {
  syncIcdCrtRecords?: {
    __typename: "ModelIcdCrtRecordConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type GetClinicianInfoQueryVariables = {
  clinicianID: string;
};

export type GetClinicianInfoQuery = {
  getClinicianInfo?: {
    __typename: "ClinicianInfo";
    id?: string | null;
    clinicianID: string;
    name: string;
    hospitalName: string;
    role: string;
    contactNumber: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type ListClinicianInfosQueryVariables = {
  clinicianID?: string | null;
  filter?: ModelClinicianInfoFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  sortDirection?: ModelSortDirection | null;
};

export type ListClinicianInfosQuery = {
  listClinicianInfos?: {
    __typename: "ModelClinicianInfoConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type SyncClinicianInfosQueryVariables = {
  filter?: ModelClinicianInfoFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncClinicianInfosQuery = {
  syncClinicianInfos?: {
    __typename: "ModelClinicianInfoConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type GetClinicianProtectedInfoQueryVariables = {
  clinicianID: string;
};

export type GetClinicianProtectedInfoQuery = {
  getClinicianProtectedInfo?: {
    __typename: "ClinicianProtectedInfo";
    id?: string | null;
    clinicianID: string;
    facts: string;
    APS: string;
    DTA: string;
    UXSA: string;
    NWA: string;
    ALA: string;
    MHA: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type ListClinicianProtectedInfosQueryVariables = {
  clinicianID?: string | null;
  filter?: ModelClinicianProtectedInfoFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  sortDirection?: ModelSortDirection | null;
};

export type ListClinicianProtectedInfosQuery = {
  listClinicianProtectedInfos?: {
    __typename: "ModelClinicianProtectedInfoConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type SyncClinicianProtectedInfosQueryVariables = {
  filter?: ModelClinicianProtectedInfoFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncClinicianProtectedInfosQuery = {
  syncClinicianProtectedInfos?: {
    __typename: "ModelClinicianProtectedInfoConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type GetClinicianPatientMapQueryVariables = {
  clinicianID: string;
  patientID: string;
};

export type GetClinicianPatientMapQuery = {
  getClinicianPatientMap?: {
    __typename: "ClinicianPatientMap";
    id?: string | null;
    clinicianID: string;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type ListClinicianPatientMapsQueryVariables = {
  clinicianID?: string | null;
  patientID?: ModelStringKeyConditionInput | null;
  filter?: ModelClinicianPatientMapFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  sortDirection?: ModelSortDirection | null;
};

export type ListClinicianPatientMapsQuery = {
  listClinicianPatientMaps?: {
    __typename: "ModelClinicianPatientMapConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type ListClinicianMappingsByPatientIDQueryVariables = {
  patientID?: string | null;
  clinicianID?: ModelStringKeyConditionInput | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelClinicianPatientMapFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListClinicianMappingsByPatientIDQuery = {
  listClinicianMappingsByPatientID?: {
    __typename: "ModelClinicianPatientMapConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type SyncClinicianPatientMapsQueryVariables = {
  filter?: ModelClinicianPatientMapFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncClinicianPatientMapsQuery = {
  syncClinicianPatientMaps?: {
    __typename: "ModelClinicianPatientMapConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type GetPatientAssignmentQueryVariables = {
  patientID: string;
  clinicianID: string;
};

export type GetPatientAssignmentQuery = {
  getPatientAssignment?: {
    __typename: "PatientAssignment";
    id?: string | null;
    patientID: string;
    clinicianID: string;
    patientName: string;
    pending?: string | null;
    resolution?: string | null;
    reassignToClinicianID?: string | null;
    adminCompleted?: boolean | null;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    adminReassignFromClinicianID?: string | null;
  } | null;
};

export type ListPatientAssignmentsQueryVariables = {
  patientID?: string | null;
  clinicianID?: ModelStringKeyConditionInput | null;
  filter?: ModelPatientAssignmentFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  sortDirection?: ModelSortDirection | null;
};

export type ListPatientAssignmentsQuery = {
  listPatientAssignments?: {
    __typename: "ModelPatientAssignmentConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type ListPendingPatientAssignmentsQueryVariables = {
  clinicianID?: string | null;
  pending?: ModelStringKeyConditionInput | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelPatientAssignmentFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListPendingPatientAssignmentsQuery = {
  listPendingPatientAssignments?: {
    __typename: "ModelPatientAssignmentConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type SyncPatientAssignmentsQueryVariables = {
  filter?: ModelPatientAssignmentFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncPatientAssignmentsQuery = {
  syncPatientAssignments?: {
    __typename: "ModelPatientAssignmentConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type GetAlertQueryVariables = {
  id: string;
};

export type GetAlertQuery = {
  getAlert?: {
    __typename: "Alert";
    id: string;
    patientID: string;
    patientName: string;
    dateTime: string;
    summary: string;
    colorCode: string;
    vitalsReportID: string;
    symptomReportID: string;
    pending?: string | null;
    completed?: string | null;
    owner: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type ListAlertsQueryVariables = {
  filter?: ModelAlertFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListAlertsQuery = {
  listAlerts?: {
    __typename: "ModelAlertConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type ListPatientAlertsByDateTimeQueryVariables = {
  patientID?: string | null;
  dateTime?: ModelStringKeyConditionInput | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelAlertFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListPatientAlertsByDateTimeQuery = {
  listPatientAlertsByDateTime?: {
    __typename: "ModelAlertConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type ListPendingAlertsByDateTimeQueryVariables = {
  pending?: string | null;
  dateTime?: ModelStringKeyConditionInput | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelAlertFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListPendingAlertsByDateTimeQuery = {
  listPendingAlertsByDateTime?: {
    __typename: "ModelAlertConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type ListPendingRiskAlertsQueryVariables = {
  pending?: string | null;
  colorCode?: ModelStringKeyConditionInput | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelAlertFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListPendingRiskAlertsQuery = {
  listPendingRiskAlerts?: {
    __typename: "ModelAlertConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type ListCompletedRiskAlertsQueryVariables = {
  completed?: string | null;
  colorCode?: ModelStringKeyConditionInput | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelAlertFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListCompletedRiskAlertsQuery = {
  listCompletedRiskAlerts?: {
    __typename: "ModelAlertConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type SyncAlertsQueryVariables = {
  filter?: ModelAlertFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncAlertsQuery = {
  syncAlerts?: {
    __typename: "ModelAlertConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type GetTodoQueryVariables = {
  id: string;
};

export type GetTodoQuery = {
  getTodo?: {
    __typename: "Todo";
    id: string;
    clinicianID: string;
    title: string;
    patientName: string;
    notes: string;
    lastModified: string;
    alertID?: string | null;
    pending?: string | null;
    completed?: string | null;
    owner: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type ListTodosQueryVariables = {
  filter?: ModelTodoFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListTodosQuery = {
  listTodos?: {
    __typename: "ModelTodoConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type ListPendingTodosByLastModifiedDateQueryVariables = {
  pending?: string | null;
  lastModified?: ModelStringKeyConditionInput | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelTodoFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListPendingTodosByLastModifiedDateQuery = {
  listPendingTodosByLastModifiedDate?: {
    __typename: "ModelTodoConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type ListCompletedTodosByLastModifiedDateQueryVariables = {
  completed?: string | null;
  lastModified?: ModelStringKeyConditionInput | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelTodoFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListCompletedTodosByLastModifiedDateQuery = {
  listCompletedTodosByLastModifiedDate?: {
    __typename: "ModelTodoConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type ListTodosByAlertIDQueryVariables = {
  clinicianID?: string | null;
  alertID?: ModelIDKeyConditionInput | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelTodoFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListTodosByAlertIDQuery = {
  listTodosByAlertID?: {
    __typename: "ModelTodoConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type SyncTodosQueryVariables = {
  filter?: ModelTodoFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncTodosQuery = {
  syncTodos?: {
    __typename: "ModelTodoConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type GetAlertNotificationQueryVariables = {
  id: string;
};

export type GetAlertNotificationQuery = {
  getAlertNotification?: {
    __typename: "AlertNotification";
    id: string;
    patientID: string;
    alertID: string;
    owner: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type ListAlertNotificationsQueryVariables = {
  filter?: ModelAlertNotificationFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListAlertNotificationsQuery = {
  listAlertNotifications?: {
    __typename: "ModelAlertNotificationConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type SyncAlertNotificationsQueryVariables = {
  filter?: ModelAlertNotificationFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncAlertNotificationsQuery = {
  syncAlertNotifications?: {
    __typename: "ModelAlertNotificationConnection";
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type OnCreatePatientInfoSubscriptionVariables = {
  owner?: string | null;
};

export type OnCreatePatientInfoSubscription = {
  onCreatePatientInfo?: {
    __typename: "PatientInfo";
    id: string;
    name: string;
    address: string;
    deviceNo: string;
    diagnosisInfo: string;
    NHYAclass: string;
    cardiologist: string;
    hospitalName: string;
    hospitalLocation: string;
    targetWeight: string;
    targetActivity: string;
    riskLevel: string;
    gender: string;
    birthDate: string;
    language: string;
    phoneNumber: string;
    email: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
    fluidIntakeGoal: string;
    configured: boolean;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnUpdatePatientInfoSubscriptionVariables = {
  owner?: string | null;
};

export type OnUpdatePatientInfoSubscription = {
  onUpdatePatientInfo?: {
    __typename: "PatientInfo";
    id: string;
    name: string;
    address: string;
    deviceNo: string;
    diagnosisInfo: string;
    NHYAclass: string;
    cardiologist: string;
    hospitalName: string;
    hospitalLocation: string;
    targetWeight: string;
    targetActivity: string;
    riskLevel: string;
    gender: string;
    birthDate: string;
    language: string;
    phoneNumber: string;
    email: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
    fluidIntakeGoal: string;
    configured: boolean;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnDeletePatientInfoSubscriptionVariables = {
  owner?: string | null;
};

export type OnDeletePatientInfoSubscription = {
  onDeletePatientInfo?: {
    __typename: "PatientInfo";
    id: string;
    name: string;
    address: string;
    deviceNo: string;
    diagnosisInfo: string;
    NHYAclass: string;
    cardiologist: string;
    hospitalName: string;
    hospitalLocation: string;
    targetWeight: string;
    targetActivity: string;
    riskLevel: string;
    gender: string;
    birthDate: string;
    language: string;
    phoneNumber: string;
    email: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
    fluidIntakeGoal: string;
    configured: boolean;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnCreateMedicationInfoSubscriptionVariables = {
  owner?: string | null;
  patientID?: string | null;
};

export type OnCreateMedicationInfoSubscription = {
  onCreateMedicationInfo?: {
    __typename: "MedicationInfo";
    id: string;
    name: string;
    dosage: number;
    frequency: number;
    records: string;
    patientID: string;
    active: boolean;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnUpdateMedicationInfoSubscriptionVariables = {
  owner?: string | null;
  patientID?: string | null;
};

export type OnUpdateMedicationInfoSubscription = {
  onUpdateMedicationInfo?: {
    __typename: "MedicationInfo";
    id: string;
    name: string;
    dosage: number;
    frequency: number;
    records: string;
    patientID: string;
    active: boolean;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnDeleteMedicationInfoSubscriptionVariables = {
  owner?: string | null;
  patientID?: string | null;
};

export type OnDeleteMedicationInfoSubscription = {
  onDeleteMedicationInfo?: {
    __typename: "MedicationInfo";
    id: string;
    name: string;
    dosage: number;
    frequency: number;
    records: string;
    patientID: string;
    active: boolean;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnCreateActivityInfoSubscriptionVariables = {
  owner?: string | null;
};

export type OnCreateActivityInfoSubscription = {
  onCreateActivityInfo?: {
    __typename: "ActivityInfo";
    id: string;
    Actname: string;
    Location: string;
    expectedFrequency?: number | null;
    expectedDays?: Array<string> | null;
    expectedDurationMinutes?: number | null;
    recordDateTime?: string | null;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnUpdateActivityInfoSubscriptionVariables = {
  owner?: string | null;
};

export type OnUpdateActivityInfoSubscription = {
  onUpdateActivityInfo?: {
    __typename: "ActivityInfo";
    id: string;
    Actname: string;
    Location: string;
    expectedFrequency?: number | null;
    expectedDays?: Array<string> | null;
    expectedDurationMinutes?: number | null;
    recordDateTime?: string | null;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnDeleteActivityInfoSubscriptionVariables = {
  owner?: string | null;
};

export type OnDeleteActivityInfoSubscription = {
  onDeleteActivityInfo?: {
    __typename: "ActivityInfo";
    id: string;
    Actname: string;
    Location: string;
    expectedFrequency?: number | null;
    expectedDays?: Array<string> | null;
    expectedDurationMinutes?: number | null;
    recordDateTime?: string | null;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnCreateMedCompliantSubscriptionVariables = {
  owner?: string | null;
};

export type OnCreateMedCompliantSubscription = {
  onCreateMedCompliant?: {
    __typename: "MedCompliant";
    id: string;
    MedId: string;
    Verification: boolean;
    Date: string;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnUpdateMedCompliantSubscriptionVariables = {
  owner?: string | null;
};

export type OnUpdateMedCompliantSubscription = {
  onUpdateMedCompliant?: {
    __typename: "MedCompliant";
    id: string;
    MedId: string;
    Verification: boolean;
    Date: string;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnDeleteMedCompliantSubscriptionVariables = {
  owner?: string | null;
};

export type OnDeleteMedCompliantSubscription = {
  onDeleteMedCompliant?: {
    __typename: "MedCompliant";
    id: string;
    MedId: string;
    Verification: boolean;
    Date: string;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnCreateReportSymptomSubscriptionVariables = {
  owner?: string | null;
};

export type OnCreateReportSymptomSubscription = {
  onCreateReportSymptom?: {
    __typename: "ReportSymptom";
    id: string;
    ActId: string;
    Name: string;
    Severity: string;
    DateTime: string;
    Summary?: string | null;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnUpdateReportSymptomSubscriptionVariables = {
  owner?: string | null;
};

export type OnUpdateReportSymptomSubscription = {
  onUpdateReportSymptom?: {
    __typename: "ReportSymptom";
    id: string;
    ActId: string;
    Name: string;
    Severity: string;
    DateTime: string;
    Summary?: string | null;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnDeleteReportSymptomSubscriptionVariables = {
  owner?: string | null;
};

export type OnDeleteReportSymptomSubscription = {
  onDeleteReportSymptom?: {
    __typename: "ReportSymptom";
    id: string;
    ActId: string;
    Name: string;
    Severity: string;
    DateTime: string;
    Summary?: string | null;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnCreateReportVitalsSubscriptionVariables = {
  owner?: string | null;
};

export type OnCreateReportVitalsSubscription = {
  onCreateReportVitals?: {
    __typename: "ReportVitals";
    id: string;
    Temperature?: string | null;
    Humidity?: string | null;
    Weight?: string | null;
    BPSys?: string | null;
    BPDi?: string | null;
    NoSteps?: string | null;
    OxySat?: string | null;
    FluidIntake?: string | null;
    DateTime: string;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnUpdateReportVitalsSubscriptionVariables = {
  owner?: string | null;
};

export type OnUpdateReportVitalsSubscription = {
  onUpdateReportVitals?: {
    __typename: "ReportVitals";
    id: string;
    Temperature?: string | null;
    Humidity?: string | null;
    Weight?: string | null;
    BPSys?: string | null;
    BPDi?: string | null;
    NoSteps?: string | null;
    OxySat?: string | null;
    FluidIntake?: string | null;
    DateTime: string;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnDeleteReportVitalsSubscriptionVariables = {
  owner?: string | null;
};

export type OnDeleteReportVitalsSubscription = {
  onDeleteReportVitals?: {
    __typename: "ReportVitals";
    id: string;
    Temperature?: string | null;
    Humidity?: string | null;
    Weight?: string | null;
    BPSys?: string | null;
    BPDi?: string | null;
    NoSteps?: string | null;
    OxySat?: string | null;
    FluidIntake?: string | null;
    DateTime: string;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnCreateMedicalRecordSubscriptionVariables = {
  clinicianID?: string | null;
};

export type OnCreateMedicalRecordSubscription = {
  onCreateMedicalRecord?: {
    __typename: "MedicalRecord";
    id: string;
    patientID: string;
    clinicianID: string;
    title: string;
    fileKey: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnUpdateMedicalRecordSubscriptionVariables = {
  clinicianID?: string | null;
};

export type OnUpdateMedicalRecordSubscription = {
  onUpdateMedicalRecord?: {
    __typename: "MedicalRecord";
    id: string;
    patientID: string;
    clinicianID: string;
    title: string;
    fileKey: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnDeleteMedicalRecordSubscriptionVariables = {
  clinicianID?: string | null;
};

export type OnDeleteMedicalRecordSubscription = {
  onDeleteMedicalRecord?: {
    __typename: "MedicalRecord";
    id: string;
    patientID: string;
    clinicianID: string;
    title: string;
    fileKey: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnCreateIcdCrtRecordSubscriptionVariables = {
  clinicianID?: string | null;
};

export type OnCreateIcdCrtRecordSubscription = {
  onCreateIcdCrtRecord?: {
    __typename: "IcdCrtRecord";
    id: string;
    patientID: string;
    clinicianID: string;
    title: string;
    dateTime: string;
    fileKey: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnUpdateIcdCrtRecordSubscriptionVariables = {
  clinicianID?: string | null;
};

export type OnUpdateIcdCrtRecordSubscription = {
  onUpdateIcdCrtRecord?: {
    __typename: "IcdCrtRecord";
    id: string;
    patientID: string;
    clinicianID: string;
    title: string;
    dateTime: string;
    fileKey: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnDeleteIcdCrtRecordSubscriptionVariables = {
  clinicianID?: string | null;
};

export type OnDeleteIcdCrtRecordSubscription = {
  onDeleteIcdCrtRecord?: {
    __typename: "IcdCrtRecord";
    id: string;
    patientID: string;
    clinicianID: string;
    title: string;
    dateTime: string;
    fileKey: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnCreateClinicianInfoSubscriptionVariables = {
  clinicianID?: string | null;
};

export type OnCreateClinicianInfoSubscription = {
  onCreateClinicianInfo?: {
    __typename: "ClinicianInfo";
    id?: string | null;
    clinicianID: string;
    name: string;
    hospitalName: string;
    role: string;
    contactNumber: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnUpdateClinicianInfoSubscriptionVariables = {
  clinicianID?: string | null;
};

export type OnUpdateClinicianInfoSubscription = {
  onUpdateClinicianInfo?: {
    __typename: "ClinicianInfo";
    id?: string | null;
    clinicianID: string;
    name: string;
    hospitalName: string;
    role: string;
    contactNumber: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnDeleteClinicianInfoSubscriptionVariables = {
  clinicianID?: string | null;
};

export type OnDeleteClinicianInfoSubscription = {
  onDeleteClinicianInfo?: {
    __typename: "ClinicianInfo";
    id?: string | null;
    clinicianID: string;
    name: string;
    hospitalName: string;
    role: string;
    contactNumber: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnCreateClinicianProtectedInfoSubscriptionVariables = {
  clinicianID?: string | null;
};

export type OnCreateClinicianProtectedInfoSubscription = {
  onCreateClinicianProtectedInfo?: {
    __typename: "ClinicianProtectedInfo";
    id?: string | null;
    clinicianID: string;
    facts: string;
    APS: string;
    DTA: string;
    UXSA: string;
    NWA: string;
    ALA: string;
    MHA: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnUpdateClinicianProtectedInfoSubscriptionVariables = {
  clinicianID?: string | null;
};

export type OnUpdateClinicianProtectedInfoSubscription = {
  onUpdateClinicianProtectedInfo?: {
    __typename: "ClinicianProtectedInfo";
    id?: string | null;
    clinicianID: string;
    facts: string;
    APS: string;
    DTA: string;
    UXSA: string;
    NWA: string;
    ALA: string;
    MHA: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnDeleteClinicianProtectedInfoSubscriptionVariables = {
  clinicianID?: string | null;
};

export type OnDeleteClinicianProtectedInfoSubscription = {
  onDeleteClinicianProtectedInfo?: {
    __typename: "ClinicianProtectedInfo";
    id?: string | null;
    clinicianID: string;
    facts: string;
    APS: string;
    DTA: string;
    UXSA: string;
    NWA: string;
    ALA: string;
    MHA: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnCreateClinicianPatientMapSubscriptionVariables = {
  clinicianID?: string | null;
  patientID?: string | null;
};

export type OnCreateClinicianPatientMapSubscription = {
  onCreateClinicianPatientMap?: {
    __typename: "ClinicianPatientMap";
    id?: string | null;
    clinicianID: string;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnUpdateClinicianPatientMapSubscriptionVariables = {
  clinicianID?: string | null;
  patientID?: string | null;
};

export type OnUpdateClinicianPatientMapSubscription = {
  onUpdateClinicianPatientMap?: {
    __typename: "ClinicianPatientMap";
    id?: string | null;
    clinicianID: string;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnDeleteClinicianPatientMapSubscriptionVariables = {
  clinicianID?: string | null;
  patientID?: string | null;
};

export type OnDeleteClinicianPatientMapSubscription = {
  onDeleteClinicianPatientMap?: {
    __typename: "ClinicianPatientMap";
    id?: string | null;
    clinicianID: string;
    patientID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnCreatePatientAssignmentSubscriptionVariables = {
  patientID?: string | null;
  clinicianID?: string | null;
};

export type OnCreatePatientAssignmentSubscription = {
  onCreatePatientAssignment?: {
    __typename: "PatientAssignment";
    id?: string | null;
    patientID: string;
    clinicianID: string;
    patientName: string;
    pending?: string | null;
    resolution?: string | null;
    reassignToClinicianID?: string | null;
    adminCompleted?: boolean | null;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    adminReassignFromClinicianID?: string | null;
  } | null;
};

export type OnUpdatePatientAssignmentSubscriptionVariables = {
  patientID?: string | null;
  clinicianID?: string | null;
};

export type OnUpdatePatientAssignmentSubscription = {
  onUpdatePatientAssignment?: {
    __typename: "PatientAssignment";
    id?: string | null;
    patientID: string;
    clinicianID: string;
    patientName: string;
    pending?: string | null;
    resolution?: string | null;
    reassignToClinicianID?: string | null;
    adminCompleted?: boolean | null;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    adminReassignFromClinicianID?: string | null;
  } | null;
};

export type OnDeletePatientAssignmentSubscriptionVariables = {
  patientID?: string | null;
  clinicianID?: string | null;
};

export type OnDeletePatientAssignmentSubscription = {
  onDeletePatientAssignment?: {
    __typename: "PatientAssignment";
    id?: string | null;
    patientID: string;
    clinicianID: string;
    patientName: string;
    pending?: string | null;
    resolution?: string | null;
    reassignToClinicianID?: string | null;
    adminCompleted?: boolean | null;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    adminReassignFromClinicianID?: string | null;
  } | null;
};

export type OnCreateAlertSubscriptionVariables = {
  owner?: string | null;
};

export type OnCreateAlertSubscription = {
  onCreateAlert?: {
    __typename: "Alert";
    id: string;
    patientID: string;
    patientName: string;
    dateTime: string;
    summary: string;
    colorCode: string;
    vitalsReportID: string;
    symptomReportID: string;
    pending?: string | null;
    completed?: string | null;
    owner: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnUpdateAlertSubscriptionVariables = {
  owner?: string | null;
};

export type OnUpdateAlertSubscription = {
  onUpdateAlert?: {
    __typename: "Alert";
    id: string;
    patientID: string;
    patientName: string;
    dateTime: string;
    summary: string;
    colorCode: string;
    vitalsReportID: string;
    symptomReportID: string;
    pending?: string | null;
    completed?: string | null;
    owner: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnDeleteAlertSubscriptionVariables = {
  owner?: string | null;
};

export type OnDeleteAlertSubscription = {
  onDeleteAlert?: {
    __typename: "Alert";
    id: string;
    patientID: string;
    patientName: string;
    dateTime: string;
    summary: string;
    colorCode: string;
    vitalsReportID: string;
    symptomReportID: string;
    pending?: string | null;
    completed?: string | null;
    owner: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnCreateTodoSubscriptionVariables = {
  owner?: string | null;
};

export type OnCreateTodoSubscription = {
  onCreateTodo?: {
    __typename: "Todo";
    id: string;
    clinicianID: string;
    title: string;
    patientName: string;
    notes: string;
    lastModified: string;
    alertID?: string | null;
    pending?: string | null;
    completed?: string | null;
    owner: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnUpdateTodoSubscriptionVariables = {
  owner?: string | null;
};

export type OnUpdateTodoSubscription = {
  onUpdateTodo?: {
    __typename: "Todo";
    id: string;
    clinicianID: string;
    title: string;
    patientName: string;
    notes: string;
    lastModified: string;
    alertID?: string | null;
    pending?: string | null;
    completed?: string | null;
    owner: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnDeleteTodoSubscriptionVariables = {
  owner?: string | null;
};

export type OnDeleteTodoSubscription = {
  onDeleteTodo?: {
    __typename: "Todo";
    id: string;
    clinicianID: string;
    title: string;
    patientName: string;
    notes: string;
    lastModified: string;
    alertID?: string | null;
    pending?: string | null;
    completed?: string | null;
    owner: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnCreateAlertNotificationSubscription = {
  onCreateAlertNotification?: {
    __typename: "AlertNotification";
    id: string;
    patientID: string;
    alertID: string;
    owner: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnUpdateAlertNotificationSubscription = {
  onUpdateAlertNotification?: {
    __typename: "AlertNotification";
    id: string;
    patientID: string;
    alertID: string;
    owner: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnDeleteAlertNotificationSubscription = {
  onDeleteAlertNotification?: {
    __typename: "AlertNotification";
    id: string;
    patientID: string;
    alertID: string;
    owner: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};
