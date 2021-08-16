import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { RiskLevel, getRiskLevelColor } from "models/RiskLevel";
import { View, TouchableOpacity } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { H5, H6 } from "components/Text/index";
import { LocalTodo } from "rc_agents/model";

// Interface that determines what props the search bar accepts
interface TodoRowProps {
  todoDetails: LocalTodo;
  riskLevel: RiskLevel;
  disabled?: boolean;
  reduceOpacity?: boolean;
  onButtonPress?: () => void;
  onCardPress?: () => void;
}

// Search bar component
export const TodoRow: FC<TodoRowProps> = ({
  todoDetails,
  riskLevel,
  disabled = false,
  reduceOpacity = false,
  onButtonPress = () => null,
  onCardPress
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <TouchableOpacity
      onPress={onCardPress}
      disabled={disabled || !onCardPress}
      style={{ opacity: reduceOpacity ? 0.2 : 1 }}
    >
      <View style={styles.mainContainer}>
        {/* Content */}
        <View
          style={[
            styles.contentContainer,
            {
              backgroundColor: getRiskLevelColor(
                colors.riskLevelBackgroundColors,
                riskLevel
              )
            }
          ]}
        >
          <View style={styles.texts}>
            <H5 text={todoDetails.title} style={styles.title} />
            <H6 text={todoDetails.patientName} style={styles.name} />
            <H6 text={todoDetails.notes} style={{ paddingBottom: ms(1) }} />
          </View>
        </View>

        {/* Button */}
        <View
          style={[
            styles.buttonContainer,
            {
              backgroundColor: getRiskLevelColor(
                colors.riskLevelBackgroundColors,
                riskLevel
              )
            }
          ]}
        >
          {
            // If buttons are deemed to not have "curved enough borders", might hvae to consider using touchable opacity
            // https://www.codevscolor.com/react-native-rounded-corner-button
          }
          {/* JH-TODO: Remove hardcoded colors */}
          <TouchableOpacity
            onPress={onButtonPress}
            style={[
              styles.button,
              {
                backgroundColor:
                  todoDetails.completed === false
                    ? colors.primaryButtonColor
                    : colors.primaryWarningButtonColor
              }
            ]}
          >
            <H6
              text={todoDetails.completed === false ? "DONE" : "UNDO"}
              style={[
                styles.buttonText,
                {
                  color: colors.primaryContrastTextColor
                }
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  mainContainer: {
    flexDirection: "row"
  },
  contentContainer: {
    paddingTop: "5@ms",
    paddingLeft: "5@ms",
    flex: 1
  },
  texts: {
    paddingLeft: "7@ms",
    paddingBottom: "5@ms"
  },
  title: {
    fontWeight: "bold",
    paddingBottom: "3@ms"
  },
  name: {
    paddingBottom: "3@ms"
  },
  buttonContainer: {
    paddingRight: "20@ms",
    paddingLeft: "10@ms",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    borderRadius: "5@ms",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: { fontWeight: "bold", padding: "5@ms" }
});
