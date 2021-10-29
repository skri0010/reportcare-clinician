import { MedicationInfo } from "aws/API";

export const mockMedicationRecord: MedicationInfo[] = [
  {
    __typename: "MedicationInfo",
    id: "13",
    name: "Furosemide",
    dosage: 40,
    patientID: "1",
    frequency: 2,
    records: "",
    active: true,
    createdAt: "",
    updatedAt: ""
  },
  {
    __typename: "MedicationInfo",
    id: "14",
    name: "Aldactone",
    dosage: 40,
    patientID: "1",
    frequency: 2,
    records: "",
    active: true,
    createdAt: "",
    updatedAt: ""
  },
  {
    __typename: "MedicationInfo",
    id: "15",
    name: "Panadol",
    dosage: 40,
    patientID: "1",
    frequency: 2,
    records: "",
    active: true,
    createdAt: "",
    updatedAt: ""
  }
];
