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
          ProcedureAttributes.HF_OTP_III,
          ProcedureConst.ACTIVE
        )
      );

      // console.log("I did something");
      // JH-TODO Trigger fetch once
    }, []);

    const titleColor = { color: colors.primaryTextColor } as TextStyle;

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
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <H4 text="Hi" />
                  </View>
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
    fontWeight: "bold",
    paddingBottom: "5@ms"
  },
  listContainer: {
    flex: 1
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline"
  }
});
