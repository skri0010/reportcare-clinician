import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { SearchBarComponent } from "components/bars/SearchBarComponent";
import { RowSelectionHeader } from "./RowSelectionHeader";

interface RowSelectionTabProps {
  title: string;
  addButton?: boolean;
  placeholder?: string;
  isTodo?: boolean;
  onPress?: () => void;
}

export const RowSelectionTab: FC<RowSelectionTabProps> = ({
  title,
  addButton = false,
  placeholder,
  isTodo = false,
  onPress
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <View style={[styles.container]}>
      {/* Header */}
      {/* <RowSelectionHeader
        title={title}
        addButton={addButton}
        onPress={
          addButton
            ? onPress
            : () => {
                null;
              }
        }
      /> */}

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
