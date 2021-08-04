import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { H3, H4 } from "components/Text/index";
import { CardWrapper } from "web/screens/Home/CardWrapper";

interface BloodPressureProps {
  systolic: string;
  dystolic: string;
}

export const BloodPressureCard: FC<BloodPressureProps> = ({
  systolic,
  dystolic
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <CardWrapper maxHeight={ms(120)}>
      <H3
        text="Blood Pressure"
        style={{ fontWeight: "bold", color: colors.primaryTextColor }}
      />
      <View style={styles.container}>
        <View style={styles.text}>
          <H4 text="Systolic" style={null} />
          <H4
            text={systolic}
            style={{ fontWeight: "bold", color: colors.primaryTextColor }}
          />
          <H4 text="mmHg" style={null} />
        </View>
        <View style={styles.text}>
          <H4 text="Dystolic" style={null} />
          <H4
            text={dystolic}
            style={{ fontWeight: "bold", color: colors.primaryTextColor }}
          />
          <H4 text="mmHg" style={null} />
        </View>
      </View>
    </CardWrapper>
  );
};

const styles = ScaledSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "15@ms",
    marginBottom: "15@ms"
  },
  text: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});
