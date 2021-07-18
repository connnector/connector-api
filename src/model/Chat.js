"use strict";
exports.__esModule = true;
exports["default"] = void 0;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1["default"].Schema;
var chatSchema = new Schema({
    user1: { type: String, required: true },
    user2: { type: String, required: true }
});
var Chat = mongoose_1["default"].model("Chat", chatSchema);
exports["default"] = Chat;
