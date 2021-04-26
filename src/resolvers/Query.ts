import User from "../model/User";
import Post from "../model/Post";
import Comment from "../model/Comment";
import Like from "../model/Like";
import { Document, Model, Mongoose } from "mongoose";
import { getUserId, AuthError } from "../utils";

const Query = {
  users: async (
    parent,
    args: { nameQuery: string },
    ctx,
    info
  ): Promise<Document<any>[]> => {
    let allUsers: Document<any>[];
    try {
      allUsers = await User.find({});
      if (allUsers.length === 0) {
        throw new Error("No users");
      }
      return allUsers;
    } catch (e) {
      throw new Error(e);
    }
  },
  userById: async (
    parent,
    args: { idQuery: string },
    ctx,
    info
  ): Promise<Document<object>> => {
    try {
      const reqUser: Document<object> = await User.findById(args.idQuery);
      if (!reqUser) {
        throw new Error("Wrong id");
      }
      return reqUser;
    } catch (e) {
      throw new Error(e);
    }
  },
  posts: async (
    parent,
    args: { nameQuery: string; skip: number; limit: number },
    ctx,
    info
  ): Promise<Document<any>[]> => {
    let { id } = getUserId(ctx);
    if (id) {
      let allPosts: any;
      try {
        allPosts = await Post.find({ visibility: "public" }, null, {
          skip: args.skip,
          limit: args.limit,
        });
        if (allPosts.length === 0) {
          throw new Error("No More Posts,Follow others to see more posts");
        }

        for (let i = 0; i < allPosts.length; i++) {
          let likeExist: any = await Like.findOne({
            developer: id,
            post: allPosts[i]._id,
          });
          if (likeExist) {
            allPosts[i] = {
              ...allPosts[i]._doc,
              id: allPosts[i]._doc._id,
              liked: true,
            };
          } else {
            allPosts[i] = {
              ...allPosts[i]._doc,
              id: allPosts[i]._doc._id,
              liked: false,
            };
          }
        }

        return allPosts;
      } catch (e) {
        throw new Error(e);
      }
    } else {
      throw new AuthError();
    }
  },
  postById: async (
    parent,
    args: { idQuery: string },
    ctx,
    info
  ): Promise<Document<object>> => {
    try {
      const reqPost: Document<object> = await Post.findById(args.idQuery);
      if (!reqPost) {
        throw new Error("Wrong id");
      }
      return reqPost;
    } catch (e) {
      throw new Error(e);
    }
  },
  comments: async (
    parent,
    args: { idOfPost: string },
    ctx,
    info
  ): Promise<Document<object>[]> => {
    try {
      const postExists: Document<object> = await Post.findOne({
        _id: args.idOfPost,
        visibility: "public",
      });
      if (!postExists) {
        throw new Error("Post Does Not Exist or is private");
      }
      const comments: Document<object>[] = await Comment.find({
        postId: args.idOfPost,
      });
      if (comments.length === 0) {
        throw new Error("No comments on this post");
      }
      return comments;
    } catch (e) {
      throw new Error(e);
    }
  },
};

export { Query as default };
