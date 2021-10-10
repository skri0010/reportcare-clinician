import { H4, H5 } from "components/Text";
import React, { FC } from "react";
import { View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CardWrapper } from "components/Wrappers/CardWrapper";

export interface BaseDetailsContentProps {
  title: string;
  content: string;
}

export const BaseDetailsContent: FC<BaseDetailsContentProps> = ({
  title,
  content
}) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <H5 text={`${title}: `} style={styles.contentTitle} />
      <H5 text={content} />
    </View>
  );
};

export interface BaseDetailsCardProps {
  cardTitle: string;
  iconName?: string;
  maxHeight?: number;
}

export const BaseDetailsCard: FC<BaseDetailsCardProps> = ({
  cardTitle,
  iconName,
  children,
  maxHeight
}) => {
  const iconSize: number = ms(20);

  return (
    <CardWrapper flex={1} maxHeight={maxHeight}>
      <View style={styles.container}>
        <View style={styles.cardTitle}>
          {iconName && (
            <Icon
              name={iconName}
              size={iconSize}
              style={{ paddingRight: ms(5) }}
            />
          )}
          <H4 text={cardTitle} style={{ fontWeight: "bold" }} />
        </View>
        {children}
      </View>
    </CardWrapper>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    height: "100%"
  },
  cardTitle: {
    flexDirection: "row",
    paddingBottom: ms(5),
    alignItems: "center"
  },
  contentTitle: {
    fontWeight: "bold",
    paddingLeft: "5@ms",
    paddingBottom: "5@ms"
  }
});
