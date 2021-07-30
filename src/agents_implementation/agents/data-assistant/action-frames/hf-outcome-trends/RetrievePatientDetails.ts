import Actionframe from "../../../../agent_framework/base/Actionframe";
import Activity from "../../../../agent_framework/base/Activity";
import Agent from "../../../../agent_framework/base/Agent";
import Belief from "../../../../agent_framework/base/Belief";
import Precondition from "../../../../agent_framework/base/Precondition";
import ProcedureConst from "../../../../agent_framework/const/ProcedureConst";
import { PatientDetails } from "../../../../agent_framework/model";
import agentAPI from "../../../../agent_framework/AgentAPI";
import { listActivityInfos, listReportSymptoms, listReportVitals } from "aws";
import { ActivityInfo, ReportSymptom, ReportVitals } from "aws/API";

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

    // Update Beliefs
    agent.addBelief(new Belief("Patient", "retrieveDetails", false));

    try {
      const patientId = agentAPI.getFacts().Patient?.viewDetails;

      if (patientId) {
        const activityInfoQuery = await listActivityInfos({
          filter: { patientID: { eq: patientId } }
        });
        const symptomsReportsQuery = await listReportSymptoms({
          filter: { patientID: { eq: patientId } }
        });
        const vitalsReportsQuery = await listReportVitals({
          filter: { patientID: { eq: patientId } }
        });

        const patientDetails: PatientDetails = {
          activityInfo: [],
          symptomsReports: [],
          vitalsReports: []
        };

        if (activityInfoQuery.data.listActivityInfos?.items) {
          patientDetails.activityInfo = activityInfoQuery.data.listActivityInfos
            .items as ActivityInfo[];
        }
        if (symptomsReportsQuery.data.listReportSymptoms?.items) {
          patientDetails.symptomsReports = symptomsReportsQuery.data
            .listReportSymptoms.items as ReportSymptom[];
        }
        if (vitalsReportsQuery.data.listReportVitalss?.items) {
          patientDetails.vitalsReports = vitalsReportsQuery.data
            .listReportVitalss.items as ReportVitals[];
        }

        // Update Facts
        agentAPI.addFact(new Belief("Patient", "viewDetails", null), false);
        agentAPI.addFact(
          new Belief("Patient", "details", patientDetails),
          false
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    // Update lastActivity last since RequestDetailsDisplay will be triggered by this
    agent.addBelief(new Belief(agent.getID(), "lastActivity", this.getID()));
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
