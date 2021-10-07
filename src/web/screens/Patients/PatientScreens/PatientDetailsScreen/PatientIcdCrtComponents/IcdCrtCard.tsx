import React, { FC, useEffect, useState } from "react";
import { RootState, select } from "util/useRedux";
import { CardWrapper } from "components/Wrappers/CardWrapper";
import { FlatList, View } from "react-native";
import i18n from "util/language/i18n";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import { EmptyListIndicator } from "components/Indicators/EmptyListIndicator";
import { IcdCrtRecordRow } from "./IcdCrtRecordRow";
import { IconButton, IconType } from "components/Buttons/IconButton";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { ClinicianRecord } from "aws/API";
import { useNetInfo } from "@react-native-community/netinfo";
import { ScaledSheet } from "react-native-size-matters";

interface IcdCrtProps {
  onAddPress: () => void; // when the add button is pressed
  onViewIcdCrtRecord: (icdCrtRecord: ClinicianRecord) => void;
}

export const IcdCrtCard: FC<IcdCrtProps> = ({
  onAddPress,
  onViewIcdCrtRecord
}) => {
  const {
    colors,
    fetchingIcdCrtRecords,
    icdCrtRecords,
    fetchingIcdCrtRecordContent
  } = select((state: RootState) => ({
    colors: state.settings.colors,
    alertHistory: state.agents.alertHistory,
    fetchingIcdCrtRecords: state.agents.fetchingIcdCrtRecords,
    icdCrtRecords: state.agents.icdCrtRecords,
    fetchingIcdCrtRecordContent: state.agents.fetchingIcdCrtRecordContent
  }));

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
      pointerEvents={
        fetchingIcdCrtRecords || fetchingIcdCrtRecordContent ? "none" : "auto"
      }
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
              allowView={isOnline}
            />
          )}
          keyExtractor={(icdCrtRecord) => icdCrtRecord.documentID}
        />
      ) : !fetchingIcdCrtRecords ? (
        <EmptyListIndicator text={i18n.t("Patient_ICD/CRT.NoIcdCrtRecords")} />
      ) : null}
      {(fetchingIcdCrtRecords || fetchingIcdCrtRecordContent) && (
        <LoadingIndicator />
      )}
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
