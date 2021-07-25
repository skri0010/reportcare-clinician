import Actionframe from "../../../agent_framework/base/Actionframe";
import Activity from "../../../agent_framework/base/Activity";
import Agent from "../../../agent_framework/base/Agent";
import Belief from "../../../agent_framework/base/Belief";
import Precondition from "../../../agent_framework/base/Precondition";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AppAttributes,
  AsyncStorageKeys,
  BeliefKeys,
  CommonAttributes
} from "agents_implementation/agent_framework/AgentEnums";
import { updateClinicianProtectedInfo } from "aws/TypedAPI/updateMutations";
import { ClinicianInfo, UpdateClinicianProtectedInfoInput } from "aws/API";

/**
 * Class to represent the activity for syncing local updates in ClinicianProtectedInfo.
 */
class SyncProtectedInfo extends Activity {
  /**
   * Constructor for the SyncProtectedInfo class
   */
  constructor() {
    super("SyncProtectedInfo");
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    super.doActivity(agent);

    agent.addBelief(
      new Belief(agent.getID(), CommonAttributes.LAST_ACTIVITY, this.getID())
    );

    try {
      // Retrieves local clinician
      const clinicianStr = await AsyncStorage.getItem(
        AsyncStorageKeys.CLINICIAN
      );
      if (clinicianStr) {
        const clinician: ClinicianInfo = JSON.parse(clinicianStr);
        if (clinician.protectedInfo) {
          const updatedProtectedInfo: UpdateClinicianProtectedInfoInput = {
            clinicianID: clinician.clinicianID,
            facts: clinician.protectedInfo.facts,
            APS: clinician.protectedInfo.APS,
            DTA: clinician.protectedInfo.DTA,
            UXSA: clinician.protectedInfo.UXSA,
            owner: clinician.clinicianID,
            _version: clinician.protectedInfo._version
          };
          await updateClinicianProtectedInfo(updatedProtectedInfo);
        }

        agent.addBelief(
          new Belief(
            BeliefKeys.APP,
            AppAttributes.PENDING_PROTECTED_INFO_SYNC,
            false
          )
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// Rules or preconditions for activating the SyncProtectedInfo class
const rule1 = new Precondition(BeliefKeys.APP, AppAttributes.ONLINE, true);
const rule2 = new Precondition(
  BeliefKeys.APP,
  AppAttributes.PENDING_PROTECTED_INFO_SYNC,
  true
);

// Actionframe of the SyncProtectedInfo class
const af_SyncProtectedInfo = new Actionframe(
  "AF_SyncProtectedInfo",
  [rule1, rule2],
  new SyncProtectedInfo()
);

export default af_SyncProtectedInfo;
