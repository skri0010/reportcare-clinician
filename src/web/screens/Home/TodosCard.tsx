import React, { FC, useEffect, useState } from "react";
import { RootState, select } from "util/useRedux";
import { View, TextStyle, FlatList } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { TodoRow } from "components/RowComponents/TodoRow";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { RiskLevel } from "models/RiskLevel";
import { H4 } from "components/Text/index";
import { CardWrapper } from "./CardWrapper";
import { FloatingShowMoreButton } from "components/Buttons/FloatingShowMoreButton";
import i18n from "util/language/i18n";
import { agentAPI, Belief } from "rc_agents/framework";
import {
  BeliefKeys,
  ClinicianAttributes,
  ProcedureAttributes,
  ProcedureConst
} from "rc_agents/AgentEnums";
import { TodoStatus } from "rc_agents/model";
import { agentDTA } from "rc_agents/agents";
import { LoadingIndicator } from "components/IndicatorComponents/LoadingIndicator";

interface TodosCardProps {
  maxHeight: number;
}

export const TodosCard: FC<TodosCardProps> = ({ maxHeight }) => {
  const { colors, pendingTodos, fetchingTodos } = select(
    (state: RootState) => ({
      colors: state.settings.colors,
      pendingTodos: state.agents.pendingTodos,
      fetchingTodos: state.agents.fetchingTodos
    })
  );

  const titleColor = { color: colors.primaryTextColor } as TextStyle;

  const [lastPatientIndex, setLastPatientIndex] = useState(-1);

  useEffect(() => {
    agentAPI.addFact(
      new Belief(
        BeliefKeys.CLINICIAN,
        ClinicianAttributes.TODO_STATUS,
        TodoStatus.PENDING
      ),
      false
    );
    agentDTA.addBelief(
      new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.RETRIEVE_TODOS, true)
    );
    agentAPI.addFact(
      new Belief(
        BeliefKeys.PROCEDURE,
        ProcedureAttributes.SRD_II,
        ProcedureConst.ACTIVE
      )
    );
  }, []);

  useEffect(() => {
    if (pendingTodos.length > 10) {
      // At 10 items, `Show More` button is displayed
      setLastPatientIndex(9);
    }
  }, [pendingTodos]);

  return (
    <CardWrapper maxHeight={maxHeight}>
      <View style={styles.titleContainer}>
        <H4 text={i18n.t("Home.Todos")} style={[styles.title, titleColor]} />
      </View>
      {/* Loading indicator */}
      {fetchingTodos && <LoadingIndicator />}
      <View style={styles.listContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <ItemSeparator />}
          data={pendingTodos}
          renderItem={({ item, index }) => {
            return index === lastPatientIndex ? (
              <>
                <TodoRow
                  todoDetails={item}
                  riskLevel={
                    item.riskLevel ? item.riskLevel : RiskLevel.UNASSIGNED
                  }
                  disabled
                  reduceOpacity
                />
                {/* Disable last row, display "Show More button" */}
                <FloatingShowMoreButton />
              </>
            ) : (
              <TodoRow
                todoDetails={item}
                riskLevel={
                  item.riskLevel ? item.riskLevel : RiskLevel.UNASSIGNED
                }
              />
            );
          }}
          keyExtractor={(item) => item.createdAt}
        />
      </View>
    </CardWrapper>
  );
};

const styles = ScaledSheet.create({
  title: {
    fontWeight: "bold",
    paddingBottom: "5@ms",
    paddingRight: "5@ms"
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
