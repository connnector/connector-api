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
const Mutation = {
    createUser: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
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
        let newUser;
        try {
            newUser = yield User_1.default.create(Object.assign({}, args.userData));
        }
        catch (e) {
            throw new Error(e);
        }
        return newUser;
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
    updateUser: (parent, args, { db }, info) => {
        const userIndex = db.users.findIndex((x) => x.id === args.userId);
        if (userIndex === -1) {
            throw new Error("User not found");
        }
        db.users[userIndex] = Object.assign(Object.assign({}, db.users[userIndex]), args.updateData);
        return db.users[userIndex];
    },
    createRepo: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
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
    updateRepo: (parent, args, { db }, info) => {
        const repoIndex = db.repos.findIndex((x) => x.id === args.repoId);
        if (repoIndex === -1) {
            throw new Error("Repo not found");
        }
        db.repos[repoIndex] = Object.assign(Object.assign({}, db.users[repoIndex]), args.updateData);
        return db.repos[repoIndex];
    },
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
            console.log(repoValid);
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
    deleteComment: (parent, args, { db }, info) => {
        const commentExist = db.comments.findIndex((x) => x.id === args.commentId);
        if (commentExist === -1) {
            throw new Error("Comment doesNot exist");
        }
        const deletedComment = db.comments.splice(commentExist, 1);
        return deletedComment;
    },
    updateComment: (parent, args, { db }, info) => {
        const commentExist = db.comments.findIndex((x) => x.id === args.data.commentId);
        if (commentExist === -1) {
            throw new Error("Comment doesNot exist");
        }
        db.comments[commentExist] = Object.assign(Object.assign({}, db.comments[commentExist]), { text: args.data.text });
        return db.comments[commentExist];
    },
};
exports.default = Mutation;
//# sourceMappingURL=Mutation.js.map