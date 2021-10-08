import React, { FC } from "react";
import { View, FlatList } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { select, RootState, useDispatch } from "util/useRedux";
import { setChartFilters } from "ic-redux/actions/agents/actionCreator";
import { ChartFilter, ChartViewTypes } from "models/ChartViewTypes";
import { ChartFilterPill } from "./ChartFilterPill";
import { H4 } from "components/Text";
import i18n from "util/language/i18n";

export const ChartFilterPillList: FC = () => {
  const { chartFilter } = select((state: RootState) => ({
    chartFilter: state.agents.chartFilters
  }));

  const dispatch = useDispatch();

  // Function to toggle selected View type for charts
  const setSelectedChartFilter = (viewType: ChartViewTypes) => {
    const tempChartFilters: ChartFilter = {
      [ChartViewTypes.ALL]: false,
      [ChartViewTypes.MIN]: false,
      [ChartViewTypes.MAX]: false,
      [ChartViewTypes.AVERAGE]: false
    };
    tempChartFilters[viewType] = true;
    // Update selected view type for charts
    dispatch(setChartFilters(tempChartFilters));
  };

  return (
    <View style={styles.container}>
      {/* View By text */}
      <H4
        text={i18n.t("Parameter_Graphs.ViewBy")}
        style={{ minWidth: ms(50) }}
      />
      {/* Risk filter pill list */}
      <FlatList
        contentContainerStyle={[styles.listContainer]}
        data={Object.values(ChartViewTypes)}
        horizontal
        renderItem={({ item }) => (
          <ChartFilterPill
            viewType={item}
            selected={chartFilter[item]}
            onPress={setSelectedChartFilter}
          />
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    marginTop: "10@ms"
  },
  listContainer: {
    flexDirection: "row",
    paddingLeft: "5@ms",
    width: "100%"
  }
});
