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
exports.updateComment = exports.deleteComment = exports.createComment = void 0;
const Repo_1 = __importDefault(require("../../model/Repo"));
const Comment_1 = __importDefault(require("../../model/Comment"));
const utils_1 = require("../../utils");
const createComment = (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = utils_1.getUserId(ctx);
    if (id) {
        try {
            const repoValid = yield Repo_1.default.find({
                id: args.data.idOfRepo,
                visibility: "public",
            });
            if (!repoValid) {
                throw new Error("Repo is either private or doesnot exist");
            }
            const newComment = yield Comment_1.default.create({
                text: args.data.text,
                developer: id,
                repoId: args.data.idOfRepo,
                likes: 0,
                comments: 0,
            });
            return newComment;
        }
        catch (e) {
            throw new Error(e);
        }
    }
    else {
        throw new utils_1.AuthError();
    }
});
exports.createComment = createComment;
const deleteComment = (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
    let id = utils_1.getUserId(ctx);
    if (id) {
        try {
            const existingComment = yield Comment_1.default.findByIdAndDelete(args.commentId);
            if (!existingComment) {
                throw new Error("Comment Not Found");
            }
            return existingComment;
        }
        catch (e) {
            throw new Error(e);
        }
    }
    else {
        throw new utils_1.AuthError();
    }
});
exports.deleteComment = deleteComment;
const updateComment = (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
    let id = utils_1.getUserId(ctx);
    if (id) {
        try {
            let reqComment = yield Comment_1.default.findByIdAndUpdate(args.commentId, Object.assign({}, args.data));
            if (!reqComment) {
                throw new Error("Comment not found or invalid update fields");
            }
            return reqComment;
        }
        catch (e) {
            throw new Error(e);
        }
    }
    else {
        throw new utils_1.AuthError();
    }
});
exports.updateComment = updateComment;
//# sourceMappingURL=CommentMutation.js.map