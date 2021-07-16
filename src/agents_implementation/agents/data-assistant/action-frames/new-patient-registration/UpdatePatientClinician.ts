import Actionframe from "../../../../agent_framework/base/Actionframe";
import Activity from "../../../../agent_framework/base/Activity";
import Agent from "../../../../agent_framework/base/Agent";
import Belief from "../../../../agent_framework/base/Belief";
import Precondition from "../../../../agent_framework/base/Precondition";
import { DataStore } from "@aws-amplify/datastore";
import { PatientInfo } from "../../../../../aws/models";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import ProcedureConst from "../../../../agent_framework/const/ProcedureConst";
import agentAPI from "../../../../agent_framework/AgentAPI";

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
    try {
      const patientId = agent.getBeliefs().Patient?.updateClinician;
      const clinicianId = await AsyncStorage.getItem("ClinicianId");
      let patientUpdated: boolean = false;

      if (patientId && clinicianId) {
        let patient: PatientInfo | undefined;
        const patientQuery = await DataStore.query(PatientInfo, (c) =>
          c.patientID("eq", patientId)
        );
        if (patientQuery.length > 0) {
          patient = patientQuery.pop();
        }
        if (patient) {
          await DataStore.save(
            PatientInfo.copyOf(patient, (updated) => {
              // LS-TODO: Whether to update cardiologist using clinician's username
              // or have another clinicianID attribute
              updated.cardiologist = clinicianId;
            })
          ).then(() => {
            patientUpdated = true;
            Alert.alert(
              "Update successful",
              "Patient's clinician has been updated",
              [{ text: "OK" }]
            );
            // eslint-disable-next-line no-console
            console.log("Update successful");
          });
        }
      }
      if (!patientUpdated) {
        Alert.alert("Update failed", "Patient's ID might be invalid", [
          { text: "OK" }
        ]);
        // eslint-disable-next-line no-console
        console.log("Update failed");
      }
      // Update Beliefs
      agent.addBelief(new Belief("Patient", "updateClinician", null));
      agent.addBelief(new Belief(agent.getID(), "clinicianUpdated", false));
      agent.addBelief(new Belief(agent.getID(), "lastActivity", this.getID()));
      agentAPI.addFact(
        new Belief("Procedure", "SRD", ProcedureConst.INACTIVE),
        true,
        true
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
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
