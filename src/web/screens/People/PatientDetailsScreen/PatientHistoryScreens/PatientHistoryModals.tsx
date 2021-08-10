import React, { FC } from "react";
import { View, Modal } from "react-native";
import { RootState, select } from "util/useRedux";
import { ScaledSheet } from "react-native-size-matters";

interface PatientHistoryModalProps {
  visible: boolean;
  onRequestClose: () => void;
}

export const PatientHistoryModal: FC<PatientHistoryModalProps> = ({
  visible,
  onRequestClose,
  children
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));
  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onRequestClose}
    >
      <View
        style={[
          styles.modalContainer,
          { backgroundColor: colors.overlayColor }
        ]}
      >
        {children}
      </View>
    </Modal>
  );
};

const styles = ScaledSheet.create({
  modalContainer: {
    justifyContent: "center",
    height: "100%",
    width: "100%"
  }
});
