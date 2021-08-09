import {
  Actionframe,
  Activity,
  Agent,
  Belief,
  Precondition,
  ResettablePrecondition
} from "rc_agents/framework";
import {
  ProcedureConst,
  BeliefKeys,
  ClinicianAttributes,
  ProcedureAttributes,
  AgentIDs,
  ActionFrameIDs
} from "rc_agents/AgentEnums";
import { AsyncStorageKeys } from "rc_agents/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import agentAPI from "rc_agents/framework/AgentAPI";
import { getClinicianInfo } from "aws";
import { store } from "util/useRedux";
import {
  setProcedureOngoing,
  setProcedureSuccessful
} from "ic-redux/actions/agents/actionCreator";

/**
 * Class to represent the activity for retrieving clinician's entry data.
 * This happens when an existing user signs in.
 */
class RetrieveEntryData extends Activity {
  constructor() {
    super(ActionFrameIDs.DTA.RETRIEVE_ENTRY_DATA);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule1]);

    try {
      const clinicianUsername =
        agentAPI.getFacts()[BeliefKeys.CLINICIAN]?.[
          ClinicianAttributes.USERNAME
        ];

      if (clinicianUsername) {
        // Retrieve user's entry in DynamoDB table
        const query = await getClinicianInfo({
          clinicianID: clinicianUsername
        });

        if (query.data && query.data.getClinicianInfo) {
          const clinician = query.data.getClinicianInfo;
          // Merges retrieved facts into current facts
          if (
            clinician.protectedInfo?.facts &&
            Object.entries(JSON.parse(clinician.protectedInfo?.facts)).length >
              0
          ) {
            agentAPI.mergeFacts(JSON.parse(clinician.protectedInfo?.facts));
          }

          // Merges retrieved beliefs of each agent into current beliefs
          agentAPI.getAgents().forEach((existingAgent) => {
            switch (existingAgent.getID()) {
              case AgentIDs.APS: {
                if (
                  clinician.protectedInfo?.APS &&
                  Object.entries(JSON.parse(clinician.protectedInfo?.APS))
                    .length > 0
                ) {
                  existingAgent.mergeBeliefs(
                    JSON.parse(clinician.protectedInfo?.APS)
                  );
                }
                break;
              }
              case AgentIDs.DTA: {
                if (
                  clinician.protectedInfo?.DTA &&
                  Object.entries(JSON.parse(clinician.protectedInfo?.DTA))
                    .length > 0
                ) {
                  existingAgent.mergeBeliefs(
                    JSON.parse(clinician.protectedInfo?.DTA)
                  );
                }
                break;
              }
              case AgentIDs.UXSA: {
                if (
                  clinician.protectedInfo?.UXSA &&
                  Object.entries(JSON.parse(clinician.protectedInfo?.UXSA))
                    .length > 0
                ) {
                  existingAgent.mergeBeliefs(
                    JSON.parse(clinician.protectedInfo?.UXSA)
                  );
                }
                break;
              }
              case AgentIDs.NWA: {
                if (
                  clinician.protectedInfo?.NWA &&
                  Object.entries(JSON.parse(clinician.protectedInfo?.NWA))
                    .length > 0
                ) {
                  existingAgent.mergeBeliefs(
                    JSON.parse(clinician.protectedInfo?.NWA)
                  );
                }
                break;
              }
              case AgentIDs.ALA: {
                if (
                  clinician.protectedInfo?.ALA &&
                  Object.entries(JSON.parse(clinician.protectedInfo?.ALA))
                    .length > 0
                ) {
                  existingAgent.mergeBeliefs(
                    JSON.parse(clinician.protectedInfo?.ALA)
                  );
                }
                break;
              }
              case AgentIDs.MHA: {
                if (
                  clinician.protectedInfo?.MHA &&
                  Object.entries(JSON.parse(clinician.protectedInfo?.MHA))
                    .length > 0
                ) {
                  existingAgent.mergeBeliefs(
                    JSON.parse(clinician.protectedInfo?.MHA)
                  );
                }
                break;
              }
              default: {
                break;
              }
            }
          });

          // Stores clinicianID and clinician locally
          await AsyncStorage.multiSet([
            [AsyncStorageKeys.CLINICIAN_ID, clinician.clinicianID],
            [AsyncStorageKeys.CLINICIAN, JSON.stringify(clinician)]
          ]);

          // Removes username from facts
          agentAPI.addFact(
            new Belief(
              BeliefKeys.CLINICIAN,
              ClinicianAttributes.USERNAME,
              null
            ),
            false
          );

          // Dispatch to front end that sign in was successful
          store.dispatch(setProcedureSuccessful(true));
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    // Update Facts
    // Stops the procedure
    agentAPI.addFact(
      new Belief(
        BeliefKeys.PROCEDURE,
        ProcedureAttributes.ADC,
        ProcedureConst.INACTIVE
      ),
      true,
      true
    );

    // Dispatch to front end that procedure has been completed
    store.dispatch(setProcedureOngoing(false));
  }
}

// Rules or preconditions for activating the RetrieveEntryData class
const rule1 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.RETRIEVE_ENTRY,
  true
);
const rule2 = new Precondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.CONFIGURED,
  true
);
const rule3 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.ADC,
  ProcedureConst.ACTIVE
);

// Action Frame for RetrieveEntryData class
export const af_RetrieveEntryData = new Actionframe(
  `AF_${ActionFrameIDs.DTA.RETRIEVE_ENTRY_DATA}`,
  [rule1, rule2, rule3],
  new RetrieveEntryData()
);
