import React, { FC } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { RootState, select } from "util/useRedux";
import { H3, H4, H5 } from "components/Text/index";
import { ScaledSheet, ms } from "react-native-size-matters";
import { MedicalRecords } from "mock/mockPatientDetails";

interface ViewMedicalRecordsProps {
  medicalRecord: MedicalRecords;
  setViewMedicalModal: (state: boolean) => void;
}

export const ViewMedicalRecords: FC<ViewMedicalRecordsProps> = ({
  medicalRecord,
  setViewMedicalModal
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.primaryWebBackgroundColor }
      ]}
    >
      <H3
        text={`${medicalRecord.record}`}
        style={{ fontWeight: "bold", paddingTop: ms(10) }}
      />
      <View style={styles.descriptionContainer}>
        <H4 text="Description" style={{ fontWeight: "bold" }} />
        <View style={styles.descriptionContent}>
          <ScrollView>
            <H5 text={`${medicalRecord.content}`} style={null} />
          </ScrollView>
        </View>
      </View>

      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={[
            styles.closeButton,
            {
              backgroundColor: colors.primaryContrastTextColor,
              borderColor: colors.primaryTextColor
            }
          ]}
          onPress={() => {
            setViewMedicalModal(false);
          }}
        >
          <H3 text="Close" style={{ color: colors.primaryTextColor }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  closeButton: {
    textAlign: "center",
    justifyContent: "space-evenly",
    borderRadius: "5@ms",
    width: "60@ms",
    height: "25@ms",
    borderWidth: "1@ms",
    margin: "10@ms"
  },
  container: {
    width: "50%",
    height: "80%",
    paddingHorizontal: "10@ms",
    borderRadius: "10@ms",
    borderWidth: "1@ms",
    marginHorizontal: "25%"
  },
  descriptionContainer: {
    paddingVertical: ms(20),
    width: "100%",
    height: "80%"
  },
  descriptionContent: {
    height: "100%",
    flex: 1,
    paddingTop: ms(10)
  }
});
