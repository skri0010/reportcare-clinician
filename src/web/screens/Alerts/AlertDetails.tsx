import React, { FC } from "react";
import { View, Dimensions } from "react-native";
import { ms } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { BloodPressureCard } from "./AlertDetailsCards/BloodPressureCard";
import { HRVCard } from "./AlertDetailsCards/HRVCard";
import { SymptomCard } from "./AlertDetailsCards/SymptomCard";
import { SummaryCard } from "./AlertDetailsCards/SummaryCard";

export const AlertDetails: FC = () => {
  const cardHeight = Math.max(ms(100), Dimensions.get("window").height * 0.25);
  const { alertInfo } = select((state: RootState) => ({
    alertInfo: state.agents.alertInfo
  }));

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
          alertInfo && alertInfo.symptomReport?.Name
            ? alertInfo.symptomReport.Name
            : "-"
        }
        signs="Edema (Scale 3)" // JQ-TODO Get clarification on what signs mean and where to get the data
        maxHeight={ms(150)}
        minHeight={cardHeight}
      />
      {/* Alert BP */}
      <View style={{ flexDirection: "row", flex: 1, flexWrap: "wrap" }}>
        <BloodPressureCard
          bloodPressure={
            alertInfo && alertInfo.vitalsReport?.BPDi
              ? alertInfo.vitalsReport.BPDi
              : "-"
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
