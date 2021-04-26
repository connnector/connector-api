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
const User_1 = __importDefault(require("../model/User"));
const Comment_1 = __importDefault(require("../model/Comment"));
const Post = {
    developer: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const developer = yield User_1.default.findById(parent.developer);
            return developer;
        }
        catch (e) {
            throw new Error(e);
        }
    }),
    comments: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const comments = yield Comment_1.default.find({ postId: parent._id });
            return comments;
        }
        catch (e) {
            throw new Error(e);
        }
    }),
};
exports.default = Post;
//# sourceMappingURL=Post.js.map