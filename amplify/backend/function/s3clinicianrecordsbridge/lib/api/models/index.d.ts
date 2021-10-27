import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





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
  constructor(init: ModelInit<PatientInfo>);
  static copyOf(source: PatientInfo, mutator: (draft: MutableModel<PatientInfo>) => MutableModel<PatientInfo> | void): PatientInfo;
}

export declare class MedicationInfo {
  readonly id: string;
  readonly name: string;
  readonly dosage: number;
  readonly frequency: number;
  readonly records: string;
  readonly patientID: string;
  readonly active: boolean;
  constructor(init: ModelInit<MedicationInfo>);
  static copyOf(source: MedicationInfo, mutator: (draft: MutableModel<MedicationInfo>) => MutableModel<MedicationInfo> | void): MedicationInfo;
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
  constructor(init: ModelInit<ActivityInfo>);
  static copyOf(source: ActivityInfo, mutator: (draft: MutableModel<ActivityInfo>) => MutableModel<ActivityInfo> | void): ActivityInfo;
}

export declare class MedCompliant {
  readonly id: string;
  readonly MedId: string;
  readonly MedicationInfo?: MedicationInfo;
  readonly Verification: boolean;
  readonly Date: string;
  readonly patientID: string;
  constructor(init: ModelInit<MedCompliant>);
  static copyOf(source: MedCompliant, mutator: (draft: MutableModel<MedCompliant>) => MutableModel<MedCompliant> | void): MedCompliant;
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
  constructor(init: ModelInit<ReportSymptom>);
  static copyOf(source: ReportSymptom, mutator: (draft: MutableModel<ReportSymptom>) => MutableModel<ReportSymptom> | void): ReportSymptom;
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
  constructor(init: ModelInit<ReportVitals>);
  static copyOf(source: ReportVitals, mutator: (draft: MutableModel<ReportVitals>) => MutableModel<ReportVitals> | void): ReportVitals;
}

export declare class ClinicianInfo {
  readonly id: string;
  readonly clinicianID: string;
  readonly name: string;
  readonly hospitalName: string;
  readonly role: string;
  readonly contactNumber: string;
  readonly protectedInfo?: ClinicianProtectedInfo;
  constructor(init: ModelInit<ClinicianInfo>);
  static copyOf(source: ClinicianInfo, mutator: (draft: MutableModel<ClinicianInfo>) => MutableModel<ClinicianInfo> | void): ClinicianInfo;
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
  readonly CAM: string;
  constructor(init: ModelInit<ClinicianProtectedInfo>);
  static copyOf(source: ClinicianProtectedInfo, mutator: (draft: MutableModel<ClinicianProtectedInfo>) => MutableModel<ClinicianProtectedInfo> | void): ClinicianProtectedInfo;
}

export declare class ClinicianPatientMap {
  readonly id: string;
  readonly patientID: string;
  readonly clinicianInfo: ClinicianInfo;
  constructor(init: ModelInit<ClinicianPatientMap>);
  static copyOf(source: ClinicianPatientMap, mutator: (draft: MutableModel<ClinicianPatientMap>) => MutableModel<ClinicianPatientMap> | void): ClinicianPatientMap;
}

export declare class PatientAssignment {
  readonly id: string;
  readonly patientID: string;
  readonly clinicianID: string;
  readonly patientName: string;
  readonly pending?: string;
  readonly resolution?: string;
  readonly reassignToClinicianID?: string;
  readonly sourceClinicianID?: string;
  constructor(init: ModelInit<PatientAssignment>);
  static copyOf(source: PatientAssignment, mutator: (draft: MutableModel<PatientAssignment>) => MutableModel<PatientAssignment> | void): PatientAssignment;
}

export declare class Alert {
  readonly id: string;
  readonly patientID: string;
  readonly patientName: string;
  readonly dateTime: string;
  readonly summary: string;
  readonly colorCode: string;
  readonly triageValue: string;
  readonly vitalsReportID: string;
  readonly vitalsReport?: ReportVitals;
  readonly symptomReportID: string;
  readonly symptomReport?: ReportSymptom;
  readonly pending?: string;
  readonly completed?: string;
  readonly owner: string;
  constructor(init: ModelInit<Alert>);
  static copyOf(source: Alert, mutator: (draft: MutableModel<Alert>) => MutableModel<Alert> | void): Alert;
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
  constructor(init: ModelInit<Todo>);
  static copyOf(source: Todo, mutator: (draft: MutableModel<Todo>) => MutableModel<Todo> | void): Todo;
}

export declare class AlertNotification {
  readonly id: string;
  readonly patientID: string;
  readonly alertID: string;
  readonly owner: string;
  constructor(init: ModelInit<AlertNotification>);
  static copyOf(source: AlertNotification, mutator: (draft: MutableModel<AlertNotification>) => MutableModel<AlertNotification> | void): AlertNotification;
}

export declare class ClinicianRecord {
  readonly id: string;
  readonly patientID: string;
  readonly documentID: string;
  readonly type: string;
  readonly title: string;
  readonly path: string;
  readonly uploaderClinicianID: string;
  readonly uploadDateTime?: string;
  constructor(init: ModelInit<ClinicianRecord>);
  static copyOf(source: ClinicianRecord, mutator: (draft: MutableModel<ClinicianRecord>) => MutableModel<ClinicianRecord> | void): ClinicianRecord;
}