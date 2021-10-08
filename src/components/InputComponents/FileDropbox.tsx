/* eslint-disable react/jsx-props-no-spreading */
import React, { CSSProperties, useCallback, useState } from "react";
import { View } from "react-native";
import { RootState, select } from "util/useRedux";
import { ms, ScaledSheet } from "react-native-size-matters";
import { H4, H5, H7 } from "components/Text";
import { useDropzone } from "react-dropzone";
import i18n from "util/language/i18n";
import { RowButton } from "components/Buttons/RowButton";
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
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 1) {
        setFile(acceptedFiles[0] as RecordFile);
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

  const htmlStyle = {
    height: "100%",
    width: "100%"
  } as CSSProperties;

  return (
    <View>
      <View
        style={[
          styles.mainContainer,
          {
            borderColor: multipleFileError
              ? colors.errorColor
              : colors.primaryBorderColor
          }
        ]}
      >
        {!file ? (
          <View style={styles.fileUploadContainer}>
            {/* Option 1: Drag and drop file */}
            <View
              style={[
                styles.fileUploadContainerLeft,
                {
                  borderColor: isDragActive
                    ? colors.acceptButtonColor
                    : colors.secondaryBackgroundColor,
                  borderStyle: isDragActive ? "solid" : "dashed"
                }
              ]}
            >
              <div
                {...getRootProps({ className: "dropzone" })}
                style={htmlStyle}
              >
                <input {...getInputProps()} />
                <View style={styles.divInnerContainer}>
                  <H4
                    text={
                      isDragActive
                        ? dragActivePlaceholder ||
                          i18n.t("FileDropbox.DropFileHere")
                        : dropSectionPlaceholder ||
                          i18n.t("FileDropbox.DragAndDropFile")
                    }
                    style={[
                      styles.dropboxText,
                      {
                        color: isDragActive
                          ? colors.primaryTextColor
                          : colors.secondaryTextColor
                      }
                    ]}
                  />
                </View>
              </div>
            </View>
            {/* Option 2: Browse file*/}
            <View style={styles.fileUploadContainerRight}>
              <H5
                text={i18n.t("FileDropbox.Or")}
                style={[
                  styles.orText,
                  {
                    color: colors.secondaryTextColor
                  }
                ]}
              />
              <RowButton
                title={browseButtonLabel || i18n.t("FileDropbox.BrowseFiles")}
                onPress={open}
              />
            </View>
          </View>
        ) : (
          <View
            style={[
              styles.fileRowContainer,
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
              size={ms(5)}
              onPress={() => setFile(undefined)}
            />
          </View>
        )}
      </View>
      {/* Error message that only one file can be uploaded at a time */}
      <H7
        text={i18n.t("FileDropbox.MultipleFileError")}
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
  mainContainer: {
    minHeight: "100@ms",
    borderWidth: "2@ms",
    borderRadius: "2@ms"
  },
  fileUploadContainer: { flexDirection: "row", height: "100%", width: "100%" },
  fileUploadContainerLeft: {
    flex: 1,
    height: "100%",
    width: "100%",
    alignItems: "center",
    borderWidth: "3@ms",
    opacity: 0.5
  },
  fileUploadContainerRight: {
    flex: 1,
    height: "100%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  dropboxText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold"
  },
  divInnerContainer: {
    height: "100%",
    paddingVertical: "5@ms",
    justifyContent: "center",
    alignItems: "center"
  },
  orText: {
    paddingRight: "7@ms",
    opacity: 0.5
  },
  fileRowContainer: {
    flexDirection: "row",
    borderBottomWidth: "1@ms",
    alignItems: "center",
    padding: "10@ms"
  },
  iconContainerStyle: {
    paddingLeft: "10@ms",
    backgroundColor: "transparent"
  }
});
