import { signUp, deleteUser, updateUser } from "./Mutations/UserMutation";
import { createRepo, deleteRepo, updateRepo } from "./Mutations/RepoMutation";
import {
  createComment,
  updateComment,
  deleteComment,
} from "./Mutations/CommentMutation";
import { startChatting } from "./Mutations/ChatMutation";

const Mutation = {
  signUp,
  deleteUser,
  updateUser,
  createRepo,
  deleteRepo,
  updateRepo,
  createComment,
  updateComment,
  deleteComment,
  startChatting,
};

export { Mutation as default };
