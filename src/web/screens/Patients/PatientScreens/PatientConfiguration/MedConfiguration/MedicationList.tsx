import React, { FC } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { RootState, select } from "util/useRedux";
import { MedInput } from "rc_agents/model";
import { MedInfoRow } from "./MedInfoRow";
import { H5 } from "components/Text";
import i18n from "util/language/i18n";
import { ScaledSheet } from "react-native-size-matters";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

interface MedicationListProps {
  setAddNewMed: () => void;
  setMedToUpdate: (medToUpdate: MedInput) => void;
  activeMedications: MedInput[];
}

export const MedicationList: FC<MedicationListProps> = ({
  setAddNewMed,
  setMedToUpdate,
  activeMedications
}) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primaryBackgroundColor
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={[styles.button]} onPress={setAddNewMed}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.addButtonContainer}>
              <MaterialCommunityIcon
                name="plus"
                style={[
                  styles.addButton,
                  {
                    borderColor: colors.acceptButtonColor,
                    backgroundColor: colors.acceptButtonColor,
                    color: colors.primaryContrastTextColor
                  }
                ]}
                size={fonts.h2Size}
              />
              <H5
                text={i18n.t("Patient_Configuration.Medications.AddNewMed")}
                style={[
                  styles.buttonText,
                  {
                    color: colors.primaryTextColor
                  }
                ]}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <H5
        text={i18n.t("Patient_Configuration.Medications.ListActiveMed")}
        style={{
          fontWeight: "600",
          paddingBottom: 10,
          paddingTop: 20
        }}
      />
      {activeMedications.length > 0 ? (
        <FlatList
          data={activeMedications}
          renderItem={({ item }) =>
            item.active ? (
              <MedInfoRow
                medicationInfo={item}
                updateMedInfo={setMedToUpdate}
              />
            ) : null
          }
        />
      ) : (
        <H5 text="There are no active medications currently" />
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  button: {
    height: "70%",
    width: "80%",
    borderRadius: "5@ms",
    alignItems: "center",
    margin: "5@ms",
    paddingBottom: "3@ms",
    paddingHorizontal: "5@ms"
  },
  buttonContainer: {
    paddingHorizontal: "10@ms",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center"
  },
  buttonText: {
    justifyContent: "center",
    textAlign: "center",
    alignContent: "center",
    paddingBottom: "3@ms",
    fontWeight: "600",
    paddingLeft: "5@ms"
  },
  addButton: {
    borderRadius: "10@ms",
    textAlign: "center",
    borderWidth: "1@ms"
  },
  addButtonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  }
});
