import React, { FC } from "react";
import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { FullPhysicalsChartData } from "components/VisualizationComponents/PhysicalsCharts/PhysicalsChartUtilities";
import { StepsChartCard } from "./PhysicalsChartCards/StepsChartCard";
import { DistanceChartCard } from "./PhysicalsChartCards/DistanceChartCard";
import { MeanSpeedChartCard } from "./PhysicalsChartCards/MeanSpeedChartCard";
import { CollapsibleWrapper } from "./CollapsibleWrapper";
import i18n from "util/language/i18n";

interface PhysicalsCollapsibleProps {
  fullPhysicalsChartData: FullPhysicalsChartData;
}

export const PhysicalsCollapsible: FC<PhysicalsCollapsibleProps> = ({
  fullPhysicalsChartData
}) => {
  return (
    <CollapsibleWrapper
      headerTitle={i18n.t("Parameter_Graphs.PhysicalsHeader")}
    >
      <View style={styles.container}>
        {/* Steps graph */}
        <StepsChartCard data={fullPhysicalsChartData.steps} />
        {/* Distance graph */}
        <DistanceChartCard data={fullPhysicalsChartData.distance} />
        {/* Mean speed graph */}
        <MeanSpeedChartCard data={fullPhysicalsChartData.meanSpeed} />
      </View>
    </CollapsibleWrapper>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap"
  }
});
