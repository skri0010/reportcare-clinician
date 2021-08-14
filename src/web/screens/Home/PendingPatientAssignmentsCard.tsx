import React, { FC, useEffect } from "react";
import { RootState, select } from "util/useRedux";
import { View, TextStyle, FlatList } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { H4, H5 } from "components/Text/index";
import { CardWrapper } from "./CardWrapper";
import i18n from "util/language/i18n";
import { agentAPI, Belief } from "rc_agents/framework";
import {
  BeliefKeys,
  PatientAttributes,
  ProcedureAttributes,
  ProcedureConst
} from "rc_agents/AgentEnums";
import { agentDTA } from "rc_agents/agents";
import {
  PatientAssignmentStatus,
  PatientAssignmentResolution
} from "rc_agents/model";
import { PatientAssignment } from "aws/API";
import { PatientAssignmentRow } from "components/RowComponents/PatientRows/PatientPendingAssignmentRow";
import { LoadingIndicator } from "components/IndicatorComponents/LoadingIndicator";
import { AgentTrigger } from "rc_agents/trigger";

interface PendingPatientAssignmentsCardProps {
  maxHeight: number;
}

export const PendingPatientAssignmentsCard: FC<PendingPatientAssignmentsCardProps> =
  ({ maxHeight }) => {
    const {
      colors,
      pendingPatientAssignments,
      fetchingPendingPatientAssignments
    } = select((state: RootState) => ({
      colors: state.settings.colors,
      pendingPatientAssignments: state.agents.pendingPatientAssignments,
      fetchingPendingPatientAssignments:
        state.agents.fetchingPendingPatientAssignments
    }));

    const titleColor = { color: colors.primaryTextColor } as TextStyle;

    // Trigger agent to fetch pending assignments on initial load
    useEffect(() => {
      AgentTrigger.triggerRetrievePendingAssignments();
    }, []);

    // Approve patient assignment
    const approvePatientAssignment = (assignment: PatientAssignment) => {
      const patientAssignmentResolution: PatientAssignmentResolution = {
        patientID: assignment.patientID,
        clinicianID: assignment.clinicianID,
        resolution: PatientAssignmentStatus.APPROVED,
        patientName: assignment.patientName,
        _version: assignment._version
      };
      AgentTrigger.triggerResolvePendingAssignments(
        patientAssignmentResolution
      );
    };

    const reassignPatientAssignment = (assignment: PatientAssignment) => {
      // JH-TODO-NEW: Reassign patient assignment
    };

    return (
      <CardWrapper maxHeight={maxHeight}>
        <View style={styles.titleContainer}>
          <H4
            text={i18n.t("Home.PatientAssignments")}
            style={[styles.title, titleColor]}
          />
        </View>
        {/* Loading indicator */}
        {fetchingPendingPatientAssignments ? <LoadingIndicator /> : null}

        {/* List of pending patient assignments */}
        {pendingPatientAssignments ? (
          pendingPatientAssignments.length > 0 ? (
            <View style={styles.listContainer}>
              <FlatList
                style={
                  fetchingPendingPatientAssignments
                    ? styles.flatlistLoadingOpacity
                    : {}
                }
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
          ) : (
            // Display text to indicate no pending assignments
            <View style={styles.noPendingTextContainer}>
              <H5
                text={i18n.t("Patient_Assignments.NoPendingAssignments")}
                style={styles.noPendingText}
              />
            </View>
          )
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
  flatlistLoadingOpacity: {
    opacity: 0.5
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline"
  },
  noPendingTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "30@ms"
  },
  noPendingText: {
    textAlign: "center"
  }
});
