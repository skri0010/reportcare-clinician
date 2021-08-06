import React, { FC, useEffect } from "react";
import { View } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { ScreenName, WithSideTabsProps } from "web/screens";
import { WelcomeCard } from "./WelcomeCard";
import { ms, ScaledSheet } from "react-native-size-matters";
import { RequestsByMariaCard } from "./RequestsByMariaCard";
import { AlertsCard } from "./AlertsCard";
import { TodosCard } from "./TodosCard";
import agentAPI from "agents_implementation/agent_framework/AgentAPI";
import Belief from "agents_implementation/agent_framework/base/Belief";
import {
  BeliefKeys,
  ClinicianAttributes,
  ProcedureAttributes,
  ProcedureConst
} from "agents_implementation/agent_framework/AgentEnums";
import agentDTA from "agents_implementation/agents/data-assistant/DTA";

export const HomeScreen: FC<WithSideTabsProps[ScreenName.HOME]> = () => {
  // JH-TODO Replace titles with i18n
  const cardMaxHeight = ms(300);

  // Triggers DTA to get count of pending alerts
  const getPendingAlertCount = () => {
    setTimeout(() => {
      agentDTA.addBelief(
        new Belief(
          BeliefKeys.CLINICIAN,
          ClinicianAttributes.RETRIEVE_PENDING_ALERT_COUNT,
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
    }, 1000);
  };

  useEffect(() => {
    getPendingAlertCount();
  }, []);

  return (
    <ScreenWrapper padding>
      <WelcomeCard name="Nailah" />
      <View style={styles.bottomContainer}>
        <RequestsByMariaCard maxHeight={cardMaxHeight} />
        <AlertsCard maxHeight={cardMaxHeight} />
        <TodosCard maxHeight={cardMaxHeight} />
      </View>
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  bottomContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
