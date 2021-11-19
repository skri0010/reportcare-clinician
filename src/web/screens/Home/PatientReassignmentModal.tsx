import React, { FC, useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { RootState, select } from "util/useRedux";
import { H3 } from "components/Text";
import { ms, ScaledSheet } from "react-native-size-matters";
import i18n from "util/language/i18n";
import { LoadingIndicator } from "components/Indicators2/LoadingIndicator";
import { AgentTrigger } from "rc_agents/trigger";
import { ClinicianInfo, PatientAssignment } from "aws/API";
import { ClinicianShareRow } from "components/RowComponents/ClinicianRow/ClinicianShareRow";
import { RowButton } from "components/Buttons/RowButton";
import {
  PatientAssignmentResolution,
  PatientAssignmentStatus
} from "rc_agents/model";
import { IconButton, IconType } from "components/Buttons/IconButton";

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
      {/* Close icon button */}
      <IconButton
        name="close"
        type={IconType.MATERIAL_COMMUNITY}
        iconStyle={{
          color: colors.primaryTextColor,
          fontSize: fonts.h3Size
        }}
        containerStyle={styles.closeButton}
        onPress={() => setModalVisible(false)}
      />
      {/* Title */}
      <H3
        text={i18n.t("Patient_Assignments.PatientReassign")}
        style={[
          styles.title,
          {
            color: colors.primaryTextColor
          }
        ]}
      />
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
                    if (selectedClinician === data) {
                      setSelectedClinician(null);
                    } else {
                      setSelectedClinician(data);
                    }
                  }}
                />
              </View>
            ))}
          </ScrollView>
          {/* Reassign button */}
          <View style={styles.buttonContainer}>
            <RowButton
              title={i18n.t("Auth_ConfirmRegistration.Confirm")}
              onPress={() => {
                reassignPatientAssignment();
                setModalVisible(false);
              }}
              backgroundColor={
                selectedClinician
                  ? colors.acceptButtonColor
                  : colors.primaryDeactivatedButtonColor
              }
              disabled={!selectedClinician}
            />
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
    flexDirection: "row",
    alignSelf: "flex-end",
    marginRight: "10@ms",
    marginTop: "10@ms"
  },
  container: {
    width: "45%",
    minWidth: "250@ms",
    height: "80%",
    borderRadius: "10@ms"
  },
  title: {
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: "10@ms"
  },
  buttonContainer: {
    alignSelf: "center",
    width: "30%",
    marginVertical: "10@ms"
  }
});
