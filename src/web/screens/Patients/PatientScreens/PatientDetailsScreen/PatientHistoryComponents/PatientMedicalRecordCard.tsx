import React, { FC, useState } from "react";
import { RootState, select } from "util/useRedux";
import { ScaledSheet } from "react-native-size-matters";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import { mockMedicalRecord, MedicalRecords } from "mock/mockPatientDetails";
import { FlatList, View } from "react-native";
import { MedicalRecordRow } from "./MedicalRecordRow";
import i18n from "util/language/i18n";
import { IconButton, IconType } from "components/Buttons/IconButton";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";

interface PatientMedicalRecordProps {
  patientId: string;
  maxHeight: number;
  onAddPress: () => void; // action to be done when add button is pressed
  setViewMedicalModal: (state: boolean) => void; // medical record modal visibility
  setDisplayMedicalRecord: (state: MedicalRecords) => void; // medical record details to be shown
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

  // Add medical record button
  const AddMedicalRecordButton: FC = () => {
    return (
      <View style={styles.buttonContainer}>
        <IconButton
          name="plus"
          type={IconType.MATERIAL_COMMUNITY}
          onPress={onAddPress}
          containerStyle={styles.button}
          iconStyle={{ color: colors.primaryContrastTextColor }}
        />
      </View>
    );
  };

  return (
    <CardWrapper
      maxHeight={maxHeight}
      title={i18n.t("Patient_History.MedicalRecords")}
      ComponentNextToTitle={AddMedicalRecordButton}
    >
      {/* List of medical records */}
      <FlatList
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparator}
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
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  button: {
    borderRadius: "10@ms",
    textAlign: "center",
    borderWidth: "1@ms"
  }
});
