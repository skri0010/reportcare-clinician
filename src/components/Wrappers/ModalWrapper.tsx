import React, { FC } from "react";
import { View, Modal, StyleProp, ViewStyle } from "react-native";
import { RootState, select } from "util/useRedux";
import { ScaledSheet } from "react-native-size-matters";
import { BaseWrapperProps } from "components/Wrappers/BaseWrapperProps";

export interface ModalWrapperProps extends BaseWrapperProps {
  visible: boolean;
  onRequestClose: () => void;
  modalStyle?: StyleProp<ViewStyle>;
}

export const ModalWrapper: FC<ModalWrapperProps> = ({
  visible,
  onRequestClose,
  children,
  modalStyle
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
      <View style={[styles.modal, { backgroundColor: colors.overlayColor }]}>
        <View
          style={[
            styles.modalInnerContainer,
            {
              backgroundColor: colors.primaryContrastTextColor,
              borderColor: colors.primaryBorderColor
            },
            modalStyle
          ]}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = ScaledSheet.create({
  modal: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  modalInnerContainer: {
    flex: 1,
    width: "400@ms",
    maxWidth: "80%",
    maxHeight: "70%",
    marginHorizontal: "20@ms",
    paddingVertical: "10@ms",
    paddingHorizontal: "20@ms",
    borderRadius: "10@ms"
  }
});
