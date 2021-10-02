import React, { FC, useEffect, useState } from "react";
import { RootState, select } from "util/useRedux";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import { FlatList, View } from "react-native";
import i18n from "util/language/i18n";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import { EmptyListIndicator } from "components/Indicators/EmptyListIndicator";
import { IcdCrtRecordRow } from "./IcdCrtRecordRow";
import { IconButton, IconType } from "components/Buttons/IconButton";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { IcdCrtRecord } from "aws/API";
import { useNetInfo } from "@react-native-community/netinfo";
import { ScaledSheet } from "react-native-size-matters";

interface IcdCrtProps {
  icdCrtRecords: IcdCrtRecord[];
  onAddPress: () => void; // when the add button is pressed
  onViewIcdCrtRecord: (icdCrtRecord: IcdCrtRecord) => void;
}

export const IcdCrtCard: FC<IcdCrtProps> = ({
  icdCrtRecords,
  onAddPress,
  onViewIcdCrtRecord
}) => {
  const { colors, fetchingIcdCrtRecordContent } = select(
    (state: RootState) => ({
      colors: state.settings.colors,
      alertHistory: state.agents.alertHistory,
      fetchingIcdCrtRecordContent: state.agents.fetchingIcdCrtRecordContent
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
          iconStyle={{ color: colors.primaryContrastTextColor }}
          disabled={!isOnline}
        />
      </View>
    );
  };

  return (
    <View pointerEvents={fetchingIcdCrtRecordContent ? "none" : "auto"}>
      <CardWrapper
        title={i18n.t("Patient_ICD/CRT.IcdCrtRecords")}
        ComponentNextToTitle={AddIcdCrtRecordButton}
      >
        {/* List of ICD/CRT records */}
        {icdCrtRecords.length > 0 ? (
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
            keyExtractor={(icdCrtRecord) => icdCrtRecord.id}
          />
        ) : (
          <EmptyListIndicator
            text={i18n.t("Patient_ICD/CRT.NoIcdCrtRecords")}
          />
        )}
        {fetchingIcdCrtRecordContent && <LoadingIndicator />}
      </CardWrapper>
    </View>
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
