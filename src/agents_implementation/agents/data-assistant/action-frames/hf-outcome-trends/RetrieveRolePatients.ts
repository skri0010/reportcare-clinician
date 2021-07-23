import Actionframe from "../../../../agent_framework/base/Actionframe";
import Activity from "../../../../agent_framework/base/Activity";
import Agent from "../../../../agent_framework/base/Agent";
import Belief from "../../../../agent_framework/base/Belief";
import Precondition from "../../../../agent_framework/base/Precondition";
import ProcedureConst from "../../../../agent_framework/const/ProcedureConst";
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
    agent.addBelief(new Belief("Patient", "retrieveAll", false));
    agent.addBelief(new Belief(agent.getID(), "lastActivity", this.getID()));

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

        agentAPI.addFact(new Belief("Patient", "all", patients), false);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    // Update Facts
    agentAPI.addFact(new Belief("Clinician", "role", null), false);
    agentAPI.addFact(
      new Belief("Procedure", "HF-OTP-I", ProcedureConst.INACTIVE)
    );
  }

  /**
   * Queries patient info according to user role.
   * @returns Array of patient info
   */
  // eslint-disable-next-line class-methods-use-this
  async queryPatients(): Promise<PatientInfo[]> {
    const role = agentAPI.getFacts().Clinician?.role;

    // Nurse: query patients from the same hospital (hospitalName).
    if (role && role === Role.NURSE) {
      const clinicianID = await AsyncStorage.getItem("ClinicianId");
      if (clinicianID) {
        const clinicianQuery = await getClinicianInfo({
          clinicianID: clinicianID
        });
        if (clinicianQuery.data) {
          const clinician = clinicianQuery.data.getClinicianInfo;
          if (clinician && clinician.hospitalName) {
            const patientQuery: any = await listPatientInfos({
              filter: { hospitalName: { eq: clinician.hospitalName } }
            });
            if (patientQuery.data) {
              return patientQuery.data.listPatientInfos.items;
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
      const patientQuery = await listPatientInfos({});
      const items = patientQuery.data.listPatientInfos?.items;
      if (items) {
        return items as PatientInfo[];
      }
    }
    return [];
  }
}

// Preconditions for activating the RetrieveRolePatients class
const rule1 = new Precondition("Procedure", "HF-OTP-I", ProcedureConst.ACTIVE);
const rule2 = new Precondition("Patient", "retrieveAll", true);

// Action Frame for RetrieveRolePatients class
const af_RetrieveRolePatients = new Actionframe(
  "AF_RetrieveRolePatients",
  [rule1, rule2],
  new RetrieveRolePatients()
);

export default af_RetrieveRolePatients;
