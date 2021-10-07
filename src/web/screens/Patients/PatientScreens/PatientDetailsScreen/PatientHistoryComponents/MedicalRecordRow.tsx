import React, { FC, useEffect } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { H5 } from "components/Text";
import { Linking, View } from "react-native";
import { RowButton } from "components/Buttons/TextButton";
import { MedicalRecord } from "aws/API";
import { RootState, select, useDispatch } from "util/useRedux";
import { setMedicalRecordContent } from "ic-redux/actions/agents/patientActionCreator";

interface MedicalRecordRowProps {
  medicalRecord: MedicalRecord;
  onViewMedicalRecord: (medicalRecord: MedicalRecord) => void;
  allowView: boolean; // Whether content viewing is allowed (is online)
}

export const MedicalRecordRow: FC<MedicalRecordRowProps> = ({
  medicalRecord,
  onViewMedicalRecord,
  allowView
}) => {
  const { colors, medicalRecordContent } = select((state: RootState) => ({
    colors: state.settings.colors,
    medicalRecordContent: state.patients.medicalRecordContent
  }));

  const dispatch = useDispatch();

  // Detects retrieved content URL
  useEffect(() => {
    if (medicalRecordContent) {
      // Opens a new tab to show the content
      Linking.openURL(medicalRecordContent);
      dispatch(setMedicalRecordContent(undefined));
    }
  }, [dispatch, medicalRecordContent]);

  // Triggers DTA to retrieve URL for showing medical record content
  const onRowPress = () => {
    onViewMedicalRecord(medicalRecord);
  };

  return (
    <View style={[styles.container]}>
      {/* Medical record title */}
      <H5 text={medicalRecord.title} style={[styles.textContainer]} />
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
    paddingRight: "5@ms"
  }
});
