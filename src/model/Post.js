"use strict";
exports.__esModule = true;
exports["default"] = void 0;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1["default"].Schema;
var postSchema = new Schema({
    title: { type: String, required: true },
    visibility: { type: String, required: true },
    desc: { type: String, required: true },
    developer: { type: mongoose_1["default"].Types.ObjectId, required: true, ref: "User" },
    image: { type: String, required: true },
    likes: { type: Number, required: true },
    totalComments: { type: Number, required: true }
}, {
    timestamps: true
});
var Post = mongoose_1["default"].model("Post", postSchema);
exports["default"] = Post;
