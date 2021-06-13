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
exports.default = void 0;
const Chat_1 = __importDefault(require("../../model/Chat"));
const authCheck_1 = require("../../helper_functions/authCheck");
const Subscription = {
    liveChat: {
        subscribe: (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
            authCheck_1.authCheck(context);
            const chat = yield Chat_1.default.findById(args.chatId);
            if (!chat) {
                throw new Error("Invalid chat id");
            }
            return context.pubsub.asyncIterator(`chat ${args.chatId}`);
        }),
    },
};
exports.default = Subscription;
//# sourceMappingURL=Subscription.js.map