import React, { FC } from "react";
import { View } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { MainTitle } from "components/Text";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";

export const TodoCompletedTab: FC = () => {
  // JH-TODO Replace titles with i18n
  return (
    <ScreenWrapper>
      <SearchBarComponent
        onUserInput={() => {
          null;
        }}
        onSearchClick={() => {
          null;
        }}
        containerStyle={{ backgroundColor: "white" }}
        placeholder="Search completed todo"
      />
      {/* <View>
        <MainTitle title="Completed Todo" />
      </View> */}
    </ScreenWrapper>
  );
};
