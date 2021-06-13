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
exports.updateUser = exports.deleteUser = exports.login = exports.signUp = exports.sendOtp = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../../model/User"));
const Otp_1 = __importDefault(require("../../model/Otp"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../../utils");
const sendMail_1 = require("../../helper_functions/sendMail");
// import { confirmOtp } from "../../helper_functions/confirmOtp";
const confirmOtp = (databaseId, otp) => __awaiter(void 0, void 0, void 0, function* () {
    let otp_object;
    //finding otp with given fields
    try {
        otp_object = yield Otp_1.default.findOne({ _id: databaseId });
    }
    catch (e) {
        throw new Error(e);
    }
    if (!otp_object) {
        throw new Error("Incorrect Otp");
    }
    if (otp_object.text !== otp) {
        throw new Error("Incorrect Otp");
    }
    return otp_object;
});
const sendOtp = (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
    // let existingUser;
    const email = args.data.email.toLowerCase();
    // try {
    //   existingUser = await User.findOne({ email: args.data.email });
    // } catch (e) {
    //   throw new Error(e);
    // }
    // if (existingUser) {
    //   throw new Error("Username or email already in use");
    // }
    const otp = yield sendMail_1.sendConfirmationEmail(email);
    const otp_already_sent_previously = yield Otp_1.default.findOne({ email });
    if (otp_already_sent_previously) {
        if (args.data.password) {
            try {
                otp_already_sent_previously.password = yield bcryptjs_1.default.hash(args.data.password, 12);
            }
            catch (e) {
                throw new Error();
            }
        }
        try {
            otp_already_sent_previously.text = otp;
        }
        catch (e) {
            throw new Error(e);
        }
        yield otp_already_sent_previously.save();
        return { databaseId: otp_already_sent_previously._id };
    }
    let hashedPassword;
    try {
        hashedPassword = yield bcryptjs_1.default.hash(args.data.password, 12);
    }
    catch (e) {
        throw new Error();
    }
    let otp_object;
    try {
        otp_object = new Otp_1.default({
            text: otp,
            email: args.data.email,
            password: hashedPassword,
        });
    }
    catch (e) {
        throw new Error(e);
    }
    yield otp_object.save();
    return { databaseId: otp_object._id };
});
exports.sendOtp = sendOtp;
const signUp = (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
    let newUser;
    const otp_object = yield confirmOtp(args.databaseId, args.otp);
    try {
        newUser = yield User_1.default.create(Object.assign(Object.assign({}, args.userData), { email: otp_object.email, password: otp_object.password }));
    }
    catch (e) {
        throw new Error(e);
    }
    const token = jsonwebtoken_1.default.sign({ id: newUser._id, userName: newUser.userName }, process.env.SECRET);
    try {
        yield Otp_1.default.deleteOne({
            _id: otp_object.id,
        });
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
});
exports.signUp = signUp;
const login = (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield User_1.default.findOne({ email: args.email });
        if (!existingUser) {
            throw new Error("User doesNot exist");
        }
        const match = yield bcryptjs_1.default.compare(args.password, existingUser.password);
        if (!match) {
            throw new Error("Incorrect password");
        }
        const token = jsonwebtoken_1.default.sign({ id: existingUser._id, userName: existingUser.userName }, process.env.SECRET);
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
});
exports.login = login;
const deleteUser = (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = utils_1.getUserId(ctx);
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
    let { id } = utils_1.getUserId(ctx);
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