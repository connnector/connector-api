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
exports.updateRepo = exports.deleteRepo = exports.createRepo = void 0;
const Repo_1 = __importDefault(require("../../model/Repo"));
const utils_1 = require("../../utils");
const createRepo = (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
    let id = utils_1.getUserId(ctx);
    if (id) {
        let newRepo;
        try {
            const titleTaken = yield Repo_1.default.findOne({
                title: args.repoData.title,
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
            newRepo = Repo_1.default.create(Object.assign({}, args.repoData));
        }
        catch (e) {
            throw new Error(e);
        }
        return newRepo;
    }
    else {
        throw new utils_1.AuthError();
    }
});
exports.createRepo = createRepo;
const deleteRepo = (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
    let id = utils_1.getUserId(ctx);
    if (id) {
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
    }
    else {
        throw new utils_1.AuthError();
    }
});
exports.deleteRepo = deleteRepo;
const updateRepo = (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
    let id = utils_1.getUserId(ctx);
    if (id) {
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
    }
    else {
        throw new utils_1.AuthError();
    }
});
exports.updateRepo = updateRepo;
//# sourceMappingURL=RepoMutation.js.map