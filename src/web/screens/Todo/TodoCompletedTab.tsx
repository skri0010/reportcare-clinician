import React, { FC } from "react";
import { FlatList } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { RiskLevel } from "models/RiskLevel";
import { TodoRow } from "components/RowComponents/TodoRow";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { TodoRowTabProps } from "./TodoCurrentTab";
import { ITodoDetails } from "models/TodoDetails";
import { RootState, select } from "util/useRedux";
import { mockCompletedTodoDetails } from "mock/mockTodoDetails";
import i18n from "util/language/i18n";

export const TodoCompletedTab: FC<TodoRowTabProps> = ({ setTodoSelected }) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  // JY-TODO Function to change the done status from true to false
  // useEffect(() => {
  //   for (let i = 1; i < mockPatientRowDetails.length; i += 1) {
  //     mockPatientRowDetails[i].doneStatus = true;
  //   }
  // });
  // // Function for changing status to completed
  // // function onDonePress(item: ITodoDetails) {
  // //   // api call
  // // }

  // for (let i = 0; i < mockPatientRowDetails.length; i += 1) {
  //   mockPatientRowDetails[i].doneStatus = true;
  // }

  function onCardPress(item: ITodoDetails) {
    setTodoSelected(item);
  }
  // JH-TODO Replace titles with i18n
  return (
    <ScreenWrapper>
      <SearchBarComponent
        onUserInput={() => {
          null;
        }}
        onSearchClick={() => {
          null;
        }}
        containerStyle={{ backgroundColor: colors.primaryContrastTextColor }}
        placeholder={i18n.t("Todo.SearchBarCompletePlaceholder")}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <ItemSeparator />}
        data={mockCompletedTodoDetails}
        renderItem={({ item }) => (
          <TodoRow
            todoDetails={item}
            riskLevel={RiskLevel.LOW}
            onCardPress={() => onCardPress(item)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </ScreenWrapper>
  );
};
