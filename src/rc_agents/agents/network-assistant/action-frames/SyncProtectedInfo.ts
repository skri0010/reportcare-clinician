import {
  Actionframe,
  Activity,
  Agent,
  Precondition,
  ResettablePrecondition
} from "agents-framework";
import {
  ActionFrameIDs,
  AppAttributes,
  BeliefKeys
} from "rc_agents/clinician_framework";
import { updateClinicianProtectedInfo } from "aws/TypedAPI/updateMutations";
import { getClinicianProtectedInfo } from "aws/TypedAPI/getQueries";
import { UpdateVersionedClinicianProtectedInfoInput } from "aws/TypedAPI/versionedTypes";
import { store } from "util/useRedux";

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
      // Retrieves clinician from global state
      const localClinician = store.getState().clinicians.clinician;
      if (localClinician) {
        if (localClinician.protectedInfo) {
          // Query protectedInfo to get the latest version
          const result = await getClinicianProtectedInfo({
            clinicianID: localClinician.clinicianID
          });
          if (result.data.getClinicianProtectedInfo) {
            const latestProtectedInfo = result.data.getClinicianProtectedInfo;

            // Updated protected info should have the latest version
            const updatedProtectedInfo: UpdateVersionedClinicianProtectedInfoInput =
              {
                clinicianID: localClinician.clinicianID,
                facts: localClinician.protectedInfo.facts,
                APS: localClinician.protectedInfo.APS,
                DTA: localClinician.protectedInfo.DTA,
                UXSA: localClinician.protectedInfo.UXSA,
                NWA: localClinician.protectedInfo.NWA,
                ALA: localClinician.protectedInfo.ALA,
                MHA: localClinician.protectedInfo.MHA,
                CAM: localClinician.protectedInfo.CAM,
                version: latestProtectedInfo.version
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

// Preconditions
const rule1 = new Precondition(BeliefKeys.APP, AppAttributes.ONLINE, true);
const rule2 = new ResettablePrecondition(
  BeliefKeys.APP,
  AppAttributes.SYNC_PROTECTED_INFO,
  true
);

// Actionframe
export const af_SyncProtectedInfo = new Actionframe(
  `AF_${ActionFrameIDs.NWA.SYNC_PROTECTED_INFO}`,
  [rule1, rule2],
  new SyncProtectedInfo()
);
