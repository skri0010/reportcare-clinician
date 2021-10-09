import React, { FC, useEffect, useState } from "react";
import {
  View,
  ViewProps,
  StyleProp,
  ScrollView,
  TextProps
} from "react-native";
import { RootState, select, useDispatch } from "util/useRedux";
import { H3 } from "components/Text";
import { ScaledSheet, ms } from "react-native-size-matters";
import i18n from "util/language/i18n";
import { TextField } from "components/InputComponents/TextField";
import { notEmptyString } from "util/validation";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import { RecordFile, ClinicianRecordInput } from "rc_agents/model";
import { triggerCreateIcdCrtRecord } from "rc_agents/triggers";
import {
  setCreateIcdCrtRecordSuccessful,
  setCreatingIcdCrtRecord
} from "ic-redux/actions/agents/patientActionCreator";
import { useToast } from "react-native-toast-notifications";
import { FileDropbox } from "components/InputComponents/FileDropbox";
import {
  ModalWrapper,
  ModalWrapperProps
} from "components/Wrappers/ModalWrapper";
import { ModalButton } from "components/Buttons/ModalButton";

interface AddIcdCrtRecordModalProps extends ModalWrapperProps {
  setAddIcdCrtRecord: (state: boolean) => void;
  patientID?: string;
}

export const AddIcdCrtRecordModal: FC<AddIcdCrtRecordModalProps> = ({
  visible,
  onRequestClose,
  setAddIcdCrtRecord,
  patientID
}) => {
  const { colors, fonts, creatingIcdCrtRecord, createIcdCrtRecordSuccessful } =
    select((state: RootState) => ({
      colors: state.settings.colors,
      fonts: state.settings.fonts,
      creatingIcdCrtRecord: state.patients.creatingIcdCrtRecord,
      createIcdCrtRecordSuccessful: state.patients.createIcdCrtRecordSuccessful
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

  // Creates input and triggers CreateIcdCrtRecord
  const onSaveRecord = () => {
    if (file && patientID) {
      dispatch(setCreatingIcdCrtRecord(true));
      setSavingRecord(true);
      const recordToSave: ClinicianRecordInput = {
        title: title,
        patientID: patientID,
        file: file
      };
      triggerCreateIcdCrtRecord(recordToSave);
    }
  };

  // Tracks progress of creation
  useEffect(() => {
    // Procedure has been completed
    if (savingRecord && !creatingIcdCrtRecord) {
      setSavingRecord(false);
      // Create succesful
      if (createIcdCrtRecordSuccessful) {
        toast.show(i18n.t("Patient_ICD/CRT.IcdCrtRecordSavedSuccessfully"), {
          type: "success"
        });
        dispatch(setCreateIcdCrtRecordSuccessful(false));
        setAddIcdCrtRecord(false);
        setTitle("");
        setFile(undefined);
      } else {
        // Create failed
        toast.show(i18n.t("UnexpectedError"), {
          type: "danger"
        });
        setAddIcdCrtRecord(false);
      }
    }
  }, [
    savingRecord,
    creatingIcdCrtRecord,
    createIcdCrtRecordSuccessful,
    toast,
    dispatch,
    setAddIcdCrtRecord
  ]);

  return (
    <ModalWrapper
      visible={visible}
      onRequestClose={onRequestClose}
      // Disable pointer events if procedure is ongoing
      pointerEvents={savingRecord ? "none" : "auto"}
    >
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Title Input */}
        <TextField
          label={i18n.t("Patient_ICD/CRT.Title")}
          labelStyle={[
            styles.inputTitle,
            { fontSize: fonts.h3Size, color: colors.primaryTextColor }
          ]}
          value={title}
          onChange={setTitle}
          placeholder={i18n.t("Patient_ICD/CRT.TitleInputPlaceholder")}
          error={!notEmptyString(title)}
          errorMessage={i18n.t("Patient_ICD/CRT.TitleError")}
        />

        {/* File Upload Label */}
        <H3
          text={i18n.t("Patient_ICD/CRT.FileUpload")}
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
          onPress={() => setAddIcdCrtRecord(false)}
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
