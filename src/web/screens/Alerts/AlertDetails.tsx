import React, { FC, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { H2, H3, H4, H5 } from "components/Text";
import { RootState, select } from "util/useRedux";
import { ScreenWrapper } from "../ScreenWrapper";
import { AlertContext } from "./AlertScreen";
import { AlertHistory } from "mock/mockPatientDetails";
import { RiskLevel } from "models/RiskLevel";

export interface AlertDetailsProps {
  alertHistory: AlertHistory;
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
export const AlertDetails: FC<AlertDetailsProps> = ({ alertHistory }) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));
  return (
    <View style={{ flexDirection: "column" }}>
      <H4 text={alertHistory.description} />
      <H3 text="Alert Details" style={styles.informationTitle} />
      <AlertDetailsRow
        detailTitle="Severity: "
        detailContent={alertHistory.risk}
      />
      <AlertDetailsRow detailTitle="HRV: " detailContent={alertHistory.HRV} />
      <AlertDetailsRow detailTitle="BP: " detailContent={alertHistory.BP} />
      <AlertDetailsRow
        detailTitle="Sypmtom: "
        detailContent={alertHistory.symptom}
      />
      <AlertDetailsRow
        detailTitle="Signs: "
        detailContent={alertHistory.signs}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  rowStyle: {
    paddingBottom: "10@ms"
  },
  boldText: {
    fontWeight: "bold"
  },
  informationTitle: {
    fontWeight: "bold",
    paddingTop: "17@ms"
  }
});
