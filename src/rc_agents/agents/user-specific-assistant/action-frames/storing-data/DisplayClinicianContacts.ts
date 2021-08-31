import {
  Actionframe,
  Agent,
  Belief,
  Activity,
  Precondition,
  ResettablePrecondition
} from "agents-framework";
import { ProcedureConst } from "agents-framework/Enums";
import { agentAPI } from "rc_agents/clinician_framework/ClinicianAgentAPI";
import {
  ActionFrameIDs,
  BeliefKeys,
  ClinicianAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";
import { store } from "util/useRedux";
import {
  setClinicianContacts,
  setFetchingClinicianContacts
} from "ic-redux/actions/agents/actionCreator";

/**
 * Class to represent an activity for display of clinician contacts
 * This happens in Procedure Storing Data (SRD-IV) Clinician Procedure
 */
class DisplayClinicianContacts extends Activity {
  constructor() {
    super(ActionFrameIDs.UXSA.DISPLAY_CLINICIAN_CONTACTS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    // Reset preconditions
    await super.doActivity(agent, [rule2]);

    const clinicians =
      agentAPI.getFacts()[BeliefKeys.CLINICIAN]?.[
        ClinicianAttributes.CLINICIAN_CONTACTS
      ];

    if (clinicians) {
      // Dispatch to store retrieved clinician contacts
      store.dispatch(setClinicianContacts(clinicians));

      // Update Facts
      // Remove item
      agentAPI.addFact(
        new Belief(
          BeliefKeys.CLINICIAN,
          ClinicianAttributes.CLINICIAN_CONTACTS,
          null
        ),
        false
      );
    }

    // Update Facts
    // End the procedure
    agentAPI.addFact(
      new Belief(
        BeliefKeys.PROCEDURE,
        ProcedureAttributes.SRD_IV,
        ProcedureConst.INACTIVE
      )
    );

    // Dispatch to store to indicate fetching has ended
    store.dispatch(setFetchingClinicianContacts(false));
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
  ClinicianAttributes.CLINICIAN_CONTACTS_RETRIEVED,
  true
);

// Actionframe
export const af_DisplayClinicianContacts = new Actionframe(
  `AF_${ActionFrameIDs.UXSA.DISPLAY_CLINICIAN_CONTACTS}`,
  [rule1, rule2],
  new DisplayClinicianContacts()
);
