"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const chatSchema = new Schema({
    user1: { type: String, required: true },
    user2: { type: String, required: true },
});
const Chat = mongoose_1.default.model("Chat", chatSchema);
exports.default = Chat;
//# sourceMappingURL=Chat.js.map