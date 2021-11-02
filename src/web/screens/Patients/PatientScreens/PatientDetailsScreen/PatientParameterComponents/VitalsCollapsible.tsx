import React, { FC } from "react";
import { View } from "react-native";
import { FullVitalsChartData } from "components/VisualizationComponents/VitalsCharts/VitalsChartUtilities";
import { DiastolicBPChartCard } from "./VitalsChartCards/DiastolicBPChartCard";
import { SystolicBPChartCard } from "./VitalsChartCards/SystolicBPChartCard";
import { OxygenSaturationChartCard } from "./VitalsChartCards/OxygenSaturationChartCard";
import { WeightChartCard } from "./VitalsChartCards/WeightChartCard";
import { FluidIntakeChartCard } from "./VitalsChartCards/FluidIntakeChart";
import { ScaledSheet } from "react-native-size-matters";
import { InformationBlock } from "components/InfoComponents/InformationBlock";
import { ChartFilterPillList } from "components/Buttons/ChartFilterPillList";
import i18n from "util/language/i18n";
import { CollapsibleWrapper } from "./CollapsibleWrapper";

interface VitalsCollapsibleProps {
  fullVitalsChartData: FullVitalsChartData;
}

export const VitalsCollapsible: FC<VitalsCollapsibleProps> = ({
  fullVitalsChartData
}) => {
  return (
    <CollapsibleWrapper headerTitle={i18n.t("Parameter_Graphs.VitalsHeader")}>
      <InformationBlock information={i18n.t("Parameter_Graphs.Information")} />
      {/* Vitals filter pills */}
      <ChartFilterPillList />
      <View style={styles.container}>
        {/* Diastolic blood pressure graph */}
        <DiastolicBPChartCard data={fullVitalsChartData.diastolic} />
        {/* Systolic blood pressure graph */}
        <SystolicBPChartCard data={fullVitalsChartData.systolic} />
        {/* Oxygen saturation graph*/}
        <OxygenSaturationChartCard
          data={fullVitalsChartData.oxygenSaturation}
        />
        {/* Weight graph*/}
        <WeightChartCard data={fullVitalsChartData.weight} />
        {/* Fluid intake graph */}
        <FluidIntakeChartCard data={fullVitalsChartData.oxygenSaturation} />
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
