import AsyncStorage from "@react-native-async-storage/async-storage";
import { ClinicianRecord, PatientAssignment, PatientInfo, Todo } from "aws/API";
// eslint-disable-next-line no-restricted-imports
import {
  LocalTodo,
  mapColorCodeToRiskLevel,
  PatientDetails,
  TodoStatus,
  MedInput
} from "rc_agents/model";
import { AsyncStorageKeys, AsyncStorageType } from ".";
import {
  getAllPatientDetails,
  getPatientAssignmentSubscriptions,
  getPatientBaselines,
  getPatientDetails,
  getPatientMedicationConfigurations,
  getPendingPatientAssignments,
  getTodos
} from "./getItem";

export * from "rc_agents/storage/set/alerts";

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

export const setClinician = async (
  clinician: AsyncStorageType[AsyncStorageKeys.CLINICIAN]
): Promise<void> => {
  await AsyncStorage.setItem(
    AsyncStorageKeys.CLINICIAN,
    JSON.stringify(clinician)
  );
};

export const setClinicianContacts = async (
  clinicianContacts: AsyncStorageType[AsyncStorageKeys.CLINICIAN_CONTACTS]
): Promise<void> => {
  await AsyncStorage.setItem(
    AsyncStorageKeys.CLINICIAN_CONTACTS,
    JSON.stringify(clinicianContacts)
  );
};

/**
 * Inserts a pending patient assignment
 * @param pendingPatientAssignment pending patient assignment to be inserted
 */
export const setPendingPatientAssignment = async (
  pendingPatientAssignment: PatientAssignment
): Promise<void> => {
  let localData = await getPendingPatientAssignments();
  if (!localData) {
    localData = [];
  }
  localData.push(pendingPatientAssignment);
  await setPendingPatientAssignments(localData);
};

export const setPendingPatientAssignments = async (
  pendingPatientAssignments: AsyncStorageType[AsyncStorageKeys.PENDING_PATIENT_ASSIGNMENTS]
): Promise<void> => {
  await AsyncStorage.setItem(
    AsyncStorageKeys.PENDING_PATIENT_ASSIGNMENTS,
    JSON.stringify(pendingPatientAssignments)
  );
};

/**
 * Inserts patient assignments into the existing list
 * @param pendingPatientAssignments array of patient assignments to be inserted
 */
export const insertPendingPatientAssignments = async (
  pendingPatientAssignments: AsyncStorageType[AsyncStorageKeys.PENDING_PATIENT_ASSIGNMENTS]
): Promise<void> => {
  let localData = await getPendingPatientAssignments();
  if (!localData) {
    localData = [];
  }
  localData = localData.concat(pendingPatientAssignments);
  await setPendingPatientAssignments(localData);
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
      // Merge local patients
      const localPatient = localPatients[patient.patientID];
      localPatients[patient.patientID] = {
        patientInfo: patient,
        symptomReports: localPatient?.symptomReports || {},
        vitalsReports: localPatient?.vitalsReports || {},
        physicals: localPatient?.physicals || {},
        medicationInfos: localPatient?.medicationInfos || [],
        medicalRecords: localPatient?.medicalRecords || [],
        icdCrtRecords: localPatient?.icdCrtRecords || []
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
    symptomReports: localPatient?.symptomReports || {},
    vitalsReports: localPatient?.vitalsReports || {},
    physicals: localPatient?.physicals || {},
    medicationInfos: localPatient?.medicationInfos || [],
    medicalRecords: localPatient?.medicalRecords || [],
    icdCrtRecords: localPatient?.icdCrtRecords || []
  });
};

/**
 * Stores the medication infos of the patient (as PatientDetails)
 * @param medicationInfo an array of medication info
 * @param patientID patient ID
 */
