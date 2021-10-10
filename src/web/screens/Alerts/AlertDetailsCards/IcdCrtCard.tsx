import { useNetInfo } from "@react-native-community/netinfo";
import { ClinicianRecord } from "aws/API";
import { RowButton } from "components/Buttons/RowButton";
import { AgentTrigger } from "rc_agents/trigger";
import React, { FC, useEffect, useState } from "react";
import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import i18n from "util/language/i18n";
import { RootState, select } from "util/useRedux";
import { getLocalDateTime } from "util/utilityFunctions";
import { NoListItemMessage } from "web/screens/Shared/NoListItemMessage";
import { BaseDetailsCard, BaseDetailsContent } from "./BaseDetailsCard";

interface IcdCrtCardProps {
  icdCrtRecord?: ClinicianRecord;
}

export const IcdCrtCard: FC<IcdCrtCardProps> = ({ icdCrtRecord }) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  const netInfo = useNetInfo();

  const [isOnline, setIsOnline] = useState(false);

  // Detects changes in internet connection to enable or disable button for viewing content
  useEffect(() => {
    // Internet connection detected
    if (netInfo.isConnected && netInfo.isInternetReachable) {
      setIsOnline(true);
    }
    // No internet connection
    else if (
      netInfo.isConnected === false ||
      netInfo.isInternetReachable === false
    ) {
      setIsOnline(false);
    }
  }, [netInfo.isConnected, netInfo.isInternetReachable]);

  return (
    <BaseDetailsCard
      cardTitle={i18n.t("Alerts.IcdCrt.IcdCrtRecord")}
      iconName="file-document-outline"
    >
      {icdCrtRecord ? (
        <>
          <BaseDetailsContent
            title={i18n.t("Patient_ICD/CRT.Title")}
            content={icdCrtRecord.title}
          />
          <BaseDetailsContent
            title={i18n.t("Alerts.IcdCrt.UploadDateTime")}
            content={
              icdCrtRecord.uploadDateTime
                ? getLocalDateTime(icdCrtRecord.uploadDateTime)
                : "-"
            }
          />
          <View style={styles.buttonContainer}>
            <RowButton
              onPress={() => {
                AgentTrigger.triggerRetrieveIcdCrtRecordContent(icdCrtRecord);
              }}
              title={i18n.t("Alerts.IcdCrt.ViewContent")}
              disabled={!isOnline}
              backgroundColor={
                isOnline ? colors.primaryButtonColor : colors.overlayColor
              }
              fontSize={fonts.h6Size}
            />
          </View>
        </>
      ) : (
        <NoListItemMessage
          screenMessage={i18n.t("Alerts.IcdCrt.NoIcdCrtRecord")}
        />
      )}
    </BaseDetailsCard>
  );
};

const styles = ScaledSheet.create({
  buttonContainer: { flexWrap: "wrap", width: "100@ms" }
});
