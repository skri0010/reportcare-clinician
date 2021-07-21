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
  readonly patientID: string;
  constructor(init: ModelInit<PatientInfo>);
  static copyOf(source: PatientInfo, mutator: (draft: MutableModel<PatientInfo>) => MutableModel<PatientInfo> | void): PatientInfo;
}

export declare class MedicationInfo {
  readonly id: string;
  readonly medname: string;
  readonly dosage: string;
  readonly patientID: string;
  constructor(init: ModelInit<MedicationInfo>);
  static copyOf(source: MedicationInfo, mutator: (draft: MutableModel<MedicationInfo>) => MutableModel<MedicationInfo> | void): MedicationInfo;
}

export declare class ActivityInfo {
  readonly id: string;
  readonly Actname: string;
  readonly Location: string;
  readonly Frequency: number;
  readonly Days: string[];
  readonly time: string;
  readonly patientID: string;
  constructor(init: ModelInit<ActivityInfo>);
  static copyOf(source: ActivityInfo, mutator: (draft: MutableModel<ActivityInfo>) => MutableModel<ActivityInfo> | void): ActivityInfo;
}

export declare class MedCompliant {
  readonly id: string;
  readonly MedId: string;
  readonly Verification: boolean;
  readonly Date: string;
  readonly patientID: string;
  constructor(init: ModelInit<MedCompliant>);
  static copyOf(source: MedCompliant, mutator: (draft: MutableModel<MedCompliant>) => MutableModel<MedCompliant> | void): MedCompliant;
}

export declare class ReportSymptom {
  readonly id: string;
  readonly ActId: string;
  readonly Name: string;
  readonly Severity: string;
  readonly DateTime: string;
  readonly patientID: string;
  constructor(init: ModelInit<ReportSymptom>);
  static copyOf(source: ReportSymptom, mutator: (draft: MutableModel<ReportSymptom>) => MutableModel<ReportSymptom> | void): ReportSymptom;
}

export declare class ReportVitals {
  readonly id: string;
  readonly SymptomId: string;
  readonly Temperature?: string;
  readonly Humidity?: string;
  readonly Weight: string;
  readonly BPSys: string;
  readonly BPDi: string;
  readonly NoSteps: string;
  readonly OxySat: string;
  readonly DateTime: string;
  readonly patientID: string;
  constructor(init: ModelInit<ReportVitals>);
  static copyOf(source: ReportVitals, mutator: (draft: MutableModel<ReportVitals>) => MutableModel<ReportVitals> | void): ReportVitals;
}

export declare class ClinicianInfo {
  readonly id: string;
  readonly name: string;
  readonly hospitalName: string;
  readonly clinicianID: string;
  readonly role: string;
  readonly facts: string;
  readonly APS: string;
  readonly DTA: string;
  readonly UXSA: string;
  readonly owner: string;
  constructor(init: ModelInit<ClinicianInfo>);
  static copyOf(source: ClinicianInfo, mutator: (draft: MutableModel<ClinicianInfo>) => MutableModel<ClinicianInfo> | void): ClinicianInfo;
}

export declare class ClinicianPatientMap {
  readonly id: string;
  readonly clinicianID: string;
  readonly patientID: string;
  readonly owner: string;
  constructor(init: ModelInit<ClinicianPatientMap>);
  static copyOf(source: ClinicianPatientMap, mutator: (draft: MutableModel<ClinicianPatientMap>) => MutableModel<ClinicianPatientMap> | void): ClinicianPatientMap;
}