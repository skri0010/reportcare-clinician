import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { H1, H3, H4 } from "components/Text/index";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import i18n from "util/language/i18n";

interface BloodPressureProps {
  systolic: string;
  dystolic: string;
  minHeight: number;
}

export const BloodPressureCard: FC<BloodPressureProps> = ({
  systolic,
  dystolic,
  minHeight
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <CardWrapper minHeight={minHeight}>
      <H3
        text={i18n.t("Patient_Overview.BloodPressure")}
        style={{
          fontWeight: "bold",
          color: colors.primaryTextColor,
          paddingLeft: ms(5)
        }}
      />
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <View style={styles.text}>
            <H4 text={i18n.t("Patient_Overview.Systolic")} style={null} />
            <H1
              text={systolic}
              style={{ fontWeight: "bold", color: colors.primaryTextColor }}
            />
            <H4 text="mmHg" style={null} />
          </View>
          <View style={styles.text}>
            <H4 text={i18n.t("Patient_Overview.Diastolic")} style={null} />
            <H1
              text={dystolic}
              style={{ fontWeight: "bold", color: colors.primaryTextColor }}
            />
            <H4 text="mmHg" style={null} />
          </View>
        </View>
      </View>
    </CardWrapper>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textContainer: {
    display: "flex",
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "stretch",
    top: "-4@ms"
  },
  text: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});
