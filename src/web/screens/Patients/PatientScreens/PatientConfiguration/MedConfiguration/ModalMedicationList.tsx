import React, { FC } from "react";
import { View, FlatList } from "react-native";
import { H5 } from "components/Text";
import { ScaledSheet } from "react-native-size-matters";
import { MedInput } from "rc_agents/model";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { ModalMedicationRow } from "components/RowComponents/MedicationRows/ModalMedicationRow";

interface ModalMedicationListProps {
  medications: MedInput[];
  onModifyMedication: (medication: MedInput) => void;
  title: string;
}

export const ModalMedicationList: FC<ModalMedicationListProps> = ({
  medications,
  onModifyMedication,
  title
}) => {
  return (
    <View style={styles.container}>
      <H5 text={title} style={styles.title} />
      {medications.length > 0 && (
        <FlatList
          data={medications}
          renderItem={({ item }) => (
            <ModalMedicationRow
              medication={item}
              onModifyMedication={onModifyMedication}
            />
          )}
          keyExtractor={(item) => item.name}
          ItemSeparatorComponent={() => <ItemSeparator lowerSeparatorOpacity />}
        />
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "column"
  },
  title: {
    fontWeight: "600",
    marginTop: "15@ms",
    marginBottom: "5@ms"
  }
});
