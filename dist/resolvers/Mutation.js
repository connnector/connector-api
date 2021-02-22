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
const Mutation = {
    createUser: (parent, args, { db }, info) => __awaiter(void 0, void 0, void 0, function* () {
        const email = User_1.default.find({ email: args.userData.email });
        if (email) {
            throw new Error("Emial Already Taken");
        }
        const newUser = yield User_1.default.create(Object.assign({}, args.userData));
        return newUser;
    }),
    deleteUser: (parent, args, { db }, info) => {
        const existingUserIndex = db.users.findIndex((x) => x.id === args.userId);
        if (existingUserIndex === -1) {
            throw new Error("User Does Not exist");
        }
        const requiredUser = db.users[existingUserIndex];
        db.repos = db.repos.filter((x) => x.developer !== requiredUser.id);
        db.users = db.users.splice(existingUserIndex, 1);
        return requiredUser;
    },
    updateUser: (parent, args, { db }, info) => {
        const userIndex = db.users.findIndex((x) => x.id === args.userId);
        if (userIndex === -1) {
            throw new Error("User not found");
        }
        db.users[userIndex] = Object.assign(Object.assign({}, db.users[userIndex]), args.updateData);
        return db.users[userIndex];
    },
    createRepo: (parent, args, { db }, info) => {
        console.log(args.repoData);
        const userExists = User_1.default.findById(args.repoData.developer);
        if (!userExists) {
            throw new Error("No developer with this id");
        }
        const newRepo = Repo_1.default.create(Object.assign({}, args.repoData));
        return newRepo;
    },
    deleteRepo: (parent, args, { db }, info) => {
        const existingRepoIndex = db.repos.findIndex((x) => x.id === args.repoId);
        if (existingRepoIndex === -1) {
            throw new Error("Repo Not Found");
        }
        const requiredRepo = db.repos[existingRepoIndex];
        db.repos = db.repos.splice(existingRepoIndex, 1);
        return requiredRepo;
    },
    updateRepo: (parent, args, { db }, info) => {
        const repoIndex = db.repos.findIndex((x) => x.id === args.repoId);
        if (repoIndex === -1) {
            throw new Error("Repo not found");
        }
        db.repos[repoIndex] = Object.assign(Object.assign({}, db.users[repoIndex]), args.updateData);
        return db.repos[repoIndex];
    },
    createComment: (parent, args, { db }, info) => {
        const userExists = User_1.default.findById(args.data.developer);
        if (!userExists) {
            throw new Error("User doesnot exist");
        }
        const repoValid = Repo_1.default.findById(args.data.idOfRepo);
        if (!repoValid) {
            throw new Error("Repo is either private or doesnot exist");
        }
        const newComment = Repo_1.default.create({
            text: args.data.text,
            developer: args.data.developer,
            repoId: args.data.idOfRepo,
        });
        return newComment;
    },
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