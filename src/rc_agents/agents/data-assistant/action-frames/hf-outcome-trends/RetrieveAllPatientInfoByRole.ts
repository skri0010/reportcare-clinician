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
import {
  setPatients,
  setProcedureOngoing
} from "ic-redux/actions/agents/actionCreator";

/**
 * Class to represent an activity for retrieving all patients according to role.
 * This happens in Procedure HF Outcome Trends (HF-OTP-I).
 */
class RetrieveAllPatientInfoByRole extends Activity {
  constructor() {
    super(ActionFrameIDs.DTA.RETRIEVE_ALL_PATIENT_INFO_BY_ROLE);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

    // Get role from facts
    const role =
      agentAPI.getFacts()[BeliefKeys.CLINICIAN]?.[ClinicianAttributes.ROLE];

    try {
      if (role) {
        const allPatientInfo = await this.queryPatients(role);
        // JH-TODO-NEW: Store dispatch
        // Dispatch patients to front end
        store.dispatch(setPatients(allPatientInfo));
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
            PatientAttributes.RETRIEVE_ALL_PATIENT_INFO,
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
    } finally {
      // Update Facts
      // Remove item
      agentAPI.addFact(
        new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.ROLE, null),
        false
      );

      // JH-TODO-NEW: Procedure ends at DisplayAllPatientInfo
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

      // // JH-TODO-NEW: Store dispatch
      // Dispatch to front end that procedure has been completed
      store.dispatch(setProcedureOngoing(false));
    }
  }

  /**
   * Queries patient info according to user role.
   * @returns Array of patient info
   */
  // eslint-disable-next-line class-methods-use-this
  async queryPatients(role: string): Promise<PatientInfo[]> {
    let patientInfoList: PatientInfo[] = [];

    // Get online status from facts
    const isOnline =
      agentAPI.getFacts()[BeliefKeys.APP]?.[AppAttributes.ONLINE];

    if (role) {
      // Role exists indicated clinician info has been updated
      const localClinician = await Storage.getClinician();
      if (localClinician) {
        // Device is online
        if (isOnline) {
          let allPatientInfo: (PatientInfo | null)[] | null = null;
          switch (role) {
            case Role.NURSE: {
              // Nurse: Query patients from the same hospital
              const patientInfosQuery = await listPatientInfos({
                filter: { hospitalName: { eq: localClinician.hospitalName } }
              });
              if (patientInfosQuery.data.listPatientInfos?.items) {
                allPatientInfo = patientInfosQuery.data.listPatientInfos.items;
              }
              break;
            }
            case Role.EP || Role.HF_SPECIALIST || Role.MO || Role.PHARMACIST: {
              // Other roles
              const patientInfosQuery = await listPatientInfos({});
              if (patientInfosQuery.data.listPatientInfos?.items) {
                allPatientInfo = patientInfosQuery.data.listPatientInfos.items;
              }
              break;
            }
            default:
              // Unknown role
              break;
          }
          if (allPatientInfo) {
            // Save retrieved data locally
            await Storage.setAllPatientInfo(allPatientInfo);
            patientInfoList = await Storage.getAllPatientInfo();
          }
        }
        // Device is offline: retrieves locally stored data (if any)
        else {
          const localData = await Storage.getAllPatientInfo();
          if (localData) {
            patientInfoList = localData;
          }
        }
      }
    }
    return patientInfoList;
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
  PatientAttributes.RETRIEVE_ALL_PATIENT_INFO,
  true
);

// Actionframe
export const af_RetrieveAllPatientInfoByRole = new Actionframe(
  `AF_${ActionFrameIDs.DTA.RETRIEVE_ALL_PATIENT_INFO_BY_ROLE}`,
  [rule1, rule2],
  new RetrieveAllPatientInfoByRole()
);
