import { ClinicianRecord } from "aws/API";
import { RowButton } from "components/Buttons/TextButton";
import React, { FC } from "react";
import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import i18n from "util/language/i18n";
import { RootState, select } from "util/useRedux";
import { getLocalDateTime } from "util/utilityFunctions";
import { BaseDetailsCard, BaseDetailsContent } from "./BaseDetailsCard";

interface IcdCrtCardProps {
  icdCrtRecord: ClinicianRecord;
}

export const IcdCrtCard: FC<IcdCrtCardProps> = ({ icdCrtRecord }) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  return (
    <BaseDetailsCard
      cardTitle={i18n.t("Alerts.IcdCrt.IcdCrtRecord")}
      iconName="file-document-outline"
    >
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
            // Trigger to show ICD/CRT file
          }}
          title={i18n.t("Alerts.IcdCrt.ViewContent")}
          // disabled={!allowView}
          backgroundColor={
            // allowView ? colors.primaryButtonColor : colors.overlayColor
            colors.primaryButtonColor
          }
          fontSize={fonts.h6Size}
        />
      </View>
    </BaseDetailsCard>
  );
};

const styles = ScaledSheet.create({
  buttonContainer: { flexWrap: "wrap", width: "50%" }
});
