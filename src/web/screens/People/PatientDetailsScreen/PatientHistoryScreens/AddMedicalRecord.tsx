import React, { FC, useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleProp,
  ViewStyle
} from "react-native";
import { RootState, select } from "util/useRedux";
import { H3 } from "components/Text/index";
import { ScaledSheet, ms } from "react-native-size-matters";

interface AddMedicalRecordProps {
  setAddMedicalRecord: (state: boolean) => void;
}
export const AddMedicalRecord: FC<AddMedicalRecordProps> = ({
  setAddMedicalRecord
}) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  const textInputStyle: StyleProp<ViewStyle> = {
    borderWidth: ms(1),
    borderColor: colors.primaryTextColor,
    paddingLeft: ms(5),
    backgroundColor: colors.primaryContrastTextColor
  };

  const [title, setTitle] = useState<string>("");
  const [record, setRecord] = useState<string>("");

  function onChangeTitle(newTitle: string) {
    setTitle(newTitle);
  }

  function onChangeRecord(newRecord: string) {
    setRecord(newRecord);
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.primaryWebBackgroundColor }
      ]}
    >
      <H3
        text="Title"
        style={{ fontWeight: "bold", paddingVertical: ms(10) }}
      />
      <TextInput
        onChangeText={onChangeTitle}
        placeholder="Give the medical record a name (eg Family Background)"
        value={title}
        style={[
          textInputStyle,
          { width: "100%", height: ms(20), fontSize: fonts.h5Size }
        ]}
      />
      <H3
        text="Description"
        style={{ fontWeight: "bold", paddingVertical: ms(10) }}
      />
      <TextInput
        onChangeText={onChangeRecord}
        multiline
        placeholder="What is the content in the medical record?"
        value={record}
        style={[
          textInputStyle,
          { width: "100%", height: "60%", fontSize: fonts.h5Size }
        ]}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <TouchableOpacity
          style={[
            styles.saveButton,
            {
              backgroundColor: colors.primaryButtonColor,
              borderColor: colors.primaryTextColor
            }
          ]}
          onPress={() => {
            // Send API call to save medical record
          }}
        >
          <H3 text="Save" style={{ color: colors.primaryTextColor }} />
        </TouchableOpacity>
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
          <H3 text="Cancel" style={{ color: colors.primaryTextColor }} />
        </TouchableOpacity>
      </View>
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
    height: "80%",
    paddingHorizontal: "10@ms",
    borderRadius: "10@ms",
    borderWidth: "1@ms",
    marginHorizontal: "25%"
  }
});
