import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { ScaledSheet } from "react-native-size-matters";
import { H4 } from "components/Text/index";
import { TouchableOpacity, View } from "react-native";
import i18n from "util/language/i18n";

interface MedicalRecordRowProps {
  description: string;
  onRowPress: () => void;
}

export const MedicalRecordRow: FC<MedicalRecordRowProps> = ({
  description,
  onRowPress
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <View style={[styles.container]}>
      <H4 text={description} style={null} />

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
  container: {
    display: "flex",
    flexDirection: "row",
    marginTop: "10@ms",
    justifyContent: "space-between"
  },
  button: {
    borderRadius: "2@ms",
    borderWidth: "1@ms",
    width: "70@ms"
  },
  buttonText: {
    textAlign: "center"
  }
});
