"use strict";
exports.__esModule = true;
exports["default"] = void 0;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var otpSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});
var Otp = mongoose.model("Otp", otpSchema);
exports["default"] = Otp;
