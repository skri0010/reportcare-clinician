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
import { Storage } from "rc_agents/storage";
import { LocalTodo, TodoStatus } from "rc_agents/model";
import { Todo } from "aws/API";
import { getTodo } from "aws/TypedAPI/getQueries";
// eslint-disable-next-line no-restricted-imports
import { mapColorCodeToRiskLevel } from "rc_agents/agents/data-assistant/action-frames/triage-alert-hf-clinic/RetrievePendingAlertCount";


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
    async doActivity(agent: Agent): Promise<void>{
        // reset preconditions
        await super.doActivity(agent, [rule2]);

        const facts = agentAPI.getFacts();
        
        try {

          // Get fact with todo details
          const todoDetails: string = agentAPI.getFacts()[BeliefKeys.CLINICIAN]?.[ClinicianAttributes.TODO_ID];
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
                      // Change todo format to LocalTodo for dispatch
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
                      // store.dispatch(setTodoDetails(todoToDispatch));
  
                      agentAPI.addFact(
                          new Belief(
                              BeliefKeys.CLINICIAN,
                              ClinicianAttributes.TODO_DETAILS,
                              todoToDispatch
                          ),
                          false
                      );

                      // Trigger request for UXSA to display
                      agent.addBelief(
                          new Belief(
                              BeliefKeys.CLINICIAN,
                              ClinicianAttributes.TODO_DETAILS_RETRIEVED,
                              true
                          )
                      );
                  }
              } else {
                  // check local storage for todo details
                  const todoToDispatch = await Storage.getTodoDetails(todoDetails);
                  
                  if (todoToDispatch){
                      
                      await Storage.setTodo(todoToDispatch);

                      agentAPI.addFact(
                          new Belief(
                              BeliefKeys.CLINICIAN,
                              ClinicianAttributes.TODO_DETAILS,
                              todoToDispatch
                          ),
                          false
                      );

                      agent.addBelief(
                        new Belief(
                            BeliefKeys.CLINICIAN,
                            ClinicianAttributes.TODO_DETAILS_RETRIEVED,
                            true
                        )
                    );
                  }

              }
          }


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