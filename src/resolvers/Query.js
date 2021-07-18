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
exports["default"] = void 0;
var User_1 = require("../model/User");
var Post_1 = require("../model/Post");
var Comment_1 = require("../model/Comment");
var Like_1 = require("../model/Like");
var utils_1 = require("../utils");
var Query = {
    users: function (parent, args, ctx, info) { return __awaiter(void 0, void 0, void 0, function () {
        var allUsers, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, User_1["default"].find({})];
                case 1:
                    allUsers = _a.sent();
                    if (allUsers.length === 0) {
                        throw new Error("No users");
                    }
                    return [2 /*return*/, allUsers];
                case 2:
                    e_1 = _a.sent();
                    throw new Error(e_1);
                case 3: return [2 /*return*/];
            }
        });
    }); },
    userById: function (parent, args, ctx, info) { return __awaiter(void 0, void 0, void 0, function () {
        var reqUser, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, User_1["default"].findById(args.idQuery)];
                case 1:
                    reqUser = _a.sent();
                    if (!reqUser) {
                        throw new Error("Wrong id");
                    }
                    return [2 /*return*/, reqUser];
                case 2:
                    e_2 = _a.sent();
                    throw new Error(e_2);
                case 3: return [2 /*return*/];
            }
        });
    }); },
    posts: function (parent, args, ctx, info) { return __awaiter(void 0, void 0, void 0, function () {
        var id, allPosts, i, likeExist, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = utils_1.getUserId(ctx).id;
                    if (!id) return [3 /*break*/, 9];
                    allPosts = void 0;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, Post_1["default"].find({ visibility: "public" }, null, {
                            skip: args.skip,
                            limit: args.limit
                        })];
                case 2:
                    allPosts = _a.sent();
                    if (allPosts.length === 0) {
                        throw new Error("No More Posts,Follow others to see more posts");
                    }
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < allPosts.length)) return [3 /*break*/, 6];
                    return [4 /*yield*/, Like_1["default"].findOne({
                            developer: id,
                            post: allPosts[i]._id
                        })];
                case 4:
                    likeExist = _a.sent();
                    if (likeExist) {
                        allPosts[i] = __assign(__assign({}, allPosts[i]._doc), { id: allPosts[i]._doc._id, liked: true });
                    }
                    else {
                        allPosts[i] = __assign(__assign({}, allPosts[i]._doc), { id: allPosts[i]._doc._id, liked: false });
                    }
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 3];
                case 6: return [2 /*return*/, allPosts];
                case 7:
                    e_3 = _a.sent();
                    throw new Error(e_3);
                case 8: return [3 /*break*/, 10];
                case 9: throw new utils_1.AuthError();
                case 10: return [2 /*return*/];
            }
        });
    }); },
    postById: function (parent, args, ctx, info) { return __awaiter(void 0, void 0, void 0, function () {
        var reqPost, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Post_1["default"].findById(args.idQuery)];
                case 1:
                    reqPost = _a.sent();
                    if (!reqPost) {
                        throw new Error("Wrong id");
                    }
                    return [2 /*return*/, reqPost];
                case 2:
                    e_4 = _a.sent();
                    throw new Error(e_4);
                case 3: return [2 /*return*/];
            }
        });
    }); },
    comments: function (parent, args, ctx, info) { return __awaiter(void 0, void 0, void 0, function () {
        var postExists, comments, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, Post_1["default"].findOne({
                            _id: args.idOfPost,
                            visibility: "public"
                        })];
                case 1:
                    postExists = _a.sent();
                    if (!postExists) {
                        throw new Error("Post Does Not Exist or is private");
                    }
                    return [4 /*yield*/, Comment_1["default"].find({
                            postId: args.idOfPost
                        })];
                case 2:
                    comments = _a.sent();
                    if (comments.length === 0) {
                        throw new Error("No comments on this post");
                    }
                    return [2 /*return*/, comments];
                case 3:
                    e_5 = _a.sent();
                    throw new Error(e_5);
                case 4: return [2 /*return*/];
            }
        });
    }); }
};
exports["default"] = Query;
