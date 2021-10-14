import { MedDosage, MedicationNames, MedPrescription } from "rc_agents/model";

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

export const mockMedPrescriptions: MedPrescription[] = [
  {
    name: MedicationNames.BISOPROLOL,
    dosages: {
      startDose: 1.25,
      targetDose: 10,
      increment: "1.25mg - 2.5mg"
    }
  },
  {
    name: MedicationNames.ASPIRIN,
    dosages: {
      startDose: 1.25,
      targetDose: 10,
      increment: "1.25mg - 2.5mg"
    }
  },
  {
    name: MedicationNames.SACUBITRIL,
    dosages: {
      startDose: 2.5,
      targetDose: 10,
      increment: "1.25mg - 2.5mg"
    }
  },
  {
    name: MedicationNames.VENTOLIN,
    dosages: {
      startDose: 2.5,
      targetDose: 10,
      increment: "1.25mg - 2.5mg"
    }
  }
];
