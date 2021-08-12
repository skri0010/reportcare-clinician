/* eslint-disable*/
import React, { FC } from "react";
// @ts-ignore
import Picker from "@react-native-picker/picker/js/Picker.web";
import {
  PickerProps,
  PickerItemProps
} from "@react-native-picker/picker/typings/Picker";

export type { ItemValue } from "@react-native-picker/picker/typings/Picker";

export const WebPicker: FC<PickerProps> = (props: PickerProps) => (
  <Picker {...props} />
);

export const WebPickerItem: FC<PickerItemProps> = (props: PickerItemProps) => (
  <Picker.Item {...props} />
);
