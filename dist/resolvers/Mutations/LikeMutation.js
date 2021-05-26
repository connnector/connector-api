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
const Post_1 = __importDefault(require("../../model/Post"));
const utils_1 = require("../../utils");
const like = (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = utils_1.getUserId(ctx);
    if (id) {
        try {
            const postValid = yield Post_1.default.findOne({
                _id: args.postId,
                visibility: "public",
            });
            if (!postValid) {
                throw new Error("Post is either private or doesnot exist");
            }
            const alreadyLiked = yield Like_1.default.findOne({
                post: args.postId,
                developer: id,
            });
            if (alreadyLiked) {
                yield alreadyLiked.delete();
                postValid.likes = postValid.likes - 1;
                yield postValid.save();
            }
            else {
                const newLike = new Like_1.default({
                    post: args.postId,
                    developer: id,
                });
                yield newLike.save();
                postValid.likes = postValid.likes + 1;
                yield postValid.save();
            }
            return { number: postValid.likes };
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