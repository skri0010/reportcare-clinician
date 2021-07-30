import { ITodoDetails } from "models/TodoDetails";

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
