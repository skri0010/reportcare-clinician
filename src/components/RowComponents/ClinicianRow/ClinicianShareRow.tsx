import React, { FC } from "react";
import { View } from "react-native";
import { ClinicianRowGeneralDetails } from "models/PersonRowDetails";
import { ScaledSheet } from "react-native-size-matters";
import { ClinicianRowBase } from "./ClinicianRowBase";
import { CheckBox } from "react-native-elements";

export interface ClinicanShareRowProps {
  generalDetails: ClinicianRowGeneralDetails;
  checked: boolean;
  onRowPress?: () => void;
}

export const ClinicianShareRow: FC<ClinicanShareRowProps> = ({
  generalDetails,
  checked,
  onRowPress
}) => {
  return (
    <View>
      {/* TODO-JH: i18n translation */}
      {/* TODO-JH: Tick for sent */}
      <ClinicianRowBase
        title={generalDetails.name}
        subtitleOne={{ value: generalDetails.occupation }}
        subtitleTwo={{ value: generalDetails.location }}
        onRowPress={onRowPress}
      >
        <View style={styles.container}>
          <CheckBox center checkedColor="green" checked={checked} />
        </View>
      </ClinicianRowBase>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    width: "50@ms",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  }
});
