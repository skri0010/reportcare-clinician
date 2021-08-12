import React, { FC } from "react";
import { ms, ScaledSheet } from "react-native-size-matters";
import { ScreenWrapper } from "../../../ScreenWrapper";
import { BloodPressureCard } from "./PatientOverviewCards/BloodPressureCard";
import { MedicationTakenCard } from "./PatientOverviewCards/MedicationCard";
import { OxygenSaturationCard } from "./PatientOverviewCards/OxygenSaturationCard";
import { WeightCard } from "./PatientOverviewCards/WeightCard";
import { SymptomsCard } from "./PatientOverviewCards/SymptomsCard";
import { Dimensions, View } from "react-native";
import { WithPatientsScreenProps } from "../../../WithPatientsScreenProps";
import { PatientsScreenName } from "web/screens";

export const PatientOverview: FC<
  WithPatientsScreenProps[PatientsScreenName.OVERVIEW]
> = () => {
  // Query details for overview here
  const cardHeight = Dimensions.get("window").height * 0.325;
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={{ flexGrow: 2, flexShrink: 2 }}>
          {/* Blood Pressure Card */}
          <BloodPressureCard
            systolic="23"
            dystolic="130"
            minHeight={cardHeight}
          />
        </View>
        <View style={{ flexGrow: 1, flexShrink: 2 }}>
          {/* Oxygen Saturation card and Weigth card to share fixed space */}
          <View style={{ flexDirection: "row" }}>
            <OxygenSaturationCard
              oxySatValue="90"
              minHeight={cardHeight}
              flex={1}
            />
            <WeightCard
              weight="60"
              targetWeight="60"
              minHeight={cardHeight}
              flex={1}
            />
          </View>
        </View>
      </View>
      <View style={[styles.container, { paddingBottom: ms(10) }]}>
        {/* Medication and symptoms card */}
        <MedicationTakenCard
          medications={[]}
          maxHeight={cardHeight}
          minHeight={cardHeight}
        />
        <SymptomsCard
          symptoms={[]}
          maxHeight={cardHeight}
          minHeight={cardHeight}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
