import React, { FC } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { H5 } from "components/Text";
import { View } from "react-native";
import { RowButton } from "components/Buttons/TextButton";

interface MedicalRecordRowProps {
  description: string;
  onRowPress: () => void;
}

export const MedicalRecordRow: FC<MedicalRecordRowProps> = ({
  description,
  onRowPress
}) => {
  return (
    <View style={[styles.container]}>
      {/* Medical record title */}
      <H5 text={description} style={[styles.textContainer]} />
      {/* View button */}
      <RowButton onPress={onRowPress} title="Patient_History.ViewButton" />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  textContainer: {
    flex: 5,
    paddingRight: "5@ms"
  }
});
