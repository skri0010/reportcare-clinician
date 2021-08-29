import React, { FC } from "react";
import { Dimensions, View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { WeightChartCard } from "./PatientParameterComponents/WeightChartCard";
import { DiastolicBPChartCard } from "./PatientParameterComponents/DiastolicBPChartCard";
import { OxygenSaturationParameterCard } from "./PatientParameterComponents/OxygenSaturationChartCard";
import { SystolicBPChartCard } from "./PatientParameterComponents/SystolicBPChartCard";
import { PatientDetailsTabProps } from "web/navigation/types";
import { PatientDetails } from "rc_agents/model";

interface PatientParametersProps
  extends PatientDetailsTabProps.ParametersTabProps {
  details: PatientDetails;
}

export const PatientParameters: FC<PatientParametersProps> = ({ details }) => {
  const cardMaxHeight = Math.max(
    ms(200),
    Dimensions.get("window").height * 0.8
  );

  return (
    <ScreenWrapper padding>
      <View style={styles.container}>
        {/* Systolic Blood Graph */}
        <SystolicBPChartCard
          patientId={details.patientInfo.patientID}
          maxHeight={cardMaxHeight}
        />
        {/* Diastolic Blood Graph */}
        <DiastolicBPChartCard
          patientId={details.patientInfo.patientID}
          maxHeight={cardMaxHeight}
        />
      </View>
      <View style={styles.container}>
        {/* Oxygen Saturation graph */}
        <OxygenSaturationParameterCard
          patientId={details.patientInfo.patientID}
          maxHeight={cardMaxHeight}
        />
        {/* Weight Graph */}
        <WeightChartCard
          patientId={details.patientInfo.patientID}
          maxHeight={cardMaxHeight}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap"
  }
});
