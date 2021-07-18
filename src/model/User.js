"use strict";
exports.__esModule = true;
exports["default"] = void 0;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1["default"].Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: mongoose_1["default"].Types.ObjectId,
        ref: "ImageHash"
    }
});
var User = mongoose_1["default"].model("User", userSchema);
exports["default"] = User;
