import React, { FC, useCallback } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { H5, H6 } from "components/Text";
import { View } from "react-native";
import { RowButton } from "components/Buttons/RowButton";
import { ClinicianRecord } from "aws/API";
import { RootState, select, useDispatch } from "util/useRedux";
import {
  getLocalDateTime,
  withinDeleteGracePeriod
} from "util/utilityFunctions";
import { DeleteIconButton } from "components/Buttons/DeleteIconButton";
import { setRecordToDelete } from "ic-redux/actions/agents/patientActionCreator";

interface IcdCrtRecordRowProps {
  icdCrtRecord: ClinicianRecord;
  onViewIcdCrtRecord: (IcdCrtRecord: ClinicianRecord) => void;
  allowView: boolean; // Whether content viewing is allowed (is online)
}

export const IcdCrtRecordRow: FC<IcdCrtRecordRowProps> = ({
  icdCrtRecord,
  onViewIcdCrtRecord,
  allowView
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  // Triggers DTA to retrieve URL for showing ICD/CRT record content
  const onViewButtonPress = () => {
    onViewIcdCrtRecord(icdCrtRecord);
  };

  const dispatch = useDispatch();

  const onDeleteButtonPress = () => {
    dispatch(setRecordToDelete(icdCrtRecord));
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.textContainer}>
        {/* ICD/CRT record title */}
        <H5 text={icdCrtRecord.title} style={styles.topText} />
        {/* ICD/CRT record creation date */}
        <H6
          text={getLocalDateTime(icdCrtRecord.uploadDateTime || "")}
          style={styles.bottomText}
        />
      </View>
      <View style={styles.viewButtonContainer}>
        {/* Delete button */}
        {withinDeleteGracePeriod(icdCrtRecord) ? (
          <DeleteIconButton onPress={onDeleteButtonPress} />
        ) : null}

        {/* View button */}
        <RowButton
          onPress={onViewButtonPress}
          title="Patient_History.ViewButton"
          disabled={!allowView}
          backgroundColor={
            allowView ? colors.primaryButtonColor : colors.overlayColor
          }
        />
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row"
  },
  textContainer: {
    flex: 5,
    marginRight: "5@ms",
    maxWidth: "250@ms"
  },
  topText: {
    paddingTop: "2@ms"
  },
  bottomText: {
    paddingVertical: "2@ms"
  },
  viewButtonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  }
});
