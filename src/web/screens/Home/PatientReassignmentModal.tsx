import React, { FC, useEffect, useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { RootState, select } from "util/useRedux";
import { H2 } from "components/Text";
import { ms, ScaledSheet } from "react-native-size-matters";
import i18n from "util/language/i18n";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import { AgentTrigger } from "rc_agents/trigger";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ClinicianInfo } from "aws/API";
import { ClinicianShareRow } from "components/RowComponents/ClinicianRow/ClinicianShareRow";
import { RowButton } from "components/Buttons/TextButton";

interface PatientReassignmentModalProps {
  setModalVisible: (state: boolean) => void;
}

export const PatientReassignmentModal: FC<PatientReassignmentModalProps> = ({
  setModalVisible
}) => {
  const { colors, clinicians, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    clinicians: state.agents.clinicianContacts,
    fonts: state.settings.fonts
  }));

  /**
   * Trigger agent to fetch clinician contacts
   */
  useEffect(() => {
    AgentTrigger.triggerRetrieveClinicianContacts();
  }, []);

  const [selectedClinician, setSelectedClinician] =
    useState<null | ClinicianInfo>(null);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.primaryContrastTextColor,
          borderColor: colors.primaryBorderColor
        }
      ]}
    >
      {/* Title and close button */}
      <View style={styles.titleContainer}>
        <H2
          text={i18n.t("Patient_Assignments.PatientReassign")}
          style={{ fontWeight: "bold", paddingLeft: ms(5) }}
        />
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={styles.closeButton}
        >
          <Icon name="close" size={fonts.h3Size} />
        </TouchableOpacity>
      </View>
      {/* List of Clinicians */}
      {clinicians ? (
        <>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            {clinicians.map((data) => (
              <View key={data.clinicianID}>
                <ClinicianShareRow
                  generalDetails={data}
                  checked={
                    selectedClinician ? selectedClinician === data : false
                  }
                  onRowPress={() => {
                    setSelectedClinician(data);
                  }}
                />
              </View>
            ))}
          </ScrollView>
          {/* Share button */}
          <View style={styles.buttonContainer}>
            <View style={{ width: "30%" }}>
              <RowButton
                title="Share"
                onPress={() => null}
                backgroundColor={colors.acceptButtonColor}
              />
            </View>
          </View>
        </>
      ) : (
        <LoadingIndicator flex={1} />
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  closeButton: {
    textAlign: "center",
    justifyContent: "space-evenly",
    margin: "10@ms"
  },
  container: {
    width: "45%",
    minWidth: "250@ms",
    height: "75%",
    paddingLeft: "15@ms",
    borderRadius: "10@ms"
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: "10@ms"
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "5@ms",
    flexDirection: "row",
    marginBottom: "10@ms"
  }
});
