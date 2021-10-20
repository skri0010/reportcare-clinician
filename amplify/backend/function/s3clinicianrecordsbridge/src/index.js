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
exports.handler = void 0;
var mutations_1 = require("./typed-api/mutations");
var queries_1 = require("./typed-api/queries");
var s3Commands_1 = require("./s3Commands");
var types_1 = require("./types");
var shared_1 = require("./api/shared");
/* Amplify Params - DO NOT EDIT
    API_REPORTCARE_GRAPHQLAPIENDPOINTOUTPUT
    API_REPORTCARE_GRAPHQLAPIIDOUTPUT
  STORAGE_S3CLINICIANRECORDS_BUCKETNAME
    ENV
    REGION
Amplify Params - DO NOT EDIT */
var DELETE_GRACE_PERIOD = 2 * 24 * 60 * 60 * 1000;
var handler = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var eventResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                eventResponse = (0, shared_1.createNewEventResponse)();
                if (!(event.typeName === "Query")) return [3 /*break*/, 2];
                return [4 /*yield*/, handleQuery(event)];
            case 1:
                eventResponse = _a.sent();
                _a.label = 2;
            case 2: return [2 /*return*/, eventResponse];
        }
    });
}); };
exports.handler = handler;
var handleQuery = function (queryEvent) { return __awaiter(void 0, void 0, void 0, function () {
    var eventResponse, _a, recordType, operation, patientID, documentID, documentTitle, expectedAttributes, patientGroups, path, verifiedArgs, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                eventResponse = (0, shared_1.createNewEventResponse)();
                _b.label = 1;
            case 1:
                _b.trys.push([1, 17, , 18]);
                if (!(queryEvent.fieldName === "queryS3ClinicianRecordsBridge" &&
                    queryEvent.arguments)) return [3 /*break*/, 15];
                _a = queryEvent.arguments, recordType = _a.recordType, operation = _a.operation, patientID = _a.patientID, documentID = _a.documentID, documentTitle = _a.documentTitle;
                expectedAttributes = recordType &&
                    verifyRecordType(recordType) &&
                    operation &&
                    patientID &&
                    documentID &&
                    documentTitle;
                if (!expectedAttributes) return [3 /*break*/, 13];
                patientGroups = queryEvent.identity.claims["cognito:groups"] ||
                    queryEvent.identity.claims.groups;
                if (!(queryEvent.identity.username &&
                    patientGroups &&
                    patientGroups.includes(patientID))) return [3 /*break*/, 11];
                // Logging purposes
                console.log(JSON.stringify(queryEvent.arguments, null, 2));
                path = types_1.S3Level + "/" + recordType + "/" + patientID + "/" + documentID;
                verifiedArgs = {
                    patientID: patientID,
                    documentID: documentID,
                    documentTitle: documentTitle,
                    operation: operation,
                    recordType: recordType
                };
                if (!(operation === "Upload")) return [3 /*break*/, 3];
                return [4 /*yield*/, handleUpload({
                        args: verifiedArgs,
                        username: queryEvent.identity.username,
                        path: path
                    })];
            case 2:
                eventResponse = _b.sent();
                return [3 /*break*/, 10];
            case 3:
                if (!(operation === "Download")) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, s3Commands_1.getPresignedDownloadUrl)(path)];
            case 4:
                // Create and return a presigned URL to download document
                eventResponse = _b.sent();
                return [3 /*break*/, 10];
            case 5:
                if (!(operation === "Delete")) return [3 /*break*/, 7];
                return [4 /*yield*/, handleDelete({
                        args: verifiedArgs,
                        path: path
                    })];
            case 6:
                eventResponse = _b.sent();
                return [3 /*break*/, 10];
            case 7:
                if (!(operation === "Acknowledge")) return [3 /*break*/, 9];
                return [4 /*yield*/, handleAcknowledge({
                        args: verifiedArgs
                    })];
            case 8:
                eventResponse = _b.sent();
                return [3 /*break*/, 10];
            case 9: throw Error("Unrecognised operation");
            case 10: return [3 /*break*/, 12];
            case 11: throw Error("Unauthorised");
            case 12: return [3 /*break*/, 14];
            case 13: throw Error("Argument attributes do not match");
            case 14: return [3 /*break*/, 16];
            case 15: throw Error("Unknown field name or arguments");
            case 16: return [3 /*break*/, 18];
            case 17:
                error_1 = _b.sent();
                console.log(error_1);
                return [3 /*break*/, 18];
            case 18:
                console.log("Response: " + (0, shared_1.prettify)(eventResponse));
                return [2 /*return*/, eventResponse];
        }
    });
}); };
var handleUpload = function (_a) {
    var args = _a.args, username = _a.username, path = _a.path;
    return __awaiter(void 0, void 0, void 0, function () {
        var eventResponse, patientID, documentID, recordType, documentTitle, createResult, error_2;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    eventResponse = (0, shared_1.createNewEventResponse)();
                    patientID = args.patientID, documentID = args.documentID, recordType = args.recordType, documentTitle = args.documentTitle;
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, (0, mutations_1.createClinicianRecord)({
                            patientID: patientID,
                            documentID: documentID,
                            type: recordType,
                            title: documentTitle,
                            path: path,
                            uploaderClinicianID: username
                        })];
                case 2:
                    createResult = _c.sent();
                    if (!((_b = createResult.data) === null || _b === void 0 ? void 0 : _b.createClinicianRecord)) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, s3Commands_1.getPresignedUploadUrl)(path)];
                case 3:
                    // Create and return a presigned URL to upload document
                    eventResponse = _c.sent();
                    return [3 /*break*/, 5];
                case 4: throw Error("Failed to create DynamoDB ClinicianRecord record");
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_2 = _c.sent();
                    console.log(error_2);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/, eventResponse];
            }
        });
    });
};
var handleDelete = function (_a) {
    var args = _a.args, path = _a.path;
    return __awaiter(void 0, void 0, void 0, function () {
        var eventResponse, patientID, documentID, recordType, documentTitle, getResult, _b, uploadDateTime, _version, updateTimeInMs, currentTimeInMs, withinDeleteGracePeriod, deleteSuccess, deleteMutation, error_3;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    eventResponse = (0, shared_1.createNewEventResponse)();
                    patientID = args.patientID, documentID = args.documentID, recordType = args.recordType, documentTitle = args.documentTitle;
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 12, , 13]);
                    return [4 /*yield*/, (0, queries_1.getClinicianRecord)({
                            documentID: documentID,
                            patientID: patientID
                        })];
                case 2:
                    getResult = _d.sent();
                    if (!getResult.data.getClinicianRecord) return [3 /*break*/, 10];
                    _b = getResult.data.getClinicianRecord, uploadDateTime = _b.uploadDateTime, _version = _b._version;
                    if (!uploadDateTime) return [3 /*break*/, 8];
                    updateTimeInMs = new Date(uploadDateTime).valueOf();
                    currentTimeInMs = new Date().valueOf();
                    withinDeleteGracePeriod = currentTimeInMs - updateTimeInMs < DELETE_GRACE_PERIOD;
                    if (!withinDeleteGracePeriod) return [3 /*break*/, 6];
                    return [4 /*yield*/, (0, s3Commands_1.deleteObject)(path)];
                case 3:
                    deleteSuccess = _d.sent();
                    if (!deleteSuccess) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, mutations_1.deleteClinicianRecord)({
                            documentID: documentID,
                            patientID: patientID,
                            _version: _version // Necessary for deletion with ConflictResolution on
                        })];
                case 4:
                    deleteMutation = _d.sent();
                    if ((_c = deleteMutation.data) === null || _c === void 0 ? void 0 : _c.deleteClinicianRecord) {
                        // Successful event response
                        eventResponse = {
                            success: true
                        };
                    }
                    else {
                        throw Error("Failed to delete ClinicianRecord for { documentID: " + documentID + ", patientID: " + patientID + "}. " + (0, shared_1.prettify)(deleteMutation.errors));
                    }
                    _d.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6: throw Error("Delete period has passed for document " + documentID + " for patient " + patientID);
                case 7: return [3 /*break*/, 9];
                case 8: throw Error("Invalid record candidate for deletion. No upload date time");
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (!getResult.errors) {
                        // Successful event response
                        eventResponse = {
                            success: true
                        };
                    }
                    // Error is thrown
                    else {
                        throw Error("Failed to get clinician record to check for deletion grace period. Error: " + (0, shared_1.prettify)(getResult.errors));
                    }
                    _d.label = 11;
                case 11: return [3 /*break*/, 13];
                case 12:
                    error_3 = _d.sent();
                    console.log(error_3);
                    return [3 /*break*/, 13];
                case 13: return [2 /*return*/, eventResponse];
            }
        });
    });
};
var handleAcknowledge = function (_a) {
    var args = _a.args;
    return __awaiter(void 0, void 0, void 0, function () {
        var eventResponse, patientID, documentID, recordType, documentTitle, updateResult, error_4;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    eventResponse = (0, shared_1.createNewEventResponse)();
                    patientID = args.patientID, documentID = args.documentID, recordType = args.recordType, documentTitle = args.documentTitle;
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, mutations_1.updateClinicianRecord)({
                            patientID: patientID,
                            documentID: documentID,
                            uploadDateTime: new Date().toISOString()
                        })];
                case 2:
                    updateResult = _c.sent();
                    if ((_b = updateResult.data) === null || _b === void 0 ? void 0 : _b.updateClinicianRecord) {
                        // Successful event response
                        eventResponse = { success: true };
                    }
                    else {
                        throw Error("Failed to acknowledge document upload through updating DynamoDB record. " + (0, shared_1.prettify)(updateResult.errors));
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _c.sent();
                    console.log(error_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, eventResponse];
            }
        });
    });
};
var verifyRecordType = function (recordType) {
    return types_1.S3Prefixes.includes(recordType);
};
