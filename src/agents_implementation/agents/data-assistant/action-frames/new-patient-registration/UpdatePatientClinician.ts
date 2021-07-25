import Actionframe from "../../../../agent_framework/base/Actionframe";
import Activity from "../../../../agent_framework/base/Activity";
import Agent from "../../../../agent_framework/base/Agent";
import Belief from "../../../../agent_framework/base/Belief";
import Precondition from "../../../../agent_framework/base/Precondition";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ProcedureConst,
  AsyncStorageKeys,
  CommonAttributes,
  BeliefKeys,
  PatientAttributes,
  ProcedureAttributes
} from "../../../../agent_framework/AgentEnums";
import agentAPI from "../../../../agent_framework/AgentAPI";
import {
  listPatientInfos,
  updatePatientInfo,
  createClinicianPatientMap
} from "aws";

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
    agent.addBelief(
      new Belief(BeliefKeys.PATIENT, PatientAttributes.CLINICIAN_UPDATED, false)
    );
    agent.addBelief(
      new Belief(agent.getID(), CommonAttributes.LAST_ACTIVITY, this.getID())
    );

    try {
      // Gets patientId to be updated
      const patientId =
        agentAPI.getFacts()[BeliefKeys.PATIENT]?.[
          PatientAttributes.UPDATE_CLINICIAN
        ];

      // Gets locally stored clinicianId
      const clinicianId = await AsyncStorage.getItem(
        AsyncStorageKeys.CLINICIAN_ID
      );

      if (patientId && clinicianId) {
        // Queries patient using patientId
        const query: any = await listPatientInfos({
          filter: { patientID: { eq: patientId } }
        });

        if (query.data) {
          const results = query.data.listPatientInfos?.items;
          if (results && results.length > 0) {
            const patient = results.pop();
            if (patient) {
              // Updates patient's cardiologist
              // LS-TODO: Whether to update cardiologist using clinician's username
              // JH-TODO: Note, we must check the version from the DB. If this version is not
              //          the latest, then it auto merge might ignore it!
              const updatePatient = await updatePatientInfo({
                id: patient.id,
                cardiologist: clinicianId,
                _version: patient._version
              });

              // Saves patient locally with patientId as key
              if (updatePatient.data) {
                await AsyncStorage.setItem(
                  patientId,
                  JSON.stringify(updatePatient.data.updatePatientInfo)
                );
              }

              // Inserts into ClinicianPatientMap
              await createClinicianPatientMap({
                clinicianID: clinicianId,
                patientID: patient.id,
                owner: clinicianId
              });

              agentAPI.addFact(
                new Belief(
                  BeliefKeys.PATIENT,
                  PatientAttributes.UPDATE_SUCCESSFUL,
                  true
                ),
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
    // Removes patientId to be updated from facts
    agentAPI.addFact(
      new Belief(BeliefKeys.PATIENT, PatientAttributes.UPDATE_CLINICIAN, null),
      false
    );
    // Stops the procedure
    agentAPI.addFact(
      new Belief(
        BeliefKeys.PROCEDURE,
        ProcedureAttributes.SRD,
        ProcedureConst.INACTIVE
      )
    );
  }
}

// Preconditions for activating the UpdatePatientClinican class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.SRD,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  BeliefKeys.PATIENT,
  PatientAttributes.CLINICIAN_UPDATED,
  true
);

// Action Frame for UpdatePatientClinican class
const af_UpdatePatientClinican = new Actionframe(
  "AF_UpdatePatientClinican",
  [rule1, rule2],
  new UpdatePatientClinican()
);

export default af_UpdatePatientClinican;
