import React, { FC, useEffect, useState } from "react";
import { StyleProp, TextProps, View, ViewProps } from "react-native";
import { RootState, select, useDispatch } from "util/useRedux";
import { H3, H6 } from "components/Text";
import { ms, ScaledSheet } from "react-native-size-matters";
import i18n from "util/language/i18n";
import { LoadingIndicator } from "components/Indicators2/LoadingIndicator";
import {
  ModalWrapper,
  ModalWrapperProps
} from "components/Wrappers/ModalWrapper";
import { ModalButton } from "components/Buttons/ModalButton";
import { ClinicianRecord } from "aws/API";
import { AgentTrigger } from "rc_agents/trigger";
import { useToast } from "react-native-toast-notifications";
import {
  setDeleteRecordSuccessful,
  setDeletingRecord
} from "ic-redux/actions/agents/patientActionCreator";

interface DeleteRecordConfirmationModalProps extends ModalWrapperProps {
  record: ClinicianRecord;
}

export const DeleteRecordConfirmationModal: FC<DeleteRecordConfirmationModalProps> =
  ({ visible, onRequestClose, record }) => {
    const { colors, deletingRecord, deleteRecordSuccessful } = select(
      (state: RootState) => ({
        colors: state.settings.colors,
        deletingRecord: state.patients.deletingRecord,
        deleteRecordSuccessful: state.patients.deleteRecordSuccessful
      })
    );
    const [deleting, setDeleting] = useState(false); // Used locally for tracking ongoing procedure

    const dispatch = useDispatch();
    const toast = useToast();

    // Tracks progress of deletion
    useEffect(() => {
      // Procedure has been completed
      if (deleting && !deletingRecord) {
        setDeleting(false);
        // Delete succesful
        if (deleteRecordSuccessful) {
          toast.show(
            `${i18n.t("DetailsUpdate.RecordDeletedSuccessfully")} ${
              record.type
            } - ${record.title}`,
            { type: "success" }
          );
          dispatch(setDeleteRecordSuccessful(false));
        } else {
          // Delete failed
          toast.show(
            `${i18n.t("DetailsUpdate.FailedToDelete")} ${record.type} - ${
              record.title
            }`,
            {
              type: "danger"
            }
          );
        }

        // Close modal
        onRequestClose();
      }
    }, [
      toast,
      dispatch,
      deleting,
      deletingRecord,
      deleteRecordSuccessful,
      onRequestClose,
      record
    ]);

    const onConfirmDeleteButtonPress = () => {
      dispatch(setDeletingRecord(true));
      setDeleting(true);
      AgentTrigger.triggerDeleteRecord(record);
    };

    return (
      <ModalWrapper
        visible={visible}
        onRequestClose={onRequestClose}
        pointerEvents={deletingRecord ? "none" : "auto"}
      >
        <View style={styles.contentContainer}>
          {/* Record name */}
          <H3 text={record.title} style={styles.title} />

          {/* Warning message */}
          <H6 text={i18n.t("Warnings.DeleteRecord")} style={styles.subtitle} />

          <View style={styles.buttonsContainer}>
            <View style={styles.buttonsRowContainer}>
              {/* Delete button */}
              <ModalButton
                title={i18n.t("Keywords.Delete")}
                disabled={deletingRecord}
                onPress={onConfirmDeleteButtonPress}
                style={
                  {
                    backgroundColor: deletingRecord
                      ? colors.primaryDeactivatedButtonColor
                      : colors.deleteIconColor,
                    borderColor: colors.primaryTextColor
                  } as StyleProp<ViewProps>
                }
                textStyle={{ color: colors.primaryContrastTextColor }}
              />
              {/* Cancel button */}
              <ModalButton
                title={i18n.t("DetailsUpdate.Cancel")}
                disabled={deletingRecord}
                onPress={onRequestClose}
                style={
                  {
                    backgroundColor: colors.primaryContrastTextColor,
                    borderColor: colors.primaryTextColor,
                    borderWidth: ms(1),
                    borderRadius: ms(5)
                  } as StyleProp<ViewProps>
                }
                textStyle={
                  { color: colors.consistentTextColor } as StyleProp<TextProps>
                }
              />
            </View>
          </View>
          {deletingRecord && <LoadingIndicator overlayBackgroundColor />}
        </View>
      </ModalWrapper>
    );
  };

const styles = ScaledSheet.create({
  contentContainer: { flex: 1, alignItems: "center" },
  buttonsContainer: { flex: 1, justifyContent: "flex-end" },
  buttonsRowContainer: { flexDirection: "row", justifyContent: "center" },
  title: {
    paddingTop: "5@ms",
    fontWeight: "bold",
    paddingBottom: "10@ms"
  },
  subtitle: {
    padding: "15@ms"
  }
});
