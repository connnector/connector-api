"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const commentSchema = new Schema({
    text: { type: String, required: true },
    developer: { type: mongoose_1.default.Types.ObjectId, required: true, rep: "User" },
    repoId: { type: mongoose_1.default.Types.ObjectId, required: true, ref: "Repo" },
});
const Comment = mongoose_1.default.model("Comment", commentSchema);
exports.default = Comment;
//# sourceMappingURL=Comment.js.map