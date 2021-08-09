import {
  Actionframe,
  Activity,
  Agent,
  Belief,
  Precondition
} from "rc_agents/framework";
import {
  ProcedureConst,
  BeliefKeys,
  ClinicianAttributes,
  CommonAttributes,
  ProcedureAttributes,
  AppAttributes,
  ActionFrameIDs
} from "rc_agents/AgentEnums";
import { AsyncStorageKeys } from "rc_agents/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Role, getClinicianInfo } from "aws";
import agentAPI from "rc_agents/framework/AgentAPI";
import { ClinicianInfo } from "aws/API";

/**
 * Class to represent an activity for retrieving role of user for retrieving patients.
 * This happens in Procedure HF Outcome Trends (HF-OTP-I).
 */
class RetrieveRole extends Activity {
  constructor() {
    super(ActionFrameIDs.UXSA.RETRIEVE_ROLE);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent);

    // Update Beliefs
    agent.addBelief(
      new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.RETRIEVE_ROLE, false)
    );
    agent.addBelief(
      new Belief(agent.getID(), CommonAttributes.LAST_ACTIVITY, this.getID())
    );

    const role = await this.queryRole();

    // Update Facts
    agentAPI.addFact(
      new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.ROLE, role),
      false
    );
  }

  /**
   * Queries role of clinician
   * @returns A role in string if valid, otherwise undefined
   */
  // eslint-disable-next-line class-methods-use-this
  async queryRole(): Promise<string | null> {
    const roles: string[] = Object.values(Role);

    try {
      // Retrieves local clinician
      const clinicianStr = await AsyncStorage.getItem(
        AsyncStorageKeys.CLINICIAN
      );

      // Checks internet connection state
      const isOnline =
        agentAPI.getFacts()[BeliefKeys.APP]?.[AppAttributes.ONLINE];

      if (clinicianStr) {
        const localClinician: ClinicianInfo = JSON.parse(clinicianStr);
        if (localClinician && isOnline) {
          // Device is online
          const query = await getClinicianInfo({
            clinicianID: localClinician.clinicianID
          });
          if (query.data) {
            const clinician = query.data.getClinicianInfo;
            if (clinician && clinician.role) {
              // Updates local storage
              await AsyncStorage.mergeItem(
                AsyncStorageKeys.CLINICIAN,
                JSON.stringify(clinician)
              );
              if (roles.includes(clinician.role)) {
                return clinician.role;
              }
            }
          }
        } else if (localClinician && !isOnline) {
          // Device is offline
          if (localClinician.role && roles.includes(localClinician.role)) {
            return localClinician.role;
          }
        }
      }
      return null;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      return null;
    }
  }
}

// Preconditions for activating the RetrieveRole class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.HF_OTP_I,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.RETRIEVE_ROLE,
  true
);

// Action Frame for RetrieveRole class
export const af_RetrieveRole = new Actionframe(
  `AF_${ActionFrameIDs.UXSA.RETRIEVE_ROLE}`,
  [rule1, rule2],
  new RetrieveRole()
);
