"use strict";
exports.__esModule = true;
exports["default"] = void 0;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1["default"].Schema;
var commentSchema = new Schema({
    text: { type: String, required: true },
    developer: { type: mongoose_1["default"].Types.ObjectId, required: true, rep: "User" },
    postId: { type: mongoose_1["default"].Types.ObjectId, required: true, ref: "Post" }
});
var Comment = mongoose_1["default"].model("Comment", commentSchema);
exports["default"] = Comment;
