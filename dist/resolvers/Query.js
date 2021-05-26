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
const Post_1 = __importDefault(require("../model/Post"));
const Comment_1 = __importDefault(require("../model/Comment"));
const Like_1 = __importDefault(require("../model/Like"));
const utils_1 = require("../utils");
const Query = {
    users: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
        let allUsers;
        try {
            allUsers = yield User_1.default.find({});
            if (allUsers.length === 0) {
                throw new Error("No users");
            }
            return allUsers;
        }
        catch (e) {
            throw new Error(e);
        }
    }),
    userById: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const reqUser = yield User_1.default.findById(args.idQuery);
            if (!reqUser) {
                throw new Error("Wrong id");
            }
            return reqUser;
        }
        catch (e) {
            throw new Error(e);
        }
    }),
    posts: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
        let { id } = utils_1.getUserId(ctx);
        if (id) {
            let allPosts;
            try {
                allPosts = yield Post_1.default.find({ visibility: "public" }, null, {
                    skip: args.skip,
                    limit: args.limit,
                });
                if (allPosts.length === 0) {
                    throw new Error("No More Posts,Follow others to see more posts");
                }
                for (let i = 0; i < allPosts.length; i++) {
                    let likeExist = yield Like_1.default.findOne({
                        developer: id,
                        post: allPosts[i]._id,
                    });
                    if (likeExist) {
                        allPosts[i] = Object.assign(Object.assign({}, allPosts[i]._doc), { id: allPosts[i]._doc._id, liked: true });
                    }
                    else {
                        allPosts[i] = Object.assign(Object.assign({}, allPosts[i]._doc), { id: allPosts[i]._doc._id, liked: false });
                    }
                }
                return allPosts;
            }
            catch (e) {
                throw new Error(e);
            }
        }
        else {
            throw new utils_1.AuthError();
        }
    }),
    postById: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const reqPost = yield Post_1.default.findById(args.idQuery);
            if (!reqPost) {
                throw new Error("Wrong id");
            }
            return reqPost;
        }
        catch (e) {
            throw new Error(e);
        }
    }),
    comments: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const postExists = yield Post_1.default.findOne({
                _id: args.idOfPost,
                visibility: "public",
            });
            if (!postExists) {
                throw new Error("Post Does Not Exist or is private");
            }
            const comments = yield Comment_1.default.find({
                postId: args.idOfPost,
            });
            if (comments.length === 0) {
                throw new Error("No comments on this post");
            }
            return comments;
        }
        catch (e) {
            throw new Error(e);
        }
    }),
};
exports.default = Query;
//# sourceMappingURL=Query.js.map