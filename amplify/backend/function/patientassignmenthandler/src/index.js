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
var shared_1 = require("./api/shared");
var main_1 = require("./main");
var queries_1 = require("./typed-api/queries");
var types_1 = require("./types");
/* Amplify Params - DO NOT EDIT
    API_REPORTCARE_GRAPHQLAPIENDPOINTOUTPUT
    API_REPORTCARE_GRAPHQLAPIIDOUTPUT
    ENV
    REGION
Amplify Params - DO NOT EDIT */
var handler = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var eventResponse, clinicianID, patientID, resolution, getResult, patientAssignment, reassignToClinicianID, getTargetResults, clinicianID, patientsBelongingToClinician, _a, patientID, patientName, shareToClinicianID, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                eventResponse = (0, shared_1.createNewEventResponse)();
                console.log((0, shared_1.prettify)(event));
                _b.label = 1;
            case 1:
                _b.trys.push([1, 21, , 22]);
                if (!(event.typeName === "Query" &&
                    event.fieldName === "handlePatientAssignmentResolution" /* HANDLE_PATIENT_ASSIGNMENT_RESOLUTION */)) return [3 /*break*/, 17];
                clinicianID = event.identity.claims["cognito:username"] ||
                    event.identity.claims.username;
                patientID = event.arguments.patientID;
                resolution = event.arguments.resolution;
                if (!(patientID && clinicianID && resolution)) return [3 /*break*/, 15];
                return [4 /*yield*/, (0, queries_1.getPatientAssignment)({
                        patientID: patientID,
                        clinicianID: clinicianID
                    })];
            case 2:
                getResult = _b.sent();
                if (!getResult.data.getPatientAssignment) return [3 /*break*/, 13];
                patientAssignment = getResult.data.getPatientAssignment;
                if (!(resolution === types_1.Resolution.APPROVED)) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, main_1.handleApprovedResolution)({
                        clinicianID: clinicianID,
                        patientID: patientID,
                        resolution: types_1.Resolution.APPROVED
                    })];
            case 3:
                eventResponse = _b.sent();
                return [3 /*break*/, 12];
            case 4:
                if (!(resolution === types_1.Resolution.REASSIGNED)) return [3 /*break*/, 11];
                reassignToClinicianID = event.arguments.reassignToClinicianID;
                if (!reassignToClinicianID) return [3 /*break*/, 9];
                return [4 /*yield*/, (0, queries_1.getClinicianInfo)({
                        clinicianID: reassignToClinicianID
                    })];
            case 5:
                getTargetResults = _b.sent();
                if (!getTargetResults.data.getClinicianInfo) return [3 /*break*/, 7];
                return [4 /*yield*/, (0, main_1.handleReassignedResolution)({
                        clinicianID: clinicianID,
                        patientID: patientID,
                        patientName: patientAssignment.patientName,
                        reassignToClinicianID: reassignToClinicianID,
                        resolution: types_1.Resolution.REASSIGNED
                    })];
            case 6:
                eventResponse = _b.sent();
                return [3 /*break*/, 8];
            case 7: throw Error("Target clinicianID " + reassignToClinicianID + " does not exist");
            case 8: return [3 /*break*/, 10];
            case 9: throw Error("Input did not specify reassignToClinicianID");
            case 10: return [3 /*break*/, 12];
            case 11: throw Error("Invalid resolution " + resolution);
            case 12: return [3 /*break*/, 14];
            case 13: throw Error((0, shared_1.prettify)(getResult.errors));
            case 14: return [3 /*break*/, 16];
            case 15: throw Error("Missing variable. ClinicianID: " + clinicianID + " PatientID: " + patientID + " Resolution: " + resolution);
            case 16: return [3 /*break*/, 20];
            case 17:
                if (!(event.typeName === "Query" &&
                    event.fieldName === "sharePatientAssignment" /* SHARE_PATIENT_ASSIGNMENT */)) return [3 /*break*/, 20];
                clinicianID = event.identity.claims["cognito:username"] ||
                    event.identity.claims.username;
                patientsBelongingToClinician = event.identity.claims["cognito:groups"] || event.identity.claims.groups;
                _a = event.arguments, patientID = _a.patientID, patientName = _a.patientName, shareToClinicianID = _a.shareToClinicianID;
                if (!(clinicianID &&
                    patientID &&
                    patientName &&
                    shareToClinicianID &&
                    patientsBelongingToClinician.includes(patientID))) return [3 /*break*/, 19];
                return [4 /*yield*/, (0, main_1.sharePatientAssignment)({
                        clinicianID: clinicianID,
                        patientID: patientID,
                        patientName: patientName,
                        shareToClinicianID: shareToClinicianID
                    })];
            case 18:
                eventResponse = _b.sent();
                return [3 /*break*/, 20];
            case 19: throw Error("Missing variable or patient does belong to source clinician. ClinicianID: " + clinicianID + " PatientID: " + patientID + " Contains mapping: " + patientsBelongingToClinician);
            case 20: return [3 /*break*/, 22];
            case 21:
                error_1 = _b.sent();
                console.log(error_1);
                return [3 /*break*/, 22];
            case 22: return [2 /*return*/, eventResponse];
        }
    });
}); };
exports.handler = handler;
