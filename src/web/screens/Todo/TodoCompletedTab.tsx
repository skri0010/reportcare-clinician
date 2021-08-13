import React, { FC } from "react";
import { FlatList } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { RiskLevel } from "models/RiskLevel";
import { TodoRow } from "components/RowComponents/TodoRow";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { TodoRowTabProps } from "./TodoCurrentTab";
import { RootState, select } from "util/useRedux";
import { mockCompletedTodo } from "mock/mockTodoDetails";
import i18n from "util/language/i18n";
import { LocalTodo } from "rc_agents/model";

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

  // Set the todo item detail to be shown when the item is pressed
  function onCardPress(item: LocalTodo) {
    setTodoSelected(item);
  }

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
        data={mockCompletedTodo}
        renderItem={({ item }) => (
          <TodoRow
            todoDetails={item}
            riskLevel={RiskLevel.LOW}
            onCardPress={() => onCardPress(item)}
          />
        )}
        // As the id field of LocalTodo is optional, the keyExtractor is detecting possibility where id is undefined,
        // thus throwing some errors
        // keyExtractor={(item) => item.id}
      />
    </ScreenWrapper>
  );
};
