import React, { FC } from "react";
import { Dimensions, ViewStyle, Platform, View } from "react-native";
import { RootState, select } from "util/useRedux";
import { LineChart } from "react-native-chart-kit";
import { ms, ScaledSheet } from "react-native-size-matters";
import { H4, H5 } from "components/Text";
import { ChartData } from "./ParameterGraphs";

interface LineChartProps {
  graphTitle: string;
  graphSubtitle?: string;
  xLabels: string[];
  data: ChartData;
  fromZero?: boolean;
}

/*
 * There seems to be an issue with the line chart package and react-natiove-svg where there is no onPress support for web
 * https://stackoverflow.com/questions/62124540/react-native-chart-graph-library-that-supports-user-onpress
 */

export const LineChartComponent: FC<LineChartProps> = ({
  graphTitle,
  graphSubtitle,
  xLabels,
  data,
  fromZero = false
}) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  // Line graphs configuration
  const chartConfig = {
    backgroundGradientFrom: colors.primaryBackgroundColor,
    backgroundGradientTo: colors.primaryBackgroundColor,
    color: (opacity = 1) => `rgba(255, 0, 100, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: ms(4),
    propsForLabels: {
      fontSize: fonts.h5Size,
      fontWeight: "600"
    },
    propsForDots: {
      r: "6"
    },
    propsForBackgroundLines: {
      strokeWidth: ms(2)
    }
  };

  // Local styles
  const webChartStyle = {
    paddingTop: ms(20),
    paddingRight: ms(50),
    alignSelf: "center"
  } as Partial<ViewStyle>;

  const mobileChartStyle = {
    paddingTop: ms(20),
    paddingBottom: ms(10),
    alignSelf: "center"
  } as Partial<ViewStyle>;

  const chartStyle = Platform.OS === "web" ? webChartStyle : mobileChartStyle;

  // JY-TODO Change the mobile version to not use dimensions after testing
  const width =
    Platform.OS === "web" ? ms(185) : (Dimensions.get("window").width * 6) / 7;

  const height =
    Platform.OS === "web" ? ms(250) : Dimensions.get("window").height / 3;

  return (
    <View>
      <View style={styles.titleContainer}>
        <H4 text={graphTitle} style={styles.title} />
        {graphSubtitle && <H5 text={graphSubtitle} style={styles.title} />}
      </View>
      <LineChart
        data={{
          labels: xLabels,
          datasets: [
            {
              data: data.min
            },
            {
              data: data.average
            },
            {
              data: data.max
            }
          ]
        }}
        width={width}
        height={height}
        chartConfig={chartConfig}
        style={chartStyle}
        fromZero={fromZero}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    marginLeft: ms(10),
    marginBottom: ms(-10)
  },
  title: {
    fontWeight: "600"
  }
});
