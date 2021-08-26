import { PatientInfo } from "aws/API";
import { RiskLevel } from "models/RiskLevel";

export const mockPatients: PatientInfo[] = [
  {
    __typename: "PatientInfo",
    id: "1",
    name: "Mohammad Zaini",
    address: "Melbourne",
    deviceNo: "1",
    diagnosisInfo: "none",
    NHYAclass: "3",
    cardiologist: "Doctor Wong",
    hospitalName: "Sabah Hospital",
    hospitalLocation: "Sabah",
    targetWeight: "70",
    targetActivity: "cardio",
    patientID: "20",
    createdAt: "",
    updatedAt: "",
    riskLevel: RiskLevel.UNASSIGNED,
    gender: "male",
    birthDate: "1999-04-30",
    language: "english",
    phoneNumber: "+60123456789",
    emergencyContactName: "Emergency Test",
    emergencyContactNumber: "999",
    email: "testemail@legit.com",
    fluidIntakeGoal: "1000",
    configured: false,
    _lastChangedAt: 1627604201979,
    _version: 1
  },
  {
    __typename: "PatientInfo",
    id: "2",
    name: "Tyler Haris",
    address: "Barcelona",
    deviceNo: "1",
    diagnosisInfo: "none",
    NHYAclass: "2",
    cardiologist: "Doctor Xavi",
    hospitalName: "Barcelona",
    hospitalLocation: "Bercelona",
    targetWeight: "80",
    targetActivity: "cardio",
    patientID: "30",
    createdAt: "",
    updatedAt: "",
    gender: "male",
    birthDate: "1999-04-30",
    language: "english",
    phoneNumber: "+60123456789",
    emergencyContactName: "Emergency Test",
    emergencyContactNumber: "999",
    email: "testemail@legit.com",
    fluidIntakeGoal: "1000",
    configured: true,
    riskLevel: RiskLevel.LOW,
    _lastChangedAt: 1627604201979,
    _version: 1
  },
  {
    __typename: "PatientInfo",
    id: "3",
    name: "Danial Williams",
    address: "Sydney",
    deviceNo: "1",
    diagnosisInfo: "none",
    NHYAclass: "3",
    cardiologist: "Doctor Wong",
    hospitalName: "Sabah Hospital",
    hospitalLocation: "Sabah",
    targetWeight: "70",
    targetActivity: "cardio",
    patientID: "50",
    createdAt: "",
    updatedAt: "",
    riskLevel: RiskLevel.MEDIUM,
    gender: "male",
    birthDate: "1999-04-30",
    language: "english",
    phoneNumber: "+60123456789",
    emergencyContactName: "Emergency Test",
    emergencyContactNumber: "999",
    email: "testemail@legit.com",
    fluidIntakeGoal: "1000",
    configured: true,
    _lastChangedAt: 1627604201979,
    _version: 1
  },
  {
    __typename: "PatientInfo",
    id: "4",
    name: "Mohammad Abdul",
    address: "Canberra",
    deviceNo: "1",
    diagnosisInfo: "none",
    NHYAclass: "3",
    cardiologist: "Doctor Wong",
    hospitalName: "Canberra Hospital",
    hospitalLocation: "Canberra",
    targetWeight: "55",
    targetActivity: "cardio",
    patientID: "60",
    createdAt: "",
    updatedAt: "",
    riskLevel: RiskLevel.HIGH,
    gender: "male",
    birthDate: "1999-04-30",
    language: "english",
    phoneNumber: "+60123456789",
    emergencyContactName: "Emergency Test",
    emergencyContactNumber: "999",
    email: "testemail@legit.com",
    fluidIntakeGoal: "1000",
    configured: true,
    _lastChangedAt: 1627604201979,
    _version: 1
  }
];
