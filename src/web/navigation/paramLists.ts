import { LocalTodo } from "rc_agents/model";
import { TodoScreenNavigation } from "web/navigation/types/MainScreenProps";
import {
  ScreenName,
  PatientDetailsTabName,
  TodoListName,
  TodoDetailsName
} from "web/navigation";

// Main screen parameters

export type MainScreenParamList = {
  [ScreenName.HOME]: undefined;
  [ScreenName.PATIENTS]: {
    displayPatientId?: string;
    selectedTab?: PatientDetailsTabName;
  };
  [ScreenName.CLINICIANS]: undefined;
  [ScreenName.CHAT]: undefined;
  [ScreenName.TODO]: LocalTodo | undefined;
  [ScreenName.MARIA]: undefined;
  [ScreenName.SETTINGS]: undefined;
};
// Patient details tab parameters

export type PatientDetailsTabParamList = {
  [PatientDetailsTabName.OVERVIEW]: undefined;
  [PatientDetailsTabName.PARAMETERS]: undefined;
  [PatientDetailsTabName.ICDCRT]: undefined;
  [PatientDetailsTabName.HISTORY]: undefined;
  [PatientDetailsTabName.INFO]: undefined;
};
// Todo list parameters

export type TodoListTabParamList = {
  [TodoListName.CURRENT]: {
    todos: LocalTodo[];
  };
  [TodoListName.COMPLETED]: { todos: LocalTodo[] };
};
// Todo details parameters

export type TodoDetailsStackParamList = {
  [TodoDetailsName.VIEW_TODO]: {
    todo: LocalTodo;
    parentNavigation?: TodoScreenNavigation;
  };
  [TodoDetailsName.EDIT_TODO]: { todo: LocalTodo };
};
