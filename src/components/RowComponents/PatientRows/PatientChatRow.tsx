import React, { FC } from "react";
import { View, TouchableOpacity } from "react-native";
import { PatientRowBase } from "./PatientRowBase";
import { PersonRowGeneralDetails } from "models/PersonRowDetails";
import { ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { H7 } from "components/Text/index";

export interface PatientChatRowProps {
  generalDetails: PersonRowGeneralDetails;
  message: string;
  unreadMessageCount: number;
  time?: string;
  onRowPress?: () => void;
}

export const PatientChatRow: FC<PatientChatRowProps> = ({
  generalDetails,
  message,
  unreadMessageCount,
  time,
  onRowPress
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const NotificationIcon: FC<{ count: number }> = ({ count }) => {
    return (
      <View
        style={[
          styles.notification,
          { backgroundColor: colors.notificationColor }
        ]}
      >
        <H7
          text={count.toString()}
          style={[
            styles.notificationTextStyle,
            { color: colors.primaryTextColor }
          ]}
        />
        {/* {count.toString()} */}
      </View>
    );
  };

  return (
    <TouchableOpacity onPress={onRowPress}>
      {/* TODO-JH: i18n translation */}
      {/* TODO-JH: Tick for sent */}
      <PatientRowBase
        title={generalDetails.name}
        subtitleOne={{
          label: "Message",
          value: message
        }}
        riskLevel={generalDetails.riskLevel}
      >
        {/* Side container */}
        <View style={styles.sideContainer}>
          {/* Time container */}
          <View style={styles.timeContainer}>
            <H7 text={time || "?"} style={null} />
          </View>
          {/* Notification (with count) container */}
          {unreadMessageCount ? (
            <View style={styles.notificationContainer}>
              <NotificationIcon count={unreadMessageCount} />
            </View>
          ) : null}
        </View>
      </PatientRowBase>
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  sideContainer: {
    paddingRight: "10@ms"
  },
  timeContainer: {
    flex: 1,
    paddingTop: "10@ms"
  },
  timeTextStyle: {
    textAlign: "center"
  },
  notificationContainer: {
    justifyContent: "flex-end",
    flex: 1,
    paddingBottom: "10@ms"
  },
  notification: {
    width: "18@ms",
    height: "18@ms",
    borderRadius: "15@ms",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  notificationTextStyle: {
    textAlign: "center"
  }
});
