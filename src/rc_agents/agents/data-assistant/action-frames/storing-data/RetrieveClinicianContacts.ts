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
  ActionFrameIDs,
  AppAttributes,
  BeliefKeys,
  ClinicianAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";
import { LocalStorage } from "rc_agents/storage";
import { listClinicianInfos } from "aws";
import { store } from "util/useRedux";
import { ClinicianInfo } from "aws/API";
import { setFetchingClinicianContacts } from "ic-redux/actions/agents/clinicianActionCreator";

/**
 * Class to represent the activity for retrieving clinician contacts.
 * This happens in Procedure Storing Data (SRD-IV) Clinician Procedure
 */
class RetrieveClinicianContacts extends Activity {
  /**
   * Constructor for the RetrieveAlerts class
   */
  constructor() {
    // change to retrieve contacts
    super(ActionFrameIDs.DTA.RETRIEVE_CLINICIAN_CONTACTS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

    // Dispatch to store to indicate fetching has ended
    store.dispatch(setFetchingClinicianContacts(true));

    let clinicians: ClinicianInfo[] | null | undefined;

    try {
      // Get locally stored clinicianId
      const clinicianId = await LocalStorage.getClinicianID();
      // Get online status from facts
      const isOnline =
        agentAPI.getFacts()[BeliefKeys.APP]?.[AppAttributes.ONLINE];

      if (clinicianId) {
        if (isOnline) {
          const query = await listClinicianInfos({});

          if (query.data.listClinicianInfos?.items) {
            clinicians = query.data.listClinicianInfos.items as ClinicianInfo[];
            // save data locally
            await LocalStorage.setClinicianContacts(clinicians);
          }
        } else {
          // device is offline
          clinicians = await LocalStorage.getClinicianContacts();
        }
      }

      if (clinicians) {
        // add clinician list to facts
        agentAPI.addFact(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.CLINICIAN_CONTACTS,
            clinicians
          ),
          false
        );
        // Trigger request to Communicate to USXA
        agent.addBelief(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.CLINICIAN_CONTACTS_RETRIEVED,
            true
          )
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.SRD_IV,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.RETRIEVE_CLINICIAN_CONTACTS,
  true
);

// Actionframe
export const af_RetrieveClinicianContacts = new Actionframe(
  `AF_${ActionFrameIDs.DTA.RETRIEVE_CLINICIAN_CONTACTS}`,
  [rule1, rule2],
  new RetrieveClinicianContacts()
);
