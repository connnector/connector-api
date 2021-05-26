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
const Post_1 = __importDefault(require("../model/Post"));
const Comment_1 = __importDefault(require("../model/Comment"));
const User = {
    posts: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
        if (args.visibility === "ALL") {
            try {
                const posts = yield Post_1.default.find({ developer: args._id });
                return posts;
            }
            catch (e) {
                throw new Error(e);
            }
        }
        try {
            const posts = yield Post_1.default.find({
                developer: args._id,
                visibility: args.visibility.toLowerCase(),
            });
            return posts;
        }
        catch (e) {
            throw new Error(e);
        }
    }),
    comments: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const postExists = yield Post_1.default.findById(args.idOfPost);
            if (!postExists) {
                throw new Error("Post does not exist");
            }
            if (postExists.visibility === "private") {
                throw new Error("Post is Private");
            }
        }
        catch (e) {
            throw new Error(e);
        }
        try {
            const comments = yield Comment_1.default.find({
                developer: parent.id,
                postId: args.idOfPost,
            });
            return comments;
        }
        catch (e) {
            throw new Error(e);
        }
    }),
};
exports.default = User;
//# sourceMappingURL=User.js.map