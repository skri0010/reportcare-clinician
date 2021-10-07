import React, { FC, useEffect } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { H5, H6 } from "components/Text";
import { Linking, View } from "react-native";
import { RowButton } from "components/Buttons/TextButton";
import { IcdCrtRecord } from "aws/API";
import { RootState, select, useDispatch } from "util/useRedux";
import { setIcdCrtRecordContent } from "ic-redux/actions/agents/actionCreator";
import { getLocalDateTime } from "util/utilityFunctions";

interface IcdCrtRecordRowProps {
  icdCrtRecord: IcdCrtRecord;
  onViewIcdCrtRecord: (IcdCrtRecord: IcdCrtRecord) => void;
  allowView: boolean; // Whether content viewing is allowed (is online)
}

export const IcdCrtRecordRow: FC<IcdCrtRecordRowProps> = ({
  icdCrtRecord,
  onViewIcdCrtRecord,
  allowView
}) => {
  const { colors, icdCrtRecordContent } = select((state: RootState) => ({
    colors: state.settings.colors,
    icdCrtRecordContent: state.agents.icdCrtRecordContent
  }));

  const dispatch = useDispatch();

  // Detects retrieved content URL
  useEffect(() => {
    if (icdCrtRecordContent) {
      // Opens a new tab to show the content
      Linking.openURL(icdCrtRecordContent);
      dispatch(setIcdCrtRecordContent(undefined));
    }
  }, [dispatch, icdCrtRecordContent]);

  // Triggers DTA to retrieve URL for showing ICD/CRT record content
  const onRowPress = () => {
    onViewIcdCrtRecord(icdCrtRecord);
  };

  return (
    <View style={[styles.container]}>
      {/* ICD/CRT record title */}
      <H5 text={icdCrtRecord.title} style={[styles.textContainer]} />
      {/* ICD/CRT record creation date */}
      <H6
        text={getLocalDateTime(icdCrtRecord.dateTime)}
        style={styles.dateTimeContainer}
      />
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  textContainer: {
    flex: 5,
    paddingRight: "5@ms",
    maxWidth: "250@ms"
  },
  dateTimeContainer: {
    flex: 3,
    textAlign: "center"
  },
  viewButtonContainer: {
    flex: 2
  }
});
