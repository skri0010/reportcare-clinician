import React, { FC, useState } from "react";
import { RootState, select } from "util/useRedux";
import { ScaledSheet } from "react-native-size-matters";
import { H3 } from "components/Text/index";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import { mockMedicalRecord, MedicalRecords } from "mock/mockPatientDetails";
import { FlatList, TouchableOpacity, View } from "react-native";
import { MedicalRecordRow } from "./MedicalRecordRow";
import i18n from "util/language/i18n";

interface PatientMedicalRecordProps {
  patientId: string;
  maxHeight: number;
  onAddPress: () => void;
  setViewMedicalModal: (state: boolean) => void;
  setDisplayMedicalRecord: (state: MedicalRecords) => void;
}

export const PatientMedicalRecordCard: FC<PatientMedicalRecordProps> = ({
  maxHeight,
  onAddPress,
  setViewMedicalModal,
  setDisplayMedicalRecord
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  // Query database for a specific patient by patientId for alert histories here
  // For now I just mocked it
  const [medicalRecords] = useState(mockMedicalRecord);
  function onRowPress(record: MedicalRecords) {
    setViewMedicalModal(true);
    setDisplayMedicalRecord(record);
  }
  return (
    <CardWrapper maxHeight={maxHeight}>
      <View style={styles.title}>
        <H3
          text={i18n.t("Patient_History.MedicalRecords")}
          style={[{ fontWeight: "bold", color: colors.primaryTextColor }]}
        />
        <TouchableOpacity
          onPress={onAddPress}
          style={[
            styles.button,
            { backgroundColor: colors.primaryButtonColor }
          ]}
        >
          <H3
            text={i18n.t("Patient_History.AddButton")}
            style={{ color: colors.primaryContrastTextColor }}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={medicalRecords}
        renderItem={({ item }) => (
          <MedicalRecordRow
            description={item.record}
            onRowPress={() => onRowPress(item)}
          />
        )}
        keyExtractor={(alert) => alert.id}
      />
    </CardWrapper>
  );
};

const styles = ScaledSheet.create({
  title: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    width: "70@ms",
    borderRadius: "3@ms",
    textAlign: "center"
  }
});
