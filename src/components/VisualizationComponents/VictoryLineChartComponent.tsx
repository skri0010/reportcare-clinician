import React, { FC } from "react";
import {
  ChartData,
  getVictoryChartData
} from "components/VisualizationComponents/ParameterGraphs";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryScatter,
  VictoryTheme
} from "victory";
import { ms, ScaledSheet } from "react-native-size-matters";
import { View } from "react-native";
import { H4, H5 } from "components/Text";
import { RootState, select } from "util/useRedux";
import { ChartViewTypes } from "models/ChartViewTypes";

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
  const { colors, chartFilter } = select((state: RootState) => ({
    colors: state.settings.colors,
    chartFilter: state.agents.chartFilters
  }));

  // Store min max and avg to a form that is accepted by Victory
  let minDataLine: { x: string; y: number }[][] = [];
  let maxDataLine: { x: string; y: number }[][] = [];
  let avgDataLine: { x: string; y: number }[][] = [];

  // Obtain multiple sets of data for each measure to plot discontinuous lines
  minDataLine = getVictoryChartData(data, ChartViewTypes.MIN);
  maxDataLine = getVictoryChartData(data, ChartViewTypes.MAX);
  avgDataLine = getVictoryChartData(data, ChartViewTypes.AVERAGE);

  // Styles needed for charts
  const avgStyle = {
    data: {
      stroke: colors.avgLineColor,
      strokeWidth: 3,
      opacity: !(chartFilter.average || chartFilter.all) ? 0.1 : 1
    }
  };

  const minStyle = {
    data: {
      stroke: colors.minLineColor,
      strokeWidth: 3,
      opacity: !(chartFilter.min || chartFilter.all) ? 0.1 : 1
    }
  };

  const maxStyle = {
    data: {
      stroke: colors.maxLineColor,
      strokeWidth: 3,
      opacity: !(chartFilter.max || chartFilter.all) ? 0.1 : 1
    }
  };

  const avgStyleScatter = {
    data: {
      fill: colors.avgLineColor,
      opacity: !(chartFilter.average || chartFilter.all) ? 0.1 : 1
    }
  };

  const minStyleScatter = {
    data: {
      fill: colors.minLineColor,
      opacity: !(chartFilter.min || chartFilter.all) ? 0.1 : 1
    }
  };

  const maxStyleScatter = {
    data: {
      fill: colors.maxLineColor,
      opacity: !(chartFilter.max || chartFilter.all) ? 0.1 : 1
    }
  };

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
          tickValues={data.xLabels}
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
        {/* Victory plot for each discontinued line */}
        {minDataLine.map((minLines) => (
          <VictoryScatter
            data={minLines}
            size={5}
            style={minStyleScatter}
            labels={chartFilter.min ? ({ datum }) => datum.y : undefined}
            labelComponent={chartFilter.min ? <VictoryLabel /> : undefined}
            key={minLines[0].x}
          />
        ))}

        {maxDataLine.map((maxLines) => (
          <VictoryScatter
            data={maxLines}
            size={5}
            style={maxStyleScatter}
            labels={chartFilter.max ? ({ datum }) => datum.y : undefined}
            labelComponent={chartFilter.max ? <VictoryLabel /> : undefined}
            key={maxLines[0].x}
          />
        ))}

        {avgDataLine.map((avgLines) => (
          <VictoryScatter
            data={avgLines}
            size={5}
            style={avgStyleScatter}
            labels={chartFilter.average ? ({ datum }) => datum.y : undefined}
            labelComponent={chartFilter.average ? <VictoryLabel /> : undefined}
            key={avgLines[0].x}
          />
        ))}

        {/* Plot Scatter plot */}
        {minDataLine.map((minLines) => (
          <VictoryLine data={minLines} style={minStyle} key={minLines[0].x} />
        ))}

        {maxDataLine.map((maxLines) => (
          <VictoryLine data={maxLines} style={maxStyle} key={maxLines[0].x} />
        ))}

        {avgDataLine.map((avgLines) => (
          <VictoryLine data={avgLines} style={avgStyle} key={avgLines[0].x} />
        ))}
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
