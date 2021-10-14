import React, { FC, useState } from "react";
import { ScrollView, StyleProp, View, ViewProps } from "react-native";
import { RootState, select, useDispatch } from "util/useRedux";
import { H3, H6 } from "components/Text";
import { ScaledSheet } from "react-native-size-matters";
import i18n from "util/language/i18n";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import {
  ModalWrapper,
  ModalWrapperProps
} from "components/Wrappers/ModalWrapper";
import { ModalButton } from "components/Buttons/ModalButton";
import { ClinicianRecord } from "aws/API";
import { queryS3ClinicianRecordsBridge, ClinicianRecordType } from "aws";
import { setRecordToDelete } from "ic-redux/actions/agents/patientActionCreator";
import { AgentTrigger } from "rc_agents/trigger";
import { LocalStorage } from "rc_agents/storage";
import { useToast } from "react-native-toast-notifications";

interface DeleteRecordConfirmationModalProps extends ModalWrapperProps {
  record: ClinicianRecord;
}

export const DeleteRecordConfirmationModal: FC<DeleteRecordConfirmationModalProps> =
  ({ visible, onRequestClose, record }) => {
    const { colors } = select((state: RootState) => ({
      colors: state.settings.colors
    }));
    const [deletingRecord, setDeleting] = useState(false);

    const dispatch = useDispatch();

    const toast = useToast();

    const onConfirmDeleteButtonPress = () => {
      setDeleting(true);
      const deleteRecord = async () => {
        try {
          const response = await queryS3ClinicianRecordsBridge({
            documentID: record.documentID,
            documentTitle: record.title,
            operation: "Delete",
            recordType: record.type as ClinicianRecordType,
            patientID: record.patientID
          });

          if (response.success) {
            // JH-TODO: Procedure for updating list of records
            const patientDetailsToUpdate = await LocalStorage.getPatientDetails(
              record.patientID
            );
            if (patientDetailsToUpdate) {
              // Remove item
              if (record.type === "IcdCrt") {
                patientDetailsToUpdate.icdCrtRecords =
                  patientDetailsToUpdate.icdCrtRecords.filter(
                    (item) => item.documentID !== record.documentID
                  );
              } else if (record.type === "Medical") {
                patientDetailsToUpdate.medicalRecords =
                  patientDetailsToUpdate.medicalRecords.filter(
                    (item) => item.documentID !== record.documentID
                  );
              }

              // Store back into local storage
              LocalStorage.setPatientDetails(patientDetailsToUpdate);

              // Trigger agent to retrieve PatientDetails locally
              AgentTrigger.triggerRetrievePatientDetails(
                patientDetailsToUpdate.patientInfo,
                true
              );

              toast.show(
                `Successfully deleted ${record.type} - ${record.title}`,
                { type: "success" }
              );
            } else {
              toast.show(`Failed to delete ${record.type} - ${record.title}`, {
                type: "warning"
              });
            }

            // Close modal
            onRequestClose();
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
        // Remove overlay
        setDeleting(false);
      };
      deleteRecord();
    };

    return (
      <ModalWrapper
        visible={visible}
        onRequestClose={onRequestClose}
        pointerEvents={deletingRecord ? "none" : "auto"}
      >
        <View style={{ flex: 1, alignItems: "center" }}>
          {/* Record name */}
          <H3 text={record.title} style={styles.title} />

          {/* Warning message */}
          <H6 text={i18n.t("Warnings.DeleteRecord")} style={styles.subtitle} />

          {/* Delete button */}
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <ModalButton
              title={i18n.t("Keywords.Delete")}
              disabled={deletingRecord}
              onPress={onConfirmDeleteButtonPress}
              style={
                {
                  backgroundColor: deletingRecord
                    ? colors.primaryDeactivatedButtonColor
                    : colors.rejectIconColor,
                  borderColor: colors.primaryTextColor,
                  alignSelf: "flex-end"
                } as StyleProp<ViewProps>
              }
              textStyle={{ color: colors.primaryContrastTextColor }}
            />
          </View>
          {deletingRecord && <LoadingIndicator overlayBackgroundColor />}
        </View>
      </ModalWrapper>
    );
  };

const styles = ScaledSheet.create({
  container: {
    width: "50%",
    height: "90%",
    paddingHorizontal: "40@ms",
    borderRadius: "10@ms",
    marginHorizontal: "25%"
  },
  title: {
    paddingTop: "5@ms",
    fontWeight: "bold",
    paddingBottom: "10@ms"
  },
  subtitle: {
    padding: "15@ms"
  }
});
