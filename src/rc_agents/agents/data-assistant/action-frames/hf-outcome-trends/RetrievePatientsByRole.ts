import {
  Actionframe,
  Activity,
  Agent,
  Belief,
  Precondition,
  ResettablePrecondition
} from "agents-framework";
import { ProcedureConst } from "agents-framework/Enums";
import { agentAPI } from "rc_agents/clinician_framework/ClinicianAgentAPI";
import {
  BeliefKeys,
  PatientAttributes,
  ProcedureAttributes,
  AppAttributes,
  ActionFrameIDs
} from "rc_agents/clinician_framework";
import { LocalStorage } from "rc_agents/storage";
import { PatientInfo } from "aws/API";
import { listPatientInfos } from "aws";
import { Role } from "rc_agents/model";
import { store } from "util/useRedux";
import { setFetchingPatients } from "ic-redux/actions/agents/patientActionCreator";
import { sortPatientsByRiskLevel } from "util/utilityFunctions";

/**
 * Class to represent an activity for retrieving patients according to role.
 * This happens in Procedure HF Outcome Trends (HF-OTP-I).
 */
class RetrievePatientsByRole extends Activity {
  constructor() {
    super(ActionFrameIDs.DTA.RETRIEVE_PATIENTS_BY_ROLE);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);
    // Dispatch to store to indicate fetching
    store.dispatch(setFetchingPatients(true));

    try {
      let patients = await this.queryPatients();
      patients = sortPatientsByRiskLevel(patients);

      // Update Facts
      // Set item
      agentAPI.addFact(
        new Belief(BeliefKeys.PATIENT, PatientAttributes.PATIENTS, patients),
        false
      );
      // Trigger Communicate to UXSA
      agent.addBelief(
        new Belief(BeliefKeys.PATIENT, PatientAttributes.DISPLAY_PATIENTS, true)
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);

      // Update Facts
      // End the procedure
      agentAPI.addFact(
        new Belief(
          BeliefKeys.PROCEDURE,
          ProcedureAttributes.HF_OTP_I,
          ProcedureConst.INACTIVE
        ),
        true,
        true
      );
      // Dispatch to store to indicate fetching has ended
      store.dispatch(setFetchingPatients(false));
    }
  }

  /**
   * Queries patient info according to user role.
   * @returns Array of patient info
   */
  // eslint-disable-next-line class-methods-use-this
  async queryPatients(): Promise<PatientInfo[]> {
    let returnPatients: PatientInfo[] = [];

    // Get online status from facts
    const isOnline =
      agentAPI.getFacts()[BeliefKeys.APP]?.[AppAttributes.ONLINE];

    // Get clinician from global state
    const localClinician = store.getState().clinicians.clinician;
    if (localClinician && isOnline) {
      // Device is online: Retrieve and store locally
      let patients: (PatientInfo | null)[] | null = null;
      switch (localClinician.role) {
        case Role.NURSE: {
          // Nurse: Query patients from the same hospital
          const patientInfosQuery = await listPatientInfos({
            filter: { hospitalName: { eq: localClinician.hospitalName } }
          });
          if (patientInfosQuery.data.listPatientInfos?.items) {
            patients = patientInfosQuery.data.listPatientInfos.items;
          }
          break;
        }
        case Role.EP:
        case Role.HF_SPECIALIST:
        case Role.MO:
        case Role.PHARMACIST: {
          // Other roles
          const patientInfosQuery = await listPatientInfos({});
          if (patientInfosQuery.data.listPatientInfos?.items) {
            patients = patientInfosQuery.data.listPatientInfos.items;
          }
          break;
        }
        default:
          // eslint-disable-next-line no-console
          console.log("Unknown role");
          break;
      }
      if (patients) {
        // Save retrieved data locally
        await LocalStorage.setPatients(patients);
      }
    }
    // Regardless if device is online or offline, retrieve locally
    const localData = await LocalStorage.getPatients();
    if (localData) {
      returnPatients = localData;
    }
    return returnPatients;
  }
}

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.HF_OTP_I,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.PATIENT,
  PatientAttributes.RETRIEVE_PATIENTS,
  true
);

// Actionframe
export const af_RetrievePatientsByRole = new Actionframe(
  `AF_${ActionFrameIDs.DTA.RETRIEVE_PATIENTS_BY_ROLE}`,
  [rule1, rule2],
  new RetrievePatientsByRole()
);
