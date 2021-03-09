"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const repoSchema = new Schema({
    title: { type: String, required: true },
    visibility: { type: String, required: true },
    desc: { type: String, required: true },
    developer: { type: mongoose_1.default.Types.ObjectId, required: true, ref: "User" },
    likes: { type: Number, required: true },
    totalComments: { type: Number, required: true },
}, {
    timestamps: true,
});
const Repo = mongoose_1.default.model("Repo", repoSchema);
exports.default = Repo;
//# sourceMappingURL=Repo.js.map