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
import { setParametersChartFilters } from "ic-redux/actions/agents/filterActionCreator";
import { RootState, select } from "util/useRedux";

interface VitalsCollapsibleProps {
  fullVitalsChartData: FullVitalsChartData;
}

export const VitalsCollapsible: FC<VitalsCollapsibleProps> = ({
  fullVitalsChartData
}) => {
  const { parametersChartFilter } = select((state: RootState) => ({
    parametersChartFilter: state.filters.parametersChartFilter
  }));

  return (
    <CollapsibleWrapper headerTitle={i18n.t("Parameter_Graphs.VitalsHeader")}>
      <InformationBlock information={i18n.t("Parameter_Graphs.Information")} />
      {/* Vitals filter pills */}
      <ChartFilterPillList
        chartFilter={parametersChartFilter}
        setChartFilters={setParametersChartFilters}
      />
      <View style={styles.container}>
        {/* Diastolic blood pressure graph */}
        <DiastolicBPChartCard
          data={fullVitalsChartData.diastolic}
          chartFilter={parametersChartFilter}
        />
        {/* Systolic blood pressure graph */}
        <SystolicBPChartCard
          data={fullVitalsChartData.systolic}
          chartFilter={parametersChartFilter}
        />
        {/* Oxygen saturation graph*/}
        <OxygenSaturationChartCard
          data={fullVitalsChartData.oxygenSaturation}
          chartFilter={parametersChartFilter}
        />
        {/* Weight graph*/}
        <WeightChartCard
          data={fullVitalsChartData.weight}
          chartFilter={parametersChartFilter}
        />
        {/* Fluid intake graph */}
        <FluidIntakeChartCard
          data={fullVitalsChartData.oxygenSaturation}
          chartFilter={parametersChartFilter}
        />
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
