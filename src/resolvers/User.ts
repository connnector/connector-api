import Repo from "../model/Repo";
import Comment from "../model/Comment";

const User = {
  repos: async (
    parent: { id: string; name: string; email: string },
    args,
    ctx,
    info
  ): Promise<object> => {
    if (args.visibility === "ALL") {
      try {
        const repos = await Repo.find({ developer: args._id });
        return repos;
      } catch (e) {
        throw new Error(e);
      }
    }
    try {
      const repos = await Repo.find({
        developer: args._id,
        visibility: args.visibility.toLowerCase(),
      });
      return repos;
    } catch (e) {
      throw new Error(e);
    }
  },
  comments: async (
    parent,
    args: { idOfRepo: string },
    ctx,
    info
  ): Promise<object> => {
    try {
      const repoExists: any = await Repo.findById(args.idOfRepo);

      if (!repoExists) {
        throw new Error("Repo does not exist");
      }
      if (repoExists.visibility === "private") {
        throw new Error("Repo is Private");
      }
    } catch (e) {
      throw new Error(e);
    }
    try {
      const comments: any = await Comment.find({
        developer: parent.id,
        repoId: args.idOfRepo,
      });
      return comments;
    } catch (e) {
      throw new Error(e);
    }
  },
};

export { User as default };
