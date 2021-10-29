import React, { FC } from "react";
import { View, FlatList } from "react-native";
import { H5 } from "components/Text";
import { ms, ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { MedInput } from "rc_agents/model";
import { MedicationRow } from "./MedicationInfoRow";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";

interface MedicationInfoListProps {
  medInfos: MedInput[];
  active: boolean;
  setMedInfoToDelete?: (medInfo: MedInput) => void;
  label: string;
}

export const MedicationInfoList: FC<MedicationInfoListProps> = ({
  medInfos,
  active,
  setMedInfoToDelete,
  label
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));
  return (
    <View style={styles.medInfoList}>
      {/*       {/* Medication info list title */}
      <H5
        text={label}
        style={{
          color: colors.primaryTextColor,
          paddingVertical: ms(5)
        }}
      />
      <View style={styles.medInfoRows}>
        <FlatList
          style={{ flex: 1 }}
          ItemSeparatorComponent={() => <ItemSeparator />}
          data={medInfos}
          renderItem={({ item }) =>
            active ? (
              <MedicationRow
                medicationItem={item}
                setMedInfoToDelete={setMedInfoToDelete}
              />
            ) : item.active && !item.id ? (
              <MedicationRow
                medicationItem={item}
                setMedInfoToDelete={setMedInfoToDelete}
              />
            ) : null
          }
          keyExtractor={(item) => item.name}
        />
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  medicationsAddedHeader: {
    borderTopLeftRadius: "6@ms",
    borderTopRightRadius: "6@ms",
    paddingLeft: "15@ms"
  },
  medInfoList: { paddingTop: "10@ms" },
  medInfoRows: { maxHeight: "300@ms" }
});
