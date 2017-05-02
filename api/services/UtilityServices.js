/**
 * Utility Services.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var module;
var require;


// include NodeJs libraries and modules
var objMessages = require("../../config/constants").constants;
// var objMessages = sails.config.constants.constants;

module.exports = {

    /**
     *function for error message to the user on some of the query error.
     */

    "resError": function (varError) {
        "use strict";

        var intIndex = objMessages.ErrorMessages.indexOf(varError);

        return {
            "response": false,
            "response_code": varError,
            "response_type": objMessages.ErrorMessages[intIndex + 1].Type,
            "response_message": objMessages.ErrorMessages[intIndex + 1].Message
        };
    },

    /**
     * function for success message to the user to any successful operation.
     */
    "resSuccess": function (varSuccessData) {
        "use strict";

        var intIndex = objMessages.SuccessMessages.indexOf(varSuccessData);

        var arrResult = null;
        var headerSuc = {
            "response": true
        };

        var arrfooterSuc = [];
        if (typeof varSuccessData === "object" || typeof varSuccessData === "array") {
            arrfooterSuc = {
                "response_code": "S000",
                "response_type": objMessages.SuccessMessages[intIndex + 1].Type,
                "response_data": varSuccessData
            };
            arrResult = _.extend(headerSuc, arrfooterSuc);
        } else if (typeof varSuccessData === "string") {
            arrfooterSuc = {
                "response_code": varSuccessData,
                "response_type": objMessages.SuccessMessages[intIndex + 1].Type,
                "response_message": objMessages.SuccessMessages[intIndex + 1].Message
            };
            arrResult = _.extend(headerSuc, arrfooterSuc);
        }
        return arrResult;
    },

};
