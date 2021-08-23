import React, { FC, useContext } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { H2, H3, H4, H5 } from "components/Text";
import { RootState, select } from "util/useRedux";
import { ScreenWrapper } from "../ScreenWrapper";
import { AlertContext } from "./AlertScreen";
import { AlertHistory } from "mock/mockPatientDetails";
import { RiskLevel } from "models/RiskLevel";
import { BloodPressureCard } from "./AlertDetailsCards/BloodPressureCard";
import { HRVCard } from "./AlertDetailsCards/HRVCard";
import { SymptomCard } from "./AlertDetailsCards/SymptomCard";
import { SummaryCard } from "./AlertDetailsCards/SummaryCard";

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
  const { colors, alertInfo } = select((state: RootState) => ({
    colors: state.settings.colors,
    alertInfo: state.agents.alertInfo
  }));

  const cardHeight = Math.max(ms(100), Dimensions.get("window").height * 0.25);

  return (
    <View style={{ flexDirection: "column" }}>
      <SummaryCard
        summary={alertInfo ? alertInfo.summary : "-"}
        risk={alertInfo ? alertInfo.riskLevel : "-"}
        maxHeight={cardHeight}
        minHeight={cardHeight}
      />
      <SymptomCard
        symptom={alertHistory.signs}
        signs={alertHistory.signs}
        maxHeight={cardHeight}
        minHeight={cardHeight}
      />
      <View style={{ flexDirection: "row", flex: 1 }}>
        <BloodPressureCard
          bloodPressure={alertHistory.BP}
          maxHeight={cardHeight}
          minHeight={cardHeight}
        />
        <HRVCard
          HRV={alertHistory.HRV}
          maxHeight={cardHeight}
          minHeight={cardHeight}
        />
      </View>
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
