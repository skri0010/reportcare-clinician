import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type PatientInfoMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type MedicationInfoMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ActivityInfoMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type MedCompliantMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ReportSymptomMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ReportVitalsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type MedicalRecordMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type IcdCrtRecordMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ClinicianInfoMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ClinicianProtectedInfoMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ClinicianPatientMapMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PatientAssignmentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AlertMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TodoMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AlertNotificationMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class PatientInfo {
  readonly id: string;
  readonly name: string;
  readonly address: string;
  readonly deviceNo: string;
  readonly diagnosisInfo: string;
  readonly NHYAclass: string;
  readonly cardiologist: string;
  readonly hospitalName: string;
  readonly hospitalLocation: string;
  readonly targetWeight: string;
  readonly targetActivity: string;
  readonly riskLevel: string;
  readonly gender: string;
  readonly birthDate: string;
  readonly language: string;
  readonly phoneNumber: string;
  readonly email: string;
  readonly emergencyContactName: string;
  readonly emergencyContactNumber: string;
  readonly fluidIntakeGoal: string;
  readonly configured: boolean;
  readonly patientID: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<PatientInfo, PatientInfoMetaData>);
  static copyOf(source: PatientInfo, mutator: (draft: MutableModel<PatientInfo, PatientInfoMetaData>) => MutableModel<PatientInfo, PatientInfoMetaData> | void): PatientInfo;
}

export declare class MedicationInfo {
  readonly id: string;
  readonly name: string;
  readonly dosage: number;
  readonly frequency: number;
  readonly records: string;
  readonly patientID: string;
  readonly active: boolean;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<MedicationInfo, MedicationInfoMetaData>);
  static copyOf(source: MedicationInfo, mutator: (draft: MutableModel<MedicationInfo, MedicationInfoMetaData>) => MutableModel<MedicationInfo, MedicationInfoMetaData> | void): MedicationInfo;
}

export declare class ActivityInfo {
  readonly id: string;
  readonly Actname: string;
  readonly Location: string;
  readonly expectedFrequency?: number;
  readonly expectedDays?: string[];
  readonly expectedDurationMinutes?: number;
  readonly recordDateTime?: string;
  readonly patientID: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ActivityInfo, ActivityInfoMetaData>);
  static copyOf(source: ActivityInfo, mutator: (draft: MutableModel<ActivityInfo, ActivityInfoMetaData>) => MutableModel<ActivityInfo, ActivityInfoMetaData> | void): ActivityInfo;
}

export declare class MedCompliant {
  readonly id: string;
  readonly MedId: string;
  readonly MedicationInfo?: MedicationInfo;
  readonly Verification: boolean;
  readonly Date: string;
  readonly patientID: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<MedCompliant, MedCompliantMetaData>);
  static copyOf(source: MedCompliant, mutator: (draft: MutableModel<MedCompliant, MedCompliantMetaData>) => MutableModel<MedCompliant, MedCompliantMetaData> | void): MedCompliant;
}

export declare class ReportSymptom {
  readonly id: string;
  readonly ActId: string;
  readonly ActivityInfo?: ActivityInfo;
  readonly Name: string;
  readonly Severity: string;
  readonly DateTime: string;
  readonly Summary?: string;
  readonly patientID: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ReportSymptom, ReportSymptomMetaData>);
  static copyOf(source: ReportSymptom, mutator: (draft: MutableModel<ReportSymptom, ReportSymptomMetaData>) => MutableModel<ReportSymptom, ReportSymptomMetaData> | void): ReportSymptom;
}

export declare class ReportVitals {
  readonly id: string;
  readonly Temperature?: string;
  readonly Humidity?: string;
  readonly Weight?: string;
  readonly BPSys?: string;
  readonly BPDi?: string;
  readonly NoSteps?: string;
  readonly OxySat?: string;
  readonly FluidIntake?: string;
  readonly DateTime: string;
  readonly patientID: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ReportVitals, ReportVitalsMetaData>);
  static copyOf(source: ReportVitals, mutator: (draft: MutableModel<ReportVitals, ReportVitalsMetaData>) => MutableModel<ReportVitals, ReportVitalsMetaData> | void): ReportVitals;
}

export declare class MedicalRecord {
  readonly id: string;
  readonly patientID: string;
  readonly clinicianID: string;
  readonly title: string;
  readonly fileKey: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<MedicalRecord, MedicalRecordMetaData>);
  static copyOf(source: MedicalRecord, mutator: (draft: MutableModel<MedicalRecord, MedicalRecordMetaData>) => MutableModel<MedicalRecord, MedicalRecordMetaData> | void): MedicalRecord;
}

