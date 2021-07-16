import React, { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { PatientImageContainer } from "./PatientImageContainer";
import { ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { RiskLevel } from "models/RiskLevel";

interface SubtitleItemProps {
  label?: string;
  value: string;
}

export interface PatientRowBaseProps {
  title: string;
  riskLevel: RiskLevel;
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
      <Text
        numberOfLines={1}
        style={[styles.subtitleTextStyle, { color: colors.secondaryTextColor }]}
      >
        {label ? `${label}: ${value}` : value}
      </Text>
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
        <PatientImageContainer riskLevel={riskLevel} onPress={onImagePress} />
        {/* Content (middle container) */}
        <View style={styles.container}>
          {/* Title */}
          {/* TODO-JH: Use custom text component */}
          <Text
            style={[styles.titleTextStyle, { color: colors.primaryTextColor }]}
          >
            {title}
          </Text>
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
          {/* Bottom Button */}
          {onBottomButtonPress ? (
            <View style={styles.bottomButtonWrapper}>
              <TouchableOpacity
                onPress={onBottomButtonPress}
                style={[
                  styles.bottomButton,
                  { backgroundColor: colors.primaryButtonColor }
                ]}
              >
                {/* JH-TODO i18n for button label */}
                <Text
                  style={[
                    styles.bottomButtonTextStyle,
                    { color: colors.primaryContrastTextColor }
                  ]}
                >
                  {bottomButtonLabel}
                </Text>
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
    paddingLeft: "15@ms",
    flexDirection: "column",
    flex: 1
  },
  titleTextStyle: {
    fontWeight: "bold",
    fontSize: "20@ms",
    paddingBottom: "10@ms"
  },
  subtitleTextStyle: {
    fontSize: "12@ms"
  },
  subtitleContainer: {
    paddingBottom: "10@ms"
  },
  bottomButtonWrapper: {
    flexDirection: "row",
    justifyContent: "center"
  },
  bottomButton: {
    borderRadius: "10@ms"
  },
  bottomButtonTextStyle: {
    fontSize: "12@ms",
    alignSelf: "center",
    paddingVertical: "3@ms",
    paddingHorizontal: "10@ms"
  }
});
