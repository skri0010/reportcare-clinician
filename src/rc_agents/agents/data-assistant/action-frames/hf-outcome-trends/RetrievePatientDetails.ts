import {
  Actionframe,
  Activity,
  Agent,
  Belief,
  Precondition,
  ResettablePrecondition,
  setRetryLaterTimeout
} from "rc_agents/framework";
import {
  ActionFrameIDs,
  AppAttributes,
  BeliefKeys,
  PatientAttributes,
  ProcedureAttributes,
  ProcedureConst
} from "rc_agents/AgentEnums";
import { PatientDetails } from "rc_agents/model";
import agentAPI from "rc_agents/framework/AgentAPI";
import {
  listActivityInfosByPatientID,
  listReportSymptomsByPatientID,
  listReportVitalsByPatientID
} from "aws";
import {
  ActivityInfo,
  PatientInfo,
  ReportSymptom,
  ReportVitals
} from "aws/API";
import { Storage } from "rc_agents/storage";
import { setFetchingPatientDetails } from "ic-redux/actions/agents/actionCreator";
import { store } from "util/useRedux";

/**
 * Class to represent an activity for retrieving details of a specific patient.
 * This happens in Procedure HF Outcome Trends (HF-OTP-II).
 */
class RetrievePatientDetails extends Activity {
  constructor() {
    super(ActionFrameIDs.DTA.RETRIEVE_PATIENT_DETAILS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    // Reset preconditions
    await super.doActivity(agent, [rule2]);

    // Dispatch to store to indicate fetching
    store.dispatch(setFetchingPatientDetails(true));

    try {
      // Get patient id from facts
      const patientInfo: PatientInfo =
        agentAPI.getFacts()[BeliefKeys.PATIENT]?.[
          PatientAttributes.PATIENT_TO_VIEW_DETAILS
        ];
      // Get online status from facts
      const isOnline =
        agentAPI.getFacts()[BeliefKeys.APP]?.[AppAttributes.ONLINE];

      if (patientInfo) {
        const patientId = patientInfo.patientID;
        const patientDetails: PatientDetails = {
          patientInfo: patientInfo,
          activityInfos: {},
          symptomReports: {},
          vitalsReports: {}
        };
        let patientDetailsRetrieved = false;

        // Device is online
        if (isOnline) {
          // Query for activity infos, symptom reports and vitals reports
          const activityInfoQuery = await listActivityInfosByPatientID({
            patientID: patientId
          });
          const symptomReportsQuery = await listReportSymptomsByPatientID({
            patientID: patientId
          });
          const vitalsReportsQuery = await listReportVitalsByPatientID({
            patientID: patientId
          });

          // Store activity infos in patient details
          if (activityInfoQuery.data.listActivityInfosByPatientID?.items) {
            const infos =
              activityInfoQuery.data.listActivityInfosByPatientID.items;

            infos.forEach((info: ActivityInfo | null) => {
              if (info) {
                patientDetails.activityInfos[info.id] = info;
              }
            });
          }

          // Store symptom reports in patient details
          if (symptomReportsQuery.data.listReportSymptomsByPatientID?.items) {
            const symptomReports =
              symptomReportsQuery.data.listReportSymptomsByPatientID?.items;

            symptomReports.forEach((symptom: ReportSymptom | null) => {
              if (symptom) {
                const dateKey = new Date(symptom.DateTime).toLocaleDateString();
                if (!patientDetails.symptomReports[dateKey]) {
                  patientDetails.symptomReports[dateKey] = [];
                }
                patientDetails.symptomReports[dateKey].push(symptom);
              }
            });
          }

          // Store vitals reports in patient details
          if (vitalsReportsQuery.data.listReportVitalsByPatientID?.items) {
            const vitalsReports =
              vitalsReportsQuery.data.listReportVitalsByPatientID?.items;

            vitalsReports.forEach((vitals: ReportVitals | null) => {
              if (vitals) {
                const dateKey = new Date(vitals.DateTime).toLocaleDateString();
                if (!patientDetails.vitalsReports[dateKey]) {
                  patientDetails.vitalsReports[dateKey] = [];
                }
                patientDetails.vitalsReports[dateKey].push(vitals);
              }
            });
          }

          // Save retrieved patient
          await Storage.setPatientDetails(patientDetails);
          patientDetailsRetrieved = true;
        }
        // Device is offline: Retrieve locally stored data (if any)
        else if (!isOnline) {
          // Get local patients' details
          const localPatientDetails = await Storage.getPatientDetails(
            patientInfo.patientID
          );

          if (localPatientDetails) {
            agentAPI.addFact(
              new Belief(
                BeliefKeys.PATIENT,
                PatientAttributes.PATIENT_DETAILS,
                localPatientDetails
              ),
              false
            );
            patientDetailsRetrieved = true;
          }
        }

        if (patientDetailsRetrieved) {
          // Update Facts and Beliefs
          // Store items
          agentAPI.addFact(
            new Belief(
              BeliefKeys.PATIENT,
              PatientAttributes.PATIENT_DETAILS,
              patientDetails
            ),
            false
          );
          // Trigger request to Communicate to USXA
          agent.addBelief(
            new Belief(
              BeliefKeys.PATIENT,
              PatientAttributes.PATIENT_DETAILS_RETRIEVED,
              true
            )
          );
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      // Set to retry later
      setRetryLaterTimeout(() => {
        agent.addBelief(
          new Belief(
            BeliefKeys.PATIENT,
            PatientAttributes.RETRIEVE_PATIENT_DETAILS,
            true
          )
        );
        agentAPI.addFact(
          new Belief(
            BeliefKeys.PROCEDURE,
            ProcedureAttributes.HF_OTP_II,
            ProcedureConst.ACTIVE
          )
        );
      });

      // Update Facts
      // End the procedure
      agentAPI.addFact(
        new Belief(
          BeliefKeys.PROCEDURE,
          ProcedureAttributes.HF_OTP_II,
          ProcedureConst.INACTIVE
        )
      );
      // Dispatch to store to indicate fetching has ended
      store.dispatch(setFetchingPatientDetails(false));
    }
  }
}

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.HF_OTP_II,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.PATIENT,
  PatientAttributes.RETRIEVE_PATIENT_DETAILS,
  true
);

// Actionframe
export const af_RetrievePatientDetails = new Actionframe(
  `AF_${ActionFrameIDs.DTA.RETRIEVE_PATIENT_DETAILS}`,
  [rule1, rule2],
  new RetrievePatientDetails()
);
