import React, { FC, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { ClinicianRowGeneralDetails } from "models/PersonRowDetails";
import { ms, ScaledSheet } from "react-native-size-matters";
import { ClinicianRowBase } from "./ClinicianRowBase";
import { RootState } from "ic-redux/store";
import { select } from "util/useRedux";
import Icon from "react-native-vector-icons/MaterialIcons";

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
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const Checkbox: FC = () => {
    const [check, setChecked] = useState(checked);

    return (
      <TouchableOpacity
        style={[styles.checkBox, { borderColor: colors.primaryBorderColor }]}
        onPress={() => {
          setChecked(!check);
        }}
      >
        {check ? (
          <Icon name="check" color={colors.primaryButtonColor} size={ms(15)} />
        ) : null}
      </TouchableOpacity>
    );
  };
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
          <Checkbox />
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
  },
  checkBox: {
    width: "15@ms",
    height: "15@ms",
    borderColor: "black",
    borderWidth: "1.5@ms",
    borderRadius: "2@ms",
    justifyContent: "space-evenly",
    alignItems: "center"
  }
});
