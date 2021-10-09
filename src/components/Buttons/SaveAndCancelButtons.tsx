import React, { FC } from "react";
import { View, StyleProp, ViewProps } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import i18n from "util/language/i18n";
import { RootState, select } from "util/useRedux";
import { ModalButton } from "./ModalButton";

interface SaveAndCancelButtonsProps {
  onPressSave: () => void;
  onPressCancel: () => void;
  validToSave: boolean;
}

export const SaveAndCancelButtons: FC<SaveAndCancelButtonsProps> = ({
  onPressSave,
  onPressCancel,
  validToSave
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));
  return (
    <View style={styles.container}>
      {/* Save button */}
      <ModalButton
        title={i18n.t("DetailsUpdate.Save")}
        disabled={!validToSave}
        onPress={onPressSave}
        style={
          {
            backgroundColor: validToSave
              ? colors.acceptButtonColor
              : colors.primaryDeactivatedButtonColor,
            borderColor: colors.primaryTextColor
          } as StyleProp<ViewProps>
        }
      />

      {/* Cancel button */}
      <ModalButton
        title={i18n.t("DetailsUpdate.Cancel")}
        onPress={onPressCancel}
        style={
          {
            backgroundColor: colors.primaryContrastTextColor,
            borderColor: colors.primaryTextColor,
            borderWidth: ms(1),
            borderRadius: ms(5)
          } as StyleProp<ViewProps>
        }
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "10@ms"
  }
});
