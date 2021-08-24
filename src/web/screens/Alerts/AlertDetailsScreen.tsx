/* eslint-disable no-console */
import React, { FC, useContext } from "react";
import { View, TouchableOpacity } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { H4 } from "components/Text";
import { RootState, select } from "util/useRedux";
import { ScreenWrapper } from "../ScreenWrapper";
import { AlertContext } from "./AlertScreen";
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

  const context = useContext(AlertContext);
  // const findSymptoms = (id: string) => {
  //   // TODO: to be replaced with an API or agent call
  //   // this is just to keep the symptoms dynamic

  //   for (let i = 0; i < mockAlertHistory.length; i += 1) {
  //     if (mockAlertHistory[i].id === id) {
  //       return <AlertDetails />;
  //     }
  //   }
  // };
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
              text="Create Todo"
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
