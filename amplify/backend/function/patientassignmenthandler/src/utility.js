"use strict";
exports.__esModule = true;
exports.incrementNumberObjectByOne = exports.getDateItems = exports.prettyPrint = exports.getResolution = exports.validatePendingUpdate = exports.validateID = void 0;
var types_1 = require("./types");
// All ID should match
var validateID = function (keyID, newID, oldID) {
    return keyID && newID && oldID && keyID.S === newID.S && keyID.S === oldID.S;
};
exports.validateID = validateID;
// New pending should be null/undefined defined, old pending should be "PENDING"
var validatePendingUpdate = function (newPending, oldPending) {
    return !newPending && oldPending && oldPending.S === "PENDING";
};
exports.validatePendingUpdate = validatePendingUpdate;
// Get Resolution object | undefined from EventString
var getResolution = function (resolution) {
    if (resolution) {
        return types_1.resolutionValues.find(function (value) { return value.toString() === resolution.S; });
    }
};
exports.getResolution = getResolution;
// Pretty prints strings
var prettyPrint = function (input) {
    return JSON.stringify(input, null, 2);
};
exports.prettyPrint = prettyPrint;
// Return ISO string and value string of current date
var getDateItems = function () {
    var date = new Date();
    var dateStr = date.toISOString();
    var dateValueStr = date.valueOf().toString();
    return {
        dateStr: { S: dateStr },
        dateValueStr: { N: dateValueStr }
    };
};
exports.getDateItems = getDateItems;
// Increment a NumberObject by 1
// { N: "1" } => { N: "2" }
var incrementNumberObjectByOne = function (numberObject) {
    return { N: (parseInt(numberObject.N) + 1).toString() };
};
exports.incrementNumberObjectByOne = incrementNumberObjectByOne;
