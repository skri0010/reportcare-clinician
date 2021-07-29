import React, { FC } from "react";
import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { RiskFilterTab } from "../RiskFilterTab";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import { RowSelectionHeader } from "./RowSelectionHeader";

interface RowSelectionWrapperProps {
  title: string;
  addButton?: boolean;
  riskFilterTag?: boolean;
  placeholder?: string;
  //   listComponent: React.ReactNode;
  isTodo?: boolean;
  onPress?: () => void;
}

export const RowSelectionWrapper: FC<RowSelectionWrapperProps> = ({
  title,
  addButton = false,
  riskFilterTag = false,
  placeholder,
  children,
  // listComponent,
  isTodo = false,
  onPress
}) => {
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
            containerStyle={{ backgroundColor: "white" }}
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
