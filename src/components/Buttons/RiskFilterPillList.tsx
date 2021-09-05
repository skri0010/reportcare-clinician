import React, { FC } from "react";
import { RiskLevel } from "models/RiskLevel";
import { RiskFilterPill } from "./RiskFilterPill";
import { View, FlatList } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { select, RootState, store } from "util/useRedux";
import {
  setAlertRiskFilters,
  setPatientRiskFilters
} from "ic-redux/actions/agents/actionCreator";
import { FetchAlertsMode, RiskFilter } from "rc_agents/model";
import { AgentTrigger } from "rc_agents/trigger";

interface RiskFilterPillListProps {
  patientScreen?: boolean;
  alertScreen?: boolean;
}

export const RiskFilterPillList: FC<RiskFilterPillListProps> = ({
  patientScreen = false,
  alertScreen = false
}) => {
  const { colors, riskFilters } = select((state: RootState) => ({
    colors: state.settings.colors,
    riskFilters: alertScreen
      ? state.agents.alertRiskFilters
      : state.agents.patientRiskFilters
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
    // Update risk filters based on which Screen user is on
    if (patientScreen) {
      store.dispatch(setPatientRiskFilters(tempRiskFilters));
      // Trigger agents to retrieve filtered patients
      AgentTrigger.triggerRetrievePatientsByRole();
    } else {
      // Trigger agents to set filtered alerts
      store.dispatch(setAlertRiskFilters(tempRiskFilters));

      // Trigger the DTA agent to retrieve alert status based on the alert status
      AgentTrigger.triggerRetrieveAlerts({
        fetchAlertsMode: FetchAlertsMode.ALL
      });
    }
  };

  return (
    <View
      style={
        (styles.container, { backgroundColor: colors.primaryContrastTextColor })
      }
    >
      {/* Risk filter pill list */}
      <FlatList
        contentContainerStyle={[
          styles.listContainer,
          { backgroundColor: colors.primaryContrastTextColor }
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
