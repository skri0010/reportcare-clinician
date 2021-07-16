import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { RiskLevel, getRiskLevelColor } from "models/RiskLevel";
import { ITodoDetails } from "models/TodoDetails";
import { Text, View, Button, TouchableHighlight } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

// Interface that determines what props the search bar accepts
interface TodoRowProps {
  todoDetails: ITodoDetails;
  riskLevel: RiskLevel;
  onButtonPress?: () => void;
  onCardPress?: () => void;
}

// Search bar component
export const TodoRow: FC<TodoRowProps> = ({
  todoDetails,
  riskLevel,
  onButtonPress = () => null,
  onCardPress
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <TouchableHighlight onPress={onCardPress}>
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
            <Text style={styles.title}> {todoDetails.title} </Text>
            <Text style={styles.name}> {todoDetails.name} </Text>
            <Text style={styles.description}> {todoDetails.description} </Text>
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
            color={todoDetails.doneStatus === false ? "#37BE7D" : "#D11C1C"}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = ScaledSheet.create({
  mainContainer: {
    flexDirection: "row"
  },
  contentContainer: {
    paddingVertical: "10@ms",
    borderBottomWidth: 1,
    borderBottomColor: "#D2D2D2",
    flex: 1
  },
  texts: {
    padding: "10@ms"
  },
  title: {
    fontWeight: "bold",
    fontSize: "18@ms",
    paddingBottom: "10@ms"
  },
  name: {
    fontSize: "16@ms",
    paddingBottom: "20@ms"
  },
  description: {
    fontSize: "16@ms"
  },
  buttonContainer: {
    paddingTop: "15@ms",
    paddingRight: "20@ms"
  }
});
