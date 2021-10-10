"use strict";
exports.__esModule = true;
exports.S3Level = exports.S3Prefixes = exports.AppSyncUrl = exports.QueryArgument = void 0;
var QueryArgument;
(function (QueryArgument) {
    QueryArgument["recordType"] = "recordType";
    QueryArgument["operation"] = "operation";
    QueryArgument["patientID"] = "patientID";
    QueryArgument["documentID"] = "documentID";
    QueryArgument["documentTitle"] = "documentTitle";
})(QueryArgument = exports.QueryArgument || (exports.QueryArgument = {}));
// == GraphQL ==
// Note: GraphQL operations use IAM authentication
exports.AppSyncUrl = process.env.API_REPORTCARE_GRAPHQLAPIENDPOINTOUTPUT;
// == S3 ==
exports.S3Prefixes = ["IcdCrt", "Medical"];
exports.S3Level = "private";
