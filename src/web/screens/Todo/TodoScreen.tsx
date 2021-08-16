import React, { FC, useState, createContext, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TodoCurrentTab } from "./TodoCurrentTab";
import { TodoCompletedTab } from "./TodoCompletedTab";
import { getTopTabBarOptions } from "util/getStyles";
import { RootState, select, useDispatch } from "util/useRedux";
import { ScreenName, WithSideTabsProps } from "web/screens";
import { View, Modal } from "react-native";
import { RowSelectionTab } from "../RowSelectionTab";
import { ms, ScaledSheet } from "react-native-size-matters";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { TodoDetailsScreen } from "./TodoDetailsScreen";
import { EditTodoScreen } from "./EditTodoScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { AddTodoScreen } from "./AddTodoScreen";
import { NoSelectionScreen } from "../Shared/NoSelectionScreen";
import i18n from "util/language/i18n";
import { LocalTodo } from "rc_agents/model";
import { LoadingIndicator } from "components/IndicatorComponents/LoadingIndicator";
import { useToast } from "react-native-toast-notifications";
import {
  setProcedureSuccessful,
  setSubmittingTodo
} from "ic-redux/actions/agents/actionCreator";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export const TodoContext = createContext({
  mainTitleContent: "",
  patientContent: "",
  notesContent: "",
  createdTimeDate: "",
  modifiedTimeDate: ""
});

function checkNeedAddButton(tabName: string) {
  let needAddButton = true;
  if (tabName === "Completed") {
    needAddButton = false;
  }
  return needAddButton;
}

export const TodoScreen: FC<WithSideTabsProps[ScreenName.TODO]> = () => {
  const { colors, procedureOngoing, procedureSuccessful, updatedTodo, submittingTodo } = select(
    (state: RootState) => ({
      colors: state.settings.colors,
      // Used to detect completion of updateTodo procedure
      procedureOngoing: state.agents.procedureOngoing,
      procedureSuccessful: state.agents.procedureSuccessful,
      updatedTodo: state.agents.updatedTodo,
      submittingTodo: state.agents.submittingTodo
    })
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [addButton, setAddButton] = useState(true);
  const [todoSelected, setTodoSelected] = useState<LocalTodo>({
    title: "",
    patientName: "",
    notes: "",
    completed: false,
    createdAt: "",
    id: "",
    toSync: false,
    _version: 1
  });
  const [isEmptyTodo, setEmptyTodo] = useState(true);

  const toast = useToast();
  const dispatch = useDispatch();

  function onRowClick(item: LocalTodo) {
    const currentSelected = todoSelected;
    const emptyTodo: LocalTodo = {
      title: "",
      patientName: "",
      notes: "",
      completed: false,
      createdAt: "",
      id: "",
      toSync: false,
      _version: 1
    };
    if (currentSelected !== item && item !== emptyTodo) {
      setEmptyTodo(false);
      setTodoSelected(item);
    } else if (item === emptyTodo) {
      setEmptyTodo(true);
    }
  }

  // Compares dispatched updatedTodo with current Todo displayed in the TodoDetailsScreen
  useEffect(() => {
    // Updates the TodoDetailsScreen with the newly updated Todo
    if (updatedTodo && updatedTodo.id === todoSelected.id) {
      onRowClick(updatedTodo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedTodo]);

  // Detects completion of UpdateTodo procedure and shows the appropriate toast.
  useEffect(() => {
    if (submittingTodo && !procedureOngoing) {
      dispatch(setSubmittingTodo(false));
      if (procedureSuccessful) {
        // Operation successful
        toast.show(i18n.t("Todo.TodoUpdateSuccessful"), { type: "success" });
        dispatch(setProcedureSuccessful(false));
      } else {
        // Operation failed
        toast.show(i18n.t("UnexpectedError"), { type: "danger" });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, procedureOngoing, procedureSuccessful, toast, submittingTodo]);

  const initialTodo = {
    mainTitleContent: todoSelected.title,
    patientContent: todoSelected.patientName,
    notesContent: todoSelected.notes,
    createdTimeDate: todoSelected.createdAt,
    modifiedTimeDate: todoSelected.lastModified
      ? todoSelected.lastModified
      : "Never"
  };

  return (
    // JH-TODO: Replace names with i18n
    <ScreenWrapper fixed>
      <View
        style={styles.container}
        pointerEvents={modalVisible || submittingTodo ? "none" : "auto"}
      >
        <View style={styles.rowSelection}>
          <RowSelectionTab
            title={i18n.t("TabTitle.Todo")}
            addButton={addButton}
            onPress={() => {
              setModalVisible(true);
            }}
            isTodo
          />
          <Tab.Navigator tabBarOptions={getTopTabBarOptions(colors)}>
            <Tab.Screen
              name={i18n.t("Todo.Current")}
              listeners={{
                tabPress: () => {
                  setAddButton(checkNeedAddButton("Todo"));
                }
              }}
            >
              {() => <TodoCurrentTab setTodoSelected={onRowClick} />}
            </Tab.Screen>
            <Tab.Screen
              name={i18n.t("Todo.Completed")}
              listeners={{
                tabPress: () => {
                  setAddButton(checkNeedAddButton("Completed"));
                }
              }}
            >
              {() => <TodoCompletedTab setTodoSelected={onRowClick} />}
            </Tab.Screen>
          </Tab.Navigator>
        </View>
        <View
          style={{
            flex: 2,
            backgroundColor: colors.primaryWebBackgroundColor
          }}
        >
          {!isEmptyTodo ? (
            <NavigationContainer independent>
              <TodoContext.Provider value={initialTodo}>
                <Stack.Navigator>
                  <Stack.Screen
                    name="ViewTodo"
                    component={TodoDetailsScreen}
                    options={() => ({
                      title: i18n.t("Todo.ViewTodo"),
                      headerStyle: {
                        height: ms(45)
                      },
                      headerTitleStyle: {
                        fontWeight: "bold",
                        fontSize: ms(20),
                        paddingLeft: ms(15)
                      }
                    })}
                  />
                  <Stack.Screen
                    name="EditTodo"
                    component={EditTodoScreen}
                    options={{
                      title: i18n.t("Todo.EditTodo"),
                      headerStyle: {
                        height: ms(45)
                      },
                      headerTitleStyle: {
                        fontWeight: "bold",
                        fontSize: ms(20)
                      }
                    }}
                  />
                </Stack.Navigator>
              </TodoContext.Provider>
            </NavigationContainer>
          ) : (
            <NoSelectionScreen
              screenName={ScreenName.TODO}
              subtitle={i18n.t("Todo.NoSelection")}
            />
          )}
        </View>
      </View>

      <View style={styles.modalView}>
        <Modal
          transparent
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: colors.overlayColor }
            ]}
          >
            <AddTodoScreen setModalVisible={setModalVisible} />
          </View>
        </Modal>
      </View>

      {/* Loading Indicator overlays the entire screen when Todo is being updated */}
      {submittingTodo && <LoadingIndicator />}
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  container: { flexDirection: "row", height: "100%" },
  modalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  rowSelection: { flex: 1 },
  modalContainer: {
    justifyContent: "center",
    height: "100%",
    width: "100%"
  }
});
