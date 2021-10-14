import React from "react";
import { View, TouchableOpacity } from "react-native";
import { PatientRowBase } from "./PatientRowBase";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { ms, ScaledSheet } from "react-native-size-matters";
import { select, RootState } from "util/useRedux";
import { IconButton, IconType } from "components/Buttons/IconButton";

export interface PatientAssignmentRowProps {
  patientName: string;
  onApprove: () => void;
  onReassign: () => void;
}

export const PatientAssignmentRow: React.FC<PatientAssignmentRowProps> = ({
  patientName,
  onApprove,
  onReassign
}) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  const iconContainerStyle = {
    marginRight: ms(10),
    backgroundColor: colors.primaryBackgroundColor
  };

  return (
    <PatientRowBase title={patientName} riskLevel={null}>
      <View style={styles.rightIconsContainer}>
        <IconButton
          name="person-add"
          type={IconType.MATERIAL}
          containerStyle={iconContainerStyle}
          iconStyle={{ color: colors.acceptIconColor }}
          size={fonts.h3Size}
          onPress={onApprove}
        />
        <IconButton
          name="account-arrow-right"
          type={IconType.MATERIAL_COMMUNITY}
          containerStyle={iconContainerStyle}
          iconStyle={{ color: colors.primaryIconColor }}
          size={fonts.h3Size}
          onPress={onReassign}
        />
      </View>
    </PatientRowBase>
  );
};

const styles = ScaledSheet.create({
  mainContainer: {
    alignSelf: "center",
    paddingTop: "10@ms"
  },
  rightIconsContainer: {
    flexDirection: "row",
    paddingTop: "5@ms"
  }
});
