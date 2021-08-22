import React, { FC } from "react";
import { View } from "react-native";
import { H5 } from "components/text";
import { ScaledSheet } from "react-native-size-matters";

interface NoItemsTextIndicatorProps {
  text: string;
}

export const NoItemsTextIndicator: FC<NoItemsTextIndicatorProps> = ({
  text
}) => {
  return (
    <View style={styles.noPatientsContainer}>
      <H5 text={text} style={styles.noPatientsText} />
    </View>
  );
};

const styles = ScaledSheet.create({
  noPatientsContainer: {
    flex: 1,
    paddingTop: "10@ms",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: "30@ms"
  },
  noPatientsText: {
    textAlign: "center"
  }
});
