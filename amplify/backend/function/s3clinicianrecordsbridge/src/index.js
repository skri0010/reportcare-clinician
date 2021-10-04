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
var mutations_1 = require("./api/mutations");
var s3Commands_1 = require("./s3Commands");
var types_1 = require("./types");
/* Amplify Params - DO NOT EDIT
    API_REPORTCARE_GRAPHQLAPIENDPOINTOUTPUT
    API_REPORTCARE_GRAPHQLAPIIDOUTPUT
    ENV
    REGION
Amplify Params - DO NOT EDIT */
var handler = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var presignedUrlObjectResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                presignedUrlObjectResponse = {
                    success: false
                };
                if (!(event.typeName === "Query")) return [3 /*break*/, 2];
                return [4 /*yield*/, handleQuery(event)];
            case 1:
                presignedUrlObjectResponse = _a.sent();
                _a.label = 2;
            case 2: return [2 /*return*/, presignedUrlObjectResponse];
        }
    });
}); };
exports.handler = handler;
var handleQuery = function (queryEvent) { return __awaiter(void 0, void 0, void 0, function () {
    var presignedUrlObjectResponse, _a, recordType, operation, patientID, documentID, documentTitle, expectedAttributes, path, createResult, error_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                presignedUrlObjectResponse = {
                    success: false
                };
                _c.label = 1;
            case 1:
                _c.trys.push([1, 16, , 17]);
                if (!(queryEvent.fieldName === "getPresignedURLForClinicianRecords" &&
                    queryEvent.arguments)) return [3 /*break*/, 14];
                _a = queryEvent.arguments, recordType = _a.recordType, operation = _a.operation, patientID = _a.patientID, documentID = _a.documentID, documentTitle = _a.documentTitle;
                expectedAttributes = recordType &&
                    verifyRecordType(recordType) &&
                    operation &&
                    patientID &&
                    documentID &&
                    documentTitle;
                if (!expectedAttributes) return [3 /*break*/, 12];
                if (!queryEvent.identity.claims["cognito:groups"].includes(patientID)) return [3 /*break*/, 10];
                path = types_1.S3Level + "/" + recordType + "/" + patientID + "/" + documentID;
                if (!(operation === "Upload")) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, mutations_1.createClinicianRecord)({
                        patientID: patientID,
                        documentID: documentID,
                        type: recordType,
                        title: documentTitle,
                        path: path
                    })];
            case 2:
                createResult = _c.sent();
                if (!((_b = createResult.data) === null || _b === void 0 ? void 0 : _b.createClinicianRecord)) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, s3Commands_1.getPresignedUploadUrl)(path)];
            case 3:
                presignedUrlObjectResponse = _c.sent();
                return [3 /*break*/, 5];
            case 4: throw Error("Failed to create DynamoDB ClinicianRecord record");
            case 5: return [3 /*break*/, 9];
            case 6:
                if (!(operation === "Download")) return [3 /*break*/, 8];
                return [4 /*yield*/, (0, s3Commands_1.getPresignedDownloadUrl)(path)];
            case 7:
                presignedUrlObjectResponse = _c.sent();
                return [3 /*break*/, 9];
            case 8: throw Error("Unrecognised operation");
            case 9: return [3 /*break*/, 11];
            case 10: throw Error("Unauthorised");
            case 11: return [3 /*break*/, 13];
            case 12: throw Error("Argument attributes do not match");
            case 13: return [3 /*break*/, 15];
            case 14: throw Error("Unknown field name or arguments");
            case 15: return [3 /*break*/, 17];
            case 16:
                error_1 = _c.sent();
                console.log(error_1);
                return [3 /*break*/, 17];
            case 17: return [2 /*return*/, presignedUrlObjectResponse];
        }
    });
}); };
var verifyRecordType = function (recordType) {
    return types_1.S3Prefixes.includes(recordType);
};
