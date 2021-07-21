import Actionframe from "../../../../agent_framework/base/Actionframe";
import Activity from "../../../../agent_framework/base/Activity";
import Agent from "../../../../agent_framework/base/Agent";
import Belief from "../../../../agent_framework/base/Belief";
import Precondition from "../../../../agent_framework/base/Precondition";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProcedureConst from "../../../../agent_framework/const/ProcedureConst";
import agentAPI from "../../../../agent_framework/AgentAPI";
import API from "@aws-amplify/api-graphql";
import { listPatientInfos } from "aws/graphql/queries";
import {
  updatePatientInfo,
  createClinicianPatientMap
} from "aws/graphql/mutations";

/**
 * Class to represent an activity for updating patient's clinician.
 * This happens in Procedure SRD when a clinician accepts a patient's request.
 */
// LS-TODO: Can also have a Communicate subclass similar to RequestStore to send message directly to DTA.
class UpdatePatientClinican extends Activity {
  constructor() {
    super("UpdatePatientClinician");
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent);

    // Update Beliefs
    agent.addBelief(new Belief(agent.getID(), "clinicianUpdated", false));
    agent.addBelief(new Belief(agent.getID(), "lastActivity", this.getID()));

    try {
      const patientId = agentAPI.getFacts().Patient?.updateClinician;
      const clinicianId = await AsyncStorage.getItem("ClinicianId");

      if (patientId && clinicianId) {
        const query: any = await API.graphql({
          query: listPatientInfos,
          variables: { filter: { patientID: { eq: patientId } } }
        });
        if (query.data) {
          const results = query.data.listClinicianInfos.items;
          if (results.length > 0) {
            const patient = results.pop();
            if (patient) {
              // LS-TODO: Whether to update cardiologist using clinician's username
              await API.graphql({
                query: updatePatientInfo,
                variables: {
                  input: {
                    id: patient.id,
                    cardiologist: clinicianId,
                    _version: patient._version
                  }
                }
              });
              await API.graphql({
                query: createClinicianPatientMap,
                variables: {
                  input: { clinicianID: clinicianId, patientID: patientId }
                }
              });
              agentAPI.addFact(
                new Belief("Patient", "updateSuccessful", true),
                false
              );
            }
          }
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    // Update Facts
    agentAPI.addFact(new Belief("Patient", "updateClinician", null), false);
    agentAPI.addFact(new Belief("Procedure", "SRD", ProcedureConst.INACTIVE));
  }
}

// Preconditions for activating the UpdatePatientClinican class
const rule1 = new Precondition("Procedure", "SRD", ProcedureConst.ACTIVE);
const rule2 = new Precondition("Patient", "clinicianUpdated", true);

// Action Frame for UpdatePatientClinican class
const af_UpdatePatientClinican = new Actionframe(
  "AF_UpdatePatientClinican",
  [rule1, rule2],
  new UpdatePatientClinican()
);

export default af_UpdatePatientClinican;
