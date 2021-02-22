import mongoose from "mongoose";
import User from "../model/User";
import Repo from "../model/Repo";
import Comment from "../model/Comment";

const Mutation = {
  createUser: async (
    parent,
    args: { userData: { name: string; email: string } },
    { db },
    info
  ): Promise<object> => {
    try {
      const existingUser = await User.find({ email: args.userData.email });
      if (existingUser) {
        throw new Error("user already exists");
      }
    } catch (e) {
      throw new Error(e);
    }

    let newUser: object;
    try {
      newUser = await User.create({
        ...args.userData,
      });
    } catch (error) {
      throw new Error(error);
    }
    return newUser;
  },
  deleteUser: (parent, args: { userId: string }, { db }, info): object => {
    const existingUserIndex: number = db.users.findIndex(
      (x) => x.id === args.userId
    );
    if (existingUserIndex === -1) {
      throw new Error("User Does Not exist");
    }
    const requiredUser: { id: string; name: string; email: string } =
      db.users[existingUserIndex];
    db.repos = db.repos.filter((x) => x.developer !== requiredUser.id);
    db.users = db.users.splice(existingUserIndex, 1);

    return requiredUser;
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
  createRepo: (
    parent,
    args: {
      repoData: { title: string; visibility: string; developer: string };
    },
    { db },
    info
  ): object => {
    console.log(args.repoData);
    const userExists: object = User.findById(args.repoData.developer);

    if (!userExists) {
      throw new Error("No developer with this id");
    }
    const newRepo: object = Repo.create({
      ...args.repoData,
    });

    return newRepo;
  },
  deleteRepo: (parent, args: { repoId: string }, { db }, info): object => {
    const existingRepoIndex: number = db.repos.findIndex(
      (x) => x.id === args.repoId
    );
    if (existingRepoIndex === -1) {
      throw new Error("Repo Not Found");
    }
    const requiredRepo: {
      id: string;
      title: string;
      developer: string;
      visibility: string;
    } = db.repos[existingRepoIndex];
    db.repos = db.repos.splice(existingRepoIndex, 1);

    return requiredRepo;
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
  createComment: (
    parent,
    args: { data: { text: string; developer: string; idOfRepo: string } },
    { db },
    info
  ): object => {
    const userExists: object = User.findById(args.data.developer);
    if (!userExists) {
      throw new Error("User doesnot exist");
    }
    const repoValid: object = Repo.findById(args.data.idOfRepo);
    if (!repoValid) {
      throw new Error("Repo is either private or doesnot exist");
    }

    const newComment: object = Repo.create({
      text: args.data.text,
      developer: args.data.developer,
      repoId: args.data.idOfRepo,
    });

    return newComment;
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
