import Actionframe from "../../../../agent_framework/base/Actionframe";
import Activity from "../../../../agent_framework/base/Activity";
import Agent from "../../../../agent_framework/base/Agent";
import Belief from "../../../../agent_framework/base/Belief";
import Precondition from "../../../../agent_framework/base/Precondition";
import { DataStore } from "@aws-amplify/datastore";
import {
  ActivityInfo,
  ReportSymptom,
  ReportVitals
} from "../../../../../aws/models";
import ProcedureConst from "../../../../agent_framework/const/ProcedureConst";
import { PatientDetails } from "../../../../agent_framework/model";
import agentAPI from "../../../../agent_framework/AgentAPI";

/**
 * Class to represent an activity for retrieving details of a specific patient.
 * This happens in Procedure HF Outcome Trends (HF-OTP-II).
 */
class RetrievePatientDetails extends Activity {
  constructor() {
    super("RetrievePatientDetails");
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent);
    try {
      const patientId = agent.getBeliefs().Patient?.viewDetails;

      if (patientId) {
        const activityInfoQuery = await DataStore.query(ActivityInfo, (c) =>
          c.patientID("eq", patientId)
        );
        const symptomsReportsQuery = await DataStore.query(ReportSymptom, (c) =>
          c.patientID("eq", patientId)
        );
        const vitalsReportsQuery = await DataStore.query(ReportVitals, (c) =>
          c.patientID("eq", patientId)
        );

        const patientDetails: PatientDetails = {
          activityInfo: activityInfoQuery,
          symptomsReports: symptomsReportsQuery,
          vitalsReports: vitalsReportsQuery
        };

        // Update Beliefs
        agent.addBelief(new Belief("Patient", "retrieveDetails", false));
        agent.addBelief(new Belief("Patient", "viewDetails", null));
        agent.addBelief(
          new Belief(agent.getID(), "lastActivity", this.getID())
        );

        // Update Facts
        agentAPI.addFact(
          new Belief("Patient", "details", patientDetails),
          false
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// Preconditions for activating the RetrievePatientDetails class
const rule1 = new Precondition("Procedure", "HF-OTP-II", ProcedureConst.ACTIVE);
const rule2 = new Precondition("Patient", "retrieveDetails", true);

// Action Frame for RetrievePatientDetails class
const af_RetrievePatientDetails = new Actionframe(
  "AF_RetrievePatientDetails",
  [rule1, rule2],
  new RetrievePatientDetails()
);

export default af_RetrievePatientDetails;
