import React, { FC, useState } from "react";
import { View, TouchableOpacity, TextInput } from "react-native";
import { ScaledSheet, ms } from "react-native-size-matters";
import { H3 } from "components/Text";
import { RootState, select } from "util/useRedux";

interface AddTodoScreenProps {
  setModalVisible: (state: boolean) => void;
}

export const AddTodoScreen: FC<AddTodoScreenProps> = ({ setModalVisible }) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const [titleInput, setTitleInput] = useState<string>("");
  const [patientInput, setPatientInput] = useState<string>("");
  const [noteInput, setNoteInput] = useState<string>("");

  const onChangeTitle = (newTitle: string) => {
    setTitleInput(newTitle);
  };
  const onChangePatient = (newPatient: string) => {
    setPatientInput(newPatient);
  };
  const onChangeNotes = (newNote: string) => {
    setNoteInput(newNote);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.primaryWebBackgroundColor,
          borderColor: colors.secondaryBackgroundColor
        }
      ]}
    >
      <H3 text="Title" style={{ fontWeight: "bold", marginBottom: ms(5) }} />
      <TextInput
        value={titleInput}
        placeholder="What's this todo about?"
        style={[
          styles.titleInput,
          {
            backgroundColor: colors.primaryContrastTextColor,
            borderColor: colors.primaryTextColor
          }
        ]}
        onChangeText={onChangeTitle}
      />
      <H3 text="Patient" style={{ fontWeight: "bold", marginBottom: ms(5) }} />
      <TextInput
        value={patientInput}
        placeholder="What's the patient's name?"
        style={[
          styles.titleInput,
          {
            backgroundColor: colors.primaryContrastTextColor,
            borderColor: colors.primaryTextColor
          }
        ]}
        onChangeText={onChangePatient}
      />
      <H3 text="Notes" style={{ fontWeight: "bold", marginBottom: ms(5) }} />
      <TextInput
        multiline
        value={noteInput}
        placeholder="Anything notable?"
        style={[
          styles.noteInput,
          {
            backgroundColor: colors.primaryContrastTextColor,
            borderColor: colors.primaryTextColor
          }
        ]}
        onChangeText={onChangeNotes}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.cancelButton,
            { backgroundColor: colors.primaryTodoCompleteButtonColor }
          ]}
          onPress={() => {
            // Sends API call to save new Todo data
          }}
        >
          <H3 text="Save" style={{ color: colors.primaryContrastTextColor }} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.saveButton,
            {
              backgroundColor: colors.primaryContrastTextColor,
              borderColor: colors.primaryTextColor
            }
          ]}
          onPress={() => {
            setModalVisible(false);
          }}
        >
          <H3 text="Cancel" style={{ color: colors.primaryTextColor }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    alignSelf: "center",
    justifyContent: "space-between",
    marginTop: "20@ms",
    padding: "20@ms",
    height: "70%",
    width: "70%",
    borderWidth: ms(2),
    borderRadius: ms(10)
  },
  titleInput: {
    height: "45@ms",
    width: "50%",
    borderWidth: "1@ms",
    borderRadius: "2@ms",
    marginBottom: "20@ms",
    paddingLeft: "10@ms"
  },
  noteInput: {
    height: "100@ms",
    borderWidth: "1@ms",
    borderRadius: "2@ms",
    paddingLeft: "10@ms",
    marginBottom: "20@ms",
    paddingTop: "5@ms"
  },
  buttonContainer: {
    alignItem: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  cancelButton: {
    textAlign: "center",
    justifyContent: "space-evenly",
    borderRadius: "5@ms",
    width: "60@ms",
    height: "25@ms",
    margin: "10@ms"
  },
  saveButton: {
    textAlign: "center",
    justifyContent: "space-evenly",
    borderRadius: "5@ms",
    width: "60@ms",
    height: "25@ms",
    borderWidth: "1@ms",
    margin: "10@ms"
  }
});
