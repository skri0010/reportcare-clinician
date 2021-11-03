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
import { PatientDetails } from "rc_agents/model";
import {
  listReportSymptomsByPatientID,
  listReportVitalsByPatientID,
  listMedicationInfosByPatientID,
  listUploadedClinicianRecordsByPatientID,
  listPhysicalByDateTime,
  ClinicianRecordTypeConst
} from "aws";
import {
  ClinicianRecord,
  MedicationInfo,
  ModelSortDirection,
  PatientInfo,
  Physical,
  ReportSymptom,
  ReportVitals
} from "aws/API";
import { LocalStorage } from "rc_agents/storage";
import { store } from "util/useRedux";
import { setFetchingPatientDetails } from "ic-redux/actions/agents/patientActionCreator";
import { getNonNullItemsFromList } from "util/utilityFunctions";

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

    let patientDetails: PatientDetails | null | undefined;

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

        // Device is online
        if (isOnline && !retrieveLocally) {
          const symptomReportsPromise = listReportSymptomsByPatientID({
            patientID: patientId
          });
          const vitalsReportsPromise = listReportVitalsByPatientID({
            patientID: patientId
          });
          const physicalsPromise = listPhysicalByDateTime({
            patientID: patientId,
            sortDirection: ModelSortDirection.DESC
          });
          const medicationInfoPromise = listMedicationInfosByPatientID({
            patientID: patientId
          });
          const clinicianRecordsPromise =
            listUploadedClinicianRecordsByPatientID({
              patientID: patientId,
              sortDirection: ModelSortDirection.DESC
            });
          // Await promises
          const [
            symptomReportsQuery,
            vitalsReportsQuery,
            physicalsQuery,
            medicationInfoQuery,
            clinicianRecordsQuery
          ] = await Promise.all([
            symptomReportsPromise,
            vitalsReportsPromise,
            physicalsPromise,
            medicationInfoPromise,
            clinicianRecordsPromise
          ]);

          // Process patient details
          patientDetails = this.processPatientDetails({
            patientInfo: patientInfo,
            symptomReportList: getNonNullItemsFromList<ReportSymptom | null>(
              symptomReportsQuery.data.listReportSymptomsByPatientID?.items
            ),
            vitalsReportList: getNonNullItemsFromList<ReportVitals | null>(
              vitalsReportsQuery.data.listReportVitalsByPatientID?.items
            ),
            physicalList: getNonNullItemsFromList<Physical | null>(
              physicalsQuery.data.listPhysicalsByDateTime?.items
            ),
            medicationInfoList: getNonNullItemsFromList<MedicationInfo | null>(
              medicationInfoQuery.data.listMedicationInfosByPatientID?.items
            ),
            clinicianRecordList:
              getNonNullItemsFromList<ClinicianRecord | null>(
                clinicianRecordsQuery.data
                  .listUploadedClinicianRecordsByPatientID?.items
              )
          });

          // Save retrieved patient details
          await LocalStorage.setPatientDetails(patientDetails);
        }
        // Device is offline: Retrieve locally stored data (if any)
        else {
          // Get local patients' details
          patientDetails = await LocalStorage.getPatientDetails(
            patientInfo.patientID
          );
        }

        // Trigger request to Communicate to USXA
        if (patientDetails) {
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

  processPatientDetails: (parameters: {
    patientInfo: PatientInfo;
    symptomReportList: ReportSymptom[];
    vitalsReportList: ReportVitals[];
    physicalList: Physical[];
    medicationInfoList: MedicationInfo[];
    clinicianRecordList: ClinicianRecord[];
  }) => PatientDetails = ({
    patientInfo,
    symptomReportList,
    vitalsReportList,
    physicalList,
    medicationInfoList,
    clinicianRecordList
  }) => {
    const patientDetails: PatientDetails = {
      patientInfo: patientInfo,
      symptomReports: {},
      vitalsReports: {},
      physicals: {},
      medicationInfos: [],
      medicalRecords: [],
      icdCrtRecords: []
    };

    // Store symptom reports
    symptomReportList.forEach((symptom) => {
      const dateKey = new Date(symptom.dateTime).toLocaleDateString();
      const existingList = patientDetails.symptomReports[dateKey];
      if (existingList) {
        existingList.push(symptom);
        patientDetails.symptomReports[dateKey] = existingList;
      } else {
        patientDetails.symptomReports[dateKey] = [symptom];
      }
    });

    // Store vitals reports
    vitalsReportList.forEach((vitals) => {
      const dateKey = new Date(vitals.dateTime).toLocaleDateString();
      const existingList = patientDetails.vitalsReports[dateKey];
      if (existingList) {
        existingList.push(vitals);
        patientDetails.vitalsReports[dateKey] = existingList;
      } else {
        patientDetails.vitalsReports[dateKey] = [vitals];
      }
    });

    // Store physicals
    physicalList.forEach((physical) => {
      const dateKey = new Date(physical.dateTime).toLocaleDateString();
      patientDetails.physicals[dateKey] = physical;
    });

    // Store medication info
    patientDetails.medicationInfos = medicationInfoList.map((medication) => {
      return {
        id: medication.id,
        dosage: medication.dosage.toString(),
        frequency: medication.frequency.toString(),
        name: medication.name,
        patientID: medication.patientID
      };
    });

    // Store Medical records
    patientDetails.medicalRecords = clinicianRecordList.filter(
      (item) => item.type === ClinicianRecordTypeConst.Medical
    );

    // // Store IcdCrt records
    patientDetails.medicalRecords = clinicianRecordList.filter(
      (item) => item.type === ClinicianRecordTypeConst.IcdCrt
    );

    return patientDetails;
  };
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
