"use strict";
exports.__esModule = true;
exports.QueryArgument = exports.Pending = exports.Resolution = exports.AppSyncUrl = void 0;
exports.AppSyncUrl = process.env.API_REPORTCARE_GRAPHQLAPIENDPOINTOUTPUT;
// == Enum ==
var Resolution;
(function (Resolution) {
    Resolution["APPROVED"] = "APPROVED";
    Resolution["REASSIGNED"] = "REASSIGNED";
})(Resolution = exports.Resolution || (exports.Resolution = {}));
exports.Pending = "PENDING";
var QueryArgument;
(function (QueryArgument) {
    QueryArgument["patientID"] = "patientID";
    QueryArgument["resolution"] = "resolution";
    QueryArgument["reassignToClinicianID"] = "reassignToClinicianID";
})(QueryArgument = exports.QueryArgument || (exports.QueryArgument = {}));
