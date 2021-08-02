import Actionframe from "../../../agent_framework/base/Actionframe";
import Activity from "../../../agent_framework/base/Activity";
import Agent from "../../../agent_framework/base/Agent";
import Belief from "../../../agent_framework/base/Belief";
import Precondition from "../../../agent_framework/base/Precondition";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ActionFrameIDs,
  AppAttributes,
  AsyncStorageKeys,
  BeliefKeys,
  CommonAttributes
} from "agents_implementation/agent_framework/AgentEnums";
import { listPatientInfos } from "aws/TypedAPI/listQueries";
import { updatePatientInfo } from "aws/TypedAPI/updateMutations";
import { createClinicianPatientMap } from "aws/TypedAPI/createMutations";
import { PatientInfo } from "aws/API";

// LS-TODO: To be tested once ApprovePatientAssignment is working

/**
 * Class to represent the activity for syncing local approval of patient assignments.
 */
class SyncPatientAssignment extends Activity {
  /**
   * Constructor for the SyncPatientAssignment class
   */
  constructor() {
    super(ActionFrameIDs.NWA.SYNC_PATIENT_ASSIGNMENT);
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

    // Prevents the activity from being executed multiple times while assignments are being synced
    agent.addBelief(
      new Belief(
        BeliefKeys.APP,
        AppAttributes.PENDING_PATIENT_ASSIGNMENT_SYNC,
        false
      )
    );

    try {
      // Gets patientIds for locally approved patient assignments
      const patientIdsStr = await AsyncStorage.getItem(
        AsyncStorageKeys.PATIENT_ASSIGNMENTS
      );

      // Gets locally stored clinicianId
      const clinicianId = await AsyncStorage.getItem(
        AsyncStorageKeys.CLINICIAN_ID
      );

      if (patientIdsStr && clinicianId) {
        const patientIds: string[] = JSON.parse(patientIdsStr);

        patientIds.forEach(async (patientId) => {
          // Inserts into ClinicianPatientMap
          await createClinicianPatientMap({
            clinicianID: clinicianId,
            patientID: patientId,
            owner: clinicianId
          });

          // Updates patients
          const query: any = await listPatientInfos({
            filter: { patientID: { eq: patientId } }
          });
          if (query.data) {
            const results = query.data.listPatientInfos?.items;
            if (results && results.length > 0) {
              const patient: PatientInfo = results.pop();
              if (patient) {
                // Updates patient's cardiologist
                const updatePatient = await updatePatientInfo({
                  id: patient.id!,
                  cardiologist: clinicianId,
                  _version: patient._version
                });

                // Saves patient locally with patientId as key
                if (updatePatient.data) {
                  await AsyncStorage.setItem(
                    patientId,
                    JSON.stringify(updatePatient.data.updatePatientInfo)
                  );
                }
              }
            }
          }
        });

        // Removes pending patient assignments from local storage
        await AsyncStorage.removeItem(AsyncStorageKeys.PATIENT_ASSIGNMENTS);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);

      // Activity did not succeed
      agent.addBelief(
        new Belief(
          BeliefKeys.APP,
          AppAttributes.PENDING_PATIENT_ASSIGNMENT_SYNC,
          true
        )
      );
    }
  }
}

// Rules or preconditions for activating the SyncPatientAssignments class
const rule1 = new Precondition(BeliefKeys.APP, AppAttributes.ONLINE, true);
const rule2 = new Precondition(
  BeliefKeys.APP,
  AppAttributes.PENDING_PATIENT_ASSIGNMENT_SYNC,
  true
);

// Actionframe of the SyncPatientAssignments class
const af_SyncPatientAssignment = new Actionframe(
  `AF_${ActionFrameIDs.NWA.SYNC_PATIENT_ASSIGNMENT}`,
  [rule1, rule2],
  new SyncPatientAssignment()
);

export default af_SyncPatientAssignment;
