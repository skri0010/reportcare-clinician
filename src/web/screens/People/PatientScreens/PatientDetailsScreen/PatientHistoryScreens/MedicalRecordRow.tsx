import React, { FC } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { H4 } from "components/Text/index";
import { View } from "react-native";
import { ViewRowButton } from "./ViewRowButton";

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
      <H4 text={description} style={[styles.textContainer]} />

      <View style={[styles.buttonContainer]}>
        <ViewRowButton onRowPress={onRowPress} />
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginTop: "10@ms",
    justifyContent: "space-between",
    paddingBottom: "20@ms"
  },
  button: {
    borderRadius: "2@ms",
    borderWidth: "1@ms",
    width: "70@ms"
  },
  buttonText: {
    textAlign: "center"
  },
  buttonContainer: {
    flex: 1
  },
  textContainer: {
    flex: 5,
    paddingRight: "5@ms"
  }
});
