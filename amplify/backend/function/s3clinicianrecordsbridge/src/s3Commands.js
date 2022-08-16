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
exports.deleteObject = exports.getPresignedDownloadUrl = exports.getPresignedUploadUrl = void 0;
// Reference: https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/s3-example-creating-buckets.html#s3-create-presigendurl-put
// Import the required AWS SDK clients and commands for Node.js
var client_s3_1 = require("@aws-sdk/client-s3");
var aws_sdk_1 = require("aws-sdk");
var s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
var shared_1 = require("./api/shared");
// Set the AWS Region.
var REGION = process.env.REGION;
// Set bucket name
var BUCKET_NAME = process.env.STORAGE_S3CLINICIANRECORDS_BUCKETNAME;
// Set expiry in seconds
var EXPIRY_TIME = 300;
// Create an Amazon S3 service client object.
var s3Client = new client_s3_1.S3Client({ region: REGION });
// Create Amazon S3 client imported from "aws-sdk"
var S3Instance = new aws_sdk_1.S3();
// Get presigned url for uploading specified object in path
var getPresignedUploadUrl = function (path) { return __awaiter(void 0, void 0, void 0, function () {
    var eventResponse, bucketParameters, command, signedUrl, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                eventResponse = (0, shared_1.createNewEventResponse)();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                bucketParameters = {
                    Bucket: BUCKET_NAME,
                    Key: path
                };
                command = new client_s3_1.PutObjectCommand(bucketParameters);
                return [4 /*yield*/, (0, s3_request_presigner_1.getSignedUrl)(s3Client, command, {
                        expiresIn: EXPIRY_TIME
                    })];
            case 2:
                signedUrl = _a.sent();
                if (signedUrl) {
                    // Successful event response
                    console.log("Created upload presigned url for " + path);
                    eventResponse = {
                        success: true,
                        data: signedUrl
                    };
                }
                else {
                    throw Error("Failed to create upload presigned url for " + path);
                }
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.log("Error: " + error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, eventResponse];
        }
    });
}); };
exports.getPresignedUploadUrl = getPresignedUploadUrl;
// Get presigned url for downloading specified object in path
var getPresignedDownloadUrl = function (path) { return __awaiter(void 0, void 0, void 0, function () {
    var eventResponse, bucketParameters, command, signedUrl, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                eventResponse = (0, shared_1.createNewEventResponse)();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                bucketParameters = {
                    Bucket: BUCKET_NAME,
                    Key: path
                };
                command = new client_s3_1.GetObjectCommand(bucketParameters);
                return [4 /*yield*/, (0, s3_request_presigner_1.getSignedUrl)(s3Client, command, {
                        expiresIn: EXPIRY_TIME
                    })];
            case 2:
                signedUrl = _a.sent();
                if (signedUrl) {
                    // Successful event response
                    console.log("Created download presigned url for " + path);
                    eventResponse = {
                        success: true,
                        data: signedUrl
                    };
                }
                else {
                    throw Error("Failed to create download presigned url for " + path);
                }
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.log("Error: " + error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, eventResponse];
        }
    });
}); };
exports.getPresignedDownloadUrl = getPresignedDownloadUrl;
// Delete object
var deleteObject = function (path) { return __awaiter(void 0, void 0, void 0, function () {
    var eventResponse, parameters, response, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                eventResponse = (0, shared_1.createNewEventResponse)();
                parameters = {
                    Bucket: BUCKET_NAME,
                    Key: path
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        var callback = function (error, data) {
                            if (error) {
                                reject((0, shared_1.prettify)(error));
                            }
                            else {
                                // Note: The response is actually {} with no fields
                                // Issue: https://github.com/aws/aws-sdk-js/issues/1197#issuecomment-258919580
                                resolve(data);
                            }
                        };
                        S3Instance.deleteObject(parameters, callback);
                    })];
            case 2:
                response = _a.sent();
                // Can assume that if an error is not thrown, it was successful
                if (response) {
                    // Successful event response
                    eventResponse = {
                        success: true
                    };
                }
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.log(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, eventResponse];
        }
    });
}); };
exports.deleteObject = deleteObject;
