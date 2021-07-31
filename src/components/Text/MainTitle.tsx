import React, { FC } from "react";
import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { RNTextStyle, H2, H5 } from "./index";

interface MainTitleProps {
  title: string;
  details?: string;
  translate?: boolean;
}

export const MainTitle: FC<MainTitleProps> = ({
  title,
  details,
  translate = true
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const titleColor = { color: colors.primaryTextColor } as RNTextStyle;
  const detailsColors = { color: colors.secondaryTextColor } as RNTextStyle;

  return (
    <View style={styles.container}>
      <H2
        style={[styles.titleStyle, titleColor]}
        text={title}
        translate={translate}
      />
      {details ? (
        <H5
          style={[styles.detailsStyle, detailsColors]}
          text={details}
          translate={translate}
        />
      ) : null}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingTop: "20@ms",
    paddingBottom: "15@ms",
    paddingLeft: "20@ms"
  },
  titleStyle: {
    fontSize: "25@ms",
    fontWeight: "bold"
  },
  detailsStyle: {
    paddingLeft: "5@ms",
    paddingBottom: "5@ms"
  }
});
