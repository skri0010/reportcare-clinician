import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { TouchableHighlight, View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { ChartViewTypes } from "models/ChartViewTypes";
import { H6 } from "components/Text";
import i18n from "util/language/i18n";

export interface ChartFilterPillProps {
  viewType: ChartViewTypes;
  selected: boolean;
  onPress?: (key: ChartViewTypes) => void;
}

export const ChartFilterPill: FC<ChartFilterPillProps> = ({
  viewType,
  selected,
  onPress = null
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  // Function to get line color of min, max or avg
  const getColorFromViewType = () => {
    if (viewType === ChartViewTypes.AVERAGE) {
      return colors.avgLineColor;
    }
    if (viewType === ChartViewTypes.MIN) {
      return colors.minLineColor;
    }
    if (viewType === ChartViewTypes.MAX) {
      return colors.maxLineColor;
    }
    return undefined;
  };

  // Function to get line color of min, max or avg
  const getViewTypeTranslation = () => {
    if (viewType === ChartViewTypes.AVERAGE) {
      return i18n.t("Parameter_Graphs.ChartViewTypes.Average");
    }
    if (viewType === ChartViewTypes.MIN) {
      return i18n.t("Parameter_Graphs.ChartViewTypes.Minimum");
    }
    if (viewType === ChartViewTypes.MAX) {
      return i18n.t("Parameter_Graphs.ChartViewTypes.Maximum");
    }
    return i18n.t("Parameter_Graphs.ChartViewTypes.All");
  };

  return (
    <TouchableHighlight
      underlayColor={colors.chartPillUnselectedColor}
      style={[
        styles.container,
        {
          backgroundColor: !selected
            ? colors.chartPillUnselectedColor
            : colors.chartPillSelectedColor,
          borderWidth: ms(1.5),
          borderColor: selected
            ? colors.chartPillSelectedColor
            : colors.chartPillUnselectedBorderColor
        }
      ]}
      onPress={
        onPress
          ? () => {
              onPress(viewType);
            }
          : undefined
      }
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <H6
          text={`${getViewTypeTranslation()}  `}
          style={
            selected
              ? [styles.textStyle, { fontWeight: "bold" }]
              : styles.textStyle
          }
        />
        {/* Generate line with their respective colors for min max and avg */}
        {getColorFromViewType() ? (
          <View
            style={{
              flex: 0.5,
              height: 5,
              backgroundColor: getColorFromViewType()
            }}
          />
        ) : null}
      </View>
    </TouchableHighlight>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    minWidth: "80@ms",
    justifyContent: "center",
    borderRadius: "5@ms",
    paddingVertical: "3@ms",
    paddingHorizontal: "6@ms",
    marginHorizontal: "6@ms"
  },
  textStyle: {
    textAlign: "center"
  }
});
