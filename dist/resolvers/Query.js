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
const Repo_1 = __importDefault(require("../model/Repo"));
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
    repos: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
        let { id } = utils_1.getUserId(ctx);
        if (id) {
            let allRepos;
            try {
                allRepos = yield Repo_1.default.find({ visibility: "public" }, null, {
                    skip: args.skip,
                    limit: args.limit,
                });
                if (allRepos.length === 0) {
                    throw new Error("No More Posts,Follow others to see more posts");
                }
                for (let i = 0; i < allRepos.length; i++) {
                    let likeExist = yield Like_1.default.findOne({
                        developer: id,
                        repo: allRepos[i]._id,
                    });
                    if (likeExist) {
                        allRepos[i] = Object.assign(Object.assign({}, allRepos[i]._doc), { id: allRepos[i]._doc._id, liked: true });
                    }
                    else {
                        allRepos[i] = Object.assign(Object.assign({}, allRepos[i]._doc), { id: allRepos[i]._doc._id, liked: false });
                    }
                }
                return allRepos;
            }
            catch (e) {
                throw new Error(e);
            }
        }
        else {
            throw new utils_1.AuthError();
        }
    }),
    repoById: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const reqRepo = yield Repo_1.default.findById(args.idQuery);
            if (!reqRepo) {
                throw new Error("Wrong id");
            }
            return reqRepo;
        }
        catch (e) {
            throw new Error(e);
        }
    }),
    comments: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const repoExists = yield Repo_1.default.findOne({
                _id: args.idOfRepo,
                visibility: "public",
            });
            if (!repoExists) {
                throw new Error("Repo Does Not Exist or is private");
            }
            const comments = yield Comment_1.default.find({
                repoId: args.idOfRepo,
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