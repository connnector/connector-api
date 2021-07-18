"use strict";
exports.__esModule = true;
exports["default"] = void 0;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1["default"].Schema;
var chatDataSchema = new Schema({
    user: { type: String, required: true },
    text: { type: String, required: true },
    parentChat: { type: mongoose_1["default"].Types.ObjectId, required: true, ref: "Chat" }
});
var ChatData = mongoose_1["default"].model("ChatData", chatDataSchema);
exports["default"] = ChatData;
