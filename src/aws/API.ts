/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreatePatientInfoInput = {
  id?: string | null,
  name: string,
  address: string,
  deviceNo: string,
  diagnosisInfo: string,
  NHYAclass: string,
  cardiologist: string,
  hospitalName: string,
  hospitalLocation: string,
  targetWeight: string,
  targetActivity: string,
  patientID: string,
  _version?: number | null,
};

export type ModelPatientInfoConditionInput = {
  name?: ModelStringInput | null,
  address?: ModelStringInput | null,
  deviceNo?: ModelStringInput | null,
  diagnosisInfo?: ModelStringInput | null,
  NHYAclass?: ModelStringInput | null,
  cardiologist?: ModelStringInput | null,
  hospitalName?: ModelStringInput | null,
  hospitalLocation?: ModelStringInput | null,
  targetWeight?: ModelStringInput | null,
  targetActivity?: ModelStringInput | null,
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

export type PatientInfo = {
  __typename: "PatientInfo",
  id: string,
  name: string,
  address: string,
  deviceNo: string,
  diagnosisInfo: string,
  NHYAclass: string,
  cardiologist: string,
  hospitalName: string,
  hospitalLocation: string,
  targetWeight: string,
  targetActivity: string,
  patientID: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdatePatientInfoInput = {
  id?: string | null,
  name?: string | null,
  address?: string | null,
  deviceNo?: string | null,
  diagnosisInfo?: string | null,
  NHYAclass?: string | null,
  cardiologist?: string | null,
  hospitalName?: string | null,
  hospitalLocation?: string | null,
  targetWeight?: string | null,
  targetActivity?: string | null,
  patientID: string,
  _version?: number | null,
};

export type DeletePatientInfoInput = {
  patientID: string,
  _version?: number | null,
};

export type CreateMedicationInfoInput = {
  id?: string | null,
  medname: string,
  dosage: string,
  patientID: string,
  _version?: number | null,
};

export type ModelMedicationInfoConditionInput = {
  medname?: ModelStringInput | null,
  dosage?: ModelStringInput | null,
  and?: Array< ModelMedicationInfoConditionInput | null > | null,
  or?: Array< ModelMedicationInfoConditionInput | null > | null,
  not?: ModelMedicationInfoConditionInput | null,
};

export type MedicationInfo = {
  __typename: "MedicationInfo",
  id: string,
  medname: string,
  dosage: string,
  patientID: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateMedicationInfoInput = {
  id: string,
  medname?: string | null,
  dosage?: string | null,
  patientID?: string | null,
  _version?: number | null,
};

export type DeleteMedicationInfoInput = {
  id: string,
  _version?: number | null,
};

export type CreateActivityInfoInput = {
  id?: string | null,
  Actname: string,
  Location: string,
  Frequency: number,
  Days: Array< string >,
  time: string,
  patientID: string,
  _version?: number | null,
};

export type ModelActivityInfoConditionInput = {
  Actname?: ModelStringInput | null,
  Location?: ModelStringInput | null,
  Frequency?: ModelIntInput | null,
  Days?: ModelStringInput | null,
  time?: ModelStringInput | null,
  and?: Array< ModelActivityInfoConditionInput | null > | null,
  or?: Array< ModelActivityInfoConditionInput | null > | null,
  not?: ModelActivityInfoConditionInput | null,
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

export type ActivityInfo = {
  __typename: "ActivityInfo",
  id: string,
  Actname: string,
  Location: string,
  Frequency: number,
  Days: Array< string >,
  time: string,
  patientID: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateActivityInfoInput = {
  id: string,
  Actname?: string | null,
  Location?: string | null,
  Frequency?: number | null,
  Days?: Array< string > | null,
  time?: string | null,
  patientID?: string | null,
  _version?: number | null,
};

export type DeleteActivityInfoInput = {
  id: string,
  _version?: number | null,
};

export type CreateMedCompliantInput = {
  id?: string | null,
  MedId: string,
  Verification: boolean,
  Date: string,
  patientID: string,
  _version?: number | null,
};

export type ModelMedCompliantConditionInput = {
  MedId?: ModelIDInput | null,
  Verification?: ModelBooleanInput | null,
  Date?: ModelStringInput | null,
  and?: Array< ModelMedCompliantConditionInput | null > | null,
  or?: Array< ModelMedCompliantConditionInput | null > | null,
  not?: ModelMedCompliantConditionInput | null,
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

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type MedCompliant = {
  __typename: "MedCompliant",
  id: string,
  MedId: string,
  MedicationInfo?: MedicationInfo | null,
  Verification: boolean,
  Date: string,
  patientID: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateMedCompliantInput = {
  id: string,
  MedId?: string | null,
  Verification?: boolean | null,
  Date?: string | null,
  patientID?: string | null,
  _version?: number | null,
};

export type DeleteMedCompliantInput = {
  id: string,
  _version?: number | null,
};

export type CreateReportSymptomInput = {
  id?: string | null,
  ActId: string,
  Name: string,
  Severity: string,
  DateTime: string,
  patientID: string,
  _version?: number | null,
};

export type ModelReportSymptomConditionInput = {
  ActId?: ModelIDInput | null,
  Name?: ModelStringInput | null,
  Severity?: ModelStringInput | null,
  DateTime?: ModelStringInput | null,
  and?: Array< ModelReportSymptomConditionInput | null > | null,
  or?: Array< ModelReportSymptomConditionInput | null > | null,
  not?: ModelReportSymptomConditionInput | null,
};

export type ReportSymptom = {
  __typename: "ReportSymptom",
  id: string,
  ActId: string,
  ActivityInfo?: ActivityInfo | null,
  Name: string,
  Severity: string,
  DateTime: string,
  patientID: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateReportSymptomInput = {
  id: string,
  ActId?: string | null,
  Name?: string | null,
  Severity?: string | null,
  DateTime?: string | null,
  patientID?: string | null,
  _version?: number | null,
};

export type DeleteReportSymptomInput = {
  id: string,
  _version?: number | null,
};

export type CreateReportVitalsInput = {
  id?: string | null,
  Temperature?: string | null,
  Humidity?: string | null,
  Weight: string,
  BPSys: string,
  BPDi: string,
  NoSteps: string,
  OxySat: string,
  DateTime: string,
  patientID: string,
  _version?: number | null,
};

export type ModelReportVitalsConditionInput = {
  Temperature?: ModelStringInput | null,
  Humidity?: ModelStringInput | null,
  Weight?: ModelStringInput | null,
  BPSys?: ModelStringInput | null,
  BPDi?: ModelStringInput | null,
  NoSteps?: ModelStringInput | null,
  OxySat?: ModelStringInput | null,
  DateTime?: ModelStringInput | null,
  and?: Array< ModelReportVitalsConditionInput | null > | null,
  or?: Array< ModelReportVitalsConditionInput | null > | null,
  not?: ModelReportVitalsConditionInput | null,
};

export type ReportVitals = {
  __typename: "ReportVitals",
  id: string,
  Temperature?: string | null,
  Humidity?: string | null,
  Weight: string,
  BPSys: string,
  BPDi: string,
  NoSteps: string,
  OxySat: string,
  DateTime: string,
  patientID: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateReportVitalsInput = {
  id: string,
  Temperature?: string | null,
  Humidity?: string | null,
  Weight?: string | null,
  BPSys?: string | null,
  BPDi?: string | null,
  NoSteps?: string | null,
  OxySat?: string | null,
  DateTime?: string | null,
  patientID?: string | null,
  _version?: number | null,
};

export type DeleteReportVitalsInput = {
  id: string,
  _version?: number | null,
};

export type CreateClinicianInfoInput = {
  id?: string | null,
  name: string,
  hospitalName: string,
  role: string,
  clinicianID: string,
  owner: string,
  _version?: number | null,
};

export type ModelClinicianInfoConditionInput = {
  name?: ModelStringInput | null,
  hospitalName?: ModelStringInput | null,
  role?: ModelStringInput | null,
  and?: Array< ModelClinicianInfoConditionInput | null > | null,
  or?: Array< ModelClinicianInfoConditionInput | null > | null,
  not?: ModelClinicianInfoConditionInput | null,
};

export type ClinicianInfo = {
  __typename: "ClinicianInfo",
  id: string,
  name: string,
  hospitalName: string,
  role: string,
  clinicianID: string,
  protectedInfo?: ClinicianProtectedInfo | null,
  owner: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  createdAt: string,
  updatedAt: string,
};

export type ClinicianProtectedInfo = {
  __typename: "ClinicianProtectedInfo",
  id: string,
  facts: string,
  APS: string,
  DTA: string,
  UXSA: string,
  NWA: string,
  ALA: string,
  MHA: string,
  clinicianID: string,
  owner: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  createdAt: string,
  updatedAt: string,
};

export type UpdateClinicianInfoInput = {
  id?: string | null,
  name?: string | null,
  hospitalName?: string | null,
  role?: string | null,
  clinicianID: string,
  owner?: string | null,
  _version?: number | null,
};

export type DeleteClinicianInfoInput = {
  clinicianID: string,
  _version?: number | null,
};

export type CreateClinicianProtectedInfoInput = {
  id?: string | null,
  facts: string,
  APS: string,
  DTA: string,
  UXSA: string,
  NWA: string,
  ALA: string,
  MHA: string,
  clinicianID: string,
  owner: string,
  _version?: number | null,
};

export type ModelClinicianProtectedInfoConditionInput = {
  facts?: ModelStringInput | null,
  APS?: ModelStringInput | null,
  DTA?: ModelStringInput | null,
  UXSA?: ModelStringInput | null,
  NWA?: ModelStringInput | null,
  ALA?: ModelStringInput | null,
  MHA?: ModelStringInput | null,
  and?: Array< ModelClinicianProtectedInfoConditionInput | null > | null,
  or?: Array< ModelClinicianProtectedInfoConditionInput | null > | null,
  not?: ModelClinicianProtectedInfoConditionInput | null,
};

export type UpdateClinicianProtectedInfoInput = {
  id?: string | null,
  facts?: string | null,
  APS?: string | null,
  DTA?: string | null,
  UXSA?: string | null,
  NWA?: string | null,
  ALA?: string | null,
  MHA?: string | null,
  clinicianID: string,
  owner?: string | null,
  _version?: number | null,
};

export type DeleteClinicianProtectedInfoInput = {
  clinicianID: string,
  _version?: number | null,
};

export type CreateClinicianPatientMapInput = {
  id?: string | null,
  clinicianID: string,
  patientID: string,
  owner: string,
  _version?: number | null,
};

export type ModelClinicianPatientMapConditionInput = {
  and?: Array< ModelClinicianPatientMapConditionInput | null > | null,
  or?: Array< ModelClinicianPatientMapConditionInput | null > | null,
  not?: ModelClinicianPatientMapConditionInput | null,
};

export type ClinicianPatientMap = {
  __typename: "ClinicianPatientMap",
  id: string,
  clinicianID: string,
  patientID: string,
  clinicianInfo: ClinicianInfo,
  owner: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  createdAt: string,
  updatedAt: string,
};

export type UpdateClinicianPatientMapInput = {
  id?: string | null,
  clinicianID: string,
  patientID: string,
  owner?: string | null,
  _version?: number | null,
};

export type DeleteClinicianPatientMapInput = {
  clinicianID: string,
  patientID: string,
  _version?: number | null,
};

export type CreatePatientAssignmentInput = {
  id?: string | null,
  patientID: string,
  clinicianID: string,
  pending?: string | null,
  resolution?: string | null,
  patientName: string,
  _version?: number | null,
};

export type ModelPatientAssignmentConditionInput = {
  pending?: ModelStringInput | null,
  resolution?: ModelStringInput | null,
  patientName?: ModelStringInput | null,
  and?: Array< ModelPatientAssignmentConditionInput | null > | null,
  or?: Array< ModelPatientAssignmentConditionInput | null > | null,
  not?: ModelPatientAssignmentConditionInput | null,
};

export type PatientAssignment = {
  __typename: "PatientAssignment",
  id: string,
  patientID: string,
  clinicianID: string,
  pending?: string | null,
  resolution?: string | null,
  patientName: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdatePatientAssignmentInput = {
  id?: string | null,
  patientID: string,
  clinicianID: string,
  pending?: string | null,
  resolution?: string | null,
  patientName?: string | null,
  _version?: number | null,
};

export type DeletePatientAssignmentInput = {
  patientID: string,
  clinicianID: string,
  _version?: number | null,
};

export type CreateAlertInput = {
  id?: string | null,
  patientID: string,
  patientName: string,
  dateTime: string,
  summary: string,
  colorCode: string,
  vitalsReportID: string,
  symptomReportID: string,
  pending?: string | null,
  completed?: string | null,
  owner: string,
  _version?: number | null,
};

export type ModelAlertConditionInput = {
  patientName?: ModelStringInput | null,
  dateTime?: ModelStringInput | null,
  summary?: ModelStringInput | null,
  colorCode?: ModelStringInput | null,
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
  vitalsReportID: string,
  vitalsReport?: ReportVitals | null,
  symptomReportID: string,
  symptomReport?: ReportSymptom | null,
  pending?: string | null,
  completed?: string | null,
  owner: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  createdAt: string,
  updatedAt: string,
};

export type UpdateAlertInput = {
  id: string,
  patientID?: string | null,
  patientName?: string | null,
  dateTime?: string | null,
  summary?: string | null,
  colorCode?: string | null,
  vitalsReportID?: string | null,
  symptomReportID?: string | null,
  pending?: string | null,
  completed?: string | null,
  owner?: string | null,
  _version?: number | null,
};

export type DeleteAlertInput = {
  id: string,
  _version?: number | null,
};

export type CreateTodoInput = {
  id?: string | null,
  clinicianID: string,
  title: string,
  patientName: string,
  notes: string,
  lastModified: string,
  alertID?: string | null,
  completed: boolean,
  owner: string,
  _version?: number | null,
};

export type ModelTodoConditionInput = {
  clinicianID?: ModelStringInput | null,
  title?: ModelStringInput | null,
  patientName?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  lastModified?: ModelStringInput | null,
  alertID?: ModelIDInput | null,
  completed?: ModelBooleanInput | null,
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
  alert?: Alert | null,
  completed: boolean,
  owner: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  createdAt: string,
  updatedAt: string,
};

export type UpdateTodoInput = {
  id: string,
  clinicianID?: string | null,
  title?: string | null,
  patientName?: string | null,
  notes?: string | null,
  lastModified?: string | null,
  alertID?: string | null,
  completed?: boolean | null,
  owner?: string | null,
  _version?: number | null,
};

export type DeleteTodoInput = {
  id: string,
  _version?: number | null,
};

export type ModelPatientInfoFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  address?: ModelStringInput | null,
  deviceNo?: ModelStringInput | null,
  diagnosisInfo?: ModelStringInput | null,
  NHYAclass?: ModelStringInput | null,
  cardiologist?: ModelStringInput | null,
  hospitalName?: ModelStringInput | null,
  hospitalLocation?: ModelStringInput | null,
  targetWeight?: ModelStringInput | null,
  targetActivity?: ModelStringInput | null,
  patientID?: ModelStringInput | null,
  and?: Array< ModelPatientInfoFilterInput | null > | null,
  or?: Array< ModelPatientInfoFilterInput | null > | null,
  not?: ModelPatientInfoFilterInput | null,
};

export type ModelPatientInfoConnection = {
  __typename: "ModelPatientInfoConnection",
  items?:  Array<PatientInfo | null > | null,
  nextToken?: string | null,
  startedAt?: number | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelMedicationInfoFilterInput = {
  id?: ModelIDInput | null,
  medname?: ModelStringInput | null,
  dosage?: ModelStringInput | null,
  patientID?: ModelStringInput | null,
  and?: Array< ModelMedicationInfoFilterInput | null > | null,
  or?: Array< ModelMedicationInfoFilterInput | null > | null,
  not?: ModelMedicationInfoFilterInput | null,
};

export type ModelMedicationInfoConnection = {
  __typename: "ModelMedicationInfoConnection",
  items?:  Array<MedicationInfo | null > | null,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelActivityInfoFilterInput = {
  id?: ModelIDInput | null,
  Actname?: ModelStringInput | null,
  Location?: ModelStringInput | null,
  Frequency?: ModelIntInput | null,
  Days?: ModelStringInput | null,
  time?: ModelStringInput | null,
  patientID?: ModelStringInput | null,
  and?: Array< ModelActivityInfoFilterInput | null > | null,
  or?: Array< ModelActivityInfoFilterInput | null > | null,
  not?: ModelActivityInfoFilterInput | null,
};

export type ModelActivityInfoConnection = {
  __typename: "ModelActivityInfoConnection",
  items?:  Array<ActivityInfo | null > | null,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelMedCompliantFilterInput = {
  id?: ModelIDInput | null,
  MedId?: ModelIDInput | null,
  Verification?: ModelBooleanInput | null,
  Date?: ModelStringInput | null,
  patientID?: ModelStringInput | null,
  and?: Array< ModelMedCompliantFilterInput | null > | null,
  or?: Array< ModelMedCompliantFilterInput | null > | null,
  not?: ModelMedCompliantFilterInput | null,
};

export type ModelMedCompliantConnection = {
  __typename: "ModelMedCompliantConnection",
  items?:  Array<MedCompliant | null > | null,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelReportSymptomFilterInput = {
  id?: ModelIDInput | null,
  ActId?: ModelIDInput | null,
  Name?: ModelStringInput | null,
  Severity?: ModelStringInput | null,
  DateTime?: ModelStringInput | null,
  patientID?: ModelStringInput | null,
  and?: Array< ModelReportSymptomFilterInput | null > | null,
  or?: Array< ModelReportSymptomFilterInput | null > | null,
  not?: ModelReportSymptomFilterInput | null,
};

export type ModelReportSymptomConnection = {
  __typename: "ModelReportSymptomConnection",
  items?:  Array<ReportSymptom | null > | null,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelReportVitalsFilterInput = {
  id?: ModelIDInput | null,
  Temperature?: ModelStringInput | null,
  Humidity?: ModelStringInput | null,
  Weight?: ModelStringInput | null,
  BPSys?: ModelStringInput | null,
  BPDi?: ModelStringInput | null,
  NoSteps?: ModelStringInput | null,
  OxySat?: ModelStringInput | null,
  DateTime?: ModelStringInput | null,
  patientID?: ModelStringInput | null,
  and?: Array< ModelReportVitalsFilterInput | null > | null,
  or?: Array< ModelReportVitalsFilterInput | null > | null,
  not?: ModelReportVitalsFilterInput | null,
};

export type ModelReportVitalsConnection = {
  __typename: "ModelReportVitalsConnection",
  items?:  Array<ReportVitals | null > | null,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelClinicianInfoFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  hospitalName?: ModelStringInput | null,
  role?: ModelStringInput | null,
  clinicianID?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelClinicianInfoFilterInput | null > | null,
  or?: Array< ModelClinicianInfoFilterInput | null > | null,
  not?: ModelClinicianInfoFilterInput | null,
};

export type ModelClinicianInfoConnection = {
  __typename: "ModelClinicianInfoConnection",
  items?:  Array<ClinicianInfo | null > | null,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelClinicianProtectedInfoFilterInput = {
  id?: ModelIDInput | null,
  facts?: ModelStringInput | null,
  APS?: ModelStringInput | null,
  DTA?: ModelStringInput | null,
  UXSA?: ModelStringInput | null,
  NWA?: ModelStringInput | null,
  ALA?: ModelStringInput | null,
  MHA?: ModelStringInput | null,
  clinicianID?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelClinicianProtectedInfoFilterInput | null > | null,
  or?: Array< ModelClinicianProtectedInfoFilterInput | null > | null,
  not?: ModelClinicianProtectedInfoFilterInput | null,
};

export type ModelClinicianProtectedInfoConnection = {
  __typename: "ModelClinicianProtectedInfoConnection",
  items?:  Array<ClinicianProtectedInfo | null > | null,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelClinicianPatientMapFilterInput = {
  id?: ModelIDInput | null,
  clinicianID?: ModelStringInput | null,
  patientID?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelClinicianPatientMapFilterInput | null > | null,
  or?: Array< ModelClinicianPatientMapFilterInput | null > | null,
  not?: ModelClinicianPatientMapFilterInput | null,
};

export type ModelClinicianPatientMapConnection = {
  __typename: "ModelClinicianPatientMapConnection",
  items?:  Array<ClinicianPatientMap | null > | null,
  nextToken?: string | null,
  startedAt?: number | null,
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

export type ModelPatientAssignmentFilterInput = {
  id?: ModelIDInput | null,
  patientID?: ModelStringInput | null,
  clinicianID?: ModelStringInput | null,
  pending?: ModelStringInput | null,
  resolution?: ModelStringInput | null,
  patientName?: ModelStringInput | null,
  and?: Array< ModelPatientAssignmentFilterInput | null > | null,
  or?: Array< ModelPatientAssignmentFilterInput | null > | null,
  not?: ModelPatientAssignmentFilterInput | null,
};

export type ModelPatientAssignmentConnection = {
  __typename: "ModelPatientAssignmentConnection",
  items?:  Array<PatientAssignment | null > | null,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelAlertFilterInput = {
  id?: ModelIDInput | null,
  patientID?: ModelStringInput | null,
  patientName?: ModelStringInput | null,
  dateTime?: ModelStringInput | null,
  summary?: ModelStringInput | null,
  colorCode?: ModelStringInput | null,
  vitalsReportID?: ModelIDInput | null,
  symptomReportID?: ModelIDInput | null,
  pending?: ModelStringInput | null,
  completed?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelAlertFilterInput | null > | null,
  or?: Array< ModelAlertFilterInput | null > | null,
  not?: ModelAlertFilterInput | null,
};

export type ModelAlertConnection = {
  __typename: "ModelAlertConnection",
  items?:  Array<Alert | null > | null,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelTodoFilterInput = {
  id?: ModelIDInput | null,
  clinicianID?: ModelStringInput | null,
  title?: ModelStringInput | null,
  patientName?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  lastModified?: ModelStringInput | null,
  alertID?: ModelIDInput | null,
  completed?: ModelBooleanInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelTodoFilterInput | null > | null,
  or?: Array< ModelTodoFilterInput | null > | null,
  not?: ModelTodoFilterInput | null,
};

export type ModelTodoConnection = {
  __typename: "ModelTodoConnection",
  items?:  Array<Todo | null > | null,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type CreatePatientInfoMutationVariables = {
  input: CreatePatientInfoInput,
  condition?: ModelPatientInfoConditionInput | null,
};

export type CreatePatientInfoMutation = {
  createPatientInfo?:  {
    __typename: "PatientInfo",
    id: string,
    name: string,
    address: string,
    deviceNo: string,
    diagnosisInfo: string,
    NHYAclass: string,
    cardiologist: string,
    hospitalName: string,
    hospitalLocation: string,
    targetWeight: string,
    targetActivity: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdatePatientInfoMutationVariables = {
  input: UpdatePatientInfoInput,
  condition?: ModelPatientInfoConditionInput | null,
};

export type UpdatePatientInfoMutation = {
  updatePatientInfo?:  {
    __typename: "PatientInfo",
    id: string,
    name: string,
    address: string,
    deviceNo: string,
    diagnosisInfo: string,
    NHYAclass: string,
    cardiologist: string,
    hospitalName: string,
    hospitalLocation: string,
    targetWeight: string,
    targetActivity: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeletePatientInfoMutationVariables = {
  input: DeletePatientInfoInput,
  condition?: ModelPatientInfoConditionInput | null,
};

export type DeletePatientInfoMutation = {
  deletePatientInfo?:  {
    __typename: "PatientInfo",
    id: string,
    name: string,
    address: string,
    deviceNo: string,
    diagnosisInfo: string,
    NHYAclass: string,
    cardiologist: string,
    hospitalName: string,
    hospitalLocation: string,
    targetWeight: string,
    targetActivity: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    medname: string,
    dosage: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    medname: string,
    dosage: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    medname: string,
    dosage: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    Actname: string,
    Location: string,
    Frequency: number,
    Days: Array< string >,
    time: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    Actname: string,
    Location: string,
    Frequency: number,
    Days: Array< string >,
    time: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    Actname: string,
    Location: string,
    Frequency: number,
    Days: Array< string >,
    time: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateMedCompliantMutationVariables = {
  input: CreateMedCompliantInput,
  condition?: ModelMedCompliantConditionInput | null,
};

export type CreateMedCompliantMutation = {
  createMedCompliant?:  {
    __typename: "MedCompliant",
    id: string,
    MedId: string,
    MedicationInfo?:  {
      __typename: "MedicationInfo",
      id: string,
      medname: string,
      dosage: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    Verification: boolean,
    Date: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateMedCompliantMutationVariables = {
  input: UpdateMedCompliantInput,
  condition?: ModelMedCompliantConditionInput | null,
};

export type UpdateMedCompliantMutation = {
  updateMedCompliant?:  {
    __typename: "MedCompliant",
    id: string,
    MedId: string,
    MedicationInfo?:  {
      __typename: "MedicationInfo",
      id: string,
      medname: string,
      dosage: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    Verification: boolean,
    Date: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteMedCompliantMutationVariables = {
  input: DeleteMedCompliantInput,
  condition?: ModelMedCompliantConditionInput | null,
};

export type DeleteMedCompliantMutation = {
  deleteMedCompliant?:  {
    __typename: "MedCompliant",
    id: string,
    MedId: string,
    MedicationInfo?:  {
      __typename: "MedicationInfo",
      id: string,
      medname: string,
      dosage: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    Verification: boolean,
    Date: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    ActId: string,
    ActivityInfo?:  {
      __typename: "ActivityInfo",
      id: string,
      Actname: string,
      Location: string,
      Frequency: number,
      Days: Array< string >,
      time: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    Name: string,
    Severity: string,
    DateTime: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    ActId: string,
    ActivityInfo?:  {
      __typename: "ActivityInfo",
      id: string,
      Actname: string,
      Location: string,
      Frequency: number,
      Days: Array< string >,
      time: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    Name: string,
    Severity: string,
    DateTime: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    ActId: string,
    ActivityInfo?:  {
      __typename: "ActivityInfo",
      id: string,
      Actname: string,
      Location: string,
      Frequency: number,
      Days: Array< string >,
      time: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    Name: string,
    Severity: string,
    DateTime: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    Temperature?: string | null,
    Humidity?: string | null,
    Weight: string,
    BPSys: string,
    BPDi: string,
    NoSteps: string,
    OxySat: string,
    DateTime: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    Temperature?: string | null,
    Humidity?: string | null,
    Weight: string,
    BPSys: string,
    BPDi: string,
    NoSteps: string,
    OxySat: string,
    DateTime: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    Temperature?: string | null,
    Humidity?: string | null,
    Weight: string,
    BPSys: string,
    BPDi: string,
    NoSteps: string,
    OxySat: string,
    DateTime: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateClinicianInfoMutationVariables = {
  input: CreateClinicianInfoInput,
  condition?: ModelClinicianInfoConditionInput | null,
};

export type CreateClinicianInfoMutation = {
  createClinicianInfo?:  {
    __typename: "ClinicianInfo",
    id: string,
    name: string,
    hospitalName: string,
    role: string,
    clinicianID: string,
    protectedInfo?:  {
      __typename: "ClinicianProtectedInfo",
      id: string,
      facts: string,
      APS: string,
      DTA: string,
      UXSA: string,
      NWA: string,
      ALA: string,
      MHA: string,
      clinicianID: string,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    owner: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateClinicianInfoMutationVariables = {
  input: UpdateClinicianInfoInput,
  condition?: ModelClinicianInfoConditionInput | null,
};

export type UpdateClinicianInfoMutation = {
  updateClinicianInfo?:  {
    __typename: "ClinicianInfo",
    id: string,
    name: string,
    hospitalName: string,
    role: string,
    clinicianID: string,
    protectedInfo?:  {
      __typename: "ClinicianProtectedInfo",
      id: string,
      facts: string,
      APS: string,
      DTA: string,
      UXSA: string,
      NWA: string,
      ALA: string,
      MHA: string,
      clinicianID: string,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    owner: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteClinicianInfoMutationVariables = {
  input: DeleteClinicianInfoInput,
  condition?: ModelClinicianInfoConditionInput | null,
};

export type DeleteClinicianInfoMutation = {
  deleteClinicianInfo?:  {
    __typename: "ClinicianInfo",
    id: string,
    name: string,
    hospitalName: string,
    role: string,
    clinicianID: string,
    protectedInfo?:  {
      __typename: "ClinicianProtectedInfo",
      id: string,
      facts: string,
      APS: string,
      DTA: string,
      UXSA: string,
      NWA: string,
      ALA: string,
      MHA: string,
      clinicianID: string,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    owner: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateClinicianProtectedInfoMutationVariables = {
  input: CreateClinicianProtectedInfoInput,
  condition?: ModelClinicianProtectedInfoConditionInput | null,
};

export type CreateClinicianProtectedInfoMutation = {
  createClinicianProtectedInfo?:  {
    __typename: "ClinicianProtectedInfo",
    id: string,
    facts: string,
    APS: string,
    DTA: string,
    UXSA: string,
    NWA: string,
    ALA: string,
    MHA: string,
    clinicianID: string,
    owner: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
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
    id: string,
    facts: string,
    APS: string,
    DTA: string,
    UXSA: string,
    NWA: string,
    ALA: string,
    MHA: string,
    clinicianID: string,
    owner: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
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
    id: string,
    facts: string,
    APS: string,
    DTA: string,
    UXSA: string,
    NWA: string,
    ALA: string,
    MHA: string,
    clinicianID: string,
    owner: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
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
    id: string,
    clinicianID: string,
    patientID: string,
    clinicianInfo:  {
      __typename: "ClinicianInfo",
      id: string,
      name: string,
      hospitalName: string,
      role: string,
      clinicianID: string,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    },
    owner: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateClinicianPatientMapMutationVariables = {
  input: UpdateClinicianPatientMapInput,
  condition?: ModelClinicianPatientMapConditionInput | null,
};

export type UpdateClinicianPatientMapMutation = {
  updateClinicianPatientMap?:  {
    __typename: "ClinicianPatientMap",
    id: string,
    clinicianID: string,
    patientID: string,
    clinicianInfo:  {
      __typename: "ClinicianInfo",
      id: string,
      name: string,
      hospitalName: string,
      role: string,
      clinicianID: string,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    },
    owner: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteClinicianPatientMapMutationVariables = {
  input: DeleteClinicianPatientMapInput,
  condition?: ModelClinicianPatientMapConditionInput | null,
};

export type DeleteClinicianPatientMapMutation = {
  deleteClinicianPatientMap?:  {
    __typename: "ClinicianPatientMap",
    id: string,
    clinicianID: string,
    patientID: string,
    clinicianInfo:  {
      __typename: "ClinicianInfo",
      id: string,
      name: string,
      hospitalName: string,
      role: string,
      clinicianID: string,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    },
    owner: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePatientAssignmentMutationVariables = {
  input: CreatePatientAssignmentInput,
  condition?: ModelPatientAssignmentConditionInput | null,
};

export type CreatePatientAssignmentMutation = {
  createPatientAssignment?:  {
    __typename: "PatientAssignment",
    id: string,
    patientID: string,
    clinicianID: string,
    pending?: string | null,
    resolution?: string | null,
    patientName: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdatePatientAssignmentMutationVariables = {
  input: UpdatePatientAssignmentInput,
  condition?: ModelPatientAssignmentConditionInput | null,
};

export type UpdatePatientAssignmentMutation = {
  updatePatientAssignment?:  {
    __typename: "PatientAssignment",
    id: string,
    patientID: string,
    clinicianID: string,
    pending?: string | null,
    resolution?: string | null,
    patientName: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeletePatientAssignmentMutationVariables = {
  input: DeletePatientAssignmentInput,
  condition?: ModelPatientAssignmentConditionInput | null,
};

export type DeletePatientAssignmentMutation = {
  deletePatientAssignment?:  {
    __typename: "PatientAssignment",
    id: string,
    patientID: string,
    clinicianID: string,
    pending?: string | null,
    resolution?: string | null,
    patientName: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    vitalsReportID: string,
    vitalsReport?:  {
      __typename: "ReportVitals",
      id: string,
      Temperature?: string | null,
      Humidity?: string | null,
      Weight: string,
      BPSys: string,
      BPDi: string,
      NoSteps: string,
      OxySat: string,
      DateTime: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    symptomReportID: string,
    symptomReport?:  {
      __typename: "ReportSymptom",
      id: string,
      ActId: string,
      Name: string,
      Severity: string,
      DateTime: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    pending?: string | null,
    completed?: string | null,
    owner: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
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
    vitalsReportID: string,
    vitalsReport?:  {
      __typename: "ReportVitals",
      id: string,
      Temperature?: string | null,
      Humidity?: string | null,
      Weight: string,
      BPSys: string,
      BPDi: string,
      NoSteps: string,
      OxySat: string,
      DateTime: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    symptomReportID: string,
    symptomReport?:  {
      __typename: "ReportSymptom",
      id: string,
      ActId: string,
      Name: string,
      Severity: string,
      DateTime: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    pending?: string | null,
    completed?: string | null,
    owner: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
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
    vitalsReportID: string,
    vitalsReport?:  {
      __typename: "ReportVitals",
      id: string,
      Temperature?: string | null,
      Humidity?: string | null,
      Weight: string,
      BPSys: string,
      BPDi: string,
      NoSteps: string,
      OxySat: string,
      DateTime: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    symptomReportID: string,
    symptomReport?:  {
      __typename: "ReportSymptom",
      id: string,
      ActId: string,
      Name: string,
      Severity: string,
      DateTime: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    pending?: string | null,
    completed?: string | null,
    owner: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
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
    alert?:  {
      __typename: "Alert",
      id: string,
      patientID: string,
      patientName: string,
      dateTime: string,
      summary: string,
      colorCode: string,
      vitalsReportID: string,
      symptomReportID: string,
      pending?: string | null,
      completed?: string | null,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    completed: boolean,
    owner: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
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
    alert?:  {
      __typename: "Alert",
      id: string,
      patientID: string,
      patientName: string,
      dateTime: string,
      summary: string,
      colorCode: string,
      vitalsReportID: string,
      symptomReportID: string,
      pending?: string | null,
      completed?: string | null,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    completed: boolean,
    owner: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
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
    alert?:  {
      __typename: "Alert",
      id: string,
      patientID: string,
      patientName: string,
      dateTime: string,
      summary: string,
      colorCode: string,
      vitalsReportID: string,
      symptomReportID: string,
      pending?: string | null,
      completed?: string | null,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    completed: boolean,
    owner: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type SyncPatientInfosQueryVariables = {
  filter?: ModelPatientInfoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncPatientInfosQuery = {
  syncPatientInfos?:  {
    __typename: "ModelPatientInfoConnection",
    items?:  Array< {
      __typename: "PatientInfo",
      id: string,
      name: string,
      address: string,
      deviceNo: string,
      diagnosisInfo: string,
      NHYAclass: string,
      cardiologist: string,
      hospitalName: string,
      hospitalLocation: string,
      targetWeight: string,
      targetActivity: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetPatientInfoQueryVariables = {
  patientID: string,
};

export type GetPatientInfoQuery = {
  getPatientInfo?:  {
    __typename: "PatientInfo",
    id: string,
    name: string,
    address: string,
    deviceNo: string,
    diagnosisInfo: string,
    NHYAclass: string,
    cardiologist: string,
    hospitalName: string,
    hospitalLocation: string,
    targetWeight: string,
    targetActivity: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
      id: string,
      name: string,
      address: string,
      deviceNo: string,
      diagnosisInfo: string,
      NHYAclass: string,
      cardiologist: string,
      hospitalName: string,
      hospitalLocation: string,
      targetWeight: string,
      targetActivity: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncMedicationInfosQueryVariables = {
  filter?: ModelMedicationInfoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncMedicationInfosQuery = {
  syncMedicationInfos?:  {
    __typename: "ModelMedicationInfoConnection",
    items?:  Array< {
      __typename: "MedicationInfo",
      id: string,
      medname: string,
      dosage: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetMedicationInfoQueryVariables = {
  id: string,
};

export type GetMedicationInfoQuery = {
  getMedicationInfo?:  {
    __typename: "MedicationInfo",
    id: string,
    medname: string,
    dosage: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
      medname: string,
      dosage: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncActivityInfosQueryVariables = {
  filter?: ModelActivityInfoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncActivityInfosQuery = {
  syncActivityInfos?:  {
    __typename: "ModelActivityInfoConnection",
    items?:  Array< {
      __typename: "ActivityInfo",
      id: string,
      Actname: string,
      Location: string,
      Frequency: number,
      Days: Array< string >,
      time: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetActivityInfoQueryVariables = {
  id: string,
};

export type GetActivityInfoQuery = {
  getActivityInfo?:  {
    __typename: "ActivityInfo",
    id: string,
    Actname: string,
    Location: string,
    Frequency: number,
    Days: Array< string >,
    time: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
      Actname: string,
      Location: string,
      Frequency: number,
      Days: Array< string >,
      time: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncMedCompliantsQueryVariables = {
  filter?: ModelMedCompliantFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncMedCompliantsQuery = {
  syncMedCompliants?:  {
    __typename: "ModelMedCompliantConnection",
    items?:  Array< {
      __typename: "MedCompliant",
      id: string,
      MedId: string,
      Verification: boolean,
      Date: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetMedCompliantQueryVariables = {
  id: string,
};

export type GetMedCompliantQuery = {
  getMedCompliant?:  {
    __typename: "MedCompliant",
    id: string,
    MedId: string,
    MedicationInfo?:  {
      __typename: "MedicationInfo",
      id: string,
      medname: string,
      dosage: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    Verification: boolean,
    Date: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListMedCompliantsQueryVariables = {
  filter?: ModelMedCompliantFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMedCompliantsQuery = {
  listMedCompliants?:  {
    __typename: "ModelMedCompliantConnection",
    items?:  Array< {
      __typename: "MedCompliant",
      id: string,
      MedId: string,
      Verification: boolean,
      Date: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncReportSymptomsQueryVariables = {
  filter?: ModelReportSymptomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncReportSymptomsQuery = {
  syncReportSymptoms?:  {
    __typename: "ModelReportSymptomConnection",
    items?:  Array< {
      __typename: "ReportSymptom",
      id: string,
      ActId: string,
      Name: string,
      Severity: string,
      DateTime: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetReportSymptomQueryVariables = {
  id: string,
};

export type GetReportSymptomQuery = {
  getReportSymptom?:  {
    __typename: "ReportSymptom",
    id: string,
    ActId: string,
    ActivityInfo?:  {
      __typename: "ActivityInfo",
      id: string,
      Actname: string,
      Location: string,
      Frequency: number,
      Days: Array< string >,
      time: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    Name: string,
    Severity: string,
    DateTime: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
      ActId: string,
      Name: string,
      Severity: string,
      DateTime: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncReportVitalsQueryVariables = {
  filter?: ModelReportVitalsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncReportVitalsQuery = {
  syncReportVitals?:  {
    __typename: "ModelReportVitalsConnection",
    items?:  Array< {
      __typename: "ReportVitals",
      id: string,
      Temperature?: string | null,
      Humidity?: string | null,
      Weight: string,
      BPSys: string,
      BPDi: string,
      NoSteps: string,
      OxySat: string,
      DateTime: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetReportVitalsQueryVariables = {
  id: string,
};

export type GetReportVitalsQuery = {
  getReportVitals?:  {
    __typename: "ReportVitals",
    id: string,
    Temperature?: string | null,
    Humidity?: string | null,
    Weight: string,
    BPSys: string,
    BPDi: string,
    NoSteps: string,
    OxySat: string,
    DateTime: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
      Temperature?: string | null,
      Humidity?: string | null,
      Weight: string,
      BPSys: string,
      BPDi: string,
      NoSteps: string,
      OxySat: string,
      DateTime: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncClinicianInfosQueryVariables = {
  filter?: ModelClinicianInfoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncClinicianInfosQuery = {
  syncClinicianInfos?:  {
    __typename: "ModelClinicianInfoConnection",
    items?:  Array< {
      __typename: "ClinicianInfo",
      id: string,
      name: string,
      hospitalName: string,
      role: string,
      clinicianID: string,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetClinicianInfoQueryVariables = {
  clinicianID: string,
};

export type GetClinicianInfoQuery = {
  getClinicianInfo?:  {
    __typename: "ClinicianInfo",
    id: string,
    name: string,
    hospitalName: string,
    role: string,
    clinicianID: string,
    protectedInfo?:  {
      __typename: "ClinicianProtectedInfo",
      id: string,
      facts: string,
      APS: string,
      DTA: string,
      UXSA: string,
      NWA: string,
      ALA: string,
      MHA: string,
      clinicianID: string,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    owner: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
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
      id: string,
      name: string,
      hospitalName: string,
      role: string,
      clinicianID: string,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncClinicianProtectedInfosQueryVariables = {
  filter?: ModelClinicianProtectedInfoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncClinicianProtectedInfosQuery = {
  syncClinicianProtectedInfos?:  {
    __typename: "ModelClinicianProtectedInfoConnection",
    items?:  Array< {
      __typename: "ClinicianProtectedInfo",
      id: string,
      facts: string,
      APS: string,
      DTA: string,
      UXSA: string,
      NWA: string,
      ALA: string,
      MHA: string,
      clinicianID: string,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetClinicianProtectedInfoQueryVariables = {
  clinicianID: string,
};

export type GetClinicianProtectedInfoQuery = {
  getClinicianProtectedInfo?:  {
    __typename: "ClinicianProtectedInfo",
    id: string,
    facts: string,
    APS: string,
    DTA: string,
    UXSA: string,
    NWA: string,
    ALA: string,
    MHA: string,
    clinicianID: string,
    owner: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
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
      id: string,
      facts: string,
      APS: string,
      DTA: string,
      UXSA: string,
      NWA: string,
      ALA: string,
      MHA: string,
      clinicianID: string,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncClinicianPatientMapsQueryVariables = {
  filter?: ModelClinicianPatientMapFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncClinicianPatientMapsQuery = {
  syncClinicianPatientMaps?:  {
    __typename: "ModelClinicianPatientMapConnection",
    items?:  Array< {
      __typename: "ClinicianPatientMap",
      id: string,
      clinicianID: string,
      patientID: string,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetClinicianPatientMapQueryVariables = {
  clinicianID: string,
  patientID: string,
};

export type GetClinicianPatientMapQuery = {
  getClinicianPatientMap?:  {
    __typename: "ClinicianPatientMap",
    id: string,
    clinicianID: string,
    patientID: string,
    clinicianInfo:  {
      __typename: "ClinicianInfo",
      id: string,
      name: string,
      hospitalName: string,
      role: string,
      clinicianID: string,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    },
    owner: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
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
      id: string,
      clinicianID: string,
      patientID: string,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncPatientAssignmentsQueryVariables = {
  filter?: ModelPatientAssignmentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncPatientAssignmentsQuery = {
  syncPatientAssignments?:  {
    __typename: "ModelPatientAssignmentConnection",
    items?:  Array< {
      __typename: "PatientAssignment",
      id: string,
      patientID: string,
      clinicianID: string,
      pending?: string | null,
      resolution?: string | null,
      patientName: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetPatientAssignmentQueryVariables = {
  patientID: string,
  clinicianID: string,
};

export type GetPatientAssignmentQuery = {
  getPatientAssignment?:  {
    __typename: "PatientAssignment",
    id: string,
    patientID: string,
    clinicianID: string,
    pending?: string | null,
    resolution?: string | null,
    patientName: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
      id: string,
      patientID: string,
      clinicianID: string,
      pending?: string | null,
      resolution?: string | null,
      patientName: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncAlertsQueryVariables = {
  filter?: ModelAlertFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncAlertsQuery = {
  syncAlerts?:  {
    __typename: "ModelAlertConnection",
    items?:  Array< {
      __typename: "Alert",
      id: string,
      patientID: string,
      patientName: string,
      dateTime: string,
      summary: string,
      colorCode: string,
      vitalsReportID: string,
      symptomReportID: string,
      pending?: string | null,
      completed?: string | null,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
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
    vitalsReportID: string,
    vitalsReport?:  {
      __typename: "ReportVitals",
      id: string,
      Temperature?: string | null,
      Humidity?: string | null,
      Weight: string,
      BPSys: string,
      BPDi: string,
      NoSteps: string,
      OxySat: string,
      DateTime: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    symptomReportID: string,
    symptomReport?:  {
      __typename: "ReportSymptom",
      id: string,
      ActId: string,
      Name: string,
      Severity: string,
      DateTime: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    pending?: string | null,
    completed?: string | null,
    owner: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
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
      vitalsReportID: string,
      symptomReportID: string,
      pending?: string | null,
      completed?: string | null,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncTodosQueryVariables = {
  filter?: ModelTodoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncTodosQuery = {
  syncTodos?:  {
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
      completed: boolean,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
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
    alert?:  {
      __typename: "Alert",
      id: string,
      patientID: string,
      patientName: string,
      dateTime: string,
      summary: string,
      colorCode: string,
      vitalsReportID: string,
      symptomReportID: string,
      pending?: string | null,
      completed?: string | null,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    completed: boolean,
    owner: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
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
      completed: boolean,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
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
      medname: string,
      dosage: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
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
      Actname: string,
      Location: string,
      Frequency: number,
      Days: Array< string >,
      time: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type ListMedCompliantsByPatientIDQueryVariables = {
  patientID?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelMedCompliantFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMedCompliantsByPatientIDQuery = {
  listMedCompliantsByPatientID?:  {
    __typename: "ModelMedCompliantConnection",
    items?:  Array< {
      __typename: "MedCompliant",
      id: string,
      MedId: string,
      Verification: boolean,
      Date: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type ListMedCompliantsByDateQueryVariables = {
  patientID?: string | null,
  Date?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelMedCompliantFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMedCompliantsByDateQuery = {
  listMedCompliantsByDate?:  {
    __typename: "ModelMedCompliantConnection",
    items?:  Array< {
      __typename: "MedCompliant",
      id: string,
      MedId: string,
      Verification: boolean,
      Date: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
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
      ActId: string,
      Name: string,
      Severity: string,
      DateTime: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type ListReportSymptomsByDateTimeQueryVariables = {
  patientID?: string | null,
  DateTime?: ModelStringKeyConditionInput | null,
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
      ActId: string,
      Name: string,
      Severity: string,
      DateTime: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
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
      Temperature?: string | null,
      Humidity?: string | null,
      Weight: string,
      BPSys: string,
      BPDi: string,
      NoSteps: string,
      OxySat: string,
      DateTime: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type ListReportVitalsByDateTimeQueryVariables = {
  patientID?: string | null,
  DateTime?: ModelStringKeyConditionInput | null,
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
      Temperature?: string | null,
      Humidity?: string | null,
      Weight: string,
      BPSys: string,
      BPDi: string,
      NoSteps: string,
      OxySat: string,
      DateTime: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
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
      id: string,
      clinicianID: string,
      patientID: string,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
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
      id: string,
      patientID: string,
      clinicianID: string,
      pending?: string | null,
      resolution?: string | null,
      patientName: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
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
      vitalsReportID: string,
      symptomReportID: string,
      pending?: string | null,
      completed?: string | null,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
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
      vitalsReportID: string,
      symptomReportID: string,
      pending?: string | null,
      completed?: string | null,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
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
      vitalsReportID: string,
      symptomReportID: string,
      pending?: string | null,
      completed?: string | null,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
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
      vitalsReportID: string,
      symptomReportID: string,
      pending?: string | null,
      completed?: string | null,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type ListTodosByClinicianIDQueryVariables = {
  clinicianID?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTodoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTodosByClinicianIDQuery = {
  listTodosByClinicianID?:  {
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
      completed: boolean,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type ListTodosByLastModifiedDateQueryVariables = {
  clinicianID?: string | null,
  lastModified?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTodoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTodosByLastModifiedDateQuery = {
  listTodosByLastModifiedDate?:  {
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
      completed: boolean,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreatePatientInfoSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreatePatientInfoSubscription = {
  onCreatePatientInfo?:  {
    __typename: "PatientInfo",
    id: string,
    name: string,
    address: string,
    deviceNo: string,
    diagnosisInfo: string,
    NHYAclass: string,
    cardiologist: string,
    hospitalName: string,
    hospitalLocation: string,
    targetWeight: string,
    targetActivity: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdatePatientInfoSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdatePatientInfoSubscription = {
  onUpdatePatientInfo?:  {
    __typename: "PatientInfo",
    id: string,
    name: string,
    address: string,
    deviceNo: string,
    diagnosisInfo: string,
    NHYAclass: string,
    cardiologist: string,
    hospitalName: string,
    hospitalLocation: string,
    targetWeight: string,
    targetActivity: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeletePatientInfoSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeletePatientInfoSubscription = {
  onDeletePatientInfo?:  {
    __typename: "PatientInfo",
    id: string,
    name: string,
    address: string,
    deviceNo: string,
    diagnosisInfo: string,
    NHYAclass: string,
    cardiologist: string,
    hospitalName: string,
    hospitalLocation: string,
    targetWeight: string,
    targetActivity: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateMedicationInfoSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateMedicationInfoSubscription = {
  onCreateMedicationInfo?:  {
    __typename: "MedicationInfo",
    id: string,
    medname: string,
    dosage: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateMedicationInfoSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateMedicationInfoSubscription = {
  onUpdateMedicationInfo?:  {
    __typename: "MedicationInfo",
    id: string,
    medname: string,
    dosage: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteMedicationInfoSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteMedicationInfoSubscription = {
  onDeleteMedicationInfo?:  {
    __typename: "MedicationInfo",
    id: string,
    medname: string,
    dosage: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateActivityInfoSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateActivityInfoSubscription = {
  onCreateActivityInfo?:  {
    __typename: "ActivityInfo",
    id: string,
    Actname: string,
    Location: string,
    Frequency: number,
    Days: Array< string >,
    time: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateActivityInfoSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateActivityInfoSubscription = {
  onUpdateActivityInfo?:  {
    __typename: "ActivityInfo",
    id: string,
    Actname: string,
    Location: string,
    Frequency: number,
    Days: Array< string >,
    time: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteActivityInfoSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteActivityInfoSubscription = {
  onDeleteActivityInfo?:  {
    __typename: "ActivityInfo",
    id: string,
    Actname: string,
    Location: string,
    Frequency: number,
    Days: Array< string >,
    time: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateMedCompliantSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateMedCompliantSubscription = {
  onCreateMedCompliant?:  {
    __typename: "MedCompliant",
    id: string,
    MedId: string,
    MedicationInfo?:  {
      __typename: "MedicationInfo",
      id: string,
      medname: string,
      dosage: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    Verification: boolean,
    Date: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateMedCompliantSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateMedCompliantSubscription = {
  onUpdateMedCompliant?:  {
    __typename: "MedCompliant",
    id: string,
    MedId: string,
    MedicationInfo?:  {
      __typename: "MedicationInfo",
      id: string,
      medname: string,
      dosage: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    Verification: boolean,
    Date: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteMedCompliantSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteMedCompliantSubscription = {
  onDeleteMedCompliant?:  {
    __typename: "MedCompliant",
    id: string,
    MedId: string,
    MedicationInfo?:  {
      __typename: "MedicationInfo",
      id: string,
      medname: string,
      dosage: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    Verification: boolean,
    Date: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateReportSymptomSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateReportSymptomSubscription = {
  onCreateReportSymptom?:  {
    __typename: "ReportSymptom",
    id: string,
    ActId: string,
    ActivityInfo?:  {
      __typename: "ActivityInfo",
      id: string,
      Actname: string,
      Location: string,
      Frequency: number,
      Days: Array< string >,
      time: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    Name: string,
    Severity: string,
    DateTime: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateReportSymptomSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateReportSymptomSubscription = {
  onUpdateReportSymptom?:  {
    __typename: "ReportSymptom",
    id: string,
    ActId: string,
    ActivityInfo?:  {
      __typename: "ActivityInfo",
      id: string,
      Actname: string,
      Location: string,
      Frequency: number,
      Days: Array< string >,
      time: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    Name: string,
    Severity: string,
    DateTime: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteReportSymptomSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteReportSymptomSubscription = {
  onDeleteReportSymptom?:  {
    __typename: "ReportSymptom",
    id: string,
    ActId: string,
    ActivityInfo?:  {
      __typename: "ActivityInfo",
      id: string,
      Actname: string,
      Location: string,
      Frequency: number,
      Days: Array< string >,
      time: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    Name: string,
    Severity: string,
    DateTime: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateReportVitalsSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateReportVitalsSubscription = {
  onCreateReportVitals?:  {
    __typename: "ReportVitals",
    id: string,
    Temperature?: string | null,
    Humidity?: string | null,
    Weight: string,
    BPSys: string,
    BPDi: string,
    NoSteps: string,
    OxySat: string,
    DateTime: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateReportVitalsSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateReportVitalsSubscription = {
  onUpdateReportVitals?:  {
    __typename: "ReportVitals",
    id: string,
    Temperature?: string | null,
    Humidity?: string | null,
    Weight: string,
    BPSys: string,
    BPDi: string,
    NoSteps: string,
    OxySat: string,
    DateTime: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteReportVitalsSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteReportVitalsSubscription = {
  onDeleteReportVitals?:  {
    __typename: "ReportVitals",
    id: string,
    Temperature?: string | null,
    Humidity?: string | null,
    Weight: string,
    BPSys: string,
    BPDi: string,
    NoSteps: string,
    OxySat: string,
    DateTime: string,
    patientID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateClinicianInfoSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateClinicianInfoSubscription = {
  onCreateClinicianInfo?:  {
    __typename: "ClinicianInfo",
    id: string,
    name: string,
    hospitalName: string,
    role: string,
    clinicianID: string,
    protectedInfo?:  {
      __typename: "ClinicianProtectedInfo",
      id: string,
      facts: string,
      APS: string,
      DTA: string,
      UXSA: string,
      NWA: string,
      ALA: string,
      MHA: string,
      clinicianID: string,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    owner: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateClinicianInfoSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateClinicianInfoSubscription = {
  onUpdateClinicianInfo?:  {
    __typename: "ClinicianInfo",
    id: string,
    name: string,
    hospitalName: string,
    role: string,
    clinicianID: string,
    protectedInfo?:  {
      __typename: "ClinicianProtectedInfo",
      id: string,
      facts: string,
      APS: string,
      DTA: string,
      UXSA: string,
      NWA: string,
      ALA: string,
      MHA: string,
      clinicianID: string,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    owner: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteClinicianInfoSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteClinicianInfoSubscription = {
  onDeleteClinicianInfo?:  {
    __typename: "ClinicianInfo",
    id: string,
    name: string,
    hospitalName: string,
    role: string,
    clinicianID: string,
    protectedInfo?:  {
      __typename: "ClinicianProtectedInfo",
      id: string,
      facts: string,
      APS: string,
      DTA: string,
      UXSA: string,
      NWA: string,
      ALA: string,
      MHA: string,
      clinicianID: string,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    owner: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateClinicianProtectedInfoSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateClinicianProtectedInfoSubscription = {
  onCreateClinicianProtectedInfo?:  {
    __typename: "ClinicianProtectedInfo",
    id: string,
    facts: string,
    APS: string,
    DTA: string,
    UXSA: string,
    NWA: string,
    ALA: string,
    MHA: string,
    clinicianID: string,
    owner: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateClinicianProtectedInfoSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateClinicianProtectedInfoSubscription = {
  onUpdateClinicianProtectedInfo?:  {
    __typename: "ClinicianProtectedInfo",
    id: string,
    facts: string,
    APS: string,
    DTA: string,
    UXSA: string,
    NWA: string,
    ALA: string,
    MHA: string,
    clinicianID: string,
    owner: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteClinicianProtectedInfoSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteClinicianProtectedInfoSubscription = {
  onDeleteClinicianProtectedInfo?:  {
    __typename: "ClinicianProtectedInfo",
    id: string,
    facts: string,
    APS: string,
    DTA: string,
    UXSA: string,
    NWA: string,
    ALA: string,
    MHA: string,
    clinicianID: string,
    owner: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateClinicianPatientMapSubscriptionVariables = {
  owner?: string | null,
  patientID?: string | null,
};

export type OnCreateClinicianPatientMapSubscription = {
  onCreateClinicianPatientMap?:  {
    __typename: "ClinicianPatientMap",
    id: string,
    clinicianID: string,
    patientID: string,
    clinicianInfo:  {
      __typename: "ClinicianInfo",
      id: string,
      name: string,
      hospitalName: string,
      role: string,
      clinicianID: string,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    },
    owner: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateClinicianPatientMapSubscriptionVariables = {
  owner?: string | null,
  patientID?: string | null,
};

export type OnUpdateClinicianPatientMapSubscription = {
  onUpdateClinicianPatientMap?:  {
    __typename: "ClinicianPatientMap",
    id: string,
    clinicianID: string,
    patientID: string,
    clinicianInfo:  {
      __typename: "ClinicianInfo",
      id: string,
      name: string,
      hospitalName: string,
      role: string,
      clinicianID: string,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    },
    owner: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteClinicianPatientMapSubscriptionVariables = {
  owner?: string | null,
  patientID?: string | null,
};

export type OnDeleteClinicianPatientMapSubscription = {
  onDeleteClinicianPatientMap?:  {
    __typename: "ClinicianPatientMap",
    id: string,
    clinicianID: string,
    patientID: string,
    clinicianInfo:  {
      __typename: "ClinicianInfo",
      id: string,
      name: string,
      hospitalName: string,
      role: string,
      clinicianID: string,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    },
    owner: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePatientAssignmentSubscriptionVariables = {
  owner?: string | null,
  clinicianID?: string | null,
};

export type OnCreatePatientAssignmentSubscription = {
  onCreatePatientAssignment?:  {
    __typename: "PatientAssignment",
    id: string,
    patientID: string,
    clinicianID: string,
    pending?: string | null,
    resolution?: string | null,
    patientName: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdatePatientAssignmentSubscriptionVariables = {
  owner?: string | null,
  clinicianID?: string | null,
};

export type OnUpdatePatientAssignmentSubscription = {
  onUpdatePatientAssignment?:  {
    __typename: "PatientAssignment",
    id: string,
    patientID: string,
    clinicianID: string,
    pending?: string | null,
    resolution?: string | null,
    patientName: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeletePatientAssignmentSubscriptionVariables = {
  owner?: string | null,
  clinicianID?: string | null,
};

export type OnDeletePatientAssignmentSubscription = {
  onDeletePatientAssignment?:  {
    __typename: "PatientAssignment",
    id: string,
    patientID: string,
    clinicianID: string,
    pending?: string | null,
    resolution?: string | null,
    patientName: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateAlertSubscriptionVariables = {
  owner?: string | null,
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
    vitalsReportID: string,
    vitalsReport?:  {
      __typename: "ReportVitals",
      id: string,
      Temperature?: string | null,
      Humidity?: string | null,
      Weight: string,
      BPSys: string,
      BPDi: string,
      NoSteps: string,
      OxySat: string,
      DateTime: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    symptomReportID: string,
    symptomReport?:  {
      __typename: "ReportSymptom",
      id: string,
      ActId: string,
      Name: string,
      Severity: string,
      DateTime: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    pending?: string | null,
    completed?: string | null,
    owner: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAlertSubscriptionVariables = {
  owner?: string | null,
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
    vitalsReportID: string,
    vitalsReport?:  {
      __typename: "ReportVitals",
      id: string,
      Temperature?: string | null,
      Humidity?: string | null,
      Weight: string,
      BPSys: string,
      BPDi: string,
      NoSteps: string,
      OxySat: string,
      DateTime: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    symptomReportID: string,
    symptomReport?:  {
      __typename: "ReportSymptom",
      id: string,
      ActId: string,
      Name: string,
      Severity: string,
      DateTime: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    pending?: string | null,
    completed?: string | null,
    owner: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAlertSubscriptionVariables = {
  owner?: string | null,
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
    vitalsReportID: string,
    vitalsReport?:  {
      __typename: "ReportVitals",
      id: string,
      Temperature?: string | null,
      Humidity?: string | null,
      Weight: string,
      BPSys: string,
      BPDi: string,
      NoSteps: string,
      OxySat: string,
      DateTime: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    symptomReportID: string,
    symptomReport?:  {
      __typename: "ReportSymptom",
      id: string,
      ActId: string,
      Name: string,
      Severity: string,
      DateTime: string,
      patientID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    pending?: string | null,
    completed?: string | null,
    owner: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTodoSubscriptionVariables = {
  owner?: string | null,
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
    alert?:  {
      __typename: "Alert",
      id: string,
      patientID: string,
      patientName: string,
      dateTime: string,
      summary: string,
      colorCode: string,
      vitalsReportID: string,
      symptomReportID: string,
      pending?: string | null,
      completed?: string | null,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    completed: boolean,
    owner: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTodoSubscriptionVariables = {
  owner?: string | null,
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
    alert?:  {
      __typename: "Alert",
      id: string,
      patientID: string,
      patientName: string,
      dateTime: string,
      summary: string,
      colorCode: string,
      vitalsReportID: string,
      symptomReportID: string,
      pending?: string | null,
      completed?: string | null,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    completed: boolean,
    owner: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTodoSubscriptionVariables = {
  owner?: string | null,
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
    alert?:  {
      __typename: "Alert",
      id: string,
      patientID: string,
      patientName: string,
      dateTime: string,
      summary: string,
      colorCode: string,
      vitalsReportID: string,
      symptomReportID: string,
      pending?: string | null,
      completed?: string | null,
      owner: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    completed: boolean,
    owner: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};
