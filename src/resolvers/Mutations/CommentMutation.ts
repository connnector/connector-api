import Repo from "../../model/Repo";
import Comment from "../../model/Comment";
import { Context, getUserId, AuthError } from "../../utils";

export const createComment = async (
  parent,
  args: { data: { text: string; idOfRepo: string } },
  ctx: Context,
  info
): Promise<object> => {
  let id = getUserId(ctx);
  if (id) {
    try {
      const repoValid = await Repo.find({
        id: args.data.idOfRepo,
        visibility: "public",
      });
      if (!repoValid) {
        throw new Error("Repo is either private or doesnot exist");
      }
      const newComment: object = await Comment.create({
        text: args.data.text,
        developer: id,
        repoId: args.data.idOfRepo,
      });

      return newComment;
    } catch (e) {
      throw new Error(e);
    }
  } else {
    throw new AuthError();
  }
};
export const deleteComment = async (
  parent,
  args: { commentId: string },
  ctx: Context,
  info
): Promise<object> => {
  let id = getUserId(ctx);
  if (id) {
    try {
      const existingComment: object = await Comment.findByIdAndDelete(
        args.commentId
      );
      if (!existingComment) {
        throw new Error("Comment Not Found");
      }
      return existingComment;
    } catch (e) {
      throw new Error(e);
    }
  } else {
    throw new AuthError();
  }
};
export const updateComment = async (
  parent,
  args: { commentId: string; data: { text: string } },
  ctx: Context,
  info
): Promise<object> => {
  let id = getUserId(ctx);
  if (id) {
    try {
      let reqComment = await Comment.findByIdAndUpdate(args.commentId, {
        ...args.data,
      });
      if (!reqComment) {
        throw new Error("Comment not found or invalid update fields");
      }
      return reqComment;
    } catch (e) {
      throw new Error(e);
    }
  } else {
    throw new AuthError();
  }
};
