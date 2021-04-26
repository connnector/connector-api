import {
  signUp,
  login,
  deleteUser,
  updateUser,
} from "./Mutations/UserMutation";
import { createPost, deletePost, updatePost } from "./Mutations/PostMutation";
import {
  createComment,
  updateComment,
  deleteComment,
} from "./Mutations/CommentMutation";
import { startChatting } from "./Mutations/ChatMutation";
import { like } from "./Mutations/LikeMutation";

const Mutation = {
  signUp,
  login,
  deleteUser,
  updateUser,
  createPost,
  deletePost,
  updatePost,
  createComment,
  updateComment,
  deleteComment,
  startChatting,
  like,
};

export { Mutation as default };
