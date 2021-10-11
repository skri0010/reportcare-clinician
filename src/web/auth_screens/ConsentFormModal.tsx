import React, { FC } from "react";
import { View, ScrollView, Modal } from "react-native";
import { RootState, select } from "util/useRedux";
import { H1, H3, H4 } from "components/Text";
import { ScaledSheet } from "react-native-size-matters";
import { RowButton } from "components/Buttons/RowButton";
import i18n from "util/language/i18n";

interface ConsentFormModalProps {
  visible: boolean;
  onRequestClose: () => void;
  setAgreement: (state: boolean) => void;
}

export const ConsentFormModal: FC<ConsentFormModalProps> = ({
  visible,
  onRequestClose,
  setAgreement
}) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  const tempConditions = Array.from(Array(50).keys());

  return (
    <Modal transparent visible={visible} onRequestClose={onRequestClose}>
      {/* Container for modal */}
      <View
        style={[
          styles.modalContainer,
          { backgroundColor: colors.overlayColor }
        ]}
      >
        {/* Container for content */}
        <View
          style={[
            styles.container,
            {
              backgroundColor: colors.primaryBackgroundColor,
              borderColor: colors.primaryBorderColor
            }
          ]}
        >
          {/* Title */}
          <H1
            text={i18n.t("Auth_Registration.TermOfServices")}
            style={[styles.title, { color: colors.primaryTextColor }]}
          />
          {/* List of Terms */}
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator>
            {tempConditions.map((item) => {
              return (
                <View style={styles.termsContainer}>
                  <H3 text={`Term of service No. ${item.toString()}`} />
                  <H4
                    text={`This is description for terms of service no.${item.toString()}`}
                  />
                </View>
              );
            })}
          </ScrollView>
          {/* Button Container */}
          <View style={styles.buttonContainer}>
            <RowButton
              title={i18n.t("Auth_Registration.Accept")}
              fontSize={fonts.h3Size}
              onPress={() => {
                setAgreement(true);
                onRequestClose();
              }}
              backgroundColor={colors.acceptButtonColor}
            />
            <RowButton
              title={i18n.t("Auth_Registration.Decline")}
              fontSize={fonts.h3Size}
              onPress={() => {
                setAgreement(false);
                onRequestClose();
              }}
              backgroundColor={colors.declineButtonColor}
            />
          </View>
        </View>
      </View>
    </Modal>
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
  container: {
    width: "50%",
    minWidth: "250@ms",
    height: "80%",
    paddingLeft: "15@ms",
    borderRadius: "10@ms"
  },
  termsContainer: {
    marginBottom: "10@ms"
  },
  modalContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%"
  },
  title: {
    fontWeight: "bold",
    justifyContent: "center",
    display: "flex",
    marginVertical: "10@ms"
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: "10@ms"
  }
});
