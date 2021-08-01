import { PatientInfo } from "aws/models";

export const mockPatients: PatientInfo[] = [
  {
    id: "1",
    name: "Mohammad Zaini",
    address: "Melbourne",
    deviceNo: "1",
    diagnosisInfo: "none",
    NHYAclass: "NHYA III",
    cardiologist: "Doctor Wong",
    hospitalName: "Sabah Hospital",
    hospitalLocation: "Sabah",
    targetWeight: "70",
    targetActivity: "cardio",
    patientID: "20"
  },
  {
    id: "2",
    name: "Tyler Haris",
    address: "Barcelona",
    deviceNo: "1",
    diagnosisInfo: "none",
    NHYAclass: "NHYA II",
    cardiologist: "Doctor Xavi",
    hospitalName: "Barcelona",
    hospitalLocation: "Bercelona",
    targetWeight: "80",
    targetActivity: "cardio",
    patientID: "30"
  },
  {
    id: "3",
    name: "Danial Williams",
    address: "Sydney",
    deviceNo: "1",
    diagnosisInfo: "none",
    NHYAclass: "NHYA III",
    cardiologist: "Doctor Wong",
    hospitalName: "Sabah Hospital",
    hospitalLocation: "Sabah",
    targetWeight: "70",
    targetActivity: "cardio",
    patientID: "50"
  },
  {
    id: "4",
    name: "Mohammad Abdul",
    address: "Canberra",
    deviceNo: "1",
    diagnosisInfo: "none",
    NHYAclass: "NHYA III",
    cardiologist: "Doctor Wong",
    hospitalName: "Canberra Hospital",
    hospitalLocation: "Canberra",
    targetWeight: "55",
    targetActivity: "cardio",
    patientID: "60"
  },
  {
    id: "5",
    name: "Mohammad Abdul",
    address: "Canberra",
    deviceNo: "1",
    diagnosisInfo: "none",
    NHYAclass: "NHYA III",
    cardiologist: "Doctor Wong",
    hospitalName: "Canberra Hospital",
    hospitalLocation: "Canberra",
    targetWeight: "55",
    targetActivity: "cardio",
    patientID: "60"
  }
];

// interface IMockPatientDetails {
//   generalDetails: PersonRowGeneralDetails;
//   age: number;
//   patientClass: string;
//   message: string;
//   unreadMessageCount: number;
//   request: string;
//   itemId: string;
// }

// const mockHighRiskPatient = {
//   id: "1",
//   name: "Mohammad Zaini",
//   riskLevel: RiskLevel.HIGH
// };

// const mockMediumRiskPatient = {
//   id: "2",
//   name: "Tyler Haris",
//   riskLevel: RiskLevel.MEDIUM
// };

// const mockLowRiskPatient = {
//   id: "3",
//   name: "Danial Williams",
//   riskLevel: RiskLevel.LOW
// };
// export const mockPatients: IMockPatientDetails[] = [
//   {
//     generalDetails: mockHighRiskPatient,
//     patientClass: "NHYA III",
//     age: 55,
//     message: "Should I change my diet?",
//     unreadMessageCount: 1,
//     request: "Verify titration values",
//     itemId: "1"
//   },
//   {
//     generalDetails: mockMediumRiskPatient,
//     patientClass: "NHYA II",
//     age: 45,
//     message: "Is everything ok?",
//     unreadMessageCount: 1,
//     request: "Verify titration values",
//     itemId: "2"
//   },
//   {
//     generalDetails: mockLowRiskPatient,
//     patientClass: "NHYA I",
//     age: 35,
//     message: "Should I avoid running?",
//     unreadMessageCount: 1,
//     request: "Verify titration values",
//     itemId: "3"
//   },
//   {
//     generalDetails: mockLowRiskPatient,
//     patientClass: "NHYA I",
//     age: 35,
//     message: "Should I avoid running?",
//     unreadMessageCount: 1,
//     request: "Verify titration values",
//     itemId: "4"
//   }
// ];
