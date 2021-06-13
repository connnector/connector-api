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
exports.startChatting = void 0;
const Chat_1 = __importDefault(require("../../model/Chat"));
const User_1 = __importDefault(require("../../model/User"));
const ChatData_1 = __importDefault(require("../../model/ChatData"));
const authCheck_1 = require("../../helper_functions/authCheck");
const mongoose_1 = require("mongoose");
const startChatting = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    authCheck_1.authCheck(context);
    const recieverExist = yield User_1.default.findOne({ userName: args.data.user2 });
    if (!recieverExist) {
        throw new Error("reciever doesnot exist");
    }
    let chat = null;
    let newChatData = null;
    try {
        const sess = yield mongoose_1.startSession();
        sess.startTransaction();
        chat = yield Chat_1.default.findOne({
            $or: [
                { user1: context.userName, user2: args.data.user2 },
                { user1: args.data.user2, user2: context.userName },
            ],
        });
        if (!chat) {
            chat = new Chat_1.default({
                user1: context.userName,
                user2: args.data.user2,
            });
            yield chat.save({ session: sess });
        }
        newChatData = new ChatData_1.default({
            user: context.userName,
            text: args.data.text,
            parentChat: chat.id,
        });
        yield newChatData.save({ session: sess });
        yield sess.commitTransaction();
    }
    catch (e) {
        throw new Error(e);
    }
    context.pubsub.publish(`chat ${newChatData.parentChat}`, {
        liveChat: newChatData,
    });
    return chat;
});
exports.startChatting = startChatting;
//# sourceMappingURL=ChatMutation.js.map