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
exports.like = void 0;
const Like_1 = __importDefault(require("../../model/Like"));
const Repo_1 = __importDefault(require("../../model/Repo"));
const utils_1 = require("../../utils");
const like = (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = utils_1.getUserId(ctx);
    if (id) {
        try {
            const repoValid = yield Repo_1.default.find({
                id: args.data.repoId,
                visibility: "public",
            });
            if (!repoValid) {
                throw new Error("Repo is either private or doesnot exist");
            }
            const alreadyLiked = Like_1.default.findOne({
                repo: args.data.repoId,
                developer: id,
            });
            if (alreadyLiked) {
                (yield alreadyLiked).delete;
                repoValid.likes = repoValid.likes + 1;
            }
            else {
                const newLike = new Like_1.default({
                    repo: args.data.repoId,
                    developer: id,
                });
                yield newLike.save();
                repoValid.likes = repoValid.likes + 1;
            }
            return repoValid.likes;
        }
        catch (e) {
            throw new Error(e);
        }
    }
    else {
        throw new utils_1.AuthError();
    }
});
exports.like = like;
//# sourceMappingURL=LikeMutation.js.map