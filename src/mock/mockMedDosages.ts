import { MedDosage, MedicationNames } from "rc_agents/model";

export const mockMedDosages: MedDosage[] = [
  {
    name: MedicationNames.ASPIRIN,
    dosage: {
      min: 10,
      max: 100
    }
  },
  {
    name: MedicationNames.BENAZEPRIL,
    dosage: {
      min: 1,
      max: 5
    }
  }
];
