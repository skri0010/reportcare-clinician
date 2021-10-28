import React, { FC } from "react";
import {
  View,
  ScrollView,
  StyleProp,
  ViewProps,
  TextProps
} from "react-native";
import { RootState, select } from "util/useRedux";
import { getRiskLevelColor, RiskLevel } from "models/RiskLevel";
import { H3, H4, H5 } from "components/Text";
import { ms } from "react-native-size-matters";
import i18n from "util/language/i18n";
import { AlertInfo } from "rc_agents/model";
import moment from "moment";
import {
  ModalWrapper,
  ModalWrapperProps
} from "components/Wrappers/ModalWrapper";
import { ModalButton } from "components/Buttons/ModalButton";

interface AlertHistoryModalProps extends ModalWrapperProps {
  patientName?: string;
  alertHistory?: AlertInfo;
  setModalAlertVisible: (state: boolean) => void;
}

interface AlertDetailsRowProps {
  detailTitle: string;
  detailContent: number | string | undefined | null;
}

const AlertDetailsRow: FC<AlertDetailsRowProps> = ({
  detailTitle,
  detailContent
}) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <H5 text={detailTitle} style={{ fontWeight: "bold" }} />
      <H5 text={`${detailContent}`} style={null} />
    </View>
  );
};

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

const getLocalDateTime = (datetime: string) => {
  const localDateTime = moment.utc(datetime).local();
  return localDateTime.format("HH:mm DD-MM-YYYY");
};

export const AlertHistoryModal: FC<AlertHistoryModalProps> = ({
  visible,
  onRequestClose,
  patientName,
  alertHistory,
  setModalAlertVisible
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <ModalWrapper visible={visible} onRequestClose={onRequestClose}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <H3
          text={`${patientName}`}
          style={{ fontWeight: "bold", paddingTop: ms(20) }}
        />
        {/* Alert summary */}
        <View style={{ paddingTop: ms(20) }}>
          <H4
            text={i18n.t("Patient_History.AlertSummaryCard.AlertSummary")}
            style={{ fontWeight: "bold" }}
          />
          {/* Alert summary description */}
          <H5 text={`${alertHistory?.summary}`} style={null} />
        </View>
        {/* Alert details */}
        <View style={{ paddingTop: ms(10) }}>
          <H4
            text={i18n.t("Patient_History.AlertSummaryCard.AlertDetails")}
            style={{ fontWeight: "bold" }}
          />
          {/* Severity */}
          <View style={{ flexDirection: "row" }}>
            <H5
              text={i18n.t("Patient_History.AlertSummaryCard.Severity")}
              style={{ fontWeight: "bold" }}
            />
            <H5
              text={
                alertHistory?.riskLevel
                  ? `${getRiskName(alertHistory.riskLevel)}`
                  : getRiskName(RiskLevel.UNASSIGNED)
              }
              style={{
                color: alertHistory?.riskLevel
                  ? getRiskLevelColor(
                      colors.riskLevelSelectedBackgroundColors,
                      alertHistory.riskLevel
                    )
                  : getRiskLevelColor(
                      colors.riskLevelSelectedBackgroundColors,
                      RiskLevel.UNASSIGNED
                    )
              }}
            />
          </View>
          {/* HRV */}
          <AlertDetailsRow
            detailTitle={i18n.t("Patient_History.AlertSummaryCard.HRV")}
            detailContent={89}
          />
          {/* BP */}
          <AlertDetailsRow
            detailTitle={i18n.t("Patient_History.AlertSummaryCard.BP")}
            detailContent={alertHistory?.vitalsReport?.systolicBloodPressure?.toString()}
          />
          {/* Symptoms */}
          <AlertDetailsRow
            detailTitle={i18n.t("Patient_History.AlertSummaryCard.Symptom")}
            detailContent={alertHistory?.symptomReport?.symptomName}
          />
          {/* Signs */}
          <AlertDetailsRow
            detailTitle={i18n.t("Patient_History.AlertSummaryCard.Signs")}
            detailContent="Edema (Scale 3)"
          />
        </View>
        {/* Created datetime */}
        <View style={{ flexDirection: "row", paddingVertical: ms(20) }}>
          <H5
            text={i18n.t("Patient_History.AlertSummaryCard.CreatedOn")}
            style={{ fontWeight: "bold", color: colors.secondaryTextColor }}
          />
          <H5
            text={
              alertHistory ? `${getLocalDateTime(alertHistory.dateTime)}` : "-"
            }
            style={{ color: colors.secondaryTextColor }}
          />
        </View>
      </ScrollView>
      <View style={{ alignItems: "center" }}>
        {/* Close button */}
        <ModalButton
          title={i18n.t("Patient_History.CloseButton")}
          onPress={() => {
            setModalAlertVisible(false);
          }}
          style={
            {
              backgroundColor: colors.primaryContrastTextColor,
              borderColor: colors.primaryTextColor,
              borderWidth: ms(1),
              borderRadius: ms(5)
            } as StyleProp<ViewProps>
          }
          textStyle={
            { color: colors.consistentTextColor } as StyleProp<TextProps>
          }
        />
      </View>
    </ModalWrapper>
  );
};
