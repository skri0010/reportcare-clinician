import Actionframe from "../../../../agent_framework/base/Actionframe";
import Activity from "../../../../agent_framework/base/Activity";
import Agent from "../../../../agent_framework/base/Agent";
import Belief from "../../../../agent_framework/base/Belief";
import Precondition from "../../../../agent_framework/base/Precondition";
import {
  ProcedureConst,
  AsyncStorageKeys,
  BeliefKeys,
  PatientAttributes,
  CommonAttributes,
  ClinicianAttributes,
  ProcedureAttributes,
  AppAttributes
} from "agents_implementation/agent_framework/AgentEnums";
import { Patient } from "../../../../agent_framework/model";
import { Role } from "models/ClinicianEnums";
import { PatientInfo } from "aws/API";
import { RiskLevel } from "models/RiskLevel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import agentAPI from "../../../../agent_framework/AgentAPI";
import { getClinicianInfo, listPatientInfos } from "aws";

/**
 * Class to represent an activity for retrieving all patients according to role.
 * This happens in Procedure HF Outcome Trends (HF-OTP-I).
 */
class RetrieveRolePatients extends Activity {
  constructor() {
    super("RetrieveRolePatients");
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent);

    // Update Beliefs
    agent.addBelief(
      new Belief(BeliefKeys.PATIENT, PatientAttributes.RETRIEVE_ALL, false)
    );
    agent.addBelief(
      new Belief(agent.getID(), CommonAttributes.LAST_ACTIVITY, this.getID())
    );

    try {
      const results = await this.queryPatients();
      if (results.length > 0) {
        const patients: Patient[] = results.map((patient) => {
          return {
            details: {
              id: patient.patientID,
              name: patient.name,
              // LS-TODO: Get risk level of patient according to guideline
              riskLevel: RiskLevel.UNASSIGNED
            },
            userId: patient.id,
            class: patient.NHYAclass,
            age: 0
          };
        });

        // Adds patients to facts to be used by front end
        agentAPI.addFact(
          new Belief(BeliefKeys.PATIENT, PatientAttributes.ALL, patients),
          false
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    // Update Facts
    // Removes role from facts
    agentAPI.addFact(
      new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.ROLE, null),
      false
    );
    // Stops the procedure
    agentAPI.addFact(
      new Belief(
        BeliefKeys.PROCEDURE,
        ProcedureAttributes.HF_OTP_I,
        ProcedureConst.INACTIVE
      )
    );
  }

  /**
   * Queries patient info according to user role.
   * @returns Array of patient info
   */
  // eslint-disable-next-line class-methods-use-this
  async queryPatients(): Promise<PatientInfo[]> {
    // Gets role and internet connection state from facts
    const role =
      agentAPI.getFacts()[BeliefKeys.CLINICIAN]?.[ClinicianAttributes.ROLE];
    const isOnline =
      agentAPI.getFacts()[BeliefKeys.APP]?.[AppAttributes.ONLINE];

    // Device is online
    if (isOnline) {
      // Nurse: query patients from the same hospital (hospitalName).
      if (role && role === Role.NURSE) {
        // Retrieves locally stored clinicianID
        const clinicianID = await AsyncStorage.getItem(
          AsyncStorageKeys.CLINICIAN_ID
        );
        if (clinicianID) {
          const clinicianQuery = await getClinicianInfo({
            clinicianID: clinicianID
          });
          if (clinicianQuery.data) {
            const clinician = clinicianQuery.data.getClinicianInfo;

            if (clinician && clinician.hospitalName) {
              // Retrieves patients with the same hospitalName
              const patientQuery: any = await listPatientInfos({
                filter: { hospitalName: { eq: clinician.hospitalName } }
              });
              if (patientQuery.data) {
                const patients = patientQuery.data.listPatientInfos.items;

                // Saves patients locally
                await AsyncStorage.setItem(
                  AsyncStorageKeys.PATIENTS,
                  JSON.stringify(patients)
                );
                return patients;
              }
            }
          }
        }

        // LS-TODO: Currently query all patients
      } else if (
        role &&
        (role === Role.EP ||
          role === Role.HF_SPECIALIST ||
          role === Role.MO ||
          role === Role.PHARMACIST)
      ) {
        const patientQuery: any = await listPatientInfos({});
        if (patientQuery.data) {
          const patients = patientQuery.data.listPatientInfos.items;

          // Saves patients locally
          await AsyncStorage.setItem(
            AsyncStorageKeys.PATIENTS,
            JSON.stringify(patients)
          );
          return patients;
        }
      }
    } else {
      // Device is offline: retrieves locally stored patients if any
      const patients = await AsyncStorage.getItem(AsyncStorageKeys.PATIENTS);
      if (patients) {
        return JSON.parse(patients);
      }
    }
    return [];
  }
}

// Preconditions for activating the RetrieveRolePatients class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.HF_OTP_I,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  BeliefKeys.PATIENT,
  PatientAttributes.RETRIEVE_ALL,
  true
);

// Action Frame for RetrieveRolePatients class
const af_RetrieveRolePatients = new Actionframe(
  "AF_RetrieveRolePatients",
  [rule1, rule2],
  new RetrieveRolePatients()
);

export default af_RetrieveRolePatients;
