"use strict";
exports.__esModule = true;
exports.createNewEventResponse = exports.prettify = void 0;
// Pretty print
var prettify = function (input) {
    return JSON.stringify(input, null, 2);
};
exports.prettify = prettify;
// Create new EventReponse
var createNewEventResponse = function () {
    return { success: false };
};
exports.createNewEventResponse = createNewEventResponse;
