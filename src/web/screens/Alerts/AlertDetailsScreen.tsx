import React, { FC, useEffect, useState } from "react";
import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { ScreenWrapper } from "components/Wrappers/ScreenWrapper";
import { AlertDetails } from "./AlertDetails";
import { RiskLevel } from "models/RiskLevel";
import { HighRiskAlertDetails } from "./HighRiskAlertDetails";
import { InnerScreenButton } from "components/Buttons/InnerScreenButton";
import i18n from "util/language/i18n";
import { Role } from "rc_agents/model";

interface AlertDetailsScreenProps {
  setModalVisible: (state: boolean) => void;
}

export const AlertDetailsScreen: FC<AlertDetailsScreenProps> = ({
  setModalVisible
}) => {
  const { alertInfo, clinician } = select((state: RootState) => ({
    alertInfo: state.alerts.alertInfo,
    clinician: state.clinicians.clinician
  }));

  const [showHighRiskDetails, setShowHighRiskDetails] = useState(false);

  // Checks for clinician's role to determine which alert details component to be shown
  useEffect(() => {
    if (
      clinician &&
      (clinician.role === Role.EP || clinician.role === Role.HF_SPECIALIST)
    ) {
      setShowHighRiskDetails(true);
    }
  }, [clinician]);

  return (
    <ScreenWrapper
      fixedChildren={
        // Create Todo button
        <InnerScreenButton
          title={i18n.t("Alerts.CreateToDo")}
          onPress={() => {
            // Allows the create todo modal to be visible
            setModalVisible(true);
          }}
          style={styles.buttonContainer}
        />
      }
    >
      <View style={styles.container}>
        {/* Alert details cards */}
        {!alertInfo ? null : alertInfo.riskLevel === RiskLevel.HIGH &&
          showHighRiskDetails ? (
          <HighRiskAlertDetails />
        ) : (
          <AlertDetails />
        )}
      </View>
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  container: {
    marginHorizontal: "25@ms",
    marginTop: "-20@ms",
    marginBottom: "15@ms"
  },
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    marginVertical: "10@ms",
    marginRight: "32@ms"
  }
});
