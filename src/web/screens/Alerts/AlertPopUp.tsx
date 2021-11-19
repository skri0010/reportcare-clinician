import React, { FC, useEffect, useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { RootState, select, useDispatch } from "util/useRedux";
import { H3, H4, H5 } from "components/Text";
import { ScaledSheet, ms } from "react-native-size-matters";
import i18n from "util/language/i18n";
import { LoadingIndicator } from "components/Indicators2/LoadingIndicator";
import { AlertInfo, Role } from "rc_agents/model";
import { getRiskLevelColor } from "models/RiskLevel";
import { getLocalDateTime } from "util/utilityFunctions";
import { IconButton, IconType } from "components/Buttons/IconButton";
import {
  setFetchingAlertInfo,
  setRealTimeAlert,
  setShowAlertPopUp
} from "ic-redux/actions/agents/alertActionCreator";
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
    <View style={styles.detailsContainer}>
      <H4
        text={title}
        style={[styles.detailsTitle, { color: colors.primaryTextColor }]}
      />
      <H5
        text={details}
        style={[
          styles.detailsContent,
          {
            color: detailsDisplayColor || colors.primaryTextColor
          }
        ]}
      />
    </View>
  );
};

interface AlertPopUpProps extends ModalWrapperProps {
  navigation: HomeScreenNavigation;
  realTimeAlert: AlertInfo;
  setNotified: (state: boolean) => void; // Sets notified state
}

export const AlertPopUp: FC<AlertPopUpProps> = ({
  visible,
  onRequestClose,
  navigation,
  realTimeAlert,
  setNotified
}) => {
  const { colors, fonts, fetchingAlertInfo, clinician } = select(
    (state: RootState) => ({
      colors: state.settings.colors,
      fonts: state.settings.fonts,
      fetchingAlertInfo: state.alerts.fetchingAlertInfo,
      clinician: state.clinicians.clinician
    })
  );

  const dispatch = useDispatch();
  const [allowViewDetails, setAllowViewDetails] = useState(false);

  useEffect(() => {
    // Checks for clinician's role to determine whether clinician is authorized to view alert details
    if (
      clinician &&
      (clinician.role === Role.EP || clinician.role === Role.HF_SPECIALIST)
    ) {
      setAllowViewDetails(true);
    }
  }, [clinician]);

  return (
    <ModalWrapper
      visible={visible}
      onRequestClose={onRequestClose}
      modalStyle={[
        styles.modalContainer,
        {
          borderColor: getRiskLevelColor(
            colors.riskLevelSelectedBackgroundColors,
            realTimeAlert.riskLevel
          ),
          borderWidth: ms(2),
          maxHeight: allowViewDetails ? "65%" : "58%"
        }
      ]}
    >
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Close icon button */}
        <View style={styles.iconContainerStyle}>
          <IconButton
            name="times"
            type={IconType.FONTAWESOME}
            iconStyle={{
              fontSize: fonts.h4Size,
              color: colors.errorColor,
              opacity: 0.8
            }}
            onPress={() => {
              dispatch(setRealTimeAlert(undefined)); // Reset realTimeAlert state
              dispatch(setShowAlertPopUp(false));
              setNotified(false); // Reset notified state
            }}
          />
        </View>

        <View style={styles.contentContainer}>
          {/* Modal title */}
          <H3
            text={i18n.t("Alerts.RealTimeAlert.NewAlert")}
            style={[styles.title, { color: colors.primaryTextColor }]}
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
        </View>
      </ScrollView>

      {allowViewDetails && (
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
              dispatch(setShowAlertPopUp(false));
              navigation.navigate(ScreenName.ALERTS);

              // Trigger retrieval of monitoring records, i.e. high risk detailed alert info
              AgentTrigger.triggerRetrieveMonitoringRecords(realTimeAlert);
              dispatch(setRealTimeAlert(undefined)); // Reset realTimeAlert state
              setNotified(false); // Reset notified state
            }}
          >
            <H4
              text={i18n.t("Alerts.RealTimeAlert.ViewDetails")}
              style={{ color: colors.primaryContrastTextColor }}
            />
          </TouchableOpacity>
        </View>
      )}
      {fetchingAlertInfo && <LoadingIndicator overlayBackgroundColor />}
    </ModalWrapper>
  );
};

const styles = ScaledSheet.create({
  modalContainer: {
    width: "28%",
    borderRadius: "10@ms"
  },
  contentContainer: {
    marginHorizontal: "5@ms"
  },
  title: {
    paddingTop: "5@ms",
    paddingBottom: "10@ms",
    textAlign: "center"
  },
  iconContainerStyle: {
    flexDirection: "row",
    alignSelf: "flex-end"
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: "10@ms"
  },
  viewButton: {
    textAlign: "center",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    borderRadius: "5@ms",
    paddingVertical: "5@ms",
    paddingHorizontal: "10@ms"
  },
  detailsContainer: { display: "flex", flexWrap: "wrap" },
  detailsTitle: { fontWeight: "600", marginBottom: "5@ms" },
  detailsContent: { marginBottom: "12@ms" }
});
