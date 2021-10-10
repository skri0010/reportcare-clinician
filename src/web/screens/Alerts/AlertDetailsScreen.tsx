import React, { FC } from "react";
import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { ScreenWrapper } from "components/Wrappers/ScreenWrapper";
import { AlertDetails } from "./AlertDetails";
import { RiskLevel } from "models/RiskLevel";
import { HighRiskAlertDetails } from "./HighRiskAlertDetails";
import { InnerScreenButton } from "components/Buttons/InnerScreenButton";
import i18n from "util/language/i18n";

interface AlertDetailsScreenProps {
  setModalVisible: (state: boolean) => void;
}

export const AlertDetailsScreen: FC<AlertDetailsScreenProps> = ({
  setModalVisible
}) => {
  const { alertInfo } = select((state: RootState) => ({
    alertInfo: state.agents.alertInfo
  }));

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Alert details cards */}
        {!alertInfo ? null : alertInfo.riskLevel === RiskLevel.HIGH ? (
          <HighRiskAlertDetails />
        ) : (
          <AlertDetails />
        )}
        {/* Create todo button */}
        <InnerScreenButton
          title={i18n.t("Alerts.CreateToDo")}
          onPress={() => {
            // Allows the create todo modal to be visible
            setModalVisible(true);
          }}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  container: {
    margin: "30@ms",
    marginLeft: "40ms"
  },
  patientName: {
    paddingBottom: "10@ms"
  },
  headers: {
    fontWeight: "bold",
    paddingBottom: "17@ms"
  },
  informationTitle: {
    fontWeight: "bold",
    paddingTop: "17@ms"
  }
});
