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
  patientID?: ModelStringInput | null,
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
  id: string,
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
  patientID?: string | null,
  _version?: number | null,
};

export type DeletePatientInfoInput = {
  id: string,
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
  patientID?: ModelStringInput | null,
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
  MedId?: ModelStringInput | null,
  Verification?: ModelBooleanInput | null,
  Date?: ModelStringInput | null,
  patientID?: ModelStringInput | null,
  and?: Array< ModelMedCompliantConditionInput | null > | null,
  or?: Array< ModelMedCompliantConditionInput | null > | null,
  not?: ModelMedCompliantConditionInput | null,
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
  ActId?: ModelStringInput | null,
  Name?: ModelStringInput | null,
  Severity?: ModelStringInput | null,
  DateTime?: ModelStringInput | null,
  patientID?: ModelStringInput | null,
  and?: Array< ModelReportSymptomConditionInput | null > | null,
  or?: Array< ModelReportSymptomConditionInput | null > | null,
  not?: ModelReportSymptomConditionInput | null,
};

export type ReportSymptom = {
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
  SymptomId: string,
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
  SymptomId?: ModelStringInput | null,
  Temperature?: ModelStringInput | null,
  Humidity?: ModelStringInput | null,
  Weight?: ModelStringInput | null,
  BPSys?: ModelStringInput | null,
  BPDi?: ModelStringInput | null,
  NoSteps?: ModelStringInput | null,
  OxySat?: ModelStringInput | null,
  DateTime?: ModelStringInput | null,
  patientID?: ModelStringInput | null,
  and?: Array< ModelReportVitalsConditionInput | null > | null,
  or?: Array< ModelReportVitalsConditionInput | null > | null,
  not?: ModelReportVitalsConditionInput | null,
};

export type ReportVitals = {
  __typename: "ReportVitals",
  id: string,
  SymptomId: string,
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
  SymptomId?: string | null,
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
  clinicianID: string,
  role: string,
  facts: string,
  APS: string,
  DTA: string,
  UXSA: string,
  _version?: number | null,
};

export type ModelClinicianInfoConditionInput = {
  name?: ModelStringInput | null,
  hospitalName?: ModelStringInput | null,
  clinicianID?: ModelStringInput | null,
  role?: ModelStringInput | null,
  facts?: ModelStringInput | null,
  APS?: ModelStringInput | null,
  DTA?: ModelStringInput | null,
  UXSA?: ModelStringInput | null,
  and?: Array< ModelClinicianInfoConditionInput | null > | null,
  or?: Array< ModelClinicianInfoConditionInput | null > | null,
  not?: ModelClinicianInfoConditionInput | null,
};

