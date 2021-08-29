import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, PatientInfo, Todo } from "aws/API";
// eslint-disable-next-line no-restricted-imports
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
  getPatientConfigurations,
  getPatientDetails,
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

export const setUsername = async (
  username: AsyncStorageType[AsyncStorageKeys.USERNAME]
): Promise<void> => {
  await AsyncStorage.setItem(AsyncStorageKeys.USERNAME, username);
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
 * Stores as PatientDetails
 * Performs local merging (saving only patientInfo)
 */
export const setPatient = async (patient: PatientInfo): Promise<void> => {
  const localPatient = await getPatientDetails(patient.patientID);

  await setPatientDetails({
    patientInfo: patient,
    activityInfos: localPatient?.activityInfos || {},
    symptomReports: localPatient?.symptomReports || {},
    vitalsReports: localPatient?.vitalsReports || {}
  });
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
      patientInfo: patient,
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

export const setPatientConfigurations = async (
  configurations: PatientInfo[]
): Promise<void> => {
  let localData = await getPatientConfigurations();

  configurations.forEach((configuration) => {
    if (localData) {
      // Removes existing patient configuration if any
      const existIndex = localData.findIndex((p) => p.id === configuration.id);
      if (existIndex >= 0) {
        localData.splice(existIndex, 1);
      }
    } else {
      localData = [];
    }
    localData.push(configuration);
  });

  await AsyncStorage.setItem(
    AsyncStorageKeys.PATIENT_CONFIGURATIONS,
    JSON.stringify(localData)
  );
};

/**
 * Insert an alert or replace the existing one.
 * @param alert alert to be inserted
 */
export const setAlert = async (alert: AlertInfo): Promise<void> => {
  let localData = await getAlerts();

  if (localData) {
    // Remove duplicate Alerts
    const existIndex = localData.findIndex((t) => t.id === alert.id);
    if (existIndex >= 0) {
      localData.splice(existIndex, 1);
    }
  } else {
    localData = [];
  }
  // Add alert to front of list
  localData.unshift(alert);
  await setAlerts(localData);
};

/**
 * Merge alert updates during Todo creation
 * @param alert alert of Alert or AlertInfo type
 */
export const mergeAlert = async (alert: Alert | AlertInfo): Promise<void> => {
  if ((alert as Alert).colorCode) {
    // Input is of type Alert
    await setAlert(alert as AlertInfo);
  } else if ((alert as AlertInfo).riskLevel) {
    // Input is of type AlertInfo
    const alertInfo = alert as AlertInfo;
    const currentAlert = await getSingleAlert(
      alertInfo.id,
      alertInfo.riskLevel
    );
    if (currentAlert) {
      if (alertInfo.completed) {
        currentAlert.completed = true;
      } else {
        currentAlert.completed = false;
      }
      await setAlert(currentAlert);
    }
  }
};

/**
 * Insert multiple alerts at a time.
 * @param alerts array of alerts to be inserted.
 */
export const setMultipleAlerts = async (alerts: AlertInfo[]): Promise<void> => {
  let localData = await getAlerts();

  // Calling setAlert multiple times causes race condition
  await Promise.all(
    alerts.map(async (alert) => {
      if (localData) {
        // Remove duplicate Alerts
        const existIndex = localData.findIndex((t) => t.id === alert.id);
        if (existIndex >= 0) {
          localData.splice(existIndex, 1);
        }
      } else {
        localData = [];
      }
      // Add alert to front of list
      localData.unshift(alert);
      return alert;
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

  // Create new local alert info data when currently there isn't any in the local storage
  if (!localData) {
    localData = {};
  }

  // If there is data in local storage, add an entry for the patient that doesn't have an entry yet
  if (!localData[alertInfo.patientID]) {
    localData[alertInfo.patientID] = {};
  }

  localData[alertInfo.patientID][alertInfo.id] = alertInfo;
  await setAlertInfos(localData);
};

/**
 * Merge alert info updates during Todo creation
 * @param alert alert of type Alert or AlertInfo
 */
export const mergeAlertInfo = async (
  alert: Alert | AlertInfo
): Promise<void> => {
  if ((alert as AlertInfo).patientID) {
    // Input is of type AlertInfo
    await setAlertInfo(alert as AlertInfo);
  } else if ((alert as Alert).patientID) {
    // Input is of type Alert
    const currentAlert = alert as Alert;
    const currentAlertInfo = await getSingleAlertInfo(
      currentAlert.id,
      currentAlert.patientID
    );
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
 * Insert a Todo to the beginning of the list or replace an existing one.
 * @param todo Todo to be inserted
 */
export const setTodo = async (todo: LocalTodo | Todo): Promise<void> => {
  let todoToStore: LocalTodo;

  // Input is of type LocalTodo during usual merging
  if ((todo as LocalTodo).toSync !== undefined) {
    todoToStore = todo as LocalTodo;
  }
  // Input is of type Todo when resolving Todo's conflict
  else {
    const currentTodo = todo as Todo;

    // Constructs Todo to be stored
    todoToStore = {
      id: currentTodo.id,
      title: currentTodo.title,
      patientName: currentTodo.patientName,
      notes: currentTodo.notes,
      completed: currentTodo.completed === TodoStatus.COMPLETED,
      createdAt: currentTodo.createdAt,
      lastModified: currentTodo.lastModified,
      _version: currentTodo._version,
      toSync: false
    };

    // If there is Alert associated with the Todo
    if (currentTodo.alertID) {
      todoToStore.alertId = currentTodo.alertID;
    } else if (currentTodo.alert) {
      todoToStore.patientId = currentTodo.alert.patientID;
      todoToStore.riskLevel = mapColorCodeToRiskLevel(
        currentTodo.alert.colorCode
      );
    }
  }

  let localData = await getTodos();

  if (localData) {
    let existIndex = -1;
    // For update Todo operation
    if (todoToStore.id) {
      existIndex = localData.findIndex((t) => t.id === todoToStore.id);
    } else {
      if (todoToStore.alertId) {
        // When attempts to create an existing Todo offline
        existIndex = localData.findIndex(
          (t) => t.alertId === todoToStore.alertId
        );
      } else {
        // When attempts to update an unsynced Todo
        existIndex = localData.findIndex(
          (t) => t.createdAt === todoToStore.createdAt
        );
      }

      // Existing Todo
      if (existIndex >= 0) {
        const currentTodo = localData[existIndex];
        if (currentTodo.id) {
          todoToStore.id = currentTodo.id;
          todoToStore._version = currentTodo._version;
        }
      }
    }

    // Removes existing Todo from the list
    if (existIndex >= 0) {
      // Retrieves alert related information if any
      if (localData[existIndex].alertId) {
        const currentTodo = localData[existIndex];
        todoToStore.alertId = currentTodo.alertId;
        todoToStore.patientId = currentTodo.patientId;
        todoToStore.riskLevel = currentTodo.riskLevel;
      }
      localData.splice(existIndex, 1);
    }
  } else {
    localData = [];
  }

  // Adds current Todo to the front of the list
  localData.unshift(todoToStore);
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
