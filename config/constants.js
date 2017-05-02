// Custom ERROR messages for application
var jsonErrorMessages = [
    "E001", {
        Type: "AUTHENTICATION_FAILED",
        Message: "Authentication failed! Invalid request sent to server."
    },
    "E002", {
        Type: "AUTHORIZATION_FAILED",
        Message: "Authorization failed! Token expired or invalid request sent to server"
    },
    "E003", {
        Type: "INVALID_LOGIN",
        Message: "you have entered invalid login information."
    },
    "E004", {
        Type: "ACCOUNT_ALREADY_EXISTS",
        Message: "Account with same username/email already exists!"
    },
    "E005", {
        Type: "NOT_CREATED",
        Message: "Like is not created"
    },
    "E006", {
        Type: "INVALID_TOKEN",
        Message: "Invalid token sent to sever"
    },
    "E007", {
        Type: "INVALID_CREDENTIALS",
        Message: "you have entered invalid login credentials."
    }
];

// Custom SUCCESS messages for application
var jsonSuccessMessages = [


    "S001", {
        Type: "OK",
        Message: "Success"
    },
    "S002", {
        Type: "NOT_FOUND",
        Message: "No record found!"
    },
    "S003", {
        Type: "LIKED",
        Message: "You liked this offer"
    },
    "S004", {
        Type: "UN_LIKED",
        Message: "You un liked this offer"
    },
    "S005", {
        Type: "FOLLOWED",
        Message: "Now you are following this offer"
    },
    "S006", {
        Type: "UN_FOLLOWED",
        Message: "Now you are not following this offer"
    }
];

var module;
module.exports.constants = {

    ErrorMessages: jsonErrorMessages,
    SuccessMessages: jsonSuccessMessages,
};
