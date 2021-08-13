import {
  Actionframe,
  Activity,
  Agent,
  Precondition,
  ResettablePrecondition
} from "rc_agents/framework";
import {
  ActionFrameIDs,
  AppAttributes,
  BeliefKeys
} from "rc_agents/AgentEnums";
import { AsyncStorageKeys } from "rc_agents/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateClinicianProtectedInfo } from "aws/TypedAPI/updateMutations";
import { ClinicianInfo, UpdateClinicianProtectedInfoInput } from "aws/API";
import { getClinicianProtectedInfo } from "aws/TypedAPI/getQueries";

/**
 * Class to represent the activity for syncing local updates in ClinicianProtectedInfo.
 */
class SyncProtectedInfo extends Activity {
  /**
   * Constructor for the SyncProtectedInfo class
   */
  constructor() {
    super(ActionFrameIDs.NWA.SYNC_PROTECTED_INFO);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

    try {
      // Retrieves local clinician
      const clinicianStr = await AsyncStorage.getItem(
        AsyncStorageKeys.CLINICIAN
      );
      if (clinicianStr) {
        const clinician: ClinicianInfo = JSON.parse(clinicianStr);

        if (clinician.protectedInfo) {
          // Query protectedInfo to get the latest version
          const result = await getClinicianProtectedInfo({
            clinicianID: clinician.clinicianID
          });
          if (result.data) {
            const latestProtectedInfo = result.data.getClinicianProtectedInfo;

            // Updated protected info should have the latest version
            const updatedProtectedInfo: UpdateClinicianProtectedInfoInput = {
              id: clinician.protectedInfo.id!,
              clinicianID: clinician.clinicianID,
              facts: clinician.protectedInfo.facts,
              APS: clinician.protectedInfo.APS,
              DTA: clinician.protectedInfo.DTA,
              UXSA: clinician.protectedInfo.UXSA,
              NWA: clinician.protectedInfo.NWA,
              ALA: clinician.protectedInfo.ALA,
              MHA: clinician.protectedInfo.MHA,
              owner: clinician.clinicianID,
              _version: latestProtectedInfo?._version
            };
            await updateClinicianProtectedInfo(updatedProtectedInfo);
          }
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// Rules or preconditions for activating the SyncProtectedInfo class
const rule1 = new Precondition(BeliefKeys.APP, AppAttributes.ONLINE, true);
const rule2 = new ResettablePrecondition(
  BeliefKeys.APP,
  AppAttributes.PENDING_PROTECTED_INFO_SYNC,
  true
);

// Actionframe of the SyncProtectedInfo class
export const af_SyncProtectedInfo = new Actionframe(
  `AF_${ActionFrameIDs.NWA.SYNC_PROTECTED_INFO}`,
  [rule1, rule2],
  new SyncProtectedInfo()
);
