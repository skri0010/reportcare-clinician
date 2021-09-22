import React, { FC } from "react";
import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { H5 } from "components/Text";

interface NoListItemMessageProps {
  screenMessage: string;
}

export const NoListItemMessage: FC<NoListItemMessageProps> = ({
  screenMessage
}) => {
  return (
    <View style={styles.noAlertsContainer}>
      <H5 text={screenMessage} style={styles.noAlertsText} />
    </View>
  );
};

const styles = ScaledSheet.create({
  noAlertsContainer: {
    flex: 1,
    paddingTop: "10@ms",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: "30@ms"
  },
  noAlertsText: {
    textAlign: "center"
  }
});
