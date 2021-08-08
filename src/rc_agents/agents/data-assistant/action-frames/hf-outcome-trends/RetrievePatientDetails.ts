import {
  Actionframe,
  Activity,
  Agent,
  Belief,
  Precondition,
  ResettablePrecondition
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
import { listActivityInfosByPatientID, listReportSymptomsByPatientID, listReportVitalsByPatientID } from "aws";
import { ActivityInfo, ReportSymptom, ReportVitals } from "aws/API";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    await super.doActivity(agent, [rule2]);

    try {
      // Gets patientId from facts
      const patientId =
        agentAPI.getFacts()[BeliefKeys.PATIENT]?.[
          PatientAttributes.VIEW_DETAILS
        ];
      const isOnline =
        agentAPI.getFacts()[BeliefKeys.APP]?.[AppAttributes.ONLINE];

      const patientDetails: PatientDetails = {
        activityInfo: [],
        symptomsReports: [],
        vitalsReports: []
      };

      if (patientId && isOnline) {
        // Device is online
        const activityInfoQuery = await listActivityInfosByPatientID({patientID: patientId});

        const symptomsReportsQuery = await listReportSymptomsByPatientID({patientID: patientId});

        const vitalsReportsQuery = await listReportVitalsByPatientID({ patientID: patientId }
        );

        if (activityInfoQuery.data.listActivityInfosByPatientID?.items) {
          patientDetails.activityInfo = activityInfoQuery.data.listActivityInfosByPatientID
            .items as ActivityInfo[];
        }
        if (symptomsReportsQuery.data.listReportSymptomsByPatientID?.items) {
          patientDetails.symptomsReports = symptomsReportsQuery.data
            .listReportSymptomsByPatientID.items as ReportSymptom[];
        }

        if (vitalsReportsQuery.data.listReportVitalsByPatientID?.items) {
          patientDetails.vitalsReports = vitalsReportsQuery.data
            .listReportVitalsByPatientID.items as ReportVitals[];
        }

        // Saves retrieved details locally with patientId as key
        await AsyncStorage.setItem(patientId, JSON.stringify(patientDetails));

        agentAPI.addFact(
          new Belief(
            BeliefKeys.PATIENT,
            PatientAttributes.DETAILS,
            patientDetails
          ),
          false
        );
      } else if (patientId && !isOnline) {
        // Device is offline: retrieves a locally stored patient if any
        const localPatientStr = await AsyncStorage.getItem(patientId);
        if (localPatientStr) {
          const patient: PatientDetails = JSON.parse(localPatientStr);
          patientDetails.activityInfo = patient.activityInfo;
          patientDetails.symptomsReports = patient.symptomsReports;
          patientDetails.vitalsReports = patient.vitalsReports;

          agentAPI.addFact(
            new Belief(
              BeliefKeys.PATIENT,
              PatientAttributes.DETAILS,
              patientDetails
            ),
            false
          );
        }
      }

      // Update Facts
      // Removes current attribute from facts
      agentAPI.addFact(
        new Belief(BeliefKeys.PATIENT, PatientAttributes.VIEW_DETAILS, null),
        false
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// Preconditions for activating the RetrievePatientDetails class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.HF_OTP_II,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.PATIENT,
  PatientAttributes.RETRIEVE_DETAILS,
  true
);

// Action Frame for RetrievePatientDetails class
export const af_RetrievePatientDetails = new Actionframe(
  `AF_${ActionFrameIDs.DTA.RETRIEVE_PATIENT_DETAILS}`,
  [rule1, rule2],
  new RetrievePatientDetails()
);
