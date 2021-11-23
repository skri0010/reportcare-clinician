// Functions for validating authentication inputs
import { mockMedPrescriptions } from "mock/mockMedDosages";
import { Hospital, NYHAClassEnum, MedicationNames } from "rc_agents/model";
import { PossibleNumber, PossibleString } from "./const";

// == String validation ==

// Checks that username has 3 to 16 characters
export const validateUsername = (username: string): boolean => {
  return /^[a-z0-9_-]{3,16}$/.test(username);
};

export const validateEmail = (email: string): boolean => {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export const validatePhone = (phone: string): boolean => {
  return validateInteger(phone) && phone.length === 10;
};

// Checks that password has 8 characters with at least 1 uppercase letter and number
export const validatePassword = (password: string): boolean => {
  return /(?=.*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,}$/.test(password);
};

export const validateHospitalName = (hospitalName: PossibleString): boolean => {
  return (
    hospitalName !== Hospital.UNKNOWN &&
    Object.values(Hospital).includes(hospitalName as Hospital)
  );
};

export const validateNYHAClass = (NYHAClass: PossibleString): boolean => {
  return (
    NYHAClass !== Hospital.UNKNOWN &&
    Object.values(NYHAClassEnum).includes(NYHAClass as NYHAClassEnum)
  );
};

// == Number validation ==

export const validateTargetWeight = (targetWeight: PossibleNumber): boolean => {
  // Min and max values for target weight (in kg)
  const minWeight = 0;
  const maxWeight = 500;
  return (targetWeight &&
    targetWeight > minWeight &&
    targetWeight <= maxWeight) as boolean;
};

export const validateTargetSteps = (targetSteps: PossibleNumber): boolean => {
  // Min and max values for steps
  const minSteps = 0;
  const maxSteps = 100000;
  return (targetSteps &&
    targetSteps > minSteps &&
    targetSteps <= maxSteps) as boolean;
};

export const validateFluidIntakeGoal = (
  fluidIntakeGoalInMl: PossibleNumber
): boolean => {
  // Min and max values for fluid intake goal (in ml)
  const minFluidIntakeGoalInMl = 0;
  const maxFluidIntakeGoalInMl = 10000;
  return (fluidIntakeGoalInMl &&
    fluidIntakeGoalInMl > minFluidIntakeGoalInMl &&
    fluidIntakeGoalInMl <= maxFluidIntakeGoalInMl) as boolean;
};

// == Other validation ==

export const validateMedName = (medName: string): boolean => {
  // Assumed medicine name's length
  const minMedNameLength = 0;
  const maxMedNameLength = 200;
  return (
    medName.length > minMedNameLength &&
    medName.length <= maxMedNameLength &&
    Object.values(MedicationNames).includes(medName as MedicationNames)
  );
};

export const validateMedDosageInput = (dosage: string): boolean => {
  return validateInteger(dosage);
};

export const validateMedDosage = (medName: string, dosage: string): boolean => {
  // Assumed medication dosage (in mg)
  const medicine = mockMedPrescriptions.filter((t) => t.name === medName);
  if (medicine.length > 0) {
    const minDosage = medicine[0].dosages.startDose;
    const maxDosage = medicine[0].dosages.targetDose;
    return (
      validateFloat(dosage) &&
      parseFloat(dosage) >= minDosage &&
      parseFloat(dosage) <= maxDosage
    );
  }
  return false;
};

export const validateMedFreq = (frequency: string): boolean => {
  // Assumed medication frquency (in times per day)
  const minFrequency = 1;
  const maxFrequency = 10;
  return (
    validateInteger(frequency) &&
    parseFloat(frequency) >= minFrequency &&
    parseFloat(frequency) <= maxFrequency
  );
};

export const notEmptyString = (
  testString: string | number | null | undefined
): boolean => {
  return ((testString || testString === 0) &&
    testString.toString().length > 0) as boolean;
};

export const validateInteger = (testString: string): boolean => {
  return /^\d+$/.test(testString);
};

export const validateFloat = (testString: string): boolean => {
  return /^-{0,1}\d*\.{0,1}\d+$/.test(testString);
};

export const getParsedFloat = (testString: string): number | null => {
  const float = parseFloat(testString);
  return !Number.isNaN(float) ? float : null;
};

// Checks that code has 6 digits
export const validateCode = (code: string): boolean => {
  return /^\d{6}$/gm.test(code);
};
