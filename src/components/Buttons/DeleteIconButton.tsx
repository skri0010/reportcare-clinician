import React, { FC } from "react";
import { ms } from "react-native-size-matters";
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
      containerStyle={{
        backgroundColor: colors.primaryBackgroundColor,
        paddingRight: ms(5)
      }}
      iconStyle={{
        color: allowDelete ? colors.deleteIconColor : colors.overlayColor
      }}
    />
  );
};
