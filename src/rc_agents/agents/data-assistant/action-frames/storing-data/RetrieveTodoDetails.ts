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
  LocalTodo,
  mapColorCodeToRiskLevel,
  RetrieveTodoDetailsMethod,
  TodoStatus
} from "rc_agents/model";
import { Todo } from "aws/API";
import { getTodo } from "aws/TypedAPI/getQueries";
import { store } from "util/useRedux";
import { setFetchingTodoDetails } from "ic-redux/actions/agents/todoActionCreator";

/**
 * Class representing an activity that triggers the display of todo details.
 * This occurs in SRD-III
 */

class RetrieveTodoDetails extends Activity {
  constructor() {
    super(ActionFrameIDs.DTA.RETRIEVE_TODO_DETAILS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    // reset preconditions
    await super.doActivity(agent, [rule2]);

    const facts = agentAPI.getFacts();

    try {
      // Get todo ID/ alert ID of the todo to display
      const todoOrAlertID: string =
        agentAPI.getFacts()[BeliefKeys.CLINICIAN]?.[
          ClinicianAttributes.TODO_ID
        ];

      // Get the retrieve todo details method from facts (for offline retrieval only)
      const retrieveMethod: RetrieveTodoDetailsMethod =
        agentAPI.getFacts()[BeliefKeys.CLINICIAN]?.[
          ClinicianAttributes.RETRIEVE_DETAILS_METHOD
        ];

      if (todoOrAlertID) {
        let todoDetail: Todo | undefined;
        let todoToDispatch: LocalTodo | undefined;
        // Check if device is online
        if (facts[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          // Device is online, query using todo ID
          const query = await getTodo({ id: todoOrAlertID });
          // call getTodo query
          if (query.data.getTodo) {
            const result = query.data.getTodo;
            if (result) {
              todoDetail = result;
            }
          }
          if (todoDetail) {
            // Change todo format to LocalTodo for dispatch
            todoToDispatch = {
              id: todoDetail.id,
              title: todoDetail.title,
              patientName: todoDetail.patientName,
              notes: todoDetail.notes,
              completed: todoDetail.completed === TodoStatus.COMPLETED,
              createdAt: todoDetail.createdAt,
              lastModified: todoDetail.lastModified,
              toSync: false,
              version: todoDetail.version
            };
            // Get optional alert data
            if (todoDetail.alert) {
              todoToDispatch.alertId = todoDetail.alert.id;
              todoToDispatch.patientId = todoDetail.alert.patientID;
              todoToDispatch.riskLevel = mapColorCodeToRiskLevel(
                todoDetail.alert.colorCode
              );
            }
          }
        } else if (retrieveMethod === RetrieveTodoDetailsMethod.TODO_ID) {
          // Device is offline, todo has todo ID
          todoToDispatch = await LocalStorage.getTodoDetailsForTodoID(
            todoOrAlertID
          );
        } else {
          // Device is offline, retrieve using alert ID since todo has not been added into DB yet
          todoToDispatch = await LocalStorage.getTodoDetailsForAlertID(
            todoOrAlertID
          );
        }

        if (todoToDispatch) {
          // Add todo details to be dispatched to facts
          agentAPI.addFact(
            new Belief(
              BeliefKeys.CLINICIAN,
              ClinicianAttributes.TODO_DETAILS,
              todoToDispatch
            ),
            false
          );

          // Triggers request to UXSA agent
          agent.addBelief(
            new Belief(
              BeliefKeys.CLINICIAN,
              ClinicianAttributes.TODO_DETAILS_RETRIEVED,
              true
            )
          );
        }
      }

      store.dispatch(setFetchingTodoDetails(false));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// Preconditions for activiating the DisplayTodoDetails

const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.SRD_III,
  ProcedureConst.ACTIVE
);

const rule2 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.RETRIEVE_TODO_DETAILS,
  true
);

export const af_RetrieveTodoDetails = new Actionframe(
  `AF_${ActionFrameIDs.DTA.RETRIEVE_TODO_DETAILS}`,
  [rule1, rule2],
  new RetrieveTodoDetails()
);
