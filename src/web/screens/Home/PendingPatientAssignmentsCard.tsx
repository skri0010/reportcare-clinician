import React, { FC, useEffect, useState } from "react";
import { RootState, select } from "util/useRedux";
import { View, FlatList } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { CardWrapper } from "components/Wrappers/CardWrapper";
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
import { HomeScreenModal } from "./HomeScreenModals";
import { PatientReassignmentModal } from "./PatientReassignmentModal";

interface PendingPatientAssignmentsCardProps {
  maxHeight: number;
}

export const PendingPatientAssignmentsCard: FC<PendingPatientAssignmentsCardProps> =
  ({ maxHeight }) => {
    const { pendingPatientAssignments, fetchingPendingPatientAssignments } =
      select((state: RootState) => ({
        pendingPatientAssignments:
          state.patientAssignments.pendingPatientAssignments,
        fetchingPendingPatientAssignments:
          state.patientAssignments.fetchingPendingPatientAssignments
      }));
    const [viewModal, setViewModal] = useState<boolean>(false);
    const [selectedAssignment, setSelectedAssignment] =
      useState<null | PatientAssignment>(null);

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

    return (
      <CardWrapper
        maxHeight={maxHeight}
        minHeight={maxHeight}
        title={i18n.t("Home.PatientAssignments")}
        noChildrenPaddingHorizontal={fetchingPendingPatientAssignments}
        flex={1}
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
                    onReassign={() => {
                      setSelectedAssignment(item);
                      setViewModal(true);
                    }}
                  />
                );
              }}
              keyExtractor={(item) => item.patientID}
            />
          </View>
        ) : null}

        <HomeScreenModal
          visible={viewModal}
          onRequestClose={() => {
            setViewModal(false);
          }}
        >
          <PatientReassignmentModal
            setModalVisible={setViewModal}
            selectedAssignment={selectedAssignment}
          />
        </HomeScreenModal>
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
