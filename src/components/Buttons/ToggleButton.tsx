import React, { FC } from "react";
import { Switch } from "react-native";
import { RootState, select } from "util/useRedux";

interface ToggleButtonProps {
  value: boolean;
  onValueChange: () => void;
}

export const ToggleButton: FC<ToggleButtonProps> = ({
  value,
  onValueChange
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <Switch
      ios_backgroundColor={colors.ios_backgroundColor}
      onValueChange={() => onValueChange()}
      value={value}
    />
  );
};
