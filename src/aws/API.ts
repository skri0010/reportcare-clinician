/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreatePatientInfoInput = {
  patientID: string,
  name: string,
  address: string,
  gender: string,
  birthDate: string,
  language: string,
  phoneNumber: string,
  email: string,
  emergencyContactName: string,
  emergencyContactNumber: string,
  riskLevel: string,
  NYHAClass?: string | null,
  cardiologist?: string | null,
  diagnosisInfo?: string | null,
  hospitalName?: string | null,
  hospitalLocation?: string | null,
  targetWeight?: number | null,
  targetSteps?: number | null,
  deviceNo?: string | null,
  fluidIntakeGoalInMl?: number | null,
  configured: boolean,
  version: number,
};

export type ModelPatientInfoConditionInput = {
  name?: ModelStringInput | null,
  address?: ModelStringInput | null,
  gender?: ModelStringInput | null,
  birthDate?: ModelStringInput | null,
  language?: ModelStringInput | null,
  phoneNumber?: ModelStringInput | null,
  email?: ModelStringInput | null,
  emergencyContactName?: ModelStringInput | null,
  emergencyContactNumber?: ModelStringInput | null,
  riskLevel?: ModelStringInput | null,
  NYHAClass?: ModelStringInput | null,
  cardiologist?: ModelStringInput | null,
  diagnosisInfo?: ModelStringInput | null,
  hospitalName?: ModelStringInput | null,
  hospitalLocation?: ModelStringInput | null,
  targetWeight?: ModelFloatInput | null,
  targetSteps?: ModelIntInput | null,
  deviceNo?: ModelStringInput | null,
  fluidIntakeGoalInMl?: ModelIntInput | null,
  configured?: ModelBooleanInput | null,
  version?: ModelIntInput | null,
  and?: Array< ModelPatientInfoConditionInput | null > | null,
  or?: Array< ModelPatientInfoConditionInput | null > | null,
  not?: ModelPatientInfoConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
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
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type PatientInfo = {
  __typename: "PatientInfo",
  patientID: string,
  name: string,
  address: string,
  gender: string,
  birthDate: string,
  language: string,
  phoneNumber: string,
  email: string,
  emergencyContactName: string,
  emergencyContactNumber: string,
  riskLevel: string,
  NYHAClass?: string | null,
  cardiologist?: string | null,
  diagnosisInfo?: string | null,
  hospitalName?: string | null,
  hospitalLocation?: string | null,
  targetWeight?: number | null,
  targetSteps?: number | null,
  deviceNo?: string | null,
  fluidIntakeGoalInMl?: number | null,
  configured: boolean,
  version: number,
  createdAt: string,
  updatedAt: string,
};

export type UpdatePatientInfoInput = {
  patientID: string,
  name?: string | null,
  address?: string | null,
  gender?: string | null,
  birthDate?: string | null,
  language?: string | null,
  phoneNumber?: string | null,
  email?: string | null,
  emergencyContactName?: string | null,
  emergencyContactNumber?: string | null,
  riskLevel?: string | null,
  NYHAClass?: string | null,
  cardiologist?: string | null,
  diagnosisInfo?: string | null,
  hospitalName?: string | null,
  hospitalLocation?: string | null,
  targetWeight?: number | null,
  targetSteps?: number | null,
  deviceNo?: string | null,
  fluidIntakeGoalInMl?: number | null,
  configured?: boolean | null,
  version?: number | null,
};

export type DeletePatientInfoInput = {
  patientID: string,
};

export type CreateMedicationInfoInput = {
  id?: string | null,
  patientID: string,
  name: string,
  dosage: number,
  frequency: number,
  records: string,
  active: boolean,
};

export type ModelMedicationInfoConditionInput = {
  name?: ModelStringInput | null,
  dosage?: ModelFloatInput | null,
  frequency?: ModelIntInput | null,
  records?: ModelStringInput | null,
  active?: ModelBooleanInput | null,
  and?: Array< ModelMedicationInfoConditionInput | null > | null,
  or?: Array< ModelMedicationInfoConditionInput | null > | null,
  not?: ModelMedicationInfoConditionInput | null,
};

export type MedicationInfo = {
  __typename: "MedicationInfo",
  id: string,
  patientID: string,
  name: string,
  dosage: number,
  frequency: number,
  records: string,
  active: boolean,
  createdAt: string,
  updatedAt: string,
};

export type UpdateMedicationInfoInput = {
  id: string,
  patientID?: string | null,
  name?: string | null,
  dosage?: number | null,
  frequency?: number | null,
  records?: string | null,
  active?: boolean | null,
};

export type DeleteMedicationInfoInput = {
  id: string,
};

export type CreateActivityInfoInput = {
  id?: string | null,
  patientID: string,
  activityName: string,
  startTime: string,
  days?: Array< string > | null,
  durationInMinutes?: number | null,
  locations?: Array< string > | null,
  symptoms?: Array< string > | null,
};

export type ModelActivityInfoConditionInput = {
  activityName?: ModelStringInput | null,
  startTime?: ModelStringInput | null,
  days?: ModelStringInput | null,
  durationInMinutes?: ModelIntInput | null,
  locations?: ModelStringInput | null,
  symptoms?: ModelStringInput | null,
  and?: Array< ModelActivityInfoConditionInput | null > | null,
  or?: Array< ModelActivityInfoConditionInput | null > | null,
  not?: ModelActivityInfoConditionInput | null,
};

export type ActivityInfo = {
  __typename: "ActivityInfo",
  id: string,
  patientID: string,
  activityName: string,
  startTime: string,
  days?: Array< string > | null,
  durationInMinutes?: number | null,
  locations?: Array< string > | null,
  symptoms?: Array< string > | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateActivityInfoInput = {
  id: string,
  patientID?: string | null,
  activityName?: string | null,
  startTime?: string | null,
  days?: Array< string > | null,
  durationInMinutes?: number | null,
  locations?: Array< string > | null,
  symptoms?: Array< string > | null,
};

export type DeleteActivityInfoInput = {
  id: string,
};

export type CreateReportSymptomInput = {
  id?: string | null,
  patientID: string,
  activityInfoID: string,
  symptomName: string,
  severity: number,
  dateTime: string,
  summary: string,
  weather?: string | null,
  temperature?: string | null,
  humidity?: string | null,
};

export type ModelReportSymptomConditionInput = {
  activityInfoID?: ModelIDInput | null,
  symptomName?: ModelStringInput | null,
  severity?: ModelIntInput | null,
  dateTime?: ModelStringInput | null,
  summary?: ModelStringInput | null,
  weather?: ModelStringInput | null,
  temperature?: ModelStringInput | null,
  humidity?: ModelStringInput | null,
  and?: Array< ModelReportSymptomConditionInput | null > | null,
  or?: Array< ModelReportSymptomConditionInput | null > | null,
  not?: ModelReportSymptomConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ReportSymptom = {
  __typename: "ReportSymptom",
  id: string,
  patientID: string,
  activityInfoID: string,
  symptomName: string,
  severity: number,
  dateTime: string,
  summary: string,
  weather?: string | null,
  temperature?: string | null,
  humidity?: string | null,
  createdAt: string,
  updatedAt: string,
  activityInfo?: ActivityInfo | null,
};

export type UpdateReportSymptomInput = {
  id: string,
  patientID?: string | null,
  activityInfoID?: string | null,
  symptomName?: string | null,
  severity?: number | null,
  dateTime?: string | null,
  summary?: string | null,
  weather?: string | null,
  temperature?: string | null,
  humidity?: string | null,
};

export type DeleteReportSymptomInput = {
  id: string,
};

export type CreateReportVitalsInput = {
  id?: string | null,
  patientID: string,
  dateTime: string,
  weight?: number | null,
  systolicBloodPressure?: number | null,
  diastolicBloodPressure?: number | null,
  oxygenSaturation?: number | null,
  fluidIntakeInMl?: number | null,
  weather?: string | null,
  temperature?: number | null,
  humidity?: number | null,
};

export type ModelReportVitalsConditionInput = {
  dateTime?: ModelStringInput | null,
  weight?: ModelFloatInput | null,
  systolicBloodPressure?: ModelFloatInput | null,
  diastolicBloodPressure?: ModelFloatInput | null,
  oxygenSaturation?: ModelFloatInput | null,
  fluidIntakeInMl?: ModelIntInput | null,
  weather?: ModelStringInput | null,
  temperature?: ModelFloatInput | null,
  humidity?: ModelFloatInput | null,
  and?: Array< ModelReportVitalsConditionInput | null > | null,
  or?: Array< ModelReportVitalsConditionInput | null > | null,
  not?: ModelReportVitalsConditionInput | null,
};

export type ReportVitals = {
  __typename: "ReportVitals",
  id: string,
  patientID: string,
  dateTime: string,
  weight?: number | null,
  systolicBloodPressure?: number | null,
  diastolicBloodPressure?: number | null,
  oxygenSaturation?: number | null,
  fluidIntakeInMl?: number | null,
  weather?: string | null,
  temperature?: number | null,
  humidity?: number | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateReportVitalsInput = {
  id: string,
  patientID?: string | null,
  dateTime?: string | null,
  weight?: number | null,
  systolicBloodPressure?: number | null,
  diastolicBloodPressure?: number | null,
  oxygenSaturation?: number | null,
  fluidIntakeInMl?: number | null,
  weather?: string | null,
  temperature?: number | null,
  humidity?: number | null,
};

export type DeleteReportVitalsInput = {
  id: string,
};

export type CreatePhysicalInput = {
  id?: string | null,
  patientID: string,
  steps: number,
  stepsGoal: number,
  averageWalkingSpeedInMetresPerSeconds: number,
  distanceInMetres: number,
  dateTime: string,
};

export type ModelPhysicalConditionInput = {
  steps?: ModelIntInput | null,
  stepsGoal?: ModelIntInput | null,
  averageWalkingSpeedInMetresPerSeconds?: ModelFloatInput | null,
  distanceInMetres?: ModelFloatInput | null,
  dateTime?: ModelStringInput | null,
  and?: Array< ModelPhysicalConditionInput | null > | null,
  or?: Array< ModelPhysicalConditionInput | null > | null,
  not?: ModelPhysicalConditionInput | null,
};

export type Physical = {
  __typename: "Physical",
  id: string,
  patientID: string,
  steps: number,
  stepsGoal: number,
  averageWalkingSpeedInMetresPerSeconds: number,
  distanceInMetres: number,
  dateTime: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdatePhysicalInput = {
  id: string,
  patientID?: string | null,
  steps?: number | null,
  stepsGoal?: number | null,
  averageWalkingSpeedInMetresPerSeconds?: number | null,
  distanceInMetres?: number | null,
  dateTime?: string | null,
};

export type DeletePhysicalInput = {
  id: string,
};

export type CreateClinicianInfoInput = {
  clinicianID: string,
  name: string,
  hospitalName: string,
  role: string,
  contactNumber: string,
  version: number,
};

export type ModelClinicianInfoConditionInput = {
  name?: ModelStringInput | null,
  hospitalName?: ModelStringInput | null,
  role?: ModelStringInput | null,
  contactNumber?: ModelStringInput | null,
  version?: ModelIntInput | null,
  and?: Array< ModelClinicianInfoConditionInput | null > | null,
  or?: Array< ModelClinicianInfoConditionInput | null > | null,
  not?: ModelClinicianInfoConditionInput | null,
};

export type ClinicianInfo = {
  __typename: "ClinicianInfo",
  clinicianID: string,
  name: string,
  hospitalName: string,
  role: string,
  contactNumber: string,
  version: number,
  createdAt: string,
  updatedAt: string,
  protectedInfo?: ClinicianProtectedInfo | null,
};

export type ClinicianProtectedInfo = {
  __typename: "ClinicianProtectedInfo",
  clinicianID: string,
  facts: string,
  APS: string,
  DTA: string,
  UXSA: string,
  NWA: string,
  ALA: string,
  MHA: string,
  CAM: string,
  version: number,
  createdAt: string,
  updatedAt: string,
};

export type UpdateClinicianInfoInput = {
  clinicianID: string,
  name?: string | null,
  hospitalName?: string | null,
  role?: string | null,
  contactNumber?: string | null,
  version?: number | null,
};

export type DeleteClinicianInfoInput = {
  clinicianID: string,
};

export type CreateClinicianProtectedInfoInput = {
  clinicianID: string,
  facts: string,
  APS: string,
  DTA: string,
  UXSA: string,
  NWA: string,
  ALA: string,
  MHA: string,
  CAM: string,
  version: number,
};

export type ModelClinicianProtectedInfoConditionInput = {
  facts?: ModelStringInput | null,
  APS?: ModelStringInput | null,
  DTA?: ModelStringInput | null,
  UXSA?: ModelStringInput | null,
  NWA?: ModelStringInput | null,
  ALA?: ModelStringInput | null,
  MHA?: ModelStringInput | null,
  CAM?: ModelStringInput | null,
  version?: ModelIntInput | null,
  and?: Array< ModelClinicianProtectedInfoConditionInput | null > | null,
  or?: Array< ModelClinicianProtectedInfoConditionInput | null > | null,
  not?: ModelClinicianProtectedInfoConditionInput | null,
};

export type UpdateClinicianProtectedInfoInput = {
  clinicianID: string,
  facts?: string | null,
  APS?: string | null,
  DTA?: string | null,
  UXSA?: string | null,
  NWA?: string | null,
  ALA?: string | null,
  MHA?: string | null,
  CAM?: string | null,
  version?: number | null,
};

export type DeleteClinicianProtectedInfoInput = {
  clinicianID: string,
};

export type CreateClinicianPatientMapInput = {
  clinicianID: string,
  patientID: string,
};

export type ModelClinicianPatientMapConditionInput = {
  and?: Array< ModelClinicianPatientMapConditionInput | null > | null,
  or?: Array< ModelClinicianPatientMapConditionInput | null > | null,
  not?: ModelClinicianPatientMapConditionInput | null,
};

export type ClinicianPatientMap = {
  __typename: "ClinicianPatientMap",
  clinicianID: string,
  patientID: string,
  createdAt: string,
  updatedAt: string,
  clinicianInfo: ClinicianInfo,
};

export type UpdateClinicianPatientMapInput = {
  clinicianID: string,
  patientID: string,
};

export type DeleteClinicianPatientMapInput = {
  clinicianID: string,
  patientID: string,
};

export type CreatePatientAssignmentInput = {
  patientID: string,
  clinicianID: string,
  patientName: string,
  pending?: string | null,
  resolution?: string | null,
  reassignToClinicianID?: string | null,
  sourceClinicianID?: string | null,
};

export type ModelPatientAssignmentConditionInput = {
  patientName?: ModelStringInput | null,
  pending?: ModelStringInput | null,
  resolution?: ModelStringInput | null,
  reassignToClinicianID?: ModelStringInput | null,
  sourceClinicianID?: ModelStringInput | null,
  and?: Array< ModelPatientAssignmentConditionInput | null > | null,
  or?: Array< ModelPatientAssignmentConditionInput | null > | null,
  not?: ModelPatientAssignmentConditionInput | null,
};

export type PatientAssignment = {
  __typename: "PatientAssignment",
  patientID: string,
  clinicianID: string,
  patientName: string,
  pending?: string | null,
  resolution?: string | null,
  reassignToClinicianID?: string | null,
  sourceClinicianID?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdatePatientAssignmentInput = {
  patientID: string,
  clinicianID: string,
  patientName?: string | null,
  pending?: string | null,
  resolution?: string | null,
  reassignToClinicianID?: string | null,
  sourceClinicianID?: string | null,
};

export type DeletePatientAssignmentInput = {
  patientID: string,
  clinicianID: string,
};

export type CreateAlertInput = {
  id?: string | null,
  patientID: string,
  patientName: string,
  dateTime: string,
  summary: string,
  colorCode: string,
  triageValue: string,
  vitalsReportID: string,
  symptomReportID: string,
  pending?: string | null,
  completed?: string | null,
};

export type ModelAlertConditionInput = {
  patientName?: ModelStringInput | null,
  dateTime?: ModelStringInput | null,
  summary?: ModelStringInput | null,
  colorCode?: ModelStringInput | null,
  triageValue?: ModelStringInput | null,
  vitalsReportID?: ModelIDInput | null,
  symptomReportID?: ModelIDInput | null,
  pending?: ModelStringInput | null,
  completed?: ModelStringInput | null,
  and?: Array< ModelAlertConditionInput | null > | null,
  or?: Array< ModelAlertConditionInput | null > | null,
  not?: ModelAlertConditionInput | null,
};

export type Alert = {
  __typename: "Alert",
  id: string,
  patientID: string,
  patientName: string,
  dateTime: string,
  summary: string,
  colorCode: string,
  triageValue: string,
  vitalsReportID: string,
  symptomReportID: string,
  pending?: string | null,
  completed?: string | null,
  createdAt: string,
  updatedAt: string,
  symptomReport?: ReportSymptom | null,
  vitalsReport?: ReportVitals | null,
};

export type UpdateAlertInput = {
  id: string,
  patientID?: string | null,
  patientName?: string | null,
  dateTime?: string | null,
  summary?: string | null,
  colorCode?: string | null,
  triageValue?: string | null,
  vitalsReportID?: string | null,
  symptomReportID?: string | null,
  pending?: string | null,
  completed?: string | null,
};

export type DeleteAlertInput = {
  id: string,
};

export type CreateTodoInput = {
  id?: string | null,
  clinicianID: string,
  title: string,
  patientName: string,
  notes: string,
  lastModified: string,
  alertID?: string | null,
  pending?: string | null,
  completed?: string | null,
  version: number,
};

export type ModelTodoConditionInput = {
  title?: ModelStringInput | null,
  patientName?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  lastModified?: ModelStringInput | null,
  alertID?: ModelIDInput | null,
  pending?: ModelStringInput | null,
  completed?: ModelStringInput | null,
  version?: ModelIntInput | null,
  and?: Array< ModelTodoConditionInput | null > | null,
  or?: Array< ModelTodoConditionInput | null > | null,
  not?: ModelTodoConditionInput | null,
};

export type Todo = {
  __typename: "Todo",
  id: string,
  clinicianID: string,
  title: string,
  patientName: string,
  notes: string,
  lastModified: string,
  alertID?: string | null,
  pending?: string | null,
  completed?: string | null,
  version: number,
  createdAt: string,
  updatedAt: string,
  alert?: Alert | null,
};

export type UpdateTodoInput = {
  id: string,
  clinicianID?: string | null,
  title?: string | null,
  patientName?: string | null,
  notes?: string | null,
  lastModified?: string | null,
  alertID?: string | null,
  pending?: string | null,
  completed?: string | null,
  version?: number | null,
};

export type DeleteTodoInput = {
  id: string,
};

export type CreateAlertNotificationInput = {
  id?: string | null,
  patientID: string,
  alertID: string,
};

export type ModelAlertNotificationConditionInput = {
  alertID?: ModelIDInput | null,
  and?: Array< ModelAlertNotificationConditionInput | null > | null,
  or?: Array< ModelAlertNotificationConditionInput | null > | null,
  not?: ModelAlertNotificationConditionInput | null,
};

export type AlertNotification = {
  __typename: "AlertNotification",
  id: string,
  patientID: string,
  alertID: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateAlertNotificationInput = {
  id: string,
  patientID?: string | null,
  alertID?: string | null,
};

export type DeleteAlertNotificationInput = {
  id: string,
};

export type CreateClinicianRecordInput = {
  patientID: string,
  documentID: string,
  type: string,
  title: string,
  path: string,
  uploaderClinicianID: string,
  uploadDateTime?: string | null,
};

export type ModelClinicianRecordConditionInput = {
  type?: ModelStringInput | null,
  title?: ModelStringInput | null,
  path?: ModelStringInput | null,
  uploadDateTime?: ModelStringInput | null,
  and?: Array< ModelClinicianRecordConditionInput | null > | null,
  or?: Array< ModelClinicianRecordConditionInput | null > | null,
  not?: ModelClinicianRecordConditionInput | null,
};

export type ClinicianRecord = {
  __typename: "ClinicianRecord",
  patientID: string,
  documentID: string,
  type: string,
  title: string,
  path: string,
  uploaderClinicianID: string,
  uploadDateTime?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateClinicianRecordInput = {
  patientID: string,
  documentID: string,
  type?: string | null,
  title?: string | null,
  path?: string | null,
  uploaderClinicianID?: string | null,
  uploadDateTime?: string | null,
};

export type DeleteClinicianRecordInput = {
  patientID: string,
  documentID: string,
};

export type ModelPatientInfoFilterInput = {
  patientID?: ModelStringInput | null,
  name?: ModelStringInput | null,
  address?: ModelStringInput | null,
  gender?: ModelStringInput | null,
  birthDate?: ModelStringInput | null,
  language?: ModelStringInput | null,
  phoneNumber?: ModelStringInput | null,
  email?: ModelStringInput | null,
  emergencyContactName?: ModelStringInput | null,
  emergencyContactNumber?: ModelStringInput | null,
  riskLevel?: ModelStringInput | null,
  NYHAClass?: ModelStringInput | null,
  cardiologist?: ModelStringInput | null,
  diagnosisInfo?: ModelStringInput | null,
  hospitalName?: ModelStringInput | null,
  hospitalLocation?: ModelStringInput | null,
  targetWeight?: ModelFloatInput | null,
  targetSteps?: ModelIntInput | null,
  deviceNo?: ModelStringInput | null,
  fluidIntakeGoalInMl?: ModelIntInput | null,
  configured?: ModelBooleanInput | null,
  version?: ModelIntInput | null,
  and?: Array< ModelPatientInfoFilterInput | null > | null,
  or?: Array< ModelPatientInfoFilterInput | null > | null,
  not?: ModelPatientInfoFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelPatientInfoConnection = {
  __typename: "ModelPatientInfoConnection",
  items?:  Array<PatientInfo | null > | null,
  nextToken?: string | null,
};

export type ModelMedicationInfoFilterInput = {
  id?: ModelIDInput | null,
  patientID?: ModelStringInput | null,
  name?: ModelStringInput | null,
  dosage?: ModelFloatInput | null,
  frequency?: ModelIntInput | null,
  records?: ModelStringInput | null,
  active?: ModelBooleanInput | null,
  and?: Array< ModelMedicationInfoFilterInput | null > | null,
  or?: Array< ModelMedicationInfoFilterInput | null > | null,
  not?: ModelMedicationInfoFilterInput | null,
};

export type ModelMedicationInfoConnection = {
  __typename: "ModelMedicationInfoConnection",
  items?:  Array<MedicationInfo | null > | null,
  nextToken?: string | null,
};

export type ModelActivityInfoFilterInput = {
  id?: ModelIDInput | null,
  patientID?: ModelStringInput | null,
  activityName?: ModelStringInput | null,
  startTime?: ModelStringInput | null,
  days?: ModelStringInput | null,
  durationInMinutes?: ModelIntInput | null,
  locations?: ModelStringInput | null,
  symptoms?: ModelStringInput | null,
  and?: Array< ModelActivityInfoFilterInput | null > | null,
  or?: Array< ModelActivityInfoFilterInput | null > | null,
  not?: ModelActivityInfoFilterInput | null,
};

export type ModelActivityInfoConnection = {
  __typename: "ModelActivityInfoConnection",
  items?:  Array<ActivityInfo | null > | null,
  nextToken?: string | null,
};

export type ModelReportSymptomFilterInput = {
  id?: ModelIDInput | null,
  patientID?: ModelStringInput | null,
  activityInfoID?: ModelIDInput | null,
  symptomName?: ModelStringInput | null,
  severity?: ModelIntInput | null,
  dateTime?: ModelStringInput | null,
  summary?: ModelStringInput | null,
  weather?: ModelStringInput | null,
  temperature?: ModelStringInput | null,
  humidity?: ModelStringInput | null,
  and?: Array< ModelReportSymptomFilterInput | null > | null,
  or?: Array< ModelReportSymptomFilterInput | null > | null,
  not?: ModelReportSymptomFilterInput | null,
};

export type ModelReportSymptomConnection = {
  __typename: "ModelReportSymptomConnection",
  items?:  Array<ReportSymptom | null > | null,
  nextToken?: string | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelReportVitalsFilterInput = {
  id?: ModelIDInput | null,
  patientID?: ModelStringInput | null,
  dateTime?: ModelStringInput | null,
  weight?: ModelFloatInput | null,
  systolicBloodPressure?: ModelFloatInput | null,
  diastolicBloodPressure?: ModelFloatInput | null,
  oxygenSaturation?: ModelFloatInput | null,
  fluidIntakeInMl?: ModelIntInput | null,
  weather?: ModelStringInput | null,
  temperature?: ModelFloatInput | null,
  humidity?: ModelFloatInput | null,
  and?: Array< ModelReportVitalsFilterInput | null > | null,
  or?: Array< ModelReportVitalsFilterInput | null > | null,
  not?: ModelReportVitalsFilterInput | null,
};

export type ModelReportVitalsConnection = {
  __typename: "ModelReportVitalsConnection",
  items?:  Array<ReportVitals | null > | null,
  nextToken?: string | null,
};

export type ModelPhysicalFilterInput = {
  id?: ModelIDInput | null,
  patientID?: ModelStringInput | null,
  steps?: ModelIntInput | null,
  stepsGoal?: ModelIntInput | null,
  averageWalkingSpeedInMetresPerSeconds?: ModelFloatInput | null,
  distanceInMetres?: ModelFloatInput | null,
  dateTime?: ModelStringInput | null,
  and?: Array< ModelPhysicalFilterInput | null > | null,
  or?: Array< ModelPhysicalFilterInput | null > | null,
  not?: ModelPhysicalFilterInput | null,
};

export type ModelPhysicalConnection = {
  __typename: "ModelPhysicalConnection",
  items?:  Array<Physical | null > | null,
  nextToken?: string | null,
};

export type ModelClinicianInfoFilterInput = {
  clinicianID?: ModelStringInput | null,
  name?: ModelStringInput | null,
  hospitalName?: ModelStringInput | null,
  role?: ModelStringInput | null,
  contactNumber?: ModelStringInput | null,
  version?: ModelIntInput | null,
  and?: Array< ModelClinicianInfoFilterInput | null > | null,
  or?: Array< ModelClinicianInfoFilterInput | null > | null,
  not?: ModelClinicianInfoFilterInput | null,
};

export type ModelClinicianInfoConnection = {
  __typename: "ModelClinicianInfoConnection",
  items?:  Array<ClinicianInfo | null > | null,
  nextToken?: string | null,
};

export type ModelClinicianProtectedInfoFilterInput = {
  clinicianID?: ModelStringInput | null,
  facts?: ModelStringInput | null,
  APS?: ModelStringInput | null,
  DTA?: ModelStringInput | null,
  UXSA?: ModelStringInput | null,
  NWA?: ModelStringInput | null,
  ALA?: ModelStringInput | null,
  MHA?: ModelStringInput | null,
  CAM?: ModelStringInput | null,
  version?: ModelIntInput | null,
  and?: Array< ModelClinicianProtectedInfoFilterInput | null > | null,
  or?: Array< ModelClinicianProtectedInfoFilterInput | null > | null,
  not?: ModelClinicianProtectedInfoFilterInput | null,
};

export type ModelClinicianProtectedInfoConnection = {
  __typename: "ModelClinicianProtectedInfoConnection",
  items?:  Array<ClinicianProtectedInfo | null > | null,
  nextToken?: string | null,
};

export type ModelClinicianPatientMapFilterInput = {
  clinicianID?: ModelStringInput | null,
  patientID?: ModelStringInput | null,
  and?: Array< ModelClinicianPatientMapFilterInput | null > | null,
  or?: Array< ModelClinicianPatientMapFilterInput | null > | null,
  not?: ModelClinicianPatientMapFilterInput | null,
};

export type ModelClinicianPatientMapConnection = {
  __typename: "ModelClinicianPatientMapConnection",
  items?:  Array<ClinicianPatientMap | null > | null,
  nextToken?: string | null,
};

export type ModelPatientAssignmentFilterInput = {
  patientID?: ModelStringInput | null,
  clinicianID?: ModelStringInput | null,
  patientName?: ModelStringInput | null,
  pending?: ModelStringInput | null,
  resolution?: ModelStringInput | null,
  reassignToClinicianID?: ModelStringInput | null,
  sourceClinicianID?: ModelStringInput | null,
  and?: Array< ModelPatientAssignmentFilterInput | null > | null,
  or?: Array< ModelPatientAssignmentFilterInput | null > | null,
  not?: ModelPatientAssignmentFilterInput | null,
};

export type ModelPatientAssignmentConnection = {
  __typename: "ModelPatientAssignmentConnection",
  items?:  Array<PatientAssignment | null > | null,
  nextToken?: string | null,
};

export type ModelAlertFilterInput = {
  id?: ModelIDInput | null,
  patientID?: ModelStringInput | null,
  patientName?: ModelStringInput | null,
  dateTime?: ModelStringInput | null,
  summary?: ModelStringInput | null,
  colorCode?: ModelStringInput | null,
  triageValue?: ModelStringInput | null,
  vitalsReportID?: ModelIDInput | null,
  symptomReportID?: ModelIDInput | null,
  pending?: ModelStringInput | null,
  completed?: ModelStringInput | null,
  and?: Array< ModelAlertFilterInput | null > | null,
  or?: Array< ModelAlertFilterInput | null > | null,
  not?: ModelAlertFilterInput | null,
};

export type ModelAlertConnection = {
  __typename: "ModelAlertConnection",
  items?:  Array<Alert | null > | null,
  nextToken?: string | null,
};

export type ModelTodoFilterInput = {
  id?: ModelIDInput | null,
  clinicianID?: ModelStringInput | null,
  title?: ModelStringInput | null,
  patientName?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  lastModified?: ModelStringInput | null,
  alertID?: ModelIDInput | null,
  pending?: ModelStringInput | null,
  completed?: ModelStringInput | null,
  version?: ModelIntInput | null,
  and?: Array< ModelTodoFilterInput | null > | null,
  or?: Array< ModelTodoFilterInput | null > | null,
  not?: ModelTodoFilterInput | null,
};

export type ModelTodoConnection = {
  __typename: "ModelTodoConnection",
  items?:  Array<Todo | null > | null,
  nextToken?: string | null,
};

export type ModelIDKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelAlertNotificationFilterInput = {
  id?: ModelIDInput | null,
  patientID?: ModelStringInput | null,
  alertID?: ModelIDInput | null,
  and?: Array< ModelAlertNotificationFilterInput | null > | null,
  or?: Array< ModelAlertNotificationFilterInput | null > | null,
  not?: ModelAlertNotificationFilterInput | null,
};

export type ModelAlertNotificationConnection = {
  __typename: "ModelAlertNotificationConnection",
  items?:  Array<AlertNotification | null > | null,
  nextToken?: string | null,
};

export type ModelClinicianRecordFilterInput = {
  patientID?: ModelStringInput | null,
  documentID?: ModelStringInput | null,
  type?: ModelStringInput | null,
  title?: ModelStringInput | null,
  path?: ModelStringInput | null,
  uploaderClinicianID?: ModelStringInput | null,
  uploadDateTime?: ModelStringInput | null,
  and?: Array< ModelClinicianRecordFilterInput | null > | null,
  or?: Array< ModelClinicianRecordFilterInput | null > | null,
  not?: ModelClinicianRecordFilterInput | null,
};

export type ModelClinicianRecordConnection = {
  __typename: "ModelClinicianRecordConnection",
  items?:  Array<ClinicianRecord | null > | null,
  nextToken?: string | null,
};

export type CreatePatientInfoMutationVariables = {
  input: CreatePatientInfoInput,
  condition?: ModelPatientInfoConditionInput | null,
};

export type CreatePatientInfoMutation = {
  createPatientInfo?:  {
    __typename: "PatientInfo",
    patientID: string,
    name: string,
    address: string,
    gender: string,
    birthDate: string,
    language: string,
    phoneNumber: string,
    email: string,
    emergencyContactName: string,
    emergencyContactNumber: string,
    riskLevel: string,
    NYHAClass?: string | null,
    cardiologist?: string | null,
    diagnosisInfo?: string | null,
    hospitalName?: string | null,
    hospitalLocation?: string | null,
    targetWeight?: number | null,
    targetSteps?: number | null,
    deviceNo?: string | null,
    fluidIntakeGoalInMl?: number | null,
    configured: boolean,
    version: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePatientInfoMutationVariables = {
  input: UpdatePatientInfoInput,
  condition?: ModelPatientInfoConditionInput | null,
};

export type UpdatePatientInfoMutation = {
  updatePatientInfo?:  {
    __typename: "PatientInfo",
    patientID: string,
    name: string,
    address: string,
    gender: string,
    birthDate: string,
    language: string,
    phoneNumber: string,
    email: string,
    emergencyContactName: string,
    emergencyContactNumber: string,
    riskLevel: string,
    NYHAClass?: string | null,
    cardiologist?: string | null,
    diagnosisInfo?: string | null,
    hospitalName?: string | null,
    hospitalLocation?: string | null,
    targetWeight?: number | null,
    targetSteps?: number | null,
    deviceNo?: string | null,
    fluidIntakeGoalInMl?: number | null,
    configured: boolean,
    version: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePatientInfoMutationVariables = {
  input: DeletePatientInfoInput,
  condition?: ModelPatientInfoConditionInput | null,
};

export type DeletePatientInfoMutation = {
  deletePatientInfo?:  {
    __typename: "PatientInfo",
    patientID: string,
    name: string,
    address: string,
    gender: string,
    birthDate: string,
    language: string,
    phoneNumber: string,
    email: string,
    emergencyContactName: string,
    emergencyContactNumber: string,
    riskLevel: string,
    NYHAClass?: string | null,
    cardiologist?: string | null,
    diagnosisInfo?: string | null,
    hospitalName?: string | null,
    hospitalLocation?: string | null,
    targetWeight?: number | null,
    targetSteps?: number | null,
    deviceNo?: string | null,
    fluidIntakeGoalInMl?: number | null,
    configured: boolean,
    version: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateMedicationInfoMutationVariables = {
  input: CreateMedicationInfoInput,
  condition?: ModelMedicationInfoConditionInput | null,
};

export type CreateMedicationInfoMutation = {
  createMedicationInfo?:  {
    __typename: "MedicationInfo",
    id: string,
    patientID: string,
    name: string,
    dosage: number,
    frequency: number,
    records: string,
    active: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateMedicationInfoMutationVariables = {
  input: UpdateMedicationInfoInput,
  condition?: ModelMedicationInfoConditionInput | null,
};

export type UpdateMedicationInfoMutation = {
  updateMedicationInfo?:  {
    __typename: "MedicationInfo",
    id: string,
    patientID: string,
    name: string,
    dosage: number,
    frequency: number,
    records: string,
    active: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteMedicationInfoMutationVariables = {
  input: DeleteMedicationInfoInput,
  condition?: ModelMedicationInfoConditionInput | null,
};

export type DeleteMedicationInfoMutation = {
  deleteMedicationInfo?:  {
    __typename: "MedicationInfo",
    id: string,
    patientID: string,
    name: string,
    dosage: number,
    frequency: number,
    records: string,
    active: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateActivityInfoMutationVariables = {
  input: CreateActivityInfoInput,
  condition?: ModelActivityInfoConditionInput | null,
};

export type CreateActivityInfoMutation = {
  createActivityInfo?:  {
    __typename: "ActivityInfo",
    id: string,
    patientID: string,
    activityName: string,
    startTime: string,
    days?: Array< string > | null,
    durationInMinutes?: number | null,
    locations?: Array< string > | null,
    symptoms?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateActivityInfoMutationVariables = {
  input: UpdateActivityInfoInput,
  condition?: ModelActivityInfoConditionInput | null,
};

export type UpdateActivityInfoMutation = {
  updateActivityInfo?:  {
    __typename: "ActivityInfo",
    id: string,
    patientID: string,
    activityName: string,
    startTime: string,
    days?: Array< string > | null,
    durationInMinutes?: number | null,
    locations?: Array< string > | null,
    symptoms?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteActivityInfoMutationVariables = {
  input: DeleteActivityInfoInput,
  condition?: ModelActivityInfoConditionInput | null,
};

export type DeleteActivityInfoMutation = {
  deleteActivityInfo?:  {
    __typename: "ActivityInfo",
    id: string,
    patientID: string,
    activityName: string,
    startTime: string,
    days?: Array< string > | null,
    durationInMinutes?: number | null,
    locations?: Array< string > | null,
    symptoms?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateReportSymptomMutationVariables = {
  input: CreateReportSymptomInput,
  condition?: ModelReportSymptomConditionInput | null,
};

export type CreateReportSymptomMutation = {
  createReportSymptom?:  {
    __typename: "ReportSymptom",
    id: string,
    patientID: string,
    activityInfoID: string,
    symptomName: string,
    severity: number,
    dateTime: string,
    summary: string,
    weather?: string | null,
    temperature?: string | null,
    humidity?: string | null,
    createdAt: string,
    updatedAt: string,
    activityInfo?:  {
      __typename: "ActivityInfo",
      id: string,
      patientID: string,
      activityName: string,
      startTime: string,
      days?: Array< string > | null,
      durationInMinutes?: number | null,
      locations?: Array< string > | null,
      symptoms?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type UpdateReportSymptomMutationVariables = {
  input: UpdateReportSymptomInput,
  condition?: ModelReportSymptomConditionInput | null,
};

export type UpdateReportSymptomMutation = {
  updateReportSymptom?:  {
    __typename: "ReportSymptom",
    id: string,
    patientID: string,
    activityInfoID: string,
    symptomName: string,
    severity: number,
    dateTime: string,
    summary: string,
    weather?: string | null,
    temperature?: string | null,
    humidity?: string | null,
    createdAt: string,
    updatedAt: string,
    activityInfo?:  {
      __typename: "ActivityInfo",
      id: string,
      patientID: string,
      activityName: string,
      startTime: string,
      days?: Array< string > | null,
      durationInMinutes?: number | null,
      locations?: Array< string > | null,
      symptoms?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type DeleteReportSymptomMutationVariables = {
  input: DeleteReportSymptomInput,
  condition?: ModelReportSymptomConditionInput | null,
};

export type DeleteReportSymptomMutation = {
  deleteReportSymptom?:  {
    __typename: "ReportSymptom",
    id: string,
    patientID: string,
    activityInfoID: string,
    symptomName: string,
    severity: number,
    dateTime: string,
    summary: string,
    weather?: string | null,
    temperature?: string | null,
    humidity?: string | null,
    createdAt: string,
    updatedAt: string,
    activityInfo?:  {
      __typename: "ActivityInfo",
      id: string,
      patientID: string,
      activityName: string,
      startTime: string,
      days?: Array< string > | null,
      durationInMinutes?: number | null,
      locations?: Array< string > | null,
      symptoms?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type CreateReportVitalsMutationVariables = {
  input: CreateReportVitalsInput,
  condition?: ModelReportVitalsConditionInput | null,
};

export type CreateReportVitalsMutation = {
  createReportVitals?:  {
    __typename: "ReportVitals",
    id: string,
    patientID: string,
    dateTime: string,
    weight?: number | null,
    systolicBloodPressure?: number | null,
    diastolicBloodPressure?: number | null,
    oxygenSaturation?: number | null,
    fluidIntakeInMl?: number | null,
    weather?: string | null,
    temperature?: number | null,
    humidity?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateReportVitalsMutationVariables = {
  input: UpdateReportVitalsInput,
  condition?: ModelReportVitalsConditionInput | null,
};

export type UpdateReportVitalsMutation = {
  updateReportVitals?:  {
    __typename: "ReportVitals",
    id: string,
    patientID: string,
    dateTime: string,
    weight?: number | null,
    systolicBloodPressure?: number | null,
    diastolicBloodPressure?: number | null,
    oxygenSaturation?: number | null,
    fluidIntakeInMl?: number | null,
    weather?: string | null,
    temperature?: number | null,
    humidity?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteReportVitalsMutationVariables = {
  input: DeleteReportVitalsInput,
  condition?: ModelReportVitalsConditionInput | null,
};

export type DeleteReportVitalsMutation = {
  deleteReportVitals?:  {
    __typename: "ReportVitals",
    id: string,
    patientID: string,
    dateTime: string,
    weight?: number | null,
    systolicBloodPressure?: number | null,
    diastolicBloodPressure?: number | null,
    oxygenSaturation?: number | null,
    fluidIntakeInMl?: number | null,
    weather?: string | null,
    temperature?: number | null,
    humidity?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePhysicalMutationVariables = {
  input: CreatePhysicalInput,
  condition?: ModelPhysicalConditionInput | null,
};

export type CreatePhysicalMutation = {
  createPhysical?:  {
    __typename: "Physical",
    id: string,
    patientID: string,
    steps: number,
    stepsGoal: number,
    averageWalkingSpeedInMetresPerSeconds: number,
    distanceInMetres: number,
    dateTime: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePhysicalMutationVariables = {
  input: UpdatePhysicalInput,
  condition?: ModelPhysicalConditionInput | null,
};

export type UpdatePhysicalMutation = {
  updatePhysical?:  {
    __typename: "Physical",
    id: string,
    patientID: string,
    steps: number,
    stepsGoal: number,
    averageWalkingSpeedInMetresPerSeconds: number,
    distanceInMetres: number,
    dateTime: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePhysicalMutationVariables = {
  input: DeletePhysicalInput,
  condition?: ModelPhysicalConditionInput | null,
};

export type DeletePhysicalMutation = {
  deletePhysical?:  {
    __typename: "Physical",
    id: string,
    patientID: string,
    steps: number,
    stepsGoal: number,
    averageWalkingSpeedInMetresPerSeconds: number,
    distanceInMetres: number,
    dateTime: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateClinicianInfoMutationVariables = {
  input: CreateClinicianInfoInput,
  condition?: ModelClinicianInfoConditionInput | null,
};

export type CreateClinicianInfoMutation = {
  createClinicianInfo?:  {
    __typename: "ClinicianInfo",
    clinicianID: string,
    name: string,
    hospitalName: string,
    role: string,
    contactNumber: string,
    version: number,
    createdAt: string,
    updatedAt: string,
    protectedInfo?:  {
      __typename: "ClinicianProtectedInfo",
      clinicianID: string,
      facts: string,
      APS: string,
      DTA: string,
      UXSA: string,
      NWA: string,
      ALA: string,
      MHA: string,
      CAM: string,
      version: number,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type UpdateClinicianInfoMutationVariables = {
  input: UpdateClinicianInfoInput,
  condition?: ModelClinicianInfoConditionInput | null,
};

export type UpdateClinicianInfoMutation = {
  updateClinicianInfo?:  {
    __typename: "ClinicianInfo",
    clinicianID: string,
    name: string,
    hospitalName: string,
    role: string,
    contactNumber: string,
    version: number,
    createdAt: string,
    updatedAt: string,
    protectedInfo?:  {
      __typename: "ClinicianProtectedInfo",
      clinicianID: string,
      facts: string,
      APS: string,
      DTA: string,
      UXSA: string,
      NWA: string,
      ALA: string,
      MHA: string,
      CAM: string,
      version: number,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type DeleteClinicianInfoMutationVariables = {
  input: DeleteClinicianInfoInput,
  condition?: ModelClinicianInfoConditionInput | null,
};

export type DeleteClinicianInfoMutation = {
  deleteClinicianInfo?:  {
    __typename: "ClinicianInfo",
    clinicianID: string,
    name: string,
    hospitalName: string,
    role: string,
    contactNumber: string,
    version: number,
    createdAt: string,
    updatedAt: string,
    protectedInfo?:  {
      __typename: "ClinicianProtectedInfo",
      clinicianID: string,
      facts: string,
      APS: string,
      DTA: string,
      UXSA: string,
      NWA: string,
      ALA: string,
      MHA: string,
      CAM: string,
      version: number,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type CreateClinicianProtectedInfoMutationVariables = {
  input: CreateClinicianProtectedInfoInput,
  condition?: ModelClinicianProtectedInfoConditionInput | null,
};

export type CreateClinicianProtectedInfoMutation = {
  createClinicianProtectedInfo?:  {
    __typename: "ClinicianProtectedInfo",
    clinicianID: string,
    facts: string,
    APS: string,
    DTA: string,
    UXSA: string,
    NWA: string,
    ALA: string,
    MHA: string,
    CAM: string,
    version: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateClinicianProtectedInfoMutationVariables = {
  input: UpdateClinicianProtectedInfoInput,
  condition?: ModelClinicianProtectedInfoConditionInput | null,
};

export type UpdateClinicianProtectedInfoMutation = {
  updateClinicianProtectedInfo?:  {
    __typename: "ClinicianProtectedInfo",
    clinicianID: string,
    facts: string,
    APS: string,
    DTA: string,
    UXSA: string,
    NWA: string,
    ALA: string,
    MHA: string,
    CAM: string,
    version: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteClinicianProtectedInfoMutationVariables = {
  input: DeleteClinicianProtectedInfoInput,
  condition?: ModelClinicianProtectedInfoConditionInput | null,
};

export type DeleteClinicianProtectedInfoMutation = {
  deleteClinicianProtectedInfo?:  {
    __typename: "ClinicianProtectedInfo",
    clinicianID: string,
    facts: string,
    APS: string,
    DTA: string,
    UXSA: string,
    NWA: string,
    ALA: string,
    MHA: string,
    CAM: string,
    version: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateClinicianPatientMapMutationVariables = {
  input: CreateClinicianPatientMapInput,
  condition?: ModelClinicianPatientMapConditionInput | null,
};

export type CreateClinicianPatientMapMutation = {
  createClinicianPatientMap?:  {
    __typename: "ClinicianPatientMap",
    clinicianID: string,
    patientID: string,
    createdAt: string,
    updatedAt: string,
    clinicianInfo:  {
      __typename: "ClinicianInfo",
      clinicianID: string,
      name: string,
      hospitalName: string,
      role: string,
      contactNumber: string,
      version: number,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type UpdateClinicianPatientMapMutationVariables = {
  input: UpdateClinicianPatientMapInput,
  condition?: ModelClinicianPatientMapConditionInput | null,
};

export type UpdateClinicianPatientMapMutation = {
  updateClinicianPatientMap?:  {
    __typename: "ClinicianPatientMap",
    clinicianID: string,
    patientID: string,
    createdAt: string,
    updatedAt: string,
    clinicianInfo:  {
      __typename: "ClinicianInfo",
      clinicianID: string,
      name: string,
      hospitalName: string,
      role: string,
      contactNumber: string,
      version: number,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type DeleteClinicianPatientMapMutationVariables = {
  input: DeleteClinicianPatientMapInput,
  condition?: ModelClinicianPatientMapConditionInput | null,
};

export type DeleteClinicianPatientMapMutation = {
  deleteClinicianPatientMap?:  {
    __typename: "ClinicianPatientMap",
    clinicianID: string,
    patientID: string,
    createdAt: string,
    updatedAt: string,
    clinicianInfo:  {
      __typename: "ClinicianInfo",
      clinicianID: string,
      name: string,
      hospitalName: string,
      role: string,
      contactNumber: string,
      version: number,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type CreatePatientAssignmentMutationVariables = {
  input: CreatePatientAssignmentInput,
  condition?: ModelPatientAssignmentConditionInput | null,
};

export type CreatePatientAssignmentMutation = {
  createPatientAssignment?:  {
    __typename: "PatientAssignment",
    patientID: string,
    clinicianID: string,
    patientName: string,
    pending?: string | null,
    resolution?: string | null,
    reassignToClinicianID?: string | null,
    sourceClinicianID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePatientAssignmentMutationVariables = {
  input: UpdatePatientAssignmentInput,
  condition?: ModelPatientAssignmentConditionInput | null,
};

export type UpdatePatientAssignmentMutation = {
  updatePatientAssignment?:  {
    __typename: "PatientAssignment",
    patientID: string,
    clinicianID: string,
    patientName: string,
    pending?: string | null,
    resolution?: string | null,
    reassignToClinicianID?: string | null,
    sourceClinicianID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePatientAssignmentMutationVariables = {
  input: DeletePatientAssignmentInput,
  condition?: ModelPatientAssignmentConditionInput | null,
};

export type DeletePatientAssignmentMutation = {
  deletePatientAssignment?:  {
    __typename: "PatientAssignment",
    patientID: string,
    clinicianID: string,
    patientName: string,
    pending?: string | null,
    resolution?: string | null,
    reassignToClinicianID?: string | null,
    sourceClinicianID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateAlertMutationVariables = {
  input: CreateAlertInput,
  condition?: ModelAlertConditionInput | null,
};

export type CreateAlertMutation = {
  createAlert?:  {
    __typename: "Alert",
    id: string,
    patientID: string,
    patientName: string,
    dateTime: string,
    summary: string,
    colorCode: string,
    triageValue: string,
    vitalsReportID: string,
    symptomReportID: string,
    pending?: string | null,
    completed?: string | null,
    createdAt: string,
    updatedAt: string,
    symptomReport?:  {
      __typename: "ReportSymptom",
      id: string,
      patientID: string,
      activityInfoID: string,
      symptomName: string,
      severity: number,
      dateTime: string,
      summary: string,
      weather?: string | null,
      temperature?: string | null,
      humidity?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    vitalsReport?:  {
      __typename: "ReportVitals",
      id: string,
      patientID: string,
      dateTime: string,
      weight?: number | null,
      systolicBloodPressure?: number | null,
      diastolicBloodPressure?: number | null,
      oxygenSaturation?: number | null,
      fluidIntakeInMl?: number | null,
      weather?: string | null,
      temperature?: number | null,
      humidity?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type UpdateAlertMutationVariables = {
  input: UpdateAlertInput,
  condition?: ModelAlertConditionInput | null,
};

export type UpdateAlertMutation = {
  updateAlert?:  {
    __typename: "Alert",
    id: string,
    patientID: string,
    patientName: string,
    dateTime: string,
    summary: string,
    colorCode: string,
    triageValue: string,
    vitalsReportID: string,
    symptomReportID: string,
    pending?: string | null,
    completed?: string | null,
    createdAt: string,
    updatedAt: string,
    symptomReport?:  {
      __typename: "ReportSymptom",
      id: string,
      patientID: string,
      activityInfoID: string,
      symptomName: string,
      severity: number,
      dateTime: string,
      summary: string,
      weather?: string | null,
      temperature?: string | null,
      humidity?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    vitalsReport?:  {
      __typename: "ReportVitals",
      id: string,
      patientID: string,
      dateTime: string,
      weight?: number | null,
      systolicBloodPressure?: number | null,
      diastolicBloodPressure?: number | null,
      oxygenSaturation?: number | null,
      fluidIntakeInMl?: number | null,
      weather?: string | null,
      temperature?: number | null,
      humidity?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type DeleteAlertMutationVariables = {
  input: DeleteAlertInput,
  condition?: ModelAlertConditionInput | null,
};

export type DeleteAlertMutation = {
  deleteAlert?:  {
    __typename: "Alert",
    id: string,
    patientID: string,
    patientName: string,
    dateTime: string,
    summary: string,
    colorCode: string,
    triageValue: string,
    vitalsReportID: string,
    symptomReportID: string,
    pending?: string | null,
    completed?: string | null,
    createdAt: string,
    updatedAt: string,
    symptomReport?:  {
      __typename: "ReportSymptom",
      id: string,
      patientID: string,
      activityInfoID: string,
      symptomName: string,
      severity: number,
      dateTime: string,
      summary: string,
      weather?: string | null,
      temperature?: string | null,
      humidity?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    vitalsReport?:  {
      __typename: "ReportVitals",
      id: string,
      patientID: string,
      dateTime: string,
      weight?: number | null,
      systolicBloodPressure?: number | null,
      diastolicBloodPressure?: number | null,
      oxygenSaturation?: number | null,
      fluidIntakeInMl?: number | null,
      weather?: string | null,
      temperature?: number | null,
      humidity?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type CreateTodoMutationVariables = {
  input: CreateTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type CreateTodoMutation = {
  createTodo?:  {
    __typename: "Todo",
    id: string,
    clinicianID: string,
    title: string,
    patientName: string,
    notes: string,
    lastModified: string,
    alertID?: string | null,
    pending?: string | null,
    completed?: string | null,
    version: number,
    createdAt: string,
    updatedAt: string,
    alert?:  {
      __typename: "Alert",
      id: string,
      patientID: string,
      patientName: string,
      dateTime: string,
      summary: string,
      colorCode: string,
      triageValue: string,
      vitalsReportID: string,
      symptomReportID: string,
      pending?: string | null,
      completed?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type UpdateTodoMutationVariables = {
  input: UpdateTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type UpdateTodoMutation = {
  updateTodo?:  {
    __typename: "Todo",
    id: string,
    clinicianID: string,
    title: string,
    patientName: string,
    notes: string,
    lastModified: string,
    alertID?: string | null,
    pending?: string | null,
    completed?: string | null,
    version: number,
    createdAt: string,
    updatedAt: string,
    alert?:  {
      __typename: "Alert",
      id: string,
      patientID: string,
      patientName: string,
      dateTime: string,
      summary: string,
      colorCode: string,
      triageValue: string,
      vitalsReportID: string,
      symptomReportID: string,
      pending?: string | null,
      completed?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type DeleteTodoMutationVariables = {
  input: DeleteTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type DeleteTodoMutation = {
  deleteTodo?:  {
    __typename: "Todo",
    id: string,
    clinicianID: string,
    title: string,
    patientName: string,
    notes: string,
    lastModified: string,
    alertID?: string | null,
    pending?: string | null,
    completed?: string | null,
    version: number,
    createdAt: string,
    updatedAt: string,
    alert?:  {
      __typename: "Alert",
      id: string,
      patientID: string,
      patientName: string,
      dateTime: string,
      summary: string,
      colorCode: string,
      triageValue: string,
      vitalsReportID: string,
      symptomReportID: string,
      pending?: string | null,
      completed?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type CreateAlertNotificationMutationVariables = {
  input: CreateAlertNotificationInput,
  condition?: ModelAlertNotificationConditionInput | null,
};

export type CreateAlertNotificationMutation = {
  createAlertNotification?:  {
    __typename: "AlertNotification",
    id: string,
    patientID: string,
    alertID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAlertNotificationMutationVariables = {
  input: UpdateAlertNotificationInput,
  condition?: ModelAlertNotificationConditionInput | null,
};

export type UpdateAlertNotificationMutation = {
  updateAlertNotification?:  {
    __typename: "AlertNotification",
    id: string,
    patientID: string,
    alertID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAlertNotificationMutationVariables = {
  input: DeleteAlertNotificationInput,
  condition?: ModelAlertNotificationConditionInput | null,
};

export type DeleteAlertNotificationMutation = {
  deleteAlertNotification?:  {
    __typename: "AlertNotification",
    id: string,
    patientID: string,
    alertID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateClinicianRecordMutationVariables = {
  input: CreateClinicianRecordInput,
  condition?: ModelClinicianRecordConditionInput | null,
};

export type CreateClinicianRecordMutation = {
  createClinicianRecord?:  {
    __typename: "ClinicianRecord",
    patientID: string,
    documentID: string,
    type: string,
    title: string,
    path: string,
    uploaderClinicianID: string,
    uploadDateTime?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateClinicianRecordMutationVariables = {
  input: UpdateClinicianRecordInput,
  condition?: ModelClinicianRecordConditionInput | null,
};

export type UpdateClinicianRecordMutation = {
  updateClinicianRecord?:  {
    __typename: "ClinicianRecord",
    patientID: string,
    documentID: string,
    type: string,
    title: string,
    path: string,
    uploaderClinicianID: string,
    uploadDateTime?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteClinicianRecordMutationVariables = {
  input: DeleteClinicianRecordInput,
  condition?: ModelClinicianRecordConditionInput | null,
};

export type DeleteClinicianRecordMutation = {
  deleteClinicianRecord?:  {
    __typename: "ClinicianRecord",
    patientID: string,
    documentID: string,
    type: string,
    title: string,
    path: string,
    uploaderClinicianID: string,
    uploadDateTime?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type QueryS3ClinicianRecordsBridgeQueryVariables = {
  recordType?: string | null,
  operation?: string | null,
  patientID?: string | null,
  documentID?: string | null,
  documentTitle?: string | null,
};

export type QueryS3ClinicianRecordsBridgeQuery = {
  queryS3ClinicianRecordsBridge?: string | null,
};

export type HandlePatientAssignmentResolutionQueryVariables = {
  patientID?: string | null,
  resolution?: string | null,
  reassignToClinicianID?: string | null,
};

export type HandlePatientAssignmentResolutionQuery = {
  handlePatientAssignmentResolution?: string | null,
};

export type SharePatientAssignmentQueryVariables = {
  patientID?: string | null,
  patientName?: string | null,
  shareToClinicianID?: string | null,
};

export type SharePatientAssignmentQuery = {
  sharePatientAssignment?: string | null,
};

export type GetPatientInfoQueryVariables = {
  patientID: string,
};

export type GetPatientInfoQuery = {
  getPatientInfo?:  {
    __typename: "PatientInfo",
    patientID: string,
    name: string,
    address: string,
    gender: string,
    birthDate: string,
    language: string,
    phoneNumber: string,
    email: string,
    emergencyContactName: string,
    emergencyContactNumber: string,
    riskLevel: string,
    NYHAClass?: string | null,
    cardiologist?: string | null,
    diagnosisInfo?: string | null,
    hospitalName?: string | null,
    hospitalLocation?: string | null,
    targetWeight?: number | null,
    targetSteps?: number | null,
    deviceNo?: string | null,
    fluidIntakeGoalInMl?: number | null,
    configured: boolean,
    version: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPatientInfosQueryVariables = {
  patientID?: string | null,
  filter?: ModelPatientInfoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListPatientInfosQuery = {
  listPatientInfos?:  {
    __typename: "ModelPatientInfoConnection",
    items?:  Array< {
      __typename: "PatientInfo",
      patientID: string,
      name: string,
      address: string,
      gender: string,
      birthDate: string,
      language: string,
      phoneNumber: string,
      email: string,
      emergencyContactName: string,
      emergencyContactNumber: string,
      riskLevel: string,
      NYHAClass?: string | null,
      cardiologist?: string | null,
      diagnosisInfo?: string | null,
      hospitalName?: string | null,
      hospitalLocation?: string | null,
      targetWeight?: number | null,
      targetSteps?: number | null,
      deviceNo?: string | null,
      fluidIntakeGoalInMl?: number | null,
      configured: boolean,
      version: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetMedicationInfoQueryVariables = {
  id: string,
};

export type GetMedicationInfoQuery = {
  getMedicationInfo?:  {
    __typename: "MedicationInfo",
    id: string,
    patientID: string,
    name: string,
    dosage: number,
    frequency: number,
    records: string,
    active: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListMedicationInfosQueryVariables = {
  filter?: ModelMedicationInfoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMedicationInfosQuery = {
  listMedicationInfos?:  {
    __typename: "ModelMedicationInfoConnection",
    items?:  Array< {
      __typename: "MedicationInfo",
      id: string,
      patientID: string,
      name: string,
      dosage: number,
      frequency: number,
      records: string,
      active: boolean,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListMedicationInfosByPatientIDQueryVariables = {
  patientID?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelMedicationInfoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMedicationInfosByPatientIDQuery = {
  listMedicationInfosByPatientID?:  {
    __typename: "ModelMedicationInfoConnection",
    items?:  Array< {
      __typename: "MedicationInfo",
      id: string,
      patientID: string,
      name: string,
      dosage: number,
      frequency: number,
      records: string,
      active: boolean,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetActivityInfoQueryVariables = {
  id: string,
};

export type GetActivityInfoQuery = {
  getActivityInfo?:  {
    __typename: "ActivityInfo",
    id: string,
    patientID: string,
    activityName: string,
    startTime: string,
    days?: Array< string > | null,
    durationInMinutes?: number | null,
    locations?: Array< string > | null,
    symptoms?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListActivityInfosQueryVariables = {
  filter?: ModelActivityInfoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListActivityInfosQuery = {
  listActivityInfos?:  {
    __typename: "ModelActivityInfoConnection",
    items?:  Array< {
      __typename: "ActivityInfo",
      id: string,
      patientID: string,
      activityName: string,
      startTime: string,
      days?: Array< string > | null,
      durationInMinutes?: number | null,
      locations?: Array< string > | null,
      symptoms?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListActivityInfosByPatientIDQueryVariables = {
  patientID?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelActivityInfoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListActivityInfosByPatientIDQuery = {
  listActivityInfosByPatientID?:  {
    __typename: "ModelActivityInfoConnection",
    items?:  Array< {
      __typename: "ActivityInfo",
      id: string,
      patientID: string,
      activityName: string,
      startTime: string,
      days?: Array< string > | null,
      durationInMinutes?: number | null,
      locations?: Array< string > | null,
      symptoms?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetReportSymptomQueryVariables = {
  id: string,
};

export type GetReportSymptomQuery = {
  getReportSymptom?:  {
    __typename: "ReportSymptom",
    id: string,
    patientID: string,
    activityInfoID: string,
    symptomName: string,
    severity: number,
    dateTime: string,
    summary: string,
    weather?: string | null,
    temperature?: string | null,
    humidity?: string | null,
    createdAt: string,
    updatedAt: string,
    activityInfo?:  {
      __typename: "ActivityInfo",
      id: string,
      patientID: string,
      activityName: string,
      startTime: string,
      days?: Array< string > | null,
      durationInMinutes?: number | null,
      locations?: Array< string > | null,
      symptoms?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type ListReportSymptomsQueryVariables = {
  filter?: ModelReportSymptomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListReportSymptomsQuery = {
  listReportSymptoms?:  {
    __typename: "ModelReportSymptomConnection",
    items?:  Array< {
      __typename: "ReportSymptom",
      id: string,
      patientID: string,
      activityInfoID: string,
      symptomName: string,
      severity: number,
      dateTime: string,
      summary: string,
      weather?: string | null,
      temperature?: string | null,
      humidity?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListReportSymptomsByPatientIDQueryVariables = {
  patientID?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelReportSymptomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListReportSymptomsByPatientIDQuery = {
  listReportSymptomsByPatientID?:  {
    __typename: "ModelReportSymptomConnection",
    items?:  Array< {
      __typename: "ReportSymptom",
      id: string,
      patientID: string,
      activityInfoID: string,
      symptomName: string,
      severity: number,
      dateTime: string,
      summary: string,
      weather?: string | null,
      temperature?: string | null,
      humidity?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListReportSymptomsByDateTimeQueryVariables = {
  patientID?: string | null,
  dateTime?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelReportSymptomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListReportSymptomsByDateTimeQuery = {
  listReportSymptomsByDateTime?:  {
    __typename: "ModelReportSymptomConnection",
    items?:  Array< {
      __typename: "ReportSymptom",
      id: string,
      patientID: string,
      activityInfoID: string,
      symptomName: string,
      severity: number,
      dateTime: string,
      summary: string,
      weather?: string | null,
      temperature?: string | null,
      humidity?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetReportVitalsQueryVariables = {
  id: string,
};

export type GetReportVitalsQuery = {
  getReportVitals?:  {
    __typename: "ReportVitals",
    id: string,
    patientID: string,
    dateTime: string,
    weight?: number | null,
    systolicBloodPressure?: number | null,
    diastolicBloodPressure?: number | null,
    oxygenSaturation?: number | null,
    fluidIntakeInMl?: number | null,
    weather?: string | null,
    temperature?: number | null,
    humidity?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListReportVitalssQueryVariables = {
  filter?: ModelReportVitalsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListReportVitalssQuery = {
  listReportVitalss?:  {
    __typename: "ModelReportVitalsConnection",
    items?:  Array< {
      __typename: "ReportVitals",
      id: string,
      patientID: string,
      dateTime: string,
      weight?: number | null,
      systolicBloodPressure?: number | null,
      diastolicBloodPressure?: number | null,
      oxygenSaturation?: number | null,
      fluidIntakeInMl?: number | null,
      weather?: string | null,
      temperature?: number | null,
      humidity?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListReportVitalsByPatientIDQueryVariables = {
  patientID?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelReportVitalsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListReportVitalsByPatientIDQuery = {
  listReportVitalsByPatientID?:  {
    __typename: "ModelReportVitalsConnection",
    items?:  Array< {
      __typename: "ReportVitals",
      id: string,
      patientID: string,
      dateTime: string,
      weight?: number | null,
      systolicBloodPressure?: number | null,
      diastolicBloodPressure?: number | null,
      oxygenSaturation?: number | null,
      fluidIntakeInMl?: number | null,
      weather?: string | null,
      temperature?: number | null,
      humidity?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListReportVitalsByDateTimeQueryVariables = {
  patientID?: string | null,
  dateTime?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelReportVitalsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListReportVitalsByDateTimeQuery = {
  listReportVitalsByDateTime?:  {
    __typename: "ModelReportVitalsConnection",
    items?:  Array< {
      __typename: "ReportVitals",
      id: string,
      patientID: string,
      dateTime: string,
      weight?: number | null,
      systolicBloodPressure?: number | null,
      diastolicBloodPressure?: number | null,
      oxygenSaturation?: number | null,
      fluidIntakeInMl?: number | null,
      weather?: string | null,
      temperature?: number | null,
      humidity?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetPhysicalQueryVariables = {
  id: string,
};

export type GetPhysicalQuery = {
  getPhysical?:  {
    __typename: "Physical",
    id: string,
    patientID: string,
    steps: number,
    stepsGoal: number,
    averageWalkingSpeedInMetresPerSeconds: number,
    distanceInMetres: number,
    dateTime: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPhysicalsQueryVariables = {
  filter?: ModelPhysicalFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPhysicalsQuery = {
  listPhysicals?:  {
    __typename: "ModelPhysicalConnection",
    items?:  Array< {
      __typename: "Physical",
      id: string,
      patientID: string,
      steps: number,
      stepsGoal: number,
      averageWalkingSpeedInMetresPerSeconds: number,
      distanceInMetres: number,
      dateTime: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListPhysicalsByPatientIDQueryVariables = {
  patientID?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPhysicalFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPhysicalsByPatientIDQuery = {
  listPhysicalsByPatientID?:  {
    __typename: "ModelPhysicalConnection",
    items?:  Array< {
      __typename: "Physical",
      id: string,
      patientID: string,
      steps: number,
      stepsGoal: number,
      averageWalkingSpeedInMetresPerSeconds: number,
      distanceInMetres: number,
      dateTime: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListPhysicalsByDateTimeQueryVariables = {
  patientID?: string | null,
  dateTime?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPhysicalFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPhysicalsByDateTimeQuery = {
  listPhysicalsByDateTime?:  {
    __typename: "ModelPhysicalConnection",
    items?:  Array< {
      __typename: "Physical",
      id: string,
      patientID: string,
      steps: number,
      stepsGoal: number,
      averageWalkingSpeedInMetresPerSeconds: number,
      distanceInMetres: number,
      dateTime: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetClinicianInfoQueryVariables = {
  clinicianID: string,
};

export type GetClinicianInfoQuery = {
  getClinicianInfo?:  {
    __typename: "ClinicianInfo",
    clinicianID: string,
    name: string,
    hospitalName: string,
    role: string,
    contactNumber: string,
    version: number,
    createdAt: string,
    updatedAt: string,
    protectedInfo?:  {
      __typename: "ClinicianProtectedInfo",
      clinicianID: string,
      facts: string,
      APS: string,
      DTA: string,
      UXSA: string,
      NWA: string,
      ALA: string,
      MHA: string,
      CAM: string,
      version: number,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type ListClinicianInfosQueryVariables = {
  clinicianID?: string | null,
  filter?: ModelClinicianInfoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListClinicianInfosQuery = {
  listClinicianInfos?:  {
    __typename: "ModelClinicianInfoConnection",
    items?:  Array< {
      __typename: "ClinicianInfo",
      clinicianID: string,
      name: string,
      hospitalName: string,
      role: string,
      contactNumber: string,
      version: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetClinicianProtectedInfoQueryVariables = {
  clinicianID: string,
};

export type GetClinicianProtectedInfoQuery = {
  getClinicianProtectedInfo?:  {
    __typename: "ClinicianProtectedInfo",
    clinicianID: string,
    facts: string,
    APS: string,
    DTA: string,
    UXSA: string,
    NWA: string,
    ALA: string,
    MHA: string,
    CAM: string,
    version: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListClinicianProtectedInfosQueryVariables = {
  clinicianID?: string | null,
  filter?: ModelClinicianProtectedInfoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListClinicianProtectedInfosQuery = {
  listClinicianProtectedInfos?:  {
    __typename: "ModelClinicianProtectedInfoConnection",
    items?:  Array< {
      __typename: "ClinicianProtectedInfo",
      clinicianID: string,
      facts: string,
      APS: string,
      DTA: string,
      UXSA: string,
      NWA: string,
      ALA: string,
      MHA: string,
      CAM: string,
      version: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetClinicianPatientMapQueryVariables = {
  clinicianID: string,
  patientID: string,
};

export type GetClinicianPatientMapQuery = {
  getClinicianPatientMap?:  {
    __typename: "ClinicianPatientMap",
    clinicianID: string,
    patientID: string,
    createdAt: string,
    updatedAt: string,
    clinicianInfo:  {
      __typename: "ClinicianInfo",
      clinicianID: string,
      name: string,
      hospitalName: string,
      role: string,
      contactNumber: string,
      version: number,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type ListClinicianPatientMapsQueryVariables = {
  clinicianID?: string | null,
  patientID?: ModelStringKeyConditionInput | null,
  filter?: ModelClinicianPatientMapFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListClinicianPatientMapsQuery = {
  listClinicianPatientMaps?:  {
    __typename: "ModelClinicianPatientMapConnection",
    items?:  Array< {
      __typename: "ClinicianPatientMap",
      clinicianID: string,
      patientID: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListClinicianMappingsByPatientIDQueryVariables = {
  patientID?: string | null,
  clinicianID?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelClinicianPatientMapFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListClinicianMappingsByPatientIDQuery = {
  listClinicianMappingsByPatientID?:  {
    __typename: "ModelClinicianPatientMapConnection",
    items?:  Array< {
      __typename: "ClinicianPatientMap",
      clinicianID: string,
      patientID: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetPatientAssignmentQueryVariables = {
  patientID: string,
  clinicianID: string,
};

export type GetPatientAssignmentQuery = {
  getPatientAssignment?:  {
    __typename: "PatientAssignment",
    patientID: string,
    clinicianID: string,
    patientName: string,
    pending?: string | null,
    resolution?: string | null,
    reassignToClinicianID?: string | null,
    sourceClinicianID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPatientAssignmentsQueryVariables = {
  patientID?: string | null,
  clinicianID?: ModelStringKeyConditionInput | null,
  filter?: ModelPatientAssignmentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListPatientAssignmentsQuery = {
  listPatientAssignments?:  {
    __typename: "ModelPatientAssignmentConnection",
    items?:  Array< {
      __typename: "PatientAssignment",
      patientID: string,
      clinicianID: string,
      patientName: string,
      pending?: string | null,
      resolution?: string | null,
      reassignToClinicianID?: string | null,
      sourceClinicianID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListPendingPatientAssignmentsQueryVariables = {
  clinicianID?: string | null,
  pending?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPatientAssignmentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPendingPatientAssignmentsQuery = {
  listPendingPatientAssignments?:  {
    __typename: "ModelPatientAssignmentConnection",
    items?:  Array< {
      __typename: "PatientAssignment",
      patientID: string,
      clinicianID: string,
      patientName: string,
      pending?: string | null,
      resolution?: string | null,
      reassignToClinicianID?: string | null,
      sourceClinicianID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetAlertQueryVariables = {
  id: string,
};

export type GetAlertQuery = {
  getAlert?:  {
    __typename: "Alert",
    id: string,
    patientID: string,
    patientName: string,
    dateTime: string,
    summary: string,
    colorCode: string,
    triageValue: string,
    vitalsReportID: string,
    symptomReportID: string,
    pending?: string | null,
    completed?: string | null,
    createdAt: string,
    updatedAt: string,
    symptomReport?:  {
      __typename: "ReportSymptom",
      id: string,
      patientID: string,
      activityInfoID: string,
      symptomName: string,
      severity: number,
      dateTime: string,
      summary: string,
      weather?: string | null,
      temperature?: string | null,
      humidity?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    vitalsReport?:  {
      __typename: "ReportVitals",
      id: string,
      patientID: string,
      dateTime: string,
      weight?: number | null,
      systolicBloodPressure?: number | null,
      diastolicBloodPressure?: number | null,
      oxygenSaturation?: number | null,
      fluidIntakeInMl?: number | null,
      weather?: string | null,
      temperature?: number | null,
      humidity?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type ListAlertsQueryVariables = {
  filter?: ModelAlertFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAlertsQuery = {
  listAlerts?:  {
    __typename: "ModelAlertConnection",
    items?:  Array< {
      __typename: "Alert",
      id: string,
      patientID: string,
      patientName: string,
      dateTime: string,
      summary: string,
      colorCode: string,
      triageValue: string,
      vitalsReportID: string,
      symptomReportID: string,
      pending?: string | null,
      completed?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListPatientAlertsByDateTimeQueryVariables = {
  patientID?: string | null,
  dateTime?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelAlertFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPatientAlertsByDateTimeQuery = {
  listPatientAlertsByDateTime?:  {
    __typename: "ModelAlertConnection",
    items?:  Array< {
      __typename: "Alert",
      id: string,
      patientID: string,
      patientName: string,
      dateTime: string,
      summary: string,
      colorCode: string,
      triageValue: string,
      vitalsReportID: string,
      symptomReportID: string,
      pending?: string | null,
      completed?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListPendingAlertsByDateTimeQueryVariables = {
  pending?: string | null,
  dateTime?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelAlertFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPendingAlertsByDateTimeQuery = {
  listPendingAlertsByDateTime?:  {
    __typename: "ModelAlertConnection",
    items?:  Array< {
      __typename: "Alert",
      id: string,
      patientID: string,
      patientName: string,
      dateTime: string,
      summary: string,
      colorCode: string,
      triageValue: string,
      vitalsReportID: string,
      symptomReportID: string,
      pending?: string | null,
      completed?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListPendingRiskAlertsQueryVariables = {
  pending?: string | null,
  colorCode?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelAlertFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPendingRiskAlertsQuery = {
  listPendingRiskAlerts?:  {
    __typename: "ModelAlertConnection",
    items?:  Array< {
      __typename: "Alert",
      id: string,
      patientID: string,
      patientName: string,
      dateTime: string,
      summary: string,
      colorCode: string,
      triageValue: string,
      vitalsReportID: string,
      symptomReportID: string,
      pending?: string | null,
      completed?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListCompletedRiskAlertsQueryVariables = {
  completed?: string | null,
  colorCode?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelAlertFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCompletedRiskAlertsQuery = {
  listCompletedRiskAlerts?:  {
    __typename: "ModelAlertConnection",
    items?:  Array< {
      __typename: "Alert",
      id: string,
      patientID: string,
      patientName: string,
      dateTime: string,
      summary: string,
      colorCode: string,
      triageValue: string,
      vitalsReportID: string,
      symptomReportID: string,
      pending?: string | null,
      completed?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetTodoQueryVariables = {
  id: string,
};

export type GetTodoQuery = {
  getTodo?:  {
    __typename: "Todo",
    id: string,
    clinicianID: string,
    title: string,
    patientName: string,
    notes: string,
    lastModified: string,
    alertID?: string | null,
    pending?: string | null,
    completed?: string | null,
    version: number,
    createdAt: string,
    updatedAt: string,
    alert?:  {
      __typename: "Alert",
      id: string,
      patientID: string,
      patientName: string,
      dateTime: string,
      summary: string,
      colorCode: string,
      triageValue: string,
      vitalsReportID: string,
      symptomReportID: string,
      pending?: string | null,
      completed?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type ListTodosQueryVariables = {
  filter?: ModelTodoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTodosQuery = {
  listTodos?:  {
    __typename: "ModelTodoConnection",
    items?:  Array< {
      __typename: "Todo",
      id: string,
      clinicianID: string,
      title: string,
      patientName: string,
      notes: string,
      lastModified: string,
      alertID?: string | null,
      pending?: string | null,
      completed?: string | null,
      version: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListPendingTodosByLastModifiedDateQueryVariables = {
  pending?: string | null,
  lastModified?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTodoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPendingTodosByLastModifiedDateQuery = {
  listPendingTodosByLastModifiedDate?:  {
    __typename: "ModelTodoConnection",
    items?:  Array< {
      __typename: "Todo",
      id: string,
      clinicianID: string,
      title: string,
      patientName: string,
      notes: string,
      lastModified: string,
      alertID?: string | null,
      pending?: string | null,
      completed?: string | null,
      version: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListCompletedTodosByLastModifiedDateQueryVariables = {
  completed?: string | null,
  lastModified?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTodoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCompletedTodosByLastModifiedDateQuery = {
  listCompletedTodosByLastModifiedDate?:  {
    __typename: "ModelTodoConnection",
    items?:  Array< {
      __typename: "Todo",
      id: string,
      clinicianID: string,
      title: string,
      patientName: string,
      notes: string,
      lastModified: string,
      alertID?: string | null,
      pending?: string | null,
      completed?: string | null,
      version: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListTodosByAlertIDQueryVariables = {
  clinicianID?: string | null,
  alertID?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTodoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTodosByAlertIDQuery = {
  listTodosByAlertID?:  {
    __typename: "ModelTodoConnection",
    items?:  Array< {
      __typename: "Todo",
      id: string,
      clinicianID: string,
      title: string,
      patientName: string,
      notes: string,
      lastModified: string,
      alertID?: string | null,
      pending?: string | null,
      completed?: string | null,
      version: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetAlertNotificationQueryVariables = {
  id: string,
};

export type GetAlertNotificationQuery = {
  getAlertNotification?:  {
    __typename: "AlertNotification",
    id: string,
    patientID: string,
    alertID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAlertNotificationsQueryVariables = {
  filter?: ModelAlertNotificationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAlertNotificationsQuery = {
  listAlertNotifications?:  {
    __typename: "ModelAlertNotificationConnection",
    items?:  Array< {
      __typename: "AlertNotification",
      id: string,
      patientID: string,
      alertID: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetClinicianRecordQueryVariables = {
  patientID: string,
  documentID: string,
};

export type GetClinicianRecordQuery = {
  getClinicianRecord?:  {
    __typename: "ClinicianRecord",
    patientID: string,
    documentID: string,
    type: string,
    title: string,
    path: string,
    uploaderClinicianID: string,
    uploadDateTime?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListClinicianRecordsQueryVariables = {
  patientID?: string | null,
  documentID?: ModelStringKeyConditionInput | null,
  filter?: ModelClinicianRecordFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListClinicianRecordsQuery = {
  listClinicianRecords?:  {
    __typename: "ModelClinicianRecordConnection",
    items?:  Array< {
      __typename: "ClinicianRecord",
      patientID: string,
      documentID: string,
      type: string,
      title: string,
      path: string,
      uploaderClinicianID: string,
      uploadDateTime?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListUploadedClinicianRecordsByPatientIDQueryVariables = {
  patientID?: string | null,
  uploadDateTime?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelClinicianRecordFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUploadedClinicianRecordsByPatientIDQuery = {
  listUploadedClinicianRecordsByPatientID?:  {
    __typename: "ModelClinicianRecordConnection",
    items?:  Array< {
      __typename: "ClinicianRecord",
      patientID: string,
      documentID: string,
      type: string,
      title: string,
      path: string,
      uploaderClinicianID: string,
      uploadDateTime?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreatePatientInfoSubscriptionVariables = {
  patientID?: string | null,
};

export type OnCreatePatientInfoSubscription = {
  onCreatePatientInfo?:  {
    __typename: "PatientInfo",
    patientID: string,
    name: string,
    address: string,
    gender: string,
    birthDate: string,
    language: string,
    phoneNumber: string,
    email: string,
    emergencyContactName: string,
    emergencyContactNumber: string,
    riskLevel: string,
    NYHAClass?: string | null,
    cardiologist?: string | null,
    diagnosisInfo?: string | null,
    hospitalName?: string | null,
    hospitalLocation?: string | null,
    targetWeight?: number | null,
    targetSteps?: number | null,
    deviceNo?: string | null,
    fluidIntakeGoalInMl?: number | null,
    configured: boolean,
    version: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePatientInfoSubscriptionVariables = {
  patientID?: string | null,
};

export type OnUpdatePatientInfoSubscription = {
  onUpdatePatientInfo?:  {
    __typename: "PatientInfo",
    patientID: string,
    name: string,
    address: string,
    gender: string,
    birthDate: string,
    language: string,
    phoneNumber: string,
    email: string,
    emergencyContactName: string,
    emergencyContactNumber: string,
    riskLevel: string,
    NYHAClass?: string | null,
    cardiologist?: string | null,
    diagnosisInfo?: string | null,
    hospitalName?: string | null,
    hospitalLocation?: string | null,
    targetWeight?: number | null,
    targetSteps?: number | null,
    deviceNo?: string | null,
    fluidIntakeGoalInMl?: number | null,
    configured: boolean,
    version: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePatientInfoSubscriptionVariables = {
  patientID?: string | null,
};

export type OnDeletePatientInfoSubscription = {
  onDeletePatientInfo?:  {
    __typename: "PatientInfo",
    patientID: string,
    name: string,
    address: string,
    gender: string,
    birthDate: string,
    language: string,
    phoneNumber: string,
    email: string,
    emergencyContactName: string,
    emergencyContactNumber: string,
    riskLevel: string,
    NYHAClass?: string | null,
    cardiologist?: string | null,
    diagnosisInfo?: string | null,
    hospitalName?: string | null,
    hospitalLocation?: string | null,
    targetWeight?: number | null,
    targetSteps?: number | null,
    deviceNo?: string | null,
    fluidIntakeGoalInMl?: number | null,
    configured: boolean,
    version: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateMedicationInfoSubscriptionVariables = {
  patientID?: string | null,
};

export type OnCreateMedicationInfoSubscription = {
  onCreateMedicationInfo?:  {
    __typename: "MedicationInfo",
    id: string,
    patientID: string,
    name: string,
    dosage: number,
    frequency: number,
    records: string,
    active: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateMedicationInfoSubscriptionVariables = {
  patientID?: string | null,
};

export type OnUpdateMedicationInfoSubscription = {
  onUpdateMedicationInfo?:  {
    __typename: "MedicationInfo",
    id: string,
    patientID: string,
    name: string,
    dosage: number,
    frequency: number,
    records: string,
    active: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteMedicationInfoSubscriptionVariables = {
  patientID?: string | null,
};

export type OnDeleteMedicationInfoSubscription = {
  onDeleteMedicationInfo?:  {
    __typename: "MedicationInfo",
    id: string,
    patientID: string,
    name: string,
    dosage: number,
    frequency: number,
    records: string,
    active: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateActivityInfoSubscriptionVariables = {
  patientID?: string | null,
};

export type OnCreateActivityInfoSubscription = {
  onCreateActivityInfo?:  {
    __typename: "ActivityInfo",
    id: string,
    patientID: string,
    activityName: string,
    startTime: string,
    days?: Array< string > | null,
    durationInMinutes?: number | null,
    locations?: Array< string > | null,
    symptoms?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateActivityInfoSubscriptionVariables = {
  patientID?: string | null,
};

export type OnUpdateActivityInfoSubscription = {
  onUpdateActivityInfo?:  {
    __typename: "ActivityInfo",
    id: string,
    patientID: string,
    activityName: string,
    startTime: string,
    days?: Array< string > | null,
    durationInMinutes?: number | null,
    locations?: Array< string > | null,
    symptoms?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteActivityInfoSubscriptionVariables = {
  patientID?: string | null,
};

export type OnDeleteActivityInfoSubscription = {
  onDeleteActivityInfo?:  {
    __typename: "ActivityInfo",
    id: string,
    patientID: string,
    activityName: string,
    startTime: string,
    days?: Array< string > | null,
    durationInMinutes?: number | null,
    locations?: Array< string > | null,
    symptoms?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateReportSymptomSubscriptionVariables = {
  patientID?: string | null,
};

export type OnCreateReportSymptomSubscription = {
  onCreateReportSymptom?:  {
    __typename: "ReportSymptom",
    id: string,
    patientID: string,
    activityInfoID: string,
    symptomName: string,
    severity: number,
    dateTime: string,
    summary: string,
    weather?: string | null,
    temperature?: string | null,
    humidity?: string | null,
    createdAt: string,
    updatedAt: string,
    activityInfo?:  {
      __typename: "ActivityInfo",
      id: string,
      patientID: string,
      activityName: string,
      startTime: string,
      days?: Array< string > | null,
      durationInMinutes?: number | null,
      locations?: Array< string > | null,
      symptoms?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnUpdateReportSymptomSubscriptionVariables = {
  patientID?: string | null,
};

export type OnUpdateReportSymptomSubscription = {
  onUpdateReportSymptom?:  {
    __typename: "ReportSymptom",
    id: string,
    patientID: string,
    activityInfoID: string,
    symptomName: string,
    severity: number,
    dateTime: string,
    summary: string,
    weather?: string | null,
    temperature?: string | null,
    humidity?: string | null,
    createdAt: string,
    updatedAt: string,
    activityInfo?:  {
      __typename: "ActivityInfo",
      id: string,
      patientID: string,
      activityName: string,
      startTime: string,
      days?: Array< string > | null,
      durationInMinutes?: number | null,
      locations?: Array< string > | null,
      symptoms?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnDeleteReportSymptomSubscriptionVariables = {
  patientID?: string | null,
};

export type OnDeleteReportSymptomSubscription = {
  onDeleteReportSymptom?:  {
    __typename: "ReportSymptom",
    id: string,
    patientID: string,
    activityInfoID: string,
    symptomName: string,
    severity: number,
    dateTime: string,
    summary: string,
    weather?: string | null,
    temperature?: string | null,
    humidity?: string | null,
    createdAt: string,
    updatedAt: string,
    activityInfo?:  {
      __typename: "ActivityInfo",
      id: string,
      patientID: string,
      activityName: string,
      startTime: string,
      days?: Array< string > | null,
      durationInMinutes?: number | null,
      locations?: Array< string > | null,
      symptoms?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnCreateReportVitalsSubscriptionVariables = {
  patientID?: string | null,
};

export type OnCreateReportVitalsSubscription = {
  onCreateReportVitals?:  {
    __typename: "ReportVitals",
    id: string,
    patientID: string,
    dateTime: string,
    weight?: number | null,
    systolicBloodPressure?: number | null,
    diastolicBloodPressure?: number | null,
    oxygenSaturation?: number | null,
    fluidIntakeInMl?: number | null,
    weather?: string | null,
    temperature?: number | null,
    humidity?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateReportVitalsSubscriptionVariables = {
  patientID?: string | null,
};

export type OnUpdateReportVitalsSubscription = {
  onUpdateReportVitals?:  {
    __typename: "ReportVitals",
    id: string,
    patientID: string,
    dateTime: string,
    weight?: number | null,
    systolicBloodPressure?: number | null,
    diastolicBloodPressure?: number | null,
    oxygenSaturation?: number | null,
    fluidIntakeInMl?: number | null,
    weather?: string | null,
    temperature?: number | null,
    humidity?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteReportVitalsSubscriptionVariables = {
  patientID?: string | null,
};

export type OnDeleteReportVitalsSubscription = {
  onDeleteReportVitals?:  {
    __typename: "ReportVitals",
    id: string,
    patientID: string,
    dateTime: string,
    weight?: number | null,
    systolicBloodPressure?: number | null,
    diastolicBloodPressure?: number | null,
    oxygenSaturation?: number | null,
    fluidIntakeInMl?: number | null,
    weather?: string | null,
    temperature?: number | null,
    humidity?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePhysicalSubscriptionVariables = {
  patientID?: string | null,
};

export type OnCreatePhysicalSubscription = {
  onCreatePhysical?:  {
    __typename: "Physical",
    id: string,
    patientID: string,
    steps: number,
    stepsGoal: number,
    averageWalkingSpeedInMetresPerSeconds: number,
    distanceInMetres: number,
    dateTime: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePhysicalSubscriptionVariables = {
  patientID?: string | null,
};

export type OnUpdatePhysicalSubscription = {
  onUpdatePhysical?:  {
    __typename: "Physical",
    id: string,
    patientID: string,
    steps: number,
    stepsGoal: number,
    averageWalkingSpeedInMetresPerSeconds: number,
    distanceInMetres: number,
    dateTime: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePhysicalSubscriptionVariables = {
  patientID?: string | null,
};

export type OnDeletePhysicalSubscription = {
  onDeletePhysical?:  {
    __typename: "Physical",
    id: string,
    patientID: string,
    steps: number,
    stepsGoal: number,
    averageWalkingSpeedInMetresPerSeconds: number,
    distanceInMetres: number,
    dateTime: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateClinicianInfoSubscriptionVariables = {
  clinicianID?: string | null,
};

export type OnCreateClinicianInfoSubscription = {
  onCreateClinicianInfo?:  {
    __typename: "ClinicianInfo",
    clinicianID: string,
    name: string,
    hospitalName: string,
    role: string,
    contactNumber: string,
    version: number,
    createdAt: string,
    updatedAt: string,
    protectedInfo?:  {
      __typename: "ClinicianProtectedInfo",
      clinicianID: string,
      facts: string,
      APS: string,
      DTA: string,
      UXSA: string,
      NWA: string,
      ALA: string,
      MHA: string,
      CAM: string,
      version: number,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnUpdateClinicianInfoSubscriptionVariables = {
  clinicianID?: string | null,
};

export type OnUpdateClinicianInfoSubscription = {
  onUpdateClinicianInfo?:  {
    __typename: "ClinicianInfo",
    clinicianID: string,
    name: string,
    hospitalName: string,
    role: string,
    contactNumber: string,
    version: number,
    createdAt: string,
    updatedAt: string,
    protectedInfo?:  {
      __typename: "ClinicianProtectedInfo",
      clinicianID: string,
      facts: string,
      APS: string,
      DTA: string,
      UXSA: string,
      NWA: string,
      ALA: string,
      MHA: string,
      CAM: string,
      version: number,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnDeleteClinicianInfoSubscriptionVariables = {
  clinicianID?: string | null,
};

export type OnDeleteClinicianInfoSubscription = {
  onDeleteClinicianInfo?:  {
    __typename: "ClinicianInfo",
    clinicianID: string,
    name: string,
    hospitalName: string,
    role: string,
    contactNumber: string,
    version: number,
    createdAt: string,
    updatedAt: string,
    protectedInfo?:  {
      __typename: "ClinicianProtectedInfo",
      clinicianID: string,
      facts: string,
      APS: string,
      DTA: string,
      UXSA: string,
      NWA: string,
      ALA: string,
      MHA: string,
      CAM: string,
      version: number,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnCreateClinicianProtectedInfoSubscriptionVariables = {
  clinicianID?: string | null,
};

export type OnCreateClinicianProtectedInfoSubscription = {
  onCreateClinicianProtectedInfo?:  {
    __typename: "ClinicianProtectedInfo",
    clinicianID: string,
    facts: string,
    APS: string,
    DTA: string,
    UXSA: string,
    NWA: string,
    ALA: string,
    MHA: string,
    CAM: string,
    version: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateClinicianProtectedInfoSubscriptionVariables = {
  clinicianID?: string | null,
};

export type OnUpdateClinicianProtectedInfoSubscription = {
  onUpdateClinicianProtectedInfo?:  {
    __typename: "ClinicianProtectedInfo",
    clinicianID: string,
    facts: string,
    APS: string,
    DTA: string,
    UXSA: string,
    NWA: string,
    ALA: string,
    MHA: string,
    CAM: string,
    version: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteClinicianProtectedInfoSubscriptionVariables = {
  clinicianID?: string | null,
};

export type OnDeleteClinicianProtectedInfoSubscription = {
  onDeleteClinicianProtectedInfo?:  {
    __typename: "ClinicianProtectedInfo",
    clinicianID: string,
    facts: string,
    APS: string,
    DTA: string,
    UXSA: string,
    NWA: string,
    ALA: string,
    MHA: string,
    CAM: string,
    version: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateClinicianPatientMapSubscriptionVariables = {
  clinicianID?: string | null,
  patientID?: string | null,
};

export type OnCreateClinicianPatientMapSubscription = {
  onCreateClinicianPatientMap?:  {
    __typename: "ClinicianPatientMap",
    clinicianID: string,
    patientID: string,
    createdAt: string,
    updatedAt: string,
    clinicianInfo:  {
      __typename: "ClinicianInfo",
      clinicianID: string,
      name: string,
      hospitalName: string,
      role: string,
      contactNumber: string,
      version: number,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type OnUpdateClinicianPatientMapSubscriptionVariables = {
  clinicianID?: string | null,
  patientID?: string | null,
};

export type OnUpdateClinicianPatientMapSubscription = {
  onUpdateClinicianPatientMap?:  {
    __typename: "ClinicianPatientMap",
    clinicianID: string,
    patientID: string,
    createdAt: string,
    updatedAt: string,
    clinicianInfo:  {
      __typename: "ClinicianInfo",
      clinicianID: string,
      name: string,
      hospitalName: string,
      role: string,
      contactNumber: string,
      version: number,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type OnDeleteClinicianPatientMapSubscriptionVariables = {
  clinicianID?: string | null,
  patientID?: string | null,
};

export type OnDeleteClinicianPatientMapSubscription = {
  onDeleteClinicianPatientMap?:  {
    __typename: "ClinicianPatientMap",
    clinicianID: string,
    patientID: string,
    createdAt: string,
    updatedAt: string,
    clinicianInfo:  {
      __typename: "ClinicianInfo",
      clinicianID: string,
      name: string,
      hospitalName: string,
      role: string,
      contactNumber: string,
      version: number,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type OnCreatePatientAssignmentSubscriptionVariables = {
  patientID?: string | null,
  clinicianID?: string | null,
};

export type OnCreatePatientAssignmentSubscription = {
  onCreatePatientAssignment?:  {
    __typename: "PatientAssignment",
    patientID: string,
    clinicianID: string,
    patientName: string,
    pending?: string | null,
    resolution?: string | null,
    reassignToClinicianID?: string | null,
    sourceClinicianID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePatientAssignmentSubscriptionVariables = {
  patientID?: string | null,
  clinicianID?: string | null,
};

export type OnUpdatePatientAssignmentSubscription = {
  onUpdatePatientAssignment?:  {
    __typename: "PatientAssignment",
    patientID: string,
    clinicianID: string,
    patientName: string,
    pending?: string | null,
    resolution?: string | null,
    reassignToClinicianID?: string | null,
    sourceClinicianID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePatientAssignmentSubscriptionVariables = {
  patientID?: string | null,
  clinicianID?: string | null,
};

export type OnDeletePatientAssignmentSubscription = {
  onDeletePatientAssignment?:  {
    __typename: "PatientAssignment",
    patientID: string,
    clinicianID: string,
    patientName: string,
    pending?: string | null,
    resolution?: string | null,
    reassignToClinicianID?: string | null,
    sourceClinicianID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateAlertSubscriptionVariables = {
  patientID?: string | null,
};

export type OnCreateAlertSubscription = {
  onCreateAlert?:  {
    __typename: "Alert",
    id: string,
    patientID: string,
    patientName: string,
    dateTime: string,
    summary: string,
    colorCode: string,
    triageValue: string,
    vitalsReportID: string,
    symptomReportID: string,
    pending?: string | null,
    completed?: string | null,
    createdAt: string,
    updatedAt: string,
    symptomReport?:  {
      __typename: "ReportSymptom",
      id: string,
      patientID: string,
      activityInfoID: string,
      symptomName: string,
      severity: number,
      dateTime: string,
      summary: string,
      weather?: string | null,
      temperature?: string | null,
      humidity?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    vitalsReport?:  {
      __typename: "ReportVitals",
      id: string,
      patientID: string,
      dateTime: string,
      weight?: number | null,
      systolicBloodPressure?: number | null,
      diastolicBloodPressure?: number | null,
      oxygenSaturation?: number | null,
      fluidIntakeInMl?: number | null,
      weather?: string | null,
      temperature?: number | null,
      humidity?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnUpdateAlertSubscriptionVariables = {
  patientID?: string | null,
};

export type OnUpdateAlertSubscription = {
  onUpdateAlert?:  {
    __typename: "Alert",
    id: string,
    patientID: string,
    patientName: string,
    dateTime: string,
    summary: string,
    colorCode: string,
    triageValue: string,
    vitalsReportID: string,
    symptomReportID: string,
    pending?: string | null,
    completed?: string | null,
    createdAt: string,
    updatedAt: string,
    symptomReport?:  {
      __typename: "ReportSymptom",
      id: string,
      patientID: string,
      activityInfoID: string,
      symptomName: string,
      severity: number,
      dateTime: string,
      summary: string,
      weather?: string | null,
      temperature?: string | null,
      humidity?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    vitalsReport?:  {
      __typename: "ReportVitals",
      id: string,
      patientID: string,
      dateTime: string,
      weight?: number | null,
      systolicBloodPressure?: number | null,
      diastolicBloodPressure?: number | null,
      oxygenSaturation?: number | null,
      fluidIntakeInMl?: number | null,
      weather?: string | null,
      temperature?: number | null,
      humidity?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnDeleteAlertSubscriptionVariables = {
  patientID?: string | null,
};

export type OnDeleteAlertSubscription = {
  onDeleteAlert?:  {
    __typename: "Alert",
    id: string,
    patientID: string,
    patientName: string,
    dateTime: string,
    summary: string,
    colorCode: string,
    triageValue: string,
    vitalsReportID: string,
    symptomReportID: string,
    pending?: string | null,
    completed?: string | null,
    createdAt: string,
    updatedAt: string,
    symptomReport?:  {
      __typename: "ReportSymptom",
      id: string,
      patientID: string,
      activityInfoID: string,
      symptomName: string,
      severity: number,
      dateTime: string,
      summary: string,
      weather?: string | null,
      temperature?: string | null,
      humidity?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    vitalsReport?:  {
      __typename: "ReportVitals",
      id: string,
      patientID: string,
      dateTime: string,
      weight?: number | null,
      systolicBloodPressure?: number | null,
      diastolicBloodPressure?: number | null,
      oxygenSaturation?: number | null,
      fluidIntakeInMl?: number | null,
      weather?: string | null,
      temperature?: number | null,
      humidity?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnCreateTodoSubscriptionVariables = {
  clinicianID?: string | null,
};

export type OnCreateTodoSubscription = {
  onCreateTodo?:  {
    __typename: "Todo",
    id: string,
    clinicianID: string,
    title: string,
    patientName: string,
    notes: string,
    lastModified: string,
    alertID?: string | null,
    pending?: string | null,
    completed?: string | null,
    version: number,
    createdAt: string,
    updatedAt: string,
    alert?:  {
      __typename: "Alert",
      id: string,
      patientID: string,
      patientName: string,
      dateTime: string,
      summary: string,
      colorCode: string,
      triageValue: string,
      vitalsReportID: string,
      symptomReportID: string,
      pending?: string | null,
      completed?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnUpdateTodoSubscriptionVariables = {
  clinicianID?: string | null,
};

export type OnUpdateTodoSubscription = {
  onUpdateTodo?:  {
    __typename: "Todo",
    id: string,
    clinicianID: string,
    title: string,
    patientName: string,
    notes: string,
    lastModified: string,
    alertID?: string | null,
    pending?: string | null,
    completed?: string | null,
    version: number,
    createdAt: string,
    updatedAt: string,
    alert?:  {
      __typename: "Alert",
      id: string,
      patientID: string,
      patientName: string,
      dateTime: string,
      summary: string,
      colorCode: string,
      triageValue: string,
      vitalsReportID: string,
      symptomReportID: string,
      pending?: string | null,
      completed?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnDeleteTodoSubscriptionVariables = {
  clinicianID?: string | null,
};

export type OnDeleteTodoSubscription = {
  onDeleteTodo?:  {
    __typename: "Todo",
    id: string,
    clinicianID: string,
    title: string,
    patientName: string,
    notes: string,
    lastModified: string,
    alertID?: string | null,
    pending?: string | null,
    completed?: string | null,
    version: number,
    createdAt: string,
    updatedAt: string,
    alert?:  {
      __typename: "Alert",
      id: string,
      patientID: string,
      patientName: string,
      dateTime: string,
      summary: string,
      colorCode: string,
      triageValue: string,
      vitalsReportID: string,
      symptomReportID: string,
      pending?: string | null,
      completed?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnCreateAlertNotificationSubscriptionVariables = {
  patientID?: string | null,
};

export type OnCreateAlertNotificationSubscription = {
  onCreateAlertNotification?:  {
    __typename: "AlertNotification",
    id: string,
    patientID: string,
    alertID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAlertNotificationSubscriptionVariables = {
  patientID?: string | null,
};

export type OnUpdateAlertNotificationSubscription = {
  onUpdateAlertNotification?:  {
    __typename: "AlertNotification",
    id: string,
    patientID: string,
    alertID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAlertNotificationSubscriptionVariables = {
  patientID?: string | null,
};

export type OnDeleteAlertNotificationSubscription = {
  onDeleteAlertNotification?:  {
    __typename: "AlertNotification",
    id: string,
    patientID: string,
    alertID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateClinicianRecordSubscriptionVariables = {
  uploaderClinicianID?: string | null,
};

export type OnCreateClinicianRecordSubscription = {
  onCreateClinicianRecord?:  {
    __typename: "ClinicianRecord",
    patientID: string,
    documentID: string,
    type: string,
    title: string,
    path: string,
    uploaderClinicianID: string,
    uploadDateTime?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateClinicianRecordSubscriptionVariables = {
  uploaderClinicianID?: string | null,
};

export type OnUpdateClinicianRecordSubscription = {
  onUpdateClinicianRecord?:  {
    __typename: "ClinicianRecord",
    patientID: string,
    documentID: string,
    type: string,
    title: string,
    path: string,
    uploaderClinicianID: string,
    uploadDateTime?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteClinicianRecordSubscriptionVariables = {
  uploaderClinicianID?: string | null,
};

export type OnDeleteClinicianRecordSubscription = {
  onDeleteClinicianRecord?:  {
    __typename: "ClinicianRecord",
    patientID: string,
    documentID: string,
    type: string,
    title: string,
    path: string,
    uploaderClinicianID: string,
    uploadDateTime?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
