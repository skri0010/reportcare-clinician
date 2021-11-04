import React, { FC } from "react";
import {
  CardWrapper,
  FixedHeightCardWrapperProps
} from "components/Wrappers/CardWrapper";
import i18n from "util/language/i18n";
import { AbsoluteParameters } from "components/Text/AbsoluteParameters";
import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { Unit } from "util/const";

interface FluidIntakeCardProps extends FixedHeightCardWrapperProps {
  fluidIntakeInMl: number | string;
  fluidGoalInMl: number | string;
}

export const FluidIntakeCard: FC<FluidIntakeCardProps> = ({
  fluidIntakeInMl,
  fluidGoalInMl,
  fixedHeight,
  flex
}) => {
  return (
    <CardWrapper
      minHeight={fixedHeight}
      maxHeight={fixedHeight}
      flex={flex}
      title={i18n.t("Parameter_Graphs.FluidIntake")}
      noChildrenPaddingHorizontal
    >
      <View style={styles.container}>
        <AbsoluteParameters
          centerText={`${fluidIntakeInMl} / ${fluidGoalInMl}`}
          bottomText={`(${Unit.FLUID})`}
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
