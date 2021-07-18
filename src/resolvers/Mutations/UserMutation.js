"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.updateUser = exports.deleteUser = exports.login = exports.signUp = exports.sendOtp = void 0;
var bcryptjs_1 = require("bcryptjs");
var User_1 = require("../../model/User");
var Otp_1 = require("../../model/Otp");
var jsonwebtoken_1 = require("jsonwebtoken");
var utils_1 = require("../../utils");
var sendMail_1 = require("../../helper_functions/sendMail");
// import { confirmOtp } from "../../helper_functions/confirmOtp";
var confirmOtp = function (databaseId, otp) { return __awaiter(void 0, void 0, void 0, function () {
    var otp_object, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Otp_1["default"].findOne({ _id: databaseId })];
            case 1:
                otp_object = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                throw new Error(e_1);
            case 3:
                if (!otp_object) {
                    throw new Error("Incorrect Otp");
                }
                if (otp_object.text !== otp) {
                    throw new Error("Incorrect Otp");
                }
                return [2 /*return*/, otp_object];
        }
    });
}); };
var sendOtp = function (parent, args, ctx, info) { return __awaiter(void 0, void 0, void 0, function () {
    var email, otp, otp_already_sent_previously, _a, e_2, hashedPassword, e_3, otp_object;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                email = args.data.email.toLowerCase();
                return [4 /*yield*/, sendMail_1.sendConfirmationEmail(email)];
            case 1:
                otp = _b.sent();
                return [4 /*yield*/, Otp_1["default"].findOne({ email: email })];
            case 2:
                otp_already_sent_previously = _b.sent();
                if (!otp_already_sent_previously) return [3 /*break*/, 8];
                if (!args.data.password) return [3 /*break*/, 6];
                _b.label = 3;
            case 3:
                _b.trys.push([3, 5, , 6]);
                _a = otp_already_sent_previously;
                return [4 /*yield*/, bcryptjs_1["default"].hash(args.data.password, 12)];
            case 4:
                _a.password = _b.sent();
                return [3 /*break*/, 6];
            case 5:
                e_2 = _b.sent();
                throw new Error();
            case 6:
                try {
                    otp_already_sent_previously.text = otp;
                }
                catch (e) {
                    throw new Error(e);
                }
                return [4 /*yield*/, otp_already_sent_previously.save()];
            case 7:
                _b.sent();
                return [2 /*return*/, { databaseId: otp_already_sent_previously._id }];
            case 8:
                _b.trys.push([8, 10, , 11]);
                return [4 /*yield*/, bcryptjs_1["default"].hash(args.data.password, 12)];
            case 9:
                hashedPassword = _b.sent();
                return [3 /*break*/, 11];
            case 10:
                e_3 = _b.sent();
                throw new Error();
            case 11:
                try {
                    otp_object = new Otp_1["default"]({
                        text: otp,
                        email: args.data.email,
                        password: hashedPassword
                    });
                }
                catch (e) {
                    throw new Error(e);
                }
                return [4 /*yield*/, otp_object.save()];
            case 12:
                _b.sent();
                return [2 /*return*/, { databaseId: otp_object._id }];
        }
    });
}); };
exports.sendOtp = sendOtp;
var signUp = function (parent, args, ctx, info) { return __awaiter(void 0, void 0, void 0, function () {
    var newUser, otp_object, e_4, token, e_5, returnData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, confirmOtp(args.databaseId, args.otp)];
            case 1:
                otp_object = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, User_1["default"].create(__assign(__assign({}, args.userData), { email: otp_object.email, password: otp_object.password }))];
            case 3:
                newUser = _a.sent();
                return [3 /*break*/, 5];
            case 4:
                e_4 = _a.sent();
                throw new Error(e_4);
            case 5:
                token = jsonwebtoken_1["default"].sign({ id: newUser._id, userName: newUser.userName }, process.env.SECRET);
                _a.label = 6;
            case 6:
                _a.trys.push([6, 8, , 9]);
                return [4 /*yield*/, Otp_1["default"].deleteOne({
                        _id: otp_object.id
                    })];
            case 7:
                _a.sent();
                return [3 /*break*/, 9];
            case 8:
                e_5 = _a.sent();
                throw new Error(e_5);
            case 9:
                returnData = {
                    user: newUser,
                    token: token,
                    expirationTime: 1
                };
                return [2 /*return*/, returnData];
        }
    });
}); };
exports.signUp = signUp;
var login = function (parent, args, ctx, info) { return __awaiter(void 0, void 0, void 0, function () {
    var existingUser, match, token, returnData, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, User_1["default"].findOne({ email: args.email })];
            case 1:
                existingUser = _a.sent();
                if (!existingUser) {
                    throw new Error("User doesNot exist");
                }
                return [4 /*yield*/, bcryptjs_1["default"].compare(args.password, existingUser.password)];
            case 2:
                match = _a.sent();
                if (!match) {
                    throw new Error("Incorrect password");
                }
                token = jsonwebtoken_1["default"].sign({ id: existingUser._id, userName: existingUser.userName }, process.env.SECRET);
                returnData = {
                    user: existingUser,
                    token: token,
                    expirationTime: 1
                };
                return [2 /*return*/, returnData];
            case 3:
                e_6 = _a.sent();
                throw new Error(e_6);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var deleteUser = function (parent, args, ctx, info) { return __awaiter(void 0, void 0, void 0, function () {
    var id, existingUser, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = utils_1.getUserId(ctx).id;
                if (!id) return [3 /*break*/, 5];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User_1["default"].findByIdAndDelete(id)];
            case 2:
                existingUser = _a.sent();
                if (!existingUser) {
                    throw new Error("User Does Not exist");
                }
                return [2 /*return*/, existingUser];
            case 3:
                e_7 = _a.sent();
                throw new Error(e_7);
            case 4: return [3 /*break*/, 6];
            case 5: throw new utils_1.AuthError();
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
var updateUser = function (parent, args, ctx, info) { return __awaiter(void 0, void 0, void 0, function () {
    var id, emailTaken, reqUser, e_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = utils_1.getUserId(ctx).id;
                if (!id) return [3 /*break*/, 7];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                if (!args.updateData.email) return [3 /*break*/, 3];
                return [4 /*yield*/, User_1["default"].findOne({
                        email: args.updateData.email
                    })];
            case 2:
                emailTaken = _a.sent();
                if (emailTaken) {
                    throw new Error("Email Already taken");
                }
                _a.label = 3;
            case 3: return [4 /*yield*/, User_1["default"].findByIdAndUpdate(id, __assign({}, args.updateData))];
            case 4:
                reqUser = _a.sent();
                if (!reqUser) {
                    throw new Error("User not found");
                }
                return [2 /*return*/, reqUser];
            case 5:
                e_8 = _a.sent();
                throw new Error(e_8);
            case 6: return [3 /*break*/, 8];
            case 7: throw new utils_1.AuthError();
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
