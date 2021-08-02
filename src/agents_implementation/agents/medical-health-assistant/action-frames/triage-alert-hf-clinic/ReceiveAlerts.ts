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
import { ReportSymptom, ReportVitals, Alert } from "aws/API";
import { AlertColorCode } from "agents_implementation/agent_framework/model";

// LS-TODO: To be revised regarding communication between MHA agents of patient and clinician

/**
 * Class to represent the activity for receiving alerts.
 * This happens in Procedure Triage Alert HF Clinic (AT-CP).
 */
class ReceiveAlerts extends Activity {
  /**
   * Constructor for the ReceiveAlerts class
   */
  constructor() {
    super(ActionFrameIDs.MHA.RECEIVE_ALERTS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    super.doActivity(agent);

    // Update beliefs to stop the procedure from repeating
    agent.addBelief(
      new Belief(BeliefKeys.PATIENT, PatientAttributes.INCOMING_ALERTS, false)
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
        Temperature: null,
        Weight: "99",
        id: "37e7e083-b61f-4d34-891a-89bc1c6f6cc3",
        owner: "ccf",
        patientID: "CCF",
        _version: 1,
        _lastChangedAt: 0,
        createdAt: "",
        updatedAt: ""
      };

      const mockSymptomsReport: ReportSymptom = {
        __typename: "ReportSymptom",
        ActId: "f465eca0-f625-4dc9-a71e-522a00bcf25f",
        DateTime: "2021-04-13T07:08:41.102Z",
        Name: "Breathlessness",
        Severity: "Much less difficulty breathing",
        id: "5d72b8de-2f68-4915-afa2-2beae592cded",
        owner: "ccf",
        patientID: "CCF",
        _version: 1,
        _lastChangedAt: 0,
        createdAt: "",
        updatedAt: ""
      };

      const mockAlert: Alert = {
        __typename: "Alert",
        id: "",
        summary: "",
        patientID: mockVitalsReport.patientID!,
        vitalsReportID: mockVitalsReport.id,
        vitalsReport: mockVitalsReport,
        symptomReportID: mockSymptomsReport.id,
        symptomReport: mockSymptomsReport,
        dateTime: "2021-04-13T07:08:41.102Z",
        colorCode: AlertColorCode.HIGH,
        completed: false,
        owner: "",
        _version: 1,
        _lastChangedAt: 0,
        createdAt: "",
        updatedAt: ""
      };

      // Broadcast alert to facts to be sorted by SortAlerts action frame of ALA.
      agentAPI.addFact(
        new Belief(
          BeliefKeys.PATIENT,
          PatientAttributes.ALERTS_TO_SORT,
          mockAlert
        ),
        false
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// Rules or preconditions for activating the ReceiveAlerts class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  BeliefKeys.PATIENT,
  PatientAttributes.INCOMING_ALERTS,
  true
);

// Actionframe of the ReceiveAlerts class
const af_ReceiveAlerts = new Actionframe(
  `AF_${ActionFrameIDs.MHA.RECEIVE_ALERTS}`,
  [rule1, rule2],
  new ReceiveAlerts()
);

export default af_ReceiveAlerts;
