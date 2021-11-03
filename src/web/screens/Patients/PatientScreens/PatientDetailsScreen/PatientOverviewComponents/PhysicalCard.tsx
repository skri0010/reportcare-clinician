import React, { FC } from "react";
import {
  CardWrapper,
  FixedHeightCardWrapperProps
} from "components/Wrappers/CardWrapper";
import i18n from "util/language/i18n";
import { AbsoluteParameters } from "components/Text/AbsoluteParameters";
import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

interface PhysicalCardProps extends FixedHeightCardWrapperProps {
  steps: number | string;
  stepsGoal: number | string;
  averageWalkingSpeedInMetresPerSeconds: number | string;
  distanceInMetres: number | string;
}

export const PhysicalCard: FC<PhysicalCardProps> = ({
  steps,
  stepsGoal,
  averageWalkingSpeedInMetresPerSeconds,
  distanceInMetres,
  fixedHeight,
  flex
}) => {
  return (
    <CardWrapper
      minHeight={fixedHeight}
      maxHeight={fixedHeight}
      flex={flex}
      title={i18n.t("Parameter_Graphs.Physical")}
      noChildrenPaddingHorizontal
    >
      <View style={styles.container}>
        {/* Steps */}
        <View style={{ flex: 1 }}>
          <AbsoluteParameters
            topText={i18n.t("Parameter_Graphs.Steps")}
            centerText={`${steps} / ${stepsGoal}`}
            bottomText={`(${i18n.t("Parameter_Graphs.StepsUnit")})`}
          />
        </View>
        <View style={{ flex: 1 }}>
          {/* Distance */}
          <AbsoluteParameters
            topText={i18n.t("Parameter_Graphs.Distance")}
            centerText={`${distanceInMetres}`}
            bottomText={`(${i18n.t("Parameter_Graphs.DistanceUnit")})`}
          />
        </View>
        <View style={{ flex: 1 }}>
          {/* Average speed */}
          <AbsoluteParameters
            topText={i18n.t("Parameter_Graphs.MeanSpeed")}
            centerText={`${averageWalkingSpeedInMetresPerSeconds}`}
            bottomText={`(${i18n.t("Parameter_Graphs.MeanSpeedUnit")})`}
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
