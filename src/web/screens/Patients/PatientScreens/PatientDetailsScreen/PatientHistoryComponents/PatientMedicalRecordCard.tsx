import React, { FC, useEffect, useState } from "react";
import { RootState, select } from "util/useRedux";
import { ScaledSheet } from "react-native-size-matters";
import { CardWrapper } from "components/Wrappers/CardWrapper";
import { FlatList, View } from "react-native";
import { MedicalRecordRow } from "./MedicalRecordRow";
import i18n from "util/language/i18n";
import { IconButton, IconType } from "components/Buttons/IconButton";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { EmptyListIndicator } from "components/Indicators/EmptyListIndicator";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import { useNetInfo } from "@react-native-community/netinfo";
import { AgentTrigger } from "rc_agents/trigger";
import { ClinicianRecord } from "aws/API";

interface PatientMedicalRecordProps {
  medicalRecords: ClinicianRecord[];
  maxHeight: number;
  onAddPress: () => void; // action to be done when add button is pressed
}

export const PatientMedicalRecordCard: FC<PatientMedicalRecordProps> = ({
  medicalRecords,
  maxHeight,
  onAddPress
}) => {
  const { colors, fetchingMedicalRecordContent } = select(
    (state: RootState) => ({
      colors: state.settings.colors,
      fetchingMedicalRecordContent: state.patients.fetchingMedicalRecordContent
    })
  );

  const [isOnline, setIsOnline] = useState<boolean>(false); // Whether file upload is allowed (is online)

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

  // Add medical record button
  const AddMedicalRecordButton: FC = () => {
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
      maxHeight={maxHeight}
      title={i18n.t("Patient_History.MedicalRecords")}
      ComponentNextToTitle={AddMedicalRecordButton}
    >
      <View pointerEvents={fetchingMedicalRecordContent ? "none" : "auto"}>
        {/* List of medical records */}
        {medicalRecords.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={ItemSeparator}
            data={medicalRecords}
            renderItem={({ item }) => (
              <MedicalRecordRow
                medicalRecord={item}
                onViewMedicalRecord={
                  AgentTrigger.triggerRetrieveMedicalRecordContent
                }
                isOnline={isOnline}
              />
            )}
            keyExtractor={(medicalRecord) => medicalRecord.documentID}
          />
        ) : (
          <EmptyListIndicator
            text={i18n.t("Patient_History.NoMedicalRecords")}
          />
        )}
        {fetchingMedicalRecordContent && <LoadingIndicator />}
      </View>
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
