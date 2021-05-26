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
const Comment = {
    post: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield Post_1.default.findById(parent.postId);
        }
        catch (e) {
            throw new Error(e);
        }
    }),
    developer: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield User_1.default.findById(parent.developer);
        }
        catch (e) {
            throw new Error(e);
        }
    }),
};
exports.default = Comment;
//# sourceMappingURL=Comment.js.map