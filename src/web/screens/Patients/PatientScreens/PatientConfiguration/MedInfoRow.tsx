import React, { FC } from "react";
import { View } from "react-native";
import { H5 } from "components/Text";
import { MedInput } from "rc_agents/model";
import i18n from "util/language/i18n";
import { RowButton } from "components/Buttons/RowButton";
import { ms, ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";

interface MedInfoRowProps {
  medicationInfo: MedInput;
  updateMedInfo: (medInfo: MedInput) => void;
}

export const MedInfoRow: FC<MedInfoRowProps> = ({
  medicationInfo,
  updateMedInfo
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.primaryWebBackgroundColor,
        borderRadius: ms(3),
        flexWrap: "wrap"
      }}
    >
      <View style={styles.contentContainer}>
        <H5
          text={`${medicationInfo.name}`}
          style={{
            paddingRight: ms(5),
            paddingBottom: ms(5),
            fontWeight: "300"
          }}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <RowButton
              title="Modify"
              onPress={() => updateMedInfo(medicationInfo)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  mainContainer: {
    flexDirection: "row"
  },
  contentContainer: {
    paddingTop: "5@ms",
    paddingLeft: "5@ms",
    paddingRight: "5@ms",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  texts: {
    flexDirection: "column",
    padding: "3@ms",
    justifyContent: "space-between"
  },
  buttonContainer: {
    paddingRight: "10@ms",
    paddingLeft: "5@ms",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    borderRadius: "5@ms",
    alignItems: "center",
    justifyContent: "center"
  }
});
