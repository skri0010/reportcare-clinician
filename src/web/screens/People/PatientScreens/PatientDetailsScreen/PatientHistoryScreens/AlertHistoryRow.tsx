import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { ScaledSheet } from "react-native-size-matters";
import { H4, H5 } from "components/Text/index";
import { getRiskLevelColor, RiskLevel } from "models/RiskLevel";
import { View } from "react-native";
import { ViewRowButton } from "./ViewRowButton";
import i18n from "util/language/i18n";

interface AlertHistoryRowProps {
  risk: RiskLevel;
  date: string;
  description: string;
  onRowPress: () => void;
}

// get i18n translation depending on the risk level
function getRiskName(risk: RiskLevel) {
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
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  // Truncate descriptions that have length >35 characters and append ellipses at the end
  const getDescription = () => {
    // Word limit
    const limit = 35;
    return description.length > limit
      ? `${description.slice(0, limit)}...`
      : description;
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.textContainer]}>
        {/* Risk level and date */}
        <View style={[styles.contentTitle]}>
          <H5
            text={`${getRiskName(risk)} `}
            style={{
              fontWeight: "bold",
              color: getRiskLevelColor(
                colors.riskLevelSelectedBackgroundColors,
                risk
              )
            }}
          />
          <H5
            text={`${date}:`}
            style={{ fontWeight: "bold", color: colors.primaryTextColor }}
          />
        </View>
        {/* Description */}
        <H4
          text={getDescription()}
          style={{ color: colors.primaryTextColor }}
        />
      </View>
      {/* View button */}
      <View style={[styles.buttonContainer]}>
        <ViewRowButton onRowPress={onRowPress} />
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "5@ms",
    paddingBottom: "10@ms"
  },
  contentTitle: {
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
    flex: 5,
    paddingRight: "5@ms"
  },
  buttonText: {
    textAlign: "center"
  }
});
