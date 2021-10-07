import React, { FC, useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { RootState, select, useDispatch } from "util/useRedux";
import { H3 } from "components/Text";
import { ScaledSheet, ms } from "react-native-size-matters";
import i18n from "util/language/i18n";
import { TextField } from "components/InputComponents/TextField";
import { notEmptyString } from "util/validation";
import { LoadingIndicator } from "components/Indicators2/LoadingIndicator";
import { RecordFile, MedicalRecordInput } from "rc_agents/model";
import { triggerCreateMedicalRecord } from "rc_agents/triggers";
import {
  setCreateMedicalRecordSuccessful,
  setCreatingMedicalRecord
} from "ic-redux/actions/agents/actionCreator";
import { useToast } from "react-native-toast-notifications";
import { FileDropbox } from "components/InputComponents/FileDropbox";

interface AddMedicalRecordProps {
  setAddMedicalRecord: (state: boolean) => void;
  patientID?: string;
}

export const AddMedicalRecord: FC<AddMedicalRecordProps> = ({
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
    creatingMedicalRecord: state.agents.creatingMedicalRecord,
    createMedicalRecordSuccessful: state.agents.createMedicalRecordSuccessful
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
      const recordToSave: MedicalRecordInput = {
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
    <View
      // Disable pointer events if procedure is ongoing
      pointerEvents={savingRecord ? "none" : "auto"}
      style={[
        styles.container,
        { backgroundColor: colors.primaryContrastTextColor }
      ]}
    >
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
        errorMessage={i18n.t("Patient_History.AddMedicalRecordCard.TitleError")}
      />

      {/* File Upload Label */}
      <H3
        text={i18n.t("Patient_History.AddMedicalRecordCard.FileUpload")}
        style={styles.inputTitle}
      />

      {/* File Upload Input */}
      <FileDropbox file={file} setFile={setFile} />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: ms(20)
        }}
      >
        {/* Save button */}
        <TouchableOpacity
          disabled={!allInputValid}
          style={[
            styles.saveButton,
            {
              backgroundColor: allInputValid
                ? colors.acceptButtonColor
                : colors.primaryDeactivatedButtonColor,
              borderColor: colors.primaryTextColor
            }
          ]}
          onPress={onSaveRecord}
        >
          <H3
            text={i18n.t("Patient_History.SaveButton")}
            style={{ color: colors.primaryTextColor }}
          />
        </TouchableOpacity>
        {/* Cancel button */}
        <TouchableOpacity
          style={[
            styles.closeButton,
            {
              backgroundColor: colors.primaryContrastTextColor,
              borderColor: colors.primaryTextColor
            }
          ]}
          onPress={() => {
            setAddMedicalRecord(false);
          }}
        >
          <H3
            text={i18n.t("Patient_History.CancelButton")}
            style={{ color: colors.primaryTextColor }}
          />
        </TouchableOpacity>
      </View>
      {savingRecord && <LoadingIndicator overlayBackgroundColor />}
    </View>
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
    paddingTop: ms(25),
    fontWeight: "bold",
    paddingBottom: ms(10)
  }
});
