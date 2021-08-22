import { LocalTodo } from "rc_agents/model";
import { TodoScreenNavigation } from "web/navigation/types/MainScreenProps";
import {
  ScreenName,
  PatientDetailsTabName,
  TodoListTabName,
  TodoDetailsStackScreenName
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
  [ScreenName.TODO]: {
    todoToShow?: LocalTodo;
    selectedListTab?: TodoListTabName;
    selectedStackScreen?: TodoDetailsStackScreenName;
  };
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
  [TodoListTabName.CURRENT]: undefined;
  [TodoListTabName.COMPLETED]: undefined;
};
// Todo details parameters

export type TodoDetailsStackParamList = {
  [TodoDetailsStackScreenName.VIEW_TODO]: {
    todo: LocalTodo;
    parentNavigation?: TodoScreenNavigation;
  };
  [TodoDetailsStackScreenName.EDIT_TODO]: { todo: LocalTodo };
};
