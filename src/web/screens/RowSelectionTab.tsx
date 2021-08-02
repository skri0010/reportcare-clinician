import React, { FC } from "react";
import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { RiskFilterTab } from "../RiskFilterTab";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import { RowSelectionHeader } from "./RowSelectionHeader";
import { RootState, select } from "util/useRedux";

interface RowSelectionWrapperProps {
  title: string;
  addButton?: boolean;
  riskFilterTag?: boolean;
  placeholder?: string;
  isTodo?: boolean;
  onPress?: () => void;
}

export const RowSelectionWrapper: FC<RowSelectionWrapperProps> = ({
  title,
  addButton = false,
  riskFilterTag = false,
  placeholder,
  isTodo = false,
  onPress
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <View style={styles.container}>
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
        <View>
          <RiskFilterTab
            onTagPress={() => {
              null;
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "column",
    alignContent: "stretch"
  },
  addButtonSize: {
    fontSize: "5@ms"
  }
});
