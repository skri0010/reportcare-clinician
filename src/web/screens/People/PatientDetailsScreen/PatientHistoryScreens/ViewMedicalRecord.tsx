import React, { FC } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { RootState, select } from "util/useRedux";
import { H3, H4 } from "components/Text/index";
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
        { backgroundColor: colors.primaryContrastTextColor }
      ]}
    >
      <H3 text={`${medicalRecord.record}`} style={styles.recordTitle} />
      <View style={styles.descriptionContainer}>
        <H4 text="Description" style={{ fontWeight: "bold" }} />
        <View style={styles.descriptionContent}>
          <ScrollView>
            <H4 text={`${medicalRecord.content}`} style={null} />
          </ScrollView>
        </View>
      </View>

      <View style={{ alignItems: "center", paddingTop: ms(20) }}>
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
    height: "85%",
    paddingHorizontal: "40@ms",
    borderRadius: "10@ms",
    marginHorizontal: "25%"
  },
  descriptionContainer: {
    width: "100%",
    height: "60%"
  },
  descriptionContent: {
    height: "100%",
    flex: 1,
    paddingTop: "10@ms"
  },
  recordTitle: {
    fontWeight: "bold",
    paddingTop: "25@ms",
    paddingBottom: "30@ms"
  }
});
