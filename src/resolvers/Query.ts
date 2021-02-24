import User from "../model/User";
import Repo from "../model/Repo";
import Comment from "../model/Comment";
import { Document } from "mongoose";

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
    args: { nameQuery: string },
    ctx,
    info
  ): Promise<Document<any>[]> => {
    let allRepos: Document<any>[];
    try {
      allRepos = await Repo.find({});
      if (allRepos.length === 0) {
        throw new Error("No Repos");
      }
      return allRepos;
    } catch (e) {
      throw new Error(e);
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
  comments: (parent, args: { idOfRepo: string }, { db }, info): [object] => {
    const repoExists: number = db.repos.findIndex(
      (x) => x.id === args.idOfRepo
    );

    if (repoExists === -1) {
      throw new Error("Repo Does Not Exist");
    }
    if (db.repos[repoExists].visibility === "private") {
      throw new Error("repo is private");
    }

    const comments: [object] = db.comments.filter(
      (x) => x.repoId === args.idOfRepo
    );

    return comments;
  },
};

export { Query as default };
