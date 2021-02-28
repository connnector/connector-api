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
exports.updateUser = exports.deleteUser = exports.signUp = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../../model/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../../utils");
const signUp = (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
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
    try {
        newUser = yield User_1.default.create(Object.assign(Object.assign({}, args.userData), { password: hashedPassword }));
    }
    catch (e) {
        throw new Error(e);
    }
    const token = jsonwebtoken_1.default.sign({ userId: newUser._id, email: newUser.email }, process.env.SECRET);
    const returnData = {
        user: newUser,
        token,
        expirationTime: 1,
    };
    return returnData;
});
exports.signUp = signUp;
const deleteUser = (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
    let id = utils_1.getUserId(ctx);
    if (id) {
        try {
            const existingUser = yield User_1.default.findByIdAndDelete(id);
            if (!existingUser) {
                throw new Error("User Does Not exist");
            }
            return existingUser;
        }
        catch (e) {
            throw new Error(e);
        }
    }
    else {
        throw new utils_1.AuthError();
    }
});
exports.deleteUser = deleteUser;
const updateUser = (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
    let id = utils_1.getUserId(ctx);
    if (id) {
        try {
            if (args.updateData.email) {
                const emailTaken = yield User_1.default.findOne({
                    email: args.updateData.email,
                });
                if (emailTaken) {
                    throw new Error("Email Already taken");
                }
            }
            const reqUser = yield User_1.default.findByIdAndUpdate(id, Object.assign({}, args.updateData));
            if (!reqUser) {
                throw new Error("User not found");
            }
            return reqUser;
        }
        catch (e) {
            throw new Error(e);
        }
    }
    else {
        throw new utils_1.AuthError();
    }
});
exports.updateUser = updateUser;
//# sourceMappingURL=UserMutation.js.map