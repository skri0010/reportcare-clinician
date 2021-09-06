import React, { FC } from "react";
import { View, TouchableOpacity } from "react-native";
import { H4, H6 } from "components/Text/index";
import { AlertInfo } from "rc_agents/model";
import moment from "moment";
import { RootState, select } from "util/useRedux";
import { getRiskLevelColor } from "models/RiskLevel";
import { ScaledSheet } from "react-native-size-matters";

interface AlertRowProps {
  alertDetails: AlertInfo;
  onCardPress?: () => void;
}

const getLocalDateTime = (datetime: string) => {
  const localDateTime = moment.utc(datetime).local();
  return localDateTime.format("HH:mm DD-MM-YYYY");
};

export const AlertRow: FC<AlertRowProps> = ({ alertDetails, onCardPress }) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <TouchableOpacity
      onPress={onCardPress}
      style={{
        opacity: 1,
        backgroundColor: getRiskLevelColor(
          colors.riskLevelBackgroundColors,
          alertDetails.riskLevel
        )
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={styles.container}>
          <H4 text={alertDetails.patientName} style={styles.mainItem} />
          <H6 text={alertDetails.summary} style={styles.subItem} />
          <H6
            text={`Time: ${getLocalDateTime(alertDetails.dateTime)}`}
            style={styles.subItem}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  container: {
    padding: "5@ms"
  },
  mainItem: { fontWeight: "600", paddingBottom: "5@ms" },
  subItem: {
    paddingBottom: "1@ms"
  }
});
