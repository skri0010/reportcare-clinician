import { ITodoDetails } from "models/TodoDetails";
// import { Todo } from "aws/API";
import { LocalTodo } from "rc_agents/model";

export const mockCurrentTodoDetails: ITodoDetails[] = [
  {
    title: "Contact",
    name: "Mohammad Zaini",
    description: "Abnormal heart rate",
    doneStatus: false,
    created: "19:23 21-05-2021",
    modified: "Never",
    id: "1"
  },
  {
    title: "Schedule Appointment",
    name: "Linda Mario",
    description: "Health Check",
    doneStatus: false,
    created: "19:23 21-05-2021",
    modified: "20:00 21-05-2021",
    id: "2"
  },
  {
    title: "Contact",
    name: "Mohammad Abdul",
    description: "Abnormal heart rate",
    doneStatus: false,
    created: "19:23 21-04-2021",
    modified: "Never",
    id: "3"
  },
  {
    title: "Contact",
    name: "Mario Luigi",
    description: "Check symptoms",
    doneStatus: false,
    created: "15:30 21-04-2021",
    modified: "Never",
    id: "4"
  },
  {
    title: "Contact",
    name: "Mario Luigi",
    description: "Check symptoms",
    doneStatus: false,
    created: "15:30 15-04-2021",
    modified: "Never",
    id: "5"
  }
];

export const mockCompletedTodoDetails: ITodoDetails[] = [
  {
    title: "Contact",
    name: "Mohammad Zaini",
    description: "Abnormal heart rate",
    doneStatus: true,
    created: "15:30 10-04-2021",
    modified: "Never",
    id: "1"
  },
  {
    title: "Schedule Appointment",
    name: "Linda Mario",
    description: "Health Check",
    doneStatus: true,
    created: "15:30 10-04-2021",
    modified: "Never",
    id: "2"
  },
  {
    title: "Contact",
    name: "Mohammad Abdul",
    description: "Abnormal heart rate",
    doneStatus: true,
    created: "15:30 10-04-2021",
    modified: "Never",
    id: "3"
  },
  {
    title: "Contact",
    name: "Mario Luigi",
    description: "Check symptoms",
    doneStatus: true,
    created: "15:30 10-04-2021",
    modified: "Never",
    id: "4"
  },
  {
    title: "Contact",
    name: "Mario Luigi",
    description: "Check symptoms",
    doneStatus: true,
    created: "15:30 10-04-2021",
    modified: "Never",
    id: "5"
  },
  {
    title: "Contact",
    name: "Mario Luigi",
    description: "Check symptoms",
    doneStatus: false,
    created: "15:30 10-04-2021",
    modified: "Never",
    id: "6"
  }
];

export const mockCurrentTodo: LocalTodo[] = [
  {
    id: "8616e0f6-17ce-4b5e-87c5-9300098c63b1",
    title: "Appointment",
    patientName: "Muhammad Zaini",
    notes: "Call patient tomorrow",
    lastModified: "2021-08-10T15:40:20.008Z",
    completed: false,
    toSync: false,
    patientId: "1",
    version: 8,
    createdAt: "2021-08-10T15:08:15.116Z"
  },
  {
    id: "8616e0f6-17ce-4b5e-87c5-9312348c63b1",
    title: "Contact",
    patientName: "Alice Alice",
    notes: "Check up on patient",
    lastModified: "2021-08-10T15:40:20.008Z",
    completed: false,
    toSync: false,
    version: 8,
    createdAt: "2021-08-01T15:08:15.116Z"
  }
];

export const mockCompletedTodo: LocalTodo[] = [
  {
    id: "8616e0f6-17ce-4b5e-87c5-9300098c1234",
    title: "Appointment",
    patientName: "Muhammad Zaini",
    notes: "Call patient tomorrow",
    lastModified: "2021-08-10T15:40:20.008Z",
    completed: true,
    toSync: false,
    version: 8,
    createdAt: "2021-08-10T15:08:15.116Z"
  }
];
