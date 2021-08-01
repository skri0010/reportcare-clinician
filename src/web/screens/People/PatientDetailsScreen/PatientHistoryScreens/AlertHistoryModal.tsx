import React, { FC } from "react";
import { View, TouchableOpacity } from "react-native";
import { RootState, select } from "util/useRedux";
import { getRiskLevelColor } from "models/RiskLevel";
import { H3, H4, H5 } from "components/Text/index";
import { ScaledSheet, ms } from "react-native-size-matters";
import { AlertHistory } from "mock/mockPatientDetails";

interface AlertHistoryModalProps {
  name: string;
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
          backgroundColor: colors.primaryWebBackgroundColor,
          borderColor: colors.secondaryBorderColor
        }
      ]}
    >
      <H3 text={`${name}`} style={{ fontWeight: "bold", paddingTop: ms(10) }} />
      <View style={{ paddingTop: ms(20) }}>
        <H4 text="Alert Summary" style={{ fontWeight: "bold" }} />
        <H5 text={`${alertHistory.description}`} style={null} />
      </View>
      <View style={{ paddingTop: ms(10) }}>
        <H4 text="Alert Details" style={{ fontWeight: "bold" }} />
        <View style={{ flexDirection: "row" }}>
          <H5 text="Severity: " style={{ fontWeight: "bold" }} />
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
        <AlertDetailsRow detailTitle="HRV: " detailContent={alertHistory.HRV} />
        <AlertDetailsRow detailTitle="BP: " detailContent={alertHistory.BP} />
        <AlertDetailsRow
          detailTitle="Symptom: "
          detailContent={alertHistory.symptom}
        />
        <AlertDetailsRow
          detailTitle="Signs: "
          detailContent={alertHistory.signs}
        />
      </View>
      <View style={{ flexDirection: "row", paddingTop: ms(20) }}>
        <H5
          text="Created on: "
          style={{ fontWeight: "bold", color: colors.secondaryTextColor }}
        />
        <H5
          text={`${alertHistory.date}`}
          style={{ color: colors.secondaryTextColor }}
        />
      </View>
      <View style={{ alignItems: "center" }}>
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
          <H3 text="Close" style={{ color: colors.primaryTextColor }} />
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
    height: "60%",
    paddingLeft: "10@ms",
    borderRadius: "10@ms",
    borderWidth: "1@ms",
    marginHorizontal: "35%"
  }
});
