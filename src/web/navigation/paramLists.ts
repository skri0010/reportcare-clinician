import { LocalTodo } from "rc_agents/model";
import {
  ScreenName,
  PatientDetailsTabName,
  TodoListTabName,
  TodoDetailsStackScreenName
} from "web/navigation";
import {
  AlertDetailsStackScreenName,
  AlertListTabName,
  AuthenticationScreenName
} from "./navigatorScreenNames";

// Main screen parameters
export type MainScreenParamList = {
  [ScreenName.HOME]: undefined;
  [ScreenName.PATIENTS]: {
    displayPatientId?: string;
    selectedTab?: PatientDetailsTabName;
  };
  [ScreenName.CLINICIANS]: undefined;
  [ScreenName.ALERTS]: undefined;
  [ScreenName.TODO]: {
    todoToShow?: LocalTodo;
    selectedListTab?: TodoListTabName;
    selectedStackScreen?: TodoDetailsStackScreenName;
  };
  [ScreenName.CHAT]: undefined;
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
  [TodoDetailsStackScreenName.VIEW_TODO]: undefined;
  [TodoDetailsStackScreenName.EDIT_TODO]: undefined;
};

// Authentication Stack Parameters
export type AuthenticationStackParamList = {
  [AuthenticationScreenName.SIGN_IN]: undefined;
  [AuthenticationScreenName.CONFIRM_REGISTRATION]: { username: string };
  [AuthenticationScreenName.FORGET_PASSWORD]: undefined;
  [AuthenticationScreenName.REGISTRATION]: undefined;
};

// Alert list parameters
export type AlertListTabParamList = {
  [AlertListTabName.CURRENT]: undefined;
  [AlertListTabName.COMPLETED]: undefined;
};

// Alert Details parameters
export type AlertDetailsStackParamList = {
  [AlertDetailsStackScreenName.VIEWALERT]: undefined;
};
