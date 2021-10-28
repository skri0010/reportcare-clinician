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
  ClinicianAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";
import { LocalStorage } from "rc_agents/storage";
import {
  AlertInfo,
  HighRiskAlertInfo,
  MedInfoCompliants
} from "rc_agents/model";
import {
  ClinicianRecordType,
  getDetailedAlert,
  getPatientInfo,
  listMedicationInfosByPatientID,
  listReportSymptomsByDateTime,
  listReportVitalsByDateTime,
  listUploadedClinicianRecordsByPatientID
} from "aws";
import { store } from "util/useRedux";
import {
  Alert,
  MedicationInfo,
  ModelSortDirection,
  ReportSymptom,
  ReportVitals
} from "aws/API";
import { convertAlertToAlertInfo } from "util/utilityFunctions";
import { setFetchingAlertInfo } from "ic-redux/actions/agents/alertActionCreator";
import moment from "moment";
import { RiskLevel } from "models/RiskLevel";

/**
 * Represents the activity for retrieving patient's information associated with an alert.
 * This happens in Procedure Triage Alert HF Clinic (AT-CP).
 */
class RetrieveDetailedAlertInfo extends Activity {
  constructor() {
    super(ActionFrameIDs.DTA.RETRIEVE_DETAILED_ALERT_INFO);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

    // Dispatch to frontend that alert info is being fetched
    store.dispatch(setFetchingAlertInfo(true));

    try {
      const facts = agentAPI.getFacts();

      // Retrieves alert from facts
      const alert: AlertInfo =
        facts[BeliefKeys.CLINICIAN]?.[ClinicianAttributes.ALERT_INFO];

      // Get online status from facts
      const isOnline: boolean = facts[BeliefKeys.APP]?.[AppAttributes.ONLINE];

      if (alert) {
        let alertInfo: AlertInfo | HighRiskAlertInfo | null | undefined;

        if (isOnline) {
          // Device is online
          // Query information associated with alert
          if (alert.riskLevel === RiskLevel.HIGH) {
            alertInfo = await queryHighRiskAlertInfo(alert);
          } else {
            const info = await queryAlertInfo(alert);
            if (info) {
              alertInfo = convertAlertToAlertInfo(info);
            }
          }

          if (alertInfo) {
            await LocalStorage.setAlertInfo(alertInfo);
          }
        } else {
          // Device is offline
          alertInfo = await LocalStorage.getAlertInfoByPatientId(
            alert.id,
            alert.patientID
          );
        }

        if (alertInfo) {
          // Update Facts
          // Store item
          agentAPI.addFact(
            new Belief(
              BeliefKeys.CLINICIAN,
              ClinicianAttributes.DETAILED_ALERT_INFO,
              alertInfo
            ),
            false
          );

          // Trigger request to Communicate to UXSA
          agent.addBelief(
            new Belief(
              BeliefKeys.CLINICIAN,
              ClinicianAttributes.DETAILED_ALERT_INFO_RETRIEVED,
              true
            )
          );
        }
      }

      // Update Facts
      // Remove item
      agentAPI.addFact(
        new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.ALERT_INFO, null),
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
          ProcedureAttributes.P_USOR_II,
          ProcedureConst.INACTIVE
        ),
        true,
        true
      );

      // Dispatch to store to indicate fetching has ended
      store.dispatch(setFetchingAlertInfo(false));
    }
  }
}

