import React, { FC, useEffect } from "react";
import { RootState, select } from "util/useRedux";
import { View, TextStyle, FlatList } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { CardWrapper } from "./CardWrapper";
import i18n from "util/language/i18n";
import {
  PatientAssignmentStatus,
  PatientAssignmentResolution
} from "rc_agents/model";
import { PatientAssignment } from "aws/API";
import { PatientAssignmentRow } from "components/RowComponents/PatientRows/PatientPendingAssignmentRow";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import { AgentTrigger } from "rc_agents/trigger";
import { EmptyListIndicator } from "components/Indicators/EmptyListIndicator";

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
      <CardWrapper
        maxHeight={maxHeight}
        title={i18n.t("Home.PatientAssignments")}
        noChildrenPaddingHorizontal={fetchingPendingPatientAssignments}
      >
        {fetchingPendingPatientAssignments ? (
          // Pending patient assignments is being fetched
          <LoadingIndicator />
        ) : pendingPatientAssignments ? (
          // List of pending patient assignments? (
          <View style={styles.listContainer}>
            <FlatList
              style={
                fetchingPendingPatientAssignments
                  ? styles.flatlistLoadingOpacity
                  : {}
              }
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <ItemSeparator />}
              ListEmptyComponent={() => (
                <EmptyListIndicator
                  text={i18n.t("Patient_Assignments.NoPendingAssignments")}
                />
              )}
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
              keyExtractor={(item) => `${item.patientID}_${item.clinicianID}`}
            />
          </View>
        ) : null}
      </CardWrapper>
    );
  };

const styles = ScaledSheet.create({
  listContainer: {
    flex: 1
  },
  flatlistLoadingOpacity: {
    opacity: 0.5
  }
});
