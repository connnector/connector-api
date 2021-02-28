import bcrypt from "bcryptjs";
import User from "../model/User";
import Repo from "../model/Repo";
import Comment from "../model/Comment";
import jwt from "jsonwebtoken";
import { Context, getUserId, AuthError } from "../utils";

const Mutation = {
  signUp: async (
    parent,
    args: { userData: { name: string; email: string; password: string } },
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
    let hashedPassword: string;
    try {
      hashedPassword = await bcrypt.hash(args.userData.password, 12);
    } catch (e) {
      throw new Error();
    }
    let newUser: object;

    const token = jwt.sign(
      { name: args.userData.name, email: args.userData.email },
      process.env.SECRET
    );
    try {
      newUser = await User.create({
        ...args.userData,
        password: hashedPassword,
      });
    } catch (e) {
      throw new Error(e);
    }
    const returnData: object = {
      user: newUser,
      token,
      expirationTime: 1,
    };
    return returnData;
  },
  deleteUser: async (parent, args, ctx: Context, info): Promise<object> => {
    let id = getUserId(ctx);
    if (id) {
      try {
        const existingUser: object = await User.findByIdAndDelete(id);
        if (!existingUser) {
          throw new Error("User Does Not exist");
        }
        return existingUser;
      } catch (e) {
        throw new Error(e);
      }
    } else {
      throw new AuthError();
    }
  },
  updateUser: async (
    parent,
    args: { updateData: { name: string; email: string } },
    ctx: Context,
    info
  ): Promise<object> => {
    let id = getUserId(ctx);
    if (id) {
      try {
        if (args.updateData.email) {
          const emailTaken = await User.findOne({
            email: args.updateData.email,
          });
          if (emailTaken) {
            throw new Error("Email Already taken");
          }
        }
        const reqUser: object = await User.findByIdAndUpdate(id, {
          ...args.updateData,
        });
        if (!reqUser) {
          throw new Error("User not found");
        }
        return reqUser;
      } catch (e) {
        throw new Error(e);
      }
    } else {
      throw new AuthError();
    }
  },
  createRepo: async (
    parent,
    args: {
      repoData: { title: string; visibility: string };
    },
    ctx: Context,
    info
  ): Promise<object> => {
    let id = getUserId(ctx);
    if (id) {
      let newRepo: object;

      try {
        const titleTaken = await Repo.findOne({
          title: args.repoData.title,
          developer: id,
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
    } else {
      throw new AuthError();
    }
  },
  deleteRepo: async (
    parent,
    args: { repoId: string },
    ctx: Context,
    info
  ): Promise<object> => {
    let id = getUserId(ctx);
    if (id) {
      try {
        const existingRepo: object = await Repo.findByIdAndDelete(args.repoId);
        if (!existingRepo) {
          throw new Error("Repo Not Found");
        }
        return existingRepo;
      } catch (e) {
        throw new Error(e);
      }
    } else {
      throw new AuthError();
    }
  },
  updateRepo: async (
    parent,
    args: { repoId: string; updateData: { title: string; visibility: string } },
    ctx: Context,
    info
  ): Promise<object> => {
    let id = getUserId(ctx);
    if (id) {
      try {
        let reqRepo = await Repo.findByIdAndUpdate(args.repoId, {
          ...args.updateData,
        });
        if (!reqRepo) {
          throw new Error("Repo not found or invalid update fields");
        }
        return reqRepo;
      } catch (e) {
        throw new Error(e);
      }
    } else {
      throw new AuthError();
    }
  },
  createComment: async (
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
  },
  deleteComment: async (
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
  },
  updateComment: async (
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
  },
};
export { Mutation as default };
