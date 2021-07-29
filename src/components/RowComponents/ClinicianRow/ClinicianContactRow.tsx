import React, { FC } from "react";
import { View } from "react-native";
import { ClinicianRowGeneralDetails } from "models/PersonRowDetails";
import { ScaledSheet } from "react-native-size-matters";
import { ClinicianRowBase } from "./ClinicianRowBase";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ClinicianInfo } from "aws/models";

export interface ClinicanContactRowProps {
  generalDetails: ClinicianInfo;
  onRowPress?: () => void;
  onPhonePress?: () => void;
  onWhatsAppPress?: () => void;
}

export const ClinicianContactRow: FC<ClinicanContactRowProps> = ({
  generalDetails,
  onRowPress,
  onPhonePress,
  onWhatsAppPress
}) => {
  return (
    <View>
      {/* TODO-JH: i18n translation */}
      {/* TODO-JH: Tick for sent */}
      <ClinicianRowBase
        title={generalDetails.name}
        subtitleOne={{ value: generalDetails.role }}
        subtitleTwo={{ value: generalDetails.hospitalName }}
        onRowPress={onRowPress}
      >
        <View style={styles.container}>
          <Icon
            name="phone-in-talk"
            color="#6AC574"
            size={20}
            onPress={onPhonePress}
          />
          <Icon
            name="whatsapp"
            color="#6AC574"
            size={20}
            onPress={onWhatsAppPress}
          />
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
