import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { FilterTagProps, RiskFilterTab } from "../RiskFilterTab";
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
  children,
  isTodo = false,
  onPress,
  onRiskFilterClick
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
          <RiskFilterTab onTagPress={onRiskFilterClick} />
        </View>
      ) : null}

      {/* Other components to be placed in the left side tab eg list of patients */}
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    alignContent: "stretch"
  },
  addButtonSize: {
    fontSize: "5@ms"
  },
  addButtonColor: {
    color: "white"
  },
  iconStyle: {
    position: "absolute",
    right: 2,
    top: 15,
    bottom: 15,
    paddingRight: 10
  }
});
