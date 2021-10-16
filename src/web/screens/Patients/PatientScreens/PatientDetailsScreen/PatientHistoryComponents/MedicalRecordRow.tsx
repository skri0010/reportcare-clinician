import React, { FC } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { H5 } from "components/Text";
import { View } from "react-native";
import { RowButton } from "components/Buttons/RowButton";
import { ClinicianRecord } from "aws/API";
import { RootState, select, useDispatch } from "util/useRedux";
import { DeleteIconButton } from "components/Buttons/DeleteIconButton";
import { setRecordToDelete } from "ic-redux/actions/agents/patientActionCreator";
import { withinDeleteGracePeriod } from "util/utilityFunctions";

interface MedicalRecordRowProps {
  medicalRecord: ClinicianRecord;
  onViewMedicalRecord: (medicalRecord: ClinicianRecord) => void;
  allowView: boolean; // Whether content viewing is allowed (is online)
}

export const MedicalRecordRow: FC<MedicalRecordRowProps> = ({
  medicalRecord,
  onViewMedicalRecord,
  allowView
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  // Triggers DTA to retrieve URL for showing medical record content
  const onRowPress = () => {
    onViewMedicalRecord(medicalRecord);
  };

  const dispatch = useDispatch();

  const onDeleteButtonPress = () => {
    dispatch(setRecordToDelete(medicalRecord));
  };

  return (
    <View style={[styles.container]}>
      {/* Medical record title */}
      <H5 text={medicalRecord.title} style={[styles.textContainer]} />

      {/* Delete button */}
      {withinDeleteGracePeriod(medicalRecord) ? (
        <DeleteIconButton onPress={onDeleteButtonPress} />
      ) : null}

      {/* View button */}
      <RowButton
        onPress={onRowPress}
        title="Patient_History.ViewButton"
        disabled={!allowView}
        backgroundColor={
          allowView ? colors.primaryButtonColor : colors.overlayColor
        }
      />
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
    marginRight: "5@ms"
  }
});
