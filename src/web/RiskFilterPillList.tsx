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
import { AlertStatus, RiskFilter } from "rc_agents/model";
import { agentDTA } from "rc_agents/agents";
import { agentAPI, Belief } from "rc_agents/framework";
import {
  BeliefKeys,
  ClinicianAttributes,
  ProcedureAttributes,
  ProcedureConst
} from "rc_agents/AgentEnums";
import { H6 } from "components/Text";
import i18n from "util/language/i18n";

interface RiskFilterPillListProps {
  patientScreen?: boolean;
  alertScreen?: boolean;
  pendingAlert?: boolean;
}

export const RiskFilterPillList: FC<RiskFilterPillListProps> = ({
  patientScreen = false,
  alertScreen = false,
  pendingAlert = false
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
      agentDTA.addBelief(
        new Belief(
          BeliefKeys.CLINICIAN,
          ClinicianAttributes.RETRIEVE_ROLE,
          true
        )
      );
      agentAPI.addFact(
        new Belief(
          BeliefKeys.PROCEDURE,
          ProcedureAttributes.HF_OTP_I,
          ProcedureConst.ACTIVE
        )
      );
    } else {
      // Trigger agents to get filtered alerts
      // Here need to trigger based on page of alert
      store.dispatch(setAlertRiskFilters(tempRiskFilters));
      // add alert status to be used by agents
      if (pendingAlert) {
        agentAPI.addFact(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.ALERT_STATUS,
            AlertStatus.PENDING
          ),
          false
        );
      } else {
        agentAPI.addFact(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.ALERT_STATUS,
            AlertStatus.COMPLETED
          ),
          false
        );
      }

      // Trigger DTA to retrieve alerts
      agentDTA.addBelief(
        new Belief(
          BeliefKeys.CLINICIAN,
          ClinicianAttributes.RETRIEVE_ALERTS,
          true
        )
      );
      agentAPI.addFact(
        new Belief(
          BeliefKeys.PROCEDURE,
          ProcedureAttributes.AT_CP,
          ProcedureConst.ACTIVE
        )
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Filter by text */}
      <View style={styles.textContainer}>
        <H6 text={i18n.t("Patients.PatientsList.FilterBy")} />
      </View>
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
    paddingTop: "3@ms"
  },
  textContainer: {
    paddingLeft: "10@ms",
    justifyContent: "center",
    paddingBottom: "5@ms"
  },
  listContainer: {
    flex: 1,
    flexDirection: "row",
    paddingBottom: "5@ms"
  }
});
