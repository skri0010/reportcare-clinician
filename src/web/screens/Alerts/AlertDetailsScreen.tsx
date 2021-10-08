import React, { FC } from "react";
import { View, TouchableOpacity } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { H4 } from "components/Text";
import { RootState, select } from "util/useRedux";
import { ScreenWrapper } from "components/Wrappers/ScreenWrapper";
import { AlertDetails } from "./AlertDetails";
import i18n from "util/language/i18n";

interface AlertDetailsScreenProps {
  setModalVisible: (state: boolean) => void;
}

export const AlertDetailsScreen: FC<AlertDetailsScreenProps> = ({
  setModalVisible
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Alert details cards */}
        <AlertDetails />
        {/* Create todo button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: colors.primaryTodoCompleteButtonColor }
            ]}
            onPress={() => {
              // Allows the create todo modal to be visible
              setModalVisible(true);
            }}
          >
            <H4
              text={i18n.t("Alerts.CreateTodoButton")}
              style={{ color: colors.primaryContrastTextColor }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  container: {
    margin: "30@ms",
    marginLeft: "40ms"
  },
  patientName: {
    paddingBottom: "10@ms"
  },
  headers: {
    fontWeight: "bold",
    paddingBottom: "17@ms"
  },
  informationTitle: {
    fontWeight: "bold",
    paddingTop: "17@ms"
  },
  buttonContainer: {
    marginTop: "10@ms",
    alignItems: "center"
  },
  button: {
    textAlign: "center",
    justifyContent: "space-evenly",
    borderRadius: "5@ms",
    width: "80@ms",
    height: "30@ms"
  }
});
