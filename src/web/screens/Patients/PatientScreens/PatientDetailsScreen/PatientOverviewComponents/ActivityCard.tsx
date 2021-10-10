import React, { FC } from "react";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import i18n from "util/language/i18n";
import { AbsoluteParameters } from "components/Text/AbsoluteParameters";
import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

interface ActivityCardProps {
  stepsTaken: string;
  stepsRequired: string;
  minHeight: number;
  flex?: number;
}

export const ActivityCard: FC<ActivityCardProps> = ({
  stepsTaken,
  stepsRequired,
  minHeight,
  flex
}) => {
  return (
    <CardWrapper
      minHeight={minHeight}
      flex={flex}
      title={i18n.t("Parameter_Graphs.Steps")}
      noChildrenPaddingHorizontal
    >
      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          width: "100%",
          height: "100%"
        }}
      >
        <View style={styles.container}>
          <AbsoluteParameters
            centerText={`${stepsTaken} / ${stepsRequired}`}
            bottomText={`(${i18n.t("Parameter_Graphs.StepsUnit")})`}
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
    width: "100%",
    height: "100%"
  }
});
