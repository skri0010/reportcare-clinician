import Actionframe from "../../../../agent_framework/base/Actionframe";
import Activity from "../../../../agent_framework/base/Activity";
import Agent from "../../../../agent_framework/base/Agent";
import Belief from "../../../../agent_framework/base/Belief";
import Precondition from "../../../../agent_framework/base/Precondition";
import {
  ActionFrameIDs,
  BeliefKeys,
  CommonAttributes,
  PatientAttributes,
  ProcedureAttributes,
  ProcedureConst
} from "agents_implementation/agent_framework/AgentEnums";
import agentAPI from "agents_implementation/agent_framework/AgentAPI";
import { Alert } from "agents_implementation/agent_framework/model";
import { ReportSymptom, ReportVitals } from "aws/API";

/**
 * Class to represent the activity for receiving alert.
 * This happens in Procedure Triage Alert HF Clinic (AT-CP).
 */
class ReceiveAlert extends Activity {
  /**
   * Constructor for the ReceiveAlert class
   */
  constructor() {
    super(ActionFrameIDs.MHA.RECEIVE_ALERT);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    super.doActivity(agent);

    // Update beliefs to stop the procedure from repeating
    agent.addBelief(
      new Belief(BeliefKeys.PATIENT, PatientAttributes.INCOMING_ALERT, false)
    );
    agent.addBelief(
      new Belief(agent.getID(), CommonAttributes.LAST_ACTIVITY, this.getID())
    );

    try {
      // LS-TODO: Retrieve alert information and pack into Alert
      const mockVitalsReport: ReportVitals = {
        __typename: "ReportVitals",
        BPDi: "50",
        BPSys: "200",
        DateTime: "2021-04-13T09:20:47.251Z",
        Humidity: null,
        NoSteps: "100",
        OxySat: "200",
        SymptomId: "",
        Temperature: null,
        Weight: "99",
        id: "37e7e083-b61f-4d34-891a-89bc1c6f6cc3",
        owner: "ccf",
        patientID: "CCF"
      };

      const mockSymptomsReport: ReportSymptom = {
        __typename: "ReportSymptom",
        ActId: "f465eca0-f625-4dc9-a71e-522a00bcf25f",
        DateTime: "2021-04-13T07:08:41.102Z",
        Name: "Breathlessness",
        Severity: "Much less difficulty breathing",
        id: "5d72b8de-2f68-4915-afa2-2beae592cded",
        owner: "ccf",
        patientID: "CCF"
      };

      const mockAlert: Alert = {
        patientId: mockVitalsReport.patientID!,
        vitalsReport: mockVitalsReport,
        symptomsReport: mockSymptomsReport,
        dateTime: "2021-04-13T07:08:41.102Z"
      };

      // Broadcast alert to facts to be sorted by SortAlert action frame of ALA.
      agentAPI.addFact(
        new Belief(BeliefKeys.PATIENT, PatientAttributes.ALERT, mockAlert),
        false
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// Rules or preconditions for activating the ReceiveAlert class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  BeliefKeys.PATIENT,
  PatientAttributes.INCOMING_ALERT,
  true
);

// Actionframe of the ReceiveAlert class
const af_ReceiveAlert = new Actionframe(
  `AF_${ActionFrameIDs.MHA.RECEIVE_ALERT}`,
  [rule1, rule2],
  new ReceiveAlert()
);

export default af_ReceiveAlert;
