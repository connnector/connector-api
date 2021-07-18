"use strict";
exports.__esModule = true;
exports["default"] = void 0;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1["default"].Schema;
var likeSchema = new Schema({
    developer: { type: mongoose_1["default"].Types.ObjectId, required: true, rep: "User" },
    post: { type: mongoose_1["default"].Types.ObjectId, required: true, ref: "Post" }
});
var Like = mongoose_1["default"].model("Like", likeSchema);
exports["default"] = Like;
