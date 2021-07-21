// Role selection during clinician sign up
// Note: Role values must be compatible with the custom:hospital_role values for Cognito user groups
export enum Role {
  EP = "EP",
  MO = "MedicalOfficer",
  HF_SPECIALIST = "HFSpecialist",
  NURSE = "Nurse",
  PHARMACIST = "Pharmacist"
}

// Hospital selection during clinician sign up
export enum Hospital {
  PHKL = "Pantai Hospital Kuala Lumpur",
  GKL = "Gleneagles Kuala Lumpur",
  HEQ = "Hospital Queen Elizabeth",
  HQEII = "Hospital Queen Elizabeth II",
  HB = "Hospital Bintulu"
}