export type ClinicianInfo = {
  __typename: "ClinicianInfo",
  id: string,
  name: string,
  hospitalName: string,
  clinicianID: string,
  role: string,
  facts: string,
  APS: string,
  DTA: string,
  UXSA: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateClinicianInfoInput = {
  id: string,
  name?: string | null,
  hospitalName?: string | null,
  clinicianID?: string | null,
  role?: string | null,
  facts?: string | null,
  APS?: string | null,
  DTA?: string | null,
  UXSA?: string | null,
  _version?: number | null,
};

export type DeleteClinicianInfoInput = {
  id: string,
  _version?: number | null,
};

export type CreateClinicianPatientMapInput = {
  id?: string | null,
  clinicianID: string,
  patientID: string,
  createdAt?: string | null,
  _version?: number | null,
};

export type ModelClinicianPatientMapConditionInput = {
  createdAt?: ModelStringInput | null,
  and?: Array< ModelClinicianPatientMapConditionInput | null > | null,
  or?: Array< ModelClinicianPatientMapConditionInput | null > | null,
  not?: ModelClinicianPatientMapConditionInput | null,
};

export type ClinicianPatientMap = {
  __typename: "ClinicianPatientMap",
  id: string,
  clinicianID: string,
  patientID: string,
  createdAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateClinicianPatientMapInput = {
  id?: string | null,
  clinicianID: string,
  patientID: string,
  createdAt?: string | null,
  _version?: number | null,
};

export type DeleteClinicianPatientMapInput = {
  clinicianID: string,
  patientID: string,
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

export type ModelPatientInfoConnection = {
  __typename: "ModelPatientInfoConnection",
  items?:  Array<PatientInfo | null > | null,
  nextToken?: string | null,
  startedAt?: number | null,
};

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
  MedId?: ModelStringInput | null,
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
  ActId?: ModelStringInput | null,
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
  SymptomId?: ModelStringInput | null,
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
  clinicianID?: ModelStringInput | null,
  role?: ModelStringInput | null,
  facts?: ModelStringInput | null,
  APS?: ModelStringInput | null,
  DTA?: ModelStringInput | null,
  UXSA?: ModelStringInput | null,
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

export type ModelClinicianPatientMapFilterInput = {
  id?: ModelIDInput | null,
  clinicianID?: ModelStringInput | null,
  patientID?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
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

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


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
    SymptomId: string,
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
    SymptomId: string,
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
    SymptomId: string,
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
    clinicianID: string,
    role: string,
    facts: string,
    APS: string,
    DTA: string,
    UXSA: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    clinicianID: string,
    role: string,
    facts: string,
    APS: string,
    DTA: string,
    UXSA: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    clinicianID: string,
    role: string,
    facts: string,
    APS: string,
    DTA: string,
    UXSA: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    createdAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    updatedAt: string,
    owner?: string | null,
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
    createdAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    updatedAt: string,
    owner?: string | null,
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
    createdAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    updatedAt: string,
    owner?: string | null,
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
  id: string,
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
  filter?: ModelPatientInfoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
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
      SymptomId: string,
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
    SymptomId: string,
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
      SymptomId: string,
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
      clinicianID: string,
      role: string,
      facts: string,
      APS: string,
      DTA: string,
      UXSA: string,
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

export type GetClinicianInfoQueryVariables = {
  id: string,
};

export type GetClinicianInfoQuery = {
  getClinicianInfo?:  {
    __typename: "ClinicianInfo",
    id: string,
    name: string,
    hospitalName: string,
    clinicianID: string,
    role: string,
    facts: string,
    APS: string,
    DTA: string,
    UXSA: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListClinicianInfosQueryVariables = {
  filter?: ModelClinicianInfoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListClinicianInfosQuery = {
  listClinicianInfos?:  {
    __typename: "ModelClinicianInfoConnection",
    items?:  Array< {
      __typename: "ClinicianInfo",
      id: string,
      name: string,
      hospitalName: string,
      clinicianID: string,
      role: string,
      facts: string,
      APS: string,
      DTA: string,
      UXSA: string,
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
      createdAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      updatedAt: string,
      owner?: string | null,
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
    createdAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    updatedAt: string,
    owner?: string | null,
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
      createdAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      updatedAt: string,
      owner?: string | null,
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
    SymptomId: string,
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
    SymptomId: string,
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
    SymptomId: string,
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
  owner: string,
};

export type OnCreateClinicianInfoSubscription = {
  onCreateClinicianInfo?:  {
    __typename: "ClinicianInfo",
    id: string,
    name: string,
    hospitalName: string,
    clinicianID: string,
    role: string,
    facts: string,
    APS: string,
    DTA: string,
    UXSA: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateClinicianInfoSubscriptionVariables = {
  owner: string,
};

export type OnUpdateClinicianInfoSubscription = {
  onUpdateClinicianInfo?:  {
    __typename: "ClinicianInfo",
    id: string,
    name: string,
    hospitalName: string,
    clinicianID: string,
    role: string,
    facts: string,
    APS: string,
    DTA: string,
    UXSA: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteClinicianInfoSubscriptionVariables = {
  owner: string,
};

export type OnDeleteClinicianInfoSubscription = {
  onDeleteClinicianInfo?:  {
    __typename: "ClinicianInfo",
    id: string,
    name: string,
    hospitalName: string,
    clinicianID: string,
    role: string,
    facts: string,
    APS: string,
    DTA: string,
    UXSA: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateClinicianPatientMapSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateClinicianPatientMapSubscription = {
  onCreateClinicianPatientMap?:  {
    __typename: "ClinicianPatientMap",
    id: string,
    clinicianID: string,
    patientID: string,
    createdAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateClinicianPatientMapSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateClinicianPatientMapSubscription = {
  onUpdateClinicianPatientMap?:  {
    __typename: "ClinicianPatientMap",
    id: string,
    clinicianID: string,
    patientID: string,
    createdAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteClinicianPatientMapSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteClinicianPatientMapSubscription = {
  onDeleteClinicianPatientMap?:  {
    __typename: "ClinicianPatientMap",
    id: string,
    clinicianID: string,
    patientID: string,
    createdAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
