import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { ScaledSheet } from "react-native-size-matters";
import { H4 } from "components/Text/index";
import { getRiskLevelColor, RiskLevel } from "models/RiskLevel";
import { TouchableOpacity, View } from "react-native";
import i18n from "util/language/i18n";

interface AlertHistoryRowProps {
  risk: RiskLevel;
  date: string;
  description: string;
  onRowPress: () => void;
}

function findRiskName(risk: RiskLevel) {
  let riskName: string = "Patient_History.Risk.Unassigned";

  if (risk === RiskLevel.HIGH) {
    riskName = "Patient_History.Risk.High";
  } else if (risk === RiskLevel.MEDIUM) {
    riskName = "Patient_History.Risk.Medium";
  } else if (risk === RiskLevel.LOW) {
    riskName = "Patient_History.Risk.Low";
  }
  return i18n.t(riskName);
}

export const AlertHistoryRow: FC<AlertHistoryRowProps> = ({
  risk,
  date,
  description,
  onRowPress
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <View style={[styles.container]}>
      <View style={[styles.textContainer]}>
        {/* Risk level and date */}
        <View style={[styles.contentTitle]}>
          <H4
            text={`${findRiskName(risk)} `}
            style={{
              fontWeight: "bold",
              color: getRiskLevelColor(
                colors.riskLevelSelectedBackgroundColors,
                risk
              )
            }}
          />
          <H4
            text={`${date}:`}
            style={{ fontWeight: "bold", color: colors.primaryTextColor }}
          />
        </View>
        <H4 text={description} style={{ color: colors.primaryTextColor }} />
      </View>
      <View style={[styles.buttonContainer]}>
        <TouchableOpacity style={[styles.button]} onPress={onRowPress}>
          <H4
            text={i18n.t("Patient_History.ViewButton")}
            style={[styles.buttonText, { color: colors.primaryTextColor }]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "5@ms"
  },
  contentTitle: {
    display: "flex",
    flexDirection: "row"
  },
  button: {
    borderRadius: "2@ms",
    borderWidth: "1@ms"
  },
  buttonContainer: {
    flex: 1
  },
  textContainer: {
    flex: 7
  },
  buttonText: {
    textAlign: "center"
  }
});
