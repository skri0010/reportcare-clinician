import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, PatientInfo, Todo } from "aws/API";
import { RiskLevel } from "models/RiskLevel";
import { mapColorCodeToRiskLevel } from "rc_agents/agents/data-assistant/action-frames/triage-alert-hf-clinic/RetrievePendingAlertCount";
import {
  AlertInfo,
  AlertStatus,
  LocalTodo,
  PatientDetails,
  TodoStatus
} from "rc_agents/model";
import { AsyncStorageKeys, AsyncStorageType } from ".";
import {
  getAlertInfos,
  getAlerts,
  getAlertsSync,
  getAllPatientDetails,
  getSingleAlert,
  getSingleAlertInfo,
  getTodos
} from "./getItem";

export const setSignUpDetails = async (
  signUpDetails: AsyncStorageType[AsyncStorageKeys.SIGN_UP_DETAILS]
): Promise<void> => {
  await AsyncStorage.setItem(
    AsyncStorageKeys.SIGN_UP_DETAILS,
    JSON.stringify(signUpDetails)
  );
};

export const setClinicianID = async (
  clinicianID: AsyncStorageType[AsyncStorageKeys.CLINICIAN_ID]
): Promise<void> => {
  await AsyncStorage.setItem(AsyncStorageKeys.CLINICIAN_ID, clinicianID);
};

export const setClinician = async (
  clinician: AsyncStorageType[AsyncStorageKeys.CLINICIAN]
): Promise<void> => {
  await AsyncStorage.setItem(
    AsyncStorageKeys.CLINICIAN,
    JSON.stringify(clinician)
  );
};

export const setPendingPatientAssignments = async (
  pendingPatientAssignments: AsyncStorageType[AsyncStorageKeys.PENDING_PATIENT_ASSIGNMENTS]
): Promise<void> => {
  await AsyncStorage.setItem(
    AsyncStorageKeys.PENDING_PATIENT_ASSIGNMENTS,
    JSON.stringify(pendingPatientAssignments)
  );
};

export const setPatientAssignmentResolutions = async (
  resolutions: AsyncStorageType[AsyncStorageKeys.PATIENT_ASSIGNMENTS_RESOLUTIONS]
): Promise<void> => {
  await AsyncStorage.setItem(
    AsyncStorageKeys.PATIENT_ASSIGNMENTS_RESOLUTIONS,
    JSON.stringify(resolutions)
  );
};

/**
 * Stores as AllPatientDetails
 * Performs local merging (saving only patientInfo)
 */
export const setPatients = async (
  patients: (PatientInfo | null)[]
): Promise<void> => {
  let localPatients = await getAllPatientDetails();
  // Initialise new local patients for the first time
  if (!localPatients) {
    localPatients = {};
  }

  patients.forEach((patient: PatientInfo | null) => {
    if (patient && patient.patientID && localPatients) {
      // Patient exists locally: Merge
      localPatients[patient.patientID] = {
        patientInfo: patient,
        activityInfos: localPatients[patient.patientID]?.activityInfos || {},
        symptomReports: localPatients[patient.patientID]?.symptomReports || {},
        vitalsReports: localPatients[patient.patientID]?.vitalsReports || {}
      };
    }
  });
  await setAllPatientDetails(localPatients);
};

/**
 * Stores as AllPatientDetails
 * Performs local merging (saving all but PatientInfo)
 */
export const setPatientDetails = async (
  patientDetails: PatientDetails
): Promise<void> => {
  let localPatients = await getAllPatientDetails();
  // Initialise new local patients for the first time
  if (!localPatients) {
    localPatients = {};
  }

  const patient = patientDetails.patientInfo;
  if (patient && patient.patientID && localPatients) {
    // Patient exists locally: Merge
    localPatients[patient.patientID] = {
      patientInfo: localPatients[patient.patientID]?.patientInfo || patient,
      activityInfos: patientDetails.activityInfos,
      symptomReports: patientDetails.symptomReports,
      vitalsReports: patientDetails.vitalsReports
    };
  }
  await AsyncStorage.setItem(
    AsyncStorageKeys.ALL_PATIENT_DETAILS,
    JSON.stringify(localPatients)
  );
};

export const setAllPatientDetails = async (
  patientsDetails: AsyncStorageType[AsyncStorageKeys.ALL_PATIENT_DETAILS]
): Promise<void> => {
  await AsyncStorage.setItem(
    AsyncStorageKeys.ALL_PATIENT_DETAILS,
    JSON.stringify(patientsDetails)
  );
};

/**
 * Insert an alert or replace the existing one.
 * @param alert alert to be inserted
 */
