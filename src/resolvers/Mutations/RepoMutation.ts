import Repo from "../../model/Repo";
import { Context, getUserId, AuthError } from "../../utils";

export const createRepo = async (
  parent,
  args: {
    repoData: { title: string; visibility: string; desc: string };
  },
  ctx: Context,
  info
): Promise<object> => {
  let { id } = getUserId(ctx);

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
        developer: id,
        desc: args.repoData.desc,
      });
    } catch (e) {
      throw new Error(e);
    }

    return newRepo;
  } else {
    throw new AuthError();
  }
};
export const deleteRepo = async (
  parent,
  args: { repoId: string },
  ctx: Context,
  info
): Promise<object> => {
  let { id } = getUserId(ctx);
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
};
export const updateRepo = async (
  parent,
  args: { repoId: string; updateData: { title: string; visibility: string } },
  ctx: Context,
  info
): Promise<object> => {
  let { id } = getUserId(ctx);
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
};
