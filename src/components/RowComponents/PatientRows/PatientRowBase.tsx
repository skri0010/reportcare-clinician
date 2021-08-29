import React, { FC } from "react";
import { View, TouchableOpacity } from "react-native";
import { PatientImageContainer } from "./PatientImageContainer";
import { ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { RiskLevel } from "models/RiskLevel";
import { H5, H6 } from "components/Text";

interface SubtitleItemProps {
  label?: string;
  value: string;
}

export interface PatientRowBaseProps {
  title: string;
  riskLevel: RiskLevel | null;
  image?: string; // JH-TODO: Replace with image implementation
  subtitleOne?: SubtitleItemProps;
  subtitleTwo?: SubtitleItemProps;
  onImagePress?: () => void;
  bottomButtonLabel?: string;
  onBottomButtonPress?: () => void;
}

export const PatientRowBase: React.FC<PatientRowBaseProps> = ({
  title,
  riskLevel,
  subtitleOne,
  subtitleTwo,
  onImagePress,
  bottomButtonLabel,
  onBottomButtonPress,
  children
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const SubtitleItem: FC<SubtitleItemProps> = ({ label, value }) => {
    return (
      <H6
        text={label ? `${label}: ${value}` : value}
        style={[{ color: colors.secondaryTextColor }]}
      />
    );
  };

  return (
    <View>
      <View
        style={[
          styles.rowStyle,
          { backgroundColor: colors.primaryBackgroundColor }
        ]}
      >
        {/* Image (left container) */}
        {riskLevel ? (
          <PatientImageContainer riskLevel={riskLevel} onPress={onImagePress} />
        ) : null}
        {/* Content (middle container) */}
        <View style={styles.container}>
          {/* Title */}
          <H5
            text={title}
            style={[styles.titleTextStyle, { color: colors.primaryTextColor }]}
          />
          {subtitleOne || subtitleTwo ? (
            <View style={styles.subtitleContainer}>
              {/* Subtitles */}
              {subtitleOne ? (
                <SubtitleItem
                  label={subtitleOne.label}
                  value={subtitleOne.value}
                />
              ) : null}
              {subtitleTwo ? (
                <SubtitleItem
                  label={subtitleTwo.label}
                  value={subtitleTwo.value}
                />
              ) : null}
            </View>
          ) : null}
          {/* Bottom Button */}
          {onBottomButtonPress ? (
            <View style={styles.bottomButtonWrapper}>
              <TouchableOpacity
                onPress={onBottomButtonPress}
                style={[
                  styles.bottomButton,
                  { backgroundColor: colors.acceptButtonColor }
                ]}
              >
                {/* JH-TODO i18n for button label */}
                <H6
                  text={bottomButtonLabel || ""}
                  style={[
                    styles.bottomButtonTextStyle,
                    { color: colors.primaryContrastTextColor }
                  ]}
                />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        {/* Side component (right component). Insert as children components*/}
        {children}
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  rowStyle: {
    flexDirection: "row"
  },
  container: {
    paddingTop: "5@ms",
    paddingLeft: "7@ms",
    flexDirection: "column",
    flex: 1
  },
  titleTextStyle: {
    fontWeight: "600",
    paddingBottom: "7@ms"
  },
  subtitleContainer: {
    paddingBottom: "5@ms"
  },
  bottomButtonWrapper: {
    flexDirection: "row",
    justifyContent: "center"
  },
  bottomButton: {
    borderRadius: "10@ms"
  },
  bottomButtonTextStyle: {
    alignSelf: "center",
    paddingVertical: "3@ms",
    paddingHorizontal: "10@ms"
  }
});
