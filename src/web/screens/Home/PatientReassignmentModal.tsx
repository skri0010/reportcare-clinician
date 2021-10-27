import React, { FC, useEffect, useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { RootState, select } from "util/useRedux";
import { H2 } from "components/Text";
import { ms, ScaledSheet } from "react-native-size-matters";
import i18n from "util/language/i18n";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import { AgentTrigger } from "rc_agents/trigger";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ClinicianInfo, PatientAssignment } from "aws/API";
import { ClinicianShareRow } from "components/RowComponents/ClinicianRow/ClinicianShareRow";
import { RowButton } from "components/Buttons/RowButton";
import {
  PatientAssignmentResolution,
  PatientAssignmentStatus
} from "rc_agents/model";

interface PatientReassignmentModalProps {
  setModalVisible: (state: boolean) => void;
  selectedAssignment: PatientAssignment | null;
}

export const PatientReassignmentModal: FC<PatientReassignmentModalProps> = ({
  setModalVisible,
  selectedAssignment
}) => {
  const { colors, clinicians, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    clinicians: state.clinicians.clinicianContacts,
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

  const reassignPatientAssignment = () => {
    if (selectedAssignment && selectedClinician) {
      const patientAssignmentResolution: PatientAssignmentResolution = {
        patientID: selectedAssignment.patientID,
        clinicianID: selectedAssignment.clinicianID,
        patientName: selectedAssignment.patientName,
        resolution: PatientAssignmentStatus.REASSIGNED,
        reassignToClinicianID: selectedClinician.clinicianID
      };
      AgentTrigger.triggerResolvePendingAssignments(
        patientAssignmentResolution
      );
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.primaryBackgroundColor,
          borderColor: colors.primaryBorderColor
        }
      ]}
    >
      {/* Title and close button */}
      <View style={styles.titleContainer}>
        <H2
          text={i18n.t("Patient_Assignments.PatientReassign")}
          style={{
            fontWeight: "bold",
            paddingLeft: ms(5),
            color: colors.primaryTextColor
          }}
        />
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={styles.closeButton}
        >
          <Icon
            name="close"
            size={fonts.h3Size}
            style={{ color: colors.primaryTextColor }}
          />
        </TouchableOpacity>
      </View>
      {/* List of Clinicians */}
      {clinicians ? (
        <>
          <ScrollView
            style={{ flex: 1, marginHorizontal: ms(10) }}
            showsVerticalScrollIndicator={false}
          >
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
          {/* Reassign button */}
          <View style={styles.buttonContainer}>
            <View style={{ width: "30%" }}>
              <RowButton
                title={i18n.t("Auth_ConfirmRegistration.Confirm")}
                onPress={() => {
                  reassignPatientAssignment();
                  setModalVisible(false);
                }}
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
    borderRadius: "10@ms"
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: "10@ms",
    paddingLeft: "15@ms"
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "5@ms",
    flexDirection: "row",
    marginBottom: "10@ms"
  }
});
