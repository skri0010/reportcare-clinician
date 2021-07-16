import React, { FC } from "react";
import { Text, View } from "react-native";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import { ScreenWrapper } from "mobile/screens/ScreenWrapper";

export const CliniciansTab: FC = () => {
  // JH-TODO: Replace placeholder with i18n
  return (
    <ScreenWrapper>
      <View>
        <SearchBarComponent
          onUserInput={() => {
            null;
          }}
          placeholder="Search clinicians"
        />
        <Text> Clinicians </Text>
      </View>
    </ScreenWrapper>
  );
};
