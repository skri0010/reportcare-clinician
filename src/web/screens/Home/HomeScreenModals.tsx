import React, { FC } from "react";
import { View, Modal } from "react-native";
import { RootState, select } from "util/useRedux";
import { ScaledSheet } from "react-native-size-matters";

interface HomeScreenModalsProps {
  visible: boolean;
  onRequestClose: () => void;
}

export const HomeScreenModal: FC<HomeScreenModalsProps> = ({
  visible,
  onRequestClose,
  children
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));
  return (
    <Modal transparent visible={visible} onRequestClose={onRequestClose}>
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%"
  }
});