export const setAlert = async (alert: Alert): Promise<void> => {
  let localData = await getAlerts();
  if (!localData) {
    localData = {
      [RiskLevel.HIGH]: {},
      [RiskLevel.MEDIUM]: {},
      [RiskLevel.LOW]: {},
      [RiskLevel.UNASSIGNED]: {}
    };
  }
  const riskLevel = mapColorCodeToRiskLevel(alert.colorCode);
  localData[riskLevel][alert.id] = alert;
  await setAlerts(localData);
};

/**
 * Merge alert updates during Todo creation
 * @param alert alert of Alert or AlertInfo type
 */
export const mergeAlert = async (alert: Alert | AlertInfo): Promise<void> => {
  if ((alert as Alert).colorCode) {
    // Input is of type Alert
    await setAlert(alert as Alert);
  } else if ((alert as AlertInfo).riskLevel) {
    // Input is of type AlertInfo
    const alertInfo = alert as AlertInfo;
    const currentAlert = await getSingleAlert(
      alertInfo.id,
      alertInfo.riskLevel
    );
    if (currentAlert) {
      if (alertInfo.completed) {
        currentAlert.completed = AlertStatus.COMPLETED;
        currentAlert.pending = null;
      } else {
        currentAlert.completed = null;
        currentAlert.pending = AlertStatus.PENDING;
      }
      await setAlert(currentAlert);
    }
  }
};

/**
 * Insert multiple alerts at a time.
 * @param alerts array of alerts to be inserted.
 */
export const setMultipleAlerts = async (alerts: Alert[]): Promise<void> => {
  let localData = await getAlerts();

  // Calling setAlert multiple times causes race condition
  await Promise.all(
    alerts.map(async (alert) => {
      if (!localData) {
        localData = {
          [RiskLevel.HIGH]: {},
          [RiskLevel.MEDIUM]: {},
          [RiskLevel.LOW]: {},
          [RiskLevel.UNASSIGNED]: {}
        };
      }
      const riskLevel = mapColorCodeToRiskLevel(alert.colorCode);
      localData[riskLevel][alert.id] = alert;
    })
  );

  if (localData) {
    await setAlerts(localData);
  }
};

/**
 * Base function for storing all Alerts.
 * @param alerts alert object with riskLevel as outer key and alertId as inner key
 */
export const setAlerts = async (
  alerts: AsyncStorageType[AsyncStorageKeys.ALERTS]
): Promise<void> => {
  await AsyncStorage.setItem(AsyncStorageKeys.ALERTS, JSON.stringify(alerts));
};

/**
 * Insert an AlertInfo or replace an existing one.
 * @param alertInfo AlertInfo to be inserted
 */
export const setAlertInfo = async (alertInfo: AlertInfo): Promise<void> => {
  let localData = await getAlertInfos();
  if (!localData) {
    localData = {};
  } else if (!localData[alertInfo.patientId]) {
    localData[alertInfo.patientId] = {};
  }
  localData[alertInfo.patientId] = {};
  localData[alertInfo.patientId][alertInfo.id] = alertInfo;

  await setAlertInfos(localData);
};

/**
 * Merge alert info updates during Todo creation
 * @param alert alert of type Alert or AlertInfo
 */
export const mergeAlertInfo = async (
  alert: Alert | AlertInfo
): Promise<void> => {
  if ((alert as AlertInfo).patientId) {
    // Input is of type AlertInfo
    await setAlertInfo(alert as AlertInfo);
  } else if ((alert as Alert).patientID) {
    // Input is of type Alert
    const currentAlert = alert as Alert;
    const currentAlertInfo = await getSingleAlertInfo(currentAlert);
    if (currentAlertInfo) {
      currentAlertInfo.completed =
        currentAlert.completed === AlertStatus.COMPLETED;
      await setAlertInfo(currentAlertInfo);
    }
  }
};

/**
 * Base function for storing all AlertInfos
 * @param alertInfos alertInfo object
 */
export const setAlertInfos = async (
  alertInfos: AsyncStorageType[AsyncStorageKeys.ALERT_INFOS]
): Promise<void> => {
  await AsyncStorage.setItem(
    AsyncStorageKeys.ALERT_INFOS,
    JSON.stringify(alertInfos)
  );
};

/**
 * Insert an AlertInfo with updates to be synced or replace an existing one
 * @param alertInfo AlertInfo to be inserted
 */
export const setAlertSync = async (alertInfo: AlertInfo): Promise<void> => {
  let localAlertsSync = await getAlertsSync();
  if (!localAlertsSync) {
    localAlertsSync = {};
  }
  localAlertsSync[alertInfo.id] = alertInfo;
  await setAlertsSync(localAlertsSync);
};

