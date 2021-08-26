import { StackScreenProps } from "@react-navigation/stack";
import { NavigatorScreenParams } from "@react-navigation/native";
import { PatientInfo } from "aws/API";
import { LocalTodo, AlertInfo } from "rc_agents/model";
import { MedicalRecords } from "mock/mockPatientDetails";
import { TodoNavigationProps } from "web/screens/WithSideTabsProps";

export enum ScreenName {
  MAIN = "Main",
  HOME = "Home",
  PATIENTS = "Patients",
  CLINICIANS = "Clinicians",
  CHAT = "Chat",
  TODO = "Todo",
  MARIA = "MARIA",
  SETTING = "SETTING",
  HELP = "HELP",
  ALERTS = "Alerts"
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
 * Reference: https://reactnavigation.org/docs/typescript/
 *
 * NavigatorScreenParams allows us to use navigator.navigate(
 *  ScreenName, {
 *    screen: [Nested stack screen],
 *    params: { [Parameters of that nested stack screen] }
 *  }
 * )
 */
export type RootStackParamList = {
  [ScreenName.MAIN]: NavigatorScreenParams<SideTabsParamList>;
};

// Extract the params from the screen containing the nested navigator
export type SideTabsParamList = {
  [ScreenName.HOME]: undefined;
  // [ScreenName.PATIENT]: NavigatorScreenParams<PatientsScreenParamList>;
  [ScreenName.PATIENTS]: { patientId: string };
  [ScreenName.CLINICIANS]: undefined;
  [ScreenName.CHAT]: undefined;
  // [ScreenName.TODO]: NavigatorScreenParams<TodoScreenParamList>;
  [ScreenName.TODO]: LocalTodo;
  [ScreenName.MARIA]: undefined;
  [ScreenName.SETTING]: undefined;
  [ScreenName.HELP]: undefined;
  [ScreenName.ALERTS]: undefined;
};

// Patient screens params list
export type PatientsScreenParamList = {
  [PatientsScreenName.OVERVIEW]: { patient: PatientInfo };
  [PatientsScreenName.PARAMETERS]: { patient: PatientInfo };
  [PatientsScreenName.ICDCRT]: { patient: PatientInfo };
  [PatientsScreenName.HISTORY]: {
    patient: PatientInfo;
    alertHistoryFunc: {
      setDisplayHistory: (state: AlertInfo) => void;
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
    parentNavigation?: TodoNavigationProps;
  };
  [TodoDetailsName.EDIT_TODO]: { todo: LocalTodo };
};

// Type checking for main screens (navigation and route)
export type MainScreenProps = StackScreenProps<
  RootStackParamList,
  ScreenName.MAIN
>;

// Type checking for side tabs (navigation and route)
export type { WithSideTabsProps } from "web/screens/WithSideTabsProps";

// Type checking for patient screen tabs (navigation and route)
export type { WithPatientsScreenProps } from "web/screens/WithPatientsScreenProps";

// Type checking for todo screen tabs and details (navigation and route)
export type {
  WithTodosProps,
  WithTodoDetailsProps
} from "web/screens/WithTodoScreenProps";
