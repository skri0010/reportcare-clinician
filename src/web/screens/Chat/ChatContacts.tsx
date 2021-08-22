import React, { FC } from "react";
import { Text, View } from "react-native";
import { SearchBarComponent } from "components/bars/SearchBarComponent";

export const ChatContacts: FC = () => {
  return (
    <View>
      <SearchBarComponent
        onUserInput={() => {
          null;
        }}
        onSearchClick={() => {
          null;
        }}
      />
      <Text> Create new chat </Text>
    </View>
  );
};
