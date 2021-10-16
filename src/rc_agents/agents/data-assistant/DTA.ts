import { AgentIDs } from "rc_agents/clinician_framework";
import { CommonAttributes } from "agents-framework/Enums";
import { Belief } from "agents-framework";
import { af_RetrieveEntryData } from "./action-frames/medical-record-device-configuration/RetrieveEntryData";
import { af_StoreEntryData } from "./action-frames/medical-record-device-configuration/StoreEntryData";
import { af_RetrievePatientDetails } from "./action-frames/hf-outcome-trends/RetrievePatientDetails";
import { af_RequestDisplayPatientDetails } from "./action-frames/hf-outcome-trends/RequestDisplayPatientDetails";
import { af_RetrievePatientsByRole } from "./action-frames/hf-outcome-trends/RetrievePatientsByRole";
import { af_RequestDisplayPatients } from "./action-frames/hf-outcome-trends/RequestDisplayPatients";
import { af_RetrieveAlerts } from "./action-frames/triage-alert-hf-clinic/RetrieveAlerts";
import { af_RequestDisplayAlerts } from "./action-frames/triage-alert-hf-clinic/RequestDisplayAlerts";
import { af_RetrieveDetailedAlertInfo } from "./action-frames/triage-alert-hf-clinic/RetrieveDetailedAlertInfo";
import { af_RequestDisplayDetailedAlertInfo } from "./action-frames/triage-alert-hf-clinic/RequestDisplayDetailedAlertInfo";
import { af_RetrievePendingPatientAssignments } from "./action-frames/storing-data/RetrievePendingPatientAssignments";
import { af_RequestDisplayPendingPatientAssignments } from "./action-frames/storing-data/RequestDisplayPendingPatientAssignments";
import { af_ResolvePatientAssignment } from "./action-frames/storing-data/ResolvePatientAssignment";
import { af_RequestSyncPatientAssignmentResolutions } from "./action-frames/storing-data/RequestSyncPatientAssignmentResolutions";
import { af_RetrieveTodoDetails } from "./action-frames/storing-data/RetrieveTodoDetails";
import { af_RequestDisplayTodoDetails } from "./action-frames/storing-data/RequestDisplayTodoDetails";
import { af_CreateTodo } from "./action-frames/storing-data/CreateTodo";
import { af_UpdateTodo } from "./action-frames/storing-data/UpdateTodo";
import { af_RetrieveTodos } from "./action-frames/storing-data/RetrieveTodos";
import { af_RequestDisplayTodos } from "./action-frames/storing-data/RequestDisplayTodos";
import { agentAPI } from "rc_agents/clinician_framework/ClinicianAgentAPI";
import { ClinicianAgent } from "rc_agents/clinician_framework/ClinicianAgent";
import af_UpdateAlert from "./action-frames/triage-alert-hf-clinic/UpdateAlert";
import { af_RetrieveAlertHistory } from "./action-frames/hf-outcome-trends/RetrieveAlertHistory";
import { af_RequestDisplayAlertHistory } from "./action-frames/hf-outcome-trends/RequestDisplayAlertHistory";
import { af_RetrieveClinicianContacts } from "./action-frames/storing-data/RetrieveClinicianContacts";
import { af_RequestClinicianContactDisplay } from "./action-frames/storing-data/RequestClinicianContactsDisplay";
import { af_ProcessPatientAssignmentSubscription } from "./action-frames/storing-data/ProcessPatientAssignmentSubscription";
import { af_CreateMedicalRecord } from "./action-frames/medical-record-device-configuration/CreateMedicalRecord";
import { af_RetrieveMedicalRecordContent } from "./action-frames/hf-outcome-trends/RetrieveMedicalRecordContent";
import { af_RequestDisplayMedicalRecordContent } from "./action-frames/hf-outcome-trends/RequestDisplayMedicalRecordContent";
import { af_StoreBaseline } from "./action-frames/medical-record-device-configuration/StoreBaseline";
import { af_CreateIcdCrtRecord } from "./action-frames/medical-record-device-configuration/CreateIcdCrtRecord";
import { af_RetrieveIcdCrtRecordContent } from "./action-frames/hf-outcome-trends/RetrieveIcdCrtRecordContent";
import { af_RequestDisplayIcdCrtRecordContent } from "./action-frames/hf-outcome-trends/RequestDisplayIcdCrtRecordContent";
import { af_DeleteRecord } from "./action-frames/medical-record-device-configuration/DeleteRecord";

// Initial Beliefs of Agent

// App Device Configuration
const belief1 = new Belief(AgentIDs.DTA, CommonAttributes.LAST_ACTIVITY, null);

// Data Assistant Agent
const agentDTA = new ClinicianAgent(
  AgentIDs.DTA,
  [
    // MRDC
    af_StoreEntryData,
    af_RetrieveEntryData,
    af_StoreBaseline,
    af_CreateMedicalRecord,
    af_CreateIcdCrtRecord,
    af_DeleteRecord,

    // SRD-I
    af_RetrievePendingPatientAssignments,
    af_RequestDisplayPendingPatientAssignments,
    af_ResolvePatientAssignment,
    af_RequestSyncPatientAssignmentResolutions,

    // HF-OTP-I
    af_RetrievePatientsByRole,
    af_RequestDisplayPatients,

    // HF-OTP-II
    af_RetrievePatientDetails,
    af_RequestDisplayPatientDetails,
    af_RetrieveAlertHistory,
    af_RequestDisplayAlertHistory,

    // HF-OTP-III
    af_RetrieveMedicalRecordContent,
    af_RequestDisplayMedicalRecordContent,

    // HF-OTP-IV
    af_RetrieveIcdCrtRecordContent,
    af_RequestDisplayIcdCrtRecordContent,

    // AT-CP-I
    af_RetrieveAlerts,
    af_RequestDisplayAlerts,

    // AT-CP-II
    af_RetrieveDetailedAlertInfo,
    af_RequestDisplayDetailedAlertInfo,
    af_UpdateAlert,

    // SRD-II
    af_RetrieveTodos,
    af_CreateTodo,
    af_UpdateTodo,
    af_RequestDisplayTodos,

    // SRD-III
    af_RetrieveTodoDetails,
    af_RequestDisplayTodoDetails,
    // SRD-IV
    af_RetrieveClinicianContacts,
    af_RequestClinicianContactDisplay,

    // SRD-V
    af_ProcessPatientAssignmentSubscription
  ], // action frame
  [belief1], // beliefs
  agentAPI
);

export default agentDTA;
