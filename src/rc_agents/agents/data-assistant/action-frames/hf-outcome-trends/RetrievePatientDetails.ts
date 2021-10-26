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
  PatientAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";
import { MedInput, PatientDetails } from "rc_agents/model";
import {
  listActivityInfosByPatientID,
  listReportSymptomsByPatientID,
  listReportVitalsByPatientID,
  listMedicationInfosByPatientID,
  listUploadedClinicianRecordsByPatientID
} from "aws";
import {
  ActivityInfo,
  ClinicianRecord,
  MedicationInfo,
  ModelSortDirection,
  PatientInfo,
  ReportSymptom,
  ReportVitals
} from "aws/API";
import { LocalStorage } from "rc_agents/storage";
import { store } from "util/useRedux";
import { setFetchingPatientDetails } from "ic-redux/actions/agents/patientActionCreator";
import { sortIcdCrtRecordsByDescendingDateTime } from "util/utilityFunctions";

/**
 * Represents the activity for retrieving details of a specific patient.
 * This happens in Procedure HF Outcome Trends (HF-OTP-II).
 */
class RetrievePatientDetails extends Activity {
  constructor() {
    super(ActionFrameIDs.DTA.RETRIEVE_PATIENT_DETAILS);
  }

  /**
   * Performs the activity
   * @param {Agent} agent current agent
   */
  async doActivity(agent: Agent): Promise<void> {
    // Reset preconditions
    await super.doActivity(agent, [rule2]);

    // Dispatch to store to indicate fetching
    store.dispatch(setFetchingPatientDetails(true));

    try {
      // Get patient info from facts
      const patientInfo: PatientInfo =
        agentAPI.getFacts()[BeliefKeys.PATIENT]?.[
          PatientAttributes.PATIENT_TO_VIEW_DETAILS
        ];

      // Get online status from facts
      const isOnline =
        agentAPI.getFacts()[BeliefKeys.APP]?.[AppAttributes.ONLINE];

      // Get retrieve patient details locally from facts
      const retrieveLocally =
        agentAPI.getFacts()[BeliefKeys.PATIENT]?.[
          PatientAttributes.RETRIEVE_PATIENT_DETAILS_LOCALLY
        ];

      if (patientInfo) {
        const patientId = patientInfo.patientID;
        let patientDetails: PatientDetails = {
          patientInfo: patientInfo,
          activityInfos: {},
          symptomReports: {},
          vitalsReports: {},
          medicationInfo: [],
          medicalRecords: [],
          icdCrtRecords: []
        };
        let patientDetailsRetrieved = false;

        // Device is online
        if (isOnline && !retrieveLocally) {
          // Query for activity infos, symptom reports and vitals reports
          const activityInfoPromise = listActivityInfosByPatientID({
            patientID: patientId
          });
          const symptomReportsPromise = listReportSymptomsByPatientID({
            patientID: patientId
          });
          const vitalsReportsPromise = listReportVitalsByPatientID({
            patientID: patientId
          });
          const medicationInfoPromise = listMedicationInfosByPatientID({
            patientID: patientId
          });
          const medicalRecordsPromise = listUploadedClinicianRecordsByPatientID(
            {
              patientID: patientId,
              sortDirection: ModelSortDirection.DESC
            },
            "Medical"
          );

          const icdCrtRecordsPromise = listUploadedClinicianRecordsByPatientID(
            {
              patientID: patientId,
              sortDirection: ModelSortDirection.DESC
            },
            "IcdCrt"
          );

          // Save network delay by waiting all for all the promises at the same time
          const [
            activityInfoQuery,
            symptomReportsQuery,
            vitalsReportsQuery,
            medicationInfoQuery,
            medicalRecordsQuery,
            icdCrtRecordsQuery
          ] = await Promise.all([
            activityInfoPromise,
            symptomReportsPromise,
            vitalsReportsPromise,
            medicationInfoPromise,
            medicalRecordsPromise,
            icdCrtRecordsPromise
          ]);

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
                const localSymptomsReports =
                  patientDetails.symptomReports[dateKey];
                if (localSymptomsReports) {
                  localSymptomsReports.push(symptom);
                  patientDetails.symptomReports[dateKey] = localSymptomsReports;
                } else {
                  patientDetails.symptomReports[dateKey] = [symptom];
                }
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
                const localVitalsReports =
                  patientDetails.vitalsReports[dateKey];
                if (localVitalsReports) {
                  localVitalsReports.push(vitals);
                  patientDetails.vitalsReports[dateKey] = localVitalsReports;
                } else {
                  patientDetails.vitalsReports[dateKey] = [vitals];
                }
              }
            });
          }

