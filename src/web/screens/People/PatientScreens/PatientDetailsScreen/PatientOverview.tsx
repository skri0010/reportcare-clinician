import React, { FC } from "react";
// import { RootState, select } from "util/useRedux";
// import { View, TextStyle, FlatList } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
// import { mockPatientRowDetails } from "mock/mockTodoDetails";
// import { RiskLevel } from "models/RiskLevel";
// import { H3, H4 } from "components/Text/index";
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
        <BloodPressureCard
          systolic="23"
          dystolic="130"
          minHeight={cardHeight}
          flex={2}
        />
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
      <View style={styles.container}>
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
      {/* <View style={styles.container}>
        <View style={styles.regular}>
          <BloodPressureCard
            systolic="23"
            dystolic="130"
            minHeight={cardHeight}
          />
        </View>
        <View style={styles.combined}>
          <OxygenSaturationCard oxySatValue="90" minHeight={cardHeight} />
        </View>
        <View style={styles.combined}>
          <WeightCard weight="60" targetWeight="60" minHeight={cardHeight} />
        </View>
        <View style={styles.regular}>
          <MedicationTakenCard
            medications={[]}
            maxHeight={cardHeight}
            minHeight={cardHeight}
          />
        </View>
        <View style={styles.regular}>
          <SymptomsCard
            symptoms={[]}
            maxHeight={cardHeight}
            minHeight={cardHeight}
          />
        </View>
      </View> */}
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  // container: {
  //   display: "flex",
  //   flexDirection: "row",
  //   flexWrap: "wrap",
  //   paddingBottom: "20@ms"
  // },
  regular: {
    // flexGrow: 1,
    // flexShrink: 0,
    flexBasis: "50%"
  },
  combined: {
    flexBasis: "25%"
    // flexShrink: 0
  },
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
