// Functions for validating authentication inputs

import { Hospital } from "rc_agents/model";

// Checks that username has 3 to 16 characters
export const validateUsername = (username: string): boolean => {
  return /^[a-z0-9_-]{3,16}$/.test(username);
};

export const validateEmail = (email: string): boolean => {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

// Checks that password has 8 characters with at least 1 uppercase letter and number
export const validatePassword = (password: string): boolean => {
  return /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/i.test(
    password
  );
};

export const validateTargetWeight = (targetWeight: string): boolean => {
  // Assumed min and max values for target weight (in kg)
  const minWeight = 0;
  const maxWeight = 500;
  return (
    validateNumber(targetWeight) &&
    parseFloat(targetWeight) > minWeight &&
    parseFloat(targetWeight) <= maxWeight
  );
};

export const validateHospitalName = (hospitalName: string): boolean => {
  return (
    hospitalName !== Hospital.UNKNOWN &&
    Object.values(Hospital).includes(hospitalName as Hospital)
  );
};

export const validateTargetActivity = (targetActivity: string): boolean => {
  // Assumed min and max values for target activity (number of steps)
  const minActivity = 0;
  const maxActivity = 100000;
  return (
    validateNumber(targetActivity) &&
    parseFloat(targetActivity) > minActivity &&
    parseFloat(targetActivity) <= maxActivity
  );
};

export const validateFluidIntakeGoal = (fluidIntakeGoal: string): boolean => {
  // Assumed min and max values for fluid intake goal (in ml)
  const minFluidIntakeGoal = 0;
  const maxFluidIntakeGoal = 10000;
  return (
    validateNumber(fluidIntakeGoal) &&
    parseFloat(fluidIntakeGoal) > minFluidIntakeGoal &&
    parseFloat(fluidIntakeGoal) <= maxFluidIntakeGoal
  );
};

export const notEmptyString = (testString: string): boolean => {
  return testString.length > 0;
};

const validateNumber = (testString: string): boolean => {
  return /^\d+$/.test(testString);
};

// Checks that code has 6 digits
export const validateCode = (code: string): boolean => {
  return /^\d{6}$/gm.test(code);
};
