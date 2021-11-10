import React, { FC } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { IconButton, IconType } from "./IconButton";

interface DeleteIconProps {
  onPress: () => void;
  allowDelete: boolean;
}

export const DeleteIconButton: FC<DeleteIconProps> = ({
  onPress,
  allowDelete
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <IconButton
      name="trash"
      onPress={onPress}
      disabled={!allowDelete}
      type={IconType.FONTAWESOME}
      containerStyle={styles.iconContainerStyle}
      iconStyle={{
        color: allowDelete ? colors.deleteIconColor : colors.overlayColor
      }}
    />
  );
};

const styles = ScaledSheet.create({
  iconContainerStyle: {
    paddingRight: "5@ms"
  }
});
