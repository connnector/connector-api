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
exports.updatePost = exports.deletePost = exports.createPost = void 0;
const Post_1 = __importDefault(require("../../model/Post"));
const utils_1 = require("../../utils");
const createPost = (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = utils_1.getUserId(ctx);
    if (id) {
        let newPost;
        try {
            const titleTaken = yield Post_1.default.findOne({
                title: args.postData.title,
                developer: id,
            });
            if (titleTaken) {
                throw new Error("title already taken");
            }
        }
        catch (e) {
            throw new Error(e);
        }
        try {
            newPost = Post_1.default.create(Object.assign(Object.assign({}, args.postData), { developer: id, totalComments: 0, likes: 0 }));
        }
        catch (e) {
            throw new Error(e);
        }
        return newPost;
    }
    else {
        throw new utils_1.AuthError();
    }
});
exports.createPost = createPost;
const deletePost = (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = utils_1.getUserId(ctx);
    if (id) {
        try {
            const existingPost = yield Post_1.default.findByIdAndDelete(args.postId);
            if (!existingPost) {
                throw new Error("Post Not Found");
            }
            return existingPost;
        }
        catch (e) {
            throw new Error(e);
        }
    }
    else {
        throw new utils_1.AuthError();
    }
});
exports.deletePost = deletePost;
const updatePost = (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = utils_1.getUserId(ctx);
    if (id) {
        try {
            let reqPost = yield Post_1.default.findByIdAndUpdate(args.postId, Object.assign({}, args.updateData));
            if (!reqPost) {
                throw new Error("Post not found or invalid update fields");
            }
            return reqPost;
        }
        catch (e) {
            throw new Error(e);
        }
    }
    else {
        throw new utils_1.AuthError();
    }
});
exports.updatePost = updatePost;
//# sourceMappingURL=PostMutation.js.map