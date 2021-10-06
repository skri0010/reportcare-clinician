"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
exports.__esModule = true;
exports.handlePatientAssignmentResolution = void 0;
var types_1 = require("./types");
var utility_1 = require("./utility");
var queries_1 = require("./typed-api/queries");
var createMutations_1 = require("./typed-api/createMutations");
var updateMutations_1 = require("./typed-api/updateMutations");
var handlePatientAssignmentResolution = function (event) {
  return __awaiter(void 0, void 0, void 0, function () {
    var returnMessages,
      totalCount,
      successCount,
      errorOccured,
      promises,
      results,
      successfulResults,
      failedResults;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          returnMessages = ["Successfully processed records"];
          totalCount = null;
          successCount = null;
          errorOccured = false;
          if (!(event.Records && event.Records.length > 0))
            return [3 /*break*/, 2];
          // Iterate through every record
          promises = event.Records.map(function (record) {
            var returnPromise;
            // Check: record event is MODIFY
            if (record.eventName === "MODIFY") {
              // Check: dynamodb value exists
              if (record.dynamodb) {
                var _a = record.dynamodb,
                  Keys = _a.Keys,
                  NewImage = _a.NewImage,
                  OldImage = _a.OldImage;
                var patientID = Keys.patientID,
                  clinicianID = Keys.clinicianID;
                var newPatientID = NewImage.patientID,
                  newClinicianID = NewImage.clinicianID,
                  patientName = NewImage.patientName,
                  reassignToClinicianID = NewImage.reassignToClinicianID,
                  newResolution = NewImage.resolution,
                  newPending = NewImage.pending;
                var oldPatientID = OldImage.patientID,
                  oldClinicianID = OldImage.clinicianID,
                  oldResolution = OldImage.resolution,
                  oldPending = OldImage.pending;
                // Check: PatientID and ClinicianID is the same
                // Check: New pending should be null/undefined defined, old pending should be "PENDING"
                // Check: Resolution is defined and of type Resolution
                var resolution = (0, utility_1.getResolution)(newResolution);
                var validatePatientID = (0, utility_1.validateID)(
                  patientID,
                  newPatientID,
                  oldPatientID
                );
                var validateClinicianID = (0, utility_1.validateID)(
                  clinicianID,
                  newClinicianID,
                  oldClinicianID
                );
                var validatePending = (0, utility_1.validatePendingUpdate)(
                  newPending,
                  oldPending
                );
                if (
                  validatePatientID &&
                  validateClinicianID &&
                  validatePending &&
                  clinicianID &&
                  patientID &&
                  patientName &&
                  resolution
                ) {
                  console.log(
                    "Handling PatientResolution " +
                      keysAsString(patientID, clinicianID)
                  );
                  if (resolution === types_1.Resolution.APPROVED) {
                    // Handle approved resolution
                    returnPromise = handleApprovedResolution({
                      clinicianID: clinicianID,
                      patientID: patientID
                    });
                  } else if (
                    resolution === types_1.Resolution.REASSIGNED &&
                    reassignToClinicianID
                  ) {
                    // Handle reassigned resolution
                    returnPromise = handleReassignedResolution({
                      clinicianID: clinicianID,
                      patientID: patientID,
                      patientName: patientName,
                      reassignToClinicianID: reassignToClinicianID
                    });
                  }
                } else {
                  // Log debug object
                  var debugObject = {
                    validatePatientID: validatePatientID,
                    validateClinicianID: validateClinicianID,
                    validatePending: validatePending,
                    new: {
                      pending: newPending,
                      resolution: newResolution
                    },
                    old: {
                      pending: oldPending,
                      resolution: oldResolution
                    },
                    clinicianID: clinicianID,
                    patientID: patientID,
                    patientName: patientName,
                    resolution: resolution
                  };
                  console.log(
                    "Error: Records do not meet validation requirements. " +
                      (0, utility_1.prettyPrint)(debugObject)
                  );
                  errorOccured = true;
                }
              } else {
                console.log(
                  "Error: dynamodb object does not exist. Unable to obtain keys, new and old images"
                );
                errorOccured = true;
              }
              return returnPromise;
            }
          }).flatMap(function (promise) {
            return promise ? [promise] : [];
          });
          return [4 /*yield*/, Promise.all(promises)];
        case 1:
          results = _a.sent();
          successfulResults = results.filter(function (result) {
            return result.success;
          });
          if (successfulResults.length > 0) {
            console.log("=== SUCCESSFUL ===");
          }
          successfulResults.forEach(function (successfulResult) {
            console.log(successfulResult.message);
          });
          failedResults = results.filter(function (result) {
            return !result.success;
          });
          if (failedResults.length > 0) {
            console.log("=== FAILED ===");
            failedResults.forEach(function (result) {
              return console.log(result);
            });
            errorOccured = true;
          }
          // Compute overall success count for return message
          successCount = results.filter(function (result) {
            return result.success;
          }).length;
          totalCount = results.length;
          if (totalCount > 0) {
            returnMessages.push(
              successCount + " / " + totalCount + " was successfully completed"
            );
          }
          return [3 /*break*/, 3];
        case 2:
          console.log("Error: Stream records do not exist or list is empty");
          errorOccured = true;
          _a.label = 3;
        case 3:
          if (errorOccured) {
            returnMessages.push(
              "NOTICE: Errors occurred during execution. Please check logs"
            );
          }
          return [2 /*return*/, returnMessages.join(". ")];
      }
    });
  });
};
exports.handlePatientAssignmentResolution = handlePatientAssignmentResolution;
var handleApprovedResolution = function (_a) {
  var clinicianID = _a.clinicianID,
    patientID = _a.patientID;
  return __awaiter(void 0, void 0, void 0, function () {
    var successMessage,
      returnMessage,
      clinicianPatientMapCreatedOrExists,
      getResult,
      createResult,
      error_1,
      errorMessage;
    var _b;
    return __generator(this, function (_c) {
      switch (_c.label) {
        case 0:
          successMessage =
            "Successfully handled approved resolution for PatientAssignment " +
            keysAsString(patientID, clinicianID);
          returnMessage = {
            success: false,
            message: ""
          };
          clinicianPatientMapCreatedOrExists = false;
          _c.label = 1;
        case 1:
          _c.trys.push([1, 6, , 7]);
          return [
            4 /*yield*/,
            (0, queries_1.getClinicianPatientMap)({
              patientID: patientID.S,
              clinicianID: clinicianID.S
            })
          ];
        case 2:
          getResult = _c.sent();
          if (!getResult.data.getClinicianPatientMap) return [3 /*break*/, 3];
          // Successful since map already exists
          clinicianPatientMapCreatedOrExists = true;
          return [3 /*break*/, 5];
        case 3:
          return [
            4 /*yield*/,
            (0, createMutations_1.createClinicianPatientMap)({
              patientID: patientID.S,
              clinicianID: clinicianID.S
            })
          ];
        case 4:
          createResult = _c.sent();
          if (
            (_b = createResult.data) === null || _b === void 0
              ? void 0
              : _b.createClinicianPatientMap
          ) {
            // Successful since map is created
            clinicianPatientMapCreatedOrExists = true;
          } else {
            throw Error(
              "Failed to create ClinicianPatientMap and it does not exist\n" +
                keysAsString(patientID, clinicianID)
            );
          }
          _c.label = 5;
        case 5:
          return [3 /*break*/, 7];
        case 6:
          error_1 = _c.sent();
          errorMessage = error_1 + keysAsString(patientID, clinicianID);
          returnMessage = { success: false, message: errorMessage };
          return [3 /*break*/, 7];
        case 7:
          if (!clinicianPatientMapCreatedOrExists) return [3 /*break*/, 9];
          return [
            4 /*yield*/,
            updateSourcePatientAssignment(
              patientID,
              clinicianID,
              successMessage
            )
          ];
        case 8:
          // Update source PatientAssignment
          returnMessage = _c.sent();
          _c.label = 9;
        case 9:
          return [2 /*return*/, returnMessage];
      }
    });
  });
};
var handleReassignedResolution = function (_a) {
  var clinicianID = _a.clinicianID,
    patientID = _a.patientID,
    patientName = _a.patientName,
    reassignToClinicianID = _a.reassignToClinicianID;
  return __awaiter(void 0, void 0, void 0, function () {
    var successMessage,
      returnMessage,
      reassignedToTarget,
      getResult,
      targetPatientAssignment,
      updateResult,
      result,
      error_2,
      errorMessage;
    var _b, _c;
    return __generator(this, function (_d) {
      switch (_d.label) {
        case 0:
          successMessage =
            "Successfully handled reassign resolution for PatientAssignment " +
            keysAsString(patientID, clinicianID) +
            " to " +
            keysAsString(patientID, reassignToClinicianID);
          returnMessage = {
            success: false,
            message: ""
          };
          reassignedToTarget = false;
          _d.label = 1;
        case 1:
          _d.trys.push([1, 10, , 11]);
          return [
            4 /*yield*/,
            (0, queries_1.getPatientAssignment)({
              patientID: patientID.S,
              clinicianID: reassignToClinicianID.S
            })
          ];
        case 2:
          getResult = _d.sent();
          if (!getResult.data.getPatientAssignment) return [3 /*break*/, 6];
          targetPatientAssignment = getResult.data.getPatientAssignment;
          if (
            !(
              targetPatientAssignment.resolution ===
              types_1.Resolution.REASSIGNED
            )
          )
            return [3 /*break*/, 4];
          return [
            4 /*yield*/,
            (0, updateMutations_1.updatePatientAssignment)({
              patientID: patientID.S,
              clinicianID: reassignToClinicianID.S,
              _version: targetPatientAssignment._version,
              pending: types_1.Pending.PENDING,
              resolution: null,
              adminReassignFromClinicianID: clinicianID.S // Indicate source clinicianID
            })
          ];
        case 3:
          updateResult = _d.sent();
          if (
            (_b = updateResult.data) === null || _b === void 0
              ? void 0
              : _b.updatePatientAssignment
          ) {
            // Successfully reassigned to target
            reassignedToTarget = true;
          } else {
            throw Error(
              "Failed to update target PatientAssignment\n" +
                keysAsString(patientID, reassignToClinicianID)
            );
          }
          return [3 /*break*/, 5];
        case 4:
          // Either PENDING or APPROVED
          // Successfully reassigned to target
          reassignedToTarget = true;
          _d.label = 5;
        case 5:
          return [3 /*break*/, 9];
        case 6:
          if (!!getResult.errors) return [3 /*break*/, 8];
          return [
            4 /*yield*/,
            (0, createMutations_1.createPatientAssignment)({
              patientID: patientID.S,
              clinicianID: reassignToClinicianID.S,
              patientName: patientName.S,
              pending: types_1.Pending.PENDING,
              adminReassignFromClinicianID: clinicianID.S // Indicate source clinicianID
            })
          ];
        case 7:
          result = _d.sent();
          if (
            (_c = result.data) === null || _c === void 0
              ? void 0
              : _c.createPatientAssignment
          ) {
            // Successfully reassigned to target
            reassignedToTarget = true;
          } else {
            throw Error(
              "Failed to create target PatientAssignment\n" +
                keysAsString(patientID, reassignToClinicianID)
            );
          }
          return [3 /*break*/, 9];
        case 8:
          console.log(getResult.errors.length);
          throw Error(
            "Failed to check whether target PatientAssignment exists\n" +
              JSON.stringify(getResult.errors)
          );
        case 9:
          return [3 /*break*/, 11];
        case 10:
          error_2 = _d.sent();
          errorMessage = error_2 + keysAsString(patientID, clinicianID);
          returnMessage = { success: false, message: errorMessage };
          return [3 /*break*/, 11];
        case 11:
          if (!reassignedToTarget) return [3 /*break*/, 13];
          return [
            4 /*yield*/,
            updateSourcePatientAssignment(
              patientID,
              clinicianID,
              successMessage
            )
          ];
        case 12:
          // Update source PatientAssignment
          returnMessage = _d.sent();
          _d.label = 13;
        case 13:
          return [2 /*return*/, returnMessage];
      }
    });
  });
};
var updateSourcePatientAssignment = function (
  patientID,
  sourceClinicianID,
  successMessage
) {
  return __awaiter(void 0, void 0, void 0, function () {
    var returnMessage,
      getResult,
      sourcePatientAssignment,
      updateResult,
      error_3,
      errorMessage;
    var _a;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          returnMessage = {
            success: false,
            message: ""
          };
          _b.label = 1;
        case 1:
          _b.trys.push([1, 6, , 7]);
          return [
            4 /*yield*/,
            (0, queries_1.getPatientAssignment)({
              patientID: patientID.S,
              clinicianID: sourceClinicianID.S
            })
          ];
        case 2:
          getResult = _b.sent();
          if (!getResult.data.getPatientAssignment) return [3 /*break*/, 4];
          sourcePatientAssignment = getResult.data.getPatientAssignment;
          return [
            4 /*yield*/,
            (0, updateMutations_1.updatePatientAssignment)({
              patientID: patientID.S,
              clinicianID: sourceClinicianID.S,
              _version: sourcePatientAssignment._version,
              adminCompleted: true // Indicate that Lambda function completed its task
            })
          ];
        case 3:
          updateResult = _b.sent();
          if (
            (_a = updateResult.data) === null || _a === void 0
              ? void 0
              : _a.updatePatientAssignment
          ) {
            // Successfully updated source
            // Update return message
            returnMessage = { success: true, message: successMessage };
          } else {
            throw Error(
              "Failed to update source PatientAssignment\n" +
                keysAsString(patientID, sourceClinicianID)
            );
          }
          return [3 /*break*/, 5];
        case 4:
          throw Error(
            "Failed to query source PatientAssignment\n" +
              keysAsString(patientID, sourceClinicianID)
          );
        case 5:
          return [3 /*break*/, 7];
        case 6:
          error_3 = _b.sent();
          errorMessage = error_3 + keysAsString(patientID, sourceClinicianID);
          returnMessage = { success: false, message: errorMessage };
          return [3 /*break*/, 7];
        case 7:
          return [2 /*return*/, returnMessage];
      }
    });
  });
};
var keysAsString = function (patientID, clinicianID) {
  return (
    "\npatientID (partition key): " +
    (0, utility_1.prettyPrint)(patientID) +
    "\nclinicianID (sort key): " +
    (0, utility_1.prettyPrint)(clinicianID)
  );
};
