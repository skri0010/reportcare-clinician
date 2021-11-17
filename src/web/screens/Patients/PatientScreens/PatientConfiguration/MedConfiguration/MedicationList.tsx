import React, { FC } from "react";
import { View, FlatList } from "react-native";
import { H5 } from "components/Text";
import { ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { MedInput } from "rc_agents/model";
import { MedicationRow } from "components/RowComponents/MedicationRows/MedicationRow";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";

interface MedicationListProps {
  medications: MedInput[];
  onRemoveMedication: (medication: MedInput) => void;
  label: string;
}

export const MedicationList: FC<MedicationListProps> = ({
  medications,
  onRemoveMedication,
  label
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));
  return (
    <View>
      {/* Medication list title */}
      <H5
        text={label}
        style={[styles.title, { color: colors.primaryTextColor }]}
      />
      <View style={styles.medicationList}>
        <FlatList
          style={{ flex: 1 }}
          ItemSeparatorComponent={() => <ItemSeparator lowerSeparatorOpacity />}
          data={medications}
          renderItem={({ item }) => (
            <MedicationRow
              medicationItem={item}
              onRemoveMedication={onRemoveMedication}
            />
          )}
          keyExtractor={(item) => item.name}
        />
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  title: {
    marginTop: "10@ms",
    marginBottom: "5@ms"
  },
  medicationList: { maxHeight: "300@ms" }
});
