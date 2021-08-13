import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { FilterTagProps, RiskFilterComponent } from "../RiskFilterComponent";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import { RowSelectionHeader } from "./RowSelectionHeader";

interface RowSelectionWrapperProps {
  title: string;
  addButton?: boolean;
  riskFilterTag?: boolean;
  placeholder?: string;
  isTodo?: boolean;
  onPress?: () => void;
  onRiskFilterClick?: (item: FilterTagProps[]) => void;
}

export const RowSelectionWrapper: FC<RowSelectionWrapperProps> = ({
  title,
  addButton = false,
  riskFilterTag = false,
  placeholder,
  isTodo = false,
  onPress,
  onRiskFilterClick
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <View style={[styles.container]}>
      {/* Header */}
      <RowSelectionHeader
        title={title}
        addButton={addButton}
        onPress={
          addButton
            ? onPress
            : () => {
                null;
              }
        }
      />

      {/* Search bar */}
      {!isTodo ? (
        <View>
          <SearchBarComponent
            onUserInput={() => {
              null;
            }}
            onSearchClick={() => {
              null;
            }}
            containerStyle={{
              backgroundColor: colors.primaryContrastTextColor
            }}
            placeholder={placeholder}
          />
        </View>
      ) : null}

      {/* Risk filter tab */}
      {riskFilterTag ? (
        <View style={{ backgroundColor: colors.primaryContrastTextColor }}>
          <RiskFilterComponent onTagPress={onRiskFilterClick} />
        </View>
      ) : null}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    alignContent: "stretch"
  },
  addButtonSize: {
    fontSize: "5@ms"
  }
});