export const queryAlertInfo = async (alert: Alert): Promise<Alert | null> => {
  let alertInfo: AlertInfo = convertAlertToAlertInfo(alert);
  const alertQuery = await getDetailedAlert({ id: alert.id });

  // Get alert with full details
  if (alertQuery.data.getAlert) {
    const alertWithDetails = alertQuery.data.getAlert;
    alertInfo = convertAlertToAlertInfo(alertWithDetails);
  }

  // Get PatientInfo -> Get diagnosis and NYHA class
  const patientInfoQuery = await getPatientInfo({
    patientID: alert.patientID
  });

  if (patientInfoQuery.data.getPatientInfo) {
    const patientInfo = patientInfoQuery.data.getPatientInfo;
    alertInfo.diagnosis = patientInfo.diagnosisInfo;
    alertInfo.NYHAClass = patientInfo.NYHAclass;
  }

  // Get MedCompliant
  const medInfosQuery = await listMedicationInfosByPatientID({
    patientID: alert.patientID
  });
  if (medInfosQuery.data.listMedicationInfosByPatientID?.items) {
    const medInfos = medInfosQuery.data.listMedicationInfosByPatientID.items;

    let latestCompliantDate: string;
    let latestMedication: MedicationInfo[] = [];

    const alertDate = new Date(alert.dateTime);

    // Checks compliants of each medication info
    medInfos.forEach((medInfo) => {
      if (medInfo?.records) {
        const compliants: MedInfoCompliants = JSON.parse(medInfo.records);

        // Filters records with valid dates, i.e. recorded before alert's datetime
        const validDates = Object.entries(compliants).filter(
          (c) => alertDate >= new Date(c[0])
        );
        if (validDates.length > 0) {
          // Gets the latest date from the valid records of the current medInfo
          const currentLatestDate = validDates.reduce((a, b) => {
            return new Date(a[0]) > new Date(b[0]) ? a : b;
          });
          if (latestCompliantDate) {
            // Current latest date is the same day as the overall latest date - push medInfo
            if (
              moment(new Date(latestCompliantDate)).diff(
                moment(new Date(currentLatestDate[0]), "days")
              ) === 0
            ) {
              latestMedication.push(medInfo);
            }
            // Current latest date is after the overall latest date - update overall latest date and replace medInfo
            else if (
              new Date(currentLatestDate[0]) > new Date(latestCompliantDate)
            ) {
              // eslint-disable-next-line prefer-destructuring
              latestCompliantDate = currentLatestDate[0];
              latestMedication = [medInfo];
            }
          }
          // First valid compliant date
          else {
            // eslint-disable-next-line prefer-destructuring
            latestCompliantDate = currentLatestDate[0];
            latestMedication = [medInfo];
          }
        }
      }
    });

    if (latestMedication.length > 0) {
      alertInfo.medCompliants = latestMedication;
    }
  }

  // Queries activity associated with symptom report
  if (alertInfo.symptomReport?.ActivityInfo?.Actname) {
    alertInfo.activityDuringAlert =
      alertInfo.symptomReport.ActivityInfo.Actname;
    // Prevent storing full activity info
    delete alertInfo.symptomReport.ActivityInfo;
  }

  return alertInfo;
};

/**
 * Extension of AlertInfo for high risk alerts.
 * Only applicable to HF Specialist and EP.
 * Queries the following monitoring records for the last 5 days:
 * - Symptoms reports (includes activities)
 * - Vitals reports (includes fluid intake)
 * - Medication compliants
 * - Latest ICD/CRT record
 * - TODO: Predicted outcomes in percentage (triage) - currently only has triage value associated with an alert
 * @param alert High Risk alert
 * @returns alert with monitoring records for the last 5 days
 */
