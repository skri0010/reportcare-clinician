import {
  Actionframe,
  Activity,
  Agent,
  Belief,
  Precondition,
  ResettablePrecondition
} from "rc_agents/framework";
import {
  ProcedureConst,
  AsyncStorageKeys,
  BeliefKeys,
  PatientAttributes,
  ClinicianAttributes,
  ProcedureAttributes,
  AppAttributes,
  ActionFrameIDs
} from "rc_agents/AgentEnums";
import { Patient } from "rc_agents/model";
import { PatientInfo } from "aws/API";
import { RiskLevel } from "models/RiskLevel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import agentAPI from "rc_agents/framework/AgentAPI";
import { Role, getClinicianInfo, listPatientInfos } from "aws";
import { store } from "util/useRedux";
import {
  setPatients,
  setProcedureOngoing
} from "ic-redux/actions/agents/actionCreator";
import { mockPatients } from "mock/mockPatients";

/**
 * Class to represent an activity for retrieving all patients according to role.
 * This happens in Procedure HF Outcome Trends (HF-OTP-I).
 */
class RetrieveRolePatients extends Activity {
  constructor() {
    super(ActionFrameIDs.DTA.RETRIEVE_ROLE_PATIENTS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

    try {
      const results = await this.queryPatients();
      if (results.length > 0) {
        const patients: Patient[] = results.map((patient) => {
          return {
            details: patient,
            userId: patient.id!,
            class: patient.NHYAclass,
            age: 0,
            // LS-TODO: Get risk level of patient according to guideline
            riskLevel: RiskLevel.UNASSIGNED
          };
        });

        // Dispatch patients to front end
        store.dispatch(setPatients(patients));
      }

      // LS-TODO: To be removed - for testing purposes only
      else {
        const mockData: Patient[] = mockPatients.map((patient) => {
          return {
            details: patient,
            userId: patient.patientID!,
            age: 50,
            riskLevel: RiskLevel.UNASSIGNED
          };
        });
        store.dispatch(setPatients(mockData));
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
      ),
      true,
      true
    );

    // Dispatch to front end that procedure has been completed
    store.dispatch(setProcedureOngoing(false));
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
const rule2 = new ResettablePrecondition(
  BeliefKeys.PATIENT,
  PatientAttributes.RETRIEVE_ALL,
  true
);

// Action Frame for RetrieveRolePatients class
export const af_RetrieveRolePatients = new Actionframe(
  `AF_${ActionFrameIDs.DTA.RETRIEVE_ROLE_PATIENTS}`,
  [rule1, rule2],
  new RetrieveRolePatients()
);
