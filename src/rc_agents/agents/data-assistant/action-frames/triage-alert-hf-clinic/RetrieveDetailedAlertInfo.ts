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
  AlertWithMonitoringRecords,
  MedInfoCompliants
} from "rc_agents/model";
import {
  getDetailedAlert,
  getPatientInfo,
  listMedicationInfosByPatientID,
  listReportSymptomsByDateTime,
  listReportVitalsByDateTime
} from "aws";
import { store } from "util/useRedux";
import { setFetchingAlertInfo } from "ic-redux/actions/agents/actionCreator";
import { Alert, ModelSortDirection } from "aws/API";
import { convertAlertToAlertInfo } from "util/utilityFunctions";
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
        let alertInfo:
          | AlertInfo
          | AlertWithMonitoringRecords
          | null
          | undefined;

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
          ProcedureAttributes.AT_CP_II,
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
    alertInfo.NYHAClass = patientInfo.NHYAclass;
  }

  // Get MedCompliant
  // JH-TODO-MED: New MedCompliant version

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
 * Queries the following monitoring records for the last 5 days:
 * - Symptoms reports (includes activities)
 * - Vitals reports (includes fluid intake)
 * - Medication compliants
 * - TODO: Predicted outcomes in percentage (triage) - currently only has triage value associated with an alert
 * @param alert High Risk alert
 * @returns alert with monitoring records for the last 5 days
 */
export const queryHighRiskAlertInfo = async (
  alert: Alert
): Promise<AlertWithMonitoringRecords | null> => {
  const alertInfo: AlertInfo = convertAlertToAlertInfo(alert);

  // Constructs data structure for holding records
  const alertWithMonitoringRecords: AlertWithMonitoringRecords = {
    ...alertInfo,
    symptomsReports: [],
    vitalsReports: [],
    medCompliants: []
  };

  // Gets patientInfo
  const patientInfoQuery = await getPatientInfo({
    patientID: alert.patientID
  });

  if (patientInfoQuery.data.getPatientInfo) {
    const patientInfo = patientInfoQuery.data.getPatientInfo;
    alertWithMonitoringRecords.latestBaseline = patientInfo;
  }

  // Gets date from alert dateTime
  const alertDate = new Date(alert.dateTime).toISOString();

  // Gets symptoms reports by descending order of DateTime
  const symptomsReportsQuery = await listReportSymptomsByDateTime({
    patientID: alert.patientID,
    sortDirection: ModelSortDirection.DESC
  });

  // Only gets symptoms reports of the last 5 days from the Alert's datetime
  if (symptomsReportsQuery.data.listReportSymptomsByDateTime?.items) {
    const symptomsReports =
      symptomsReportsQuery.data.listReportSymptomsByDateTime.items;
    symptomsReports.forEach((report) => {
      if (
        report?.DateTime &&
        moment(alertDate).diff(moment(new Date(report.DateTime)), "days") <= 5
      ) {
        alertWithMonitoringRecords.symptomsReports.push(report);
      }
    });
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
    vitalsReports.forEach((report) => {
      if (
        report?.DateTime &&
        moment(alertDate).diff(moment(new Date(report.DateTime)), "days") <= 5
      ) {
        alertWithMonitoringRecords.vitalsReports.push(report);
      }
    });
  }

  // Gets all medication infos of the patient
  const medInfosQuery = await listMedicationInfosByPatientID({
    patientID: alert.patientID
  });
  if (medInfosQuery.data.listMedicationInfosByPatientID?.items) {
    const medInfos = medInfosQuery.data.listMedicationInfosByPatientID.items;

    // Checks compliants of each medication info
    medInfos.forEach((medInfo) => {
      if (medInfo?.records) {
        const compliants: MedInfoCompliants = JSON.parse(medInfo.records);
        Object.entries(compliants).forEach((compliantDate) => {
          const dateString = compliantDate[0];
          if (
            moment(alertDate).diff(moment(new Date(dateString)), "days") > 5
          ) {
            // Remove records beyond the valid date range
            delete compliants[dateString];
          }
        });

        // Only store medication infos with records
        if (Object.entries(compliants).length > 0) {
          medInfo.records = JSON.stringify(compliants);
          alertWithMonitoringRecords.medCompliants.push(medInfo);
        }
      }
    });
  }

  // Alert with monitoring records should at least contains the patient's baseline
  if (alertWithMonitoringRecords.latestBaseline) {
    return alertWithMonitoringRecords;
  }

  // Otherwise returns null
  return null;
};

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP_II,
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
