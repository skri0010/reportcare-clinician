import React, { FC } from "react";
import { View, TouchableOpacity } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import i18n from "util/language/i18n";
import { H3 } from "components/Text";
import { RootState, select } from "util/useRedux";

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
      <TouchableOpacity
        disabled={!validToSave}
        style={[
          styles.saveButton,
          {
            backgroundColor: validToSave
              ? colors.acceptButtonColor
              : colors.primaryDeactivatedButtonColor,
            borderColor: colors.primaryTextColor
          }
        ]}
        onPress={onPressSave}
      >
        <H3
          text={i18n.t("DetailsUpdate.Save")}
          style={{ color: colors.primaryTextColor }}
        />
      </TouchableOpacity>
      {/* Cancel button */}
      <TouchableOpacity
        style={[
          styles.cancelButton,
          {
            backgroundColor: colors.primaryContrastTextColor,
            borderColor: colors.primaryTextColor
          }
        ]}
        onPress={onPressCancel}
      >
        <H3
          text={i18n.t("DetailsUpdate.Cancel")}
          style={{ color: colors.primaryTextColor }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: ms(20)
  },
  saveButton: {
    textAlign: "center",
    width: "60@ms",
    borderRadius: "5@ms",
    justifyContent: "space-evenly",
    height: "25@ms",
    margin: "10@ms"
  },
  cancelButton: {
    textAlign: "center",
    justifyContent: "space-evenly",
    borderRadius: "5@ms",
    width: "60@ms",
    height: "25@ms",
    borderWidth: "1@ms",
    margin: "10@ms"
  }
});
