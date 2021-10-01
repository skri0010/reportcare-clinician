import React, { FC } from "react";
import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import i18n from "util/language/i18n";
import { AbsoluteParameters } from "components/Text/AbsoluteParameters";

interface BloodPressureProps {
  systolicBP: string;
  diastolicBP: string;
  minHeight: number;
  flex?: number;
}

export const BloodPressureCard: FC<BloodPressureProps> = ({
  systolicBP,
  diastolicBP,
  minHeight,
  flex
}) => {
  return (
    <CardWrapper
      minHeight={minHeight}
      flex={flex}
      title={i18n.t("Patient_Overview.BloodPressure")}
      noChildrenPaddingHorizontal
    >
      <View style={styles.container}>
        {/* Systolic blood pressure */}
        <View style={{ flex: 1 }}>
          <AbsoluteParameters
            centerText={systolicBP}
            bottomText={i18n.t("Parameter_Graphs.BPUnit")}
          />
        </View>
        <View style={{ flex: 1 }}>
          {/* Diastolic blood pressure */}
          <AbsoluteParameters
            centerText={diastolicBP}
            bottomText={i18n.t("Parameter_Graphs.BPUnit")}
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
