import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { RiskLevel, getRiskLevelColor } from "models/RiskLevel";
import { View, TouchableOpacity } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { H5, H6 } from "components/Text";
import { LocalTodo } from "rc_agents/model";
import { RowButton } from "components/Buttons/TextButton";

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
          <RowButton
            onPress={onButtonPress}
            title={todoDetails.completed === false ? "Todo.Done" : "Todo.Undo"}
            backgroundColor={
              todoDetails.completed === false
                ? colors.acceptButtonColor
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
