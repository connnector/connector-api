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
const Repo_1 = __importDefault(require("../model/Repo"));
const Comment_1 = __importDefault(require("../model/Comment"));
const User = {
    repos: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
        if (args.visibility === "ALL") {
            try {
                const repos = yield Repo_1.default.find({ developer: args._id });
                return repos;
            }
            catch (e) {
                throw new Error(e);
            }
        }
        try {
            const repos = yield Repo_1.default.find({
                developer: args._id,
                visibility: args.visibility.toLowerCase(),
            });
            return repos;
        }
        catch (e) {
            throw new Error(e);
        }
    }),
    comments: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const repoExists = yield Repo_1.default.findById(args.idOfRepo);
            if (!repoExists) {
                throw new Error("Repo does not exist");
            }
            if (repoExists.visibility === "private") {
                throw new Error("Repo is Private");
            }
        }
        catch (e) {
            throw new Error(e);
        }
        try {
            const comments = yield Comment_1.default.find({
                developer: parent.id,
                repoId: args.idOfRepo,
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