          if (medicationInfoQuery.data.listMedicationInfosByPatientID?.items) {
            const medicationInfos =
              medicationInfoQuery.data.listMedicationInfosByPatientID?.items;
            medicationInfos.forEach((medication: MedicationInfo | null) => {
              if (medication) {
                const localMed: MedInput = {
                  id: medication.id,
                  name: medication.name,
                  dosage: `${medication.dosage}`,
                  frequency: `${medication.frequency}`,
                  patientID: medication.patientID,
                  records: medication.records,
                  active: medication.active
                };
                patientDetails.medicationInfo.push(localMed);
              }
            });
          }
          // Store medical records in patient details
          if (
            medicalRecordsQuery.data.listUploadedClinicianRecordsByPatientID
              ?.items &&
            medicalRecordsQuery.data.listUploadedClinicianRecordsByPatientID
              ?.items.length > 0
          ) {
            patientDetails.medicalRecords =
              medicalRecordsQuery.data.listUploadedClinicianRecordsByPatientID.items.filter(
                (item) => !item?._deleted // Return undeleted items. This is a problem with DataStore
              ) as ClinicianRecord[];
          }

          // Store ICD/CRT records in patient details
          if (
            icdCrtRecordsQuery.data.listUploadedClinicianRecordsByPatientID
              ?.items &&
            icdCrtRecordsQuery.data.listUploadedClinicianRecordsByPatientID
              ?.items.length > 0
          ) {
            patientDetails.icdCrtRecords =
              icdCrtRecordsQuery.data.listUploadedClinicianRecordsByPatientID.items.filter(
                (item) => !item?._deleted // Return undeleted items. This is a problem with DataStore
              ) as ClinicianRecord[];
          }

          // Save retrieved patient
          await LocalStorage.setPatientDetails(patientDetails);
          patientDetailsRetrieved = true;
        }
        // Device is offline: Retrieve locally stored data (if any)
        else {
          // Get local patients' details
          const localPatientDetails = await LocalStorage.getPatientDetails(
            patientInfo.patientID
          );
          patientDetailsRetrieved = true;
          if (localPatientDetails?.activityInfos) {
            patientDetails.activityInfos = localPatientDetails.activityInfos;
          }

          if (localPatientDetails?.symptomReports) {
            patientDetails.symptomReports = localPatientDetails.symptomReports;
          }

          if (localPatientDetails?.medicationInfo) {
            patientDetails.medicationInfo = localPatientDetails.medicationInfo;
          }

          if (localPatientDetails?.vitalsReports) {
            patientDetails.vitalsReports = localPatientDetails.vitalsReports;
          }
          if (localPatientDetails) {
            // Sorts ICD/CRT records in descending order of dateTime
            localPatientDetails.icdCrtRecords =
              sortIcdCrtRecordsByDescendingDateTime(
                localPatientDetails.icdCrtRecords
              );

            patientDetails = localPatientDetails;
            patientDetailsRetrieved = true;
          }
        }

        // Trigger request to Communicate to USXA
        if (patientDetailsRetrieved) {
          // Update Facts
          // Store items
          agentAPI.addFact(
            new Belief(
              BeliefKeys.PATIENT,
              PatientAttributes.PATIENT_DETAILS,
              patientDetails
            ),
            false
          );
          // Trigger request to Communicate to UXSA
          agent.addBelief(
            new Belief(
              BeliefKeys.PATIENT,
              PatientAttributes.PATIENT_DETAILS_RETRIEVED,
              true
            )
          );
        }
      }

      // Removes patientInfo from facts
      agentAPI.addFact(
        new Belief(
          BeliefKeys.PATIENT,
          PatientAttributes.PATIENT_TO_VIEW_DETAILS,
          null
        ),
        false
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);

      // Update Facts
      // End the procedure
      agentAPI.addFact(
        new Belief(
          BeliefKeys.PROCEDURE,
          ProcedureAttributes.HF_OTP_II,
          ProcedureConst.INACTIVE
        ),
        true,
        true
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
