"use strict";
exports.__esModule = true;
exports.resolutionValues =
  exports.Pending =
  exports.Resolution =
  exports.AppSyncUrl =
    void 0;
// Note: GraphQL operations use IAM authentication
exports.AppSyncUrl = process.env.API_REPORTCARE_GRAPHQLAPIENDPOINTOUTPUT;
// Enum
var Resolution;
(function (Resolution) {
  Resolution["APPROVED"] = "APPROVED";
  Resolution["REASSIGNED"] = "REASSIGNED";
})((Resolution = exports.Resolution || (exports.Resolution = {})));
var Pending;
(function (Pending) {
  Pending["PENDING"] = "PENDING";
})((Pending = exports.Pending || (exports.Pending = {})));
exports.resolutionValues = Object.values(Resolution);
