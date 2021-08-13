import React from "react";
import { View, TouchableOpacity } from "react-native";
import { PatientRowBase } from "./PatientRowBase";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { ScaledSheet } from "react-native-size-matters";
import { select, RootState } from "util/useRedux";

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

  return (
    <PatientRowBase title={patientName} riskLevel={null}>
      <View style={styles.rightIconsContainer}>
        <TouchableOpacity style={styles.iconWrapper}>
          <MaterialIcon
            name="person-add"
            color={colors.acceptIconColor}
            size={fonts.h3Size}
            onPress={onApprove}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconWrapper}>
          <MaterialCommunityIcon
            name="account-arrow-right"
            color={colors.primaryIconColor}
            size={fonts.h3Size}
            onPress={onReassign}
          />
        </TouchableOpacity>
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
  },
  iconWrapper: {
    paddingRight: "10@ms"
  }
});
