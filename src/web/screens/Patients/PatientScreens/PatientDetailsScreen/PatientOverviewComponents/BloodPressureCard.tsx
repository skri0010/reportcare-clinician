import React, { FC } from "react";
import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import {
  CardWrapper,
  FixedHeightCardWrapperProps
} from "components/Wrappers/CardWrapper";
import i18n from "util/language/i18n";
import { AbsoluteParameters } from "components/Text/AbsoluteParameters";

interface BloodPressureProps extends FixedHeightCardWrapperProps {
  systolicBloodPressure: number | string;
  diastolicBloodPressure: number | string;
}

export const BloodPressureCard: FC<BloodPressureProps> = ({
  systolicBloodPressure,
  diastolicBloodPressure,
  fixedHeight,
  flex
}) => {
  return (
    <CardWrapper
      minHeight={fixedHeight}
      maxHeight={fixedHeight}
      flex={flex}
      title={i18n.t("Patient_Overview.BloodPressure")}
      noChildrenPaddingHorizontal
    >
      <View style={styles.container}>
        {/* Systolic blood pressure */}
        <View style={{ flex: 1 }}>
          <AbsoluteParameters
            topText={i18n.t("Parameter_Graphs.Systolic")}
            centerText={systolicBloodPressure}
            bottomText={`(${i18n.t("Parameter_Graphs.BPUnit")})`}
          />
        </View>
        <View style={{ flex: 1 }}>
          {/* Diastolic blood pressure */}
          <AbsoluteParameters
            topText={i18n.t("Parameter_Graphs.Diastolic")}
            centerText={diastolicBloodPressure}
            bottomText={`(${i18n.t("Parameter_Graphs.BPUnit")})`}
          />
        </View>
      </View>
    </CardWrapper>
  );
};

const styles = ScaledSheet.create({
  container: {
    position: "absolute",
    flexDirection: "row",
    paddingHorizontal: "20@ms",
    width: "100%",
    height: "100%"
  }
});
