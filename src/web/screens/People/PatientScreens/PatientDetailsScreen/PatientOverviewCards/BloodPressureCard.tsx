import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { H1, H3, H4, H5 } from "components/Text/index";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import i18n from "util/language/i18n";

interface BloodPressureProps {
  systolic: string;
  dystolic: string;
  minHeight: number;
  flex?: number;
}

export const BloodPressureCard: FC<BloodPressureProps> = ({
  systolic,
  dystolic,
  minHeight,
  flex
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <CardWrapper
      minHeight={minHeight}
      flex={flex}
      title={i18n.t("Patient_Overview.BloodPressure")}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          {/* Systolic blood pressure */}
          <View style={styles.text}>
            <H5
              text={i18n.t("Patient_Overview.Systolic")}
              style={styles.labels}
            />
            <H1
              text={systolic}
              style={{ fontWeight: "bold", color: colors.primaryTextColor }}
            />
            <H5 text="mmHg" style={styles.labels} />
          </View>
          {/* Diastolic blood pressure */}
          <View style={styles.text}>
            <H5
              text={i18n.t("Patient_Overview.Diastolic")}
              style={styles.labels}
            />
            <H1
              text={dystolic}
              style={{ fontWeight: "bold", color: colors.primaryTextColor }}
            />
            <H5 text="mmHg" style={styles.labels} />
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
    alignItems: "stretch"
  },
  text: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  labels: {
    opacity: 0.8
  }
});
