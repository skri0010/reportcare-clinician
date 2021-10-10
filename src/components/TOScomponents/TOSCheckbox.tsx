import React from "react";
import { View, TouchableOpacity } from "react-native";
import { select, RootState } from "util/useRedux";
import { ScaledSheet } from "react-native-size-matters";
import { Checkbox } from "components/InputComponents/Checkbox";
import i18n from "util/language/i18n";
import { H5 } from "components/Text";

interface TOSCheckboxProps {
  checkTerms: boolean;
  onCheck: (state: boolean) => void;
  setViewModal: (state: boolean) => void;
}

export const TOSCheckbox: React.FC<TOSCheckboxProps> = ({
  checkTerms,
  onCheck,
  setViewModal
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <View style={styles.termsContainer}>
      {/* Check box */}
      <Checkbox checked={checkTerms} onPress={() => onCheck(!checkTerms)} />
      {/* Terms os service word */}
      <H5 text={i18n.t("Auth_Registration.ToSText")} />
      {/* Terms of service onClick to open modal */}
      <TouchableOpacity
        onPress={() => {
          setViewModal(true);
        }}
      >
        <H5
          text={i18n.t("Auth_Registration.TermOfServices")}
          style={[
            {
              fontWeight: "bold",
              textDecorationLine: "underline",
              color: colors.primaryBarColor
            }
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = ScaledSheet.create({
  termsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  }
});
