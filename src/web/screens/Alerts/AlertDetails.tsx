import React, { FC } from "react";
import { View, Dimensions } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { AlertHistory } from "mock/mockPatientDetails";
import { BloodPressureCard } from "./AlertDetailsCards/BloodPressureCard";
import { HRVCard } from "./AlertDetailsCards/HRVCard";
import { SymptomCard } from "./AlertDetailsCards/SymptomCard";
import { SummaryCard } from "./AlertDetailsCards/SummaryCard";

export interface AlertDetailsProps {
  alertHistory: AlertHistory;
}

export const AlertDetails: FC<AlertDetailsProps> = ({ alertHistory }) => {
  const cardHeight = Math.max(ms(100), Dimensions.get("window").height * 0.25);

  return (
    <View style={{ flexDirection: "column" }}>
      <SummaryCard
        summary={alertHistory.description}
        risk={alertHistory.risk}
        maxHeight={cardHeight}
        minHeight={cardHeight}
      />
      <SymptomCard
        symptom={alertHistory.symptom}
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
