import { Physical } from "aws/API";
import { LocalPhysicals } from "rc_agents/model";
import { getWeekLocaleDateString } from "util/utilityFunctions";

const mockPhysicals: Physical[] = [
  {
    __typename: "Physical",
    patientID: "Mohammad Zaini",
    id: "5b22208a-da5e-430d-a661-a6530bbb5ab8",
    createdAt: "",
    updatedAt: "",
    dateTime: "2021-04-10T09:24:55.351Z",
    steps: 1200,
    stepsGoal: 2000,
    averageWalkingSpeedInMetresPerSeconds: 3,
    distanceInMetres: 600
  },
  {
    __typename: "Physical",
    patientID: "Mohammad Zaini",
    id: "5b22208a-da5e-430d-a661-a6530bbb5ab9",
    createdAt: "",
    updatedAt: "",
    dateTime: "2021-04-11T09:24:55.351Z",
    steps: 1000,
    stepsGoal: 2000,
    averageWalkingSpeedInMetresPerSeconds: 2,
    distanceInMetres: 500
  },
  {
    __typename: "Physical",
    patientID: "Mohammad Zaini",
    id: "5b22208a-da5e-430d-a661-a6530bbb5ac1",
    createdAt: "",
    updatedAt: "",
    dateTime: "2021-04-12T09:24:55.351Z",
    steps: 1400,
    stepsGoal: 2000,
    averageWalkingSpeedInMetresPerSeconds: 3.3,
    distanceInMetres: 700
  },
  {
    __typename: "Physical",
    patientID: "Mohammad Zaini",
    id: "5b22208a-da5e-430d-a661-a6530bbb5ac3",
    createdAt: "",
    updatedAt: "",
    dateTime: "2021-04-13T09:24:55.351Z",
    steps: 1600,
    stepsGoal: 2000,
    averageWalkingSpeedInMetresPerSeconds: 2.5,
    distanceInMetres: 800
  },
  {
    __typename: "Physical",
    patientID: "Mohammad Zaini",
    id: "37e7e083-b61f-4d34-891a-89bc1c6f6cc6",
    createdAt: "",
    updatedAt: "",
    dateTime: "2021-04-14T09:20:47.251Z",
    steps: 1300,
    stepsGoal: 2000,
    averageWalkingSpeedInMetresPerSeconds: 3,
    distanceInMetres: 650
  },
  {
    __typename: "Physical",
    patientID: "Mohammad Zaini",
    id: "37e7e083-b61f-4d34-891a-89bc1c6f6cc7",
    createdAt: "",
    updatedAt: "",
    dateTime: "2021-04-15T09:20:47.251Z",
    steps: 1400,
    stepsGoal: 2000,
    averageWalkingSpeedInMetresPerSeconds: 2,
    distanceInMetres: 700
  },
  {
    __typename: "Physical",
    patientID: "Muhammad Zaini",
    id: "36ee7c15-8772-4679-aade-6b3d7f4c7707",
    createdAt: "",
    updatedAt: "",
    dateTime: "2021-04-16T09:24:55.351Z",
    steps: 2100,
    stepsGoal: 2000,
    averageWalkingSpeedInMetresPerSeconds: 3.2,
    distanceInMetres: 1050
  }
];

const targetLocaleDateStrings = getWeekLocaleDateString();
const tempLocalPhysical: LocalPhysicals = {};

let localeDateStringIndex = 0;
mockPhysicals.forEach((physical) => {
  // Use dates from current date
  physical.dateTime = new Date(
    targetLocaleDateStrings[localeDateStringIndex]
  ).toString();
  localeDateStringIndex =
    (localeDateStringIndex + 1) % targetLocaleDateStrings.length;

  // Get localPhysical similar to RetrievePatientDetails
  const dateKey = new Date(physical.dateTime).toLocaleDateString();
  tempLocalPhysical[dateKey] = physical;
});

export const mockLocalPhysical = tempLocalPhysical;
