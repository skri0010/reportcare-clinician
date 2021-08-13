import React, { FC } from "react";
import { RiskLevel } from "models/RiskLevel";
import { RiskFilterPill } from "./RiskFilterPill";
import { View, FlatList } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { select, RootState, store } from "util/useRedux";
import { setRiskFilters } from "ic-redux/actions/agents/actionCreator";
import { RiskFilter } from "rc_agents/model";
import { agentDTA } from "rc_agents/agents";
import { agentAPI, Belief } from "rc_agents/framework";
import {
  BeliefKeys,
  ClinicianAttributes,
  ProcedureAttributes,
  ProcedureConst
} from "rc_agents/AgentEnums";

export const RiskFilterPillList: FC = () => {
  const { colors, riskFilters } = select((state: RootState) => ({
    colors: state.settings.colors,
    riskFilters: state.agents.riskFilters
  }));

  // Function to toggle selected risk filters
  const setSelectedRiskFilter = (riskLevel: RiskLevel) => {
    const tempRiskFilters: RiskFilter = {
      [RiskLevel.HIGH]: riskFilters.High,
      [RiskLevel.MEDIUM]: riskFilters.Medium,
      [RiskLevel.LOW]: riskFilters.Low,
      [RiskLevel.UNASSIGNED]: riskFilters.Unassigned
    };
    tempRiskFilters[riskLevel] = !tempRiskFilters[riskLevel];
    // Update risk filters
    store.dispatch(setRiskFilters(tempRiskFilters));
    // Trigger agents to retrieve filtered patients
    agentDTA.addBelief(
      new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.RETRIEVE_ROLE, true)
    );

    agentAPI.addFact(
      new Belief(
        BeliefKeys.PROCEDURE,
        ProcedureAttributes.HF_OTP_I,
        ProcedureConst.ACTIVE
      )
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.primaryBackgroundColor }
      ]}
    >
      <FlatList
        contentContainerStyle={styles.container}
        data={Object.values(RiskLevel)}
        horizontal
        renderItem={({ item }) => (
          <RiskFilterPill
            riskLevel={item}
            selected={riskFilters[item]}
            onPress={setSelectedRiskFilter}
          />
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: "3@ms",
    paddingHorizontal: "10@ms"
  }
});
