import React, { FC } from "react";
import { ChartData } from "components/VisualizationComponents/ParameterGraphs";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryTheme
} from "victory";
import { ms, ScaledSheet } from "react-native-size-matters";
import { View } from "react-native";
import { H4, H5 } from "components/Text";
import { RootState, select } from "util/useRedux";

interface LineChartProps {
  graphTitle: string;
  graphSubtitle?: string;
  minDomainY?: number;
  data: ChartData;
}

export const LineChartComponent: FC<LineChartProps> = ({
  graphTitle,
  graphSubtitle,
  minDomainY,
  data
}) => {
  const { chartFilter } = select((state: RootState) => ({
    chartFilter: state.agents.chartFilters
  }));

  // Store min max and avg to a form that is accepted by Victory
  const minData = [];
  const maxData = [];
  const avgData = [];

  for (let i = 0; i < data.min.length; i++) {
    minData.push({ x: data.xLabels[i], y: data.min[i] });
    maxData.push({ x: data.xLabels[i], y: data.max[i] });
    avgData.push({ x: data.xLabels[i], y: data.average[i] });
  }

  return (
    <View style={{ maxHeight: ms(275) }}>
      {/* Title */}
      <View style={styles.titleContainer}>
        <H4 text={graphTitle} style={styles.title} />
        {graphSubtitle && <H5 text={graphSubtitle} style={styles.title} />}
      </View>
      {/* Shared chart component */}
      <VictoryChart
        theme={VictoryTheme.material}
        minDomain={{ y: minDomainY }}
        domainPadding={{ y: 20, x: 20 }}
      >
        {/* X-Axis */}
        <VictoryAxis
          tickLabelComponent={
            <VictoryLabel
              angle={45}
              dy={-5}
              dx={20}
              style={{ fontSize: "bold" }}
            />
          }
          standalone={false}
        />
        {/* Y-Axis */}
        <VictoryAxis
          dependentAxis
          tickLabelComponent={<VictoryLabel style={{ fontSize: "bold" }} />}
        />
        {/* VictoryLine renders only a single element to represent a dataset rather than individual elements for each data point 
            min max and average are their own respective line components.
            Lines have been configure to show label and have higher opacity compared to the rest when chosen specifically
            */}
        <VictoryLine
          data={minData}
          style={{
            data: {
              stroke: "#c43a31",
              strokeWidth: 5,
              opacity: !(chartFilter.Min || chartFilter.All) ? 0.1 : 1
            }
          }}
          labels={chartFilter.Min ? ({ datum }) => datum.y : undefined}
          labelComponent={chartFilter.Min ? <VictoryLabel /> : undefined}
        />
        <VictoryLine
          data={maxData}
          style={{
            data: {
              stroke: "#5fff42",
              strokeWidth: 5,
              opacity: !(chartFilter.Max || chartFilter.All) ? 0.1 : 1
            }
          }}
          labels={chartFilter.Max ? ({ datum }) => datum.y : undefined}
          labelComponent={chartFilter.Max ? <VictoryLabel /> : undefined}
        />
        <VictoryLine
          data={avgData}
          style={{
            data: {
              stroke: "#edf24b",
              strokeWidth: 5,
              opacity: !(chartFilter.Avg || chartFilter.All) ? 0.1 : 1
            }
          }}
          labels={chartFilter.Avg ? ({ datum }) => datum.y : undefined}
          labelComponent={chartFilter.Avg ? <VictoryLabel /> : undefined}
        />
      </VictoryChart>
    </View>
  );
};

const styles = ScaledSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    marginLeft: ms(10),
    marginBottom: ms(-20)
  },
  title: {
    fontWeight: "600"
  }
});
