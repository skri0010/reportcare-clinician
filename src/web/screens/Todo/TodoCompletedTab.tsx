import React, { FC, useEffect } from "react";
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

export const TodoCompletedTab: FC<TodoRowTabProps> = ({ setTodoSelected }) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

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
        placeholder="Search completed todo"
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <ItemSeparator />}
        ListHeaderComponent={() => <ItemSeparator />}
        ListFooterComponent={() => <ItemSeparator />}
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
