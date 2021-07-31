import React, { FC, useState } from "react";
import { RootState, select } from "util/useRedux";
import { ScaledSheet } from "react-native-size-matters";
import { H3 } from "components/Text/index";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import { mockMedicalRecord } from "mock/mockPatientDetails";
import { FlatList, TouchableOpacity, View } from "react-native";
import { MedicalRecordRow } from "./MedicalRecordRow";

interface PatientMedicalRecordProps {
  patientId: string;
  maxHeight: number;
  onAddPress: () => void;
}

export const PatientMedicalRecordCard: FC<PatientMedicalRecordProps> = ({
  maxHeight,
  onAddPress
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  // Query database for a specific patient by patientId for alert histories here
  // For now I just mocked it
  const [medicalRecords] = useState(mockMedicalRecord);

  return (
    <CardWrapper maxHeight={maxHeight}>
      <View style={styles.title}>
        <H3
          text="Medical Records"
          style={[{ fontWeight: "bold", color: colors.primaryTextColor }]}
        />
        <TouchableOpacity
          onPress={onAddPress}
          style={[
            styles.button,
            { backgroundColor: colors.primaryButtonColor }
          ]}
        >
          <H3 text="Add" style={{ color: colors.primaryContrastTextColor }} />
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={medicalRecords}
        renderItem={({ item }) => (
          <MedicalRecordRow description={item.record} onRowPress={() => null} />
        )}
        keyExtractor={(alert) => alert.patientId}
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
