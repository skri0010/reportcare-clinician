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
import { listClinicianInfos, listClinicianMappingsByPatientID } from "aws";
import { store } from "util/useRedux";
import { ClinicianInfo } from "aws/API";
import { setFetchingSharingClinicians } from "ic-redux/actions/agents/clinicianActionCreator";

/**
 * Represents the activity for retrieving clinicians for sharing a patient.
 * This happens in Procedure Clinician Specific - Patient Sharing (CP-PS).
 */
class RetrieveSharingClinicians extends Activity {
  constructor() {
    super(ActionFrameIDs.DTA.RETRIEVE_SHARING_CLINICIANS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

    // Dispatch to store to indicate fetching is ongoing
    store.dispatch(setFetchingSharingClinicians(true));

    let clinicians: ClinicianInfo[] | null | undefined;
    let existingClinicianIds: string[] | null | undefined;

    try {
      const facts = agentAPI.getFacts();

      // Get locally stored clinicianId
      const clinicianId = await LocalStorage.getClinicianID();

      // Get patientId of current patient to share
      const patientToShare: string =
        facts[BeliefKeys.CLINICIAN]?.[ClinicianAttributes.PATIENT_TO_SHARE];

      if (clinicianId && patientToShare) {
        // Ensure that application is online
        if (facts[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          // Get all clinicians
          const query = await listClinicianInfos({});

          if (query.data.listClinicianInfos?.items) {
            clinicians = query.data.listClinicianInfos.items as ClinicianInfo[];
          }

          // Get clinicians of the current patient
          const mapQuery = await listClinicianMappingsByPatientID({
            patientID: patientToShare
          });

          if (
            mapQuery &&
            mapQuery.data.listClinicianMappingsByPatientID?.items
          ) {
            existingClinicianIds =
              mapQuery.data.listClinicianMappingsByPatientID.items.flatMap(
                (item) => (item ? [item.clinicianID] : [])
              );
          }

          if (clinicians && existingClinicianIds) {
            const sharingClincians = clinicians.filter(
              (c) => !existingClinicianIds?.includes(c.clinicianID)
            );

            // Add list of sharing clinicians to facts
            agentAPI.addFact(
              new Belief(
                BeliefKeys.CLINICIAN,
                ClinicianAttributes.SHARING_CLINICIANS,
                sharingClincians
              ),
              false
            );

            // Trigger RequestDisplaySharingClinicians
            agent.addBelief(
              new Belief(
                BeliefKeys.CLINICIAN,
                ClinicianAttributes.DISPLAY_SHARING_CLINICIANS,
                true
              )
            );

            // Remove patientId to share from facts
            agentAPI.addFact(
              new Belief(
                BeliefKeys.CLINICIAN,
                ClinicianAttributes.PATIENT_TO_SHARE,
                null
              ),
              false
            );
          }
        }
      } else {
        // End the procedure
        agentAPI.addFact(
          new Belief(
            BeliefKeys.PROCEDURE,
            ProcedureAttributes.CP_PS,
            ProcedureConst.INACTIVE
          ),
          true,
          true
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);

      // End the procedure
      agentAPI.addFact(
        new Belief(
          BeliefKeys.PROCEDURE,
          ProcedureAttributes.CP_PS,
          ProcedureConst.INACTIVE
        ),
        true,
        true
      );
    }
  }
}

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.CP_PS,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.RETRIEVE_SHARING_CLINICIANS,
  true
);

// Actionframe
export const af_RetrieveSharingClinicians = new Actionframe(
  `AF_${ActionFrameIDs.DTA.RETRIEVE_SHARING_CLINICIANS}`,
  [rule1, rule2],
  new RetrieveSharingClinicians()
);
