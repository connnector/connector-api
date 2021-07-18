"use strict";
exports.__esModule = true;
exports["default"] = void 0;
var UserMutation_1 = require("./Mutations/UserMutation");
var PostMutation_1 = require("./Mutations/PostMutation");
var CommentMutation_1 = require("./Mutations/CommentMutation");
var ChatMutation_1 = require("./Mutations/ChatMutation");
var LikeMutation_1 = require("./Mutations/LikeMutation");
var Mutation = {
    sendOtp: UserMutation_1.sendOtp,
    signUp: UserMutation_1.signUp,
    login: UserMutation_1.login,
    deleteUser: UserMutation_1.deleteUser,
    updateUser: UserMutation_1.updateUser,
    createPost: PostMutation_1.createPost,
    deletePost: PostMutation_1.deletePost,
    updatePost: PostMutation_1.updatePost,
    createComment: CommentMutation_1.createComment,
    updateComment: CommentMutation_1.updateComment,
    deleteComment: CommentMutation_1.deleteComment,
    startChatting: ChatMutation_1.startChatting,
    like: LikeMutation_1.like
};
exports["default"] = Mutation;
