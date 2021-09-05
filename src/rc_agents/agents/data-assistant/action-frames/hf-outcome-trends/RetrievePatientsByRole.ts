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
  setRetryLaterTimeout,
  BeliefKeys,
  PatientAttributes,
  ClinicianAttributes,
  ProcedureAttributes,
  AppAttributes,
  ActionFrameIDs
} from "rc_agents/clinician_framework";
import { Storage } from "rc_agents/storage";
import { PatientInfo } from "aws/API";
import { listPatientInfos } from "aws";
import { Role } from "rc_agents/model";
import { store } from "util/useRedux";
import { setFetchingPatients } from "ic-redux/actions/agents/actionCreator";
import Auth from "@aws-amplify/auth";

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

    // Get role from facts
    const role =
      agentAPI.getFacts()[BeliefKeys.CLINICIAN]?.[ClinicianAttributes.ROLE];

    try {
      if (role) {
        const patients = await this.queryPatients(role);
        // Update Facts and Beliefs
        // Remove item
        agentAPI.addFact(
          new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.ROLE, null),
          false
        );
        // Set item
        agentAPI.addFact(
          new Belief(BeliefKeys.PATIENT, PatientAttributes.PATIENTS, patients),
          false
        );
        // Trigger Communicate to USXA
        agent.addBelief(
          new Belief(
            BeliefKeys.PATIENT,
            PatientAttributes.PATIENTS_RETRIEVED,
            true
          )
        );
      } else {
        // Update Beliefs
        // Trigger Communicate to USXA to get role
        agent.addBelief(
          new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.ROLE, true)
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      // Set to retry later
      setRetryLaterTimeout(() => {
        agent.addBelief(
          new Belief(
            BeliefKeys.PATIENT,
            PatientAttributes.RETRIEVE_PATIENTS,
            true
          )
        );
        agentAPI.addFact(
          new Belief(
            BeliefKeys.PROCEDURE,
            ProcedureAttributes.HF_OTP_I,
            ProcedureConst.ACTIVE
          )
        );
      });

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
  async queryPatients(role: string): Promise<PatientInfo[]> {
    let returnPatients: PatientInfo[] = [];

    // Get online status from facts
    const isOnline =
      agentAPI.getFacts()[BeliefKeys.APP]?.[AppAttributes.ONLINE];

    if (role) {
      // Role exists indicated clinician info has been updated
      const localClinician = await Storage.getClinician();
      if (localClinician) {
        // Device is online: Retrieve and store locally
        if (isOnline) {
          let patients: (PatientInfo | null)[] | null = null;
          switch (role) {
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
            await Storage.setPatients(patients);
          }
        }
      }
      // Regardless if device is online or offline, retrieve locally
      const localData = await Storage.getPatients();
      if (localData) {
        returnPatients = localData;
      }
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
