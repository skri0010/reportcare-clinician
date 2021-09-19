import React, { FC, useCallback, useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { RootState, select, useDispatch } from "util/useRedux";
import { H3, H4, H5 } from "components/Text";
import { ScaledSheet, ms } from "react-native-size-matters";
import i18n from "util/language/i18n";
import { useDropzone } from "react-dropzone";
import { TextField } from "components/InputComponents/TextField";
import { notEmptyString } from "util/validation";
import { RowButton } from "components/Buttons/TextButton";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import { MedicalRecordFile, MedicalRecordInput } from "rc_agents/model";
import { triggerCreateMedicalRecord } from "rc_agents/triggers";
import {
  setCreateMedicalRecordSuccessful,
  setCreatingMedicalRecord
} from "ic-redux/actions/agents/actionCreator";
import { useToast } from "react-native-toast-notifications";

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
  const [file, setFile] = useState<MedicalRecordFile | undefined>(undefined);
  const [allInputValid, setAllInputValid] = useState<boolean>(false);
  const [savingRecord, setSavingRecord] = useState<boolean>(false);

  const dispatch = useDispatch();
  const toast = useToast();

  // Handler when files are received
  const onReceiveFile = useCallback((acceptedFiles) => {
    if (acceptedFiles.length === 1) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  // Validates all inputs
  useEffect(() => {
    if (notEmptyString(title) && file) {
      setAllInputValid(true);
    }
  }, [title, file]);

  // Default properties from dropzone
  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop: onReceiveFile,
    noClick: true,
    noKeyboard: true
  });

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
    if (savingRecord && !creatingMedicalRecord) {
      setSavingRecord(false);
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
      } else {
        toast.show(i18n.t("UnexpectedError"), {
          type: "danger"
        });
      }
    }
  }, [
    savingRecord,
    creatingMedicalRecord,
    createMedicalRecordSuccessful,
    toast,
    dispatch
  ]);

  return (
    <View
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

      {/* File Upload */}
      <H3
        text={i18n.t("Patient_History.AddMedicalRecordCard.FileUpload")}
        style={styles.inputTitle}
      />

      {/* File Input */}
      <View
        style={[
          styles.fileUploadContainer,
          {
            borderColor: colors.primaryBorderColor
          }
        ]}
      >
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <div {...getRootProps({ className: "dropzone" })}>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <input {...getInputProps()} />
          <View style={styles.fileInputContainer}>
            <View
              style={[
                styles.fileDropSection,
                {
                  borderColor: isDragActive
                    ? colors.acceptButtonColor
                    : colors.secondaryBackgroundColor,
                  borderStyle: isDragActive ? "solid" : "dashed"
                }
              ]}
            >
              <H4
                text={
                  isDragActive
                    ? i18n.t(
                        "Patient_History.AddMedicalRecordCard.DropFileHere"
                      )
                    : i18n.t(
                        "Patient_History.AddMedicalRecordCard.DragAndDropFile"
                      )
                }
                style={{
                  fontWeight: "bold",
                  color: isDragActive
                    ? colors.primaryTextColor
                    : colors.secondaryTextColor,
                  paddingVertical: ms(10)
                }}
              />
            </View>
            <H5
              text={i18n.t("Patient_History.AddMedicalRecordCard.Or")}
              style={{
                paddingTop: ms(10),
                paddingBottom: ms(5),
                fontWeight: "bold"
              }}
            />
            <RowButton
              title={i18n.t("Patient_History.AddMedicalRecordCard.BrowseFiles")}
              onPress={open}
            />
          </View>
        </div>
      </View>

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
  },
  fileUploadContainer: {
    height: "30%",
    borderWidth: ms(2),
    borderRadius: ms(3),
    paddingBottom: ms(10)
  },
  fileInputContainer: {
    height: "100%",
    width: "100%",
    alignItems: "center"
  },
  fileDropSection: {
    alignItems: "center",
    borderWidth: ms(5),
    opacity: 0.5,
    width: "100%",
    height: "50%"
  }
});
