import { PatientInfo } from "aws/API";
import { LocalTodo } from "rc_agents/model";
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

export enum PatientsScreenName {
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

// Extract the params from the screen containing the nested navigator
export type MainScreenParamList = {
  [ScreenName.HOME]: undefined;
  // [ScreenName.PATIENTS]: NavigatorScreenParams<PatientsScreenParamList>;
  [ScreenName.PATIENTS]: { patientId: string };
  [ScreenName.CLINICIANS]: undefined;
  [ScreenName.CHAT]: undefined;
  // [ScreenName.TODO]: NavigatorScreenParams<TodoScreenParamList>;
  [ScreenName.TODO]: LocalTodo;
  [ScreenName.MARIA]: undefined;
  [ScreenName.SETTINGS]: undefined;
};

// Patient screens params list
export type PatientsScreenParamList = {
  [PatientsScreenName.OVERVIEW]: { patient: PatientInfo };
  [PatientsScreenName.PARAMETERS]: { patient: PatientInfo };
  [PatientsScreenName.ICDCRT]: { patient: PatientInfo };
  [PatientsScreenName.HISTORY]: {
    patient: PatientInfo;
    alertHistoryFunc: {
      setDisplayHistory: (state: AlertHistory) => void;
      setModalAlertVisible: (state: boolean) => void;
    };
    medicalRecordFunc: {
      setViewMedicalModal: (state: boolean) => void;
      setDisplayMedicalRecord: (state: MedicalRecords) => void;
      setAddMedicalRecord: (state: boolean) => void;
    };
  };
  [PatientsScreenName.INFO]: { patient: PatientInfo };
};

// Todo list
export type TodoListParamList = {
  [TodoListName.CURRENT]: {
    todos: LocalTodo[];
  };
  [TodoListName.COMPLETED]: { todos: LocalTodo[] };
};

// Todo details
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
export type { PatientsScreenProps } from "web/screens/PatientsScreenProps";

// Type checking for todo screen tabs and details (navigation and route)
export type {
  TodoScreenProps as WithTodosProps,
  TodoDetailsScreenProps as WithTodoDetailsProps
} from "web/screens/TodoScreenProps";