export const setPatientMedInfo = async (
  medicationInfo: MedInput[],
  patientID: string
): Promise<void> => {
  const localPatient = await getPatientDetails(patientID);

  if (localPatient?.patientInfo) {
    medicationInfo.forEach((t) => (t.id = patientID + t.name));
    await setPatientDetails({
      patientInfo: localPatient?.patientInfo,
      symptomReports: localPatient?.symptomReports || {},
      vitalsReports: localPatient?.vitalsReports || {},
      physicals: localPatient?.physicals || {},
      medicationInfos: medicationInfo,
      medicalRecords: localPatient?.medicalRecords || [],
      icdCrtRecords: localPatient?.icdCrtRecords || []
    });
  }
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
      symptomReports: patientDetails.symptomReports,
      vitalsReports: patientDetails.vitalsReports,
      physicals: patientDetails.physicals,
      medicalRecords: patientDetails.medicalRecords,
      icdCrtRecords: patientDetails.icdCrtRecords,
      medicationInfos: patientDetails.medicationInfos
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
 * Stores a patient's medical record in patient details.
 */
export const setMedicalRecord = async (
  medicalRecord: ClinicianRecord
): Promise<void> => {
  const localPatient = await getPatientDetails(medicalRecord.patientID);
  if (localPatient) {
    localPatient.medicalRecords.unshift(medicalRecord);
    await setPatientDetails(localPatient);
  }
};

/**
 * Stores a patient's ICD/CRT record in patient details.
 */
export const setIcdCrtRecord = async (
  icdCrtRecord: ClinicianRecord
): Promise<void> => {
  const localPatient = await getPatientDetails(icdCrtRecord.patientID);
  if (localPatient) {
    localPatient.icdCrtRecords.unshift(icdCrtRecord);
    await setPatientDetails(localPatient);
  }
};

export const setPatientBaselines = async (
  baselines: PatientInfo[]
): Promise<void> => {
  let localData = await getPatientBaselines();

  baselines.forEach((baseline) => {
    if (localData) {
      // Removes existing patient baselines if any
      const existIndex = localData.findIndex(
        (p) => p.patientID === baseline.patientID
      );
      if (existIndex >= 0) {
        localData.splice(existIndex, 1);
      }
    } else {
      localData = [];
    }
    localData.push(baseline);
  });

  await AsyncStorage.setItem(
    AsyncStorageKeys.PATIENT_BASELINES,
    JSON.stringify(localData)
  );
};
/**
 * Stores the medication configuration to be synced
 * @param patientMedConfig an object with an array of medication configurations mapped to a patient
 */
export const setPatientMedicationConfigurations = async (
  patientMedConfig: AsyncStorageType[AsyncStorageKeys.MEDICATION_CONFIGURATIONS]
): Promise<void> => {
  // Get all the current local medication infos to be synced
  let localMedConfiguration = await getPatientMedicationConfigurations();

  // If localMedConfiguration is null, create an empty list
  if (!localMedConfiguration) {
    localMedConfiguration = [];
  }

  // Merged the new med configs to be synced into the current med configs to be synced
  localMedConfiguration = localMedConfiguration.concat(patientMedConfig);

  await AsyncStorage.setItem(
    AsyncStorageKeys.MEDICATION_CONFIGURATIONS,
    JSON.stringify(localMedConfiguration)
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
      version: currentTodo.version,
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
          todoToStore.version = currentTodo.version;
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

/**
 * Insert an patient assignment subscription
 * @param patientAssignmentSubscription patient assignment subscription to be inserted
 */
export const setPatientAssignmentSubscription = async (
  patientAssignmentSubscription: PatientAssignment
): Promise<void> => {
  let localData = await getPatientAssignmentSubscriptions();
  if (!localData) {
    localData = [];
  }
  localData.push(patientAssignmentSubscription);
  await setPatientAssignmentSubscriptions(localData);
};

/**
 * Replaces the existing array of patient assignment subscriptions
 * @param patientAssignmentSubscriptions array of patient assignment subscriptions
 */
export const setPatientAssignmentSubscriptions = async (
  patientAssignmentSubscriptions: PatientAssignment[]
): Promise<void> => {
  await AsyncStorage.setItem(
    AsyncStorageKeys.PATIENT_ASSIGNMENT_SUBSCRIPTIONS,
    JSON.stringify(patientAssignmentSubscriptions)
  );
};
