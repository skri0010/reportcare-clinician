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
  ClinicianAttributes,
  ProcedureAttributes,
  ActionFrameIDs
} from "rc_agents/clinician_framework";
import {
  AsyncStorageKeys,
  AsyncStorageType,
  LocalStorage
} from "rc_agents/storage";
import { createClinicianInfo, createClinicianProtectedInfo } from "aws";
import { store } from "util/useRedux";
import {
  setProcedureOngoing,
  setProcedureSuccessful
} from "ic-redux/actions/agents/actionCreator";

/**
 * Class to represent the activity for storing clinician's entry data.
 * This happens in Procedure App Device Configuration (ADC).
 */
class StoreEntryData extends Activity {
  constructor() {
    super(ActionFrameIDs.DTA.STORE_ENTRY_DATA);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule1]);

    try {
      // Gets sign up details and username from facts
      const data: AsyncStorageType[AsyncStorageKeys.SIGN_UP_DETAILS] =
        agentAPI.getFacts()[BeliefKeys.CLINICIAN]?.[
          ClinicianAttributes.ENTRY_DATA
        ];

      if (data) {
        const clinicianID = data.username;
        // Create new ClinicianInfo
        const response = await createClinicianInfo({
          name: data.name,
          hospitalName: data.hospitalName,
          clinicianID: clinicianID,
          role: data.role
        });

        const newClinicianInfo = response.data.createClinicianInfo;
        if (newClinicianInfo) {
          // Create new ClinicianProtectedInfo data
          const createProtectedInfoResponse =
            await createClinicianProtectedInfo({
              clinicianID: clinicianID,
              facts: "",
              APS: "",
              DTA: "",
              UXSA: "",
              NWA: "",
              ALA: "",
              MHA: ""
            });

          const newProtectedInfo =
            createProtectedInfoResponse.data.createClinicianProtectedInfo;
          if (newProtectedInfo) {
            newClinicianInfo.protectedInfo = newProtectedInfo;
          }

          // Stores clinicianID and clinician locally
          await LocalStorage.setClinicianID(newClinicianInfo.clinicianID);
          await LocalStorage.setClinician(newClinicianInfo);

          // Removes sign up details and username from local storage
          await LocalStorage.removeItem(AsyncStorageKeys.SIGN_UP_DETAILS);
          await LocalStorage.removeItem(AsyncStorageKeys.USERNAME);

          // Dispatch to front end that sign in was successful
          store.dispatch(setProcedureSuccessful(true));
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    // Update Facts
    // Removes sign up details from facts
    agentAPI.addFact(
      new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.ENTRY_DATA, null),
      false
    );
    // Stops the procedure
    agentAPI.addFact(
      new Belief(
        BeliefKeys.PROCEDURE,
        ProcedureAttributes.ADC,
        ProcedureConst.INACTIVE
      )
    );
    // Prevents RetrieveEntryData from being triggered if the procedure is still active
    agentAPI.addFact(
      new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.CONFIGURED, true),
      true,
      true
    );

    // Dispatch to front end that procedure has been completed
    store.dispatch(setProcedureOngoing(false));
  }
}

// Preconditions
const rule1 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.RETRIEVE_ENTRY,
  true
);
const rule2 = new Precondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.CONFIGURED,
  false
);
const rule3 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.ADC,
  ProcedureConst.ACTIVE
);

// Actionframe
export const af_StoreEntryData = new Actionframe(
  `AF_${ActionFrameIDs.DTA.STORE_ENTRY_DATA}`,
  [rule1, rule2, rule3],
  new StoreEntryData()
);
