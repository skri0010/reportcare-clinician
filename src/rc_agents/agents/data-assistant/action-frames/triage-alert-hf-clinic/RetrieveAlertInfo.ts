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
  ProcedureAttributes,
  setRetryLaterTimeout
} from "rc_agents/clinician_framework";
import { Storage } from "rc_agents/storage";
import { AlertInfo } from "rc_agents/model";
import { getFullAlert, getPatientInfo } from "aws";
import { store } from "util/useRedux";
import { setFetchingAlertInfo } from "ic-redux/actions/agents/actionCreator";
import { Alert } from "aws/API";
import { convertAlertToAlertInfo } from "util/utilityFunctions";

/**
 * Class to represent an activity for retrieving patient's information associated with an alert.
 * This happens in Procedure Triage Alert HF Clinic (AT-CP).
 */
class RetrieveAlertInfo extends Activity {
  constructor() {
    super(ActionFrameIDs.DTA.RETRIEVE_ALERT_INFO);
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
        let alertInfo: AlertInfo | null | undefined;

        if (isOnline) {
          // Device is online
          // Query information associated with alert
          const info = await queryAlertInfo(alert);
          if (info) {
            alertInfo = convertAlertToAlertInfo(info);
            await Storage.setAlertInfo(alertInfo);
          }
        } else {
          // Device is offline
          alertInfo = await Storage.getAlertInfoByPatientId(
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
              ClinicianAttributes.ALERT_INFO,
              alertInfo
            ),
            false
          );

          // Trigger request to Communicate to USXA
          agent.addBelief(
            new Belief(
              BeliefKeys.CLINICIAN,
              ClinicianAttributes.ALERT_INFO_RETRIEVED,
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
            ClinicianAttributes.RETRIEVE_ALERT_INFO,
            true
          )
        );
        agentAPI.addFact(
          new Belief(
            BeliefKeys.PROCEDURE,
            ProcedureAttributes.AT_CP_II,
            ProcedureConst.ACTIVE
          )
        );
      });

      // Update Facts
      // End the procedure
      agentAPI.addFact(
        new Belief(
          BeliefKeys.PROCEDURE,
          ProcedureAttributes.AT_CP_II,
          ProcedureConst.INACTIVE
        )
      );

      // Dispatch to store to indicate fetching has ended
      store.dispatch(setFetchingAlertInfo(false));
    }
  }
}

export const queryAlertInfo = async (alert: Alert): Promise<Alert | null> => {
  let alertInfo: AlertInfo = convertAlertToAlertInfo(alert);
  const alertQuery = await getFullAlert({ id: alert.id });

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

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP_II,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.RETRIEVE_ALERT_INFO,
  true
);

// Actionframe
export const af_RetrieveAlertInfo = new Actionframe(
  `AF_${ActionFrameIDs.DTA.RETRIEVE_ALERT_INFO}`,
  [rule1, rule2],
  new RetrieveAlertInfo()
);