export const queryHighRiskAlertInfo = async (
  alert: Alert
): Promise<HighRiskAlertInfo | null> => {
  const alertInfo: AlertInfo = convertAlertToAlertInfo(alert);

  // Constructs data structure for holding records
  const highRiskAlertInfo: HighRiskAlertInfo = alertInfo;

  // Gets patientInfo
  const patientInfoQuery = await getPatientInfo({
    patientID: alert.patientID
  });

  if (patientInfoQuery.data.getPatientInfo) {
    const patientInfo = patientInfoQuery.data.getPatientInfo;
    highRiskAlertInfo.latestBaseline = patientInfo;
  }

  // Gets date from alert dateTime
  const alertDate = new Date(alert.dateTime);

  // Gets symptoms reports by descending order of DateTime
  const symptomReportsQuery = await listReportSymptomsByDateTime({
    patientID: alert.patientID,
    sortDirection: ModelSortDirection.DESC
  });

  // Only gets symptoms reports of the last 5 days from the Alert's datetime
  if (symptomReportsQuery.data.listReportSymptomsByDateTime?.items) {
    const symptomReports =
      symptomReportsQuery.data.listReportSymptomsByDateTime.items;
    const validSymptomReports: ReportSymptom[] = [];
    symptomReports.forEach((report) => {
      if (
        report?.DateTime &&
        alertDate >= new Date(report.DateTime) &&
        moment(alertDate).diff(moment(new Date(report.DateTime)), "days") <= 5
      ) {
        validSymptomReports.push(report);
      }
    });
    if (validSymptomReports.length > 0) {
      highRiskAlertInfo.symptomReports = validSymptomReports;
    }
  }

  // Gets vitals reports by descending order of DateTime
  const vitalsReportsQuery = await listReportVitalsByDateTime({
    patientID: alert.patientID,
    sortDirection: ModelSortDirection.DESC
  });

  // Only gets vitals reports of the last 5 days from the Alert's datetime
  if (vitalsReportsQuery.data.listReportVitalsByDateTime?.items) {
    const vitalsReports =
      vitalsReportsQuery.data.listReportVitalsByDateTime.items;
    const validVitalsReports: ReportVitals[] = [];
    vitalsReports.forEach((report) => {
      if (
        report?.DateTime &&
        alertDate >= new Date(report.DateTime) &&
        moment(alertDate).diff(moment(new Date(report.DateTime)), "days") <= 5
      ) {
        validVitalsReports.push(report);
      }
    });
    if (validVitalsReports.length > 0) {
      highRiskAlertInfo.vitalsReports = validVitalsReports;
    }
  }

  // Gets all medication infos of the patient
  const medInfosQuery = await listMedicationInfosByPatientID({
    patientID: alert.patientID
  });
  if (medInfosQuery.data.listMedicationInfosByPatientID?.items) {
    const medInfos = medInfosQuery.data.listMedicationInfosByPatientID.items;

    const validMedInfos: MedicationInfo[] = [];

    // Checks compliants of each medication info
    medInfos.forEach((medInfo) => {
      if (medInfo?.records) {
        const compliants: MedInfoCompliants = JSON.parse(medInfo.records);
        Object.entries(compliants).forEach((compliantDate) => {
          const dateString = compliantDate[0];
          if (
            alertDate >= new Date(dateString) &&
            moment(alertDate).diff(moment(new Date(dateString)), "days") > 5
          ) {
            // Remove records beyond the valid date range
            delete compliants[dateString];
          }
        });

        // Only store medication infos with records
        if (Object.entries(compliants).length > 0) {
          medInfo.records = JSON.stringify(compliants);
          validMedInfos.push(medInfo);
        }
      }
    });

    if (validMedInfos.length > 0) {
      highRiskAlertInfo.medCompliants = validMedInfos;
    }
  }

  // Gets ICD/CRT records in descending date time
  const icdCrtRecordType: ClinicianRecordType = "IcdCrt";
  const icdCrtRecordsQuery = await listUploadedClinicianRecordsByPatientID(
    {
      patientID: alert.patientID,
      filter: { type: { eq: icdCrtRecordType } },
      sortDirection: ModelSortDirection.DESC
    },
    icdCrtRecordType
  );

  if (
    icdCrtRecordsQuery.data.listUploadedClinicianRecordsByPatientID?.items &&
    icdCrtRecordsQuery.data.listUploadedClinicianRecordsByPatientID?.items
      .length > 0
  ) {
    const icdCrtRecords =
      icdCrtRecordsQuery.data.listUploadedClinicianRecordsByPatientID.items;
    // Gets the first ICD/CRT record that is uploaded before alert date
    for (let i = 0; i < icdCrtRecords.length; i += 1) {
      const icdCrt = icdCrtRecords[i];
      if (
        icdCrt?.uploadDateTime &&
        new Date(icdCrt.uploadDateTime) <= alertDate
      ) {
        highRiskAlertInfo.icdCrtRecord = icdCrt;
        break;
      }
    }
  }

  // Alert should at least contains the patient's baseline
  if (highRiskAlertInfo.latestBaseline) {
    return highRiskAlertInfo;
  }

  // Otherwise returns null
  return null;
};

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.P_USOR_II,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.RETRIEVE_DETAILED_ALERT_INFO,
  true
);

// Actionframe
export const af_RetrieveDetailedAlertInfo = new Actionframe(
  `AF_${ActionFrameIDs.DTA.RETRIEVE_DETAILED_ALERT_INFO}`,
  [rule1, rule2],
  new RetrieveDetailedAlertInfo()
);
