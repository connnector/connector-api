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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../model/User"));
const Repo_1 = __importDefault(require("../model/Repo"));
const Comment_1 = __importDefault(require("../model/Comment"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Mutation = {
    signUp: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
        let existingUser;
        try {
            existingUser = yield User_1.default.findOne({ email: args.userData.email });
        }
        catch (e) {
            throw new Error(e);
        }
        if (existingUser) {
            throw new Error("user already exists");
        }
        let hashedPassword;
        try {
            hashedPassword = yield bcryptjs_1.default.hash(args.userData.password, 12);
        }
        catch (e) {
            throw new Error();
        }
        let newUser;
        const token = jsonwebtoken_1.default.sign({ name: args.userData.name, email: args.userData.email }, "unexpectable bitch");
        try {
            newUser = yield User_1.default.create(Object.assign(Object.assign({}, args.userData), { password: hashedPassword }));
        }
        catch (e) {
            throw new Error(e);
        }
        const returnData = {
            user: newUser,
            token,
            expirationTime: 1,
        };
        return returnData;
    }),
    deleteUser: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const existingUser = yield User_1.default.findByIdAndDelete(args.userId);
            if (!existingUser) {
                throw new Error("User Does Not exist");
            }
            return existingUser;
        }
        catch (e) {
            throw new Error(e);
        }
    }),
    updateUser: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (args.updateData.email) {
                const emailTaken = yield User_1.default.findOne({ email: args.updateData.email });
                if (emailTaken) {
                    throw new Error("Email Already taken");
                }
            }
            const reqUser = yield User_1.default.findByIdAndUpdate(args.userId, Object.assign({}, args.updateData));
            if (!reqUser) {
                throw new Error("User not found");
            }
            return reqUser;
        }
        catch (e) {
            throw new Error(e);
        }
    }),
    createRepo: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
        if (!ctx.authenticated) {
            throw new Error("Not Authenticated");
        }
        try {
            const userExists = yield User_1.default.findById(args.repoData.developer);
            if (!userExists) {
                throw new Error("No developer with this id");
            }
        }
        catch (e) {
            throw new Error(e);
        }
        let newRepo;
        try {
            const titleTaken = yield Repo_1.default.findOne({
                title: args.repoData.title,
                developer: args.repoData.developer,
            });
            if (titleTaken) {
                throw new Error("title already taken");
            }
        }
        catch (e) {
            throw new Error(e);
        }
        try {
            newRepo = Repo_1.default.create(Object.assign({}, args.repoData));
        }
        catch (e) {
            throw new Error(e);
        }
        return newRepo;
    }),
    deleteRepo: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const existingRepo = yield Repo_1.default.findByIdAndDelete(args.repoId);
            if (!existingRepo) {
                throw new Error("Repo Not Found");
            }
            return existingRepo;
        }
        catch (e) {
            throw new Error(e);
        }
    }),
    updateRepo: (parent, args, db, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let reqRepo = yield Repo_1.default.findByIdAndUpdate(args.repoId, Object.assign({}, args.updateData));
            if (!reqRepo) {
                throw new Error("Repo not found or invalid update fields");
            }
            return reqRepo;
        }
        catch (e) {
            throw new Error(e);
        }
    }),
    createComment: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userExists = yield User_1.default.findById(args.data.developer);
            if (!userExists) {
                throw new Error("User doesnot exist");
            }
            const repoValid = yield Repo_1.default.find({
                id: args.data.idOfRepo,
                visibility: "public",
            });
            if (!repoValid) {
                throw new Error("Repo is either private or doesnot exist");
            }
            const newComment = yield Comment_1.default.create({
                text: args.data.text,
                developer: args.data.developer,
                repoId: args.data.idOfRepo,
            });
            return newComment;
        }
        catch (e) {
            throw new Error(e);
        }
    }),
    deleteComment: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
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
    }),
    updateComment: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
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
    }),
};
exports.default = Mutation;
//# sourceMappingURL=Mutation.js.map