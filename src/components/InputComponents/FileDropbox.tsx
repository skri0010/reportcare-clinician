import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { RootState, select } from "util/useRedux";
import { ms, ScaledSheet } from "react-native-size-matters";
import { H4, H5, H7 } from "components/Text";
import { useDropzone } from "react-dropzone";
import i18n from "util/language/i18n";
import { RowButton } from "components/Buttons/TextButton";
import { IconButton, IconType } from "components/Buttons/IconButton";
import { RecordFile } from "rc_agents/model";

interface FileDropboxProps {
  file: RecordFile | undefined;
  setFile: (file: RecordFile | undefined) => void;
  dropSectionPlaceholder?: string;
  dragActivePlaceholder?: string;
  browseButtonLabel?: string;
}

export const FileDropbox: React.FC<FileDropboxProps> = ({
  file,
  setFile,
  dropSectionPlaceholder,
  dragActivePlaceholder,
  browseButtonLabel
}) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  const [multipleFileError, setMultipleFileError] = useState<boolean>(false); // Flag to show that only one file can be uploaded at a time

  // Handler when files are received
  const onReceiveFile = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length === 1) {
        setFile(acceptedFiles[0]);
        setMultipleFileError(false);
      } else {
        // Trigger to show error that only one file can be uploaded at a time
        setMultipleFileError(true);
        setFile(undefined);
      }
    },
    [setFile]
  );

  // Default properties from dropzone
  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop: onReceiveFile,
    noClick: true,
    noKeyboard: true
  });

  return (
    <View>
      <View
        style={[
          styles.fileUploadContainer,
          {
            borderColor: multipleFileError
              ? colors.errorColor
              : colors.primaryBorderColor
          }
        ]}
      >
        {!file ? (
          <View>
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
                        ? dragActivePlaceholder ||
                          i18n.t(
                            "Patient_History.AddMedicalRecordCard.DropFileHere"
                          )
                        : dropSectionPlaceholder ||
                          i18n.t(
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
                  title={
                    browseButtonLabel ||
                    i18n.t("Patient_History.AddMedicalRecordCard.BrowseFiles")
                  }
                  onPress={open}
                />
              </View>
            </div>
          </View>
        ) : (
          <View>
            <View
              style={[
                styles.fileNameContainer,
                {
                  borderColor: colors.primaryBorderColor
                }
              ]}
            >
              <H5 text={file.name} />
              <IconButton
                name="times"
                type={IconType.FONTAWESOME}
                iconStyle={{ fontSize: fonts.h5Size, color: colors.errorColor }}
                containerStyle={styles.iconContainerStyle}
                onPress={() => setFile(undefined)}
              />
            </View>
          </View>
        )}
      </View>
      {/* Error message that only one file can be uploaded at a time */}
      <H7
        text={i18n.t("Patient_History.AddMedicalRecordCard.MultipleFileError")}
        style={{
          fontWeight: "bold",
          color: colors.errorColor,
          opacity: multipleFileError ? 1 : 0
        }}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  fileUploadContainer: {
    height: ms(125),
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
    height: "55%"
  },
  fileNameContainer: {
    flexDirection: "row",
    borderWidth: ms(1),
    padding: ms(10)
  },
  iconContainerStyle: {
    paddingLeft: ms(10),
    width: "5%",
    alignSelf: "flex-end",
    backgroundColor: "transparent"
  }
});
