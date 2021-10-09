import React, { FC, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleProp,
  ViewProps,
  TextProps
} from "react-native";
import { RootState, select, useDispatch } from "util/useRedux";
import { H3 } from "components/Text";
import { ms, ScaledSheet } from "react-native-size-matters";
import i18n from "util/language/i18n";
import { TextField } from "components/InputComponents/TextField";
import { notEmptyString } from "util/validation";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import { ClinicianRecordInput, RecordFile } from "rc_agents/model";
import { triggerCreateMedicalRecord } from "rc_agents/triggers";
import {
  setCreateMedicalRecordSuccessful,
  setCreatingMedicalRecord
} from "ic-redux/actions/agents/patientActionCreator";
import { useToast } from "react-native-toast-notifications";
import { FileDropbox } from "components/InputComponents/FileDropbox";
import {
  ModalWrapper,
  ModalWrapperProps
} from "components/Wrappers/ModalWrapper";
import { ModalButton } from "components/Buttons/ModalButton";

interface AddMedicalRecordModalProps extends ModalWrapperProps {
  setAddMedicalRecord: (state: boolean) => void;
  patientID?: string;
}

export const AddMedicalRecordModal: FC<AddMedicalRecordModalProps> = ({
  visible,
  onRequestClose,
  setAddMedicalRecord,
  patientID
}) => {
  const {
    colors,
    fonts,
    creatingMedicalRecord,
    createMedicalRecordSuccessful
  } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts,
    creatingMedicalRecord: state.patients.creatingMedicalRecord,
    createMedicalRecordSuccessful: state.patients.createMedicalRecordSuccessful
  }));

  const [title, setTitle] = useState<string>("");
  const [file, setFile] = useState<RecordFile | undefined>(undefined);
  const [allInputValid, setAllInputValid] = useState<boolean>(false);
  const [savingRecord, setSavingRecord] = useState<boolean>(false); // Locally tracks progress of saving record

  const dispatch = useDispatch();
  const toast = useToast();

  // Validates all inputs
  useEffect(() => {
    if (notEmptyString(title) && file) {
      setAllInputValid(true);
    }
  }, [title, file]);

  // Creates input and triggers CreateMedicalRecord
  const onSaveRecord = () => {
    if (file && patientID) {
      dispatch(setCreatingMedicalRecord(true));
      setSavingRecord(true);
      const recordToSave: ClinicianRecordInput = {
        title: title,
        patientID: patientID,
        file: file
      };
      triggerCreateMedicalRecord(recordToSave);
    }
  };

  // Tracks progress of creation
  useEffect(() => {
    // Procedure has been completed
    if (savingRecord && !creatingMedicalRecord) {
      setSavingRecord(false);
      // Create succesful
      if (createMedicalRecordSuccessful) {
        toast.show(
          i18n.t(
            "Patient_History.AddMedicalRecordCard.MedicalRecordSavedSuccessfully"
          ),
          {
            type: "success"
          }
        );
        dispatch(setCreateMedicalRecordSuccessful(false));
        setAddMedicalRecord(false);
        setTitle("");
        setFile(undefined);
      } else {
        // Create failed
        toast.show(i18n.t("UnexpectedError"), {
          type: "danger"
        });
        setAddMedicalRecord(false);
      }
    }
  }, [
    savingRecord,
    creatingMedicalRecord,
    createMedicalRecordSuccessful,
    toast,
    dispatch,
    setAddMedicalRecord
  ]);

  return (
    <ModalWrapper
      visible={visible}
      onRequestClose={onRequestClose} // Disable pointer events if procedure is ongoing
      pointerEvents={savingRecord ? "none" : "auto"}
    >
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Title Input */}
        <TextField
          label={i18n.t("Patient_History.AddMedicalRecordCard.Title")}
          labelStyle={[styles.inputTitle, { fontSize: fonts.h3Size }]}
          value={title}
          onChange={setTitle}
          placeholder={i18n.t(
            "Patient_History.AddMedicalRecordCard.TitleInputPlaceholder"
          )}
          error={!notEmptyString(title)}
          errorMessage={i18n.t(
            "Patient_History.AddMedicalRecordCard.TitleError"
          )}
        />

        {/* File Upload Label */}
        <H3
          text={i18n.t("Patient_History.AddMedicalRecordCard.FileUpload")}
          style={[styles.inputTitle, { marginTop: ms(15) }]}
        />

        {/* File Upload Input */}
        <FileDropbox file={file} setFile={setFile} />
      </ScrollView>

      <View style={styles.bottomButtonsContainer}>
        {/* Save button */}
        <ModalButton
          title={i18n.t("Patient_ICD/CRT.Save")}
          disabled={!allInputValid}
          onPress={onSaveRecord}
          style={
            {
              backgroundColor: allInputValid
                ? colors.acceptButtonColor
                : colors.primaryDeactivatedButtonColor,
              borderColor: colors.primaryTextColor
            } as StyleProp<ViewProps>
          }
        />

        {/* Cancel button */}
        <ModalButton
          title={i18n.t("Patient_ICD/CRT.Cancel")}
          onPress={() => setAddMedicalRecord(false)}
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
      {savingRecord && <LoadingIndicator overlayBackgroundColor />}
    </ModalWrapper>
  );
};

const styles = ScaledSheet.create({
  closeButton: {
    textAlign: "center",
    justifyContent: "space-evenly",
    borderRadius: "5@ms",
    width: "60@ms",
    height: "25@ms",
    borderWidth: "1@ms",
    margin: "10@ms"
  },
  saveButton: {
    textAlign: "center",
    width: "60@ms",
    borderRadius: "5@ms",
    justifyContent: "space-evenly",
    height: "25@ms",
    margin: "10@ms"
  },
  container: {
    width: "50%",
    height: "90%",
    paddingHorizontal: "40@ms",
    borderRadius: "10@ms",
    marginHorizontal: "25%"
  },
  inputTitle: {
    paddingTop: "5@ms",
    fontWeight: "bold",
    paddingBottom: "10@ms"
  },
  bottomButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "10@ms"
  }
});
