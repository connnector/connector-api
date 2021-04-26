"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const UserMutation_1 = require("./Mutations/UserMutation");
const PostMutation_1 = require("./Mutations/PostMutation");
const CommentMutation_1 = require("./Mutations/CommentMutation");
const ChatMutation_1 = require("./Mutations/ChatMutation");
const LikeMutation_1 = require("./Mutations/LikeMutation");
const Mutation = {
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
    like: LikeMutation_1.like,
};
exports.default = Mutation;
//# sourceMappingURL=Mutation.js.map