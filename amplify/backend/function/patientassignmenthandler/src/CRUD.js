"use strict";
exports.__esModule = true;
exports.getPatientAssignmentUpdateItemInput =
  exports.getPatientAssignmentPutItemInput =
  exports.getClinicianPatientMapPutItemInput =
  exports.getPatientAssignmentGetItemInput =
  exports.patientAssignmentTable =
  exports.clinicianPatientMapTable =
    void 0;
var utility_1 = require("./utility");
// CRUD Operations
exports.clinicianPatientMapTable =
  "ClinicianPatientMap-xtom7ff7cjhqtnjolhvf3jvnuy-dev";
exports.patientAssignmentTable =
  "PatientAssignment-xtom7ff7cjhqtnjolhvf3jvnuy-dev";
var INITIALIZE_VERSION = { N: "1" };
/**
 * == GetItem ==
 * Documentation for GetItem: https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_GetItem.html
 *
 * == Notes ==
 * 1. GetItem returns a set of attributes for the item with given keys
 * 2. If the item does not exist, it will NOT return any data and no Item in response
 */
var getPatientAssignmentGetItemInput = function (_a) {
  var patientID = _a.patientID,
    clinicianID = _a.clinicianID;
  return {
    TableName: exports.patientAssignmentTable,
    Key: {
      patientID: patientID,
      clinicianID: clinicianID
    },
    AttributesToGet: ["_version", "resolution"]
  };
};
exports.getPatientAssignmentGetItemInput = getPatientAssignmentGetItemInput;
/**
 * == PutItem ==
 * Documentation: https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_PutItem.html
 *
 * == Notes ==
 * 1. PutItem either inserts or updates item (if exists)
 */
var getClinicianPatientMapPutItemInput = function (_a) {
  var clinicianID = _a.clinicianID,
    patientID = _a.patientID;
  var _b = (0, utility_1.getDateItems)(),
    dateStr = _b.dateStr,
    dateValueStr = _b.dateValueStr;
  return {
    TableName: exports.clinicianPatientMapTable,
    Item: {
      __typename: { S: "ClinicianPatientMap" },
      clinicianID: clinicianID,
      patientID: patientID,
      _version: INITIALIZE_VERSION,
      _lastChangedAt: dateValueStr,
      createdAt: dateStr,
      updatedAt: dateStr
    }
  };
};
exports.getClinicianPatientMapPutItemInput = getClinicianPatientMapPutItemInput;
var getPatientAssignmentPutItemInput = function (_a) {
  var clinicianID = _a.clinicianID,
    patientID = _a.patientID,
    patientName = _a.patientName,
    pending = _a.pending,
    resolution = _a.resolution,
    adminReassignFromClinicianID = _a.adminReassignFromClinicianID,
    adminCompleted = _a.adminCompleted,
    incrementedVersion = _a.incrementedVersion;
  var _b = (0, utility_1.getDateItems)(),
    dateStr = _b.dateStr,
    dateValueStr = _b.dateValueStr;
  return {
    TableName: exports.patientAssignmentTable,
    Item: {
      __typename: { S: "PatientAssignment" },
      clinicianID: clinicianID,
      patientID: patientID,
      patientName: patientName,
      pending: pending,
      resolution: resolution,
      adminReassignFromClinicianID: adminReassignFromClinicianID,
      adminCompleted: adminCompleted,
      _version: incrementedVersion || INITIALIZE_VERSION,
      _lastChangedAt: dateValueStr,
      createdAt: dateStr,
      updatedAt: dateStr
    }
  };
};
exports.getPatientAssignmentPutItemInput = getPatientAssignmentPutItemInput;
/**
 * == UpdateItem ==
 * Documentation: https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateItem.html
 *
 * == Note ==
 * 1. Muti-action is separated by a space, not a comma: https://stackoverflow.com/questions/39382050/dynamodb-update-item-multi-action
 * 2. ExpressionAttributeName is required because _ in _version is not a valid token
 */
var getPatientAssignmentUpdateItemInput = function (_a) {
  var patientID = _a.patientID,
    clinicianID = _a.clinicianID;
  var _b = (0, utility_1.getDateItems)(),
    dateStr = _b.dateStr,
    dateValueStr = _b.dateValueStr;
  return {
    TableName: exports.patientAssignmentTable,
    Key: {
      patientID: patientID,
      clinicianID: clinicianID
    },
    UpdateExpression:
      "ADD #version :increment SET adminCompleted=:adminCompleted, updatedAt=:updatedAt, #lastChangedAt=:lastChangedAt",
    ExpressionAttributeNames: {
      "#version": "_version",
      "#lastChangedAt": "_lastChangedAt"
    },
    ExpressionAttributeValues: {
      ":adminCompleted": {
        BOOL: true
      },
      ":lastChangedAt": dateValueStr,
      ":updatedAt": dateStr,
      ":increment": {
        N: "1"
      }
    }
  };
};
exports.getPatientAssignmentUpdateItemInput =
  getPatientAssignmentUpdateItemInput;
