import Actionframe from "../../../../agent_framework/base/Actionframe";
import Activity from "../../../../agent_framework/base/Activity";
import Agent from "../../../../agent_framework/base/Agent";
import Belief from "../../../../agent_framework/base/Belief";
import Precondition from "../../../../agent_framework/base/Precondition";
import {
  ActionFrameIDs,
  BeliefKeys,
  ClinicianAttributes,
  CommonAttributes,
  ProcedureAttributes,
  ProcedureConst
} from "agents_implementation/agent_framework/AgentEnums";
import agentAPI from "agents_implementation/agent_framework/AgentAPI";
import { Alert } from "aws/API";
import { AlertColorCode } from "agents_implementation/agent_framework/model";

// LS-TODO: To be revised.
// NOTE: This file is currently unused.

/**
 * Class to represent the activity for sorting alerts received from MHA into the appropriate categories.
 * This happens in Procedure Triage Alert HF Clinic (AT-CP).
 */
class SortAlert extends Activity {
  /**
   * Constructor for the SortAlert class
   */
  constructor() {
    super(ActionFrameIDs.ALA.SORT_ALERTS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent);

    // Update beliefs to stop the procedure from repeating
    agent.addBelief(
      new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.SORT_ALERTS, false)
    );
    agent.addBelief(
      new Belief(agent.getID(), CommonAttributes.LAST_ACTIVITY, this.getID())
    );

    try {
      const alerts: Alert[] =
        agentAPI.getFacts()[BeliefKeys.CLINICIAN]?.[
          ClinicianAttributes.ALERTS_TO_SORT
        ];

      if (alerts) {
        // Sorts the alerts
        const sortedAlerts: {
          highRisk: Alert[];
          mediumRisk: Alert[];
          lowRisk: Alert[];
          unassignedRisk: Alert[];
        } = {
          highRisk: [],
          mediumRisk: [],
          lowRisk: [],
          unassignedRisk: []
        };

        // Push each alert into the appropriate list according to color code
        alerts.forEach((alert) => {
          switch (alert.colorCode) {
            case AlertColorCode.HIGH:
              sortedAlerts.highRisk.push(alert);
              break;
            case AlertColorCode.MEDIUM:
              sortedAlerts.mediumRisk.push(alert);
              break;
            case AlertColorCode.LOW:
              sortedAlerts.lowRisk.push(alert);
              break;
            case AlertColorCode.UNASSIGNED:
              sortedAlerts.unassignedRisk.push(alert);
              break;
            default:
              break;
          }
        });

        // Adds sorted alerts to facts to be used by DTA for retrieving alerts information
        agentAPI.addFact(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.SORTED_ALERTS,
            sortedAlerts
          ),
          false
        );

        // Removes alerts to sort from facts
        agentAPI.addFact(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.ALERTS_TO_SORT,
            null
          ),
          false
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// Rules or preconditions for activating the SortAlert class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.SORT_ALERTS,
  true
);

// Actionframe of the SortAlert class
const af_SortAlert = new Actionframe(
  `AF_${ActionFrameIDs.ALA.SORT_ALERTS}`,
  [rule1, rule2],
  new SortAlert()
);

export default af_SortAlert;
