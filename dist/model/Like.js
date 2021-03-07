"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const likeSchema = new Schema({
    developer: { type: mongoose_1.default.Types.ObjectId, required: true, rep: "User" },
    repoId: { type: mongoose_1.default.Types.ObjectId, required: true, ref: "Repo" },
});
const Like = mongoose_1.default.model("Like", likeSchema);
exports.default = Like;
//# sourceMappingURL=Like.js.map