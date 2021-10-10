import React, { FC } from "react";
import { View, TouchableOpacity } from "react-native";
import { RootState, select, useDispatch } from "util/useRedux";
import { H3, H4, H5 } from "components/Text";
import { ScaledSheet, ms } from "react-native-size-matters";
import i18n from "util/language/i18n";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import { AlertInfo } from "rc_agents/model";
import { getRiskLevelColor } from "models/RiskLevel";
import { getLocalDateTime } from "util/utilityFunctions";
import { IconButton, IconType } from "components/Buttons/IconButton";
import {
  setFetchingAlertInfo,
  setRealTimeAlert,
  setShowAlertPopUp
} from "ic-redux/actions/agents/actionCreator";
import { HomeScreenNavigation } from "web/navigation/types/MainScreenProps";
import { ScreenName } from "web/navigation";
import { AgentTrigger } from "rc_agents/trigger";
import {
  ModalWrapper,
  ModalWrapperProps
} from "components/Wrappers/ModalWrapper";

interface AlertPopUpDetailsProps {
  title: string;
  details: string;
  detailsDisplayColor?: string; // Optional color string for high triage value
}

// Details of Alert pop up
const AlertPopUpDetails: FC<AlertPopUpDetailsProps> = ({
  title,
  details,
  detailsDisplayColor
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <View style={{ display: "flex", flexWrap: "wrap" }}>
      <H4 text={title} style={{ fontWeight: "600", marginBottom: ms(5) }} />
      <H5
        text={details}
        style={{
          marginBottom: ms(10),
          color: detailsDisplayColor || colors.primaryTextColor
        }}
      />
    </View>
  );
};

interface AlertPopUpProps extends ModalWrapperProps {
  navigation: HomeScreenNavigation;
  realTimeAlert: AlertInfo;
}

export const AlertPopUp: FC<AlertPopUpProps> = ({
  visible,
  onRequestClose,
  navigation,
  realTimeAlert
}) => {
  const { colors, fonts, fetchingAlertInfo } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts,
    fetchingAlertInfo: state.agents.fetchingAlertInfo
  }));

  const dispatch = useDispatch();

  return (
    <ModalWrapper
      visible={visible}
      onRequestClose={onRequestClose}
      modalStyle={[
        styles.modalContainer,
        {
          backgroundColor: colors.primaryContrastTextColor,
          borderColor: getRiskLevelColor(
            colors.riskLevelSelectedBackgroundColors,
            realTimeAlert.riskLevel
          ),
          borderWidth: ms(2)
        }
      ]}
    >
      {/* Title */}
      <View style={styles.iconContainerStyle}>
        <IconButton
          name="times"
          type={IconType.FONTAWESOME}
          iconStyle={{
            fontSize: fonts.h5Size,
            color: colors.errorColor,
            opacity: 0.8
          }}
          containerStyle={styles.iconStyle}
          onPress={() => {
            dispatch(setRealTimeAlert(undefined)); // Reset realTimeAlert state
            dispatch(setShowAlertPopUp(false)); // Close the pop up
          }}
        />
      </View>

      <View style={styles.contentContainer}>
        <H3
          text={i18n.t("Alerts.RealTimeAlert.NewAlert")}
          style={styles.title}
        />

        <AlertPopUpDetails
          title={i18n.t("Alerts.RealTimeAlert.Patient")}
          details={realTimeAlert.patientName}
        />

        <AlertPopUpDetails
          title={i18n.t("Alerts.RealTimeAlert.Summary")}
          details={realTimeAlert.summary}
        />

        <AlertPopUpDetails
          title={i18n.t("Alerts.RealTimeAlert.TriageValue")}
          details={realTimeAlert.triageValue}
          detailsDisplayColor={colors.errorColor}
        />

        <AlertPopUpDetails
          title={i18n.t("Alerts.RealTimeAlert.DateTime")}
          details={getLocalDateTime(realTimeAlert.dateTime)}
        />

        <View style={styles.buttonContainer}>
          {/* View button */}
          <TouchableOpacity
            style={[
              styles.viewButton,
              {
                backgroundColor: colors.acceptButtonColor,
                borderColor: colors.primaryTextColor
              }
            ]}
            onPress={() => {
              // Set fetchingAlertInfo to true so that RetrieveAlerts won't be triggered when navigating to AlertsScreen
              dispatch(setFetchingAlertInfo(true));
              dispatch(setShowAlertPopUp(false)); // Close the pop up
              navigation.navigate(ScreenName.ALERTS);
              AgentTrigger.triggerRetrieveMonitoringRecords(realTimeAlert); // Trigger retrieval of monitoring records, i.e. detailed alert info
              dispatch(setRealTimeAlert(undefined)); // Reset realTimeAlert state
            }}
          >
            <H4
              text={i18n.t("Alerts.RealTimeAlert.ViewDetails")}
              style={{ color: colors.primaryTextColor }}
            />
          </TouchableOpacity>
        </View>
      </View>
      {fetchingAlertInfo && <LoadingIndicator overlayBackgroundColor />}
    </ModalWrapper>
  );
};

const styles = ScaledSheet.create({
  modalContainer: {
    width: "30%",
    borderRadius: "10@ms",
    flexDirection: "column"
  },
  container: {
    justifyContent: "center"
  },
  contentContainer: {
    paddingHorizontal: "10@ms"
  },
  title: {
    paddingVertical: "15@ms",
    textAlign: "center"
  },
  iconContainerStyle: { flexDirection: "row", alignSelf: "flex-end" },
  iconStyle: {
    backgroundColor: "transparent"
  },
  buttonContainer: {
    alignItems: "center",
    paddingVertical: "10@ms"
  },
  viewButton: {
    textAlign: "center",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    borderRadius: "5@ms",
    paddingVertical: "5@ms",
    paddingHorizontal: "10@ms"
  }
});
