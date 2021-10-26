import {
  Actionframe,
  Communicate,
  Agent,
  Belief,
  Precondition,
  ResettablePrecondition
} from "agents-framework";
import {
  ProcedureConst,
  Performative,
  CommonAttributes
} from "agents-framework/Enums";
import {
  ActionFrameIDs,
  AgentIDs,
  BeliefKeys,
  ClinicianAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";

/**
 * Represents the activity for requesting display of clinicians for sharing a patient.
 * This happens in Procedure Clinician Specific - Patient Sharing (CP-PS).
 */
class RequestDisplaySharingClinicians extends Communicate {
  constructor() {
    super(
      ActionFrameIDs.DTA.REQUEST_DISPLAY_SHARING_CLINICIANS,
      Performative.REQUEST,
      // Triggers DisplaySharingClinicians action frame of UXSA
      new Belief(
        BeliefKeys.CLINICIAN,
        ClinicianAttributes.DISPLAY_SHARING_CLINICIANS,
        true
      ),
      [AgentIDs.UXSA]
    );
  }

  /**
   * Perform the activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    try {
      await super.doActivity(agent, [rule3]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.CP_PS,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  AgentIDs.DTA,
  CommonAttributes.LAST_ACTIVITY,
  ActionFrameIDs.DTA.RETRIEVE_SHARING_CLINICIANS
);

const rule3 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.DISPLAY_SHARING_CLINICIANS,
  true
);

// Actionframe
export const af_RequestDisplaySharingClinicians = new Actionframe(
  `AF_${ActionFrameIDs.DTA.REQUEST_DISPLAY_SHARING_CLINICIANS}`,
  [rule1, rule2, rule3],
  new RequestDisplaySharingClinicians()
);
