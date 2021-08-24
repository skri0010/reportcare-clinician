/* eslint-disable no-console */
import React, { FC } from "react";
import { View, Dimensions } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { H5 } from "components/Text";
import { RootState, select } from "util/useRedux";
import { AlertHistory } from "mock/mockPatientDetails";
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

export const AlertDetails: FC = () => {
  const { colors, alertInfo } = select((state: RootState) => ({
    colors: state.settings.colors,
    alertInfo: state.agents.alertInfo
  }));

  const cardHeight = Math.max(ms(100), Dimensions.get("window").height * 0.25);

  return (
    <View style={{ flexDirection: "column", paddingBottom: ms(20) }}>
      {/* Alert summary */}
      <SummaryCard
        summary={alertInfo ? alertInfo.summary : "-"}
        risk={alertInfo ? alertInfo.riskLevel : "-"}
        maxHeight={cardHeight}
        minHeight={cardHeight}
      />
      {/* Alert symptoms and signs */}
      <SymptomCard
        symptom={
          alertInfo && alertInfo.symptoms?.Name ? alertInfo.symptoms.Name : "-"
        }
        signs="Edema (Scale 3)" // JQ-TODO Get clarification on what signs mean and where to get the data
        maxHeight={ms(150)}
        minHeight={cardHeight}
      />
      {/* Alert BP */}
      <View style={{ flexDirection: "row", flex: 1, flexWrap: "wrap" }}>
        <BloodPressureCard
          bloodPressure={
            alertInfo && alertInfo.vitals?.BPDi ? alertInfo.vitals.BPDi : "-"
          }
          maxHeight={cardHeight}
          minHeight={cardHeight}
        />
        {/* Alert HRV */}
        {/* JQ-TODO Change hardcoded value for HRV once that is added to the schema */}
        <HRVCard HRV={89} maxHeight={cardHeight} minHeight={cardHeight} />
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
