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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Query = {
    login: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const existingUser = yield User_1.default.findOne({ email: args.email });
            if (!existingUser) {
                throw new Error("User doesNot exist");
            }
            const match = yield bcryptjs_1.default.compare(existingUser.password, args.password);
            if (!match) {
                throw new Error("Incorrect password");
            }
            const token = jsonwebtoken_1.default.sign({ name: existingUser.name, email: existingUser.email }, "unexpectable bitch");
            const returnData = {
                user: existingUser,
                token,
                expirationTime: 1,
            };
            return returnData;
        }
        catch (e) {
            throw new Error(e);
        }
    }),
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
        let allRepos;
        try {
            allRepos = yield Repo_1.default.find({ visibility: "public" });
            if (allRepos.length === 0) {
                throw new Error("No Repos");
            }
            return allRepos;
        }
        catch (e) {
            throw new Error(e);
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