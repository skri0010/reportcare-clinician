import React, { FC } from "react";
import { ms } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { IconButton, IconButtonProps, IconType } from "./IconButton";

interface DeleteIconProps {
  onPress: () => void;
}

export const DeleteIconButton: FC<DeleteIconProps> = ({ onPress }) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <IconButton
      name="trash"
      onPress={onPress}
      type={IconType.FONTAWESOME}
      containerStyle={{
        backgroundColor: colors.primaryBackgroundColor,
        paddingRight: ms(5)
      }}
      iconStyle={{ color: colors.rejectIconColor }}
    />
  );
};