export declare class IcdCrtRecord {
  readonly id: string;
  readonly patientID: string;
  readonly clinicianID: string;
  readonly title: string;
  readonly dateTime: string;
  readonly fileKey: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<IcdCrtRecord, IcdCrtRecordMetaData>);
  static copyOf(source: IcdCrtRecord, mutator: (draft: MutableModel<IcdCrtRecord, IcdCrtRecordMetaData>) => MutableModel<IcdCrtRecord, IcdCrtRecordMetaData> | void): IcdCrtRecord;
}

export declare class ClinicianInfo {
  readonly id: string;
  readonly clinicianID: string;
  readonly name: string;
  readonly hospitalName: string;
  readonly role: string;
  readonly contactNumber: string;
  readonly protectedInfo?: ClinicianProtectedInfo;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ClinicianInfo, ClinicianInfoMetaData>);
  static copyOf(source: ClinicianInfo, mutator: (draft: MutableModel<ClinicianInfo, ClinicianInfoMetaData>) => MutableModel<ClinicianInfo, ClinicianInfoMetaData> | void): ClinicianInfo;
}

export declare class ClinicianProtectedInfo {
  readonly id: string;
  readonly clinicianID: string;
  readonly facts: string;
  readonly APS: string;
  readonly DTA: string;
  readonly UXSA: string;
  readonly NWA: string;
  readonly ALA: string;
  readonly MHA: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ClinicianProtectedInfo, ClinicianProtectedInfoMetaData>);
  static copyOf(source: ClinicianProtectedInfo, mutator: (draft: MutableModel<ClinicianProtectedInfo, ClinicianProtectedInfoMetaData>) => MutableModel<ClinicianProtectedInfo, ClinicianProtectedInfoMetaData> | void): ClinicianProtectedInfo;
}

export declare class ClinicianPatientMap {
  readonly id: string;
  readonly patientID: string;
  readonly clinicianInfo: ClinicianInfo;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ClinicianPatientMap, ClinicianPatientMapMetaData>);
  static copyOf(source: ClinicianPatientMap, mutator: (draft: MutableModel<ClinicianPatientMap, ClinicianPatientMapMetaData>) => MutableModel<ClinicianPatientMap, ClinicianPatientMapMetaData> | void): ClinicianPatientMap;
}

export declare class PatientAssignment {
  readonly id: string;
  readonly patientID: string;
  readonly clinicianID: string;
  readonly patientName: string;
  readonly pending?: string;
  readonly resolution?: string;
  readonly reassignToClinicianID?: string;
  readonly adminReassignFromClinicianID?: string;
  readonly adminCompleted?: boolean;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<PatientAssignment, PatientAssignmentMetaData>);
  static copyOf(source: PatientAssignment, mutator: (draft: MutableModel<PatientAssignment, PatientAssignmentMetaData>) => MutableModel<PatientAssignment, PatientAssignmentMetaData> | void): PatientAssignment;
}

export declare class Alert {
  readonly id: string;
  readonly patientID: string;
  readonly patientName: string;
  readonly dateTime: string;
  readonly summary: string;
  readonly colorCode: string;
  readonly vitalsReportID: string;
  readonly vitalsReport?: ReportVitals;
  readonly symptomReportID: string;
  readonly symptomReport?: ReportSymptom;
  readonly pending?: string;
  readonly completed?: string;
  readonly owner: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Alert, AlertMetaData>);
  static copyOf(source: Alert, mutator: (draft: MutableModel<Alert, AlertMetaData>) => MutableModel<Alert, AlertMetaData> | void): Alert;
}

export declare class Todo {
  readonly id: string;
  readonly clinicianID: string;
  readonly title: string;
  readonly patientName: string;
  readonly notes: string;
  readonly lastModified: string;
  readonly alertID?: string;
  readonly alert?: Alert;
  readonly pending?: string;
  readonly completed?: string;
  readonly owner: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Todo, TodoMetaData>);
  static copyOf(source: Todo, mutator: (draft: MutableModel<Todo, TodoMetaData>) => MutableModel<Todo, TodoMetaData> | void): Todo;
}

export declare class AlertNotification {
  readonly id: string;
  readonly patientID: string;
  readonly alertID: string;
  readonly owner: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<AlertNotification, AlertNotificationMetaData>);
  static copyOf(source: AlertNotification, mutator: (draft: MutableModel<AlertNotification, AlertNotificationMetaData>) => MutableModel<AlertNotification, AlertNotificationMetaData> | void): AlertNotification;
}