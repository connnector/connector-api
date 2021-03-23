import {
  signUp,
  login,
  deleteUser,
  updateUser,
} from "./Mutations/UserMutation";
import { createRepo, deleteRepo, updateRepo } from "./Mutations/RepoMutation";
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
  createRepo,
  deleteRepo,
  updateRepo,
  createComment,
  updateComment,
  deleteComment,
  startChatting,
  like,
};

export { Mutation as default };
