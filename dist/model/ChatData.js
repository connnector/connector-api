"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const chatDataSchema = new Schema({
    user: { type: String, required: true },
    text: { type: String, required: true },
    parentChat: { type: mongoose_1.default.Types.ObjectId, required: true, ref: "Chat" },
});
const ChatData = mongoose_1.default.model("ChatData", chatDataSchema);
exports.default = ChatData;
//# sourceMappingURL=ChatData.js.map