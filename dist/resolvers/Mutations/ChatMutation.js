"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartChatting = void 0;
const Chat_1 = __importDefault(require("../../model/Chat"));
const ChatData_1 = __importDefault(require("../../model/ChatData"));
const utils_1 = require("../../utils");
const mongoose_1 = require("mongoose");
const StartChatting = (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName } = utils_1.getUserId(ctx);
    if (!userName) {
        throw new utils_1.AuthError();
    }
    let chat;
    try {
        const sess = yield mongoose_1.startSession();
        sess.startTransaction();
        chat =
            (yield Chat_1.default.findOne({ user1: userName, user2: args.data.user2 })) ||
                (yield Chat_1.default.findOne({ user1: args.data.user2, user2: userName }));
        if (!chat) {
            chat = new Chat_1.default({
                user1: userName,
                user2: args.data.user,
            });
            yield chat.save({ session: sess });
        }
        const newChatData = new ChatData_1.default({
            user: userName,
            text: args.data.message,
            parentChat: chat._id,
        });
        yield newChatData.save({ session: sess });
        yield sess.commitTransaction();
    }
    catch (e) {
        throw new Error(e);
    }
    return chat;
});
exports.StartChatting = StartChatting;
//# sourceMappingURL=ChatMutation.js.map