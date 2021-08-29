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
import { store } from "util/useRedux";
import { Storage } from "rc_agents/storage";
import { LocalTodo, TodoStatus } from "rc_agents/model";
import { Todo } from "aws/API";
import { getTodo } from "aws/TypedAPI/getQueries";
// eslint-disable-next-line no-restricted-imports
import { mapColorCodeToRiskLevel } from "rc_agents/agents/data-assistant/action-frames/triage-alert-hf-clinic/RetrievePendingAlertCount";
import { setTodoDetails } from "ic-redux/actions/agents/actionCreator";

 /**
   * Class representing an activity that triggers the display of todo details.
   * This occurs in SRD-III 
   */

  class DisplayTodoDetails extends Activity {
    constructor() {
        super(ActionFrameIDs.DTA.RETRIEVE_TODO_DETAILS);
    }

    /**
     * Perform this activity
     * @param {Agent} agent - context of the agent
     */
    async doActivity(agent: Agent): Promise<void>{
        // reset preconditions
        await super.doActivity(agent, [rule2]);

        const facts = agentAPI.getFacts();
        // eslint-disable-next-line no-console
        try {

          // Get fact with todo details
          // TODO: Change this from ClinicianAttributes.TODO to something else
          const todoDetails: string = agentAPI.getFacts()[BeliefKeys.CLINICIAN]?.[ClinicianAttributes.TODO_DETAILS];
          if (todoDetails) {
              let todoDetail: Todo | undefined;
              // Check if device is online
              if (facts[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
                  // is online
                  const query = await getTodo({ id: todoDetails });
                  // call getTodo query
                  if (query.data.getTodo){
                      const result = query.data.getTodo;
                      if (result){
                          todoDetail = result as Todo;
                      }
                  }
                  if (todoDetail) {
                      // Change todo fromat to LocalTodo for dispatch
                      const todoToDispatch: LocalTodo = {
                          id: todoDetail.id,
                          title: todoDetail.title,
                          patientName: todoDetail.patientName,
                          notes: todoDetail.notes,
                          completed: todoDetail.completed === TodoStatus.COMPLETED,
                          createdAt: todoDetail.createdAt,
                          lastModified: todoDetail.lastModified,
                          toSync: false,
                          _version: todoDetail._version
                      };
                      // check is optional alert data exists
                      if (todoDetail.alert){
                          todoToDispatch.alertId = todoDetail.alert.id;
                          todoToDispatch.patientId = todoDetail.alert.patientID;
                          todoToDispatch.riskLevel = mapColorCodeToRiskLevel(
                              todoDetail.alert.colorCode
                          );
                      }
                      // Save to local storage
                      await Storage.setTodo(todoToDispatch);
  
                      // Dispatch to front end using redux
                      store.dispatch(setTodoDetails(todoToDispatch));
  
                      // remove display todo details from facts
                      agentAPI.addFact(
                          new Belief(
                              BeliefKeys.CLINICIAN,
                              ClinicianAttributes.DISPLAY_TODO_DETAILS,
                              null
                          ),
                          false
                      );
                  }
              } else {
                  // check local storage for todo details
                  const todoToDispatch = await Storage.getTodo(todoDetails);
                  
                  if (todoToDispatch){
                      // move to front of the list
                      console.log(todoToDispatch);
                      await Storage.setTodo(todoToDispatch[0]);

                      // remoce display todo details from 
                      agentAPI.addFact(
                          new Belief(
                              BeliefKeys.CLINICIAN,
                              ClinicianAttributes.RETRIEVE_TODO_DETAILS,
                              null
                          ),
                          false
                      );
                  }

              }
          }


        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }

        // Stop procedure
        agentAPI.addFact(
            new Belief(
                BeliefKeys.PROCEDURE,
                ProcedureAttributes.SRD_III,
                ProcedureConst.INACTIVE
            ),
            true,
            true
        );
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

export const af_DisplayTodoDetails = new Actionframe(
    `AF_${ActionFrameIDs.DTA.RETRIEVE_TODO_DETAILS}`,
    [rule1, rule2],
    new DisplayTodoDetails()
);