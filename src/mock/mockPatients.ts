import { PersonRowGeneralDetails } from "models/PersonRowDetails";
import { RiskLevel } from "models/RiskLevel";

interface IMockPatientDetails {
  generalDetails: PersonRowGeneralDetails;
  age: number;
  patientClass: string;
  message: string;
  unreadMessageCount: number;
  request: string;
  itemId: string;
}

const mockHighRiskPatient = {
  id: "1",
  name: "Mohammad Zaini",
  riskLevel: RiskLevel.HIGH
};

const mockMediumRiskPatient = {
  id: "2",
  name: "Tyler Haris",
  riskLevel: RiskLevel.MEDIUM
};

const mockLowRiskPatient = {
  id: "3",
  name: "Danial Williams",
  riskLevel: RiskLevel.LOW
};

export const mockPatients: IMockPatientDetails[] = [
  {
    generalDetails: mockHighRiskPatient,
    patientClass: "NHYA III",
    age: 55,
    message: "Should I change my diet?",
    unreadMessageCount: 1,
    request: "Verify titration values",
    itemId: "1"
  },
  {
    generalDetails: mockMediumRiskPatient,
    patientClass: "NHYA II",
    age: 45,
    message: "Is everything ok?",
    unreadMessageCount: 1,
    request: "Verify titration values",
    itemId: "2"
  },
  {
    generalDetails: mockLowRiskPatient,
    patientClass: "NHYA I",
    age: 35,
    message: "Should I avoid running?",
    unreadMessageCount: 1,
    request: "Verify titration values",
    itemId: "3"
  }
];
