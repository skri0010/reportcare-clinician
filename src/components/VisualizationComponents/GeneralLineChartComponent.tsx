import React, { FC } from "react";
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

export interface GeneralChartData {
  yData: number[];
  xLabels: string[];
  horizontalDataPoint?: number;
}

export interface BaseLineChartProps {
  graphTitle: string;
  graphSubtitle?: string;
  minDomainY?: number;
}

export interface BaseLineChartDataProps {
  data: GeneralChartData;
}

export interface GeneralLineChartProps
  extends BaseLineChartProps,
    BaseLineChartDataProps {}

export const GeneralLineChartComponent: FC<GeneralLineChartProps> = ({
  graphTitle,
  graphSubtitle,
  minDomainY,
  data
}) => {
  const { yData, xLabels } = data;

  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  // Store data in a form that is accepted by Victory
  const dataLines: { x: string; y: number }[][] = [];
  let temp: { x: string; y: number }[] = [];
  for (let i = 0; i < xLabels.length; i++) {
    if (yData[i] > 0) {
      // Push array with x and y data points
      temp.push({ x: xLabels[i], y: yData[i] });
      if (i === xLabels.length - 1) {
        dataLines.push(temp);
      }
    } else {
      // Push empty array if value is 0
      dataLines.push(temp);
      temp = [];
    }
  }

  const lineChartStyle = {
    data: {
      stroke: colors.basicLineColor,
      strokeWidth: 3
    }
  };

  const scatterStyle = {
    data: {
      fill: colors.basicLineColor
    }
  };

  const axisLabelStyle = { fontSize: "bold", fill: colors.primaryTextColor };

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
          tickValues={xLabels}
          tickLabelComponent={
            <VictoryLabel angle={45} dy={-5} dx={20} style={axisLabelStyle} />
          }
          standalone={false}
          style={{ grid: { stroke: colors.gridLineColor } }}
        />
        {/* Y-Axis */}
        <VictoryAxis
          dependentAxis
          tickLabelComponent={<VictoryLabel style={axisLabelStyle} />}
          style={{ grid: { stroke: colors.gridLineColor } }}
        />
        {/* VictoryLine renders only a single element to represent a dataset rather than individual elements for each data point */}
        {/* Victory plot for each discontinued line */}

        {dataLines.map((dataLine) => (
          <VictoryLine
            data={dataLine}
            style={lineChartStyle}
            key={dataLine[0].x}
          />
        ))}

        {/* Plot scatter plot */}
        {dataLines.map((dataLine) => (
          <VictoryScatter
            data={dataLine}
            size={5}
            style={scatterStyle}
            labels={({ datum }) => datum.y}
            labelComponent={
              <VictoryLabel style={{ fill: colors.labelColor }} />
            }
            key={dataLine[0].x}
          />
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
