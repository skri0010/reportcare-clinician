import { Belief } from "agents-framework";
import { getClinicianProtectedInfo, updateClinicianProtectedInfo } from "aws";
import {
  UpdateClinicianProtectedInfoInput,
  ClinicianProtectedInfo
} from "aws/API";
import { AgentIDs, AppAttributes, BeliefKeys } from "./index";
import { Storage } from "../storage";
import AgentManagement from "agents-framework/management/AgentManagement";
import { ClinicianAgent } from "./ClinicianAgent";

/**
 * Base class for management of active agents.
 */
export class ClinicianAgentManagement extends AgentManagement {
  /**
   * Retrieve saved state of facts from the database
   */
  override async factFromDB(): Promise<void> {
    let factsSet = false;
    let protectedInfo: ClinicianProtectedInfo | null | undefined;

    try {
      // Retrieves local clinician
      const localClinician = await Storage.getClinician();
      if (localClinician) {
        // Device is online
        if (this.facts[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          const result = await getClinicianProtectedInfo({
            clinicianID: localClinician.clinicianID
          });
          if (result.data.getClinicianProtectedInfo) {
            protectedInfo = result.data.getClinicianProtectedInfo;

            // Updates local storage
            localClinician.protectedInfo = protectedInfo;
            await Storage.setClinician(localClinician);
          }
        } else {
          // Device is offline
          protectedInfo = localClinician.protectedInfo;
        }

        if (protectedInfo) {
          const dbFacts = protectedInfo.facts;
          if (dbFacts && Object.entries(JSON.parse(dbFacts)).length > 0) {
            this.facts = JSON.parse(dbFacts);
            factsSet = true;
          }
        }
      }

      if (!factsSet) {
        this.facts = {};
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  /**
   * Get all the registered agents
   */
  override getAgents(): ClinicianAgent[] {
    const registeredAgents: ClinicianAgent[] = [];
    this.agents.forEach((agent) => {
      if (agent instanceof ClinicianAgent) {
        registeredAgents.push(agent);
      }
    });
    return registeredAgents;
  }

  /**
   * Add fact to system
   * @param {Belief} fact - fact(belief) to be inserted
   * @param {Boolean} broadcast - whether fact is to be broadcasted
   * @param {Boolean} updateDb - whether the local beliefs and facts should be written to database
   */
  override async addFact(
    fact: Belief,
    broadcast: boolean = true,
    updateDb: boolean = false
  ): Promise<void> {
    try {
      super.addFact(fact, broadcast);
      this.facts = JSON.parse(JSON.stringify(this.facts));

      if (updateDb) {
        await this.updateDbStates();
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }

  /**
   * Merge incoming facts into current facts.
   * This happen when an existing user signs in.
   * @param {Belief} facts
   */
  mergeFacts(facts: Belief): void {
    Object.entries(facts).forEach(([key, innerObj]) => {
      if (!(key in this.facts)) {
        // Insert fact if it does not exist
        this.facts[key] = innerObj;
      } else {
        // Replace with fact if it exists
        Object.entries(innerObj).forEach(([attribute, value]) => {
          this.facts[key][attribute] = value;
        });
      }
    });
  }

  /**
   * Writes all local beliefs and facts to the database.
   * Usually called at the end of a series of agents' actions.
   */
  async updateDbStates(): Promise<void> {
    const isOnline: boolean | null =
      this.facts[BeliefKeys.APP]?.[AppAttributes.ONLINE];

    const localClinician = await Storage.getClinician();
    if (localClinician) {
      let protectedInfo: ClinicianProtectedInfo | undefined;

      if (isOnline) {
        // Device is online - get online data
        const clinicianProtectedInfo = await getClinicianProtectedInfo({
          clinicianID: localClinician.clinicianID
        });
        if (clinicianProtectedInfo.data.getClinicianProtectedInfo) {
          protectedInfo = clinicianProtectedInfo.data.getClinicianProtectedInfo;
          localClinician.protectedInfo = protectedInfo;
        }
      } else if (localClinician.protectedInfo) {
        // Device is offline - use local data
        protectedInfo = localClinician.protectedInfo;
      }

      if (protectedInfo) {
        const updatedProtectedInfo: UpdateClinicianProtectedInfoInput = {
          id: protectedInfo.id!,
          clinicianID: localClinician.clinicianID,
          facts: protectedInfo.facts,
          APS: protectedInfo.APS,
          DTA: protectedInfo.DTA,
          UXSA: protectedInfo.UXSA,
          NWA: protectedInfo.NWA,
          ALA: protectedInfo.ALA,
          MHA: protectedInfo.MHA,
          owner: localClinician.clinicianID,
          _version: protectedInfo._version
        };

        // Updates facts and beliefs of each agent
        updatedProtectedInfo.facts = JSON.stringify(this.facts);

        // JH-TODO: Document what's going on here
        this.agents.forEach((agent) => {
          switch (agent.getID()) {
            case AgentIDs.APS: {
              const updatedBeliefs = JSON.stringify(agent.getBeliefs());
              updatedProtectedInfo[AgentIDs.APS] = updatedBeliefs;
              if (localClinician.protectedInfo) {
                localClinician.protectedInfo[AgentIDs.APS] = updatedBeliefs;
              }
              break;
            }
            case AgentIDs.DTA: {
              const updatedBeliefs = JSON.stringify(agent.getBeliefs());
              updatedProtectedInfo[AgentIDs.DTA] = updatedBeliefs;
              if (localClinician.protectedInfo) {
                localClinician.protectedInfo[AgentIDs.DTA] = updatedBeliefs;
              }
              break;
            }
            case AgentIDs.UXSA: {
              const updatedBeliefs = JSON.stringify(agent.getBeliefs());
              updatedProtectedInfo[AgentIDs.UXSA] = updatedBeliefs;
              if (localClinician.protectedInfo) {
                localClinician.protectedInfo[AgentIDs.UXSA] = updatedBeliefs;
              }
              break;
            }
            case AgentIDs.NWA: {
              const updatedBeliefs = JSON.stringify(agent.getBeliefs());
              updatedProtectedInfo[AgentIDs.NWA] = updatedBeliefs;
              if (localClinician.protectedInfo) {
                localClinician.protectedInfo[AgentIDs.NWA] = updatedBeliefs;
              }
              break;
            }
            case AgentIDs.ALA: {
              const updatedBeliefs = JSON.stringify(agent.getBeliefs());
              updatedProtectedInfo[AgentIDs.ALA] = updatedBeliefs;
              if (localClinician.protectedInfo) {
                localClinician.protectedInfo[AgentIDs.ALA] = updatedBeliefs;
              }
              break;
            }
            case AgentIDs.MHA: {
              const updatedBeliefs = JSON.stringify(agent.getBeliefs());
              updatedProtectedInfo[AgentIDs.MHA] = updatedBeliefs;
              if (localClinician.protectedInfo) {
                localClinician.protectedInfo[AgentIDs.MHA] = updatedBeliefs;
              }
              break;
            }
            default: {
              break;
            }
          }
        });

        if (isOnline) {
          await updateClinicianProtectedInfo(updatedProtectedInfo);
        } else {
          const agentNWA = this.getAgent(AgentIDs.NWA);
          if (agentNWA) {
            agentNWA.addBelief(
              new Belief(
                BeliefKeys.APP,
                AppAttributes.SYNC_PROTECTED_INFO,
                true
              )
            );
          }
        }

        // Updates local storage
        await Storage.setClinician(localClinician);
      }
    }
  }
}
