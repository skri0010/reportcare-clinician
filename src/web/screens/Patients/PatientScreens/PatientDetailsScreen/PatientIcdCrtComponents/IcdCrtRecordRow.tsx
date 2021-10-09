import React, { FC } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { H5, H6 } from "components/Text";
import { View } from "react-native";
import { RowButton } from "components/Buttons/RowButton";
import { ClinicianRecord } from "aws/API";
import { RootState, select } from "util/useRedux";
import { getLocalDateTime } from "util/utilityFunctions";

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
  const onRowPress = () => {
    onViewIcdCrtRecord(icdCrtRecord);
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
      {/* View button */}
      <View style={styles.viewButtonContainer}>
        <RowButton
          onPress={onRowPress}
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
    paddingRight: "5@ms",
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
