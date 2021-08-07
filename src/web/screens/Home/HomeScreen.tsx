import React, { FC, useEffect } from "react";
import { View } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { ScreenName, WithSideTabsProps } from "web/screens";
import { WelcomeCard } from "./WelcomeCard";
import { ms, ScaledSheet } from "react-native-size-matters";
import { RequestsByMariaCard } from "./RequestsByMariaCard";
import { AlertsCard } from "./AlertsCard";
import { TodosCard } from "./TodosCard";
import { PendingPatientAssignmentsCard } from "./PendingPatientAssignmentsCard";
import agentAPI from "rc-agents/framework/AgentAPI";
import Belief from "rc-agents/framework/base/Belief";
import {
  BeliefKeys,
  ClinicianAttributes,
  ProcedureAttributes,
  ProcedureConst
} from "rc-agents/framework/AgentEnums";
import agentDTA from "rc-agents/agents/data-assistant/DTA";

export const HomeScreen: FC<WithSideTabsProps[ScreenName.HOME]> = () => {
  // JH-TODO Replace titles with i18n
  // JH-TODO Replace welcome card name
  const topMaxHeight = ms(150);
  const maxHeight = ms(250);

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
      <View style={styles.container}>
        <AlertsCard maxHeight={topMaxHeight} flex={1.2} />
        <WelcomeCard name="Nailah" maxHeight={topMaxHeight} flex={1.8} />
      </View>
      <View style={styles.container}>
        <RequestsByMariaCard maxHeight={maxHeight} />
        <TodosCard maxHeight={maxHeight} />
        <PendingPatientAssignmentsCard maxHeight={maxHeight} />
      </View>
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
