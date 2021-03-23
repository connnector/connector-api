import User from "../model/User";
import Repo from "../model/Repo";
import Comment from "../model/Comment";
import Like from "../model/Like";
import { Document, Model, Mongoose } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Context } from "../utils";
import { getUserId, AuthError } from "../utils";
import { like } from "./Mutations/LikeMutation";

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
  repos: async (
    parent,
    args: { nameQuery: string; skip: number; limit: number },
    ctx,
    info
  ): Promise<Document<any>[]> => {
    let { id } = getUserId(ctx);
    if (id) {
      let allRepos: any;
      try {
        allRepos = await Repo.find({ visibility: "public" }, null, {
          skip: args.skip,
          limit: args.limit,
        });
        if (allRepos.length === 0) {
          throw new Error("No More Posts,Follow others to see more posts");
        }

        for (let i = 0; i < allRepos.length; i++) {
          let likeExist: any = await Like.findOne({
            developer: id,
            repo: allRepos[i]._id,
          });
          if (likeExist) {
            allRepos[i] = {
              ...allRepos[i]._doc,
              id: allRepos[i]._doc._id,
              liked: true,
            };
          } else {
            allRepos[i] = {
              ...allRepos[i]._doc,
              id: allRepos[i]._doc._id,
              liked: false,
            };
          }
        }

        return allRepos;
      } catch (e) {
        throw new Error(e);
      }
    } else {
      throw new AuthError();
    }
  },
  repoById: async (
    parent,
    args: { idQuery: string },
    ctx,
    info
  ): Promise<Document<object>> => {
    try {
      const reqRepo: Document<object> = await Repo.findById(args.idQuery);
      if (!reqRepo) {
        throw new Error("Wrong id");
      }
      return reqRepo;
    } catch (e) {
      throw new Error(e);
    }
  },
  comments: async (
    parent,
    args: { idOfRepo: string },
    ctx,
    info
  ): Promise<Document<object>[]> => {
    try {
      const repoExists: Document<object> = await Repo.findOne({
        _id: args.idOfRepo,
        visibility: "public",
      });
      if (!repoExists) {
        throw new Error("Repo Does Not Exist or is private");
      }
      const comments: Document<object>[] = await Comment.find({
        repoId: args.idOfRepo,
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
