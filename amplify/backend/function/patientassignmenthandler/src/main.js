"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.sharePatientAssignment = exports.handleReassignedResolution = exports.handleApprovedResolution = void 0;
var types_1 = require("./types");
var queries_1 = require("./typed-api/queries");
var createMutations_1 = require("./typed-api/createMutations");
var updateMutations_1 = require("./typed-api/updateMutations");
var shared_1 = require("./api/shared");
var handleApprovedResolution = function (_a) {
    var clinicianID = _a.clinicianID, patientID = _a.patientID, resolution = _a.resolution;
    return __awaiter(void 0, void 0, void 0, function () {
        var successMessage, eventResponse, mapExists, getResult, createResult, error_1, errorMessage;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    successMessage = "Successfully handled approved resolution for PatientAssignment " + keysAsString(patientID, clinicianID);
                    eventResponse = (0, shared_1.createNewEventResponse)();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 9, , 10]);
                    mapExists = false;
                    return [4 /*yield*/, (0, queries_1.getClinicianPatientMap)({
                            patientID: patientID,
                            clinicianID: clinicianID
                        })];
                case 2:
                    getResult = _b.sent();
                    if (!getResult.data.getClinicianPatientMap) return [3 /*break*/, 3];
                    mapExists = true;
                    return [3 /*break*/, 6];
                case 3:
                    if (!!getResult.errors) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, createMutations_1.createClinicianPatientMap)({
                            patientID: patientID,
                            clinicianID: clinicianID
                        })];
                case 4:
                    createResult = _b.sent();
                    if (createResult.data.createClinicianPatientMap) {
                        mapExists = true;
                    }
                    else {
                        throw Error("Failed to create ClinicianPatientMap");
                    }
                    return [3 /*break*/, 6];
                case 5: throw new Error((0, shared_1.prettify)(getResult.errors));
                case 6:
                    if (!mapExists) return [3 /*break*/, 8];
                    return [4 /*yield*/, updateSourcePatientAssignment({
                            patientID: patientID,
                            sourceClinicianID: clinicianID,
                            successMessage: successMessage,
                            resolution: resolution
                        })];
                case 7:
                    // Update source PatientAssignment
                    eventResponse = _b.sent();
                    _b.label = 8;
                case 8: return [3 /*break*/, 10];
                case 9:
                    error_1 = _b.sent();
                    errorMessage = error_1 + "\n" + keysAsString(patientID, clinicianID);
                    console.log(errorMessage);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/, eventResponse];
            }
        });
    });
};
exports.handleApprovedResolution = handleApprovedResolution;
var handleReassignedResolution = function (_a) {
    var clinicianID = _a.clinicianID, patientID = _a.patientID, patientName = _a.patientName, reassignToClinicianID = _a.reassignToClinicianID, resolution = _a.resolution;
    return __awaiter(void 0, void 0, void 0, function () {
        var eventResponse, successMessage, reassignedToTarget, getResult, targetPatientAssignment, updateResult, result, error_2, errorMessage;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    eventResponse = (0, shared_1.createNewEventResponse)();
                    successMessage = "Successfully handled reassign resolution for PatientAssignment " + keysAsString(patientID, clinicianID) + " to " + keysAsString(patientID, reassignToClinicianID);
                    reassignedToTarget = false;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 12, , 13]);
                    return [4 /*yield*/, (0, queries_1.getPatientAssignment)({
                            patientID: patientID,
                            clinicianID: reassignToClinicianID
                        })];
                case 2:
                    getResult = _b.sent();
                    if (!getResult.data.getPatientAssignment) return [3 /*break*/, 6];
                    targetPatientAssignment = getResult.data.getPatientAssignment;
                    if (!(targetPatientAssignment.resolution === types_1.Resolution.REASSIGNED)) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, updateMutations_1.updatePatientAssignment)({
                            patientID: patientID,
                            clinicianID: reassignToClinicianID,
                            pending: types_1.Pending,
                            resolution: null,
                            sourceClinicianID: clinicianID // Indicate source clinicianID
                        })];
                case 3:
                    updateResult = _b.sent();
                    if (updateResult.data.updatePatientAssignment) {
                        // Update flag for target reassignment
                        reassignedToTarget = true;
                    }
                    else {
                        throw Error("Failed to update target PatientAssignment\n" +
                            keysAsString(patientID, reassignToClinicianID));
                    }
                    return [3 /*break*/, 5];
                case 4:
                    // Update flag for target reassignment
                    reassignedToTarget = true;
                    _b.label = 5;
                case 5: return [3 /*break*/, 9];
                case 6:
                    if (!!getResult.errors) return [3 /*break*/, 8];
                    return [4 /*yield*/, (0, createMutations_1.createPatientAssignment)({
                            patientID: patientID,
                            clinicianID: reassignToClinicianID,
                            patientName: patientName,
                            pending: types_1.Pending,
                            resolution: null,
                            sourceClinicianID: clinicianID // Indicate source clinicianID
                        })];
                case 7:
                    result = _b.sent();
                    if (result.data.createPatientAssignment) {
                        // Update flag for target reassignment
                        reassignedToTarget = true;
                    }
                    else {
                        throw Error("Failed to create target PatientAssignment");
                    }
                    return [3 /*break*/, 9];
                case 8:
                    console.log(getResult.errors.length);
                    throw Error("Failed to check whether target PatientAssignment exists");
                case 9:
                    if (!reassignedToTarget) return [3 /*break*/, 11];
                    return [4 /*yield*/, updateSourcePatientAssignment({
                            patientID: patientID,
                            sourceClinicianID: clinicianID,
                            successMessage: successMessage,
                            resolution: resolution
                        })];
                case 10:
                    // Update source PatientAssignment
                    eventResponse = _b.sent();
                    _b.label = 11;
                case 11: return [3 /*break*/, 13];
                case 12:
                    error_2 = _b.sent();
                    errorMessage = error_2 + "\n" + keysAsString(patientID, clinicianID);
                    console.log(errorMessage);
                    return [3 /*break*/, 13];
                case 13: return [2 /*return*/, eventResponse];
            }
        });
    });
};
exports.handleReassignedResolution = handleReassignedResolution;
var sharePatientAssignment = function (_a) {
    var clinicianID = _a.clinicianID, patientID = _a.patientID, patientName = _a.patientName, shareToClinicianID = _a.shareToClinicianID;
    return __awaiter(void 0, void 0, void 0, function () {
        var eventResponse, successfullyShared, errorMessage, getResult, record, updateResult, createResult, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    eventResponse = (0, shared_1.createNewEventResponse)();
                    successfullyShared = false;
                    errorMessage = "";
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 9, , 10]);
                    return [4 /*yield*/, (0, queries_1.getPatientAssignment)({
                            clinicianID: shareToClinicianID,
                            patientID: patientID
                        })];
                case 2:
                    getResult = _b.sent();
                    if (!getResult.data.getPatientAssignment) return [3 /*break*/, 5];
                    record = getResult.data.getPatientAssignment;
                    if (!(record.resolution !== types_1.Resolution.APPROVED)) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, updateMutations_1.updatePatientAssignment)({
                            clinicianID: shareToClinicianID,
                            patientID: patientID,
                            pending: types_1.Pending,
                            resolution: null,
                            sourceClinicianID: clinicianID
                        })];
                case 3:
                    updateResult = _b.sent();
                    if (updateResult.data) {
                        successfullyShared = true;
                    }
                    else {
                        errorMessage = (0, shared_1.prettify)(updateResult.errors);
                    }
                    _b.label = 4;
                case 4: return [3 /*break*/, 8];
                case 5:
                    if (!!getResult.data.getPatientAssignment) return [3 /*break*/, 7];
                    return [4 /*yield*/, (0, createMutations_1.createPatientAssignment)({
                            clinicianID: shareToClinicianID,
                            patientID: patientID,
                            patientName: patientName,
                            pending: types_1.Pending,
                            sourceClinicianID: clinicianID
                        })];
                case 6:
                    createResult = _b.sent();
                    if (createResult.data.createPatientAssignment) {
                        successfullyShared = true;
                    }
                    else {
                        errorMessage = (0, shared_1.prettify)(createResult.errors);
                    }
                    return [3 /*break*/, 8];
                case 7: throw Error((0, shared_1.prettify)(getResult.errors));
                case 8:
                    // If succesfully shared, print success message and update event response
                    if (successfullyShared) {
                        console.log("Successfully shared patientID: " + patientID + " from clinicianID: " + clinicianID + " to clinicianID: " + shareToClinicianID);
                        // Successful event response
                        eventResponse = {
                            success: true
                        };
                    }
                    // Otherwise, print error message
                    else {
                        throw Error("Failed to share patientID: " + patientID + " from clinicianID: " + clinicianID + " to clinicianID: " + shareToClinicianID + ". Error: " + errorMessage);
                    }
                    return [3 /*break*/, 10];
                case 9:
                    error_3 = _b.sent();
                    console.log(error_3);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/, eventResponse];
            }
        });
    });
};
exports.sharePatientAssignment = sharePatientAssignment;
var updateSourcePatientAssignment = function (_a) {
    var patientID = _a.patientID, sourceClinicianID = _a.sourceClinicianID, successMessage = _a.successMessage, resolution = _a.resolution;
    return __awaiter(void 0, void 0, void 0, function () {
        var eventResponse, getResult, sourcePatientAssignment, updateResult, error_4, errorMessage;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    eventResponse = (0, shared_1.createNewEventResponse)();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, (0, queries_1.getPatientAssignment)({
                            patientID: patientID,
                            clinicianID: sourceClinicianID
                        })];
                case 2:
                    getResult = _b.sent();
                    if (!getResult.data.getPatientAssignment) return [3 /*break*/, 4];
                    sourcePatientAssignment = getResult.data.getPatientAssignment;
                    return [4 /*yield*/, (0, updateMutations_1.updatePatientAssignment)({
                            patientID: patientID,
                            clinicianID: sourceClinicianID,
                            pending: null,
                            resolution: resolution
                        })];
                case 3:
                    updateResult = _b.sent();
                    if (updateResult.data.updatePatientAssignment) {
                        // Print success message and update event response
                        console.log(successMessage);
                        // Successful event response
                        eventResponse = {
                            success: true
                        };
                    }
                    else {
                        throw Error("Failed to update source PatientAssignment");
                    }
                    return [3 /*break*/, 5];
                case 4: throw Error("Failed to query source PatientAssignment");
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_4 = _b.sent();
                    errorMessage = error_4 + "\n" + keysAsString(patientID, sourceClinicianID);
                    console.log(errorMessage);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/, eventResponse];
            }
        });
    });
};
var keysAsString = function (patientID, clinicianID) {
    return "\npatientID (partition key): " + patientID + "\nclinicianID (sort key): " + clinicianID;
};
