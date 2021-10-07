import React, { FC } from "react";
import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { RootState, select } from "util/useRedux";
import { H6 } from "components/Text";

export interface InformationBlockProps {
  information: string;
}

export const InformationBlock: FC<InformationBlockProps> = ({
  information
}) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  return (
    // Information component for users
    <View style={{ justifyContent: "center" }}>
      <View
        style={[
          styles.container,
          { backgroundColor: colors.primaryBackgroundColor }
        ]}
      >
        <Icon
          name="information-outline"
          color={colors.infoIconColor}
          size={fonts.h2Size}
        />
        <View style={{ flex: 0.95 }}>
          <H6 text={information} />
        </View>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: "10@ms",
    borderWidth: "1@ms",
    paddingVertical: "10@ms",
    justifyContent: "space-evenly"
  }
});
