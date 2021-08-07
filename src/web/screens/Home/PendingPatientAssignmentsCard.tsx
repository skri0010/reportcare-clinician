import React, { FC, useEffect } from "react";
import { RootState, select, useDispatch } from "util/useRedux";
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
import { PatientAssignmentRow } from "components/RowComponents/PatientRows/PatientPendingAssignmentRow";
import { setFetchNewPatientAssignments } from "ic-redux/actions/agents/actionCreator";
import { LoadingIndicator } from "components/IndicatorComponents/LoadingIndicator";

interface PendingPatientAssignmentsCardProps {
  maxHeight: number;
}

export const PendingPatientAssignmentsCard: FC<PendingPatientAssignmentsCardProps> =
  ({ maxHeight }) => {
    const { colors, pendingPatientAssignments, fetchNewPatientAssignments } =
      select((state: RootState) => ({
        colors: state.settings.colors,
        pendingPatientAssignments: state.agents.pendingPatientAssignments,
        fetchNewPatientAssignments: state.agents.fetchNewPatientAssignments
      }));

    const titleColor = { color: colors.primaryTextColor } as TextStyle;
    const dispatch = useDispatch();

    // Trigger agent to fetch pending assignments
    useEffect(() => {
      if (fetchNewPatientAssignments) {
        dispatch(setFetchNewPatientAssignments(!fetchNewPatientAssignments));
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
      }
    }, [fetchNewPatientAssignments, dispatch]);

    // Trigger agent to resolve pending assignment
    const resolvePatientAssignment = (
      patientAssignmentResolution: PatientAssignmentResolution
    ) => {
      agentDTA.addBelief(
        new Belief(
          BeliefKeys.PATIENT,
          PatientAttributes.PENDING_RESOLVE_PATIENT_ASSIGNMENT,
          true
        )
      );

      agentAPI.addFact(
        new Belief(
          BeliefKeys.PATIENT,
          PatientAttributes.PATIENT_ASSIGNMENT_RESOLUTION,
          patientAssignmentResolution
        ),
        false
      );

      agentAPI.addFact(
        new Belief(
          BeliefKeys.PROCEDURE,
          ProcedureAttributes.SRD,
          ProcedureConst.ACTIVE
        )
      );
    };

    // Approve patient assignment
    const approvePatientAssignment = (assignment: PatientAssignment) => {
      const patientAssignmentResolution: PatientAssignmentResolution = {
        patientID: assignment.patientID,
        clinicianID: assignment.clinicianID,
        resolution: PatientAssignmentStatus.APPROVED,
        patientName: assignment.patientName,
        _version: assignment._version
      };
      resolvePatientAssignment(patientAssignmentResolution);
    };

    const reassignPatientAssignment = (assignment: PatientAssignment) => {
      // JH-TODO: Reassign patient assignment
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
        {fetchNewPatientAssignments ? <LoadingIndicator /> : null}

        {/* List of pending patient assignments */}
        {pendingPatientAssignments ? (
          <View style={styles.listContainer}>
            <FlatList
              style={
                fetchNewPatientAssignments ? styles.flatlistLoadingOpacity : {}
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
  }
});
