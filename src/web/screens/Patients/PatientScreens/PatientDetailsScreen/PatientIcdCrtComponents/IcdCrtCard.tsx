import React, { FC, useEffect, useState } from "react";
import { RootState, select } from "util/useRedux";
import { CardWrapper } from "components/Wrappers/CardWrapper";
import { FlatList, View } from "react-native";
import i18n from "util/language/i18n";
import { LoadingIndicator } from "components/Indicators2/LoadingIndicator";
import { EmptyListIndicator } from "components/Indicators2/EmptyListIndicator";
import { IcdCrtRecordRow } from "./IcdCrtRecordRow";
import { IconButton, IconType } from "components/Buttons/IconButton";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { ClinicianRecord } from "aws/API";
import { useNetInfo } from "@react-native-community/netinfo";
import { ScaledSheet } from "react-native-size-matters";

interface IcdCrtProps {
  icdCrtRecords: ClinicianRecord[];
  onAddPress: () => void; // when the add button is pressed
  onViewIcdCrtRecord: (icdCrtRecord: ClinicianRecord) => void;
}

export const IcdCrtCard: FC<IcdCrtProps> = ({
  icdCrtRecords,
  onAddPress,
  onViewIcdCrtRecord
}) => {
  const { colors, fetchingIcdCrtRecordContent } = select(
    (state: RootState) => ({
      colors: state.settings.colors,
      alertHistory: state.patients.alertHistory,
      fetchingIcdCrtRecordContent: state.patients.fetchingIcdCrtRecordContent
    })
  );

  const [isOnline, setIsOnline] = useState<boolean>(false); // Whether app is online

  const netInfo = useNetInfo();

  // Detects changes in internet connection to enable or disable button for adding record
  useEffect(() => {
    // Internet connection detected
    if (netInfo.isConnected && netInfo.isInternetReachable) {
      setIsOnline(true);
    }
    // No internet connection
    else if (
      netInfo.isConnected === false ||
      netInfo.isInternetReachable === false
    ) {
      setIsOnline(false);
    }
  }, [netInfo.isConnected, netInfo.isInternetReachable]);

  // Add ICD/CRT record button
  const AddIcdCrtRecordButton: FC = () => {
    return (
      <View style={styles.buttonContainer}>
        <IconButton
          name="plus"
          type={IconType.MATERIAL_COMMUNITY}
          onPress={onAddPress}
          containerStyle={[styles.button, { opacity: isOnline ? 1.0 : 0.2 }]}
          containerBackgroundColor={colors.acceptButtonColor}
          containerBorderColor={colors.acceptButtonColor}
          iconStyle={{ color: colors.primaryContrastTextColor }}
          disabled={!isOnline}
        />
      </View>
    );
  };

  return (
    <CardWrapper
      title={i18n.t("Patient_ICD/CRT.IcdCrtRecords")}
      ComponentNextToTitle={AddIcdCrtRecordButton}
      pointerEvents={fetchingIcdCrtRecordContent ? "none" : "auto"}
    >
      {/* List of ICD/CRT records */}
      {icdCrtRecords && icdCrtRecords.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={ItemSeparator}
          data={icdCrtRecords}
          renderItem={({ item }) => (
            <IcdCrtRecordRow
              icdCrtRecord={item}
              onViewIcdCrtRecord={onViewIcdCrtRecord}
              isOnline={isOnline}
            />
          )}
          keyExtractor={(icdCrtRecord) => icdCrtRecord.documentID}
        />
      ) : (
        <EmptyListIndicator text={i18n.t("Patient_ICD/CRT.NoIcdCrtRecords")} />
      )}
      {fetchingIcdCrtRecordContent && <LoadingIndicator />}
    </CardWrapper>
  );
};

const styles = ScaledSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  button: {
    borderRadius: "10@ms",
    textAlign: "center",
    borderWidth: "1@ms"
  }
});
