import { RiskLevel } from "models/RiskLevel";

export interface PersonRowGeneralDetails {
  id: string;
  name: string;
  riskLevel: RiskLevel;
}

export interface ClinicianRowGeneralDetails {
  id: string;
  name: string;
  occupation: string;
  location: string;
}

// TODO: "Clarify if this file is still needed"
/**
 * Data needed for various row types
 *
 * REQUEST
 * -> name, riskLevel, content, time, picture
 *
 * PATIENT
 * -> name, riskLevel, age, class, picture
 *
 * CHAT
 * -> name, riskLevel, content, time, unreadMsg, picture
 *
 * ALERT
 * -> *similar to REQUEST
 */
