import Agent from "../../agent_framework/base/Agent";
import Belief from "../../agent_framework/base/Belief";
import af_StoreEntryData from "./action-frames/app-device-configuration/StoreEntryData";
import af_RetrieveEntryData from "./action-frames/app-device-configuration/RetrieveEntryData";
import af_UpdatePatientClinican from "./action-frames/new-patient-registration/UpdatePatientClinician";
import af_RetrievePatientDetails from "./action-frames/hf-outcome-trends/RetrievePatientDetails";
import af_RequestDetailsDisplay from "./action-frames/hf-outcome-trends/RequestDetailsDisplay";
import af_RetrieveRolePatients from "./action-frames/hf-outcome-trends/RetrieveRolePatients";

const agentId = "DTA";

// Initial Beliefs of Agent

// App Device Configuration
const belief1 = new Belief(agentId, "lastActivity", null);
const belief2 = new Belief("Clinician", "baselineUpdated", false);

// Data Assistant Agent
const agentDTA = new Agent(
  agentId,
  [
    af_StoreEntryData,
    af_RetrieveEntryData,
    af_UpdatePatientClinican,
    af_RetrievePatientDetails,
    af_RequestDetailsDisplay,
    af_RetrieveRolePatients
  ], // action frame
  [belief1, belief2] // beliefs
);

export default agentDTA;
