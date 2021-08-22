import { PatientInfo } from "aws/API";
import { LocalTodo, PatientDetails } from "rc_agents/model";
import { AlertHistory, MedicalRecords } from "mock/mockPatientDetails";
import { TodoScreenNavigation } from "web/screens/MainScreenProps";
import { NavigatorScreenParams } from "@react-navigation/native";

export enum ScreenName {
  MAIN = "Main",
  HOME = "Home",
  PATIENTS = "Patients",
  CLINICIANS = "Clinicians",
  CHAT = "Chat",
  TODO = "Todo",
  MARIA = "MARIA",
  SETTINGS = "Settings"
}

export enum PatientDetailsTabName {
  OVERVIEW = "Overview",
  PARAMETERS = "Parameters",
  ICDCRT = "ICD/CRT",
  HISTORY = "History",
  INFO = "Info"
}

export enum TodoListName {
  CURRENT = "Current",
  COMPLETED = "Completed"
}

export enum TodoDetailsName {
  VIEW_TODO = "ViewTodo",
  EDIT_TODO = "EditTodo"
}

/**
 * JH-TODO-NAV: Update
 * Reference: https://reactnavigation.org/docs/typescript/
 *
 * NavigatorScreenParams allows us to use navigator.navigate(
 *  ScreenName, {
 *    screen: [Nested stack screen],
 *    params: { [Parameters of that nested stack screen] }
 *  }
 * )
 */

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
export type TodoListParamList = {
  [TodoListName.CURRENT]: {
    todos: LocalTodo[];
  };
  [TodoListName.COMPLETED]: { todos: LocalTodo[] };
};

// Todo details parameters
export type TodoDetailsParamList = {
  [TodoDetailsName.VIEW_TODO]: {
    todo: LocalTodo;
    parentNavigation?: TodoScreenNavigation;
  };
  [TodoDetailsName.EDIT_TODO]: { todo: LocalTodo };
};

// Type checking for main screens (navigation and route)
export type { MainScreenProps } from "web/screens/MainScreenProps";

// Type checking for patient screen tabs (navigation and route)
export * as PatientDetailsTabProps from "web/screens/PatientDetailsTabProps";

// Type checking for todo screen tabs and details (navigation and route)
export type {
  TodoScreenProps as WithTodosProps,
  TodoDetailsScreenProps as WithTodoDetailsProps
} from "web/screens/TodoScreenProps";
