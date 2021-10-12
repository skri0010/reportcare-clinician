"use strict";
exports.__esModule = true;
exports.createNewEventResponse = exports.prettify = void 0;
// Pretty prints strings
var prettify = function (input) {
    return JSON.stringify(input, null, 2);
};
exports.prettify = prettify;
var createNewEventResponse = function () {
    return { success: false };
};
exports.createNewEventResponse = createNewEventResponse;
