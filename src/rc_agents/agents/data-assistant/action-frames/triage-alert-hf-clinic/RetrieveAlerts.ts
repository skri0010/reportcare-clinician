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
import { listCompletedRiskAlerts, listPendingRiskAlerts } from "aws";
import {
  AlertInfo,
  FetchAlertsMode,
  AlertsCount,
  AlertStatus
} from "rc_agents/model";
import { store } from "util/useRedux";
import {
  setFetchingAlerts,
  setFetchingCompletedAlerts,
  setFetchingPendingAlerts
} from "ic-redux/actions/agents/actionCreator";
import { Alert } from "aws/API";
import { RiskLevel } from "models/RiskLevel";
import { convertAlertsToAlertInfos } from "util/utilityFunctions";

/**
 * Class to represent the activity for retrieving alerts.
 * This happens in Procedure Triage Alert HF Clinic (AT-CP).
 */
class RetrieveAlerts extends Activity {
  constructor() {
    super(ActionFrameIDs.DTA.RETRIEVE_ALERTS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);
    const facts = agentAPI.getFacts();
    // Get fetch alert mode from facts
    const fetchAlertsMode: FetchAlertsMode | undefined =
      facts[BeliefKeys.CLINICIAN]?.[ClinicianAttributes.FETCH_ALERTS_MODE];

    // Get online status from facts
    const isOnline: boolean = facts[BeliefKeys.APP]?.[AppAttributes.ONLINE];

    // Dispatch to store to indicate fetching
    if (fetchAlertsMode) {
      this.dispatchFetching(fetchAlertsMode, true);
    }

    try {
      if (fetchAlertsMode) {
        let pendingAlertInfos: AlertInfo[] | undefined | null;
        let completedAlertInfos: AlertInfo[] | undefined | null;

        if (isOnline) {
          // Device is online
          let pendingAlerts: Alert[] | undefined;
          let completedAlerts: Alert[] | undefined;

          if (fetchAlertsMode === FetchAlertsMode.ALL) {
            // Retrieve all pending and completed alerts
            pendingAlerts = await this.getAlertsByFetchAlertsMode(
              FetchAlertsMode.PENDING
            );
            completedAlerts = await this.getAlertsByFetchAlertsMode(
              FetchAlertsMode.COMPLETED
            );
          } else if (fetchAlertsMode === FetchAlertsMode.PENDING) {
            // Retrieve either pending or completed alerts
            pendingAlerts = await this.getAlertsByFetchAlertsMode(
              fetchAlertsMode
            );
            if (pendingAlerts) {
              pendingAlertInfos = convertAlertsToAlertInfos(pendingAlerts);
              // Store pending AlertInfo[]
              await Storage.setAlertInfos(pendingAlertInfos);
            }
          } else if (fetchAlertsMode === FetchAlertsMode.COMPLETED) {
            completedAlerts = await this.getAlertsByFetchAlertsMode(
              fetchAlertsMode
            );
            if (completedAlerts) {
              completedAlertInfos = convertAlertsToAlertInfos(completedAlerts);
              // Store completed AlertInfo[]
              await Storage.setAlertInfos(completedAlertInfos);
            }
          }
        } else {
          // Device is offline
          // eslint-disable-next-line no-lonely-if
          if (fetchAlertsMode === FetchAlertsMode.ALL) {
            pendingAlertInfos = await Storage.getPendingAlertInfos();
            completedAlertInfos = await Storage.getCompletedAlertInfos();
          } else if (fetchAlertsMode === FetchAlertsMode.PENDING) {
            pendingAlertInfos = await Storage.getPendingAlertInfos();
          } else if (fetchAlertsMode === FetchAlertsMode.COMPLETED) {
            completedAlertInfos = await Storage.getCompletedAlertInfos();
          }
        }

        if (pendingAlertInfos || completedAlertInfos) {
          // Update Facts
          // Store items
          if (pendingAlertInfos) {
            // Pending AlertInfo[]
            agentAPI.addFact(
              new Belief(
                BeliefKeys.CLINICIAN,
                ClinicianAttributes.PENDING_ALERTS,
                pendingAlertInfos
              ),
              false
            );

            // Pending alerts count
            const pendingAlertsCount = this.getAlertsCount(pendingAlertInfos);
            agentAPI.addFact(
              new Belief(
                BeliefKeys.CLINICIAN,
                ClinicianAttributes.PENDING_ALERTS_COUNT,
                pendingAlertsCount
              ),
              false
            );
          }

          if (completedAlertInfos) {
            agentAPI.addFact(
              new Belief(
                BeliefKeys.CLINICIAN,
                ClinicianAttributes.COMPLETED_ALERTS,
                completedAlertInfos
              ),
              false
            );
          }

          // Trigger request to Communicate to USXA
          agent.addBelief(
            new Belief(
              BeliefKeys.CLINICIAN,
              ClinicianAttributes.ALERTS_RETRIEVED,
              true
            )
          );
        }

        // Remove item
        agentAPI.addFact(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.FETCH_ALERTS_MODE,
            null
          ),
          false
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      // Set to retry later
      setRetryLaterTimeout(() => {
        agent.addBelief(
          new Belief(
            BeliefKeys.PATIENT,
            ClinicianAttributes.RETRIEVE_ALERTS,
            true
          )
        );
        agentAPI.addFact(
          new Belief(
            BeliefKeys.PROCEDURE,
            ProcedureAttributes.AT_CP_I,
            ProcedureConst.ACTIVE
          )
        );
      });

      // Update Facts
      // End the procedure
      agentAPI.addFact(
        new Belief(
          BeliefKeys.PROCEDURE,
          ProcedureAttributes.AT_CP_I,
          ProcedureConst.INACTIVE
        )
      );

      // Dispatch to store to indicate fetching has ended
      if (fetchAlertsMode) {
        this.dispatchFetching(fetchAlertsMode, false);
      }
    }
  }

  // Query based on fetch alerts mode
  getAlertsByFetchAlertsMode = async (
    fetchAlertsMode: FetchAlertsMode
  ): Promise<Alert[] | undefined> => {
    let alerts: Alert[] | undefined;

    // Query
    if (fetchAlertsMode === FetchAlertsMode.PENDING) {
      const query = await listPendingRiskAlerts({
        pending: AlertStatus.PENDING
      });
      // Process pending risk alerts
      if (query.data.listPendingRiskAlerts?.items) {
        const { items } = query.data.listPendingRiskAlerts;
        if (items) {
          items.forEach((item) => {
            if (item) {
              if (!alerts) {
                alerts = [];
              }
              alerts.push(item);
            }
          });
        }
      }
    } else {
      const query = await listCompletedRiskAlerts({
        completed: AlertStatus.COMPLETED
      });
      // Process completed risk alerts
      if (query.data.listCompletedRiskAlerts?.items) {
        const { items } = query.data.listCompletedRiskAlerts;
        if (items) {
          items.forEach((item) => {
            if (item) {
              if (!alerts) {
                alerts = [];
              }
              alerts.push(item);
            }
          });
        }
      }
    }

    return alerts;
  };

  // Dispatch to Redux store based on fetch alerts mode
  // eslint-disable-next-line class-methods-use-this
  dispatchFetching(fetchAlertsMode: FetchAlertsMode, value: boolean) {
    if (fetchAlertsMode === FetchAlertsMode.PENDING) {
      store.dispatch(setFetchingPendingAlerts(value));
    } else if (fetchAlertsMode === FetchAlertsMode.COMPLETED) {
      store.dispatch(setFetchingCompletedAlerts(value));
    } else if (fetchAlertsMode === FetchAlertsMode.ALL) {
      store.dispatch(setFetchingAlerts(value));
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getAlertsCount(alerts: AlertInfo[]): AlertsCount {
    // Pending alerts count
    const alertsCount: AlertsCount = {
      highRisk: 0,
      mediumRisk: 0,
      lowRisk: 0,
      unassignedRisk: 0
    };

    alerts.forEach((alert) => {
      // Alert type is received if device is online or offline
      switch ((alert as AlertInfo).riskLevel) {
        case RiskLevel.HIGH:
          alertsCount.highRisk += 1;
          break;
        case RiskLevel.MEDIUM:
          alertsCount.mediumRisk += 1;
          break;
        case RiskLevel.LOW:
          alertsCount.lowRisk += 1;
          break;
        case RiskLevel.UNASSIGNED:
          alertsCount.unassignedRisk += 1;
          break;
        default:
          break;
      }
    });

    return alertsCount;
  }
}

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP_I,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.RETRIEVE_ALERTS,
  true
);

// Actionframe
export const af_RetrieveAlerts = new Actionframe(
  `AF_${ActionFrameIDs.DTA.RETRIEVE_ALERTS}`,
  [rule1, rule2],
  new RetrieveAlerts()
);
