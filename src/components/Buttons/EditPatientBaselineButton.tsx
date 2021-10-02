import React, { FC } from "react";
import { View, TouchableOpacity } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import i18n from "util/language/i18n";
import { H5 } from "components/Text";
import { RootState, select } from "util/useRedux";

interface EditPatientDetailsButtonProps {
  onPress: () => void;
}

export const EditPatientDetailsButton: FC<EditPatientDetailsButtonProps> = ({
  onPress
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));
  return (
    <View>
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          {
            backgroundColor: colors.acceptButtonColor
          }
        ]}
        onPress={onPress}
      >
        <H5
          text={i18n.t("Patient_Configuration.EditDetails")}
          style={{
            color: colors.primaryContrastTextColor
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = ScaledSheet.create({
  buttonContainer: {
    height: "30@ms",
    display: "flex",
    paddingHorizontal: "10@ms",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: "5@ms"
  }
});
