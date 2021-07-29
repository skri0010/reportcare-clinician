import React, { FC } from "react";
import { Dimensions, ViewStyle, Platform, View } from "react-native";
import { RootState, select } from "util/useRedux";
import { LineChart } from "react-native-chart-kit";
import { ms, ScaledSheet } from "react-native-size-matters";
import { H4, H5 } from "components/Text";

interface LineChartProps {
  graphTitle: string;
  graphSubtitle?: string;
  xLabels: string[];
  data: number[];
}

export const LineChartComponent: FC<LineChartProps> = ({
  graphTitle,
  graphSubtitle,
  xLabels,
  data
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

  const width =
    Platform.OS === "web"
      ? Dimensions.get("window").width / 4.5
      : (Dimensions.get("window").width * 6) / 7;

  const height =
    Platform.OS === "web"
      ? (Dimensions.get("window").height * 3) / 9
      : Dimensions.get("window").height / 3;

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
              data: data
            }
          ]
        }}
        width={width}
        height={height}
        chartConfig={chartConfig}
        style={chartStyle}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginLeft: ms(10),
    marginBottom: ms(-10)
  },
  title: {
    fontWeight: "bold"
  }
});
