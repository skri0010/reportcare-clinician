import React, { FC } from "react";
import { CardWrapper } from "components/Wrappers/CardWrapper";
import i18n from "util/language/i18n";
import { AbsoluteParameters } from "components/Text/AbsoluteParameters";
import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

interface FluidIntakeCardProps {
  fluidIntakeInMl: number | string;
  fluidGoalInMl: number | string;
  minHeight: number;
  flex?: number;
}

export const FluidIntakeCard: FC<FluidIntakeCardProps> = ({
  fluidIntakeInMl,
  fluidGoalInMl,
  minHeight,
  flex
}) => {
  return (
    <CardWrapper
      minHeight={minHeight}
      flex={flex}
      title={i18n.t("Parameter_Graphs.FluidIntake")}
      noChildrenPaddingHorizontal
    >
      <View style={styles.container}>
        <AbsoluteParameters
          centerText={`${fluidIntakeInMl} / ${fluidGoalInMl}`}
          bottomText={`(${i18n.t("Parameter_Graphs.FluidUnit")})`}
        />
      </View>
    </CardWrapper>
  );
};

const styles = ScaledSheet.create({
  container: {
    position: "absolute",
    flexDirection: "row",
    width: "100%",
    height: "100%"
  }
});
