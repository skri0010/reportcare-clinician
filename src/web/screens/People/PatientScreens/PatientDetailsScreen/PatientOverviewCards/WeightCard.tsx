import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { H1, H4, H5 } from "components/Text/index";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import i18n from "util/language/i18n";

interface WeightProps {
  weight: string;
  targetWeight: string;
  minHeight: number;
  flex?: number;
}

export const WeightCard: FC<WeightProps> = ({
  weight,
  targetWeight,
  minHeight,
  flex
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <CardWrapper
      maxHeight={minHeight}
      minWidthRequired={false}
      flex={flex}
      title={i18n.t("Patient_Overview.Weight")}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <View style={styles.text}>
            <H1
              text={weight}
              style={{ fontWeight: "bold", color: colors.primaryTextColor }}
            />
            <H4 text="kg" style={styles.label} />
          </View>
        </View>
        <H5
          text={`${i18n.t("Patient_Overview.TargetWeight")}: ${targetWeight}`}
          style={null}
        />
      </View>
    </CardWrapper>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  textContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "44@ms"
  },
  text: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "15@ms"
  },
  label: {
    opacity: 0.8
  }
});
