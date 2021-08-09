import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { ScaledSheet } from "react-native-size-matters";
import { H4 } from "components/Text/index";
import { TouchableOpacity, View } from "react-native";
import i18n from "util/language/i18n";

interface ViewRowButtonProps {
  onRowPress: () => void;
}

export const ViewRowButton: FC<ViewRowButtonProps> = ({ onRowPress }) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <View>
      <TouchableOpacity style={[styles.button]} onPress={onRowPress}>
        <H4
          text={i18n.t("Patient_History.ViewButton")}
          style={[styles.buttonText, { color: colors.primaryTextColor }]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = ScaledSheet.create({
  button: {
    borderRadius: "10@ms",
    borderWidth: "1@ms"
  },
  buttonText: {
    textAlign: "center"
  }
});
