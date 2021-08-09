import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { RiskLevel, getRiskLevelColor } from "models/RiskLevel";
import { ITodoDetails } from "models/TodoDetails";
import { View, Button, TouchableOpacity } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { H4, H5 } from "components/Text/index";

// Interface that determines what props the search bar accepts
interface TodoRowProps {
  todoDetails: ITodoDetails;
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
            <H4 text={todoDetails.title} style={styles.title} />
            <H5 text={todoDetails.name} style={styles.name} />
            <H5 text={todoDetails.description} style={null} />
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
          <Button
            title={todoDetails.doneStatus === false ? "DONE" : "UNDO"}
            onPress={onButtonPress}
            color={
              todoDetails.doneStatus === false
                ? colors.primaryButtonColor
                : colors.primaryWarningButtonColor
            }
          />
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
    paddingVertical: "3@ms",
    flex: 1
  },
  texts: {
    padding: "10@ms"
  },
  title: {
    fontWeight: "bold",
    paddingBottom: "10@ms"
  },
  name: {
    paddingBottom: "5@ms"
  },
  buttonContainer: {
    paddingTop: "15@ms",
    paddingRight: "20@ms"
  }
});
