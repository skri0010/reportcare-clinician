import React, { FC } from "react";
import { View, FlatList } from "react-native";
import { TodoRow } from "components/RowComponents/TodoRow";
import { mockCurrentTodoDetails } from "mock/mockTodoDetails";
import { RiskLevel } from "models/RiskLevel";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { ITodoDetails } from "models/TodoDetails";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import { RootState, select } from "util/useRedux";

export interface TodoRowTabProps {
  setTodoSelected: (item: ITodoDetails) => void;
}

export const TodoCurrentTab: FC<TodoRowTabProps> = ({ setTodoSelected }) => {
  // JH-TODO Replace titles with i18n
  // JH-TODO Remove mock data

  // Function for changing status to completed
  // function onDonePress(item: ITodoDetails) {
  //   // api call
  // }
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  function onCardPress(item: ITodoDetails) {
    setTodoSelected(item);
  }

  return (
    <View style={{ flex: 1 }}>
      <SearchBarComponent
        onUserInput={() => {
          null;
        }}
        onSearchClick={() => {
          null;
        }}
        containerStyle={{ backgroundColor: colors.primaryContrastTextColor }}
        placeholder="Search current todo"
      />
      {/* <MainTitle title="Current Todo" /> */}
      <FlatList
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <ItemSeparator />}
        ListHeaderComponent={() => <ItemSeparator />}
        ListFooterComponent={() => <ItemSeparator />}
        data={mockCurrentTodoDetails}
        renderItem={({ item }) => (
          <TodoRow
            todoDetails={item}
            riskLevel={RiskLevel.HIGH}
            onCardPress={() => onCardPress(item)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
