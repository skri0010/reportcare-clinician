import { StackScreenProps } from "@react-navigation/stack";
import { NavigatorScreenParams } from "@react-navigation/native";
import { PatientInfo } from "aws/API";
import { LocalTodo } from "rc_agents/model";
import { AlertHistory, MedicalRecords } from "mock/mockPatientDetails";
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
  HELP = "HELP"
}

export enum PatientsScreenName {
  OVERVIEW = "Overview",
  PARAMETERS = "Parameters",
  ICDCRT = "ICD/CRT",
  HISTORY = "History",
  INFO = "Info"
}

export enum TodoLeftTabName {
  CURRENT = "Current",
  COMPLETED = "Completed"
}

export enum TodoScreenName {
  VIEWTODO = "ViewTodo",
  EDITTODO = "EditTodo"
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

// Todo left side tab param list
export type TodoLeftTabParamList = {
  [TodoLeftTabName.CURRENT]: { todos: LocalTodo[] };
  [TodoLeftTabName.COMPLETED]: { todos: LocalTodo[] };
};

// Todo screen param list
export type TodoScreenParamList = {
  [TodoScreenName.VIEWTODO]: {
    todo: LocalTodo;
    mainNavigation?: TodoNavigationProps;
  };
  [TodoScreenName.EDITTODO]: { todo: LocalTodo };
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

// Type checking for todo screens (navigation and route)
export type {
  withTodoLeftTabProps,
  withTodoScreenProps
} from "web/screens/TodoScreenProps";

// JH-TODO: Navigation FIXME
// export type TodoStackParamList = {
//   ViewTodo: {
//     mainTitleContent: string;
//     patientContent: string;
//     notesContent: string;
//     createdTimeDate: string;
//     modifiedTimeDate: string;
//   };
//   EditTodo: {
//     mainTitleContent: string;
//     patientContent: string;
//     notesContent: string;
//     createdTimeDate: string;
//     modifiedTimeDate: string;
//   };
//   AddTodo: undefined;
// };
