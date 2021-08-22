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
import { H6 } from "components/text";
import i18n from "util/language/i18n";

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
    <View style={styles.container}>
      {/* Risk filter pill list */}
      <FlatList
        contentContainerStyle={[
          styles.listContainer,
          { backgroundColor: colors.primaryBackgroundColor }
        ]}
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
    flexDirection: "row",
    paddingVertical: "5@ms"
  },
  textContainer: {
    paddingLeft: "10@ms",
    justifyContent: "center",
    paddingBottom: "5@ms"
  },
  listContainer: {
    flexDirection: "row",
    paddingBottom: "5@ms",
    paddingLeft: "5@ms"
  }
});
