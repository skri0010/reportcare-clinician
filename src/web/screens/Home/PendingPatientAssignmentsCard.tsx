import React, { FC, useEffect } from "react";
import { RootState, select } from "util/useRedux";
import { View, TextStyle, FlatList } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { H4 } from "components/Text/index";
import { CardWrapper } from "./CardWrapper";
import i18n from "util/language/i18n";
import { agentAPI, Belief } from "agents_implementation/agent_framework";
import {
  BeliefKeys,
  PatientAttributes,
  ProcedureAttributes,
  ProcedureConst
} from "agents_implementation/agent_framework/AgentEnums";
import { agentDTA } from "agents_implementation/agents";
import {
  PatientAssignmentStatus,
  PatientAssignmentResolution
} from "agents_implementation/agent_framework/model";
import { PatientAssignment } from "aws/API";
import { PatientAssignmentRow } from "components/RowComponents/PatientRows/PatientAssignmentRow";

interface PendingPatientAssignmentsCardProps {
  maxHeight: number;
}

export const PendingPatientAssignmentsCard: FC<PendingPatientAssignmentsCardProps> =
  ({ maxHeight }) => {
    const { colors, pendingPatientAssignments } = select(
      (state: RootState) => ({
        colors: state.settings.colors,
        pendingPatientAssignments: state.agents.pendingPatientAssignments
      })
    );

    const titleColor = { color: colors.primaryTextColor } as TextStyle;

    // Trigger agent to fetch pending assignments
    useEffect(() => {
      agentDTA.addBelief(
        new Belief(
          BeliefKeys.PATIENT,
          PatientAttributes.RETRIEVE_PENDING_PATIENT_ASSIGNMENTS,
          true
        )
      );

      agentAPI.addFact(
        new Belief(
          BeliefKeys.PROCEDURE,
          ProcedureAttributes.SRD,
          ProcedureConst.ACTIVE
        )
      );
    }, []);

    // Trigger agent to resolve pending assignment
    const resolvePatientAssignment = (
      assignment: PatientAssignment,
      resolution: PatientAssignmentStatus,
      targetClinicianId: string
    ) => {
      const patientAssignmentResolution: PatientAssignmentResolution = {
        patientID: assignment.patientID,
        clinicianID: targetClinicianId,
        resolution: resolution,
        patientName: assignment.patientName,
        _version: assignment._version
      };
    };

    //
    const approvePatientAssignment = (item: PatientAssignment) => {
      // JH-TODO: Approve patient assignment
      // eslint-disable-next-line no-console
      console.log("Approve");
    };

    const reassignPatientAssignment = (item: PatientAssignment) => {
      // JH-TODO: Reassign patient assignment
      // eslint-disable-next-line no-console
      console.log("Reassign");
    };

    return (
      <CardWrapper maxHeight={maxHeight}>
        <View style={styles.titleContainer}>
          <H4
            text={i18n.t("Home.PatientAssignments")}
            style={[styles.title, titleColor]}
          />
        </View>
        {pendingPatientAssignments ? (
          <View style={styles.listContainer}>
            <FlatList
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <ItemSeparator />}
              data={pendingPatientAssignments}
              renderItem={({ item }) => {
                return (
                  <PatientAssignmentRow
                    patientName={item.patientName}
                    onApprove={() => approvePatientAssignment(item)}
                    onReassign={() => reassignPatientAssignment(item)}
                  />
                );
              }}
              keyExtractor={(item) => item.id}
            />
          </View>
        ) : null}
      </CardWrapper>
    );
  };

const styles = ScaledSheet.create({
  title: {
    fontWeight: "bold"
  },
  listContainer: {
    flex: 1,
    paddingTop: "15@ms"
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline"
  }
});
