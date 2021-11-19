import React, { FC, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { RootState, select, useDispatch } from "util/useRedux";
import { H3 } from "components/Text";
import { ms, ScaledSheet } from "react-native-size-matters";
import i18n from "util/language/i18n";
import { LoadingIndicator } from "components/Indicators2/LoadingIndicator";
import {
  ModalWrapper,
  ModalWrapperProps
} from "components/Wrappers/ModalWrapper";
import { AgentTrigger } from "rc_agents/trigger";
import { useToast } from "react-native-toast-notifications";
import {
  setSharingPatient,
  setSharePatientSuccessful
} from "ic-redux/actions/agents/clinicianActionCreator";
import { ClinicianInfo, PatientInfo } from "aws/API";
import { ClinicianShareRow } from "components/RowComponents/ClinicianRow/ClinicianShareRow";
import { NoListItemMessage } from "web/screens/Shared/NoListItemMessage";
import { IconButton, IconType } from "components/Buttons/IconButton";
import { RowButton } from "components/Buttons/RowButton";

interface SharePatientModalProps extends ModalWrapperProps {
  patient: PatientInfo | undefined;
}

export const SharePatientModal: FC<SharePatientModalProps> = ({
  visible,
  onRequestClose,
  patient
}) => {
  const {
    colors,
    fonts,
    fetchingSharingClinicians,
    sharingClinicians,
    sharingPatient,
    sharePatientSuccessful
  } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts,
    fetchingSharingClinicians: state.clinicians.fetchingSharingClinicians,
    sharingClinicians: state.clinicians.sharingClinicians,
    sharingPatient: state.clinicians.sharingPatient,
    sharePatientSuccessful: state.clinicians.sharePatientSuccessful
  }));
  const [sharing, setSharing] = useState(false); // Used locally for tracking ongoing procedure
  const [selectedClinician, setSelectedClinician] = useState<
    ClinicianInfo | undefined
  >(undefined);

  const dispatch = useDispatch();
  const toast = useToast();

  // Tracks progress of sharing
  useEffect(() => {
    // Procedure has been completed
    if (sharing && !sharingPatient) {
      setSharing(false);
      // Sharing succesful
      if (sharePatientSuccessful) {
        toast.show(i18n.t("PatientSharing.PatientSharedSuccessfully"), {
          type: "success"
        });
        dispatch(setSharePatientSuccessful(false));
      } else {
        // Sharing failed
        toast.show(i18n.t("PatientSharing.FailedToSharePatient"), {
          type: "danger"
        });
      }

      // Close modal
      onRequestClose();
    }
  }, [
    toast,
    dispatch,
    onRequestClose,
    sharing,
    sharingPatient,
    sharePatientSuccessful
  ]);

  // When "Share" button is being pressed
  const onSharePress = () => {
    if (patient && selectedClinician) {
      dispatch(setSharingPatient(true));
      setSharing(true);

      // Trigger SharePatient of DTA
      AgentTrigger.triggerSharePatient({
        patientID: patient.patientID,
        patientName: patient.name,
        shareToClinicianID: selectedClinician.clinicianID
      });
    }
  };

  return (
    <ModalWrapper
      visible={visible}
      onRequestClose={onRequestClose}
      pointerEvents={
        fetchingSharingClinicians || sharingPatient ? "none" : "auto"
      }
      modalStyle={styles.modalContainer}
    >
      {/* Close icon button */}
      <IconButton
        name="close"
        type={IconType.MATERIAL_COMMUNITY}
        iconStyle={{
          color: colors.primaryTextColor,
          fontSize: fonts.h3Size
        }}
        containerStyle={styles.closeButtonContainer}
        onPress={onRequestClose}
      />

      {/* Title */}
      <H3
        text={i18n.t("PatientSharing.ModalTitle")}
        style={[
          styles.title,
          {
            color: colors.primaryTextColor
          }
        ]}
      />
      <View style={styles.contentContainer}>
        {/* List of clinicians for selection */}
        {fetchingSharingClinicians ? (
          <LoadingIndicator flex={1} />
        ) : sharingClinicians && sharingClinicians.length > 0 ? (
          <ScrollView
            style={{ flex: 1, marginHorizontal: ms(10) }}
            showsVerticalScrollIndicator={false}
          >
            {sharingClinicians.map((clinician) => (
              <View key={clinician.clinicianID}>
                <ClinicianShareRow
                  generalDetails={clinician}
                  checked={
                    selectedClinician ? selectedClinician === clinician : false
                  }
                  onRowPress={() => {
                    if (selectedClinician === clinician) {
                      setSelectedClinician(undefined);
                    } else {
                      setSelectedClinician(clinician);
                    }
                  }}
                />
              </View>
            ))}
          </ScrollView>
        ) : (
          <NoListItemMessage
            screenMessage={i18n.t("PatientSharing.NoCliniciansFound")}
          />
        )}
        <View style={styles.shareButtonContainer}>
          <RowButton
            title={i18n.t("DetailsUpdate.Share")}
            onPress={onSharePress}
            backgroundColor={
              selectedClinician
                ? colors.acceptButtonColor
                : colors.primaryDeactivatedButtonColor
            }
            disabled={!selectedClinician}
          />
        </View>
      </View>
      {sharingPatient && <LoadingIndicator overlayBackgroundColor />}
    </ModalWrapper>
  );
};

const styles = ScaledSheet.create({
  modalContainer: {
    width: "45%",
    minWidth: "250@ms",
    maxHeight: "80%",
    borderRadius: "10@ms"
  },
  closeButtonContainer: {
    flexDirection: "row",
    alignSelf: "flex-end"
  },
  title: {
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: "10@ms"
  },
  contentContainer: { flex: 1, justifyContent: "space-between" },
  shareButtonContainer: {
    alignSelf: "center",
    width: "30%",
    marginTop: "10@ms"
  }
});