/**
 * Base function for storing all AlertInfo to be synced
 * @param alertsSync AlertInfo object to sync
 */
export const setAlertsSync = async (
  alertsSync: AsyncStorageType[AsyncStorageKeys.ALERTS_SYNC]
): Promise<void> => {
  await AsyncStorage.setItem(
    AsyncStorageKeys.ALERTS_SYNC,
    JSON.stringify(alertsSync)
  );
};

/**
 * Merge Todo during Todo creation
 * @param todo todo to be merged
 */
export const mergeTodo = async (todo: LocalTodo): Promise<void> => {
  let localTodos = await getTodos();
  if (localTodos) {
    // For update Todo operation
    if (todo.id) {
      const existIndex = localTodos.findIndex((t) => t.id === todo.id);
      // Todo exists
      if (existIndex >= 0) {
        localTodos.splice(existIndex, 1);
      }
    } else {
      let existIndex: number;
      if (todo.alertId) {
        // When attempts to create an existing Todo offline
        existIndex = localTodos.findIndex((t) => t.alertId === todo.alertId);
      } else {
        // When attempts to update an unsynced Todo
        existIndex = localTodos.findIndex(
          (t) => t.createdAt === todo.createdAt
        );
      }

      // Existing Todo
      if (existIndex >= 0) {
        const currentTodo = localTodos[existIndex];
        if (currentTodo.id) {
          todo.id = currentTodo.id;
          todo._version = currentTodo._version;
        }
        todo.lastModified = todo.createdAt;
        todo.createdAt = currentTodo.createdAt;
        localTodos.splice(existIndex, 1);
      }
    }
  } else {
    localTodos = [];
  }
  localTodos.unshift(todo);
  await setTodos(localTodos);
};

/**
 * Merge Todo conflict by replacing information in LocalTodo with those from input Todo
 * @param todo latest Todo
 */
export const mergeTodoConflict = async (todo: Todo): Promise<void> => {
  // Constructs Todo to be stored
  const todoToStore: LocalTodo = {
    id: todo.id,
    title: todo.title,
    patientName: todo.patientName,
    notes: todo.notes,
    completed: todo.completed === TodoStatus.COMPLETED,
    createdAt: todo.createdAt,
    lastModified: todo.lastModified,
    _version: todo._version,
    toSync: false
  };

  // If there is Alert associated with the Todo
  if (todo.alertID) {
    todoToStore.alertId = todo.alertID;
  } else if (todo.alert) {
    todoToStore.patientId = todo.alert.patientID;
  }

  let localTodos = await getTodos();

  if (localTodos) {
    // Replaces local Todo with current one if exists, otherwise add into the list
    const existIndex = localTodos.findIndex((t) => t.id === todo.id);
    if (existIndex >= 0) {
      localTodos.splice(existIndex, 1);
      localTodos.unshift(todoToStore);
    } else {
      localTodos.unshift(todoToStore);
    }
  } else {
    localTodos = [todoToStore];
  }

  if (localTodos) {
    await setTodos(localTodos);
  }
};

/**
 * Insert a Todo to the beginning of the list or replace an existing one.
 * @param todo Todo to be inserted
 */
export const setTodo = async (todo: LocalTodo): Promise<void> => {
  let localData = await getTodos();

  if (localData) {
    // Removes existing Todo if any
    const existIndex = localData.findIndex((t) => t.id === todo.id);
    if (existIndex >= 0) {
      localData.splice(existIndex, 1);
    }
  } else {
    localData = [];
  }
  // Adds current Todo to the front of the list
  localData.unshift(todo);
  await setTodos(localData);
};

/**
 * Inserts multiple Todos at a time.
 * @param todos array of Todos to be inserted
 */
export const setMultipleTodos = async (todos: LocalTodo[]): Promise<void> => {
  let localData = await getTodos();

  // Calling setTodo multiple times causes race condition
  await Promise.all(
    todos.map(async (todo) => {
      if (localData) {
        // Removes existing Todo if any
        const existIndex = localData.findIndex((t) => t.id === todo.id);
        if (existIndex >= 0) {
          localData.splice(existIndex, 1);
        }
      } else {
        localData = [];
      }
      // Adds current Todo to the front of the list
      localData.unshift(todo);
      return todo;
    })
  );

  if (localData) {
    await setTodos(localData);
  }
};

/**
 * Base function for storing all Todos
 * @param todos Todos object
 */
export const setTodos = async (
  todos: AsyncStorageType[AsyncStorageKeys.TODOS]
): Promise<void> => {
  await AsyncStorage.setItem(AsyncStorageKeys.TODOS, JSON.stringify(todos));
};
