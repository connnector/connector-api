import mongoose from "mongoose";
import User from "../model/User";
import Repo from "../model/Repo";
import Comment from "../model/Comment";
import { Document } from "mongoose";

const Mutation = {
  createUser: async (
    parent,
    args: { userData: { name: string; email: string } },
    ctx,
    info
  ): Promise<object> => {
    let existingUser;
    try {
      existingUser = await User.findOne({ email: args.userData.email });
    } catch (e) {
      throw new Error(e);
    }

    if (existingUser) {
      throw new Error("user already exists");
    }

    let newUser: object;
    try {
      newUser = await User.create({
        ...args.userData,
      });
    } catch (e) {
      throw new Error(e);
    }
    return newUser;
  },
  deleteUser: async (
    parent,
    args: { userId: string },
    ctx,
    info
  ): Promise<object> => {
    try {
      const existingUser: object = await User.findByIdAndDelete(args.userId);
      if (!existingUser) {
        throw new Error("User Does Not exist");
      }
      return existingUser;
    } catch (e) {
      throw new Error(e);
    }
  },
  updateUser: (
    parent,
    args: { userId: string; updateData: { name: string; email: string } },
    { db },
    info
  ): object => {
    const userIndex = db.users.findIndex((x) => x.id === args.userId);
    if (userIndex === -1) {
      throw new Error("User not found");
    }
    db.users[userIndex] = {
      ...db.users[userIndex],
      ...args.updateData,
    };
    return db.users[userIndex];
  },
  createRepo: async (
    parent,
    args: {
      repoData: { title: string; visibility: string; developer: string };
    },
    ctx,
    info
  ): Promise<object> => {
    try {
      const userExists = await User.findById(args.repoData.developer);

      if (!userExists) {
        throw new Error("No developer with this id");
      }
    } catch (e) {
      throw new Error(e);
    }
    let newRepo: object;

    try {
      const titleTaken = await Repo.findOne({
        title: args.repoData.title,
        developer: args.repoData.developer,
      });

      if (titleTaken) {
        throw new Error("title already taken");
      }
    } catch (e) {
      throw new Error(e);
    }

    try {
      newRepo = Repo.create({
        ...args.repoData,
      });
    } catch (e) {
      throw new Error(e);
    }

    return newRepo;
  },
  deleteRepo: async (
    parent,
    args: { repoId: string },
    ctx,
    info
  ): Promise<object> => {
    try {
      const existingRepo: object = await Repo.findByIdAndDelete(args.repoId);
      if (!existingRepo) {
        throw new Error("Repo Not Found");
      }
      return existingRepo;
    } catch (e) {
      throw new Error(e);
    }
  },
  updateRepo: (
    parent,
    args: { repoId: string; updateData: { title: string; visibility: string } },
    { db },
    info
  ): object => {
    const repoIndex = db.repos.findIndex((x) => x.id === args.repoId);
    if (repoIndex === -1) {
      throw new Error("Repo not found");
    }
    db.repos[repoIndex] = {
      ...db.users[repoIndex],
      ...args.updateData,
    };
    return db.repos[repoIndex];
  },
  createComment: async (
    parent,
    args: { data: { text: string; developer: string; idOfRepo: string } },
    ctx,
    info
  ): Promise<object> => {
    try {
      const userExists: object = await User.findById(args.data.developer);
      if (!userExists) {
        throw new Error("User doesnot exist");
      }
      const repoValid = await Repo.find({
        id: args.data.idOfRepo,
        visibility: "public",
      });
      console.log(repoValid);
      if (!repoValid) {
        throw new Error("Repo is either private or doesnot exist");
      }
      const newComment: object = await Comment.create({
        text: args.data.text,
        developer: args.data.developer,
        repoId: args.data.idOfRepo,
      });

      return newComment;
    } catch (e) {
      throw new Error(e);
    }
  },
  deleteComment: (
    parent,
    args: { commentId: string },
    { db },
    info
  ): object => {
    const commentExist: number = db.comments.findIndex(
      (x) => x.id === args.commentId
    );
    if (commentExist === -1) {
      throw new Error("Comment doesNot exist");
    }

    const deletedComment = db.comments.splice(commentExist, 1);

    return deletedComment;
  },
  updateComment: (
    parent,
    args: { data: { commentId: string; text: string } },
    { db },
    info
  ): object => {
    const commentExist: number = db.comments.findIndex(
      (x) => x.id === args.data.commentId
    );
    if (commentExist === -1) {
      throw new Error("Comment doesNot exist");
    }

    db.comments[commentExist] = {
      ...db.comments[commentExist],
      text: args.data.text,
    };

    return db.comments[commentExist];
  },
};

export { Mutation as default };
