import React, { FC, useEffect, useState } from "react";
import { ScrollView } from "react-native";
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
import { SaveAndCancelButtons } from "components/Buttons/SaveAndCancelButtons";

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
  const { fonts, creatingMedicalRecord, createMedicalRecordSuccessful } =
    select((state: RootState) => ({
      fonts: state.settings.fonts,
      creatingMedicalRecord: state.patients.creatingMedicalRecord,
      createMedicalRecordSuccessful:
        state.patients.createMedicalRecordSuccessful
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

      {/* Save and Cancel modal buttons */}
      <SaveAndCancelButtons
        onPressSave={onSaveRecord}
        onPressCancel={() => setAddMedicalRecord(false)}
        validToSave={allInputValid}
      />
      {savingRecord && <LoadingIndicator overlayBackgroundColor />}
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
  inputTitle: {
    paddingTop: "5@ms",
    fontWeight: "bold",
    paddingBottom: "10@ms"
  }
});
