import React, { FC } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { RootState, select } from "util/useRedux";
import { getRiskLevelColor } from "models/RiskLevel";
import { H3, H4, H5 } from "components/Text/index";
import { ScaledSheet, ms } from "react-native-size-matters";
import { AlertHistory } from "mock/mockPatientDetails";
import i18n from "util/language/i18n";

interface AlertHistoryModalProps {
  name: string; // patient name
  alertHistory: AlertHistory;
  setModalAlertVisible: (state: boolean) => void;
}

interface AlertDetailsRowProps {
  detailTitle: string;
  detailContent: number | string;
}

const AlertDetailsRow: FC<AlertDetailsRowProps> = ({
  detailTitle,
  detailContent
}) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <H5 text={detailTitle} style={{ fontWeight: "bold" }} />
      <H5 text={`${detailContent}`} style={null} />
    </View>
  );
};

export const AlertHistoryModal: FC<AlertHistoryModalProps> = ({
  name,
  alertHistory,
  setModalAlertVisible
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.primaryContrastTextColor,
          borderColor: colors.primaryBorderColor
        }
      ]}
    >
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <H3
          text={`${name}`}
          style={{ fontWeight: "bold", paddingTop: ms(20) }}
        />
        {/* Alert summary */}
        <View style={{ paddingTop: ms(20) }}>
          <H4
            text={i18n.t("Patient_History.AlertSummaryCard.AlertSummary")}
            style={{ fontWeight: "bold" }}
          />
          {/* Alert summary description */}
          <H5 text={`${alertHistory.description}`} style={null} />
        </View>
        {/* Alert details */}
        <View style={{ paddingTop: ms(10) }}>
          <H4
            text={i18n.t("Patient_History.AlertSummaryCard.AlertDetails")}
            style={{ fontWeight: "bold" }}
          />
          {/* Severity */}
          <View style={{ flexDirection: "row" }}>
            <H5
              text={i18n.t("Patient_History.AlertSummaryCard.Severity")}
              style={{ fontWeight: "bold" }}
            />
            <H5
              text={`${alertHistory.risk}`}
              style={{
                color: getRiskLevelColor(
                  colors.riskLevelSelectedBackgroundColors,
                  alertHistory.risk
                )
              }}
            />
          </View>
          {/* HRV */}
          <AlertDetailsRow
            detailTitle={i18n.t("Patient_History.AlertSummaryCard.HRV")}
            detailContent={alertHistory.HRV}
          />
          {/* BP */}
          <AlertDetailsRow
            detailTitle={i18n.t("Patient_History.AlertSummaryCard.BP")}
            detailContent={alertHistory.BP}
          />
          {/* Symptoms */}
          <AlertDetailsRow
            detailTitle={i18n.t("Patient_History.AlertSummaryCard.Symptom")}
            detailContent={alertHistory.symptom}
          />
          {/* Signs */}
          <AlertDetailsRow
            detailTitle={i18n.t("Patient_History.AlertSummaryCard.Signs")}
            detailContent={alertHistory.signs}
          />
        </View>
        {/* Created datetime */}
        <View style={{ flexDirection: "row", paddingVertical: ms(20) }}>
          <H5
            text={i18n.t("Patient_History.AlertSummaryCard.CreatedOn")}
            style={{ fontWeight: "bold", color: colors.secondaryTextColor }}
          />
          <H5
            text={`${alertHistory.date}`}
            style={{ color: colors.secondaryTextColor }}
          />
        </View>
      </ScrollView>
      <View style={{ alignItems: "center" }}>
        {/* Close button */}
        <TouchableOpacity
          style={[
            styles.closeButton,
            {
              backgroundColor: colors.primaryContrastTextColor,
              borderColor: colors.primaryTextColor
            }
          ]}
          onPress={() => {
            setModalAlertVisible(false);
          }}
        >
          <H3
            text={i18n.t("Patient_History.CloseButton")}
            style={{ color: colors.primaryTextColor }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  closeButton: {
    textAlign: "center",
    justifyContent: "space-evenly",
    borderRadius: "5@ms",
    width: "60@ms",
    height: "25@ms",
    borderWidth: "1@ms",
    margin: "10@ms"
  },
  container: {
    width: "30%",
    minWidth: "250@ms",
    height: "65%",
    paddingLeft: "15@ms",
    borderRadius: "10@ms"
  }
});
