"use strict";
var __makeTemplateObject =
  (this && this.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
exports.__esModule = true;
var dotenv_1 = require("dotenv");
var graphql_tag_1 = require("graphql-tag");
dotenv_1["default"].config();
var getPatientAssignment = (0, graphql_tag_1["default"])(
  templateObject_1 ||
    (templateObject_1 = __makeTemplateObject(
      [
        "\n  query GetPatientAssignment($patientID: String!, $clinicianID: String!) {\n    getPatientAssignment(patientID: $patientID, clinicianID: $clinicianID) {\n      id\n      patientID\n      clinicianID\n      patientName\n      pending\n      resolution\n      reassignToClinicianID\n      adminReassignFromClinicianID\n      adminCompleted\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n"
      ],
      [
        "\n  query GetPatientAssignment($patientID: String!, $clinicianID: String!) {\n    getPatientAssignment(patientID: $patientID, clinicianID: $clinicianID) {\n      id\n      patientID\n      clinicianID\n      patientName\n      pending\n      resolution\n      reassignToClinicianID\n      adminReassignFromClinicianID\n      adminCompleted\n      _version\n      _deleted\n      _lastChangedAt\n      createdAt\n      updatedAt\n    }\n  }\n"
      ]
    ))
);
var templateObject_1;
// const queryPatientAssignment = async () => {
//   try {
//     var result = await request(
//       {
//         query: createTodo,
//         variables: {
//           input: {
//             name: "new todo",
//             description: "the first"
//           }
//         }
//       },
//       appsyncUrl
//     );
//     console.log("iam results:", result);
//   } catch (error) {
//     console.log("Error querying patient assignment with AppSYnc: ", error);
//   }
// };
// API_REPORTCARE_GRAPHQLAPIIDOUTPUT;
