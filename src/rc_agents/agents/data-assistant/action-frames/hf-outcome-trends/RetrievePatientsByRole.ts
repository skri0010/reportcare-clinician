import {
  Actionframe,
  Activity,
  Agent,
  Belief,
  Precondition,
  ResettablePrecondition,
  setRetryLaterTimeout
} from "rc_agents/framework";
import {
  ProcedureConst,
  BeliefKeys,
  PatientAttributes,
  ClinicianAttributes,
  ProcedureAttributes,
  AppAttributes,
  ActionFrameIDs
} from "rc_agents/AgentEnums";
import { Storage } from "rc_agents/storage";
import { PatientInfo } from "aws/API";
import agentAPI from "rc_agents/framework/AgentAPI";
import { Role, listPatientInfos } from "aws";
import { store } from "util/useRedux";
import { setFetchingPatients } from "ic-redux/actions/agents/actionCreator";

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
        // Trigger Communicate to USXA
        agent.addBelief(
          new Belief(BeliefKeys.PATIENT, PatientAttributes.PATIENTS, patients)
        );
      } else {
        // Update Beliefs
        // Trigger agent (self) to fetch role
        agent.addBelief(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.RETRIEVE_ROLE,
            true
          )
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
        )
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
            case Role.EP || Role.HF_SPECIALIST || Role.MO || Role.PHARMACIST: {
              // Other roles
              const patientInfosQuery = await listPatientInfos({});
              if (patientInfosQuery.data.listPatientInfos?.items) {
                patients = patientInfosQuery.data.listPatientInfos.items;
              }
              break;
            }
            default:
              // Unknown role
              break;
          }
          if (patients) {
            // Save retrieved data locally
            await Storage.setPatients(patients);
            returnPatients = await Storage.getPatients();
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
